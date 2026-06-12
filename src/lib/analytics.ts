/**
 * Lightweight, dependency-free analytics shim.
 *
 * We never hard-depend on Google Analytics, GTM, or any vendor. Instead we
 * push well-named events to `window.dataLayer` if a tag manager is present.
 * When no analytics is installed these calls are silent no-ops, so the site
 * works identically with or without a marketing tag deployed on the host.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/** Push a named event to the dataLayer if one exists. Safe on the server. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* analytics must never break the page */
  }
}

/** A lead form was submitted successfully. */
export function trackLead(params: {
  source: string;
  lineOfBusiness?: string;
  campaign?: string;
}): void {
  track("generate_lead", {
    form_source: params.source,
    line_of_business: params.lineOfBusiness || undefined,
    campaign: params.campaign || undefined,
  });
}

/** A primary call-to-action (button/link) was clicked. */
export function trackCta(label: string, location: string): void {
  track("cta_click", { cta_label: label, cta_location: location });
}
