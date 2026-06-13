import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";
import { ARTICLES } from "@/lib/blog-data";

export const dynamic = "force-static";

export function GET(): Response {
  const personal = PERSONAL_LINES.map(
    (l) => `- [${l.name}](${SITE_URL}/personal/${l.slug}): ${l.summary}`
  ).join("\n");
  const business = BUSINESS_LINES.map(
    (l) => `- [${l.name}](${SITE_URL}/business/${l.slug}): ${l.summary}`
  ).join("\n");
  const resources = ARTICLES.map(
    (a) => `- [${a.title}](${SITE_URL}/resources/${a.slug}): ${a.description}`
  ).join("\n");

  const body = `# ${BRAND.name}

> ${BRAND.name} is an independent insurance agency based in ${BRAND.address.city}, ${BRAND.address.state}. Unlike a captive agent who sells one company's policies, we hold appointments with ${BRAND.carriers.length}+ top-rated carriers (including ${BRAND.carriers.slice(0, 4).join(", ")}) and compare coverage and price across all of them — for business and personal insurance. Quotes are free, no-obligation, and reviewed by a licensed advisor.

Key facts:
- Independent agency: we represent the client, not a single insurance carrier
- Carriers quoted: ${BRAND.carriers.join(", ")}
- Service area: California (commercial and personal lines)
- How to get a quote: ${SITE_URL}/quote (3-step form, response within one business day) or call ${BRAND.phone}
- Free coverage checkup: ${SITE_URL}/coverage-checkup (send your current policy; we find gaps and savings — no obligation)
- Switch & save: ${SITE_URL}/switch-and-save (we re-shop your insurance across carriers and handle the switch)
- Certificate of insurance: ${SITE_URL}/certificate (same-day COIs with additional-insured wording)
- Claims help: ${SITE_URL}/claims (step-by-step guidance plus 24/7 carrier claim phone numbers)
- Service area: ${BRAND.serviceAreas.join(", ")} and the rest of California
- Office: ${BRAND.address.street}, ${BRAND.address.city}, ${BRAND.address.state} ${BRAND.address.zip}
- Hours: ${BRAND.hours.map((h) => `${h.days} ${h.hours}`).join("; ")}
- ${BRAND.license}

## Business Insurance
${business}

## Personal Insurance
${personal}

## Resources & Guides
${resources}

## Key Pages
- [Get a Free Quote](${SITE_URL}/quote): 3-step quote request — coverage type, details, contact info
- [Free Coverage Checkup](${SITE_URL}/coverage-checkup): policy review for gaps and savings
- [Switch & Save](${SITE_URL}/switch-and-save): re-shop your current policy across carriers
- [Request a Certificate](${SITE_URL}/certificate): same-day certificate of insurance (COI)
- [Resources](${SITE_URL}/resources): plain-English insurance guides
- [Business Insurance](${SITE_URL}/business): all commercial lines
- [Personal Insurance](${SITE_URL}/personal): all personal lines
- [File a Claim](${SITE_URL}/claims): what to do after a loss + carrier claim numbers
- [Client Login](${SITE_URL}/client-login): existing clients — portal for policies, invoices, claims, and certificates
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
