/**
 * Single source of truth for agency branding.
 * To rebrand the site, edit this file only.
 */
export const BRAND = {
  name: "Tabor Agency",
  legalName: "Tabor Insurance Agency",
  shortName: "Tabor",
  tagline: "Independent insurance, built around your best interest.",
  domain: "taboragency.com",
  url: "https://taboragency.com",
  phone: "(555) 014-7300",
  phoneHref: "tel:+15550147300",
  email: "hello@taboragency.com",
  address: {
    street: "1200 Prospect Street, Suite 240",
    city: "San Diego",
    state: "CA",
    zip: "92101",
  },
  hours: [
    { days: "Monday – Friday", hours: "8:00 AM – 6:00 PM PT" },
    { days: "Saturday", hours: "9:00 AM – 1:00 PM PT" },
    { days: "Sunday", hours: "Closed" },
  ],
  license: "CA License #0000000", // placeholder — replace with real license number
  foundedYear: 2026,
  carriers: [
    "Progressive",
    "Travelers",
    "Hartford",
    "Liberty Mutual",
    "Chubb",
    "Nationwide",
    "Safeco",
    "Hanover",
  ],
  /**
   * Cities / regions served — used for local-SEO content and LocalBusiness
   * areaServed JSON-LD. Replace with the agency's real footprint.
   */
  serviceAreas: [
    "San Diego",
    "La Jolla",
    "Chula Vista",
    "Carlsbad",
    "Escondido",
    "El Cajon",
    "Oceanside",
    "Encinitas",
    "Coronado",
    "Poway",
  ],
  /** Geo coordinates for LocalBusiness JSON-LD (office location). */
  geo: { latitude: 32.8328, longitude: -117.2713 },
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
