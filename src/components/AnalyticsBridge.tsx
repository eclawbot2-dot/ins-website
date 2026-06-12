"use client";

import { useEffect } from "react";
import { trackCta } from "@/lib/analytics";

/**
 * Mount-once client bridge that fires a `cta_click` dataLayer event whenever a
 * link or button carrying a `data-cta` attribute is clicked, anywhere on the
 * page. This lets server components tag conversion CTAs declaratively
 * (`data-cta="Get My Quote"` + optional `data-cta-location`) without becoming
 * client components themselves. No-op when no dataLayer is present.
 */
export default function AnalyticsBridge() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      trackCta(el.dataset.cta || "cta", el.dataset.ctaLocation || "page");
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
