export type LeadInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zip: string;
  lineOfBusiness: string;
  message: string;
  website: string;
};

const UNCONFIRMED = "We couldn't confirm whether your request was received. Your details are still here. Please retry without changing them to check the same request.";

// One instance per mounted form. Keep unresolved A -> B -> A identities, but no
// contact details in persistent storage. Reloading/unmounting ends this scope.
export function createLeadSubmission() {
  const identities = new Map<string, string>();
  let pending = false;
  let completed = false;
  return {
    get pending() { return pending; },
    async submit(surface: string, input: LeadInput): Promise<{ accepted: boolean; delivered: boolean }> {
      if (pending || completed) return { accepted: false, delivered: false };
      pending = true;
      try {
        const fingerprint = JSON.stringify([surface, input.firstName, input.lastName, input.email,
          input.phone, input.zip, input.lineOfBusiness, input.message, input.website]);
        let submissionId = identities.get(fingerprint);
        if (!submissionId) {
          // Do not evict unresolved requests and turn their retries into new leads.
          if (identities.size >= 100) throw new Error("Too many changed requests in this form. Keep a copy of your details and contact the agency for help.");
          submissionId = crypto.randomUUID();
          identities.set(fingerprint, submissionId);
        }
        let contextResponse: Response;
        try {
          contextResponse = await fetch(`/api/quote/context?${new URLSearchParams({ surface, submissionId })}`, {
            cache: "no-store", signal: AbortSignal.timeout(15_000),
          });
        } catch { throw new Error(UNCONFIRMED); }
        const contextData = await contextResponse.json().catch(() => null);
        if (!contextResponse.ok || typeof contextData?.context !== "string") {
          throw new Error("We couldn't prepare your request. Your details are still here; please try again.");
        }
        let response: Response;
        try {
          response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Idempotency-Key": submissionId },
            body: JSON.stringify({ ...input, context: contextData.context }),
            signal: AbortSignal.timeout(15_000),
          });
        } catch { throw new Error(UNCONFIRMED); }
        const data = await response.json().catch(() => null);
        if (!response.ok || data?.ok !== true || data?.accepted !== true) {
          throw new Error(!response.ok && typeof data?.error === "string" ? data.error : UNCONFIRMED);
        }
        completed = true;
        identities.clear();
        return { accepted: true, delivered: data.suppressed !== true };
      } finally { pending = false; }
    },
  };
}
