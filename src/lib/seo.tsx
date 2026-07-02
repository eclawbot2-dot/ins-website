import { BRAND } from "@/lib/brand";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import type { CoverageLine } from "@/lib/coverage-data";
import type { Article } from "@/lib/blog-data";

/** Renders a JSON-LD <script> tag. Server-component safe. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so no string value can ever break out of the script tag
      // (e.g. a future content edit containing "</script>").
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Site-wide InsuranceAgency (subtype of Organization + LocalBusiness). */
export function agencyJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${SITE_URL}/#agency`,
    name: BRAND.name,
    alternateName: BRAND.shortName,
    description: `${BRAND.name} is an independent insurance agency comparing business and personal coverage across ${BRAND.carriers.length}+ top-rated carriers.`,
    url: SITE_URL,
    telephone: BRAND.phone,
    email: BRAND.email,
    slogan: BRAND.tagline,
    foundingDate: String(BRAND.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.city,
      addressRegion: BRAND.address.state,
      postalCode: BRAND.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BRAND.geo.latitude,
      longitude: BRAND.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${BRAND.address.street}, ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.zip}`
    )}`,
    priceRange: "Free quotes · No-fee advisory",
    areaServed: [
      { "@type": "State", name: "California" },
      ...BRAND.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    knowsAbout: [
      "General Liability Insurance",
      "Business Owners Policy",
      "Workers Compensation Insurance",
      "Commercial Auto Insurance",
      "Cyber Insurance",
      "Professional Liability Insurance",
      "Commercial Property Insurance",
      "Auto Insurance",
      "Homeowners Insurance",
      "Renters Insurance",
      "Umbrella Insurance",
      "Life Insurance",
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleJsonLd(article: Article): Record<string, unknown> {
  const path = `/resources/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: article.title,
    description: article.description,
    url: absoluteUrl(path),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    articleSection: article.category,
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    author: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/opengraph-image") },
    },
    about: article.related.map((r) => ({ "@type": "Thing", name: r.label })),
  };
}

export function serviceJsonLd(line: CoverageLine): Record<string, unknown> {
  const path = `/${line.category}/${line.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: line.name,
    serviceType: line.name,
    description: line.summary,
    url: absoluteUrl(path),
    category: line.category === "personal" ? "Personal Insurance" : "Business Insurance",
    provider: { "@id": `${SITE_URL}/#agency` },
    areaServed: { "@type": "State", name: "California" },
    offers: {
      "@type": "Offer",
      description: `Free, no-obligation ${line.shortName.toLowerCase()} insurance quotes compared across ${BRAND.carriers.length}+ carriers.`,
      price: "0",
      priceCurrency: "USD",
    },
  };
}
