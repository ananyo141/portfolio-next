import Link from "next/link";
import { getAllPosts } from "@lib/mdx";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="writing" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          Latest Writing
        </h2>
        <span className="hidden font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B] md:block">
          03
        </span>
      </div>

      <div className="flex flex-col">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className={`group py-8 ${
              index !== posts.length - 1 ? "border-b border-[#E0E0D8]" : ""
            }`}
          >
            <div className="mb-3 flex items-center gap-4">
              <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
                {post.date}
              </span>
              <span className="text-[#E0E0D8]">·</span>
              <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
                {post.readTime}
              </span>
            </div>
            <h3 className="relative mb-3 inline-block font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#111111] md:text-3xl">
              {post.title}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF4D00] transition-all duration-300 group-hover:w-full" />
            </h3>
            <p className="max-w-2xl font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#6B6B6B]">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-base text-[#111111] transition-colors hover:text-[#FF4D00]"
        >
          View all writing
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
