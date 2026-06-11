import { BRAND } from "@/lib/brand";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import type { CoverageLine } from "@/lib/coverage-data";

/** Renders a JSON-LD <script> tag. Server-component safe. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
    description: `${BRAND.name} is an independent insurance agency comparing personal and business coverage across ${BRAND.carriers.length}+ top-rated carriers.`,
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
    areaServed: { "@type": "State", name: "California" },
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
      "Auto Insurance",
      "Homeowners Insurance",
      "Renters Insurance",
      "Umbrella Insurance",
      "Life Insurance",
      "Health Insurance",
      "General Liability Insurance",
      "Business Owners Policy",
      "Workers Compensation Insurance",
      "Commercial Auto Insurance",
      "Cyber Insurance",
      "Professional Liability Insurance",
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
