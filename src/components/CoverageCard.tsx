import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CoverageLine } from "@/lib/coverage-data";
import { getIcon } from "@/lib/icons";

export default function CoverageCard({ line }: { line: CoverageLine }) {
  const Icon = getIcon(line.icon);
  return (
    <Link
      href={`/${line.category}/${line.slug}`}
      className="group relative flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg hover:shadow-navy-950/5"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-50 to-teal-50 text-teal-700 transition-colors group-hover:from-teal-600 group-hover:to-navy-700 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-navy-950">{line.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-600">{line.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 group-hover:text-teal-600">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
