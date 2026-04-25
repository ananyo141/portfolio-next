import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, renderMDX } from "@lib/mdx";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await renderMDX(post.content);

  return (
    <article className="mx-auto max-w-3xl px-6 py-32 md:px-12">
      <header className="mb-16">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
            {post.date}
          </span>
          <span className="text-[#E0E0D8]">·</span>
          <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
            {post.readTime}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#E0E0D8] px-2.5 py-0.5 font-[family-name:var(--font-jetbrains)] text-xs text-[#6B6B6B]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-4xl leading-tight font-semibold text-[#111111] md:text-5xl">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-lg prose-headings:font-[family-name:var(--font-playfair)] prose-headings:font-semibold prose-headings:text-[#111111] prose-p:font-[family-name:var(--font-inter)] prose-p:text-[#111111] prose-a:text-[#FF4D00] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#111111] prose-blockquote:border-l-[#FF4D00] prose-blockquote:text-[#6B6B6B] prose-li:text-[#111111] max-w-none">
        {content}
      </div>

      <div className="mt-20 border-t border-[#E0E0D8] pt-10">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-base text-[#111111] transition-colors hover:text-[#FF4D00]"
        >
          <span>←</span>
          Back to writing
        </Link>
      </div>
    </article>
  );
}
