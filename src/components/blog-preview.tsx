import Link from "next/link";
import type { PostSummary } from "@lib/blog";

export default function BlogPreview({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10">
      <div className="flex flex-col gap-5">
        <span className="eyebrow">[04] Writing</span>
        <h2 className="h2-display text-[clamp(44px,5.2vw,80px)]">
          Notes from the <span className="si text-muted">systems edge.</span>
        </h2>
      </div>
      <div className="border-line2 flex flex-col border-t">
        {posts.slice(0, 3).map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="row-link border-line text-ink flex items-start justify-between gap-6 border-b py-7 no-underline"
          >
            <span className="flex flex-col gap-2.5">
              <span className="text-muted font-mono text-[11px] tracking-[0.1em] uppercase">
                {p.dateLabel} · <span className="text-accent-ink">{p.readTime} min read</span>
              </span>
              <span className="text-[clamp(22px,2.2vw,30px)] leading-[1.12] font-semibold tracking-[-0.035em]">
                {p.title}
              </span>
              <span className="text-muted max-w-[64ch] text-[15px] leading-[1.55]">
                {p.excerpt}
              </span>
            </span>
            <span className="arrow text-[28px]" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
      <Link href="/blog" className="self-start text-[14.5px] font-semibold">
        All writing →
      </Link>
    </div>
  );
}
