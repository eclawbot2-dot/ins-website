import { isIP } from "node:net";

export function leadVisitorAddress(request: Request, endpoint: string, key: string): string | null {
  if (process.env.VERCEL === "1") {
    // https://vercel.com/docs/headers/request-headers: platform-owned address,
    // never browser-provided X-Lead-Visitor-IP, X-Forwarded-For or X-Real-IP.
    const address = request.headers.get("x-vercel-forwarded-for");
    return address && address.length <= 45 && !/[%,\s]/.test(address) && isIP(address) ? address : null;
  }
  // The synthetic runner has no trusted edge. This opt-in cannot forward to a
  // remote platform or use a production key, even if set on the wrong server.
  if (process.env.LEAD_PROXY_TEST_MODE === "loopback" && key === "check-lead-proxy-test-key") {
    try {
      const upstream = new URL(endpoint);
      const local = new URL(request.url);
      if (upstream.protocol === "http:" && upstream.hostname === "127.0.0.1" &&
        ["127.0.0.1", "localhost", "[::1]"].includes(local.hostname)) return "192.0.2.1";
    } catch { return null; }
  }
  return null;
}
