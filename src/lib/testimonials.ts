/**
 * Testimonials / reviews.
 *
 * IMPORTANT: These are illustrative placeholder reviews for layout and
 * design purposes only. Replace with real, verifiable client reviews before
 * relying on them for marketing claims, and do NOT emit Review/AggregateRating
 * structured data for placeholder content (Google requires genuine reviews).
 * The `placeholder` flag gates whether review schema is emitted.
 */
export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They re-shopped my auto and home at renewal and cut my total premium by almost $900 a year — same coverage, better carrier. I didn't fill out a single application myself.",
    name: "Melissa R.",
    detail: "Auto + Home bundle",
    rating: 5,
  },
  {
    quote:
      "As a new contractor I needed GL, workers' comp, and a certificate for a job starting Monday. They had me covered and the COI in the GC's inbox the same afternoon.",
    name: "Dan K.",
    detail: "Small business owner",
    rating: 5,
  },
  {
    quote:
      "After our kitchen fire, our advisor handled the carrier so we didn't have to. Hotel covered, claim paid, zero runaround. That's why you use an agency instead of an 800 number.",
    name: "Priya & James T.",
    detail: "Homeowners claim",
    rating: 5,
  },
  {
    quote:
      "I'd been with the same captive agent for 12 years and never knew I was overpaying. Twenty minutes on the phone and they found me a better policy with a higher-rated carrier.",
    name: "Robert M.",
    detail: "Switched from a captive agent",
    rating: 5,
  },
  {
    quote:
      "They actually explained my deductibles and umbrella in plain English instead of just selling me the cheapest thing. I finally understand what I'm paying for.",
    name: "Angela S.",
    detail: "Auto + Umbrella",
    rating: 5,
  },
  {
    quote:
      "Our cyber policy paid for the forensics and the attorney within hours of a ransomware scare. Worth every penny — and they walked us through tightening our controls afterward.",
    name: "Westfield Logistics",
    detail: "Cyber liability claim",
    rating: 5,
  },
];

/** Set false only when every entry above is a real, verifiable review. */
export const TESTIMONIALS_ARE_PLACEHOLDER = true;
