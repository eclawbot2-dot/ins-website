import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "",
    "/personal",
    "/business",
    "/quote",
    "/claims",
    "/client-login",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/quote" ? 0.9 : 0.7,
    })),
    ...PERSONAL_LINES.map((l) => ({
      url: `${SITE_URL}/personal/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...BUSINESS_LINES.map((l) => ({
      url: `${SITE_URL}/business/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
