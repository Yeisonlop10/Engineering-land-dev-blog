export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GtagCommand = "config" | "event" | "js" | "set";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: [GtagCommand, ...unknown[]]) => void;
  }
}

export function pageview(url: string) {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !GA_MEASUREMENT_ID ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export type LinkEventParams = {
  resource_id?: string;
  vendor?: string;
  placement?: string;
  article_slug?: string;
  link_url: string;
};

function isGtagReady() {
  return (
    typeof window !== "undefined" &&
    GA_MEASUREMENT_ID &&
    typeof window.gtag === "function"
  );
}

export function trackAffiliateClick(params: LinkEventParams) {
  if (!isGtagReady()) return;
  window.gtag!("event", "affiliate_click", params);
}

export function trackResourceClick(params: LinkEventParams) {
  if (!isGtagReady()) return;
  window.gtag!("event", "resource_click", params);
}
