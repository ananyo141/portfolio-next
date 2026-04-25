import { BlogPost } from "./mdx";

export function generateRSSFeed(posts: BlogPost[]): string {
  const siteUrl = "https://example.com";
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}/`;
      const date = new Date(post.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${date}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thoughts on Engineering</title>
    <link>${siteUrl}/</link>
    <description>A software engineer's notes on systems, craft, and curiosity.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
