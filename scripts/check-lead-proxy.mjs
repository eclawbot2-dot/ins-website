// Behavioural test for the lead proxy (POST /api/quote -> ins-platform
// /api/public/leads). Run AFTER `next build`: it starts the real built app
// with `next start`, points INS_PLATFORM_URL at a local stub platform, and
// drives the route over HTTP. No lead ever leaves this machine.
//
// What it pins (check-site.mjs only asserts these as text):
//  - the upstream origin comes from INS_PLATFORM_URL (a trailing slash is
//    tolerated), with the fixed /api/public/leads path;
//  - the forwarded request is unchanged: POST, Content-Type application/json,
//    X-Lead-Key from LEAD_INTAKE_KEY, and the exact JSON body bytes;
//  - a 301/302/307/308 from the platform is NOT followed (a followed 301/302
//    turns the POST into a bodiless GET — a lost lead that can still come back
//    2xx) and is reported to the visitor as undelivered (502, ok:false);
//  - an upstream error is a 502, and the honeypot never contacts the platform.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const NEXT_BIN = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const LEAD_KEY = "check-lead-proxy-test-key";

if (!existsSync(join(ROOT, ".next", "BUILD_ID"))) {
  console.error("FAIL: no production build (.next/BUILD_ID) — run `next build` first.");
  process.exit(1);
}

// ---- stub platform ---------------------------------------------------------
// `mode` decides how /api/public/leads answers; every request is recorded.
let mode = "ok";
let hits = [];
const stub = createServer((req, res) => {
  const chunks = [];
  req.on("data", (c) => chunks.push(c));
  req.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    hits.push({ method: req.method, url: req.url, headers: req.headers, body });
    const { port } = stub.address();
    if (req.url === "/moved-target/api/public/leads") {
      // Where a followed redirect would land. Answering 2xx is the dangerous
      // case: a proxy that followed the redirect would report success here.
      res.writeHead(200, { "content-type": "application/json" }).end('{"ok":true}');
      return;
    }
    if (req.url !== "/api/public/leads") {
      res.writeHead(404).end("not found");
      return;
    }
    const code = { ok: 201, r301: 301, r302: 302, r307: 307, r308: 308, fail: 500 }[mode];
    if (code >= 300 && code < 400) {
      res
        .writeHead(code, { location: `http://127.0.0.1:${port}/moved-target/api/public/leads` })
        .end();
      return;
    }
    if (code === 500) {
      res.writeHead(500).end("boom");
      return;
    }
    res.writeHead(201, { "content-type": "application/json" }).end('{"ok":true,"id":"stub"}');
  });
});

function listen(server) {
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server.address().port)));
}
async function freePort() {
  const s = createServer();
  const port = await listen(s);
  await new Promise((r) => s.close(r));
  return port;
}

// ---- app under test ---------------------------------------------------------
const stubPort = await listen(stub);
const appPort = await freePort();
const env = {
  ...process.env,
  NODE_ENV: "production",
  LEAD_INTAKE_KEY: LEAD_KEY,
  // trailing slash on purpose: platformBaseUrl() must strip it
  INS_PLATFORM_URL: `http://127.0.0.1:${stubPort}/`,
};
const app = spawn(process.execPath, [NEXT_BIN, "start", "-p", String(appPort), "-H", "127.0.0.1"], {
  cwd: ROOT,
  env,
  stdio: ["ignore", "pipe", "pipe"],
});
let appLog = "";
app.stdout.on("data", (d) => (appLog += d));
app.stderr.on("data", (d) => (appLog += d));

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`FAIL: ${msg}`);
};
const base = `http://127.0.0.1:${appPort}`;

async function waitForApp() {
  for (let i = 0; i < 120; i++) {
    if (app.exitCode !== null) break;
    try {
      const r = await fetch(`${base}/`, { signal: AbortSignal.timeout(2000) });
      if (r.status < 500) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`next start never became ready\n${appLog}`);
}

async function postQuote(body) {
  const r = await fetch(`${base}/api/quote`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: r.status, json: await r.json().catch(() => null) };
}

const INPUT = {
  firstName: "  Test ",
  lastName: "Proxy",
  email: "lead-proxy-check@example.invalid",
  phone: "555-0100",
  zip: "92101",
  lineOfBusiness: "Auto Insurance",
  message: "behavioural check",
  source: "check-lead-proxy",
  campaign: "ci",
  extraneous: "must not be forwarded",
};
// What route.ts must forward, in its key order (the platform sees these bytes).
const EXPECTED_BODY = JSON.stringify({
  firstName: "Test",
  lastName: "Proxy",
  email: "lead-proxy-check@example.invalid",
  phone: "555-0100",
  zip: "92101",
  lineOfBusiness: "Auto Insurance",
  message: "behavioural check",
  source: "check-lead-proxy",
  campaign: "ci",
});

try {
  await waitForApp();

  // 1. Delivered lead: contract unchanged, origin from INS_PLATFORM_URL.
  mode = "ok";
  hits = [];
  {
    const r = await postQuote(INPUT);
    if (r.status !== 200 || r.json?.ok !== true) fail(`delivered lead: expected 200 {ok:true}, got ${r.status} ${JSON.stringify(r.json)}`);
    if (hits.length !== 1) fail(`delivered lead: expected exactly 1 upstream request, got ${hits.length}`);
    const h = hits[0];
    if (h) {
      if (h.method !== "POST") fail(`delivered lead: upstream method ${h.method}, expected POST`);
      if (h.url !== "/api/public/leads") fail(`delivered lead: upstream path ${h.url}, expected /api/public/leads`);
      if (h.headers["content-type"] !== "application/json")
        fail(`delivered lead: Content-Type ${h.headers["content-type"]}, expected application/json`);
      if (h.headers["x-lead-key"] !== LEAD_KEY) fail("delivered lead: X-Lead-Key was not the LEAD_INTAKE_KEY value");
      if (h.body !== EXPECTED_BODY) fail(`delivered lead: body changed\n  got      ${h.body}\n  expected ${EXPECTED_BODY}`);
    }
  }

  // 2. Redirects are never followed and never reported as success.
  for (const m of ["r301", "r302", "r307", "r308"]) {
    mode = m;
    hits = [];
    const r = await postQuote(INPUT);
    if (r.status !== 502 || r.json?.ok !== false || !/nothing was sent/.test(r.json?.error ?? ""))
      fail(`${m}: expected 502 {ok:false, error:"…nothing was sent…"}, got ${r.status} ${JSON.stringify(r.json)}`);
    const followed = hits.filter((h) => h.url.startsWith("/moved-target/"));
    if (followed.length) fail(`${m}: the proxy FOLLOWED the redirect (${followed.map((h) => h.method).join(",")} to the Location)`);
  }
  if (!/Upstream redirected the lead POST/.test(appLog))
    fail("redirect: no '[lead-proxy] Upstream redirected the lead POST' log line — a misconfigured host must fail loudly");

  // 3. Upstream error -> honest 502.
  mode = "fail";
  {
    const r = await postQuote(INPUT);
    if (r.status !== 502 || r.json?.ok !== false) fail(`upstream 500: expected 502 {ok:false}, got ${r.status} ${JSON.stringify(r.json)}`);
  }

  // 4. Honeypot: silent success, platform never contacted.
  mode = "ok";
  hits = [];
  {
    const r = await postQuote({ ...INPUT, website: "http://spam.example" });
    if (r.status !== 200 || r.json?.ok !== true) fail(`honeypot: expected 200 {ok:true}, got ${r.status}`);
    if (hits.length) fail(`honeypot: platform was contacted ${hits.length} time(s)`);
  }
} catch (err) {
  fail(String(err?.stack ?? err));
} finally {
  app.kill();
  stub.close();
}

if (failures) {
  console.error(`\ncheck-lead-proxy: ${failures} failure(s)`);
  process.exit(1);
}
console.log("check-lead-proxy: OK — contract unchanged, origin from INS_PLATFORM_URL, 301/302/307/308 not followed (502), upstream error 502, honeypot silent");
process.exit(0);
