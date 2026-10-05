import { describe, expect, it } from "vitest";
import { topicFor } from "../blog";

describe("topicFor", () => {
  it("prefers a canonical category", () => {
    expect(topicFor({ categories: [{ title: "System Design" }] })).toBe("System Design");
  });
  it("matches tags case-insensitively when categories are off-list", () => {
    expect(topicFor({ categories: [{ title: "New" }], tags: ["developer tools"] })).toBe(
      "Developer Tools"
    );
  });
  it("falls back to the first category title, then Essay", () => {
    expect(topicFor({ categories: [{ title: "New" }] })).toBe("New");
    expect(topicFor({ categories: null, tags: null })).toBe("Essay");
  });
});
