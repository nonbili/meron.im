import { Screenshot } from "./Screenshot";
import { Github, Download } from "lucide-react";
import { GITHUB_URL } from "@/lib/site";
import { Locale, getTranslations, localizePath } from "@/lib/i18n";

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);
  return (
    <section id="top" className="relative overflow-hidden pt-20 pb-16 md:pt-28">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid -z-20" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-70 dark:opacity-100"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 0%, var(--hero-glow) 0%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 text-center">
        <a
          href={localizePath("/#open-source", locale)}
          className="inline-flex items-center text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          <span>{t("hero.badge")}</span>
        </a>

        <h1 className="mx-auto mt-6 max-w-3xl text-balance text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground via-foreground to-muted bg-clip-text text-transparent">
          {t("hero.titleFirst")}{" "}
          <span className="bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
            {t("hero.titleSpark")}
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-muted">
          {t("hero.subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={localizePath("/#download", locale)}
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg shadow-accent/15 hover:shadow-xl hover:shadow-accent/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
            <Download size={18} className="transition-transform group-hover:-translate-y-0.5" />{" "}
            {t("hero.download")}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-background-subtle hover:border-foreground/20 active:scale-[0.99] transition-all duration-200"
          >
            <Github size={18} /> {t("hero.star")}
          </a>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Subtle glow behind the screenshot */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-accent/10 to-accent/5 opacity-70 blur-2xl dark:opacity-40" />
          <div className="hero-screenshot-tilt transition-transform duration-300">
            <Screenshot
              src="/screenshots/kanban-board.png"
              alt={t("hero.screenshotAlt")}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}


