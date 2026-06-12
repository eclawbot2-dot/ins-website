import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  FileSearch,
  Gauge,
  PiggyBank,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PORTAL_LOGIN_URL } from "@/lib/brand";
import LeadForm from "@/components/LeadForm";
import { CarrierStrip } from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "Free Coverage Checkup — Find Gaps & Savings in Your Policy",
  alternates: { canonical: "/coverage-checkup" },
  description: `Send us your current policy and ${BRAND.name} will find coverage gaps, overlaps, and savings — free, no obligation. An independent review across ${BRAND.carriers.length}+ carriers.`,
  openGraph: {
    title: `Free Coverage Checkup | ${BRAND.name}`,
    description:
      "Upload your current policy and we'll find gaps and savings. A free, no-obligation independent review.",
  },
};

const STEPS = [
  {
    icon: Upload,
    title: "Send us your current policy",
    text: "Share your declarations page (or just tell us what you have). No policy on hand? We can pull the key details on a quick call.",
  },
  {
    icon: ScanSearch,
    title: "We analyze coverage & price",
    text: "A licensed advisor reviews your limits, deductibles, endorsements, and exclusions against what your situation actually needs — then shops the market.",
  },
  {
    icon: FileSearch,
    title: "You get a plain-English report",
    text: "A clear summary of gaps, overlaps you're paying for twice, and where a different carrier would save you money — with zero obligation to switch.",
  },
];

const FINDINGS = [
  {
    icon: ShieldCheck,
    title: "Coverage gaps",
    text: "Underinsured dwelling limits, missing umbrella, no flood, low liability, excluded business use — the gaps that turn into out-of-pocket disasters at claim time.",
  },
  {
    icon: PiggyBank,
    title: "Savings opportunities",
    text: "Discounts you're not getting, a better-priced carrier for your profile, and bundle math that actually works in your favor.",
  },
  {
    icon: Gauge,
    title: "Overlaps & waste",
    text: "Coverage you're paying for twice across policies, or limits set far higher than your real exposure requires.",
  },
];

const FAQS = [
  {
    question: "Is the coverage checkup really free?",
    answer:
      "Yes. The review costs you nothing and there's no obligation to switch. We're an independent agency paid by the carriers when you choose to place coverage with us — your premium is the same whether you use us or not.",
  },
  {
    question: "What do I need to send you?",
    answer:
      "Ideally your current declarations (dec) page — the summary at the front of your policy that lists your coverages, limits, and deductibles. If you don't have it handy, we can gather the key details on a 10-minute call.",
  },
  {
    question: "Will you pressure me to switch carriers?",
    answer:
      "No. Sometimes the honest answer is 'you're already in good shape — keep what you have.' When that's true, we'll tell you. We only recommend a change when it genuinely improves your coverage, your price, or both.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most reviews come back within one business day. If your situation is complex (multiple properties, a business, specialty coverage), it may take a little longer — we'll let you know.",
  },
];

export default function CoverageCheckupPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Coverage Checkup", path: "/coverage-checkup" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
        <div
          className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold-300">Coverage Checkup</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-sm font-medium text-gold-200">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Free · No obligation · Independent
              </p>
              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Are you{" "}
                <span className="bg-gradient-to-r from-gold-300 to-accent-300 bg-clip-text text-transparent">
                  overpaying
                </span>{" "}
                — or underinsured? Let&apos;s find out.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-navy-200">
                Send us your current policy and a licensed advisor will review it for coverage gaps,
                overlaps you&apos;re paying for twice, and savings across {BRAND.carriers.length}+
                carriers. You get a clear report — and zero pressure to switch.
              </p>
              <ul className="mt-7 space-y-2.5 text-sm text-navy-200">
                {[
                  "A second opinion from an agency that works for you, not one carrier",
                  "Most reviews returned within one business day",
                  "Keep what you have if it's already a good deal — we'll say so",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#checkup-form"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
              >
                Start My Free Checkup
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            {/* Form card */}
            <div id="checkup-form" className="scroll-mt-24">
              <LeadForm
                source="coverage-checkup"
                campaign="coverage-checkup"
                heading="Request your free coverage checkup"
                subheading="Tell us what you currently have. You can paste your coverages or just note your current carrier and renewal date — we'll take it from there."
                cta="Get My Free Checkup"
                successHeading="Checkup requested — thanks, {name}!"
                successBody="A licensed advisor will review your coverage and follow up within one business day with gaps, savings, and options."
                messageLabel="What do you currently have?"
                messagePlaceholder="Current carrier, policies (auto/home/business), renewal date, and anything you're unsure about. If you have a declarations page, mention it and we'll request it securely."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Carrier strip */}
      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <CarrierStrip label="We compare your policy against quotes from" />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy-950">How the checkup works</h2>
          <p className="mt-3 text-lg text-navy-600">
            Three simple steps. No spreadsheets, no obligation, no sales pressure.
          </p>
        </div>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-gold-700">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 font-bold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What we find */}
      <section className="bg-gradient-to-b from-white to-navy-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-navy-950">What we look for</h2>
            <p className="mt-3 text-lg text-navy-600">
              A good review is about more than price. We check that your coverage actually protects
              what you&apos;ve built.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {FINDINGS.map((f) => (
              <div key={f.title} className="rounded-2xl border border-navy-100 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-navy-950">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal tease */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-navy-100 bg-navy-950 p-8 text-white sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-300">
                Coming soon
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Self-serve policy analysis in your client portal
              </h2>
              <p className="mt-3 max-w-2xl text-navy-200">
                We&apos;re rolling out a tool that lets you upload your policy and instantly see a
                gap-and-savings analysis online. Until it lands, our advisors do the analysis for
                you — same result, no waiting for the software.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <Link
                href={PORTAL_LOGIN_URL}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Client Portal
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-navy-950">
          Coverage checkup questions
        </h2>
        <div className="mt-6 divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white">
          {FAQS.map((faq) => (
            <details key={faq.question} className="faq-item group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-navy-950">
                {faq.question}
                <ChevronRight
                  className="h-5 w-5 shrink-0 text-gold-600 transition-transform group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-navy-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
