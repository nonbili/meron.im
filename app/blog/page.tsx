import type { Metadata } from "next";
import { BlogIndex } from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog: Meron",
  description:
    "Release announcements, product updates, and stories from building Meron, the calmer local-first email client.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function BlogIndexPage() {
  return <BlogIndex locale="en" />;
}
