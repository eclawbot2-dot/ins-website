import { BRAND } from "@/lib/brand";

/**
 * Canonical site origin for SEO (canonicals, sitemap, robots, JSON-LD, OG).
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — explicit override if ever needed.
 *  2. BRAND.url — https://taboragency.com. The domain is attached to the
 *     Vercel project and is LIVE (GoDaddy→Cloudflare NS switch completed
 *     2026-06-11); the *.vercel.app URL is a secondary alias.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? BRAND.url;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
