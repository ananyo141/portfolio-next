import { ImageResponse } from "next/og";

// Mirrors the nav logo tile: accent-solid square, radius 25%, "ap" in Bricolage Grotesque 800.
const TILE_BG = "#c43c16";
const TILE_FG = "#ffffff";

/** Fetches the Bricolage Grotesque subset for `text` as TTF (satori can't read woff2). */
async function loadBricolage(text: string): Promise<ArrayBuffer | null> {
  try {
    // No browser user agent on purpose: Google then serves TTF instead of woff2.
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@800&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "portfolio-icon" } }
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"](?:truetype|opentype)['"]\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function brandIcon(size: number): Promise<ImageResponse> {
  const font = await loadBricolage("ap");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: TILE_BG,
        borderRadius: size * 0.25,
        color: TILE_FG,
        fontFamily: font ? "Bricolage" : "sans-serif",
        fontWeight: 800,
        fontSize: size * 0.46,
        letterSpacing: `-${size * 0.46 * 0.04}px`,
        lineHeight: 1,
        paddingBottom: size * 0.04,
      }}
    >
      ap
    </div>,
    {
      width: size,
      height: size,
      // Omit `fonts` entirely when the fetch fails so satori keeps its built-in default.
      ...(font ? { fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }] } : {}),
    }
  );
}
