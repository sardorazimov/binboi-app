"use client";

/**
 * Limits smooth scrolling to marketing routes without hijacking native wheel behavior.
 */
import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MARKETING_ROUTES = ["/", "/pricing", "/changelog", "/support", "/blog", "/terms"];

function isMarketingRoute(pathname: string) {
  return MARKETING_ROUTES.some((route) =>
    route === "/" ? pathname === "/" : pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * Keeps native scrolling intact and only enables CSS smooth scrolling for
 * marketing-route anchor jumps and deliberate in-page navigation.
 */
export function SiteScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEnabled = isMarketingRoute(pathname);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isEnabled || prefersReducedMotion) {
      delete root.dataset.siteScroll;
      return;
    }

    root.dataset.siteScroll = "on";

    return () => {
      delete root.dataset.siteScroll;
    };
  }, [isEnabled]);

  return <>{children}</>;
}
