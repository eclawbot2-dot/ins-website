import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronRight, Clock3 } from "lucide-react";
import { ARTICLES, getArticle } from "@/lib/blog-data";
import { BRAND } from "@/lib/brand";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import ArticleBody from "@/components/ArticleBody";
import FaqList from "@/components/FaqList";
import LeadForm from "@/components/LeadForm";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: { absolute: `${article.metaTitle} | ${BRAND.name}` },
    description: article.description,
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.metaTitle,
      description: article.description,
      url: `/resources/${article.slug}`,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      {article.faqs && article.faqs.length > 0 && <JsonLd data={faqJsonLd(article.faqs)} />}
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: article.title, path: `/resources/${article.slug}` },
        ])}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-navy-500">
          <Link href="/" className="hover:text-navy-900">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/resources" className="hover:text-navy-900">
            Resources
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-gold-700">{article.category}</span>
        </nav>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-navy-500">
            <span className="rounded-full bg-navy-50 px-3 py-1 font-semibold text-navy-700">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" aria-hidden="true" /> {article.readMinutes} min read
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> Updated{" "}
              {formatDate(article.dateModified)}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-navy-950 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-navy-600">{article.excerpt}</p>
        </header>

        <div className="mt-10">
          <ArticleBody blocks={article.body} />
        </div>

        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-navy-950">
              Frequently asked questions
            </h2>
            <div className="mt-5">
              <FaqList faqs={article.faqs} />
            </div>
          </section>
        )}

        {/* Related coverage links */}
        <section className="mt-12 rounded-2xl border border-navy-100 bg-navy-50/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gold-700">
            Related coverage
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {article.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-800 transition-colors hover:border-gold-300 hover:text-gold-800"
                >
                  {r.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Inline lead capture */}
        <section className="mt-10" id="quote">
          <LeadForm
            source="resources-article"
            campaign={article.slug}
            lineOfBusiness={article.quoteLine}
            heading={
              article.quoteLine
                ? `Want a ${article.quoteLine.replace(" Insurance", "").toLowerCase()} quote?`
                : "Want a free quote or a second opinion?"
            }
            subheading="Tell us a little about what you need and a licensed advisor will compare multiple carriers for you — usually within one business day."
            cta="Get My Free Quote"
            successHeading="Request received — thanks, {name}!"
          />
        </section>
      </article>

      {/* More articles */}
      <section className="border-t border-navy-100 bg-navy-50/40 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-navy-950">Keep reading</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {more.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}`}
                className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-5 transition-all hover:border-gold-300 hover:shadow-md"
              >
                <span className="text-xs font-semibold text-navy-500">{a.category}</span>
                <h3 className="mt-2 flex-1 font-bold leading-snug text-navy-950 group-hover:text-gold-800">
                  {a.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-700">
                  Read <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
