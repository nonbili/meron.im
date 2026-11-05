import { generateRssFeed } from "@/lib/rss";
import { defaultLocale } from "@/lib/i18n";

export const dynamic = "force-static";

export function GET() {
  const xml = generateRssFeed(defaultLocale, "/rss.xml");
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
