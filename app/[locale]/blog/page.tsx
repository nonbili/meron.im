import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";
import { Locale, locales } from "@/lib/i18n";
import { getBlogIndexStrings } from "@/lib/blog";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const locale = (params.locale as Locale) || "en";
  const strings = getBlogIndexStrings(locale);

  return {
    title: `${strings.title}: Meron`,
    description: strings.description,
    alternates: {
      canonical: `/${locale}/blog`,
      types: {
        "application/rss+xml": `/${locale}/feed.xml`,
      },
    },
  };
}

export default async function LocalizedBlogPage(
  props: { params: Promise<{ locale: string }> }
) {
  const params = await props.params;
  const locale = (params.locale as Locale) || "en";

  return <BlogIndex locale={locale} />;
}
