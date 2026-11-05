import { Locale, defaultLocale, localizePath } from "./i18n";
import { getBlogPosts, getBlogIndexStrings } from "./blog";

const SITE_URL = "https://meron.im";

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

function escapeCdata(text: string): string {
  return text.replace(/\]\]>/g, "]]]]><![CDATA[>");
}

export function generateRssFeed(
  locale: Locale = defaultLocale,
  feedPath = "/feed.xml"
): string {
  const strings = getBlogIndexStrings(locale);
  const posts = getBlogPosts(locale);
  const blogUrl = `${SITE_URL}${localizePath("/blog", locale)}`;
  const feedUrl = `${SITE_URL}${localizePath(feedPath, locale)}`;
  const rssLanguage = locale.replace("_", "-");

  const latestPost = posts[0];
  const lastBuildDate = latestPost
    ? new Date(`${latestPost.publishedAt}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${SITE_URL}${localizePath(`/blog/${post.slug}`, locale)}`;
      const pubDate = new Date(`${post.publishedAt}T00:00:00Z`).toUTCString();
      const imageUrl = post.image ? `${SITE_URL}${post.image}` : undefined;

      const highlightsList =
        post.highlights && post.highlights.length > 0
          ? `<ul>${post.highlights.map((h) => `<li>${escapeXml(h)}</li>`).join("")}</ul>`
          : "";

      const imageHtml = imageUrl
        ? `<p><img src="${escapeXml(imageUrl)}" alt="${escapeXml(post.title)}" /></p>`
        : "";

      const descriptionHtml = `${imageHtml}<p>${escapeXml(post.summary)}</p>${highlightsList}`;

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${escapeCdata(descriptionHtml)}]]></description>
${imageUrl ? `      <enclosure url="${escapeXml(imageUrl)}" type="image/png" length="0" />\n` : ""}    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${strings.title}: Meron`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(strings.description)}</description>
    <language>${rssLanguage}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>
`;
}
