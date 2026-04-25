import { client } from "@/sanity/lib/client";

export async function getPosts() {
  const query = `
  *[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    tags,
    categories[]-> {
      _id,
      slug,
      title
    }
  }
  `;
  const data = await client.fetch(query);
  return data;
}

export async function getPost(slug: string) {
  const query = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
    body,
    tags,
    categories[]-> {
      _id,
      slug,
      title
    }
  }
  `;
  const post = await client.fetch(query, { slug });
  return post;
}

export async function getAllPostSlugs() {
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs;
}
