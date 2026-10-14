import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Handshake, Lightbulb, ShieldCheck, Users } from "lucide-react";
import { BRAND } from "@/lib/brand";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us — An Independent Agency That Works for You",
  alternates: { canonical: "/about" },
  description: `${BRAND.name} is an independent insurance agency. Learn about our approach, our values, and why the independent agency model puts clients first.`,
};

const VALUES = [
  {
    icon: Handshake,
    title: "Client-first, always",
    text: "We're paid by carriers, but we work for you. When those interests conflict, you win — that's the whole point of being independent, and it's non-negotiable here.",
  },
  {
    icon: Lightbulb,
    title: "Plain-English advice",
    text: "Insurance is full of jargon designed to be skimmed. We explain what you're buying, what it excludes, and why it matters — before you sign, not after a claim.",
  },
  {
    icon: ShieldCheck,
    title: "Coverage before price",
    text: "The cheapest policy that doesn't pay isn't cheap. We get the protection right first, then make carriers compete on price.",
  },
  {
    icon: Compass,
    title: "Proactive, not reactive",
    text: "We re-shop renewals, flag gaps when your life changes, and call you before problems become claims. You shouldn't have to think about insurance — that's our job.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-300">About {BRAND.shortName}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Insurance the way it should work: someone on your side of the table.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-navy-950">Our approach</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-navy-700">
              <p>
                Insurance decisions start with understanding what you need to protect and what
                your current policy covers.
              </p>
              <p>
                Start with your coverage needs, then compare the available options. We explain
                policy terms and trade-offs so you can make an informed decision.
              </p>
              <p>
                Our aim is plain-English advice that helps you understand coverage as your life
                and business change.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-950">How the independent model works</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-navy-700">
              <p>
                A <strong>captive agent</strong> represents one insurance company and can only sell that
                company&apos;s policies. Their advice is constrained by their inventory: if their carrier&apos;s auto
                rates are uncompetitive for your profile, they can&apos;t tell you — and they certainly can&apos;t fix
                it.
              </p>
              <p>
                An <strong>independent agency</strong> can help compare insurance options.
                The insurers and products available depend on location, eligibility and underwriting.
              </p>
              <p>
                Review your options when your needs or policy terms change. A different policy
                may have different coverage, exclusions and eligibility requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16" aria-labelledby="values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-gold-700" aria-hidden="true" />
            <h2 id="values" className="text-2xl font-bold text-navy-950">What we stand for</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <v.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-950">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-navy-700">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-navy-950 to-gold-950 p-10 text-center text-white sm:p-14">
          <h2 className="text-2xl font-bold sm:text-3xl">Explore coverage options</h2>
          <p className="mx-auto mt-3 max-w-2xl text-navy-200">
            Tell us what you need to protect. Availability depends on your location and underwriting.
          </p>
          <Link
            href="/quote"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 font-semibold text-navy-950 shadow-lg transition-colors hover:bg-accent-400"
          >
            Request a quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CtaBanner
        title="Meet your advisor before you need one"
        subtitle="No pitch, no pressure — just a conversation about what you have, what it would cost to lose, and what protecting it properly looks like."
      />
    </>
  );
}
