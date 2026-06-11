import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, FileCheck2 } from "lucide-react";
import { BUSINESS_LINES } from "@/lib/coverage-data";
import { BRAND } from "@/lib/brand";
import CoverageCard from "@/components/CoverageCard";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Business Insurance — GL, BOP, Workers' Comp, Cyber & More",
  alternates: { canonical: "/business" },
  description: `Commercial insurance from ${BRAND.name}: general liability, BOP, workers' compensation, commercial auto, cyber, E&O, and commercial property — quoted across multiple carriers with same-day certificates of insurance.`,
  openGraph: {
    title: `Business Insurance | ${BRAND.name}`,
    description: "General liability, BOP, workers' comp, commercial auto, cyber, E&O, and property coverage for businesses.",
  },
};

export default function BusinessHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Business Insurance", path: "/business" },
        ])}
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-teal-900">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-teal-300">Business Insurance</span>
          </nav>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Business Insurance
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-200">
            From your first contract to your fiftieth employee — liability, property, workers&apos; comp, auto, and
            cyber coverage structured around how your business actually operates, quoted across{" "}
            {BRAND.carriers.length}+ commercial carriers.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
            >
              Get a Business Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-navy-100">
              <FileCheck2 className="h-4 w-4 text-teal-300" aria-hidden="true" />
              Same-day certificates of insurance
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_LINES.map((line) => (
            <CoverageCard key={line.slug} line={line} />
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Contract-driven coverage",
              text: "Landlords, GCs, and enterprise clients dictate limits and endorsements. Send us the contract's insurance section — we'll build the policy to match it and issue the certificate, usually same-day.",
            },
            {
              title: "Built for growth",
              text: "Hiring your first employee, buying a truck, signing a bigger lease — each milestone changes your insurance needs. We review coverage at every renewal so your protection keeps pace with your business.",
            },
            {
              title: "Claims that don't stall your business",
              text: "When something goes wrong, we report the claim, chase the adjuster, and keep your certificate holders satisfied — so you can keep operating while the claim resolves.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-navy-100 bg-navy-50/60 p-7">
              <h2 className="text-lg font-bold text-navy-950">{item.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-700">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Tell us what you do. We'll tell you what you need."
        subtitle="A 15-minute conversation about your operations is all it takes to scope coverage and start gathering quotes from our commercial carriers."
      />
    </>
  );
}
