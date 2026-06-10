import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Handshake,
  Phone,
  Quote,
  Scale,
  SearchCheck,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";
import CoverageCard from "@/components/CoverageCard";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: `${BRAND.name} | Independent Insurance Agency — Auto, Home, Life & Business`,
  description: `Get the right coverage at the right price. ${BRAND.name} compares quotes from ${BRAND.carriers.length}+ top-rated carriers including Progressive, Travelers, and Nationwide — for auto, home, life, health, and business insurance.`,
};

const TRUST_POINTS = [
  { icon: SearchCheck, title: `${BRAND.carriers.length}+ carriers compared`, text: "One conversation, multiple quotes. We do the shopping." },
  { icon: BadgeCheck, title: "Licensed advisors", text: "Real people who explain coverage in plain English." },
  { icon: Handshake, title: "We work for you", text: "Independent means our loyalty is to clients, not a carrier." },
  { icon: ShieldCheck, title: "Claims advocacy", text: "When you have a claim, we're in your corner — start to finish." },
];

const TESTIMONIALS = [
  {
    quote:
      "They re-shopped my auto and home at renewal and cut my total premium by almost $900 a year — same coverage, better carrier. I didn't fill out a single application myself.",
    name: "Melissa R.",
    detail: "Auto + Home bundle",
  },
  {
    quote:
      "As a new contractor I needed GL, workers' comp, and a certificate for a job starting Monday. They had me covered and the COI in the GC's inbox the same afternoon.",
    name: "Dan K.",
    detail: "Small business owner",
  },
  {
    quote:
      "After our kitchen fire, our advisor handled the carrier so we didn't have to. Hotel covered, claim paid, zero runaround. That's why you use an agency instead of an 800 number.",
    name: "Priya & James T.",
    detail: "Homeowners claim",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-teal-900">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-sm font-medium text-teal-200">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Independent agency — we shop {BRAND.carriers.length}+ carriers for you
            </p>
            <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              The right coverage.
              <br />
              <span className="bg-gradient-to-r from-teal-300 to-accent-300 bg-clip-text text-transparent">
                The right price.
              </span>{" "}
              Every renewal.
            </h1>
            <p className="animate-fade-up-delay-1 mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
              One captive agent can only sell you one company&apos;s policy. We compare auto, home, life, health, and
              business insurance across {BRAND.carriers.length}+ top-rated carriers — then keep shopping at every
              renewal so your rate stays honest.
            </p>
            <div className="animate-fade-up-delay-2 mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-navy-950 shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-400 hover:shadow-xl"
              >
                Get My Free Quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href={BRAND.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Talk to an Advisor
              </a>
            </div>
            <p className="animate-fade-up-delay-2 mt-5 flex items-center gap-1.5 text-sm text-navy-300">
              <Star className="h-4 w-4 fill-accent-400 text-accent-400" aria-hidden="true" />
              No spam, no robocalls — a licensed advisor reviews every request personally.
            </p>
          </div>
        </div>
      </section>

      {/* ── Carrier strip ────────────────────────────────────── */}
      <section className="border-b border-navy-100 bg-navy-50/60" aria-label="Carriers we represent">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy-500">
            Quoting top-rated carriers including
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BRAND.carriers.map((c) => (
              <li key={c} className="text-lg font-bold tracking-tight text-navy-400 transition-colors hover:text-navy-700">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Trust signals ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((p) => (
            <div key={p.title} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-navy-950">{p.title}</h3>
                <p className="mt-1 text-sm text-navy-600">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coverage categories ──────────────────────────────── */}
      <section className="bg-gradient-to-b from-white to-navy-50/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Coverage for everything you&apos;ve built
            </h2>
            <p className="mt-3 text-lg text-navy-600">
              Personal or commercial, simple or complex — we build the protection around you, not the other way
              around.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <Users className="h-5 w-5 text-teal-700" aria-hidden="true" />
            <h3 className="text-xl font-bold text-navy-950">Personal Insurance</h3>
            <Link href="/personal" className="ml-auto text-sm font-semibold text-teal-700 hover:text-teal-600">
              View all →
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PERSONAL_LINES.map((line) => (
              <CoverageCard key={line.slug} line={line} />
            ))}
          </div>

          <div className="mt-14 flex items-center gap-3">
            <Building2 className="h-5 w-5 text-teal-700" aria-hidden="true" />
            <h3 className="text-xl font-bold text-navy-950">Business Insurance</h3>
            <Link href="/business" className="ml-auto text-sm font-semibold text-teal-700 hover:text-teal-600">
              View all →
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BUSINESS_LINES.slice(0, 6).map((line) => (
              <CoverageCard key={line.slug} line={line} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why independent ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">The independent difference</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              A captive agent sells you one company. We shop the market for you.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              When your agent can only quote one carrier, &quot;the best they can do&quot; means the best{" "}
              <em>that one company</em> can do. As an independent agency, {BRAND.shortName} represents you — not an
              insurer. We compare coverage and price across {BRAND.carriers.length}+ carriers, recommend what actually
              fits, and re-shop your policies when rates move.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "Multiple quotes from one conversation — we handle the applications",
                "Advice on coverage gaps, not just price (limits, deductibles, endorsements)",
                "Automatic market check at renewal — if your carrier raises rates, we move you",
                "One agency for everything: auto, home, life, health, and your business",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                  <span className="text-navy-800">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-teal-700 hover:text-teal-600"
            >
              How the independent model works
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-teal-100 to-accent-100 opacity-60 blur-2xl" aria-hidden="true" />
            <div className="relative rounded-3xl border border-navy-100 bg-white p-8 shadow-xl shadow-navy-950/5">
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-teal-700" aria-hidden="true" />
                <h3 className="text-lg font-bold text-navy-950">Captive vs. Independent</h3>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl border border-navy-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy-950 text-left text-white">
                      <th scope="col" className="px-4 py-3 font-semibold"> </th>
                      <th scope="col" className="px-4 py-3 font-semibold">Captive agent</th>
                      <th scope="col" className="px-4 py-3 font-semibold text-teal-300">{BRAND.shortName}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-100">
                    {[
                      ["Carriers quoted", "1", `${BRAND.carriers.length}+`],
                      ["Works for", "The insurer", "You"],
                      ["Rate goes up?", "You start over", "We re-shop it"],
                      ["Coverage advice", "One product line", "Whole market"],
                    ].map(([label, captive, us]) => (
                      <tr key={label}>
                        <th scope="row" className="px-4 py-3 text-left font-medium text-navy-700">{label}</th>
                        <td className="px-4 py-3 text-navy-500">{captive}</td>
                        <td className="bg-teal-50/60 px-4 py-3 font-semibold text-teal-800">{us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="bg-navy-50/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Clients who stopped overpaying
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-navy-600">
              The best measure of an agency is what happens after you buy the policy.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                <Quote className="h-7 w-7 text-teal-300" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-800">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-navy-100 pt-4">
                  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent-400 text-accent-400" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-2 font-semibold text-navy-950">{t.name}</p>
                  <p className="text-sm text-navy-500">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
