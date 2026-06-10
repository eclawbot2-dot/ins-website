import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PERSONAL_LINES, getLine } from "@/lib/coverage-data";
import { BRAND } from "@/lib/brand";
import CoverageDetail from "@/components/CoverageDetail";

export function generateStaticParams() {
  return PERSONAL_LINES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getLine("personal", slug);
  if (!line) return {};
  return {
    title: `${line.name} — Compare Quotes from ${BRAND.carriers.length}+ Carriers`,
    description: line.summary,
    openGraph: {
      title: `${line.name} | ${BRAND.name}`,
      description: line.summary,
      url: `${BRAND.url}/personal/${line.slug}`,
    },
  };
}

export default async function PersonalLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getLine("personal", slug);
  if (!line) notFound();
  return <CoverageDetail line={line} />;
}
