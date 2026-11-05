"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { locales, Locale, defaultLocale, localeNames } from "@/lib/i18n";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const segments = pathname.split("/");
  const currentLocale = locales.includes(segments[1] as any)
    ? (segments[1] as Locale)
    : defaultLocale;

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleSelect = (newLocale: Locale) => {
    setOpen(false);
    if (newLocale === currentLocale) return;
    const nextSegments = [...segments];
    const hasLocalePrefix = locales.includes(nextSegments[1] as any);

    if (newLocale === defaultLocale) {
      if (hasLocalePrefix) nextSegments.splice(1, 1);
    } else if (hasLocalePrefix) {
      nextSegments[1] = newLocale;
    } else {
      nextSegments.splice(1, 0, newLocale);
    }
    router.push(nextSegments.join("/") || "/");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group inline-flex items-center gap-1.5 rounded-lg border border-border/80 text-muted transition-all hover:bg-background-subtle hover:text-foreground active:scale-[0.98] h-9 px-2.5"
      >
        <Globe size={16} className="transition-transform duration-300 group-hover:rotate-12" />
        <span className="hidden whitespace-nowrap text-xs font-medium text-foreground sm:inline">{localeNames[currentLocale]}</span>
        <ChevronDown
          size={12}
          className={`text-muted-foreground/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 max-h-72 w-44 overflow-y-auto rounded-xl border border-border bg-background p-1 shadow-xl shadow-black/10"
        >
          {locales.map((loc) => {
            const active = loc === currentLocale;
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(loc)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? "bg-background-subtle font-medium text-foreground"
                      : "text-muted hover:bg-background-subtle hover:text-foreground"
                  }`}
                >
                  <span>{localeNames[loc]}</span>
                  {active && <Check size={14} className="text-accent" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
