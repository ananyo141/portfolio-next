import Link from "next/link";
import { getAllPosts } from "@lib/mdx";

export default function BlogList() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16">
        <h1 className="mb-4 font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          Writing
        </h1>
        <p className="max-w-xl font-[family-name:var(--font-inter)] text-lg text-[#6B6B6B]">
          Deep dives, honest opinions, and the occasional rant about software engineering.
        </p>
      </div>

      <div className="flex flex-col">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className={`py-10 ${index !== posts.length - 1 ? "border-b border-[#E0E0D8]" : ""}`}
          >
            <Link href={`/blog/${post.slug}/`} className="group block">
              <div className="mb-3 flex flex-wrap items-center gap-3">
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
              <h2 className="relative mb-3 inline-block font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#111111] md:text-4xl">
                {post.title}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FF4D00] transition-all duration-300 group-hover:w-full" />
              </h2>
              <p className="max-w-2xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-[#6B6B6B]">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
