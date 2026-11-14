import { ArrowRight, Download, Github, Sparkles } from "lucide-react";
import { GITHUB_URL } from "@/lib/site";
import { Locale, getTranslations, localizePath } from "@/lib/i18n";
import { HeroShowcase, type HeroTab } from "./HeroShowcase";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);

  const tabs: HeroTab[] = [
    {
      id: "kanban",
      label: t("hero.tabs.kanban"),
      src: "/screenshots/kanban-board.png",
      darkSrc: "/screenshots/kanban-board-dark.png",
      alt: t("features.kanban.alt"),
      icon: "kanban",
    },
    {
      id: "inbox",
      label: t("hero.tabs.inbox"),
      src: "/screenshots/unified-inbox.png",
      darkSrc: "/screenshots/unified-inbox-dark.png",
      alt: t("features.inbox.alt"),
      icon: "inbox",
    },
    {
      id: "calendar",
      label: t("hero.tabs.calendar"),
      src: "/screenshots/calendar.png",
      darkSrc: "/screenshots/calendar-dark.png",
      alt: t("features.calendar.alt"),
      icon: "calendar",
    },
    {
      id: "windows",
      label: t("hero.tabs.windows"),
      src: "/screenshots/chat-view.png",
      darkSrc: "/screenshots/chat-view-dark.png",
      alt: t("features.inbox.alt"),
      icon: "windows",
    },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid -z-20" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] opacity-80 dark:opacity-100"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, var(--hero-glow) 0%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={localizePath("/blog/meron-0-5-2", locale)}
            className="group inline-flex max-w-full items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-accent/50 hover:bg-accent/12"
          >
            <Sparkles size={13} className="shrink-0 text-accent" />
            <span className="truncate">{t("hero.releaseBadge")}</span>
            <ArrowRight
              size={13}
              className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
            />
          </a>
        </div>

        <h1 className="mx-auto mt-7 max-w-3xl text-balance text-5xl font-extrabold leading-[1.08] tracking-[-0.03em] md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-foreground to-muted bg-clip-text text-transparent">
          {t("hero.titleFirst")}{" "}
          <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            {t("hero.titleSpark")}
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-[19px]">
          {t("hero.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={localizePath("/#download", locale)}
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-accent/25 active:scale-[0.98]"
          >
            <Download size={17} className="transition-transform group-hover:-translate-y-0.5" />
            <span>{t("hero.download")}</span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-foreground/25 hover:bg-background-subtle active:scale-[0.98]"
          >
            <Github size={17} />
            <span>{t("hero.star")}</span>
          </a>
        </div>

        <p className="mt-4 text-xs font-medium text-muted">
          {t("hero.badge")}
        </p>

        <HeroShowcase tabs={tabs} />
      </div>
    </section>
  );
}
