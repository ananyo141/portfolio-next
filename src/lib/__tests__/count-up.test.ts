import { describe, expect, it } from "vitest";
import { easeOutExpo } from "../use-count-up";

describe("easeOutExpo", () => {
  it("is 0 at 0 and exactly 1 at 1", () => {
    expect(easeOutExpo(0)).toBe(0);
    expect(easeOutExpo(1)).toBe(1);
  });
  it("is monotonic and front-loaded", () => {
    expect(easeOutExpo(0.5)).toBeGreaterThan(0.9);
    expect(easeOutExpo(0.25)).toBeLessThan(easeOutExpo(0.5));
  });
});
