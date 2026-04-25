import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@lib/mdx";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Thoughts on Engineering";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#F5F5F0",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          fontWeight: 600,
          color: "#111111",
          lineHeight: 1.2,
          maxWidth: "900px",
          fontFamily: "serif",
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: "40px",
          fontSize: "24px",
          color: "#FF4D00",
          fontFamily: "monospace",
        }}
      >
        Thoughts on Engineering
      </div>
    </div>,
    {
      ...size,
    }
  );
}
