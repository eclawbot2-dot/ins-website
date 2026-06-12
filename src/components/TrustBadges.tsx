import { Award, BadgeCheck, HeartHandshake, Lock, ShieldCheck, Users } from "lucide-react";
import { BRAND } from "@/lib/brand";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Independent agency",
    text: "We represent you, not one carrier.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & appointed",
    text: BRAND.license,
  },
  {
    icon: Users,
    title: `${BRAND.carriers.length}+ carriers`,
    text: "One conversation, many quotes.",
  },
  {
    icon: HeartHandshake,
    title: "Claims advocacy",
    text: "We're in your corner at claim time.",
  },
  {
    icon: Lock,
    title: "Your data stays private",
    text: "No spam, no robocalls, never sold.",
  },
  {
    icon: Award,
    title: "Local advisors",
    text: `Based in ${BRAND.address.city}, ${BRAND.address.state}.`,
  },
];

export default function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {BADGES.map((b) => (
        <li
          key={b.title}
          className="flex flex-col items-center gap-2 rounded-2xl border border-navy-100 bg-white p-4 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
            <b.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-navy-950">{b.title}</span>
          <span className="text-xs leading-snug text-navy-500">{b.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Text-based carrier logo strip (no image assets required). */
export function CarrierStrip({
  label = "Quoting top-rated carriers including",
}: {
  label?: string;
}) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-navy-500">
        {label}
      </p>
      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {BRAND.carriers.map((c) => (
          <li
            key={c}
            className="text-lg font-bold tracking-tight text-navy-400 transition-colors hover:text-navy-700"
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
