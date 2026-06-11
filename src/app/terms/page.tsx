import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
  description: `Terms governing use of the ${BRAND.name} website.`,
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "June 1, 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-navy-950">Terms of Use</h1>
      <p className="mt-2 text-sm text-navy-500">Effective date: {EFFECTIVE_DATE}</p>

      <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-navy-700">
        <section>
          <h2 className="text-xl font-bold text-navy-950">1. Acceptance of terms</h2>
          <p className="mt-3">
            By accessing or using this website, operated by {BRAND.name} (&quot;{BRAND.shortName}&quot;), you agree to
            these Terms of Use. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">2. Informational content — not an offer of coverage</h2>
          <p className="mt-3">
            Content on this website is provided for general informational and educational purposes only. It is not
            legal, tax, or financial advice, and it is not an offer of insurance, a binder, or a guarantee of
            coverage. Coverage descriptions are summaries; actual coverage is governed exclusively by the terms,
            conditions, limits, and exclusions of the issued policy. No coverage may be bound, changed, or cancelled
            through this website — coverage is bound only by written confirmation from {BRAND.shortName} or an
            insurance carrier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">3. Quotes</h2>
          <p className="mt-3">
            Quote requests submitted through this site are requests for proposals only. Premiums shown or discussed
            prior to carrier underwriting are estimates and are subject to change based on underwriting review,
            verification of information, and carrier approval. All products are subject to availability in your state.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">4. Accuracy of information you provide</h2>
          <p className="mt-3">
            You agree to provide accurate and complete information when requesting quotes or services.
            Misrepresentation of material facts on insurance applications can result in denied claims or rescission
            of coverage by the carrier.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">5. Intellectual property</h2>
          <p className="mt-3">
            All content on this site — text, design, graphics, and logos — is the property of {BRAND.name} or its
            licensors and is protected by applicable intellectual property laws. You may not reproduce or distribute
            site content without prior written permission, except for personal, non-commercial use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">6. Third-party links and carrier information</h2>
          <p className="mt-3">
            This site may reference or link to insurance carriers and other third parties. {BRAND.shortName} is not
            responsible for the content, accuracy, or practices of third-party websites. Carrier claim phone numbers
            and similar details are provided for convenience and may change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">7. Disclaimer of warranties; limitation of liability</h2>
          <p className="mt-3">
            This website is provided &quot;as is&quot; without warranties of any kind, express or implied. To the
            fullest extent permitted by law, {BRAND.name} shall not be liable for any indirect, incidental, or
            consequential damages arising from use of this site. Nothing in these terms limits obligations under an
            issued insurance policy or applicable insurance regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">8. Changes</h2>
          <p className="mt-3">
            We may revise these terms at any time by updating this page. Continued use of the site after changes are
            posted constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">9. Contact</h2>
          <p className="mt-3">
            {BRAND.name}, {BRAND.address.street}, {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip} ·{" "}
            {BRAND.phone} ·{" "}
            <a href={`mailto:${BRAND.email}`} className="font-medium text-teal-700 underline">{BRAND.email}</a>. {BRAND.license}.
          </p>
        </section>
      </div>
    </div>
  );
}
