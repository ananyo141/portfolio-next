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
  else if (p.youtube) links.push({ label: "Video", href: p.youtube });
  if (p.github) links.push({ label: "GitHub", href: p.github });
  return links;
}
