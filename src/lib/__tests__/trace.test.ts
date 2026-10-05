import { describe, expect, it } from "vitest";
import {
  formatDuration,
  formatPeriod,
  monthIndex,
  nowLinePosition,
  spanGeometry,
  spanMonths,
} from "../trace";

const now = new Date(2026, 9, 1); // Oct 2026

describe("trace geometry (domain Jan 2023 → Dec 2026, 48 months)", () => {
  it("indexes months", () => {
    expect(monthIndex("2023-01")).toBe(0);
    expect(monthIndex("2024-07")).toBe(18);
  });
  it("matches the mockup bars", () => {
    expect(spanGeometry("2023-05", "2024-01", now)).toEqual({ left: 4 / 48, width: 9 / 48 });
    expect(spanGeometry("2023-07", "2024-06", now)).toEqual({ left: 6 / 48, width: 12 / 48 });
    const rt = spanGeometry("2024-07", null, now);
    expect(rt.left).toBeCloseTo(0.375, 4);
    expect(rt.left + rt.width).toBeCloseTo(nowLinePosition(now), 6);
    expect(nowLinePosition(now)).toBeCloseTo(45.5 / 48, 6);
  });
  it("clamps spans outside the domain", () => {
    const g = spanGeometry("2022-01", "2030-01", now);
    expect(g.left).toBe(0);
    expect(g.left + g.width).toBeLessThanOrEqual(1);
    expect(g.width).toBeGreaterThan(0);
  });
  it("formats durations and periods", () => {
    expect(spanMonths("2023-05", "2024-01", now)).toBe(9);
    expect(spanMonths("2023-07", "2024-06", now)).toBe(12);
    expect(spanMonths("2024-07", null, now)).toBe(27);
    expect(formatDuration(9)).toBe("9 mo");
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(27)).toBe("2 yr 3 mo");
    expect(formatPeriod("2023-05", "2024-01")).toBe("May 2023 — Jan 2024");
    expect(formatPeriod("2024-07", null)).toBe("Jul 2024 — Present");
  });
});
