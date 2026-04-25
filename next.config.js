/** @type {import('next').NextConfig} */
module.exports = {
  // NOTE: Static export (output: 'export') is NOT compatible with this project
  // because:
  // 1. Sanity CMS requires runtime server-side fetching for ISR
  // 2. RSS feed uses a Route Handler (/feed.xml)
  // 3. Blog posts are dynamic routes with generateStaticParams
  // Trade-off: We use ISR (revalidate = 360) instead for performance.

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};
