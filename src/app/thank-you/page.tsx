import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Thank You — We've Got Your Request",
  alternates: { canonical: "/thank-you" },
  description: `Thanks for reaching out to ${BRAND.name}. A licensed advisor will be in touch within one business day. Here's what happens next.`,
  robots: { index: false, follow: true },
};

const NEXT_STEPS = [
  {
    n: "1",
    title: "A licensed advisor reviews your request",
    text: "A real person — not a call center — looks at exactly what you need.",
  },
  {
    n: "2",
    title: "We shop multiple carriers",
    text: `We compare coverage and price across ${BRAND.carriers.length}+ top-rated carriers for your situation.`,
  },
  {
    n: "3",
    title: "You get real options within one business day",
    text: "Clear, side-by-side choices with our honest recommendation — no pressure to buy.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="bg-gradient-to-b from-navy-50/80 to-white">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold-600" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
          Thank you — your request is in good hands.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-navy-600">
          A licensed advisor will be in touch within one business day. Want to get a head start?
          Call us now and we can often get you quotes on the spot.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BRAND.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {BRAND.phone}
          </a>
          <Link
            href="/resources"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 px-7 py-3.5 text-base font-semibold text-navy-800 transition-colors hover:bg-navy-50"
          >
            <BookOpen className="h-5 w-5" aria-hidden="true" />
            Read coverage guides
          </Link>
        </div>

        <div className="mt-12 rounded-3xl border border-navy-100 bg-white p-8 text-left shadow-sm">
          <h2 className="flex items-center gap-2 font-bold text-navy-950">
            <ShieldCheck className="h-5 w-5 text-gold-700" aria-hidden="true" />
            What happens next
          </h2>
          <ol className="mt-5 space-y-5">
            {NEXT_STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-50 font-bold text-gold-700">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-semibold text-navy-950">{s.title}</h3>
                  <p className="mt-0.5 text-sm text-navy-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600"
        >
          Back to home
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
