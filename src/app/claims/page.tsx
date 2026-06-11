import type { Metadata } from "next";
import { AlertTriangle, Camera, FileText, Phone, ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "File a Claim — Carrier Claim Numbers & What to Do First",
  alternates: { canonical: "/claims" },
  description: `How to file an insurance claim with ${BRAND.name}: step-by-step guidance, 24/7 carrier claim phone numbers for Progressive, Travelers, Hartford, Liberty Mutual, Chubb, Nationwide, Safeco, and Hanover.`,
};

const CARRIER_CLAIMS: { carrier: string; phone: string; note: string }[] = [
  { carrier: "Progressive", phone: "1-800-776-4737", note: "24/7 claims reporting" },
  { carrier: "Travelers", phone: "1-800-252-4633", note: "24/7 claims reporting" },
  { carrier: "The Hartford", phone: "1-800-243-5860", note: "24/7 claims reporting" },
  { carrier: "Liberty Mutual", phone: "1-800-225-2467", note: "24/7 claims reporting" },
  { carrier: "Chubb", phone: "1-800-252-4670", note: "24/7 claims reporting" },
  { carrier: "Nationwide", phone: "1-800-421-3535", note: "24/7 claims reporting" },
  { carrier: "Safeco", phone: "1-800-332-3226", note: "24/7 claims reporting" },
  { carrier: "The Hanover", phone: "1-800-628-0250", note: "24/7 claims reporting" },
];

const STEPS = [
  {
    icon: ShieldCheck,
    title: "1. Make sure everyone is safe",
    text: "People first, property second. Call 911 for injuries, fire, or theft in progress. For auto accidents, move to safety and get a police report — it makes every later step easier.",
  },
  {
    icon: Camera,
    title: "2. Document everything",
    text: "Photos and video of damage, the scene, and anything relevant (other vehicles, license plates, weather). Keep receipts for emergency repairs, hotel stays, and anything you spend because of the loss.",
  },
  {
    icon: AlertTriangle,
    title: "3. Prevent further damage — don't make permanent repairs yet",
    text: "Reasonable temporary measures (tarping a roof, shutting off water) are expected and reimbursable. Hold off on permanent repairs until the adjuster has seen the damage.",
  },
  {
    icon: Phone,
    title: "4. Call us — or the carrier directly",
    text: `During business hours, call ${BRAND.phone} and we'll report the claim with you and stay on it until it's resolved. Nights and weekends, use your carrier's 24/7 claim line below, then let us know so we can track it.`,
  },
  {
    icon: FileText,
    title: "5. Work the claim — with us in your corner",
    text: "An adjuster will be assigned, inspect the damage, and issue an estimate. If anything stalls, the estimate seems short, or you're unsure what to sign — call us before agreeing to anything. Advocacy at claim time is the whole point of having an agent.",
  },
];

export default function ClaimsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-teal-900">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">File a Claim</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-200">
            A claim is the moment your insurance has to work. Here&apos;s exactly what to do — and remember, you can
            always call us first at{" "}
            <a href={BRAND.phoneHref} className="font-semibold text-teal-300 underline">
              {BRAND.phone}
            </a>{" "}
            and we&apos;ll handle the carrier with you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="claim-steps">
        <h2 id="claim-steps" className="text-2xl font-bold text-navy-950">
          What to do after a loss
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700">{s.text}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-navy-950 to-teal-900 p-6 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-teal-300">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-bold">Not sure whether to file?</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-200">
              For smaller losses near your deductible, filing isn&apos;t always the right move. Call us first —
              we&apos;ll talk through the numbers with no pressure either way.
            </p>
            <a href={BRAND.phoneHref} className="mt-4 inline-block font-semibold text-accent-300">
              {BRAND.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-navy-50/60 py-16" aria-labelledby="carrier-numbers">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="carrier-numbers" className="text-2xl font-bold text-navy-950">
            24/7 carrier claim phone numbers
          </h2>
          <p className="mt-2 max-w-2xl text-navy-600">
            Your carrier name is on your policy declarations page and your ID card. Report directly any time, day or
            night — then let us know so we can track the claim for you.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-navy-950 text-white">
                  <th scope="col" className="px-6 py-4 font-semibold">Carrier</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Claims phone</th>
                  <th scope="col" className="hidden px-6 py-4 font-semibold sm:table-cell">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {CARRIER_CLAIMS.map((row) => (
                  <tr key={row.carrier} className="hover:bg-teal-50/40">
                    <th scope="row" className="px-6 py-4 font-semibold text-navy-950">{row.carrier}</th>
                    <td className="px-6 py-4">
                      <a href={`tel:${row.phone.replace(/[^0-9]/g, "")}`} className="font-medium text-teal-700 hover:text-teal-600">
                        {row.phone}
                      </a>
                    </td>
                    <td className="hidden px-6 py-4 text-navy-600 sm:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-navy-500">
            Phone numbers are provided for convenience and may change; the number on your policy documents or carrier
            website is authoritative.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Want an agency that shows up at claim time?"
        subtitle="Claims advocacy is built into every policy we place. Get a quote and see what having someone in your corner actually feels like."
      />
    </>
  );
}
