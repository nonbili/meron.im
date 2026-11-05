import Link from "next/link";
import { ArrowRight, CalendarDays, Rss } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Locale, defaultLocale, localizePath } from "@/lib/i18n";
import { formatBlogDate, getBlogIndexStrings, getBlogPosts } from "@/lib/blog";

export function BlogIndex({ locale = defaultLocale }: { locale?: Locale }) {
  const strings = getBlogIndexStrings(locale);
  const posts = getBlogPosts(locale);

  return (
    <>
      <Nav locale={locale} showLanguageSwitcher={true} />
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-50" />

        <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
          <header className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
              {strings.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-relaxed text-muted">
              {strings.description}
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href={localizePath("/feed.xml", locale)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-foreground/20 hover:text-foreground"
                aria-label="RSS Feed"
              >
                <Rss size={13} className="text-accent" />
                <span>RSS</span>
              </a>
            </div>
          </header>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
              >
                <Link
                  href={localizePath(`/blog/${post.slug}`, locale)}
                  className="block p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="inline-flex items-center rounded-full border border-accent/15 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      v{post.version}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} aria-hidden="true" />
                      <time dateTime={post.publishedAt}>
                        {formatBlogDate(post.publishedAt, locale)}
                      </time>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-[16px] leading-relaxed text-muted">
                    {post.summary}
                  </p>

                  <ul className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">
                    {post.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {strings.readPost}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
