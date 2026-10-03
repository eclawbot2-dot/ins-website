import { NextResponse } from "next/server";
import { platformBaseUrl } from "@/lib/brand";
import { validSubmissionId, verifyLeadContext } from "@/lib/lead-context";
import { leadVisitorAddress } from "@/lib/lead-visitor";

const LEAD_ENDPOINT = `${platformBaseUrl(process.env.INS_PLATFORM_URL)}/api/public/leads`;
const LEAD_KEY = process.env.LEAD_INTAKE_KEY;
const UNCONFIRMED = "We couldn't confirm whether your request was received. Your details are still here. Please retry without changing them to check the same request.";
const MAX_BODY_BYTES = 1_300_000;
const LIMITS = { firstName: 100, lastName: 100, email: 2000, phone: 2000, zip: 2000,
  lineOfBusiness: 100, message: 200_000, website: 2000, context: 2048 } as const;

function failure(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

async function readBody(request: Request): Promise<string> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks));
}

export async function POST(request: Request) {
  let parsed: unknown;
  try { parsed = JSON.parse(await readBody(request)); }
  catch (error) {
    return failure(error instanceof RangeError ? "This request is too large. Shorten it and try again; your details have not been sent by this attempt." : "Invalid JSON object", error instanceof RangeError ? 413 : 400);
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return failure("A JSON object is required", 400);
  const body = parsed as Record<string, unknown>;
  if (typeof body.website === "string" && body.website.length <= LIMITS.website && body.website.trim()) {
    console.warn("[lead-proxy] honeypot tripped — submission dropped");
    return NextResponse.json({ ok: true, accepted: true, suppressed: true });
  }
  for (const [field, value] of Object.entries(body)) {
    if (!Object.hasOwn(LIMITS, field)) return failure("This form contains an unsupported field. Please reload the page.", 400);
    if (typeof value !== "string") return failure(`${field} must be text`, 400);
    if (value.length > LIMITS[field as keyof typeof LIMITS]) return failure(`${field} is too long. The limit is ${LIMITS[field as keyof typeof LIMITS]} characters; your details have not been sent by this attempt.`, 422);
  }
  const text = (field: keyof typeof LIMITS) => typeof body[field] === "string" ? body[field] as string : "";
  if (!text("firstName").trim() || !text("lastName").trim() || (!text("email").trim() && !text("phone").trim())) {
    return failure("Name and at least one contact method are required", 400);
  }
  if (!LEAD_KEY) {
    console.error("[lead-proxy] LEAD_INTAKE_KEY is not set — refusing to forward lead");
    return failure("The request service is temporarily unavailable. Your details are still here; please try again.", 502);
  }
  const submissionId = request.headers.get("idempotency-key");
  if (!validSubmissionId(submissionId)) return failure("A valid submission identity is required. Please reload the page.", 400);
  const context = verifyLeadContext(text("context"), submissionId, LEAD_KEY);
  if (!context) return failure("Your form context expired or is invalid. Please retry to refresh it.", 422);
  const lineOfBusiness = text("lineOfBusiness");
  if (!context.lines.includes(lineOfBusiness)) return failure("Please select a supported coverage for this form.", 422);
  const visitor = leadVisitorAddress(request, LEAD_ENDPOINT, LEAD_KEY);
  if (!visitor) return failure("The request service is temporarily unavailable. Your details are still here; please try again.", 503);
  // Forward original accepted strings. Upstream contact normalization is its
  // own contract; no proxy trimming or truncation hides a visitor's input.
  const payload = {
    firstName: text("firstName"), lastName: text("lastName"), email: text("email"), phone: text("phone"),
    zip: text("zip"), lineOfBusiness, message: text("message"), source: context.source, campaign: context.campaign,
  };
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lead-Key": LEAD_KEY,
        "Idempotency-Key": submissionId, "X-Lead-Visitor-IP": visitor },
      body: JSON.stringify(payload),
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
    });
    if (res.type === "opaqueredirect" || (res.status >= 300 && res.status < 400)) {
      console.error("[lead-proxy] Upstream redirected the lead POST", { status: res.status });
      await res.body?.cancel().catch(() => {});
      return failure(UNCONFIRMED, 502);
    }
    if (!res.ok) {
      await res.body?.cancel().catch(() => {});
      if (res.status === 409) return failure("This request identity conflicts with a previous submission. Your details are still here; contact the agency before starting another request.", 409);
      if (res.status === 429) return failure("Too many attempts right now. Wait a while, then retry with the same details. An earlier attempt may already have been received.", 429);
      if (res.status === 422) return failure("The request could not be accepted as entered. Check your details before retrying. An earlier attempt may already have been received.", 422);
      console.error("[lead-proxy] Upstream could not confirm lead", { status: res.status });
      return failure(UNCONFIRMED, 502);
    }
    const result = await res.json().catch(() => null);
    if ((res.status !== 201 && res.status !== 200) || result?.ok !== true ||
      typeof result.id !== "string" || !result.id || typeof result.score !== "number" ||
      (res.status === 200 && result.idempotent !== true)) return failure(UNCONFIRMED, 502);
  } catch {
    console.error("[lead-proxy] Delivery unconfirmed after transport failure");
    return failure(UNCONFIRMED, 502);
  }
  return NextResponse.json({ ok: true, accepted: true });
}
