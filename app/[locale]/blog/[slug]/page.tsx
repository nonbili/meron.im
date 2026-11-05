import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { Locale, locales } from "@/lib/i18n";
import { getBlogSlugs, getBlogPost, getBlogMetadata } from "@/lib/blog";

type Params = { locale: string; slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getBlogSlugs().map((slug) => ({ locale, slug })));
}

function validateLocale(locale: string): Locale {
  if (!locales.includes(locale as Locale)) notFound();
  return locale as Locale;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale: inputLocale, slug } = await params;
  const locale = validateLocale(inputLocale);
  const post = getBlogPost(slug, locale);
  if (!post) notFound();
  return getBlogMetadata(post, locale);
}

export default async function LocalizedBlogPostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  return <BlogPost slug={slug} locale={validateLocale(locale)} />;
}
