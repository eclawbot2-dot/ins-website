import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description: `How ${BRAND.name} collects, uses, and protects your personal information.`,
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "June 1, 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-navy-950">Privacy Policy</h1>
      <p className="mt-2 text-sm text-navy-500">Effective date: {EFFECTIVE_DATE}</p>

      <div className="prose-navy mt-8 space-y-8 text-[15px] leading-relaxed text-navy-700">
        <section>
          <h2 className="text-xl font-bold text-navy-950">1. Who we are</h2>
          <p className="mt-3">
            {BRAND.name} (&quot;{BRAND.shortName},&quot; &quot;we,&quot; &quot;us&quot;) is an independent insurance
            agency located at {BRAND.address.street}, {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}.
            This policy describes how we collect, use, and protect information through this website and in the course
            of providing insurance services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">2. Information we collect</h2>
          <p className="mt-3">When you request a quote or contact us, we collect information you provide, such as:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>Contact details: name, email address, phone number, and ZIP code</li>
            <li>Information about what you'd like to insure (vehicles, property, business operations)</li>
            <li>Any additional details you choose to include in messages to us</li>
          </ul>
          <p className="mt-3">
            We also collect limited technical information automatically (such as browser type and pages visited) to
            operate and improve the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">3. How we use your information</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>To prepare insurance quotes and respond to your requests</li>
            <li>To submit applications to insurance carriers on your behalf, with your consent</li>
            <li>To service your policies, including renewals, changes, certificates, and claims assistance</li>
            <li>To communicate with you about your coverage and our services</li>
            <li>To comply with insurance regulations and other legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">4. What we don't do</h2>
          <p className="mt-3">
            We do not sell your personal information. We do not share your information with third parties for their
            own marketing purposes. Information is shared only with insurance carriers and service providers as
            necessary to quote, place, and service your coverage, or as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">5. Data security and retention</h2>
          <p className="mt-3">
            We use commercially reasonable administrative, technical, and physical safeguards to protect your
            information, and we retain it only as long as needed to provide services and meet legal and regulatory
            requirements applicable to insurance producers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">6. Your choices and rights</h2>
          <p className="mt-3">
            You may request access to, correction of, or deletion of your personal information, subject to records we
            are legally required to keep. Depending on your state of residence, you may have additional privacy
            rights. To exercise any of these, contact us at{" "}
            <a href={`mailto:${BRAND.email}`} className="font-medium text-gold-700 underline">{BRAND.email}</a> or{" "}
            {BRAND.phone}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">7. Children's privacy</h2>
          <p className="mt-3">
            This website is not directed at children under 13, and we do not knowingly collect information from them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">8. Changes to this policy</h2>
          <p className="mt-3">
            We may update this policy from time to time. The effective date above reflects the latest revision;
            material changes will be posted on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy-950">9. Contact</h2>
          <p className="mt-3">
            Questions about this policy: {BRAND.name}, {BRAND.address.street}, {BRAND.address.city},{" "}
            {BRAND.address.state} {BRAND.address.zip} · {BRAND.phone} ·{" "}
            <a href={`mailto:${BRAND.email}`} className="font-medium text-gold-700 underline">{BRAND.email}</a>. {BRAND.license}.
          </p>
        </section>
      </div>
    </div>
  );
}
