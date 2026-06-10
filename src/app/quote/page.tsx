import type { Metadata } from "next";
import { Clock3, SearchCheck, ShieldCheck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Get a Free Insurance Quote",
  description: `Request a free, no-obligation insurance quote from ${BRAND.name}. We compare auto, home, life, health, and business coverage across ${BRAND.carriers.length}+ top-rated carriers.`,
  openGraph: {
    title: `Get a Free Quote | ${BRAND.name}`,
    description: "Two minutes, multiple carriers compared, zero obligation.",
  },
};

const ASSURANCES = [
  {
    icon: SearchCheck,
    title: `${BRAND.carriers.length}+ carriers, one request`,
    text: "We run your information across our carrier lineup so you see real options side by side.",
  },
  {
    icon: Clock3,
    title: "Quotes within one business day",
    text: "A licensed advisor personally reviews every request — most quotes are back same or next day.",
  },
  {
    icon: ShieldCheck,
    title: "No spam. No pressure.",
    text: "We never sell your information, and there's no obligation to buy anything.",
  },
];

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ line?: string }>;
}) {
  const { line } = await searchParams;
  return (
    <div className="bg-gradient-to-b from-navy-50/80 to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">Free &amp; no obligation</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Let&apos;s find your best rate
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-navy-600">
              Tell us what you need to protect. We&apos;ll shop it across our carrier lineup and come back with real
              options — explained in plain English by a licensed advisor.
            </p>
            <ul className="mt-9 space-y-6">
              {ASSURANCES.map((a) => (
                <li key={a.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <a.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-navy-950">{a.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-9 rounded-2xl border border-navy-100 bg-white p-5 text-sm leading-relaxed text-navy-600">
              Prefer to talk it through? Call{" "}
              <a href={BRAND.phoneHref} className="font-semibold text-teal-700">
                {BRAND.phone}
              </a>{" "}
              — {BRAND.hours[0].days}, {BRAND.hours[0].hours}.
            </p>
          </div>
          <div className="lg:col-span-3">
            <QuoteForm initialLine={line} />
          </div>
        </div>
      </div>
    </div>
  );
}
