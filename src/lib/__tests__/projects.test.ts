import { describe, expect, it } from "vitest";
import projects from "../../data/projects.json";
import type { Project } from "../../data/types";
import { FILTERS, archiveLinks, filterCount, filterSummary, matchesFilter } from "../projects";

const all = projects as Project[];
const recent = all.filter((p) => !p.archived && !p.featured);
const archived = all.filter((p) => p.archived);

describe("project filters", () => {
  it("All matches everything, including items with no categories", () => {
    expect(matchesFilter(undefined, "All")).toBe(true);
    expect(matchesFilter(["Backend"], "Frontend")).toBe(false);
  });
  it("counts match the mockup (4 recent + 6 archived)", () => {
    expect(filterCount([...recent, ...archived], "All")).toBe(10);
    expect(filterCount(recent, "Backend")).toBe(3);
    expect(filterCount(recent, "AI/ML")).toBe(0);
    expect(filterCount(archived, "AI/ML")).toBe(2);
  });
  it("summarises", () => {
    expect(filterSummary("All", 4, 6)).toBe("Showing everything · 10 projects");
    expect(filterSummary("AI/ML", 0, 2)).toBe("2 in AI/ML · 0 recent, 2 archived");
  });
  it("archive links prefer live, then video, then github", () => {
    const shala = all.find((p) => p.id === "smartshala")!;
    expect(archiveLinks(shala).map((l) => l.label)).toEqual(["Video", "GitHub"]);
    const shop = all.find((p) => p.id === "computer-shop")!;
    expect(archiveLinks(shop).map((l) => l.label)).toEqual(["Live", "GitHub"]);
  });
  it("exports the six filters in order", () => {
    expect([...FILTERS]).toEqual([
      "All",
      "Backend",
      "Full stack",
      "Real-time",
      "Frontend",
      "AI/ML",
    ]);
  });
});
