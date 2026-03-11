"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { GA_MEASUREMENT_ID, pageview } from "@/app/lib/gtag";

export function GoogleAnalyticsPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !pathname) {
      return;
    }

    const query = window.location.search;
    const url = query ? `${pathname}?${query}` : pathname;

    pageview(url);
  }, [pathname]);

  return null;
}
