import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Locale, getTranslations, localizePath } from "@/lib/i18n";
import { getBlogIndexStrings } from "@/lib/blog";

export function Nav({
  locale = "en",
  showLanguageSwitcher = true,
}: {
  locale?: Locale;
  showLanguageSwitcher?: boolean;
}) {
  const { t } = getTranslations(locale);
  const blogTitle = getBlogIndexStrings(locale).title;
  return (
    <header className="sticky top-0 z-50 border-b border-glass-border bg-glass-bg backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <a href={localizePath("/", locale)} className="group flex items-center gap-2.5">
          <Image
            src="/meron.png"
            alt="Meron"
            width={48}
            height={48}
            className="rounded-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-110"
          />
          <span className="text-lg font-semibold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
            Meron
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          <a
            href={localizePath("/#features", locale)}
            className="relative py-1 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
          >
            {t("nav.features")}
          </a>
          <a
            href={localizePath("/#themes", locale)}
            className="relative py-1 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
          >
            {t("nav.themes")}
          </a>
          <a
            href={localizePath("/#open-source", locale)}
            className="relative py-1 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
          >
            {t("nav.openSource")}
          </a>
          <a
            href={localizePath("/blog", locale)}
            className="relative py-1 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
          >
            {blogTitle}
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {showLanguageSwitcher && <LanguageSwitcher />}
          <ThemeToggle />
          <a
            href={localizePath("/#download", locale)}
            className="whitespace-nowrap rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/15 transition-all duration-200 hover:brightness-105 active:scale-[0.98] sm:px-4"
          >
            {t("nav.download")}
          </a>
        </div>
      </nav>
    </header>
  );
}

