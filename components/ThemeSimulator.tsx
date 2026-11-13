"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import {
  ArrowUp, CalendarDays, ChevronDown, Columns3, Inbox, Lock,
  Maximize2, MoreHorizontal, Paperclip, Search, Settings, SquarePen,
} from "lucide-react";
import { SIMULATOR_THEMES } from "@/lib/simulatorThemes";
import { Locale, getTranslations } from "@/lib/i18n";

const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

export function ThemeSimulator({ locale = "en" }: { locale?: Locale }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t } = getTranslations(locale);

  useEffect(() => setMounted(true), []);
  const appearance = resolvedTheme === "dark" ? "dark" : "light";
  const visible = useMemo(
    () => SIMULATOR_THEMES.filter((theme) => theme.appearance === appearance),
    [appearance],
  );
  const palette = visible.find((theme) => theme.id === activeId) ?? visible[0];

  useEffect(() => {
    if (!mounted) return;
    const target = document.getElementById("themes") ?? document.body;
    const stale = Array.from(target.classList).filter((cls) => cls.startsWith("theme-"));
    if (stale.length > 0) target.classList.remove(...stale);
    target.classList.add(`theme-${palette.id}`);
    return () => target.classList.remove(`theme-${palette.id}`);
  }, [mounted, palette.id]);

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="mb-8 h-9" />
        <div className="h-[460px] rounded-xl border border-border bg-background-subtle" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {visible.map((theme) => (
          <button
            key={theme.id}
            type="button"
            aria-pressed={palette.id === theme.id}
            onClick={() => setActiveId(theme.id)}
            className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              palette.id === theme.id
                ? "border-accent bg-accent/5 text-foreground"
                : "border-border bg-background text-muted hover:bg-background-subtle hover:text-foreground"
            }`}
          >
            <span aria-hidden="true" className="h-3 w-3 rounded-full ring-1 ring-black/10" style={{ background: theme.accent }} />
            {theme.name}
          </button>
        ))}
      </div>

      {/* Non-interactive illustration of the desktop layout, using app theme tokens. */}
      <div
        role="img"
        aria-label={`Meron · ${palette.name}`}
        className="overflow-hidden rounded-xl border shadow-2xl shadow-black/10 dark:shadow-black/40"
        style={{ background: palette.bgApp, borderColor: palette.border, color: palette.textPrimary }}
      >
        <div aria-hidden="true">
          <div className="flex h-9 items-center gap-4 px-3" style={{ background: palette.bgSideNav }}>
            <div className="flex shrink-0 gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex h-6 w-full max-w-72 items-center gap-2 rounded-md px-2 text-[10px]" style={{ background: palette.bgChats, color: palette.textSecondary }}>
              <Search size={11} />
              <span>{t("simulator.inbox")}</span>
            </div>
            <CalendarDays size={13} style={{ color: palette.textSecondary }} />
          </div>

          <div className="flex h-[424px] text-xs">
            <div className="hidden w-[60px] shrink-0 flex-col items-center gap-4 py-3 sm:flex" style={{ background: palette.bgSideNav }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: tint(palette.accent, 15), color: palette.accent }}>
                <SquarePen size={16} />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: tint(palette.accent, 20), color: palette.accent }}>
                <Inbox size={18} />
              </div>
              <Columns3 size={18} style={{ color: palette.textSecondary }} />
              <div className="h-px w-7" style={{ background: palette.border }} />
              {["SJ", "AR"].map((initials) => (
                <span key={initials} className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: tint(palette.accent, 15), color: palette.accent }}>{initials}</span>
              ))}
              <CalendarDays size={17} style={{ color: palette.textSecondary }} />
              <Settings size={17} className="mt-auto" style={{ color: palette.textSecondary }} />
            </div>

            <div className="hidden w-56 shrink-0 flex-col md:flex" style={{ background: palette.bgChats }}>
              <div className="flex h-11 items-center gap-2 px-4 font-semibold" style={{ background: palette.bgHeader }}>
                <span>{t("simulator.inbox")}</span><ChevronDown size={12} />
                <MoreHorizontal size={16} className="ml-auto" style={{ color: palette.textSecondary }} />
              </div>
              <div className="space-y-1 p-2">
                {[
                  { initials: "SJ", name: "Sarah Jenkins", subject: "Re: Design Feedback", time: t("simulator.time"), active: true },
                  { initials: "AR", name: "Alex Rivera", subject: "Project roadmap", time: t("simulator.yesterday"), active: false },
                ].map((thread) => (
                  <div key={thread.initials} className="flex items-center gap-2.5 rounded-lg px-2.5 py-3" style={{ background: thread.active ? tint(palette.accent, 13) : "transparent" }}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold" style={{ background: tint(palette.accent, 18), color: palette.accent }}>{thread.initials}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate text-[11px] font-semibold">{thread.name}</span>
                        <span className="shrink-0 text-[8px]" style={{ color: palette.textSecondary }}>{thread.time}</span>
                      </div>
                      <p className="mt-1 truncate text-[10px]" style={{ color: palette.textSecondary }}>{thread.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col" style={{ background: palette.bgChat }}>
              <div className="flex h-11 shrink-0 items-center gap-2 px-4" style={{ background: palette.bgHeader }}>
                <span className="truncate text-[11px] font-semibold">Re: Design Feedback</span>
                <Search size={13} className="ml-auto shrink-0" style={{ color: palette.textSecondary }} />
                <MoreHorizontal size={16} className="shrink-0" style={{ color: palette.textSecondary }} />
              </div>
              <div className="flex min-h-0 flex-1 flex-col justify-end gap-4 overflow-hidden p-4">
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold" style={{ background: tint(palette.accent, 18), color: palette.accent }}>SJ</span>
                  <div className="max-w-[90%] rounded-xl rounded-tl-sm px-3 py-2 text-[11px] leading-relaxed" style={{ background: palette.bubbleIn, color: palette.bubbleInText }}>
                    <p className="mb-1 text-[10px] font-semibold" style={{ color: palette.accent }}>Sarah Jenkins</p>
                    {t("simulator.bubbleIn1")}
                  </div>
                </div>
                <div className="max-w-[85%] self-end rounded-xl rounded-tr-sm px-3 py-2 text-[11px] leading-relaxed" style={{ background: palette.bubbleOut, color: palette.bubbleOutText }}>
                  {t("simulator.bubbleOut")}
                </div>
                <div className="ml-8 max-w-[85%] self-start rounded-xl rounded-tl-sm px-3 py-2 text-[11px] leading-relaxed" style={{ background: palette.bubbleIn, color: palette.bubbleInText }}>
                  {t("simulator.bubbleIn2")}
                </div>
              </div>
              <div className="mx-3 mb-3 rounded-2xl border p-2 shadow-sm" style={{ background: palette.composerBg, borderColor: palette.composerBorder }}>
                <p className="px-1.5 py-1 text-[11px]" style={{ color: palette.textSecondary }}>{t("simulator.replyPlaceholder")}</p>
                <div className="mt-2 flex items-center gap-3 px-1" style={{ color: palette.textSecondary }}>
                  <Paperclip size={13} /><Maximize2 size={12} /><Lock size={12} />
                  <span className="min-w-0 truncate text-[9px]">sarah@meron.im</span>
                  <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: palette.bgActive }}><ArrowUp size={13} /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
