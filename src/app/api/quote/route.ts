import { NextResponse } from "next/server";

const LEAD_ENDPOINT = "https://ins.jahdev.com/api/public/leads";
const LEAD_KEY = process.env.LEAD_INTAKE_KEY ?? "ins-lead-intake-2026";

type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  lineOfBusiness: string;
  message: string;
  source: string;
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
  if (str(body.website, 200)) {
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
  };

  if (!payload.firstName || !payload.lastName || (!payload.email && !payload.phone)) {
    return NextResponse.json(
      { ok: false, error: "Name and at least one contact method are required" },
      { status: 400 }
    );
  }

  // Forward to the agency platform. If the platform is unreachable we still
  // return success to the visitor (per UX requirement) and log server-side.
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
    }
  } catch (err) {
    console.error("[lead-proxy] Failed to forward lead (platform may be offline):", err);
  }

  return NextResponse.json({ ok: true });
}
