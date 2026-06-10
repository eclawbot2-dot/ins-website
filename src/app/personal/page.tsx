import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PERSONAL_LINES } from "@/lib/coverage-data";
import { BRAND } from "@/lib/brand";
import CoverageCard from "@/components/CoverageCard";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Personal Insurance — Auto, Home, Renters, Umbrella, Life & Health",
  description: `Personal insurance from ${BRAND.name}: auto, homeowners, renters, umbrella, life, and health coverage compared across ${BRAND.carriers.length}+ top-rated carriers. Get a free quote today.`,
  openGraph: {
    title: `Personal Insurance | ${BRAND.name}`,
    description: "Auto, home, renters, umbrella, life, and health insurance — quoted across multiple carriers.",
  },
};

export default function PersonalHubPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-teal-900">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-teal-300">Personal Insurance</span>
          </nav>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Personal Insurance
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-200">
            Your car, your home, your family, your future — protected by coverage we hand-pick from{" "}
            {BRAND.carriers.length}+ carriers, not whatever one company happens to sell. One advisor, one phone
            number, every personal policy you need.
          </p>
          <Link
            href="/quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
          >
            Get a Personal Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PERSONAL_LINES.map((line) => (
            <CoverageCard key={line.slug} line={line} />
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-navy-100 bg-navy-50/60 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-navy-950">Bundle and actually save</h2>
          <p className="mt-3 max-w-3xl text-navy-700">
            Pairing auto with home or renters coverage typically unlocks multi-policy discounts of 10–25% — but the
            best bundle isn&apos;t always with one carrier. Because we&apos;re independent, we compare both ways:
            everything with one company versus splitting policies across carriers. Whichever combination protects you
            best for the least money is the one we recommend.
          </p>
          <Link href="/quote" className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-600">
            Price my bundle
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
