// Post-build static-output audit. Run after `next build` (standard build —
// prerendered routes land in .next/server/app/*.html; /quote and /api/* are
// dynamic and are intentionally not asserted as prerendered files).
//
// Guards (fleet-qa classes noted):
//  - canonical host single-sourced from src/lib/brand.ts and consistent across
//    sitemap/robots/canonicals (#42/#47)
//  - external-link policy: only verified hosts, no fabricated socials (#4)
//  - referenced /img assets exist; no leftover template tokens (#33/#49)
//  - branded 404, not Next's default (#22)
//  - icon set present and apple-icon is a real 180x180 PNG (#25)
//  - only the published agency mailto/phone may appear (#4)
//  - lead proxy: env-only key, honest failures, config-driven platform origin,
//    redirects never followed; no page references a retired platform host
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, ".next", "server", "app");

// Canonical origin — single-sourced from src/lib/brand.ts.
const brandTs = readFileSync(join(ROOT, "src", "lib", "brand.ts"), "utf8");
const SITE_URL = brandTs.match(/url: "([^"]+)"/)?.[1];
const BRAND_EMAIL = brandTs.match(/email: "([^"]+)"/)?.[1];

// Verified external hosts this site may reference.
const ALLOWED_HOSTS = new Set([
  "www.w3.org", // SVG/xmlns namespaces
  "schema.org", // JSON-LD @context
  "www.google.com", // Google Maps link in LocalBusiness JSON-LD (hasMap)
  "ins.taboragency.com", // agency platform: client portal (/portal) + lead intake, one host
]);

const FORBIDDEN = [
  /localhost:\d/i,
  // Retired agency-platform hosts (ins-platform Phase 3 cutover): portal.taboragency.com
  // is deleted; ins.jahdev.com and insdemo.jahdev.com are temporary 301s. A page that
  // still references one carries a dead or soon-dead client-portal link.
  /ins\.jahdev\.com|insdemo\.jahdev\.com|portal\.taboragency\.com/i,
  /instagram\.com|twitter\.com|facebook\.com|linkedin\.com/i, // no verified socials exist — any would be fabricated (#4)
  /\{[A-Z_]{3,}\}/, // leftover template tokens (#49)
];

// Static routes that must be prerendered AND present in the sitemap.
// ("/quote" is in the sitemap but server-rendered on demand — no .html file.)
const PRERENDERED_ROUTES = [
  "",
  "/business",
  "/personal",
  "/coverage-checkup",
  "/switch-and-save",
  "/certificate",
  "/resources",
  "/claims",
  "/client-login",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/thank-you",
];
const SITEMAP_ONLY_ROUTES = ["/quote"]; // dynamic, still canonical
const NON_SITEMAP_ROUTES = ["/thank-you"]; // prerendered but not a landing page

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`FAIL: ${msg}`);
};

if (!SITE_URL) {
  console.error("FAIL: could not parse BRAND.url from src/lib/brand.ts");
  process.exit(1);
}
if (!existsSync(OUT)) {
  console.error(`FAIL: ${OUT} not found — run \`next build\` first.`);
  process.exit(1);
}

// 1. Build artifacts + icon assets.
for (const f of ["index.html", "_not-found.html", "sitemap.xml.body", "robots.txt.body"]) {
  if (!existsSync(join(OUT, f))) fail(`missing build artifact ${f}`);
}
for (const f of ["src/app/icon.svg", "src/app/apple-icon.png", "src/app/favicon.ico"]) {
  if (!existsSync(join(ROOT, f))) fail(`missing icon source ${f}`);
}
// apple-icon must be a REAL 180x180 PNG (#25 — iOS ignores SVG touch icons).
if (existsSync(join(ROOT, "src/app/apple-icon.png"))) {
  const png = readFileSync(join(ROOT, "src/app/apple-icon.png"));
  const isPng = png.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (!isPng) fail("apple-icon.png is not a real PNG");
  else if (png.readUInt32BE(16) !== 180 || png.readUInt32BE(20) !== 180)
    fail(`apple-icon.png is ${png.readUInt32BE(16)}x${png.readUInt32BE(20)}, expected 180x180`);
}

// 1a. Lead-proxy honesty + credential tripwires (src/app/api/quote/route.ts).
// This is a PUBLIC repo whose forms are the agency's only lead channel, so two
// things must stay true forever:
//   (a) the X-Lead-Key is read from the environment with NO literal fallback —
//       a hardcoded default here is a published credential (#4-family), and it
//       looks harmless because the env var IS set in production, so the
//       fallback never fires while the constant sits in public git history;
//   (b) a failed forward must NOT return `ok: true` — the visitor would be
//       told an advisor is calling back about a lead that does not exist (#43).
{
  const routeRel = "src/app/api/quote/route.ts";
  const routePath = join(ROOT, routeRel);
  if (!existsSync(routePath)) fail(`missing ${routeRel} — the lead proxy every form posts to`);
  else {
    const src = readFileSync(routePath, "utf8");

    // (a) Pin the exact key read. An allow-shape assertion (rather than a
    //     deny-list of fallback spellings) is the only robust form: `?? "x"`,
    //     `|| DEV_KEY`, `process.env["LEAD_INTAKE_KEY"] ?? …` and
    //     `const { LEAD_INTAKE_KEY = "…" } = process.env` all evade a deny-list,
    //     and any of them republishes a working credential. This trips loudly on
    //     ANY rewrite of the line, which is the intent — re-read the route and
    //     update this assertion deliberately.
    if (!/^const LEAD_KEY = process\.env\.LEAD_INTAKE_KEY;\s*$/m.test(src))
      fail(
        `${routeRel}: the X-Lead-Key read is no longer the exact bare env read ` +
          `\`const LEAD_KEY = process.env.LEAD_INTAKE_KEY;\` — any fallback value here is a published credential`
      );

    // (b) Exactly two success responses may exist: the honeypot short-circuit
    //     and the delivered lead. Counting `ok: true` (rather than the 502s)
    //     is what actually regresses — the old bug was an extra `ok: true` on
    //     the failure path, and this survives refactors that funnel the failure
    //     exits through one helper.
    const okTrue = (src.match(/ok:\s*true/g) ?? []).length;
    if (okTrue !== 2)
      fail(
        `${routeRel}: found ${okTrue} \`ok: true\` responses, expected exactly 2 ` +
          `(honeypot short-circuit + delivered lead) — a third means a failure path reports success`
      );
    // Failure responses now use a helper; actual status/body behavior is tested
    // by check-lead-proxy. Keep the static false-success and credential guards.
    if (!/return failure\(UNCONFIRMED, 502\)/.test(src))
      fail(`${routeRel}: missing unconfirmed-delivery failure response`);

    // (c) The upstream ORIGIN is config (INS_PLATFORM_URL, default in brand.ts),
    //     never a hardcoded host: a literal here is how the endpoint was left
    //     pointing at a host that became a redirect. And the POST must not follow
    //     redirects — fetch re-issues a followed 301/302 POST as a bodiless GET,
    //     i.e. a lost lead that can still come back 2xx.
    //     scripts/check-lead-proxy.mjs exercises both behaviourally.
    if (!/platformBaseUrl\(process\.env\.INS_PLATFORM_URL\)/.test(src))
      fail(`${routeRel}: the lead endpoint no longer derives from platformBaseUrl(process.env.INS_PLATFORM_URL)`);
    if (/["'`]https?:\/\//.test(src))
      fail(`${routeRel}: hardcoded absolute URL literal — the platform origin must come from INS_PLATFORM_URL / PLATFORM_DEFAULT_URL`);
    // Anchored to a whole code line so the explanatory comment in route.ts
    // (which quotes the option) can't satisfy it on its own.
    if (!/^\s*redirect:\s*["']manual["'],?\s*$/m.test(src))
      fail(`${routeRel}: the upstream fetch must set redirect: "manual" — a followed redirect drops the POST body`);
  }
}

// 1a-i. The platform default is the production single host (portal + lead
// intake). Pinned so a stray edit can't silently repoint every client-login
// link and every lead at the wrong origin.
{
  const def = brandTs.match(/PLATFORM_DEFAULT_URL = "([^"]+)"/)?.[1];
  if (def !== "https://ins.taboragency.com")
    fail(`src/lib/brand.ts: PLATFORM_DEFAULT_URL is ${def ?? "(missing)"}, expected https://ins.taboragency.com`);
}

// 1a-ii. Repo-wide: the lead key may only ever come from the environment.
// A literal X-Lead-Key anywhere under src/ is a published credential.
{
  const srcDir = join(ROOT, "src");
  const walk = function* (dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) yield* walk(p);
      else if (/\.(ts|tsx|mjs|js)$/.test(name)) yield p;
    }
  };
  for (const f of walk(srcDir)) {
    const src = readFileSync(f, "utf8");
    if (/["']X-Lead-Key["']\s*:\s*["'`]/i.test(src))
      fail(`${f.slice(ROOT.length)}: hardcoded X-Lead-Key literal — the key must come from process.env only`);
  }
}

// 1b. Every route we expect prerendered has a .html — independent of the
// sitemap, so a route dropping out of BOTH is still caught (e.g. /thank-you,
// which is deliberately not a sitemap entry).
for (const r of PRERENDERED_ROUTES) {
  const f = r === "" ? "index.html" : `${r.slice(1)}.html`;
  if (!existsSync(join(OUT, f))) fail(`expected prerendered route ${r || "/"} missing (${f})`);
}

// 2. Sitemap: canonical host only; exact route sync with the prerender set.
if (existsSync(join(OUT, "sitemap.xml.body"))) {
  const sm = readFileSync(join(OUT, "sitemap.xml.body"), "utf8");
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) fail("sitemap has no <loc> entries");
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) fail(`sitemap loc not on canonical origin: ${loc}`);
  }
  const paths = new Set(locs.map((l) => l.replace(SITE_URL, "")));
  for (const r of [...PRERENDERED_ROUTES.filter((p) => !NON_SITEMAP_ROUTES.includes(p)), ...SITEMAP_ONLY_ROUTES]) {
    if (!paths.has(r)) fail(`sitemap missing canonical route "${r || "/"}"`);
  }
  // every sitemap path (static or SSG detail page) must have a prerendered
  // .html, except the known-dynamic ones.
  for (const p of paths) {
    if (SITEMAP_ONLY_ROUTES.includes(p)) continue;
    const htmlName = p === "" ? "index.html" : `${p.slice(1)}.html`;
    if (!existsSync(join(OUT, htmlName))) fail(`sitemap route ${p || "/"} has no prerendered ${htmlName}`);
  }
}

// 3. robots.txt points at the canonical sitemap.
if (existsSync(join(OUT, "robots.txt.body"))) {
  const robots = readFileSync(join(OUT, "robots.txt.body"), "utf8");
  if (!robots.includes(`${SITE_URL}/sitemap.xml`)) fail("robots.txt sitemap URL is not on the canonical origin");
}

// 4. Every prerendered page: link policy, asset existence, mailto policy.
let pages = 0;
for (const file of htmlFiles(OUT)) {
  pages++;
  const html = readFileSync(file, "utf8");
  const rel = file.slice(OUT.length).replace(/\\/g, "/");

  for (const re of FORBIDDEN) {
    if (re.test(html)) fail(`${rel}: matches forbidden pattern ${re}`);
  }
  for (const m of html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)) {
    let host;
    try {
      host = new URL(m[1]).hostname;
    } catch {
      fail(`${rel}: malformed absolute URL ${m[1]}`);
      continue;
    }
    if (host === new URL(SITE_URL).hostname || ALLOWED_HOSTS.has(host)) continue;
    fail(`${rel}: link to unverified external host ${host} (${m[1]})`);
  }
  for (const m of html.matchAll(/(?:href|src)="(\/img\/[^"?]+)/g)) {
    const asset = decodeURIComponent(m[1]);
    if (!existsSync(join(ROOT, "public", asset))) fail(`${rel}: references missing asset ${asset}`);
  }
  // Only the published agency mailbox may ever appear in a mailto (#4).
  // RSC flight payloads escape quotes as \" — stop the capture at a backslash too.
  for (const m of html.matchAll(/mailto:([^"?&\\]+)/g)) {
    if (m[1] !== BRAND_EMAIL) fail(`${rel}: unexpected mailto ${m[1]} (only ${BRAND_EMAIL} is published)`);
  }
}
if (pages < 30) fail(`only ${pages} HTML pages prerendered — expected hubs + 12 coverage lines + 10 articles + core pages`);

// 5. 404 must be the branded one, not Next's default (#22).
if (existsSync(join(OUT, "_not-found.html"))) {
  const p404 = readFileSync(join(OUT, "_not-found.html"), "utf8");
  if (p404.includes("This page could not be found")) fail("_not-found.html is the unbranded Next default");
  if (!p404.includes("Page not found")) fail("_not-found.html is missing the branded copy");
}

// 6. Public checkups and existing-client certificate service must remain usable
// without JavaScript. Inspect actual main-content anchors, not RSC scripts or
// shared footer links (the footer legitimately contains a newsletter form).
for (const [route, requiredLinks] of [
  ["coverage-checkup", [
    ["Start My Free Checkup", "https://ins.taboragency.com/coverage-checkup"],
    ["Continue to Policy Upload", "https://ins.taboragency.com/coverage-checkup"],
    ["Start My Checkup", "https://ins.taboragency.com/coverage-checkup"],
  ]],
  ["certificate", [
    ["Request a Certificate", "https://ins.taboragency.com/portal/certificates"],
    ["Sign in", "https://ins.taboragency.com/portal/login"],
    ["request portal access", "https://ins.taboragency.com/portal/request-access"],
    ["Get a New Coverage Quote", "/quote"],
  ]],
]) {
  const file = join(OUT, `${route}.html`);
  if (!existsSync(file)) continue; // Missing artifacts are already reported above.
  const rendered = readFileSync(file, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const main = rendered.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) {
    fail(`${route}: missing rendered main content for service routing`);
    continue;
  }
  const links = [...main.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      href: match[1],
      label: match[2].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    }));
  for (const [label, href] of requiredLinks) {
    if (!links.some((link) => link.label === label && link.href === href))
      fail(`${route}: rendered "${label}" link must point to ${href}`);
  }
  if (/<form\b/i.test(main))
    fail(`${route}: service routing must not render a local lead-submission form`);
  if (route === "coverage-checkup" && /coming soon/i.test(main))
    fail("coverage-checkup: public upload funnel must not be advertised as coming soon");
}

if (failures) {
  console.error(`\ncheck-site: ${failures} failure(s) across ${pages} pages`);
  process.exit(1);
}
console.log(`check-site: OK — ${pages} pages, canonical host + link policy + sitemap sync + icons verified`);
