// Optional real-Chrome regression gate: node scripts/check-lead-browser.mjs.
// Uses only built loopback Next pages; all API requests are fulfilled locally by
// CDP and every non-loopback request is blocked. No credentials or real leads.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const BROWSER = process.env.CHROME_PATH ?? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(existsSync);
assert.ok(BROWSER, "Set CHROME_PATH to an installed Chrome/Chromium executable");
assert.ok(existsSync(join(ROOT, ".next/BUILD_ID")), "Run npm run build first");
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function freePort() { const s = createServer(); await new Promise(r => s.listen(0, "127.0.0.1", r)); const port = s.address().port; await new Promise(r => s.close(r)); return port; }
const appPort = await freePort(), debugPort = await freePort(), origin = `http://127.0.0.1:${appPort}`;
const profile = mkdtempSync(join(tmpdir(), "ins-lead-browser-"));
const env = { ...process.env, LEAD_INTAKE_KEY: "", INS_PLATFORM_URL: "http://127.0.0.1:9", VERCEL: "", LEAD_PROXY_TEST_MODE: "", NEXT_TELEMETRY_DISABLED: "1" };
if (env.NO_COLOR !== undefined)
    delete env.FORCE_COLOR;
const app = spawn(process.execPath, [join(ROOT, "node_modules/next/dist/bin/next"), "start", "-H", "127.0.0.1", "-p", String(appPort)], { cwd: ROOT, env, stdio: "ignore", windowsHide: true });
let chrome, ws, sessionId, sequence = 0, held, mode = "failure", records = [], contexts = [], blocked = 0;
const pending = new Map();
function command(method, params = {}, session) { return new Promise((resolve, reject) => { const id = ++sequence; const timer = setTimeout(() => { pending.delete(id); reject(Error(`CDP timeout ${method}`)); }, 20000); pending.set(id, { resolve, reject, timer }); ws.send(JSON.stringify({ id, method, params, ...(session ? { sessionId: session } : {}) })); }); }
const send = (method, params = {}) => command(method, params, sessionId);
async function evaluate(expression) { const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails)
    throw Error(result.exceptionDetails.text); return result.result.value; }
async function until(predicate, label) { for (let i = 0; i < 100; i++) {
    if (await predicate())
        return;
    await pause(100);
} throw Error(`Timed out: ${label}`); }
const fulfill = (id, status, body) => send("Fetch.fulfillRequest", { requestId: id, responseCode: status, responseHeaders: [{ name: "Content-Type", value: "application/json" }], body: Buffer.from(JSON.stringify(body)).toString("base64") });
try {
    await until(async () => { try {
        const r = await fetch(origin);
        await r.body?.cancel();
        return r.ok;
    }
    catch {
        return false;
    } }, "Next readiness");
    chrome = spawn(BROWSER, ["--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check", `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore", windowsHide: true });
    let endpoint;
    await until(async () => { try {
        endpoint = (await (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).json()).webSocketDebuggerUrl;
        return !!endpoint;
    }
    catch {
        return false;
    } }, "Chrome readiness");
    ws = new WebSocket(endpoint);
    await new Promise((r, j) => { ws.addEventListener("open", r, { once: true }); ws.addEventListener("error", j, { once: true }); });
    const interceptionErrors = [];
    ws.addEventListener("message", event => {
        const msg = JSON.parse(event.data);
        if (msg.id) {
            const p = pending.get(msg.id);
            if (p) {
                pending.delete(msg.id);
                clearTimeout(p.timer);
                msg.error ? p.reject(Error(msg.error.message)) : p.resolve(msg.result);
            }
            return;
        }
        if (msg.method !== "Fetch.requestPaused")
            return;
        const { requestId, request } = msg.params;
        const url = new URL(request.url);
        let work;
        if (url.origin !== origin) {
            blocked++;
            work = send("Fetch.failRequest", { requestId, errorReason: "BlockedByClient" });
        }
        else if (url.pathname === "/api/quote/context") {
            contexts.push({ surface: url.searchParams.get("surface"), id: url.searchParams.get("submissionId") });
            work = fulfill(requestId, 200, { context: "synthetic-browser-context" });
        }
        else if (url.pathname === "/api/quote") {
            records.push({ headers: request.headers, body: JSON.parse(request.postData), mode });
            if (mode === "hold") {
                held = requestId;
                return;
            }
            if (mode === "lost")
                work = send("Fetch.failRequest", { requestId, errorReason: "Failed" });
            else if (mode === "malformed")
                work = fulfill(requestId, 200, { ok: true });
            else if (mode === "success" || mode === "suppressed")
                work = fulfill(requestId, 200, { ok: true, accepted: true, ...(mode === "suppressed" ? { suppressed: true } : {}) });
            else
                work = fulfill(requestId, 502, { ok: false, error: "Delivery is unconfirmed; retry the same request." });
        }
        else if (request.method !== "GET" && request.method !== "HEAD") {
            blocked++;
            work = send("Fetch.failRequest", { requestId, errorReason: "BlockedByClient" });
        }
        else
            work = send("Fetch.continueRequest", { requestId });
        work.catch(error => interceptionErrors.push(error.message));
    });
    const context = await command("Target.createBrowserContext", { disposeOnDetach: true });
    const target = await command("Target.createTarget", { url: "about:blank", browserContextId: context.browserContextId });
    sessionId = (await command("Target.attachToTarget", { targetId: target.targetId, flatten: true })).sessionId;
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Fetch.enable", { patterns: [{ urlPattern: "*" }] });
    const cases = [
        { name: "QuoteForm", path: "/quote?line=Auto%20Insurance", surface: "quote", email: "email", first: "firstName", last: "lastName", success: "Request received" },
        { name: "ContactForm", path: "/contact", surface: "contact", email: "c-email", first: "c-firstName", last: "c-lastName", message: "c-message", zip: "c-zip", success: "Message sent" },
        { name: "LeadForm", path: "/switch-and-save", surface: "switch-and-save", email: "switch-and-save-email", first: "switch-and-save-first", last: "switch-and-save-last", message: "switch-and-save-msg", zip: "switch-and-save-zip", success: "On it" },
        { name: "NewsletterSignup", path: "/", surface: "newsletter", email: "nl-footer", success: "Request received" },
    ];
    async function set(id, value) { await evaluate(`(()=>{const e=document.getElementById(${JSON.stringify(id)});if(!e)throw Error('missing input');const p=e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(p,'value').set.call(e,${JSON.stringify(value)});e.dispatchEvent(new Event('input',{bubbles:true}));})()`); await pause(30); }
    async function mount(test) {
        await send("Page.navigate", { url: origin + test.path });
        await until(() => evaluate("document.readyState==='complete'"), "page load");
        await pause(300);
        if (test.name === "QuoteForm") {
            await until(() => evaluate("!!document.getElementById('zip')"), "quote details");
            await set("zip", " 92101 plus original ");
            await set("message", " original\nmessage ");
            await evaluate("[...document.querySelectorAll('main button')].find(b=>b.textContent.includes('Continue')).click()");
        }
        await until(() => evaluate(`!!document.getElementById(${JSON.stringify(test.email)})`), test.name + " inputs");
        if (test.first) {
            await set(test.first, "  Test ");
            await set(test.last, "Original");
        }
        if (test.message)
            await set(test.message, " original\nmessage ");
        if (test.zip)
            await set(test.zip, " 92101 plus original ");
        await set(test.email, "a@example.invalid");
        await evaluate(`window.dataLayer=[];window.__leadForm=document.getElementById(${JSON.stringify(test.email)}).closest('form');void 0`);
    }
    const submit = () => evaluate("window.__leadForm.requestSubmit()");
    const ready = () => evaluate("!!window.__leadForm.querySelector('[role=alert]') && !window.__leadForm.querySelector('button[type=submit],button:not([type])').disabled");
    const countEvents = () => evaluate("(window.dataLayer??[]).filter(e=>e.event==='generate_lead').length");
    for (const test of cases) {
        await mount(test);
        records = [];
        contexts = [];
        for (const attempt of ["failure", "lost"]) {
            mode = attempt;
            const before = records.length;
            await submit();
            await until(() => Promise.resolve(records.length === before + 1), test.name + " request");
            await until(ready, test.name + " retained error");
            assert.equal(await countEvents(), 0);
            assert.equal(await evaluate(`document.getElementById(${JSON.stringify(test.email)}).value`), "a@example.invalid");
        }
        await set(test.email, "b@example.invalid");
        mode = "failure";
        await submit();
        await until(() => Promise.resolve(records.length === 3), "edited request");
        await until(ready, "edited error");
        await set(test.email, "a@example.invalid");
        mode = "malformed";
        await submit();
        await until(() => Promise.resolve(records.length === 4), "malformed acceptance");
        await until(ready, "malformed error");
        assert.equal(await countEvents(), 0);
        mode = "hold";
        await submit();
        await until(() => Promise.resolve(!!held), "pending request");
        await submit();
        await pause(200);
        assert.equal(records.length, 5, test.name + " double submission must be suppressed");
        await fulfill(held, 502, { ok: false, error: "Unconfirmed" });
        held = undefined;
        await until(ready, "released pending error");
        mode = "success";
        await submit();
        await until(() => Promise.resolve(records.length === 6), "successful retry");
        await until(async () => await countEvents() === 1, "single success event");
        assert.ok(await evaluate(`document.body.innerText.includes(${JSON.stringify(test.success)})`));
        assert.equal(await evaluate(`!!document.getElementById(${JSON.stringify(test.email)})`), false, test.name + " success replaces form");
        const key = record => Object.entries(record.headers).find(([name]) => name.toLowerCase() === "idempotency-key")?.[1];
        const ids = records.map(key);
        assert.ok(ids[0]);
        assert.equal(new Set([ids[0], ids[1], ids[3], ids[4], ids[5]]).size, 1);
        assert.notEqual(ids[2], ids[0]);
        assert.equal(contexts.length, 6);
        assert.ok(contexts.every(c => c.surface === test.surface));
        assert.deepEqual(contexts.map(c => c.id), ids);
        assert.deepEqual(records[0].body, records[1].body);
        assert.deepEqual(records[0].body, records[5].body);
        assert.equal(records[0].body.email, "a@example.invalid");
        assert.equal(records[2].body.email, "b@example.invalid");
        if (test.first)
            assert.equal(records[0].body.firstName, "  Test ");
        if (test.name !== "NewsletterSignup") {
            assert.equal(records[0].body.message, " original\nmessage ");
            assert.equal(records[0].body.zip, " 92101 plus original ");
        }
        await mount(test);
        mode = "suppressed";
        const previous = records.length;
        await submit();
        await until(() => Promise.resolve(records.length === previous + 1), "fresh mounted submission");
        await until(() => evaluate(`!document.getElementById(${JSON.stringify(test.email)})`), "suppressed success UI");
        assert.notEqual(key(records.at(-1)), ids[0]);
        assert.equal(await countEvents(), 0, "suppressed honeypot is not a delivered lead event");
        console.log(`PASS ${test.name}: actual UI A/A/B/A retries, originals, malformed success refusal, double-submit suppression, one accepted analytics event, new mount identity, suppressed analytics`);
    }
    assert.deepEqual(interceptionErrors, []);
    await command("Target.disposeBrowserContext", { browserContextId: context.browserContextId });
    await command("Browser.close");
    console.log(`check-lead-browser: OK — all four actual React forms, loopback/mock API only; blocked ${blocked} external/non-GET requests`);
}
finally {
    for (const entry of pending.values())
        clearTimeout(entry.timer);
    ws?.close();
    const stop = child => !child || child.exitCode !== null ? Promise.resolve() : new Promise(resolve => { child.once("exit", resolve); child.kill(); });
    await stop(chrome);
    await stop(app);
    // Retain the isolated, credential-free temporary profile if Chrome children
    // have not released its Windows file handles yet; never delete a live profile.
}
