# ins-website — Tabor Agency

Public marketing / lead-generation site for the insurance agency. Built with
Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript (strict). Static/SSG — no database.

- **Live (production):** https://taboragency.com (+ `www`; GoDaddy → Cloudflare NS switch completed 2026-06-11 — canonicals/JSON-LD/sitemap all point here)
- **Secondary alias:** https://ins-website-sandy.vercel.app (same deployment)
- **Platform (lead intake + client portal):** https://ins.taboragency.com — the separate `ins-platform` app, one host for both (portal at `/portal`, login `/portal/login`). NOT this repo. Since the ins-platform Phase 3 cutover it replaces `ins.jahdev.com` (a temporary 301 to the new host) and `portal.taboragency.com` (deleted).

## Branding

The agency name and all NAP/contact/license details live in **`src/lib/brand.ts`**.
To rename the agency, edit that one file. The typographic SVG wordmark lives in
`src/components/Wordmark.tsx` (light/dark variants — no raster logos).
Palette: deep navy primary (`navy-*`), warm gold/brass secondary (`gold-*`),
bright gold CTA accent (`accent-*`) — tokens defined in `src/app/globals.css`.

## Structure

- `/` — home (hero, trust signals, coverage grid, captive-vs-independent, testimonials, carriers)
- `/personal` + `/personal/[slug]` — hub + 5 detail pages (auto, homeowners, renters, umbrella, life)
- `/business` + `/business/[slug]` — hub + 7 detail pages (GL, BOP, workers' comp, commercial auto, cyber, E&O, commercial property)
- `/quote` — 3-step quote form (supports `?line=Auto%20Insurance` prefill)
- `/client-login` — client portal landing (links out to the agency platform portal)
- `/claims`, `/about`, `/contact`, `/privacy`, `/terms`
- `sitemap.xml` + `robots.txt` generated from route data
- All coverage page content is data-driven from `src/lib/coverage-data.ts`

## Lead intake

The four form components (`QuoteForm`, `ContactForm`, `LeadForm`, and
`NewsletterSignup`) share `src/lib/lead-submission.ts`. Each mounted form assigns
a UUID to each original payload before requesting a context and posting to
`/api/quote`. Unchanged retries reuse that identity, including A -> B -> A edits
while previous attempts remain unresolved. Concurrent attempts are blocked.
There is no browser-storage persistence: reload, navigation, or modal unmount
ends the identity scope. A maximum of 100 unresolved payloads is retained; the
helper refuses new variants rather than evicting a retry identity.

Before submission the helper requests `/api/quote/context` with a supported
surface and UUID. The server signs a one-hour context bound to that identity,
using a domain-separated HMAC and the server-only intake key. Every retry gets a
fresh context, without changing its submission identity. The server derives
source/campaign and allowed coverage from its registry and checked-in article
metadata. Arbitrary source, campaign, referral and enum fields are rejected.
These public contexts constrain form semantics; they do **not** authenticate a
person, prove the page they visited, prevent bots, or implement rate limiting.

The proxy accepts a bounded JSON object (at most 1,300,000 UTF-8 bytes) with
string fields. It rejects oversized values before forwarding and leaves the
form input visible. It forwards accepted originals without trimming or slicing:
names up to 100 UTF-16 code units, email/phone/ZIP up to 2,000, message up to
200,000, coverage up to 100, honeypot up to 2,000, and signed context up to 2,048.
Name and at least one contact method must contain non-whitespace text.

**Forwarding originals is not a claim of durable original storage.** The
verified platform implementation normalizes names/contact fields and shortens
stored messages to 10,000 characters with an explicit shortened-message marker.
As-typed contact notes are capped at 300 characters. The website's preservation
guarantee covers forwarding, not lossless downstream storage.

The upstream JSON remains
`{firstName,lastName,email,phone,zip,lineOfBusiness,message,source,campaign}`.
Headers are `X-Lead-Key`, `Idempotency-Key`, and `X-Lead-Visitor-IP`. The endpoint
is `${INS_PLATFORM_URL}/api/public/leads`; blank/unset uses
`https://ins.taboragency.com`. `INS_PLATFORM_URL` and `LEAD_INTAKE_KEY` are
server-only, read at runtime, with no hardcoded credential fallback. Vercel env
changes still require a deployment. Redirects are never followed.

On Vercel (`VERCEL=1`), only a single valid `x-vercel-forwarded-for` address is
forwarded. Other forwarding headers and browser-supplied visitor addresses are
never trusted. Missing/malformed addresses and unsupported hosting fail closed.
The trust assumption follows
[Vercel's request-header contract](https://vercel.com/docs/headers/request-headers).
Actual Trusted Proxy/firewall configuration must be verified before release;
this implementation alone does not establish distributed abuse protection. The
platform's currently inspected limiter is process-local, a separate unresolved
dependency for distributed enforcement.

A synthetic local runner can set `LEAD_PROXY_TEST_MODE=loopback` only when the
upstream is HTTP on `127.0.0.1`, the incoming URL has a loopback hostname, the intake key
is the literal synthetic `check-lead-proxy-test-key`, and `VERCEL` is not `1`.
It supplies documentation address `192.0.2.1`; it does not trust client IP headers.
Never enable this mode on hosting. Use loopback stubs for behavioral checks;
no real form submissions are needed for deployment verification.

Success requires upstream 201 with `{ok:true,id,score}` or 200 with those fields
and `idempotent:true`. An empty, malformed, or unrelated 2xx is unconfirmed.
Timeouts, transport failures, redirects and upstream errors never promise that
nothing was sent. Conflicts (409), limiting (429), and validation failures (422)
retain meaningful statuses with fixed safe messages; raw upstream bodies and
visitor data are not logged or relayed. Browser success requires an explicit
`{ok:true,accepted:true}` from the proxy. Analytics fires only after confirmed
delivery. Newsletter success acknowledges the request, not proven enrollment.

The honeypot remains the sole deliberate silent-success path without upstream
forwarding. Its response is marked suppressed so the browser emits no lead
analytics. A filled `website` field can be probed without creating a lead.

`check:site` audits built pages and source invariants. `check:lead-proxy` runs the
real built proxy against a synthetic loopback platform. Both audit scripts must
track this contract, including context issuance, explicit acknowledgements,
original payload bytes, retry identity and safe failure behavior.

## Client portal links

`NEXT_PUBLIC_PORTAL_URL` (default `https://ins.taboragency.com`; blank counts as
unset) is the portal base; the site appends `/portal/login` and
`/portal/request-access` (used on `/client-login` and `/coverage-checkup`). It is
inlined at **build** time, so changing it on Vercel needs a redeploy. The portal no
longer has its own host: `portal.taboragency.com` was deleted at the ins-platform
Phase 3 cutover, and `check-site` fails any build whose pages still reference it,
`ins.jahdev.com` or `insdemo.jahdev.com` — including the real production artifact:
`deploy.yml` runs `check-site` on the `vercel build --prod` output (built with the
project's production env) before `vercel deploy`, so a stale Vercel
`NEXT_PUBLIC_PORTAL_URL` blocks the deploy instead of shipping dead links. See
`.env.example`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3215
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config, eslint-config-next)
npm run build      # production build (must be green before push)
node scripts/check-site.mjs        # post-build static audit (canonical host, links, assets, 404, lead-proxy tripwires)
node scripts/check-lead-proxy.mjs  # post-build behavioural test of /api/quote against a local stub platform
```

## Deploy

This repo's GitHub Actions **auto-deploy works — because the repo is PUBLIC.**
Private-repo Actions were disabled fleet-wide on 2026-07-23 (owner: redundant +
billing cap), which killed the equivalent workflow on every sibling site. Making
this repo private would silently kill this one too, with no failure signal — a push
would simply never deploy. Re-verify before trusting it:

```bash
gh api repos/eclawbot2-dot/ins-website --jq .private            # must be false
gh api repos/eclawbot2-dot/ins-website/actions/workflows --jq '.workflows[] | "\(.path) \(.state)"'
```

(Both workflows `active`, repo public, as of 2026-07-31.)

`.github/workflows/deploy.yml` deploys to Vercel production on every push to
`main`, gated by the `check` job (typecheck + lint + build + `check-site` +
`check-lead-proxy`) and by `check-site` again on the `vercel build --prod` output.
**Merging to `main` therefore deploys.** A manual
fallback is still available:

```bash
npx vercel deploy --prod --token <VERCEL_TOKEN> --yes
```

- Vercel project: `ins-website` (account `ericbbowman2-1420`, project `prj_EtUulkfUYaDCQcSzeHeTzb3Y9W3R`)
- Env vars on the project: `LEAD_INTAKE_KEY` (production only, encrypted),
  `NEXT_PUBLIC_PORTAL_URL` (all environments), and optionally `INS_PLATFORM_URL`
  (server-only; unset = `https://ins.taboragency.com`). **At the ins-platform
  Phase 3 cutover** `NEXT_PUBLIC_PORTAL_URL` must be changed from
  `https://portal.taboragency.com` (the deleted host) to
  `https://ins.taboragency.com` — or deleted, which gives the same default —
  in every environment, before the deploy. Because there is no hardcoded
  fallback, **preview deployments intentionally 502 on form submit** — a preview
  must not be able to inject leads into the live agency CRM. Set the key on
  preview only if you deliberately want previews writing real leads.
- Custom domains `taboragency.com` + `www.taboragency.com` are attached and live. Do not detach.
- The `*.vercel.app` alias carries a host-conditional `X-Robots-Tag: noindex, nofollow`
  from `next.config.ts` `headers()` (fleet-qa class #74) so the duplicate can't be
  indexed. It is deliberately **not** in a `vercel.json` — a `has`-conditional rule
  there deploys clean and silently never fires on a Next.js project. Verify both
  directions after any header change:

```bash
curl -sI "https://ins-website-sandy.vercel.app/" | grep -i x-robots-tag   # noindex, nofollow
curl -sI "https://taboragency.com/"              | grep -i x-robots-tag   # (no output — correct)
```

After deploying, verify against the production hostname:

```bash
curl -s "https://taboragency.com/?cb=$(date +%s)" | grep -o "Tabor Agency" | head -1
```

## CI

`.github/workflows/ci.yml` runs `npx tsc --noEmit`, `npm run lint`, `npm run build`,
`node scripts/check-site.mjs` and `node scripts/check-lead-proxy.mjs` on every push/PR to `main`.
`.github/workflows/deploy.yml` runs the same checks and then deploys to Vercel production.

## OWNER FLAGS

These are live on a **real** insurance company's website and need the owner's real
values — audits keep rediscovering them, so they are recorded here. The first three
are placeholder constants in the single file `src/lib/brand.ts`; the fourth records
an operational fix, done 2026-09-27, whose other half lives outside this repo.

- **Phone `(555) 014-7300` is a placeholder.** 555-01xx is the reserved fictional
  range; it is rendered as a `tel:` link in the header and footer of every page and
  as `telephone` in the LocalBusiness JSON-LD (`src/lib/seo.tsx`), and it is the
  number `/api/quote` prints to a visitor whose submission failed to deliver.
- **`CA License #0000000` is a placeholder** license number, displayed in the
  footer. A visibly fake licence number on a licensed insurance agency is a
  credibility and possibly a compliance problem.
- **`hello@taboragency.com` is unconfirmed** — it is the only mailbox the site
  publishes (and the only one `check-site` allows), but nobody has verified it
  receives mail.
- **`LEAD_INTAKE_KEY` was rotated on 2026-09-27.** The value that used to be
  hardcoded in `src/app/api/quote/route.ts`, and was copied into `.env.example`
  until the same day, is still in this public repo's git history. History is
  deliberately not rewritten: the platform refuses that value (`401`), and the
  rotation is what makes a leaked value useless. A new key was set as
  `LEAD_INTAKE_KEY` on `ins-platform` (checked by `/api/public/leads`) and on this
  Vercel project (Production, now type *sensitive*: Vercel will not show it again,
  so a lost key is replaced by rotating, not recovered), the site was redeployed,
  and the previous production key was retired (the platform now refuses it with
  `401`). The key lives only in those two env settings, never in this repo. If a
  key is ever committed here again, rotate it the same way: add the new key on
  ins-platform (Settings → Lead intake keys lets both keys work during the switch),
  switch this project's env and redeploy, then retire the old key.
