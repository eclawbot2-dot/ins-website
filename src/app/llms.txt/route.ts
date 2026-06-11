import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";

export const dynamic = "force-static";

export function GET(): Response {
  const personal = PERSONAL_LINES.map(
    (l) => `- [${l.name}](${SITE_URL}/personal/${l.slug}): ${l.summary}`
  ).join("\n");
  const business = BUSINESS_LINES.map(
    (l) => `- [${l.name}](${SITE_URL}/business/${l.slug}): ${l.summary}`
  ).join("\n");

  const body = `# ${BRAND.name}

> ${BRAND.name} is an independent insurance agency based in ${BRAND.address.city}, ${BRAND.address.state}. Unlike a captive agent who sells one company's policies, we hold appointments with ${BRAND.carriers.length}+ top-rated carriers (including ${BRAND.carriers.slice(0, 4).join(", ")}) and compare coverage and price across all of them — for personal and business insurance. Quotes are free, no-obligation, and reviewed by a licensed advisor.

Key facts:
- Independent agency: we represent the client, not a single insurance carrier
- Carriers quoted: ${BRAND.carriers.join(", ")}
- Service area: California (personal and commercial lines)
- How to get a quote: ${SITE_URL}/quote (3-step form, response within one business day) or call ${BRAND.phone}
- Claims help: ${SITE_URL}/claims (step-by-step guidance plus 24/7 carrier claim phone numbers)
- Office: ${BRAND.address.street}, ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.zip}
- Hours: ${BRAND.hours.map((h) => `${h.days} ${h.hours}`).join("; ")}
- ${BRAND.license}

## Personal Insurance
${personal}

## Business Insurance
${business}

## Key Pages
- [Get a Free Quote](${SITE_URL}/quote): 3-step quote request — coverage type, details, contact info
- [Personal Insurance](${SITE_URL}/personal): all personal lines
- [Business Insurance](${SITE_URL}/business): all commercial lines
- [File a Claim](${SITE_URL}/claims): what to do after a loss + carrier claim numbers
- [About](${SITE_URL}/about): the independent agency model and our values
- [Contact](${SITE_URL}/contact): phone, email, office address, hours
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
