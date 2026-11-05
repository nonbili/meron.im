"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, Inbox, KanbanSquare, Images } from "lucide-react";
import { SIMULATOR_THEMES } from "@/lib/simulatorThemes";
import { Locale, getTranslations } from "@/lib/i18n";

/** Accent at a low alpha, for soft tinted backgrounds (active item, avatars). */
const tint = (color: string, percent: number) =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;

export function ThemeSimulator({ locale = "en" }: { locale?: Locale }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { t } = getTranslations(locale);

  useEffect(() => setMounted(true), []);

  const appearance = resolvedTheme === "dark" ? "dark" : "light";

  // Mirror the app: show the light themes in light mode, dark themes in dark
  // mode. Each theme renders in its own appearance, so the panel always matches.
  const visible = useMemo(
    () => SIMULATOR_THEMES.filter((x) => x.appearance === appearance),
    [appearance],
  );

  // `activeId` is remembered across appearance switches; when it isn't part of
  // the current set (e.g. after toggling light↔dark) we fall back to the first.
  const tTheme = visible.find((x) => x.id === activeId) ?? visible[0];

  // Selecting a theme also recolors the surrounding page accent so the whole
  // section previews the palette. Keep the body's theme-* class in sync.
  useEffect(() => {
    if (!mounted) return;
    const body = document.body;
    body.className = body.className.replace(/\btheme-[\w-]+/g, "").trim();
    body.classList.add(`theme-${tTheme.id}`);
  }, [mounted, tTheme.id]);

  // Account rail is dark in every theme, so its labels are always light.
  const sideNavText = "rgba(255,255,255,0.66)";

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="mb-8 h-9" />
        <div className="h-[428px] rounded-xl border border-border bg-background-subtle" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Theme selector tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {visible.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => setActiveId(theme.id)}
            className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              tTheme.id === theme.id
                ? "border-accent bg-accent/5 text-foreground shadow-sm shadow-accent/5"
                : "border-border bg-background text-muted hover:bg-background-subtle hover:text-foreground"
            }`}
          >
            <span
              className="h-3 w-3 rounded-full shadow-inner ring-1 ring-black/10"
              style={{ background: theme.accent }}
            />
            {theme.name}
          </button>
        ))}
      </div>

      {/* Simulated app window */}
      <div className="overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/10 dark:shadow-black/40">
        {/* Titlebar */}
        <div
          className="flex items-center justify-between border-b px-4 py-2.5 transition-colors duration-500"
          style={{ background: tTheme.bgChats, borderColor: tTheme.border }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-semibold" style={{ color: tTheme.textSecondary }}>
            sarah@meron.im — Meron
          </span>
          <div className="w-12" />
        </div>

        {/* Client interface */}
        <div
          className="flex h-[380px] text-xs transition-colors duration-500"
          style={{ color: tTheme.textPrimary }}
        >
          {/* Sidebar / account rail */}
          <div
            className="flex w-36 flex-col gap-1.5 border-r p-3 transition-colors duration-500"
            style={{ background: tTheme.bgSideNav, borderColor: tTheme.border }}
          >
            <div
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-semibold transition-colors"
              style={{ background: tint(tTheme.accent, 18), color: tTheme.accent }}
            >
              <Inbox size={15} />
              <span>{t("simulator.inbox")}</span>
              <span className="ml-auto text-[10px] font-bold">2</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-medium"
              style={{ color: sideNavText }}
            >
              <KanbanSquare size={15} />
              <span>{t("simulator.board")}</span>
            </div>
            <div
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 font-medium"
              style={{ color: sideNavText }}
            >
              <Images size={15} />
              <span>{t("simulator.gallery")}</span>
            </div>
          </div>

          {/* Thread list */}
          <div
            className="flex w-48 flex-col gap-2 border-r p-3 transition-colors duration-500"
            style={{ background: tTheme.bgChats, borderColor: tTheme.border }}
          >
            <div
              className="cursor-pointer rounded-lg border p-2.5 shadow-sm transition-colors"
              style={{ background: tint(tTheme.accent, 10), borderColor: tint(tTheme.accent, 30) }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-bold">Sarah Jenkins</span>
                <span className="text-[9px]" style={{ color: tTheme.textSecondary }}>
                  {t("simulator.time")}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[11px] font-semibold">Re: Design Feedback</div>
              <div className="mt-1 truncate text-[10px]" style={{ color: tTheme.textSecondary }}>
                Hey! I checked the new prototype...
              </div>
            </div>
            <div className="cursor-pointer rounded-lg border border-transparent p-2.5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold" style={{ color: tTheme.textSecondary }}>
                  Alex Rivera
                </span>
                <span className="text-[9px]" style={{ color: tTheme.textSecondary }}>
                  {t("simulator.yesterday")}
                </span>
              </div>
              <div
                className="mt-0.5 truncate text-[11px] font-medium"
                style={{ color: tTheme.textSecondary }}
              >
                Project roadmap
              </div>
              <div className="mt-1 truncate text-[10px]" style={{ color: tTheme.textSecondary }}>
                Let&apos;s schedule the kickoff...
              </div>
            </div>
          </div>

          {/* Chat view */}
          <div
            className="flex flex-1 flex-col p-4 transition-colors duration-500"
            style={{ background: tTheme.bgChat }}
          >
            <div className="mb-4 flex flex-1 flex-col justify-end gap-3">
              {/* Incoming */}
              <div className="flex max-w-[85%] gap-2.5">
                <div
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: tint(tTheme.accent, 18), color: tTheme.accent }}
                >
                  SJ
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm border px-3 py-2 text-[11px] leading-normal shadow-sm transition-colors duration-500"
                  style={{ background: tTheme.bubbleIn, color: tTheme.bubbleInText, borderColor: tTheme.border }}
                >
                  {t("simulator.bubbleIn1")}
                </div>
              </div>
              {/* Outgoing */}
              <div className="flex max-w-[85%] flex-row-reverse gap-2.5 self-end">
                <div
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: tTheme.textPrimary, color: tTheme.bgChats }}
                >
                  ME
                </div>
                <div
                  className="rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] leading-normal shadow-sm transition-colors duration-500"
                  style={{ background: tTheme.bubbleOut, color: tTheme.bubbleOutText }}
                >
                  {t("simulator.bubbleOut")}
                </div>
              </div>
              {/* Incoming */}
              <div className="flex max-w-[85%] gap-2.5">
                <div
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: tint(tTheme.accent, 18), color: tTheme.accent }}
                >
                  SJ
                </div>
                <div
                  className="rounded-2xl rounded-tl-sm border px-3 py-2 text-[11px] leading-normal shadow-sm transition-colors duration-500"
                  style={{ background: tTheme.bubbleIn, color: tTheme.bubbleInText, borderColor: tTheme.border }}
                >
                  {t("simulator.bubbleIn2")}
                </div>
              </div>
            </div>
            {/* Composer */}
            <div
              className="flex items-center gap-2 rounded-full border px-3 py-2.5 shadow-sm transition-colors duration-500"
              style={{ background: tTheme.composerBg, borderColor: tTheme.composerBorder }}
            >
              <input
                type="text"
                placeholder={t("simulator.replyPlaceholder")}
                className="flex-1 bg-transparent text-[11px] outline-none"
                style={{ color: tTheme.textPrimary }}
                disabled
              />
              <button
                type="button"
                className="rounded-full p-1 transition-colors"
                style={{ background: tint(tTheme.accent, 18), color: tTheme.accent }}
              >
                <MessageSquare size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

