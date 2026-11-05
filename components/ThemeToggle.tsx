"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 text-muted transition-all hover:bg-background-subtle hover:text-foreground active:scale-95"
    >
      {mounted ? (
        isDark ? (
          <Sun size={18} className="transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon size={18} className="transition-transform duration-300 group-hover:-rotate-12" />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

