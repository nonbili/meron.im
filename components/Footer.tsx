import Image from "next/image";
import { Github, Mail, Rss } from "lucide-react";
import { GITHUB_URL, CONTACT_EMAIL } from "@/lib/site";
import { Locale, getTranslations, localizePath } from "@/lib/i18n";
import { getBlogIndexStrings } from "@/lib/blog";

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);
  const blogTitle = getBlogIndexStrings(locale).title;
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-sm text-muted md:flex-row">
        <div className="group flex items-center gap-2.5">
          <Image
            src="/meron.png"
            alt="Meron"
            width={20}
            height={20}
            className="rounded transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-semibold text-foreground">Meron</span>
          <span>{t("footer.copyright")}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
          <a
            href={localizePath("/blog", locale)}
            className="transition-colors hover:text-foreground hover:underline hover:underline-offset-4 decoration-accent/30"
          >
            {blogTitle}
          </a>
          <a
            href="/changelog"
            className="transition-colors hover:text-foreground hover:underline hover:underline-offset-4 decoration-accent/30"
          >
            Changelog
          </a>
          <a
            href={localizePath("/privacy", locale)}
            className="transition-colors hover:text-foreground hover:underline hover:underline-offset-4 decoration-accent/30"
          >
            {t("footer.privacy")}
          </a>
          <a
            href={localizePath("/terms", locale)}
            className="transition-colors hover:text-foreground hover:underline hover:underline-offset-4 decoration-accent/30"
          >
            {t("footer.terms")}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <Github size={18} />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={`Email ${CONTACT_EMAIL}`}
            className="transition-colors hover:text-foreground"
          >
            <Mail size={18} />
          </a>
          <a
            href={localizePath("/feed.xml", locale)}
            aria-label="RSS Feed"
            className="transition-colors hover:text-foreground"
          >
            <Rss size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

