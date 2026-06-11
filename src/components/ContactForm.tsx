"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { BRAND } from "@/lib/brand";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never fill this

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim() && !phone.trim()) {
      setError("Please provide an email or phone number so we can get back to you.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          zip,
          lineOfBusiness: "",
          message,
          website,
          source: "contact",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-gold-200 bg-gold-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy-950">Message sent — thank you!</h3>
        <p className="mx-auto mt-2 max-w-sm text-navy-700">
          We&apos;ll get back to you within one business day. For anything urgent, call{" "}
          <a href={BRAND.phoneHref} className="font-semibold text-gold-700 underline">
            {BRAND.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-navy-100 bg-white p-6 shadow-xl shadow-navy-950/5 sm:p-8">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Leave this field empty</label>
        <input
          id="c-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-firstName" className="block text-sm font-medium text-navy-900">
            First name *
          </label>
          <input
            id="c-firstName"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
        <div>
          <label htmlFor="c-lastName" className="block text-sm font-medium text-navy-900">
            Last name *
          </label>
          <input
            id="c-lastName"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-medium text-navy-900">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
        <div>
          <label htmlFor="c-phone" className="block text-sm font-medium text-navy-900">
            Phone
          </label>
          <input
            id="c-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-zip" className="block text-sm font-medium text-navy-900">
            ZIP code
          </label>
          <input
            id="c-zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="mt-1.5 w-full max-w-xs rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="block text-sm font-medium text-navy-900">
            How can we help? *
          </label>
          <textarea
            id="c-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            Send Message <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
