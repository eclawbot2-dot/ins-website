import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BUSINESS_LINES, getLine } from "@/lib/coverage-data";
import { BRAND } from "@/lib/brand";
import CoverageDetail from "@/components/CoverageDetail";

export function generateStaticParams() {
  return BUSINESS_LINES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine("business", slug);
  if (!line) return {};
  return {
    title: `${line.name} — Compare Quotes from ${BRAND.carriers.length}+ Carriers`,
    description: line.summary,
    openGraph: {
      title: `${line.name} | ${BRAND.name}`,
      description: line.summary,
      url: `${BRAND.url}/business/${line.slug}`,
    },
  };
}

export default async function BusinessLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getLine("business", slug);
  if (!line) notFound();
  return <CoverageDetail line={line} />;
}
