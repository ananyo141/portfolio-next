import { NextResponse } from "next/server";
import { getPosts } from "@src/network/cmsHandlers";
import { generateRSS } from "@lib/rss";

export async function GET() {
  const posts = await getPosts();

  const rss = generateRSS({
    title: "Ananyo Bhowmick — Writing",
    description: "Essays on software engineering, system design, and the craft of building things.",
    link: "https://ananyobhowmick.dev",
    posts,
  });

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
