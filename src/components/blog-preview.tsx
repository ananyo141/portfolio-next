import Link from "next/link";
import { getPosts } from "@src/network/cmsHandlers";
import { calculateReadingTime, formatDate, getExcerptFromPortableText } from "@lib/utils";
import { Calendar, Clock } from "@assets/icons";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default async function BlogPreview() {
  const posts = await getPosts();
  const latest = posts?.slice(0, 3) || [];

  return (
    <section id="writing" className="px-5 py-16 sm:px-6 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
              <h2 className="text-text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Latest Writing
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm sm:block">03</span>
            </div>
          </StaggerItem>

          <div className="mt-8 flex flex-col gap-6">
            {latest.map((post: any) => {
              const readTime = calculateReadingTime(post.body || []);
              const excerpt = post.excerpt || getExcerptFromPortableText(post.body || []);
              return (
                <StaggerItem key={post._id || post.slug?.current}>
                  <Link href={`/blog/${post.slug?.current}`} className="group block cursor-pointer">
                    <h3 className="text-text-primary group-hover:text-accent-warm font-serif text-sm font-bold transition-colors sm:text-base md:text-lg lg:text-xl">
                      {post.title}
                    </h3>
                    <div className="text-text-muted mt-2 flex flex-wrap items-center gap-2 font-mono text-xs sm:gap-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="opacity-60" size={12} />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="text-border-subtle">·</span>
                      <span className="text-accent-warm flex items-center gap-1.5">
                        <Clock size={12} />
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

          <StaggerItem className="mt-8">
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
