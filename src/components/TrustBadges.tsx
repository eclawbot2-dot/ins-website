import { HeartHandshake, Lock, ShieldCheck, Users } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Independent agency",
    text: "We represent you, not one carrier.",
  },
  {
    icon: Users,
    title: "Coverage options",
    text: "Discuss what you need to protect.",
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
];

export default function TrustBadges() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
