"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, type ReactNode } from "react";

function normalizePathname(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;

      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        normalizePathname(url.pathname) !==
          normalizePathname(window.location.pathname) ||
        url.search !== window.location.search ||
        url.hash.length <= 1
      ) {
        return;
      }

      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      if (window.location.hash !== url.hash) {
        window.history.pushState(null, "", url.hash);
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      const hadTabIndex = target.hasAttribute("tabindex");
      if (!hadTabIndex) {
        target.tabIndex = -1;
        target.addEventListener(
          "blur",
          () => {
            target.removeAttribute("tabindex");
          },
          { once: true }
        );
      }
      target.focus({ preventScroll: true });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
