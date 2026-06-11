import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function CtaBanner({
  title = "Ready to see what the right coverage costs?",
  subtitle = "Tell us a little about what you need to protect. We'll shop multiple carriers and come back with real options — usually within one business day.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-200">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400 hover:shadow-xl"
          >
            Start My Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={BRAND.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BRAND.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
