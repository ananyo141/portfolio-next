import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs } from "@src/network/cmsHandlers";
import BlogPost from "@components/blog-post";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s: any) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Ananyo Bhowmick`,
    description: post.excerpt || post.title,
  };
}

export const revalidate = 360;

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen px-6 py-32 md:px-8">
      <BlogPost post={post} />
    </div>
  );
}
