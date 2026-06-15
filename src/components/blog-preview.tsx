import Link from "next/link";
import { getPosts } from "@src/network/cmsHandlers";
import { calculateReadingTime, formatDate, getExcerptFromPortableText } from "@lib/utils";
import Eyebrow from "@components/eyebrow";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default async function BlogPreview() {
  const posts = await getPosts();
  const latest = posts?.slice(0, 3) || [];

  return (
    <section id="writing" className="bg-bg-primary px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-14 grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
              <div>
                <Eyebrow>Writing</Eyebrow>
                <h2 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-5xl">
                  Notes on the <em className="text-text-muted italic">craft</em>.
                </h2>
              </div>
              <p className="text-text-muted text-[15px] leading-relaxed">
                Occasional writing on systems, tooling, and lessons from shipping.
              </p>
            </div>
          </StaggerItem>

          <div className="flex flex-col">
            {latest.map((post: any, index: number) => {
              const readTime = calculateReadingTime(post.body || []);
              const excerpt = post.excerpt || getExcerptFromPortableText(post.body || []);
              return (
                <StaggerItem key={post._id || post.slug?.current}>
                  <Link
                    href={`/blog/${post.slug?.current}`}
                    className={`group block cursor-pointer py-7 ${
                      index !== latest.length - 1 ? "border-border-subtle border-b" : ""
                    }`}
                  >
                    <div className="text-text-muted flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] uppercase">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="text-border-subtle">·</span>
                      <span className="text-accent">{readTime} min read</span>
                    </div>
                    <h3 className="text-text-primary group-hover:text-accent mt-3 font-serif text-2xl font-[440] transition-colors md:text-3xl">
                      {post.title}
                    </h3>
                    <p className="text-text-muted mt-2 line-clamp-2 max-w-3xl text-[15px] leading-relaxed">
                      {excerpt}
                    </p>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>

          <StaggerItem className="mt-10">
            <Link
              href="/blog"
              className="group/link text-text-primary hover:text-accent inline-flex cursor-pointer items-center gap-1 font-mono text-xs tracking-[0.08em] uppercase transition-colors"
            >
              View all writing
              <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
