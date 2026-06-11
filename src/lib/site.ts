import { BRAND } from "@/lib/brand";

/**
 * Canonical site origin for SEO (canonicals, sitemap, robots, JSON-LD, OG).
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this once a custom domain goes live.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the *.vercel.app production URL,
 *     so canonicals always point at the URL that actually serves the site.
 *  3. BRAND.url — local-build fallback.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : BRAND.url);

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
