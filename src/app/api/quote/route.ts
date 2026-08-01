import { NextResponse } from "next/server";
import { BRAND } from "@/lib/brand";

const LEAD_ENDPOINT = "https://ins.jahdev.com/api/public/leads";

// No hardcoded fallback. This repo is PUBLIC, so any literal default here is a
// published credential the platform would still honour. If LEAD_INTAKE_KEY is
// missing we fail closed and tell the visitor the truth rather than firing an
// unauthenticated request and reporting success. (scripts/check-site.mjs has a
// tripwire that fails the build if a literal fallback is reintroduced.)
const LEAD_KEY = process.env.LEAD_INTAKE_KEY;

// Shown to the visitor whenever the lead was NOT delivered. It must never
// imply the request went through — an insurance shopper who believes an agent
// is calling back, when no lead exists, is the worst possible outcome here.
// The forms render this as a bare paragraph, so it has to carry the fallback
// channels itself rather than telling the reader to go hunting for them. Both
// come from BRAND so they can never drift from the header/footer/JSON-LD.
const UNDELIVERED =
  "We couldn't submit your request just now — nothing was sent, so please don't wait on a callback. " +
  `Try again in a moment, or reach us directly at ${BRAND.phone} or ${BRAND.email} and we'll take your details that way.`;

type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  lineOfBusiness: string;
  message: string;
  source: string;
  campaign: string;
};

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field. Bots that
  // fill every input get a silent success and the lead is never forwarded.
  // This is the ONE remaining path that drops a submission while showing
  // success, and it has to stay that way or the honeypot stops working — so
  // log it instead. A password manager or aggressive autofill can reach these
  // hidden inputs, and without this line that visitor's enquiry would vanish
  // with no trace at all.
  if (str(body.website, 200)) {
    console.warn("[lead-proxy] honeypot tripped — submission dropped", {
      source: str(body.source, 50) || "website",
      campaign: str(body.campaign, 80),
    });
    return NextResponse.json({ ok: true });
  }

  const payload: LeadPayload = {
    firstName: str(body.firstName, 100),
    lastName: str(body.lastName, 100),
    email: str(body.email, 200),
    phone: str(body.phone, 50),
    zip: str(body.zip, 20),
    lineOfBusiness: str(body.lineOfBusiness, 100),
    message: str(body.message),
    source: str(body.source, 50) || "website",
    campaign: str(body.campaign, 80),
  };

  if (!payload.firstName || !payload.lastName || (!payload.email && !payload.phone)) {
    return NextResponse.json(
      { ok: false, error: "Name and at least one contact method are required" },
      { status: 400 }
    );
  }

  // Fail closed on a missing key rather than sending an unauthenticated
  // request the platform will reject anyway.
  if (!LEAD_KEY) {
    console.error("[lead-proxy] LEAD_INTAKE_KEY is not set — refusing to forward lead");
    return NextResponse.json({ ok: false, error: UNDELIVERED }, { status: 502 });
  }

  // Forward to the agency platform. A lead that does not reach the platform
  // does not exist: nobody reads this function's logs, so reporting success on
  // a failed forward silently destroys a real customer enquiry. Report the
  // failure instead — every form keeps the visitor's input on screen and shows
  // this message, so they can retry or reach us another way.
  //
  // Accepted tradeoff: if the platform commits the lead AFTER our 10s abort,
  // the visitor sees the failure and may resubmit, producing a duplicate. A
  // duplicate lead is strictly better than a lost one; add an idempotency key
  // on the ins-platform side if duplicates ever become noise.
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lead-Key": LEAD_KEY,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`[lead-proxy] Upstream rejected lead: ${res.status} ${await res.text().catch(() => "")}`);
      return NextResponse.json({ ok: false, error: UNDELIVERED }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead-proxy] Failed to forward lead (platform may be offline):", err);
    return NextResponse.json({ ok: false, error: UNDELIVERED }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
