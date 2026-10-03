// Controlled real HTTP integration: every app/upstream listener is loopback,
// every credential is synthetic. This does not certify a distributed limiter.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { randomUUID, createHmac } from "node:crypto";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkLeadSubmission } from "./check-lead-submission.mjs";
const ROOT = fileURLToPath(new URL("..", import.meta.url));
const KEY = "check-lead-proxy-test-key";
const INPUT = { firstName: "  Test ", lastName: "Proxy", email: "lead-proxy-check@example.invalid", phone: "555-0100", zip: "92101", lineOfBusiness: "Auto Insurance", message: "behavioural check", website: "" };
const accepted = new Map();
let mode = "created", hits = [], app, base, appLog = "", checks = 0;
const timers = new Set();
const stub = createServer((req, res) => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => {
        const body = Buffer.concat(chunks).toString("utf8");
        hits.push({ method: req.method, url: req.url, headers: req.headers, body });
        if (req.url !== "/api/public/leads") {
            res.writeHead(200).end('{"ok":true}');
            return;
        }
        const key = req.headers["idempotency-key"];
        if (mode.startsWith("redirect")) {
            res.writeHead(Number(mode.slice(8)), { location: `http://127.0.0.1:${stub.address().port}/moved-target` }).end();
            return;
        }
        if (mode.startsWith("status")) {
            res.writeHead(Number(mode.slice(6))).end("private upstream diagnostic must not leak");
            return;
        }
        if (mode === "dropped" || mode === "timeout" || mode === "replay") {
            if (accepted.has(key) && accepted.get(key) !== body) {
                res.writeHead(409).end();
                return;
            }
            accepted.set(key, body);
            if (mode === "dropped") {
                res.destroy();
                return;
            }
            if (mode === "timeout") {
                const timer = setTimeout(() => { timers.delete(timer); res.writeHead(201).end('{"ok":true,"id":"stub","score":1}'); }, 11000);
                timers.add(timer);
                return;
            }
        }
        const variants = {
            created: [201, '{"ok":true,"id":"stub","score":1,"quoteRequestId":null}'],
            replay: [200, '{"ok":true,"id":"stub","score":1,"idempotent":true}'],
            false: [201, '{"ok":false,"id":"stub","score":1}'],
            missingId: [201, '{"ok":true,"score":1}'],
            missingScore: [201, '{"ok":true,"id":"stub"}'],
            missingReplay: [200, '{"ok":true,"id":"stub","score":1}'],
            empty: [204, ""], html: [200, "<p>Accepted</p>"], malformed: [201, "{"], null: [201, "null"], array: [201, "[]"],
        };
        const [status, response] = variants[mode] ?? variants.created;
        res.writeHead(status, { "content-type": "application/json" }).end(response);
    });
});
const listen = server => new Promise(resolve => server.listen(0, "127.0.0.1", () => resolve(server.address().port)));
async function freePort() { const server = createServer(); const port = await listen(server); await new Promise(resolve => server.close(resolve)); return port; }
async function stopApp() {
    if (!app || app.exitCode !== null)
        return;
    const child = app;
    await new Promise(resolve => { child.once("exit", resolve); child.kill(); });
    app = undefined;
}
async function startApp(overrides = {}) {
    await stopApp();
    const port = await freePort();
    base = `http://127.0.0.1:${port}`;
    appLog = "";
    const env = { ...process.env, NODE_ENV: "production", NEXT_TELEMETRY_DISABLED: "1", VERCEL: "", LEAD_PROXY_TEST_MODE: "loopback", LEAD_INTAKE_KEY: KEY, INS_PLATFORM_URL: `http://127.0.0.1:${stub.address().port}/`, ...overrides };
    if (env.NO_COLOR !== undefined)
        delete env.FORCE_COLOR;
    app = spawn(process.execPath, [join(ROOT, "node_modules/next/dist/bin/next"), "start", "-p", String(port), "-H", "127.0.0.1"], { cwd: ROOT, env, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
    app.stdout.on("data", chunk => { appLog += chunk; });
    app.stderr.on("data", chunk => { appLog += chunk; });
    for (let i = 0; i < 120; i++) {
        if (app.exitCode !== null)
            break;
        try {
            const response = await fetch(base, { signal: AbortSignal.timeout(1000) });
            await response.body?.cancel();
            if (response.status === 200)
                return;
        }
        catch { /* startup */ }
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    throw Error(`Local next start failed: ${appLog}`);
}
async function context(surface = "quote", id = randomUUID()) {
    const response = await fetch(`${base}/api/quote/context?${new URLSearchParams({ surface, submissionId: id })}`);
    const json = await response.json();
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(typeof json.context, "string");
    return { id, context: json.context };
}
async function post(body, id, headers = {}) {
    const response = await fetch(`${base}/api/quote`, { method: "POST", headers: { "content-type": "application/json", ...(id ? { "Idempotency-Key": id } : {}), ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
    return { status: response.status, json: await response.json() };
}
function outcome(result, status, success = false) { assert.equal(result.status, status); assert.equal(result.json.ok, success); if (success)
    assert.equal(result.json.accepted, true);
else
    assert.doesNotMatch(result.json.error, /private upstream diagnostic/); }
async function check(name, run) { hits = []; await run(); checks++; console.log(`PASS ${name}`); }
const uncertain = result => { outcome(result, 502); assert.match(result.json.error, /couldn't confirm/i); assert.doesNotMatch(result.json.error, /nothing was sent/i); };
try {
    assert.ok(existsSync(join(ROOT, ".next/BUILD_ID")), "Run npm run build first");
    await checkLeadSubmission();
    await listen(stub);
    await startApp();
    await check("original body, exact wire headers, trusted synthetic visitor and accepted response", async () => {
        const c = await context();
        mode = "created";
        outcome(await post({ ...INPUT, context: c.context }, c.id, { "X-Lead-Visitor-IP": "203.0.113.9", "X-Forwarded-For": "203.0.113.10", "X-Real-IP": "203.0.113.11", "x-vercel-forwarded-for": "203.0.113.12" }), 200, true);
        assert.equal(hits.length, 1);
        const h = hits[0];
        assert.equal(h.method, "POST");
        assert.equal(h.url, "/api/public/leads");
        assert.equal(h.headers["content-type"], "application/json");
        assert.equal(h.headers["x-lead-key"], KEY);
        assert.equal(h.headers["idempotency-key"], c.id);
        assert.equal(h.headers["x-lead-visitor-ip"], "192.0.2.1");
        const { website: _website, ...fields } = INPUT;
        assert.equal(h.body, JSON.stringify({ ...fields, source: "website", campaign: "main-quote-form" }));
    });
    await check("registered surface context supplies attribution and restricts coverage", async () => {
        for (const [surface, source, campaign, line] of [["contact", "contact", "contact-page", ""], ["newsletter", "newsletter", "newsletter", ""], ["switch-and-save", "switch-and-save", "switch-and-save", ""], ["article:how-much-homeowners-insurance-do-i-need", "resources-article", "how-much-homeowners-insurance-do-i-need", "Homeowners Insurance"]]) {
            const c = await context(surface);
            outcome(await post({ ...INPUT, lineOfBusiness: line, context: c.context }, c.id), 200, true);
            const sent = JSON.parse(hits.at(-1).body);
            assert.deepEqual([sent.source, sent.campaign, sent.lineOfBusiness], [source, campaign, line]);
            outcome(await post({ ...INPUT, lineOfBusiness: "invented", context: c.context }, c.id), 422);
        }
    });
    await check("reject unregistered/context tampering, cross-identity, expiry and browser attribution", async () => {
        for (const surface of ["certificate-request", "unknown", "article:unknown"])
            assert.equal((await fetch(`${base}/api/quote/context?${new URLSearchParams({ surface, submissionId: randomUUID() })}`)).status, 400);
        const c = await context();
        for (const contextValue of ["", c.context + ".extra", c.context.slice(0, -2) + "AA"])
            outcome(await post({ ...INPUT, context: contextValue }, c.id), 422);
        outcome(await post({ ...INPUT, context: c.context }, randomUUID()), 422);
        const encoded = Buffer.from(JSON.stringify({ surface: "quote", submissionId: c.id, expires: 1 })).toString("base64url");
        const expired = encoded + "." + createHmac("sha256", KEY).update(`website-lead-context-v1:${encoded}`).digest("base64url");
        outcome(await post({ ...INPUT, context: expired }, c.id), 422);
        for (const id of [undefined, "invalid", "x".repeat(200)])
            outcome(await post({ ...INPUT, context: c.context }, id), 400);
        for (const field of ["source", "campaign", "visitorId", "ip"])
            outcome(await post({ ...INPUT, context: c.context, [field]: "spoofed" }, c.id), 400);
        assert.equal(hits.length, 0);
    });
    await check("accepted originals preserve whitespace/unicode and exact maximum lengths", async () => {
        const c = await context();
        const long = { ...INPUT, firstName: " " + "N".repeat(98) + " ", lastName: "L".repeat(100), email: "E".repeat(2000), phone: "P".repeat(2000), zip: "Z".repeat(2000), message: "\n" + "界".repeat(199998) + "\n", context: c.context };
        outcome(await post(long, c.id), 200, true);
        const sent = JSON.parse(hits[0].body);
        for (const field of ["firstName", "lastName", "email", "phone", "zip", "message"])
            assert.equal(sent[field], long[field]);
    });
    await check("retain legacy within-cap long-field regression", async () => {
        const c = await context();
        const long = { ...INPUT, message: "m".repeat(9000), email: "a".repeat(237) + "@example.invalid", phone: "843-555-0147 (cell, texts best after 5pm ok)", context: c.context };
        outcome(await post(long, c.id), 200, true);
        const sent = JSON.parse(hits[0].body);
        for (const field of ["message", "email", "phone"])
            assert.equal(sent[field], long[field]);
    });
    await check("over-limit rejection never silently truncates or forwards", async () => {
        const c = await context();
        for (const [field, limit] of Object.entries({ firstName: 100, lastName: 100, email: 2000, phone: 2000, zip: 2000, lineOfBusiness: 100, message: 200000, website: 2000, context: 2048 }))
            outcome(await post({ ...INPUT, context: c.context, [field]: "x".repeat(limit + 1) }, c.id), 422);
        assert.equal(hits.length, 0);
    });
    await check("malformed JSON shapes/scalar fields/required values fail before upstream", async () => {
        for (const raw of ["{", "null", "[]", "true", "4", '"text"'])
            outcome(await post(raw), 400);
        const c = await context();
        for (const value of [null, {}, [], 1, true])
            outcome(await post({ ...INPUT, context: c.context, firstName: value }, c.id), 400);
        outcome(await post({ ...INPUT, context: c.context, firstName: "  " }, c.id), 400);
        outcome(await post({ ...INPUT, context: c.context, email: "", phone: " " }, c.id), 400);
        assert.equal(hits.length, 0);
    });
    await check("body byte cap with and without Content-Length", async () => {
        outcome(await post(JSON.stringify({ ...INPUT, message: "x".repeat(1300001) })), 413);
        const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode(' '.repeat(1300001))); controller.close(); } });
        const response = await fetch(`${base}/api/quote`, { method: "POST", body: stream, duplex: "half", headers: { "content-type": "application/json" } });
        assert.equal(response.status, 413);
        await response.body?.cancel();
        assert.equal(hits.length, 0);
    });
    await check("honeypot suppressed acceptance does not forward", async () => { const r = await post({ ...INPUT, website: "bot.example" }); outcome(r, 200, true); assert.equal(r.json.suppressed, true); assert.equal(hits.length, 0); });
    await check("all redirects remain manual and delivery-unconfirmed", async () => { const c = await context(); for (const status of [301, 302, 307, 308]) {
        mode = `redirect${status}`;
        uncertain(await post({ ...INPUT, context: c.context }, c.id));
    } assert.equal(hits.length, 4); assert.ok(hits.every(h => h.url === "/api/public/leads")); assert.match(appLog, /Upstream redirected the lead POST/); });
    await check("status mapping preserves conflict/rate/validation and hides upstream errors", async () => { const c = await context(); for (const status of [400, 401, 403, 409, 422, 429, 500, 503]) {
        mode = `status${status}`;
        const r = await post({ ...INPUT, context: c.context }, c.id);
        outcome(r, [409, 422, 429].includes(status) ? status : 502);
        assert.doesNotMatch(r.json.error, /nothing was sent/);
    } });
    await check("strict upstream acceptance body and replay schema", async () => { const c = await context(); for (const variant of ["false", "missingId", "missingScore", "missingReplay", "empty", "html", "malformed", "null", "array"]) {
        mode = variant;
        uncertain(await post({ ...INPUT, context: c.context }, c.id));
    } mode = "replay"; outcome(await post({ ...INPUT, context: c.context }, c.id), 200, true); });
    for (const transport of ["dropped", "timeout"])
        await check(`${transport} after simulated commit retains key and replay resolves one record`, async () => { const c = await context(); accepted.clear(); mode = transport; uncertain(await post({ ...INPUT, context: c.context }, c.id)); mode = "replay"; outcome(await post({ ...INPUT, context: c.context }, c.id), 200, true); assert.equal(accepted.size, 1); assert.equal(hits.length, 2); assert.equal(hits[0].headers["idempotency-key"], hits[1].headers["idempotency-key"]); assert.equal(hits[0].body, hits[1].body); outcome(await post({ ...INPUT, message: "edited", context: c.context }, c.id), 409); assert.equal(accepted.size, 1); });
    await startApp({ LEAD_PROXY_TEST_MODE: "" });
    mode = "created";
    await check("unsupported hosting fails closed despite forged edge headers", async () => { const c = await context(); outcome(await post({ ...INPUT, context: c.context }, c.id, { "x-vercel-forwarded-for": "192.0.2.3", "x-lead-visitor-ip": "192.0.2.4" }), 503); assert.equal(hits.length, 0); });
    await startApp({ VERCEL: "1", LEAD_PROXY_TEST_MODE: "" });
    await check("Vercel-header parser admits one valid IP only (synthetic hosting flag)", async () => { const c = await context(); for (const address of ["", "192.0.2.1, 192.0.2.2", "bad", "fe80::1%eth0"]) {
        outcome(await post({ ...INPUT, context: c.context }, c.id, address ? { "x-vercel-forwarded-for": address } : {}), 503);
    } assert.equal(hits.length, 0); for (const address of ["192.0.2.4", "2001:db8::42"]) {
        outcome(await post({ ...INPUT, context: c.context }, c.id, { "x-vercel-forwarded-for": address, "x-lead-visitor-ip": "203.0.113.1" }), 200, true);
        assert.equal(hits.at(-1).headers["x-lead-visitor-ip"], address);
    } });
    await startApp({ LEAD_INTAKE_KEY: "" });
    await check("missing key refuses context and forwarding", async () => { assert.equal((await fetch(`${base}/api/quote/context?surface=quote&submissionId=${randomUUID()}`)).status, 503); outcome(await post(INPUT, randomUUID()), 502); assert.equal(hits.length, 0); });
    console.log(`check-lead-proxy: OK — ${checks} real HTTP groups; synthetic loopback only; no distributed-limit claim`);
}
finally {
    for (const timer of timers)
        clearTimeout(timer);
    await stopApp();
    stub.closeAllConnections();
    await new Promise(resolve => stub.close(resolve));
}
