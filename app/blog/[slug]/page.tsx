import { notFound } from "next/navigation";
import { BlogPost } from "@/components/BlogPost";
import { getBlogSlugs, getBlogPost, getBlogMetadata } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return getBlogMetadata(post);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogPost slug={slug} />;
}
