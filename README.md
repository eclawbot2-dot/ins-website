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

All four lead surfaces (`QuoteForm`, `ContactForm`, `LeadForm`, `NewsletterSignup`)
POST to the internal proxy `POST /api/quote`, which forwards JSON
`{firstName,lastName,email,phone,zip,lineOfBusiness,message,source,campaign}` to
`${INS_PLATFORM_URL}/api/public/leads` with header `X-Lead-Key` read from the
`LEAD_INTAKE_KEY` env var.

`INS_PLATFORM_URL` is **server-only** (never `NEXT_PUBLIC_`, never shipped to the
browser) and read from the server's runtime environment (not inlined at build,
but on Vercel an env change still only applies to a new deployment); unset or
blank, it defaults to `https://ins.taboragency.com` (`PLATFORM_DEFAULT_URL` in
`src/lib/brand.ts`; a trailing slash is stripped). Only the base URL is
configurable — the `/api/public/leads` path is the platform's contract.

**The proxy never follows a redirect** (`redirect: "manual"`). fetch re-issues a
followed 301/302 POST as a GET with no body, so following one would lose the lead
while possibly still getting a 2xx back. A 3xx from the platform can only mean
`INS_PLATFORM_URL` names a moved or retired host (e.g. `ins.jahdev.com` after the
cutover), so the route logs `[lead-proxy] Upstream redirected the lead POST` with
the `Location` and returns the same honest **502** as any failed forward.

**The proxy never reports success for a lead it did not deliver.** If the key is
missing, the platform rejects the lead, or the forward times out (10s), the route
returns **502** with an honest message telling the visitor nothing was sent — every
form keeps their typed input on screen and shows it, so they can retry or call.
Reporting success on a dropped lead would leave an insurance shopper waiting for a
callback that will never come, and the only record would be a `console.error` in a
serverless function nobody reads. The failure message carries `BRAND.phone` and
`BRAND.email` so the visitor is not left without a channel.

`scripts/check-site.mjs` pins this with static assertions over `route.ts`:
the key read must be the exact bare `process.env.LEAD_INTAKE_KEY` line (any
fallback spelling fails), there must be **exactly two** `ok: true` responses (the
honeypot short-circuit and a delivered lead — a third means a failure path is
reporting success again), at least one `502` must remain, the endpoint must derive
from `platformBaseUrl(process.env.INS_PLATFORM_URL)` with no absolute-URL literal in
the route, the fetch must carry a `redirect: "manual"` code line, and
`PLATFORM_DEFAULT_URL` in `brand.ts` must be `https://ins.taboragency.com`. A
repo-wide sweep additionally fails on a literal `X-Lead-Key` header value anywhere
under `src/`. These are text assertions: they trip on a revert and on any rewrite of
the pinned lines, so re-read the route and update them deliberately.

`scripts/check-lead-proxy.mjs` is the behavioural test (run after `npm run build`):
it starts the built app with `next start`, points `INS_PLATFORM_URL` at a local stub
platform, and asserts the forwarded request is unchanged (POST, `Content-Type`,
`X-Lead-Key`, exact body bytes, `/api/public/leads` path), that 301/302/307/308 are
not followed and come back as 502, that an upstream 500 is a 502, and that the
honeypot never contacts the platform. Nothing leaves the machine.

**There is no hardcoded key fallback.** This repo is public; a literal default here
is a published credential, and because `LEAD_INTAKE_KEY` *is* set in production the
fallback would never fire — so nothing would ever look broken while the constant sat
in public git history.

Safe probe that creates **no** lead: POST with the honeypot field `website` filled.
The proxy short-circuits to `{"ok":true}` without ever contacting the platform.
Verified live 2026-07-31 against `https://taboragency.com/api/quote`.

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
