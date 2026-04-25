import { getAllPosts } from "@lib/mdx";
import { generateRSSFeed } from "@lib/rss";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const feed = generateRSSFeed(posts);

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
