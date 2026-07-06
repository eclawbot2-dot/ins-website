import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      // Class #74 (fleet-qa): the production domain (taboragency.com) is bound
      // and live, but Vercel also serves the identical build on the project's
      // *.vercel.app alias (ins-website-sandy.vercel.app). Canonicals already
      // point every page at taboragency.com, but belt-and-braces: noindex the
      // vercel.app hosts at the header level so the duplicate can never be
      // crawled/indexed, while the real domain stays fully indexable. Same
      // build, host-conditional — no separate deploy.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    return [
      // Health insurance was discontinued — send old links to the personal hub.
      {
        source: "/personal/health",
        destination: "/personal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
