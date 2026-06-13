import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import Wordmark from "@/components/Wordmark";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
  return (
    <footer className="bg-navy-950 pb-20 text-navy-200 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + NAP */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center" aria-label={`${BRAND.name} — home`}>
              <Wordmark variant="dark" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">{BRAND.tagline}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>
                  {BRAND.address.street}
                  <br />
                  {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
                </span>
              </li>
              <li>
                <a href={BRAND.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                  <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  {BRAND.email}
                </a>
              </li>
            </ul>

            <div className="mt-7 max-w-sm">
              <h3 className="text-sm font-semibold text-white">Coverage tips in your inbox</h3>
              <p className="mt-1.5 text-xs text-navy-400">
                Occasional money-saving tips and renewal reminders. No spam, unsubscribe anytime.
              </p>
              <div className="mt-3">
                <NewsletterSignup variant="footer" />
              </div>
            </div>
          </div>

          {/* Business */}
          <nav aria-label="Business insurance links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Business</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {BUSINESS_LINES.map((l) => (
                <li key={l.slug}>
                  <Link href={`/business/${l.slug}`} className="inline-block py-0.5 hover:text-white">
                    {l.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Personal */}
          <nav aria-label="Personal insurance links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Personal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PERSONAL_LINES.map((l) => (
                <li key={l.slug}>
                  <Link href={`/personal/${l.slug}`} className="inline-block py-0.5 hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company links">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/coverage-checkup" className="inline-block py-0.5 hover:text-white">Free Coverage Checkup</Link></li>
              <li><Link href="/switch-and-save" className="inline-block py-0.5 hover:text-white">Switch &amp; Save</Link></li>
              <li><Link href="/certificate" className="inline-block py-0.5 hover:text-white">Request a Certificate</Link></li>
              <li><Link href="/resources" className="inline-block py-0.5 hover:text-white">Resources &amp; Guides</Link></li>
              <li><Link href="/client-login" className="inline-block py-0.5 hover:text-white">Client Login</Link></li>
              <li><Link href="/about" className="inline-block py-0.5 hover:text-white">About Us</Link></li>
              <li><Link href="/claims" className="inline-block py-0.5 hover:text-white">File a Claim</Link></li>
              <li><Link href="/quote" className="inline-block py-0.5 hover:text-white">Get a Quote</Link></li>
              <li><Link href="/contact" className="inline-block py-0.5 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="inline-block py-0.5 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="inline-block py-0.5 hover:text-white">Terms of Use</Link></li>
            </ul>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-white">Hours</h3>
            <ul className="mt-4 space-y-1.5 text-sm">
              {BRAND.hours.map((h) => (
                <li key={h.days}>
                  <span className="text-navy-300">{h.days}:</span> {h.hours}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-navy-800 pt-8 text-xs leading-relaxed text-navy-400">
          <p>
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved. {BRAND.license}.
          </p>
          <p className="mt-2 max-w-3xl">
            {BRAND.shortName} is an independent insurance agency. Insurance products are offered through multiple
            insurance carriers and are subject to underwriting approval. Coverage descriptions on this website are
            general in nature; refer to your policy for actual terms, conditions, and exclusions. Not all products
            are available in all states.
          </p>
        </div>
      </div>
    </footer>
  );
}
