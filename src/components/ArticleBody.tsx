import { Lightbulb } from "lucide-react";
import type { Block } from "@/lib/blog-data";

/** Renders the small block model used by blog articles. Server-safe. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-3 text-2xl font-bold tracking-tight text-navy-950">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-1 text-xl font-bold text-navy-950">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[17px] leading-relaxed text-navy-700">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="ml-1 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[17px] leading-relaxed text-navy-700">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="ml-1 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[17px] leading-relaxed text-navy-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-50 text-sm font-bold text-gold-700">
                      {j + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="flex gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-5"
              >
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed text-navy-800">{block.text}</p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
