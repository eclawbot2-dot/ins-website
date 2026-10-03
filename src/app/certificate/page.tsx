import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight, FileCheck2, Mail } from "lucide-react";
import { BRAND, PORTAL_CERTIFICATES_URL, PORTAL_LOGIN_URL, PORTAL_REQUEST_ACCESS_URL } from "@/lib/brand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

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

            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-xl shadow-navy-950/5 sm:p-10">
              <FileCheck2 className="h-10 w-10 text-gold-700" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold text-navy-950">Certificate service for existing clients</h2>
              <p className="mt-3 text-navy-600">
                Request a certificate for your existing policy in the client portal. Have the
                certificate holder&apos;s name, address, and any contract requirements ready.
                You&apos;ll need to sign in to submit your request.
              </p>
              <a
                href={PORTAL_CERTIFICATES_URL}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-navy-950 transition-colors hover:bg-accent-400"
              >
                Request a Certificate <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <p className="mt-5 text-sm text-navy-600">
                Need help getting in? <a href={PORTAL_LOGIN_URL} className="font-semibold text-gold-700 underline">Sign in</a>
                {" "}or <a href={PORTAL_REQUEST_ACCESS_URL} className="font-semibold text-gold-700 underline">request portal access</a>.
              </p>
              <div className="mt-8 border-t border-navy-100 pt-6">
                <h3 className="font-semibold text-navy-950">Looking for new coverage?</h3>
                <p className="mt-2 text-sm text-navy-600">Start a separate quote request for a new policy.</p>
                <Link href="/quote" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-600">
                  Get a New Coverage Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
