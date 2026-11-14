"use client";

import { useId, useRef, useState } from "react";
import { Columns3, Inbox, CalendarDays, AppWindow } from "lucide-react";
import { Screenshot } from "./Screenshot";

export type HeroTab = {
  id: string;
  label: string;
  src: string;
  darkSrc?: string;
  alt: string;
  icon: "kanban" | "inbox" | "calendar" | "windows";
};

const ICONS = {
  kanban: Columns3,
  inbox: Inbox,
  calendar: CalendarDays,
  windows: AppWindow,
};

export function HeroShowcase({ tabs }: { tabs: HeroTab[] }) {
  const instanceId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "kanban");
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!activeTab) return null;

  return (
    <div className="relative mx-auto mt-12 max-w-5xl md:mt-16">
      {/* Interactive view switcher */}
      <div
        role="tablist"
        aria-label="Meron workspace previews"
        className="mb-5 inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-card/80 p-1.5 shadow-sm backdrop-blur-md sm:rounded-full"
      >
        {tabs.map((tab, index) => {
          const Icon = ICONS[tab.icon];
          const isActive = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${instanceId}-tab-${tab.id}`}
              aria-controls={`${instanceId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              ref={(element) => { tabRefs.current[index] = element; }}
              onKeyDown={(event) => {
                let nextIndex: number;
                switch (event.key) {
                  case "ArrowRight": nextIndex = (index + 1) % tabs.length; break;
                  case "ArrowLeft": nextIndex = (index - 1 + tabs.length) % tabs.length; break;
                  case "Home": nextIndex = 0; break;
                  case "End": nextIndex = tabs.length - 1; break;
                  default: return;
                }
                event.preventDefault();
                setActiveId(tabs[nextIndex].id);
                tabRefs.current[nextIndex]?.focus();
              }}
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-[13px] ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-sm shadow-accent/20"
                  : "text-muted hover:bg-background-subtle hover:text-foreground"
              }`}
            >
              <Icon size={14} className="shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ambient glow behind preview */}
      <div className="pointer-events-none absolute inset-x-8 top-16 bottom-0 -z-10 rounded-3xl bg-gradient-to-tr from-accent/15 via-accent/5 to-accent/15 opacity-70 blur-3xl dark:opacity-50" />

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${instanceId}-panel-${tab.id}`}
          aria-labelledby={`${instanceId}-tab-${tab.id}`}
          hidden={tab.id !== activeTab.id}
          tabIndex={0}
          className="rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Screenshot
            src={tab.src}
            darkSrc={tab.darkSrc}
            alt={tab.alt}
            width={1280}
            height={820}
            priority={tab.id === tabs[0]?.id}
          />
        </div>
      ))}
    </div>
  );
}
