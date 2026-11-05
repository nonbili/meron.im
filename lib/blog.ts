import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { Metadata } from "next";
import { Locale, defaultLocale } from "./i18n";
export { formatBlogDate, getBlogIndexStrings } from "./blogStrings";

export type BlogPost = {
  slug: string;
  version: string;
  title: string;
  publishedAt: string;
  readingTime: string;
  summary: string;
  highlights: string[];
  image: string;
  releaseBadge: string;
  platformsSubtitle?: string;
};

const contentDirectory = path.join(process.cwd(), "content/blog");

export function getBlogSlugs(): string[] {
  return fs.readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(contentDirectory, entry.name, `${defaultLocale}.mdx`)))
    .map((entry) => entry.name);
}

const readPost = cache((slug: string, locale: Locale) => {
  // Only read discovered posts; route parameters never become arbitrary file paths.
  if (!getBlogSlugs().includes(slug)) return undefined;
  const translatedPath = path.join(contentDirectory, slug, `${locale}.mdx`);
  const filename = fs.existsSync(translatedPath)
    ? translatedPath
    : path.join(contentDirectory, slug, `${defaultLocale}.mdx`);
  const { data, content } = matter(fs.readFileSync(filename, "utf8"));
  const required = ["version", "title", "publishedAt", "readingTime", "summary", "image", "releaseBadge"];
  for (const key of required) {
    if (typeof data[key] !== "string" || !data[key].trim()) {
      throw new Error(`${filename}: frontmatter requires a nonempty ${key}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt) || Number.isNaN(Date.parse(data.publishedAt))) {
    throw new Error(`${filename}: publishedAt must be a valid YYYY-MM-DD date`);
  }
  if (!Array.isArray(data.highlights) || !data.highlights.every((item: unknown) => typeof item === "string")) {
    throw new Error(`${filename}: highlights must be a list of strings`);
  }
  if (data.slug !== undefined && data.slug !== slug) {
    throw new Error(`${filename}: slug must match its directory name`);
  }
  return { post: { ...data, slug } as BlogPost, source: content };
});

export function getBlogSource(slug: string, locale: Locale = defaultLocale) {
  return readPost(slug, locale);
}

export function getBlogPost(slug: string, locale: Locale = defaultLocale): BlogPost | undefined {
  return readPost(slug, locale)?.post;
}

export function getBlogPosts(locale: Locale = defaultLocale): readonly BlogPost[] {
  return getBlogSlugs().map((slug) => readPost(slug, locale)!.post)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}

export function getBlogMetadata(post: BlogPost, locale?: Locale): Metadata {
  const url = `${locale ? `/${locale}` : ""}/blog/${post.slug}`;
  const feedUrl = locale && locale !== defaultLocale ? `/${locale}/feed.xml` : "/feed.xml";
  return {
    title: `${post.title}: Meron`,
    description: post.summary,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": feedUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://meron.im${url}`,
      type: "article",
      publishedTime: `${post.publishedAt}T00:00:00Z`,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [post.image] },
  };
}
