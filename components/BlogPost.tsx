import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import {
  AppWindow, ArrowLeft, ArrowRightLeft, BellRing, CalendarDays, Clock, Columns3,
  Download, FileText, FolderTree, Github, HardDrive, Image as ImageIcon, Keyboard,
  Languages, LayoutList, ListFilter, Lock, Search, ShieldCheck, Sparkles, Table, Tag, Terminal, Users,
} from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Screenshot } from "./Screenshot";
import { getBlogSource, formatBlogDate, getBlogIndexStrings } from "@/lib/blog";
import { Locale, defaultLocale, localizePath } from "@/lib/i18n";
import { GITHUB_URL, RELEASES_URL } from "@/lib/site";
import { notFound } from "next/navigation";

const icons = {
  AppWindow, ArrowRightLeft, BellRing, CalendarDays, Clock, Columns3, FileText, FolderTree,
  HardDrive, ImageIcon, Keyboard, Languages, LayoutList, ListFilter, Lock, Search, ShieldCheck, Sparkles, Table, Tag, Terminal, Users,
};

function Icon({ name, size = 14 }: { name: keyof typeof icons; size?: number }) {
  const Component = icons[name];
  if (!Component) throw new Error(`Unknown blog icon: ${name}`);
  return <Component size={size} aria-hidden="true" className="inline shrink-0" />;
}

function Badge({ icon, children }: { icon: keyof typeof icons; children: ReactNode }) {
  return <div className="flex items-center gap-2 text-sm font-medium text-muted"><Icon name={icon} />{children}</div>;
}

function BlogImage({ caption, ...props }: ComponentProps<typeof Screenshot> & { caption?: string }) {
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      <Screenshot {...props} />
      {caption && <figcaption className="border-t border-border/60 px-4 py-2.5 text-center text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

function ReleaseCTA({ heading, text, download, changelog, github, locale }: {
  heading: string; text: string; download: string; changelog: string; github: string; locale: Locale;
}) {
  return (
    <section className="rounded-2xl border border-accent/15 bg-accent/5 p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{heading}</h2>
      <p className="mt-2 text-muted">{text}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link href={localizePath("/#download", locale)} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground shadow-sm shadow-accent/15 transition-all hover:brightness-105 active:scale-[0.98]">
          <Download size={16} aria-hidden="true" />{download}
        </Link>
        <Link href="/changelog" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-background-subtle">{changelog}</Link>
        <a href={RELEASES_URL || GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-background-subtle">
          <Github size={16} aria-hidden="true" />{github}
        </a>
      </div>
    </section>
  );
}

function Card({ accent = false, children }: { accent?: boolean; children?: ReactNode }) {
  return <div className={`rounded-2xl border p-5 sm:p-6 ${accent ? "border-accent/25 bg-accent/5" : "border-border bg-card/80"}`}>{children}</div>;
}

function CardGrid({ columns = 2, children }: { columns?: number; children?: ReactNode }) {
  return <div className={`grid gap-4 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>{children}</div>;
}

function CardTitle({ children }: { children?: ReactNode }) {
  return <div className="flex items-center gap-2 text-sm font-semibold text-foreground">{children}</div>;
}

function CodeList({ children }: { children?: ReactNode }) {
  return <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs sm:text-sm">{children}</div>;
}

function KeyboardShortcuts({ title, items, or, note }: {
  title: string; items: { label: string; keys: string[] }[]; or: string; note: string;
}) {
  return (
    <Card>
      <CardTitle><Keyboard size={16} aria-hidden="true" className="text-accent" />{title}</CardTitle>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background-subtle/70 px-3.5 py-2.5 text-xs sm:text-sm">
            <span className="text-muted">{item.label}</span>
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs">
              {item.keys.map((key, index) => (
                <span key={key} className="inline-flex items-center gap-1.5">
                  {index > 0 && <span className="font-sans text-muted">{or}</span>}
                  <kbd className="rounded-md border border-border bg-background px-2 py-0.5 font-semibold text-foreground shadow-2xs">{key}</kbd>
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">{note}</p>
    </Card>
  );
}

export async function BlogPost({ slug, locale = defaultLocale }: { slug: string; locale?: Locale }) {
  const document = getBlogSource(slug, locale);
  if (!document) notFound();
  const { post, source } = document;
  // MDX is executable content, authored locally and compiled only during static export.
  const { default: Content } = await evaluate(source, { ...runtime, development: false });
  const components = {
    Strong: (props: ComponentProps<"strong">) => <strong className="text-foreground" {...props} />,
    Em: (props: ComponentProps<"em">) => <em {...props} />,
    Badge, BlogImage, Icon, Screenshot, Card, CardGrid, CardTitle, CodeList, KeyboardShortcuts,
    ReleaseCTA: (props: Omit<ComponentProps<typeof ReleaseCTA>, "locale">) => <ReleaseCTA {...props} locale={locale} />,
    PlatformNote: ({ children }: { children?: ReactNode }) => <p className="border-l-2 border-border pl-4 text-sm text-muted">{children}</p>,
    PostSection: (props: ComponentProps<"section">) => <section className="space-y-4" {...props} />,
    h2: (props: ComponentProps<"h2">) => <h2 className="text-2xl font-bold tracking-tight text-foreground" {...props} />,
    h3: (props: ComponentProps<"h3">) => <h3 className="text-xl font-bold text-foreground" {...props} />,
    strong: (props: ComponentProps<"strong">) => <strong className="text-foreground" {...props} />,
    ul: (props: ComponentProps<"ul">) => <ul className="list-disc space-y-2 pl-6" {...props} />,
    ol: (props: ComponentProps<"ol">) => <ol className="list-decimal space-y-2 pl-6" {...props} />,
    a: (props: ComponentProps<"a">) => <a className="text-accent underline underline-offset-4 hover:text-foreground" {...props} />,
    code: (props: ComponentProps<"code">) => <code className="rounded-lg border border-border bg-background-subtle px-2.5 py-1 font-mono text-sm text-foreground" {...props} />,
    Key: (props: ComponentProps<"kbd">) => <kbd className="rounded-md border border-border bg-background px-2 py-0.5 font-semibold text-foreground shadow-2xs" {...props} />,
  };
  return (
    <>
      <Nav locale={locale} showLanguageSwitcher={true} />
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,var(--hero-glow),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-50" />
        <article className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <div className="mb-8">
            <Link href={localizePath("/blog", locale)} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground">
              <ArrowLeft size={15} aria-hidden="true" />{getBlogIndexStrings(locale).allPosts}
            </Link>
          </div>
          <header className="mb-12 border-b border-border/60 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="inline-flex items-center rounded-full border border-accent/15 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">{post.releaseBadge}</span>
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt, locale)}</time>
              <span aria-hidden="true">·</span><span>{post.readingTime}</span>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{post.summary}</p>
            {post.platformsSubtitle && <p className="mt-4 text-sm text-muted">{post.platformsSubtitle}</p>}
          </header>
          <div className="space-y-12 text-[16px] leading-relaxed text-muted/95"><Content components={components} /></div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
