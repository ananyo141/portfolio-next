import { calculateReadingTime, formatDateShort, getExcerptFromPortableText } from "@lib/utils";

export const TOPICS = [
  "System Design",
  "Backend",
  "Developer Tools",
  "Debugging",
  "Operations",
] as const;

export function topicFor(post: {
  categories?: { title?: string }[] | null;
  tags?: string[] | null;
}): string {
  const names = [...(post.categories ?? []).map((c) => c.title ?? ""), ...(post.tags ?? [])].map(
    (s) => s.toLowerCase()
  );
  const hit = TOPICS.find((t) => names.includes(t.toLowerCase()));
  if (hit) return hit;
  return post.categories?.[0]?.title ?? "Essay";
}

export interface PostSummary {
  slug: string;
  title: string;
  publishedAt: string;
  dateLabel: string;
  readTime: number;
  excerpt: string;
  topic: string;
  pullQuote: string;
  n: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toSummary(post: any, index: number): PostSummary {
  const excerpt = post.excerpt || getExcerptFromPortableText(post.body || []);
  return {
    slug: post.slug?.current ?? "",
    title: post.title ?? "",
    publishedAt: post.publishedAt ?? "",
    dateLabel: formatDateShort(post.publishedAt ?? ""),
    readTime: calculateReadingTime(post.body || []),
    excerpt,
    topic: topicFor(post),
    pullQuote: post.pullQuote || excerpt,
    n: String(index + 1).padStart(2, "0"),
  };
}
