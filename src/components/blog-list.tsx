import Link from "next/link";
import { getPosts } from "@src/network/cmsHandlers";
import { calculateReadingTime, formatDate, getExcerptFromPortableText } from "@lib/utils";
import { StaggerItem } from "@components/motion-wrapper";

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col">
      {posts?.map((post: any, index: number) => {
        const readTime = calculateReadingTime(post.body || []);
        const excerpt = post.excerpt || getExcerptFromPortableText(post.body || []);

        return (
          <StaggerItem key={post._id || post.slug?.current}>
            <article className="group">
              <Link
                href={`/blog/${post.slug?.current}`}
                className={`block cursor-pointer py-7 ${
                  index !== posts.length - 1 ? "border-border-subtle border-b" : ""
                }`}
              >
                <div className="text-text-muted flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] uppercase">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span className="text-border-subtle">·</span>
                  <span className="text-accent">{readTime} min read</span>
                </div>
                <h2 className="text-text-primary group-hover:text-accent mt-3 font-serif text-2xl font-[440] transition-colors md:text-3xl">
                  {post.title}
                </h2>
                <p className="text-text-muted mt-2 max-w-3xl text-[15px] leading-relaxed">
                  {excerpt}
                </p>
                {post.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="border-border-subtle text-text-muted rounded-md border px-2.5 py-1 font-mono text-[10.5px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          </StaggerItem>
        );
      })}
    </div>
  );
}
