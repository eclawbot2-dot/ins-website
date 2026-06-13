import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Repeat, ShieldCheck, TrendingDown } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import LeadForm from "@/components/LeadForm";
import { CarrierStrip } from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import { TESTIMONIALS } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Switch & Save on Insurance — We Re-Shop the Market for You",
  alternates: { canonical: "/switch-and-save" },
  description: `Think you're overpaying? ${BRAND.name} re-shops your business, auto, and home insurance across ${BRAND.carriers.length}+ carriers. We handle the paperwork and the switch. Free quote.`,
  openGraph: {
    title: `Switch & Save | ${BRAND.name}`,
    description: "We re-shop your insurance across multiple carriers and handle the switch for you.",
  },
};

const WHY = [
  {
    icon: TrendingDown,
    title: "Rates rose without a claim",
    text: "Carriers raise rates for entire regions based on repair costs, weather, and litigation — even when you've been claim-free. We move you when yours does.",
  },
  {
    icon: Repeat,
    title: "You've never re-shopped",
    text: "Loyalty rarely pays in insurance. If it's been a few years, there's a good chance a better-priced carrier is waiting — for the same or better coverage.",
  },
  {
    icon: ShieldCheck,
    title: "We handle the switch",
    text: "We compare carriers, coordinate the start and stop dates so there's no gap, and handle the applications. You approve; we do the legwork.",
  },
];

export default function SwitchAndSavePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Switch & Save", path: "/switch-and-save" },
        ])}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold-300">Switch &amp; Save</span>
          </nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Stop overpaying.
                <br />
                <span className="bg-gradient-to-r from-gold-300 to-accent-300 bg-clip-text text-transparent">
                  We&apos;ll re-shop it for you.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-navy-200">
                Send us your current premium and a licensed advisor will compare it against{" "}
                {BRAND.carriers.length}+ carriers. If we can&apos;t beat it, we&apos;ll tell you
                straight. If we can, we handle the entire switch — paperwork and all.
              </p>
              <a
                href="#switch-form"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
              >
                See What I Could Save
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <div id="switch-form" className="scroll-mt-24">
              <LeadForm
                source="switch-and-save"
                campaign="switch-and-save"
                heading="Could you be saving?"
                subheading="Tell us your current carrier and what you pay. We'll do the comparison and come back with real numbers."
                cta="Compare My Rate"
                successHeading="On it — thanks, {name}!"
                successBody="A licensed advisor will compare your current coverage and price across multiple carriers and follow up within one business day."
                messageLabel="Current carrier & premium"
                messagePlaceholder="e.g. 'Auto + home with XYZ, about $310/mo, renews in August.' The more you share, the sharper the comparison."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-navy-100 bg-navy-50/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <CarrierStrip label="We re-shop your policy across" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-navy-950">
            When it pays to switch
          </h2>
          <p className="mt-3 text-lg text-navy-600">
            If any of these sound familiar, you&apos;re probably leaving money on the table.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {WHY.map((w) => (
            <div key={w.title} className="rounded-2xl border border-navy-100 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                <w.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold text-navy-950">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{w.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-gold-200 bg-gold-50 p-6">
          <p className="text-[15px] leading-relaxed text-navy-800">
            <strong className="text-navy-950">Will switching hurt my credit?</strong> No —
            comparing your policy across carriers uses a soft credit pull that never affects your
            score, no matter how many carriers we quote.
          </p>
        </div>
      </section>

      <Testimonials
        items={[TESTIMONIALS[0], TESTIMONIALS[3], TESTIMONIALS[4]]}
        heading="People who thought they had a good rate"
        subheading="Until an independent agency actually checked."
      />
    </>
  );
}
