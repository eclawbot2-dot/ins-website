import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  FileText,
  LogIn,
  Receipt,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { BRAND, PORTAL_LOGIN_URL, PORTAL_REQUEST_ACCESS_URL } from "@/lib/brand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Client Login — Your Policy Portal",
  alternates: { canonical: "/client-login" },
  description: `Log in to the ${BRAND.name} client portal to view your policies, pay invoices, file claims, and request certificates of insurance — anytime, from any device.`,
};

const FEATURES = [
  {
    icon: FileText,
    title: "View your policies",
    text: "See every policy we manage for you in one place — coverage, limits, effective dates, and documents.",
  },
  {
    icon: Receipt,
    title: "Pay invoices",
    text: "Review open invoices and pay securely online, with a full history of past payments.",
  },
  {
    icon: ShieldAlert,
    title: "File claims",
    text: "Start a claim in minutes and track its status — we stay on it with the carrier so you don't have to.",
  },
  {
    icon: FileCheck2,
    title: "Request certificates",
    text: "Need a certificate of insurance for a landlord, lender, or contract? Request one from the portal and get it fast.",
  },
];

export default function ClientLoginPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Client Login", path: "/client-login" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-300">
            {BRAND.shortName} Client Portal
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your policies, payments, and claims — one secure login.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-200">
            The {BRAND.name} client portal puts your entire insurance program at your fingertips: every policy,
            every invoice, every claim, every certificate — available 24/7 from any device.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={PORTAL_LOGIN_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-base font-semibold text-navy-950 shadow-lg transition-colors hover:bg-accent-400"
            >
              <LogIn className="h-5 w-5" aria-hidden="true" />
              Log in to your portal
            </a>
            <a
              href={PORTAL_REQUEST_ACCESS_URL}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy-400/60 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-200"
            >
              Request portal access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="portal-features">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-gold-600" aria-hidden="true" />
          <h2 id="portal-features" className="text-2xl font-bold text-navy-950">
            What you can do in the portal
          </h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <f.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-950">{f.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-700">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Access help */}
      <section className="bg-navy-50/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy-950">First time here?</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-navy-700">
                Portal access is included with every {BRAND.shortName} policy. If you&apos;re a client and
                haven&apos;t set up your login yet,{" "}
                <a href={PORTAL_REQUEST_ACCESS_URL} className="font-semibold text-gold-700 underline">
                  request portal access
                </a>{" "}
                and we&apos;ll send you an invitation — usually the same business day.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy-950">Prefer to talk to a person?</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-navy-700">
                The portal never replaces your advisor. Call{" "}
                <a href={BRAND.phoneHref} className="font-semibold text-gold-700 underline">
                  {BRAND.phone}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${BRAND.email}`} className="font-semibold text-gold-700 underline">
                  {BRAND.email}
                </a>{" "}
                and a licensed advisor will handle it for you. Not a client yet?{" "}
                <Link href="/quote" className="font-semibold text-gold-700 underline">
                  Get a free quote
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
