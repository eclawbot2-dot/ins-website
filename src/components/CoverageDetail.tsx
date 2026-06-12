import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Repeat, SearchCheck, XCircle } from "lucide-react";
import type { CoverageLine } from "@/lib/coverage-data";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";
import { getIcon } from "@/lib/icons";
import FaqList from "@/components/FaqList";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export default function CoverageDetail({ line }: { line: CoverageLine }) {
  const Icon = getIcon(line.icon);
  const hubLabel = line.category === "personal" ? "Personal Insurance" : "Business Insurance";
  const siblings = (line.category === "personal" ? PERSONAL_LINES : BUSINESS_LINES).filter(
    (l) => l.slug !== line.slug
  );

  return (
    <>
      <JsonLd data={serviceJsonLd(line)} />
      <JsonLd data={faqJsonLd(line.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: hubLabel, path: `/${line.category}` },
          { name: line.name, path: `/${line.category}/${line.slug}` },
        ])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href={`/${line.category}`} className="hover:text-white">{hubLabel}</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold-300">{line.shortName}</span>
          </nav>
          <div className="mt-8 flex items-start gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold-300 ring-1 ring-white/15 sm:flex">
              <Icon className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{line.name}</h1>
              <p className="mt-4 max-w-2xl text-lg text-navy-200">{line.tagline}</p>
            </div>
          </div>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/quote?line=${encodeURIComponent(line.name)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
            >
              Get a {line.shortName} Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-14 lg:col-span-2">
            {/* Intro */}
            <section aria-labelledby="overview">
              <h2 id="overview" className="text-2xl font-bold text-navy-950">
                What is {line.shortName.toLowerCase()} insurance?
              </h2>
              {line.intro.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 text-[17px] leading-relaxed text-navy-700">
                  {p}
                </p>
              ))}
            </section>

            {/* Covers / doesn't cover */}
            <section aria-labelledby="covers" className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gold-100 bg-gold-50/50 p-6">
                <h2 id="covers" className="flex items-center gap-2 text-lg font-bold text-navy-950">
                  <CheckCircle2 className="h-5 w-5 text-gold-600" aria-hidden="true" />
                  What it covers
                </h2>
                <ul className="mt-4 space-y-3">
                  {line.whatItCovers.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-navy-800">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-navy-50/50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-navy-950">
                  <XCircle className="h-5 w-5 text-navy-400" aria-hidden="true" />
                  What it doesn&apos;t cover
                </h3>
                <ul className="mt-4 space-y-3">
                  {line.whatItDoesNotCover.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-navy-700">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Components */}
            <section aria-labelledby="components">
              <h2 id="components" className="text-2xl font-bold text-navy-950">
                Coverage components explained
              </h2>
              <div className="mt-6 space-y-4">
                {line.components.map((c, i) => (
                  <div key={c.name} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                    <h3 className="flex items-center gap-3 text-base font-bold text-navy-950">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      {c.name}
                    </h3>
                    <p className="mt-2.5 pl-10 text-[15px] leading-relaxed text-navy-700">{c.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* When you need it */}
            <section aria-labelledby="when" className="rounded-3xl bg-gradient-to-br from-navy-950 to-gold-950 p-8 text-white sm:p-10">
              <h2 id="when" className="text-2xl font-bold">
                When you need {line.shortName.toLowerCase()} coverage
              </h2>
              <ul className="mt-6 space-y-4">
                {line.whenYouNeedIt.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" aria-hidden="true" />
                    <span className="text-navy-100">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/quote?line=${encodeURIComponent(line.name)}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3 font-semibold text-navy-950 transition-colors hover:bg-accent-400"
              >
                Check My Coverage Options
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            {/* FAQs */}
            <section aria-labelledby="faqs">
              <h2 id="faqs" className="text-2xl font-bold text-navy-950">
                Frequently asked questions
              </h2>
              <div className="mt-6">
                <FaqList faqs={line.faqs} />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6">
              <h2 className="text-lg font-bold text-navy-950">Get a {line.shortName.toLowerCase()} quote</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">
                Two minutes of your time, multiple carriers compared, zero obligation.
              </p>
              <Link
                href={`/quote?line=${encodeURIComponent(line.name)}`}
                data-cta={`Start My ${line.shortName} Quote`}
                data-cta-location="coverage-sidebar"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-accent-400"
              >
                Start My Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div className="mt-4 flex flex-col gap-2 border-t border-accent-200/70 pt-4 text-sm">
                <Link
                  href="/coverage-checkup"
                  className="inline-flex items-center gap-1.5 font-semibold text-gold-700 hover:text-gold-600"
                >
                  <SearchCheck className="h-4 w-4" aria-hidden="true" />
                  Free coverage checkup
                </Link>
                <Link
                  href="/switch-and-save"
                  className="inline-flex items-center gap-1.5 font-semibold text-gold-700 hover:text-gold-600"
                >
                  <Repeat className="h-4 w-4" aria-hidden="true" />
                  Already insured? Switch &amp; save
                </Link>
              </div>
            </div>
            <nav className="rounded-2xl border border-navy-100 bg-white p-6" aria-label={`Other ${hubLabel.toLowerCase()} coverage`}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-500">
                More {line.category} coverage
              </h2>
              <ul className="mt-3 space-y-1">
                {siblings.map((s) => {
                  const SIcon = getIcon(s.icon);
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.category}/${s.slug}`}
                        className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-navy-700 hover:bg-gold-50 hover:text-gold-800"
                      >
                        <SIcon className="h-4 w-4 text-gold-600" aria-hidden="true" />
                        {s.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      <CtaBanner
        title={`Let's find the right ${line.shortName.toLowerCase()} coverage for you`}
        subtitle="Answer a few questions and a licensed advisor will compare quotes across our carrier lineup — usually back to you within one business day."
      />
    </>
  );
}
