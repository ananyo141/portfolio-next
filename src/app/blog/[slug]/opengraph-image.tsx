import { ImageResponse } from "next/og";
import { getPost } from "@src/network/cmsHandlers";
import site from "@data/site.json";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#F5F5F0",
      }}
    >
      <div
        style={{
          fontSize: "72px",
          fontWeight: "bold",
          color: "#111111",
          lineHeight: 1.2,
          marginBottom: "40px",
          maxWidth: "900px",
        }}
      >
        {post?.title || "Untitled"}
      </div>
      <div
        style={{
          fontSize: "24px",
          color: "#7C3AED",
          fontFamily: "monospace",
        }}
      >
        {new URL(site.domain).hostname}
      </div>
    </div>,
    { ...size }
  );
}
