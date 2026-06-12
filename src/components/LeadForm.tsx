"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2, Phone, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { trackLead } from "@/lib/analytics";

/**
 * Reusable lead-capture form used across the marketing site.
 *
 * Every instance posts to /api/quote (the X-Lead-Key proxy) with a `source`,
 * `lineOfBusiness`, and `campaign` so the platform can attribute the lead to
 * the exact surface that produced it. Includes a honeypot, graceful success,
 * and a dataLayer `generate_lead` event on success.
 *
 * Variants:
 *  - "inline"  — full form rendered in place (default)
 *  - "compact" — tighter spacing for sidebars / cards
 *  - "modal"   — opens from a trigger button in a focus-trapped dialog
 */

export type LeadFormProps = {
  /** Attribution: which surface produced this lead (e.g. "coverage-checkup"). */
  source: string;
  /** Optional line of business pre-tag (e.g. "Auto Insurance"). */
  lineOfBusiness?: string;
  /** Optional campaign tag (e.g. "switch-and-save"). */
  campaign?: string;
  /** Headline shown above the fields. */
  heading?: string;
  /** Supporting copy under the heading. */
  subheading?: string;
  /** Submit button label. */
  cta?: string;
  /** Success headline. */
  successHeading?: string;
  /** Success body copy. */
  successBody?: string;
  /** Show the free-text "anything we should know" field. Default true. */
  showMessage?: boolean;
  /** Label for the message field when shown. */
  messageLabel?: string;
  /** Placeholder for the message field. */
  messagePlaceholder?: string;
  /** Show ZIP field. Default true. */
  showZip?: boolean;
  variant?: "inline" | "compact";
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 placeholder:text-navy-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20";

export default function LeadForm({
  source,
  lineOfBusiness = "",
  campaign = "",
  heading,
  subheading,
  cta = "Request My Quote",
  successHeading = "Request received — thank you!",
  successBody,
  showMessage = true,
  messageLabel = "Anything we should know?",
  messagePlaceholder = "Current carrier, renewal date, what you're looking to protect — whatever's relevant.",
  showZip = true,
  variant = "inline",
}: LeadFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const fieldId = (n: string) => `${source}-${n}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
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
          source,
          campaign,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }
      trackLead({ source, lineOfBusiness, campaign });
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again or call us."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-gold-200 bg-gold-50 p-8 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy-950">
          {successHeading.replace("{name}", firstName)}
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-navy-700">
          {successBody ??
            "A licensed advisor will review your request and reach out within one business day."}{" "}
          Need it faster? Call{" "}
          <a href={BRAND.phoneHref} className="font-semibold text-gold-700 underline">
            {BRAND.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const compact = variant === "compact";

  return (
    <form
      onSubmit={submit}
      className={`rounded-3xl border border-navy-100 bg-white shadow-xl shadow-navy-950/5 ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
      }`}
    >
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId("website")}>Leave this field empty</label>
        <input
          id={fieldId("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {heading && <h3 className="text-xl font-bold text-navy-950">{heading}</h3>}
      {subheading && <p className="mt-1.5 text-sm text-navy-600">{subheading}</p>}

      <div className={`grid gap-4 sm:grid-cols-2 ${heading ? "mt-5" : ""}`}>
        <div>
          <label htmlFor={fieldId("first")} className="block text-sm font-medium text-navy-900">
            First name *
          </label>
          <input
            id={fieldId("first")}
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={fieldId("last")} className="block text-sm font-medium text-navy-900">
            Last name *
          </label>
          <input
            id={fieldId("last")}
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={fieldId("email")} className="block text-sm font-medium text-navy-900">
            Email
          </label>
          <input
            id={fieldId("email")}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={fieldId("phone")} className="block text-sm font-medium text-navy-900">
            Phone
          </label>
          <input
            id={fieldId("phone")}
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        {showZip && (
          <div className={showMessage ? "" : "sm:col-span-2"}>
            <label htmlFor={fieldId("zip")} className="block text-sm font-medium text-navy-900">
              ZIP code
            </label>
            <input
              id={fieldId("zip")}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="e.g. 92101"
              className={`${inputClass} max-w-xs`}
            />
          </div>
        )}
        {showMessage && (
          <div className="sm:col-span-2">
            <label htmlFor={fieldId("msg")} className="block text-sm font-medium text-navy-900">
              {messageLabel} <span className="font-normal text-navy-500">(optional)</span>
            </label>
            <textarea
              id={fieldId("msg")}
              rows={compact ? 3 : 4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={messagePlaceholder}
              className={inputClass}
            />
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-navy-500">
        * Required. Provide at least one of email or phone. No spam, no robocalls — we never sell
        your information.
      </p>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-md shadow-accent-500/25 transition-all hover:bg-accent-400 disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </>
        ) : (
          <>
            {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

/**
 * Modal lead form. Renders a trigger button; clicking opens a focus-trapped
 * dialog containing a LeadForm. Used for "Switch & save", "Request a
 * certificate", and other contextual CTAs.
 */
export function LeadFormModal({
  trigger,
  triggerClassName,
  ...formProps
}: LeadFormProps & {
  trigger: React.ReactNode;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerClassName ??
          "inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-semibold text-navy-950 shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-400"
        }
      >
        {trigger}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={formProps.heading ?? "Request a quote"}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative my-8 w-full max-w-lg">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy-700 shadow-lg ring-1 ring-navy-100 hover:bg-navy-50"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <LeadForm {...formProps} variant="inline" />
          </div>
        </div>
      )}
    </>
  );
}

/** A small sticky "call us" + "get a quote" bar that appears on scroll (mobile). */
export function StickyQuoteBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(16,29,51,0.08)] backdrop-blur transition-transform lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-3">
        <a
          href={BRAND.phoneHref}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-200 px-4 py-3 text-sm font-semibold text-navy-800"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
        <Link
          href="/quote"
          className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-full bg-accent-500 px-4 py-3 text-sm font-semibold text-navy-950"
        >
          Get a Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
