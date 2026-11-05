import { generateRssFeed } from "@/lib/rss";
import { Locale, locales } from "@/lib/i18n";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  const xml = generateRssFeed((locale as Locale) || "en", "/feed.xml");
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
