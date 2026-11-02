import type { Project } from "@data/types";

export const FILTERS = ["All", "Backend", "Full stack", "Real-time", "Frontend", "AI/ML"] as const;
export type Filter = (typeof FILTERS)[number];

export function matchesFilter(categories: string[] | undefined, f: Filter): boolean {
  return f === "All" || (categories ?? []).includes(f);
}

export function filterCount(items: { categories?: string[] }[], f: Filter): number {
  return items.filter((p) => matchesFilter(p.categories, f)).length;
}

export function filterSummary(f: Filter, recent: number, archived: number): string {
  const total = recent + archived;
  return f === "All"
    ? `Showing everything · ${total} projects`
    : `${total} in ${f} · ${recent} recent, ${archived} archived`;
}

export function archiveLinks(p: Project): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  if (p.live) links.push({ label: "Live", href: p.live });
  if (p.youtube) links.push({ label: "Video", href: p.youtube });
  if (p.github) links.push({ label: "GitHub", href: p.github });
  return links;
}

// Tags that describe the shape of a project rather than its theme.
const GENERIC_TAGS = new Set(["full stack", "frontend", "backend", "api", "clone"]);

const themeCase = (tag: string) => (tag === tag.toUpperCase() ? tag : tag.toLowerCase());

/** "6 earlier experiments — e-commerce, mobile, NLP, canvas, auth", themes taken from each
 *  project's first non-generic tag, in order, deduped. */
export function archiveSummary(archived: Project[]): string {
  const seen = new Set<string>();
  const themes: string[] = [];
  for (const p of archived) {
    const tag = (p.tags ?? []).find((t) => !GENERIC_TAGS.has(t.toLowerCase()));
    if (!tag || seen.has(tag.toLowerCase())) continue;
    seen.add(tag.toLowerCase());
    themes.push(themeCase(tag));
  }
  const n = archived.length;
  const head = `${n} earlier experiment${n === 1 ? "" : "s"}`;
  return themes.length ? `${head} — ${themes.join(", ")}` : head;
}
