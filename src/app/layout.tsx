import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyQuoteBar } from "@/components/LeadForm";
import AnalyticsBridge from "@/components/AnalyticsBridge";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";
import { JsonLd, agencyJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} | Independent Insurance Agency`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name} is an independent insurance agency. We compare coverage and pricing across ${BRAND.carriers.length}+ top-rated carriers for business, auto, home, and life insurance — so you get the right protection at the right price.`,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    url: SITE_URL,
    title: `${BRAND.name} | Independent Insurance Agency`,
    description: `Independent insurance agency comparing ${BRAND.carriers.length}+ top-rated carriers for business and personal coverage.`,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <JsonLd data={agencyJsonLd()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <StickyQuoteBar />
        <AnalyticsBridge />
      </body>
    </html>
  );
}
