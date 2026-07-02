# ins-website — Tabor Agency

Public marketing / lead-generation site for the insurance agency. Built with
Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript (strict). Static/SSG — no database.

- **Live (production):** https://taboragency.com (+ `www`; GoDaddy → Cloudflare NS switch completed 2026-06-11 — canonicals/JSON-LD/sitemap all point here)
- **Secondary alias:** https://ins-website-sandy.vercel.app (same deployment)
- **Platform (lead intake + client portal):** https://ins.jahdev.com — the separate self-hosted `ins-platform` app (`ins-next` Windows service on :3220 behind a Cloudflare tunnel). NOT this repo.

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

Both forms POST to the internal proxy `POST /api/quote`, which forwards JSON
`{firstName,lastName,email,phone,zip,lineOfBusiness,message,source}` to
`https://ins.jahdev.com/api/public/leads` with header `X-Lead-Key` read from the
`LEAD_INTAKE_KEY` env var (defaults to the dev key). If the platform is offline the
visitor still sees success; the failure is logged server-side.

## Client portal links

`NEXT_PUBLIC_PORTAL_URL` (default `https://ins.jahdev.com`) is the portal base;
the site appends `/portal/login` and `/portal/request-access`. The Vercel env
is already set to `https://portal.taboragency.com` (live). See `.env.example`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3215
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (flat config, eslint-config-next)
npm run build      # production build (must be green before push)
node scripts/check-site.mjs  # post-build static audit (canonical host, links, assets, 404)
```

## Deploy

This repo's GitHub Actions **auto-deploy works** (unlike most of the fleet):
`.github/workflows/deploy.yml` deploys to Vercel production on every push to
`main`, gated by the `check` job (typecheck + build + `check-site`). A manual
fallback is still available:

```bash
npx vercel deploy --prod --token <VERCEL_TOKEN> --yes
```

- Vercel project: `ins-website` (account `ericbbowman2-1420`, project `prj_EtUulkfUYaDCQcSzeHeTzb3Y9W3R`)
- Env vars on the project: `LEAD_INTAKE_KEY` (production), `NEXT_PUBLIC_PORTAL_URL` (all environments)
- Custom domains `taboragency.com` + `www.taboragency.com` are attached and live. Do not detach.

After deploying, verify against the production hostname:

```bash
curl -s "https://taboragency.com/?cb=$(date +%s)" | grep -o "Tabor Agency" | head -1
```

## CI

`.github/workflows/ci.yml` runs `npx tsc --noEmit`, `npm run lint`, `npm run build`,
and `node scripts/check-site.mjs` on every push/PR to `main`.
`.github/workflows/deploy.yml` runs the same checks and then deploys to Vercel production.
