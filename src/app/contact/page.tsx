import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact Us — Talk to a Licensed Advisor",
  alternates: { canonical: "/contact" },
  description: `Send a coverage or policy question to ${BRAND.name} using our contact form.`,
};

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-navy-50/80 to-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">Contact us</h1>
          <p className="mt-4 text-lg text-navy-600">
            Question about coverage, a policy change, a certificate, a claim — or just want a second opinion on what
            you&apos;re paying now? Send your question using the form below.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2.5 font-bold text-navy-950">
                <MapPin className="h-5 w-5 text-gold-700" aria-hidden="true" />
                Office
              </h2>
              <p className="mt-2 text-navy-800">
                {BRAND.address.street}
                <br />
                {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
              </p>
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
