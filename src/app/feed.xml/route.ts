import { NextResponse } from "next/server";
import { getPosts } from "@src/network/cmsHandlers";
import { generateRSS } from "@lib/rss";
import site from "@data/site.json";

export async function GET() {
  const posts = await getPosts();

  const rss = generateRSS({
    title: `${site.name} — Writing`,
    description: "Essays on software engineering, system design, and the craft of building things.",
    link: site.domain,
    posts,
  });

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
