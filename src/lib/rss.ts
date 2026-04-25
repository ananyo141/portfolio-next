export function generateRSS({
  title,
  description,
  link,
  posts,
}: {
  title: string;
  description: string;
  link: string;
  posts: any[];
}) {
  const items = posts
    .map((post) => {
      const postLink = `${link}/blog/${post.slug?.current}`;
      const date = new Date(post.publishedAt).toUTCString();
      const excerpt = post.excerpt || "";
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postLink}</link>
      <guid>${postLink}</guid>
      <pubDate>${date}</pubDate>
      <description><![CDATA[${excerpt}]]></description>
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${title}]]></title>
    <link>${link}</link>
    <description><![CDATA[${description}]]></description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${link}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
