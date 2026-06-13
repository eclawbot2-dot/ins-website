import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Phone,
  SearchCheck,
  ShieldCheck,
  Star,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import CtaBanner from "@/components/CtaBanner";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: { absolute: `${BRAND.name} | Independent Insurance Agency — Business, Auto, Home & Life` },
  description: `Get the right coverage at the right price. ${BRAND.name} compares quotes from ${BRAND.carriers.length}+ top-rated carriers including Progressive, Travelers, and Nationwide — for business, auto, home, and life insurance.`,
  alternates: { canonical: "/" },
};

/** Image-rich coverage cards — business/commercial first, then personal (no health). */
const COVERAGE_CARDS = [
  {
    href: "/business",
    img: "/img/coverage-business.jpg",
    alt: "A small-business owner helping a customer at a shop counter",
    title: "Business",
    blurb: "General liability, BOP, workers' comp, cyber, commercial auto, and property.",
  },
  {
    href: "/business/general-liability",
    img: "/img/feature-independent.jpg",
    alt: "An advisor reviewing a commercial policy with a business owner at a table",
    title: "General Liability",
    blurb: "The foundation of business protection — and the coverage your contracts demand.",
  },
  {
    href: "/business/workers-comp",
    img: "/img/feature-local.jpg",
    alt: "A work crew on a job site wearing safety gear",
    title: "Workers' Comp",
    blurb: "Required in nearly every state — your shield against employee-injury claims.",
  },
  {
    href: "/personal/auto",
    img: "/img/coverage-auto.jpg",
    alt: "A clean blue sedan parked on a city street",
    title: "Auto",
    blurb: "Liability, collision, and comprehensive — priced by carriers competing for you.",
  },
  {
    href: "/personal/homeowners",
    img: "/img/coverage-home.jpg",
    alt: "A white American home with a wraparound porch and a green lawn",
    title: "Home",
    blurb: "Your largest asset, insured to its real rebuild cost — not a guess.",
  },
  {
    href: "/personal/life",
    img: "/img/coverage-life.jpg",
    alt: "A father smiling and holding his two young children outdoors",
    title: "Life",
    blurb: "Term and permanent life from multiple carriers, sized to your family's future.",
  },
];

/** Alternating 50/50 image + text feature blocks. */
const FEATURES = [
  {
    eyebrow: "The independent difference",
    title: "We shop the whole market — you only have one conversation.",
    body: "A captive agent can sell you one company's policy. As an independent agency we compare coverage and price across all of our carriers, recommend what actually fits, and re-shop your policies when rates move — so your rate stays honest at every renewal.",
    img: "/img/feature-independent.jpg",
    alt: "An advisor reviewing coverage options with a client at a sunlit table",
    cta: { label: "How the independent model works", href: "/about" },
    reverse: false,
  },
  {
    eyebrow: "Local & personal",
    title: `Real advisors, based right here in ${BRAND.address.city}.`,
    body: `We live and work in the communities we protect — ${BRAND.serviceAreas.slice(0, 4).join(", ")}, and across California. When you call, you reach a licensed advisor who knows your policies and is in your corner at claim time. No call-center roulette, no robocalls.`,
    img: "/img/feature-local.jpg",
    alt: "An aerial view of a sunny residential neighborhood with tree-lined streets",
    cta: { label: "Meet the agency", href: "/contact" },
    reverse: true,
  },
  {
    eyebrow: "Find your gaps",
    title: "A free coverage checkup that pays for itself.",
    body: "Send us your current policy and we'll read it line by line — flagging the gaps that could cost you and the savings you're leaving on the table. No obligation, no pressure, no sales script. Most people are surprised by what we find.",
    img: "/img/feature-protect.jpg",
    alt: "A parent holding their laughing child at a sunlit beach",
    cta: { label: "Start a free coverage checkup", href: "/coverage-checkup" },
    reverse: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/img/hero-family.jpg"
          alt="A multi-generational family holding hands at a coastal sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Light, airy scrim so text stays legible without going corporate-dark */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30 sm:to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-300/70 bg-white/80 px-4 py-1.5 text-sm font-medium text-gold-800 shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Independent agency — we shop {BRAND.carriers.length}+ carriers for you
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              Protect your business — and everything you&apos;ve built.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-navy-700">
              One advisor. Many carriers. We compare business, auto, home, and life insurance across{" "}
              {BRAND.carriers.length}+ top-rated companies — then keep shopping at every renewal so you
              never overpay for the coverage you need.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/quote"
                data-cta="Get a Quote"
                data-cta-location="home-hero"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-950 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-navy-950/15 transition-all hover:bg-navy-800"
              >
                Get a quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/coverage-checkup"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-300 bg-white/70 px-8 py-4 text-base font-semibold text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <SearchCheck className="h-5 w-5" aria-hidden="true" />
                Free coverage checkup
              </Link>
            </div>
            <a
              href={BRAND.phoneHref}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 transition-colors hover:text-navy-950"
            >
              <Phone className="h-4 w-4 text-gold-700" aria-hidden="true" />
              Talk to a licensed advisor — {BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Carrier strip ────────────────────────────────────── */}
      <section className="border-y border-navy-100 bg-white" aria-label="Carriers we represent">
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

      {/* ── What we protect (image cards) ────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">What we protect</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
            Coverage built around your life — not a one-size policy.
          </h2>
          <p className="mt-3 text-lg text-navy-600">
            Commercial or personal, simple or complex, we hand-pick the right protection from{" "}
            {BRAND.carriers.length}+ carriers and shop it again every renewal.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGE_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{card.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 group-hover:text-gold-600">
                  Find coverage
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Alternating feature blocks ───────────────────────── */}
      {FEATURES.map((f) => (
        <section key={f.title} className="border-t border-navy-100 bg-navy-50/40">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
            <div className={f.reverse ? "lg:order-2" : ""}>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-700">{f.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{f.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-navy-700">{f.body}</p>
              <Link
                href={f.cta.href}
                className="mt-7 inline-flex items-center gap-2 text-base font-semibold text-gold-700 hover:text-gold-600"
              >
                {f.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className={`relative aspect-[3/2] overflow-hidden rounded-3xl shadow-lg shadow-navy-950/5 ${f.reverse ? "lg:order-1" : ""}`}>
              <Image
                src={f.img}
                alt={f.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      ))}

      {/* ── Trust strip ──────────────────────────────────────── */}
      <section className="border-t border-navy-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: SearchCheck, title: `${BRAND.carriers.length}+ carriers compared`, text: "One conversation, multiple quotes. We do the shopping." },
              { icon: BadgeCheck, title: "Licensed advisors", text: "Real people who explain coverage in plain English." },
              { icon: ShieldCheck, title: "Claims advocacy", text: "When you have a claim, we're in your corner — start to finish." },
              { icon: Star, title: "No spam, ever", text: "A licensed advisor reviews every request personally." },
            ].map((p) => (
              <div key={p.title} className="flex gap-4 rounded-2xl border border-navy-100 bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <p.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-navy-950">{p.title}</h3>
                  <p className="mt-1 text-sm text-navy-600">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <Testimonials />

      <CtaBanner />
    </>
  );
}
