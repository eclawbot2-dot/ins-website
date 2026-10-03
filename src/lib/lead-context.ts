import { createHmac, timingSafeEqual } from "node:crypto";
import { ARTICLES } from "@/lib/blog-data";
import { ALL_LINES } from "@/lib/coverage-data";

type Surface = { source: string; campaign: string; lines: string[] };

// Public visitors can obtain any supported context. These are constrained form
// semantics, not proof of the visitor's identity or referring page.
function surfaceContext(surface: string): Surface | null {
  if (surface === "quote") return { source: "website", campaign: "main-quote-form", lines: ["", ...ALL_LINES.map((line) => line.name)] };
  if (surface === "contact") return { source: "contact", campaign: "contact-page", lines: [""] };
  if (surface === "newsletter") return { source: "newsletter", campaign: "newsletter", lines: [""] };
  if (surface === "switch-and-save") return { source: "switch-and-save", campaign: "switch-and-save", lines: [""] };
  if (surface.startsWith("article:")) {
    const article = ARTICLES.find((entry) => entry.slug === surface.slice(8));
    if (article) return { source: "resources-article", campaign: article.slug, lines: [article.quoteLine ?? ""] };
  }
  return null;
}

export function validSubmissionId(value: string | null): value is string {
  return value !== null && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function signature(value: string, key: string): Buffer {
  return createHmac("sha256", key).update(`website-lead-context-v1:${value}`).digest();
}

export function issueLeadContext(surface: string, submissionId: string, key: string): string | null {
  if (!surfaceContext(surface) || !validSubmissionId(submissionId)) return null;
  const encoded = Buffer.from(JSON.stringify({ surface, submissionId, expires: Date.now() + 60 * 60 * 1000 })).toString("base64url");
  return `${encoded}.${signature(encoded, key).toString("base64url")}`;
}

export function verifyLeadContext(token: string, submissionId: string, key: string): Surface | null {
  if (token.length > 2048) return null;
  const [encoded, supplied, extra] = token.split(".");
  if (!encoded || !supplied || extra !== undefined || !/^[A-Za-z0-9_-]+$/.test(supplied)) return null;
  const actual = Buffer.from(supplied, "base64url");
  const expected = signature(encoded, key);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const data: unknown = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!data || typeof data !== "object" || !("submissionId" in data) || data.submissionId !== submissionId ||
      !("surface" in data) || typeof data.surface !== "string" || !("expires" in data) ||
      typeof data.expires !== "number" || data.expires < Date.now()) return null;
    return surfaceContext(data.surface);
  } catch { return null; }
}
