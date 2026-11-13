import Image from "next/image";
import { Menu } from "lucide-react";
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

  const links = [
    { href: localizePath("/#features", locale), label: t("nav.features") },
    { href: localizePath("/#security", locale), label: t("nav.security") },
    { href: localizePath("/#themes", locale), label: t("nav.themes") },
    { href: localizePath("/blog", locale), label: blogTitle },
    { href: "/changelog", label: t("nav.changelog") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-glass-border bg-glass-bg backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6"
      >
        <a href={localizePath("/", locale)} className="group flex shrink-0 items-center gap-2">
          <Image
            src="/meron.png"
            alt="Meron"
            width={34}
            height={34}
            className="rounded-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105"
          />
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            Meron
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {showLanguageSwitcher && <LanguageSwitcher />}
          <ThemeToggle />
          <a
            href={localizePath("/#download", locale)}
            className="whitespace-nowrap rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/15 transition-all duration-200 hover:brightness-110 active:scale-[0.98] sm:px-4"
          >
            {t("nav.download")}
          </a>
          <details className="relative lg:hidden">
            <summary
              aria-label="Open navigation menu"
              className="inline-flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-lg border border-border/80 text-muted transition-colors hover:bg-background-subtle hover:text-foreground [&::-webkit-details-marker]:hidden"
            >
              <Menu size={18} />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-background p-1.5 shadow-xl shadow-black/10">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background-subtle hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
