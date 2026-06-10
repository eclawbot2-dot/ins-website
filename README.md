# ins-website — Harborline Insurance Group

Public marketing / lead-generation site for the insurance agency. Built with
Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript (strict). Static/SSG — no database.

- **Live:** https://ins.jahdev.com
- **Platform (lead intake):** https://ins-app.jahdev.com (separate internal app)

## Branding

The agency name and all NAP/contact/license details live in **`src/lib/brand.ts`**.
To rename the agency, edit that one file.

## Structure

- `/` — home (hero, trust signals, coverage grid, captive-vs-independent, testimonials, carriers)
- `/personal` + `/personal/[slug]` — hub + 6 detail pages (auto, homeowners, renters, umbrella, life, health)
- `/business` + `/business/[slug]` — hub + 7 detail pages (GL, BOP, workers' comp, commercial auto, cyber, E&O, commercial property)
- `/quote` — 3-step quote form (supports `?line=Auto%20Insurance` prefill)
- `/claims`, `/about`, `/contact`, `/privacy`, `/terms`
- `sitemap.xml` + `robots.txt` generated from route data
- All coverage page content is data-driven from `src/lib/coverage-data.ts`

## Lead intake

Both forms POST to the internal proxy `POST /api/quote`, which forwards JSON
`{firstName,lastName,email,phone,zip,lineOfBusiness,message,source}` to
`https://ins-app.jahdev.com/api/public/leads` with header `X-Lead-Key` read from the
`LEAD_INTAKE_KEY` env var (defaults to the dev key). If the platform is offline the
visitor still sees success; the failure is logged server-side.

## Develop

```bash
npm install
npm run dev        # http://localhost:3215
npx tsc --noEmit   # typecheck
npm run build      # production build (must be green before push)
```

## Deploy (manual — GitHub→Vercel auto-deploy is broken on this account)

From the repo root:

```bash
npx vercel deploy --prod --token <VERCEL_TOKEN> --yes
```

- Vercel project: `ins-website` (account `ericbbowman2-1420`)
- Env var `LEAD_INTAKE_KEY` must be set on the project (production).
- Custom domain `ins.jahdev.com` → CNAME `cname.vercel-dns.com` (Cloudflare, DNS-only / unproxied).

After deploying, verify:

```bash
curl -s "https://ins.jahdev.com/?cb=$(date +%s)" | grep -o Harborline | head -1
```

## CI

`.github/workflows/ci.yml` runs `npx tsc --noEmit` and `npm run build` on every push/PR to `main`.
