import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs, getPosts } from "@src/network/cmsHandlers";
import BlogPost from "@components/blog-post";
import { toSummary } from "@lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export const revalidate = 360;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPost(slug), getPosts()]);

  if (!post) {
    notFound();
  }

  const list = ((all ?? []) as unknown[]).map((p, i) => toSummary(p, i));
  const idx = list.findIndex((p) => p.slug === slug);
  const nextSummary = list.length > 1 ? list[(idx + 1) % list.length] : null;
  const next = nextSummary
    ? { slug: nextSummary.slug, title: nextSummary.title, readTime: nextSummary.readTime }
    : null;

  return <BlogPost post={post} next={next} />;
}
