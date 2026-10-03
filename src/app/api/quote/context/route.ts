import { NextResponse } from "next/server";
import { issueLeadContext } from "@/lib/lead-context";

// Runtime signing keeps credentials out of static pages and browser bundles.
// Tokens bind an allowed surface to one submission, not an authenticated person.
export async function GET(request: Request) {
  const key = process.env.LEAD_INTAKE_KEY;
  if (!key) return NextResponse.json({ error: "The request service is temporarily unavailable. Please try again." }, { status: 503 });
  const query = new URL(request.url).searchParams;
  const token = issueLeadContext(query.get("surface") ?? "", query.get("submissionId") ?? "", key);
  if (!token) return NextResponse.json({ error: "This form is not supported. Please reload the page." }, { status: 400 });
  return NextResponse.json({ context: token }, { headers: { "Cache-Control": "no-store" } });
}
