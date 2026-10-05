import { calculateReadingTime, formatDateShort, getExcerptFromPortableText } from "@lib/utils";

export const TOPICS = [
  "System Design",
  "Backend",
  "Developer Tools",
  "Debugging",
  "Operations",
] as const;

export function topicFor(post: {
  categories?: ({ title?: string } | null)[] | null;
  tags?: string[] | null;
}): string {
  const names = [...(post.categories ?? []).map((c) => c?.title ?? ""), ...(post.tags ?? [])].map(
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

export function filterPosts(posts: PostSummary[], topic: string, q: string): PostSummary[] {
  const needle = q.trim().toLowerCase();
  return posts.filter((p) => {
    const okT = topic === "All" || p.topic === topic;
    const okQ = !needle || `${p.title} ${p.excerpt} ${p.topic}`.toLowerCase().includes(needle);
    return okT && okQ;
  });
}

export function resultSummary(total: number, shown: number, topic: string, q: string): string {
  const needle = q.trim();
  if (shown === total && topic === "All" && !needle) return "All essays · newest first";
  return `${shown} of ${total} essays${topic !== "All" ? ` in ${topic}` : ""}${
    needle ? ` matching “${needle}”` : ""
  }`;
}

export function emptyHint(topic: string, q: string): string {
  const needle = q.trim();
  return `${topic !== "All" ? ` on ${topic}` : ""}${needle ? ` for “${needle}”` : ""}`;
}

export interface Heading {
  key: string;
  id: string;
  text: string;
  n: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const HEADING_STYLES = new Set(["h1", "h2", "h3"]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockText = (b: any): string =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (b.children ?? []).map((c: any) => c.text ?? "").join("");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function headingsFrom(body: any[]): Heading[] {
  if (!Array.isArray(body)) return [];
  const seen = new Map<string, number>();
  const out: Heading[] = [];
  for (const b of body) {
    if (b?._type !== "block" || !HEADING_STYLES.has(b.style)) continue;
    const text = blockText(b).trim();
    if (!text) continue;
    const base = slugifyHeading(text) || "section";
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    out.push({
      key: b._key,
      id: count === 1 ? base : `${base}-${count}`,
      text,
      n: String(out.length + 1).padStart(2, "0"),
    });
  }
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function leadBlockKey(body: any[]): string | null {
  if (!Array.isArray(body)) return null;
  const b = body.find(
    (x) => x?._type === "block" && (x.style ?? "normal") === "normal" && blockText(x).trim()
  );
  return b?._key ?? null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wordCountOf(body: any[]): number {
  if (!Array.isArray(body)) return 0;
  return body
    .filter((b) => b?._type === "block")
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}
