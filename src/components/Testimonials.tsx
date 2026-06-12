import { Quote, Star } from "lucide-react";
import { TESTIMONIALS, TESTIMONIALS_ARE_PLACEHOLDER, type Testimonial } from "@/lib/testimonials";

export default function Testimonials({
  items = TESTIMONIALS.slice(0, 3),
  heading = "Clients who stopped overpaying",
  subheading = "The best measure of an agency is what happens after you buy the policy.",
}: {
  items?: Testimonial[];
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="bg-navy-50/60 py-20" aria-label="Client testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">{heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-navy-600">{subheading}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm"
            >
              <Quote className="h-7 w-7 text-gold-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-800">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-navy-100 pt-4">
                <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < t.rating ? "fill-accent-400 text-accent-400" : "text-navy-200"
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="mt-2 font-semibold text-navy-950">{t.name}</p>
                <p className="text-sm text-navy-500">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {TESTIMONIALS_ARE_PLACEHOLDER && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-navy-400">
            Reviews shown are illustrative examples for layout purposes and will be replaced with
            verified client reviews.
          </p>
        )}
      </div>
    </section>
  );
}
