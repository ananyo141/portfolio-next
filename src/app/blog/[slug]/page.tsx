import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@components/nav";
import BlogPost from "@components/blog-post";
import Footer from "@components/footer";
import { getPostBySlug, getAllSlugs } from "@lib/mdx";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main id="main-content">
        <BlogPost params={params} />
      </main>
      <Footer />
    </>
  );
}
