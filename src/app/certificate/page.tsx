import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight, FileCheck2, Mail } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Request a Certificate of Insurance (COI) — Same-Day",
  alternates: { canonical: "/certificate" },
  description: `Need a certificate of insurance for a job, lease, or client? ${BRAND.name} issues COIs same-day, including additional-insured wording. Request yours here.`,
  openGraph: {
    title: `Request a Certificate of Insurance | ${BRAND.name}`,
    description: "Same-day certificates of insurance with the additional-insured wording your contract requires.",
  },
};

export default function CertificatePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Request a Certificate", path: "/certificate" },
        ])}
      />

      <div className="bg-gradient-to-b from-navy-50/80 to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-500">
            <Link href="/" className="hover:text-navy-900">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold-700">Request a Certificate</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                Same-day during business hours
              </span>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                Request a certificate of insurance
              </h1>
              <p className="mt-4 text-lg text-navy-600">
                Need proof of coverage for a job, a lease, or a new client? Tell us who needs it and
                what your contract requires — we&apos;ll issue your COI same-day, with the correct
                additional-insured and limit wording.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: FileCheck2,
                    title: "Additional-insured wording done right",
                    text: "We match the exact endorsement language your GC, landlord, or client requires — the detail online buyers get wrong.",
                  },
                  {
                    icon: Clock,
                    title: "Usually within the hour",
                    text: "Send the request during business hours and we'll typically have your certificate issued the same day.",
                  },
                  {
                    icon: Mail,
                    title: "Sent where you need it",
                    text: "We can email the COI directly to you and to the certificate holder who's asking for it.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-semibold text-navy-950">{item.title}</h2>
                      <p className="mt-0.5 text-sm text-navy-600">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-navy-100 bg-white p-5">
                <p className="text-sm text-navy-600">
                  Already a client and need this urgently? Call{" "}
                  <a href={BRAND.phoneHref} className="font-semibold text-gold-700 hover:text-gold-600">
                    {BRAND.phone}
                  </a>{" "}
                  and we&apos;ll handle it on the spot.
                </p>
                <Link
                  href="/business/general-liability"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600"
                >
                  Not insured with us yet? Get business coverage
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div>
              <LeadForm
                source="certificate-request"
                campaign="certificate"
                lineOfBusiness="General Liability Insurance"
                heading="Certificate request"
                subheading="Give us the details below and we'll get your COI issued. If you're not a client yet, we'll get you quoted first."
                cta="Request My Certificate"
                successHeading="Got it — thanks, {name}!"
                successBody="We'll prepare your certificate and follow up shortly. For anything urgent, call us and we'll handle it on the spot."
                messageLabel="Certificate details"
                messagePlaceholder="Who needs the certificate (the holder's name & address), any required additional-insured wording, required limits, and the project or contract it's for."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
