import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, Clock3 } from "lucide-react";
import { ARTICLES } from "@/lib/blog-data";
import { BRAND } from "@/lib/brand";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import NewsletterSignup from "@/components/NewsletterSignup";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Insurance Resources & Guides",
  alternates: { canonical: "/resources" },
  description: `Plain-English insurance guides from ${BRAND.name}: how much coverage you need, discounts you're missing, umbrella policies, business insurance, deductibles, and more.`,
  openGraph: {
    title: `Insurance Resources & Guides | ${BRAND.name}`,
    description:
      "Genuinely useful, no-jargon guides to business and personal insurance — written by an independent agency.",
  },
};

const FEATURED = ARTICLES[0];
const REST = ARTICLES.slice(1);

function blogListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/resources")}#blog`,
    name: `${BRAND.name} Insurance Resources`,
    description: "Plain-English guides to business and personal insurance.",
    url: absoluteUrl("/resources"),
    publisher: { "@id": `${BRAND.url}/#agency` },
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: absoluteUrl(`/resources/${a.slug}`),
      datePublished: a.datePublished,
      dateModified: a.dateModified,
      description: a.description,
    })),
  };
}

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={blogListJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-gold-950">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-navy-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-gold-300">Resources</span>
          </nav>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-sm font-medium text-gold-200">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Insurance, in plain English
          </p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Resources &amp; Guides
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-200">
            No jargon, no sales pitch — just clear answers to the insurance questions people
            actually ask. Written by licensed advisors at an independent agency.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Featured */}
        <Link
          href={`/resources/${FEATURED.slug}`}
          className="group block overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-50/80 to-white p-8 transition-shadow hover:shadow-xl hover:shadow-navy-950/5 sm:p-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-800">
            Featured · {FEATURED.category}
          </span>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
            {FEATURED.title}
          </h2>
          <p className="mt-3 max-w-2xl text-navy-600">{FEATURED.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-semibold text-gold-700 group-hover:text-gold-600">
            Read the guide
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>

        {/* Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REST.map((a) => (
            <Link
              key={a.slug}
              href={`/resources/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-6 transition-all hover:border-gold-300 hover:shadow-lg hover:shadow-navy-950/5"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-navy-500">
                <span className="rounded-full bg-navy-50 px-2.5 py-0.5 font-semibold text-navy-700">
                  {a.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> {a.readMinutes} min
                </span>
              </div>
              <h3 className="mt-3 flex-1 text-lg font-bold leading-snug text-navy-950 group-hover:text-gold-800">
                {a.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-navy-600">{a.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                Read more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-3xl border border-navy-100 bg-navy-50/60 p-8 sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-navy-950">
                Get coverage tips &amp; renewal reminders
              </h2>
              <p className="mt-2 text-navy-600">
                A short, occasional email with money-saving insurance tips and a heads-up before
                your rates change. No spam — unsubscribe anytime.
              </p>
            </div>
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </div>

      <CtaBanner
        title="Have a question this didn't answer?"
        subtitle="Ask a licensed advisor directly — no obligation, no pressure. We'll give you a straight answer and, if you want, a quote across multiple carriers."
      />
    </>
  );
}
