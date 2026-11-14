import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://meron.im";
const description =
  "Meron is a calmer, local-first email client — chat-style unified inbox, Kanban board with saved searches and tags, inbox & sent-mail rules, local calendar, OpenPGP encryption, and beautiful themes. Open source for macOS, Windows, Linux, iOS, and Android.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Meron: Messages that spark joy",
  description,
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Meron: Messages that spark joy",
    description,
    url: siteUrl,
    siteName: "Meron",
    images: [{ url: "/screenshots/kanban-board.png", width: 2560, height: 1600 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meron: Messages that spark joy",
    description,
    images: ["/screenshots/kanban-board.png"],
  },
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale?: string }>;
  }
) {
  const params = await props.params;
  const locale = params?.locale || "en";
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
