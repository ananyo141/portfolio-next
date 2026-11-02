import type { MetadataRoute } from "next";

import site from "@data/site.json";
import { getPostSitemapEntries } from "@src/network/cmsHandlers";

export const revalidate = 3600;

const siteUrl = site.domain.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: string; updatedAt: string }[] = [];
  try {
    posts = await getPostSitemapEntries();
  } catch (error) {
    console.error("sitemap: could not load posts from Sanity", error);
  }

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
