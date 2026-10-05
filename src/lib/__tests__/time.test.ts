import { describe, expect, it } from "vitest";
import { clockNote, kolkataClock } from "../time";

describe("kolkataClock", () => {
  it("formats UTC 04:30 as 10:00 IST", () => {
    const { clock, hour } = kolkataClock(new Date("2026-10-05T04:30:00Z"));
    expect(clock).toBe("10:00");
    expect(hour).toBe(10);
  });
});

describe("clockNote", () => {
  it("maps hour bands", () => {
    expect(clockNote(7)).toBe("probably asleep");
    expect(clockNote(8)).toBe("probably on coffee one");
    expect(clockNote(10)).toBe("probably shipping");
    expect(clockNote(19)).toBe("probably shipping");
    expect(clockNote(20)).toBe("probably reading docs");
  });
});
