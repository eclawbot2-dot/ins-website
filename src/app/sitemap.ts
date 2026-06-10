import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/personal", "/business", "/quote", "/claims", "/about", "/contact", "/privacy", "/terms"];

  return [
    ...staticPages.map((path) => ({
      url: `${BRAND.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path === "/quote" ? 0.9 : 0.7,
    })),
    ...PERSONAL_LINES.map((l) => ({
      url: `${BRAND.url}/personal/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...BUSINESS_LINES.map((l) => ({
      url: `${BRAND.url}/business/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
