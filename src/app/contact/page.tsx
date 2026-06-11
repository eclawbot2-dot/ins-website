import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact Us — Talk to a Licensed Advisor",
  alternates: { canonical: "/contact" },
  description: `Contact ${BRAND.name}: call ${BRAND.phone}, email ${BRAND.email}, or send a message. Office in ${BRAND.address.city}, ${BRAND.address.state}. We respond within one business day.`,
};

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-navy-50/80 to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">Contact us</h1>
          <p className="mt-4 text-lg text-navy-600">
            Question about coverage, a policy change, a certificate, a claim — or just want a second opinion on what
            you&apos;re paying now? Reach out however suits you. A real, licensed human responds within one business
            day.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2.5 font-bold text-navy-950">
                <Phone className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Phone
              </h2>
              <a href={BRAND.phoneHref} className="mt-2 block text-lg font-semibold text-teal-700 hover:text-teal-600">
                {BRAND.phone}
              </a>
              <p className="mt-1 text-sm text-navy-600">Fastest for anything time-sensitive.</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2.5 font-bold text-navy-950">
                <Mail className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Email
              </h2>
              <a href={`mailto:${BRAND.email}`} className="mt-2 block text-lg font-semibold text-teal-700 hover:text-teal-600">
                {BRAND.email}
              </a>
              <p className="mt-1 text-sm text-navy-600">Great for documents, COI requests, and policy questions.</p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2.5 font-bold text-navy-950">
                <MapPin className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Office
              </h2>
              <p className="mt-2 text-navy-800">
                {BRAND.address.street}
                <br />
                {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
              </p>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2.5 font-bold text-navy-950">
                <Clock3 className="h-5 w-5 text-teal-700" aria-hidden="true" />
                Hours
              </h2>
              <ul className="mt-2 space-y-1.5 text-sm text-navy-800">
                {BRAND.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-6">
                    <span className="text-navy-600">{h.days}</span>
                    <span className="font-medium">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
