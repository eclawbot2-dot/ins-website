# ins-website — Tabor Agency

Public marketing / lead-generation site for the insurance agency. Built with
Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript (strict). Static/SSG — no database.

- **Live (interim):** https://ins-website-sandy.vercel.app
- **Canonical domain:** https://taboragency.com (attached to the Vercel project; goes live when GoDaddy NS switches to Cloudflare — canonicals/JSON-LD/sitemap already point at it)
- **Platform (lead intake + client portal):** https://ins.jahdev.com (separate internal app)

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
the site appends `/portal/login` and `/portal/request-access`. Flip the Vercel
env to `https://portal.taboragency.com` once that DNS is live — no code change
needed. See `.env.example`.

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
- Env vars on the project: `LEAD_INTAKE_KEY` (production), `NEXT_PUBLIC_PORTAL_URL` (all environments)
- Custom domains `taboragency.com` + `www` are attached; they resolve once the
  GoDaddy → Cloudflare NS switch completes. Do not detach.

After deploying, verify:

```bash
curl -s "https://ins-website-sandy.vercel.app/?cb=$(date +%s)" | grep -o "Tabor Agency" | head -1
```

## CI

`.github/workflows/ci.yml` runs `npx tsc --noEmit` and `npm run build` on every push/PR to `main`.
