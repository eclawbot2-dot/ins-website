import type { Metadata } from "next";
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

        <div className="mt-12 max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
