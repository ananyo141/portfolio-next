import type { MetadataRoute } from "next";

import site from "@data/site.json";

const siteUrl = site.domain.replace(/\/$/, "");

const routes = [
  "",
  "/blog",
  "/principles",
  "/uses",
  "/projects",
  "/projects/vimero",
  "/projects/code-grader",
  "/projects/analytics-api",
  "/projects/snappio",
  "/tools",
  "/tools/jwt-inspector",
  "/blog/embracing-microservices-a-revolution-in-modern-software-architecture",
  "/blog/working-with-docker-compose",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
  }));
}
