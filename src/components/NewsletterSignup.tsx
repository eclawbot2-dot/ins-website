"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { trackLead } from "@/lib/analytics";

/**
 * Email newsletter / coverage-tips signup. Posts to the same lead proxy with
 * source="newsletter" so the platform captures the contact and can drip
 * coverage education + renewal reminders.
 */
export default function NewsletterSignup({
  variant = "footer",
}: {
  variant?: "footer" | "inline";
}) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: "Newsletter",
          lastName: "Subscriber",
          email,
          phone: "",
          zip: "",
          lineOfBusiness: "",
          message: "Newsletter / coverage-tips signup",
          website,
          source: "newsletter",
          campaign: "newsletter",
        }),
      });
      if (!res.ok) {
        // Surface the proxy's own message — on a delivery failure it explains
        // that nothing was sent, which "Something went wrong" does not.
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      trackLead({ source: "newsletter", campaign: "newsletter" });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const dark = variant === "footer";

  if (sent) {
    return (
      <p
        className={`flex items-center gap-2 text-sm font-medium ${
          dark ? "text-gold-300" : "text-gold-700"
        }`}
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> You&apos;re subscribed — watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`nl-${variant}`} className="sr-only">
          Email address
        </label>
        <div className="relative flex-1">
          <Mail
            className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              dark ? "text-navy-400" : "text-navy-400"
            }`}
            aria-hidden="true"
          />
          <input
            id={`nl-${variant}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className={`w-full rounded-full py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 ${
              dark
                ? "border border-navy-700 bg-navy-900 text-white placeholder:text-navy-400"
                : "border border-navy-200 bg-white text-navy-950 placeholder:text-navy-300"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-accent-400 disabled:opacity-60"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Subscribe"}
        </button>
      </div>
      {error && (
        <p role="alert" className={`mt-2 text-xs ${dark ? "text-red-300" : "text-red-600"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
