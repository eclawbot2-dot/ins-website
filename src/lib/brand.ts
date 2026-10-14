/**
 * Single source of truth for agency branding.
 * To rebrand the site, edit this file only.
 */
export const BRAND = {
  name: "Tabor Agency",
  shortName: "Tabor",
  tagline: "Independent insurance, built around your best interest.",
  domain: "taboragency.com",
  url: "https://taboragency.com",
  // Contact, licensing, location, hours, legal identity, founding and carrier facts
  // remain unpublished until verified from real agency evidence, never fixtures.
} as const;

/**
 * The agency platform (ins-platform) production origin. It serves BOTH the
 * public lead-intake API (/api/public/leads) and the client portal (/portal)
 * on this one host — there is no separate portal host any more
 * (portal.taboragency.com was retired at the ins-platform Phase 3 cutover, and
 * ins.jahdev.com only 301s here for a short rollback window).
 *
 * This is only the default; each consumer has its own env override:
 *  - lead intake (server-only): INS_PLATFORM_URL — src/app/api/quote/route.ts
 *  - portal links (build-time): NEXT_PUBLIC_PORTAL_URL — below
 */
export const PLATFORM_DEFAULT_URL = "https://ins.taboragency.com";

/**
 * Read a base-URL env var: trimmed, trailing slashes stripped, and an EMPTY
 * value treated as unset. (`??` alone would keep "" — a blank Vercel env var —
 * and produce host-relative links like "/portal/login" on this marketing site.)
 */
export function platformBaseUrl(value: string | undefined): string {
  return (value?.trim() || PLATFORM_DEFAULT_URL).replace(/\/+$/, "");
}

/**
 * Client portal (agency platform) base URL — the site appends /portal/login
 * and /portal/request-access. Set NEXT_PUBLIC_PORTAL_URL on the host to
 * repoint without a code change (it is inlined at BUILD time, so a change
 * needs a redeploy). Unset, it defaults to PLATFORM_DEFAULT_URL.
 */
const PORTAL_BASE: string = platformBaseUrl(process.env.NEXT_PUBLIC_PORTAL_URL);

export const PORTAL_LOGIN_URL = `${PORTAL_BASE}/portal/login`;
export const PORTAL_REQUEST_ACCESS_URL = `${PORTAL_BASE}/portal/request-access`;
export const PORTAL_CERTIFICATES_URL = `${PORTAL_BASE}/portal/certificates`;
export const COVERAGE_CHECKUP_URL = `${PORTAL_BASE}/coverage-checkup`;
