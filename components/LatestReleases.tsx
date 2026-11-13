import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale, getTranslations, localizePath } from "@/lib/i18n";
import { formatBlogDate, getBlogPosts } from "@/lib/blog";

export function LatestReleases({ locale = "en" }: { locale?: Locale }) {
  const { t } = getTranslations(locale);
  const posts = getBlogPosts(locale).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="releases" className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {t("releases.eyebrow")}
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("releases.title")}
          </h2>
          <p className="mt-2 text-base text-muted">{t("releases.subtitle")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/changelog"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-background-subtle"
          >
            <span>{t("releases.changelog")}</span>
          </Link>
          <Link
            href={localizePath("/blog", locale)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-background-subtle px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-border/50"
          >
            <span>{t("releases.viewAll")}</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <div className="mt-8 divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={localizePath(`/blog/${post.slug}`, locale)}
            className="group grid items-baseline gap-2 py-5 sm:grid-cols-[7rem_1fr_auto] sm:gap-6"
          >
            <span className="text-xs text-muted">
              {formatBlogDate(post.publishedAt, locale)}
            </span>
            <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-muted">
              {post.version && `v${post.version}`}
              <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
