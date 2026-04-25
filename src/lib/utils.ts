import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractTextFromPortableText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      if (block.style === "h1" || block.style === "h2" || block.style === "h3") return "";
      return block.children.map((child: any) => child.text || "").join("");
    })
    .filter(Boolean)
    .join(" ");
}

export function getExcerptFromPortableText(blocks: any[], maxLength: number = 150): string {
  if (!Array.isArray(blocks)) return "";
  for (const block of blocks) {
    if (block._type !== "block" || !block.children) continue;
    if (block.style === "h1" || block.style === "h2" || block.style === "h3") continue;
    const text = block.children.map((child: any) => child.text || "").join("");
    if (text.trim()) {
      return text.trim().length > maxLength ? text.trim().slice(0, maxLength) + "..." : text.trim();
    }
  }
  return "";
}

export function calculateReadingTime(blocks: any[]): number {
  const text = extractTextFromPortableText(blocks);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 1;
  return Math.ceil(words / 200);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
