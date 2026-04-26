import Link from "next/link";
import { getPosts } from "@src/network/cmsHandlers";
import { calculateReadingTime, formatDate, getExcerptFromPortableText } from "@lib/utils";
import { StaggerContainer, StaggerItem } from "@components/motion-wrapper";

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-10">
      {posts?.map((post: any) => {
        const readTime = calculateReadingTime(post.body || []);
        const excerpt = post.excerpt || getExcerptFromPortableText(post.body || []);

        return (
          <StaggerItem key={post._id || post.slug?.current}>
            <article className="group">
              <Link href={`/blog/${post.slug?.current}`} className="block cursor-pointer">
                <h2 className="text-text-primary group-hover:text-accent-warm font-serif text-2xl font-bold transition-colors md:text-3xl">
                  {post.title}
                </h2>
                <div className="text-text-muted mt-2 flex items-center gap-3 font-mono text-xs">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span>·</span>
                  <span className="text-accent-warm">{readTime} min read</span>
                </div>
                <p className="text-text-muted mt-3 max-w-2xl text-base leading-relaxed">
                  {excerpt}
                </p>
                {post.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="border-border-subtle text-text-muted rounded-full border px-2.5 py-0.5 font-mono text-xs"
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
