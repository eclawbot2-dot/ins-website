import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} | Independent Insurance Agency`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name} is an independent insurance agency. We compare coverage and pricing across ${BRAND.carriers.length}+ top-rated carriers for auto, home, life, health, and business insurance — so you get the right protection at the right price.`,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    url: BRAND.url,
    title: `${BRAND.name} | Independent Insurance Agency`,
    description: `Independent insurance agency comparing ${BRAND.carriers.length}+ top-rated carriers for personal and business coverage.`,
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
