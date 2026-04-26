import Link from "next/link";
import { getPosts } from "@src/network/cmsHandlers";
import { calculateReadingTime, formatDate, getExcerptFromPortableText } from "@lib/utils";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default async function BlogPreview() {
  const posts = await getPosts();
  const latest = posts?.slice(0, 3) || [];

  return (
    <section id="writing" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-16 flex items-end justify-between">
              <h2 className="text-text-primary font-serif text-5xl font-bold tracking-tight md:text-6xl">
                Latest Writing
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm md:block">03</span>
            </div>
          </StaggerItem>

          <div className="mt-12 flex flex-col gap-8">
            {latest.map((post: any) => {
              const readTime = calculateReadingTime(post.body || []);
              const excerpt = post.excerpt || getExcerptFromPortableText(post.body || []);
              return (
                <StaggerItem key={post._id || post.slug?.current}>
                  <Link href={`/blog/${post.slug?.current}`} className="group block cursor-pointer">
                    <h3 className="text-text-primary group-hover:text-accent font-serif text-xl font-bold transition-colors md:text-2xl">
                      <span className="from-accent to-accent bg-gradient-to-r bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-300 group-hover:bg-[length:100%_2px]">
                        {post.title}
                      </span>
                    </h3>
                    <div className="text-text-muted mt-2 flex items-center gap-3 font-mono text-xs">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="text-border-subtle">·</span>
                      <span className="bg-accent-warm rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-white uppercase">
                        {readTime} min read
                      </span>
                    </div>
                    <p className="text-text-muted mt-2 line-clamp-2 text-sm leading-relaxed">
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
              className="group/link text-text-primary hover:text-accent-warm inline-flex cursor-pointer items-center gap-1 font-mono text-sm underline underline-offset-4 transition-all"
            >
              View all writing
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                →
              </span>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
