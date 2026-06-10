import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/coverage-data";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white">
      {faqs.map((faq) => (
        <details key={faq.question} className="faq-item group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-navy-950">
            {faq.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-teal-600 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-[15px] leading-relaxed text-navy-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
