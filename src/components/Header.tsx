"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Anchor, ChevronDown, Menu, Phone, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { PERSONAL_LINES, BUSINESS_LINES } from "@/lib/coverage-data";

const NAV = [
  {
    label: "Personal",
    href: "/personal",
    children: PERSONAL_LINES.map((l) => ({ label: l.name, href: `/personal/${l.slug}` })),
  },
  {
    label: "Business",
    href: "/business",
    children: BUSINESS_LINES.map((l) => ({ label: l.name, href: `/business/${l.slug}` })),
  },
  { label: "Claims", href: "/claims", children: [] },
  { label: "About", href: "/about", children: [] },
  { label: "Contact", href: "/contact", children: [] },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const pathname = usePathname();

  // Close the mobile menu on Escape and on route change.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Top utility bar */}
      <div className="hidden bg-navy-950 text-navy-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <p>Independent agency · We shop {BRAND.carriers.length}+ carriers so you don&apos;t have to</p>
          <a href={BRAND.phoneHref} className="flex items-center gap-1.5 font-medium hover:text-white">
            <Phone className="h-3 w-3" aria-hidden="true" />
            {BRAND.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${BRAND.name} — home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-teal-700 text-white shadow-sm">
            <Anchor className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-navy-950">{BRAND.shortName}</span>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-teal-700">
              Insurance Group
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV.map((item) =>
            item.children.length > 0 ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-navy-50 hover:text-navy-950 ${
                    pathname.startsWith(item.href) ? "text-teal-700" : "text-navy-700"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-64 rounded-xl border border-navy-100 bg-white p-2 shadow-xl shadow-navy-950/10">
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-navy-950 hover:bg-teal-50 hover:text-teal-800"
                    >
                      All {item.label} Insurance →
                    </Link>
                    <div className="my-1 border-t border-navy-100" />
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-navy-700 hover:bg-navy-50 hover:text-navy-950"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-navy-50 hover:text-navy-950 ${
                  pathname === item.href ? "text-teal-700" : "text-navy-700"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href="/quote"
            className="ml-3 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-all hover:bg-accent-400 hover:shadow-md"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/quote"
            className="rounded-full bg-accent-500 px-4 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-accent-400"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2.5 text-navy-800 hover:bg-navy-50"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-100 bg-white px-4 pb-6 pt-2 lg:hidden"
          aria-label="Mobile navigation"
        >
          {NAV.map((item) =>
            item.children.length > 0 ? (
              <div key={item.label} className="border-b border-navy-50">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-navy-900"
                  onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                  aria-expanded={openSection === item.label}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openSection === item.label ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openSection === item.label && (
                  <div className="pb-3 pl-3">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-semibold text-teal-700"
                    >
                      All {item.label} Insurance →
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2.5 text-sm text-navy-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-navy-50 py-3 text-base font-medium text-navy-900"
              >
                {item.label}
              </Link>
            )
          )}
          <a href={BRAND.phoneHref} className="mt-3 flex items-center gap-2 py-2.5 text-sm font-semibold text-teal-700">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {BRAND.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
