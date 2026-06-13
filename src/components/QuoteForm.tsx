"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ALL_LINES } from "@/lib/coverage-data";
import { getIcon } from "@/lib/icons";
import { BRAND } from "@/lib/brand";
import { trackLead } from "@/lib/analytics";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ["Coverage", "Details", "Contact"] as const;

export default function QuoteForm({ initialLine }: { initialLine?: string }) {
  const validInitial = ALL_LINES.some((l) => l.name === initialLine) ? initialLine : "";
  const [step, setStep] = useState<Step>(validInitial ? 2 : 1);
  const [lineOfBusiness, setLineOfBusiness] = useState<string>(validInitial ?? "");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never fill this

  const personal = ALL_LINES.filter((l) => l.category === "personal");
  const business = ALL_LINES.filter((l) => l.category === "business");

  async function submit() {
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Please provide an email or phone number so we can reach you.");
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
          lineOfBusiness,
          message,
          website,
          source: "website",
          campaign: "main-quote-form",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      trackLead({ source: "website", lineOfBusiness, campaign: "main-quote-form" });
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 4) {
    return (
      <div className="rounded-3xl border border-gold-200 bg-gold-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold-600" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-bold text-navy-950">Request received — thank you, {firstName}!</h2>
        <p className="mx-auto mt-3 max-w-md text-navy-700">
          A licensed advisor will review your request and reach out within one business day with quotes from
          multiple carriers. Need something faster? Call us at{" "}
          <a href={BRAND.phoneHref} className="font-semibold text-gold-700 underline">
            {BRAND.phone}
          </a>
          .
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-xl shadow-navy-950/5 sm:p-10">
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Quote progress">
        {STEP_LABELS.map((label, i) => {
          const n = (i + 1) as Step;
          const state = step > n ? "done" : step === n ? "active" : "todo";
          return (
            <li key={label} className="flex flex-1 flex-col gap-1.5">
              <span
                className={`h-1.5 rounded-full transition-colors ${
                  state === "done" ? "bg-gold-500" : state === "active" ? "bg-accent-500" : "bg-navy-100"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  state === "todo" ? "text-navy-400" : "text-navy-900"
                }`}
              >
                {i + 1}. {label}
              </span>
            </li>
          );
        })}
      </ol>

      {step === 1 && (
        <fieldset>
          <legend className="text-xl font-bold text-navy-950">What would you like a quote for?</legend>
          <p className="mt-1 text-sm text-navy-600">Pick the coverage you need — you can mention others later.</p>
          {[
            { title: "Business", lines: business },
            { title: "Personal", lines: personal },
          ].map((group) => (
            <div key={group.title} className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-700">{group.title}</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.lines.map((line) => {
                  const Icon = getIcon(line.icon);
                  const selected = lineOfBusiness === line.name;
                  return (
                    <button
                      key={line.slug}
                      type="button"
                      onClick={() => {
                        setLineOfBusiness(line.name);
                        setStep(2);
                      }}
                      aria-pressed={selected}
                      className={`flex items-center gap-2.5 rounded-xl border p-3 text-left text-sm font-medium transition-all ${
                        selected
                          ? "border-gold-500 bg-gold-50 text-navy-950"
                          : "border-navy-100 text-navy-700 hover:border-gold-300 hover:bg-gold-50/50"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                      {line.shortName}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </fieldset>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-navy-950">Tell us a bit about what you need</h2>
          <p className="mt-1 text-sm text-navy-600">
            Quoting: <span className="font-semibold text-gold-700">{lineOfBusiness || "Insurance"}</span>{" "}
            <button type="button" className="text-xs text-navy-500 underline" onClick={() => setStep(1)}>
              (change)
            </button>
          </p>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-navy-900">
                ZIP code
              </label>
              <input
                id="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={10}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="e.g. 92101"
                className="mt-1.5 w-full max-w-xs rounded-xl border border-navy-200 px-4 py-3 text-navy-950 placeholder:text-navy-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-navy-900">
                Anything we should know? <span className="font-normal text-navy-500">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Vehicles, drivers, property details, current carrier, renewal date, business operations — whatever's relevant."
                className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 placeholder:text-navy-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-950"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Continue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label htmlFor="q-website">Leave this field empty</label>
            <input
              id="q-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <h2 className="text-xl font-bold text-navy-950">Where should we send your quotes?</h2>
          <p className="mt-1 text-sm text-navy-600">
            A licensed advisor will follow up — no robocalls, no spam, and we never sell your information.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-navy-900">
                First name *
              </label>
              <input
                id="firstName"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-navy-900">
                Last name *
              </label>
              <input
                id="lastName"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-900">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-900">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-navy-500">* Required. Provide at least one of email or phone.</p>
          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-950"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-3 text-sm font-semibold text-navy-950 shadow-md shadow-accent-500/25 transition-all hover:bg-accent-400 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Get My Quotes <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
