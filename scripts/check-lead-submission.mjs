// Exercise the actual browser helper with controlled fetch outcomes; the real
// four-form browser test separately verifies React lifetime and UI integration.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const source = readFileSync(new URL("../src/lib/lead-submission.ts", import.meta.url), "utf8");
const output = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { createLeadSubmission } = await import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
const input = { firstName: "  Test ", lastName: "Original", email: "test@example.invalid", phone: "", zip: " original ", lineOfBusiness: "", message: " original\nmessage ", website: "" };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
export async function checkLeadSubmission() {
    const originalFetch = globalThis.fetch;
    let calls = [], postMode = "lost", contextMode = "valid";
    globalThis.fetch = async (url, options) => {
        calls.push({ url: String(url), options });
        if (String(url).startsWith("/api/quote/context?")) {
            if (contextMode === "lost")
                throw Error("lost context");
            if (contextMode === "bad")
                return json({ context: 5 });
            return json({ context: "synthetic-context" });
        }
        if (postMode === "lost")
            throw Error("lost response after commit");
        if (postMode === "html")
            return new Response("<p>accepted</p>");
        if (postMode === "missing")
            return json({ ok: true });
        if (postMode === "false")
            return json({ ok: true, accepted: false });
        if (postMode === "failure")
            return json({ ok: false, error: "retry later" }, 429);
        return json({ ok: true, accepted: true, ...(postMode === "suppressed" ? { suppressed: true } : {}) });
    };
    const posts = () => calls.filter(c => c.url === "/api/quote");
    try {
        const helper = createLeadSubmission();
        for (const payload of [input, input, { ...input, message: "edited" }, input])
            await assert.rejects(helper.submit("contact", payload), /couldn't confirm/);
        const sent = posts();
        assert.equal(sent.length, 4);
        const ids = sent.map(c => c.options.headers["Idempotency-Key"]);
        assert.equal(ids[0], ids[1]);
        assert.notEqual(ids[0], ids[2]);
        assert.equal(ids[0], ids[3]);
        assert.match(ids[0], /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i);
        for (const call of calls.filter(c => c.url.includes("context?"))) {
            const query = new URL(call.url, "http://127.0.0.1").searchParams;
            assert.equal(query.get("surface"), "contact");
            assert.ok(ids.includes(query.get("submissionId")));
            assert.equal(call.options.cache, "no-store");
        }
        assert.deepEqual(JSON.parse(sent[0].options.body), { ...input, context: "synthetic-context" });
        for (const variant of ["html", "missing", "false", "failure"]) {
            postMode = variant;
            await assert.rejects(helper.submit("contact", input));
            assert.equal(posts().at(-1).options.headers["Idempotency-Key"], ids[0]);
            assert.equal(helper.pending, false);
        }
        contextMode = "bad";
        const before = posts().length;
        await assert.rejects(helper.submit("contact", input), /prepare/);
        assert.equal(posts().length, before);
        contextMode = "lost";
        await assert.rejects(helper.submit("contact", input), /confirm/);
        assert.equal(posts().length, before);
        contextMode = "valid";
        postMode = "success";
        assert.deepEqual(await helper.submit("contact", input), { accepted: true, delivered: true });
        const after = calls.length;
        assert.deepEqual(await helper.submit("contact", input), { accepted: false, delivered: false });
        assert.equal(calls.length, after);
        const fresh = createLeadSubmission();
        assert.deepEqual(await fresh.submit("contact", input), { accepted: true, delivered: true });
        assert.notEqual(posts().at(-1).options.headers["Idempotency-Key"], ids[0]);
        postMode = "suppressed";
        assert.deepEqual(await createLeadSubmission().submit("newsletter", input), { accepted: true, delivered: false });
        // Pending admission is synchronous, so double invocation cannot create a second attempt.
        let release;
        let deferredCalls = 0;
        globalThis.fetch = async (url) => { deferredCalls++; if (String(url).includes("context?"))
            return new Promise(resolve => { release = resolve; }); return json({ ok: true, accepted: true }); };
        const concurrent = createLeadSubmission();
        const first = concurrent.submit("contact", input);
        assert.equal(concurrent.pending, true);
        assert.deepEqual(await concurrent.submit("contact", input), { accepted: false, delivered: false });
        assert.equal(deferredCalls, 1);
        release(json({ context: "synthetic" }));
        assert.deepEqual(await first, { accepted: true, delivered: true });
        assert.equal(deferredCalls, 2);
        assert.equal(concurrent.pending, false);
        // Do not evict an unresolved identity when the form reaches its bounded history.
        calls = [];
        globalThis.fetch = async (url, options) => { calls.push({ url: String(url), options }); throw Error("offline"); };
        const bounded = createLeadSubmission();
        for (let i = 0; i < 100; i++)
            await assert.rejects(bounded.submit("contact", { ...input, message: String(i) }), /confirm/);
        const firstId = new URL(calls[0].url, "http://127.0.0.1").searchParams.get("submissionId");
        await assert.rejects(bounded.submit("contact", { ...input, message: "overflow" }), /Too many changed/);
        assert.equal(calls.length, 100);
        await assert.rejects(bounded.submit("contact", { ...input, message: "0" }), /confirm/);
        assert.equal(new URL(calls.at(-1).url, "http://127.0.0.1").searchParams.get("submissionId"), firstId);
        console.log("check-lead-submission: OK — original inputs, stable A/B/A retries, strict acceptance, single pending attempt, completed suppression, bounded unresolved identities");
    }
    finally {
        globalThis.fetch = originalFetch;
    }
}
