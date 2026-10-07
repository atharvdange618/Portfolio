"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// analytics.js only records the first full page load, so report client-side route changes here.
export function TelemetryPageviews() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.telemetry?.pageview();
  }, [pathname]);

  return null;
}
