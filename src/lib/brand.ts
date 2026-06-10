/**
 * Single source of truth for agency branding.
 * To rebrand the site, edit this file only.
 */
export const BRAND = {
  name: "Harborline Insurance Group",
  shortName: "Harborline",
  tagline: "Independent insurance, anchored in your best interest.",
  domain: "ins.jahdev.com",
  url: "https://ins.jahdev.com",
  phone: "(555) 014-7300",
  phoneHref: "tel:+15550147300",
  email: "hello@ins.jahdev.com",
  address: {
    street: "1200 Harbor Point Drive, Suite 240",
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
