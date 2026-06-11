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
} as const;

/**
 * Client portal (agency platform) base URL.
 * Set NEXT_PUBLIC_PORTAL_URL on the host (Vercel) to repoint without a code
 * change — e.g. flip to https://portal.taboragency.com once DNS is live.
 */
const PORTAL_BASE: string = (
  process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://ins.jahdev.com"
).replace(/\/+$/, "");

export const PORTAL_LOGIN_URL = `${PORTAL_BASE}/portal/login`;
export const PORTAL_REQUEST_ACCESS_URL = `${PORTAL_BASE}/portal/request-access`;
