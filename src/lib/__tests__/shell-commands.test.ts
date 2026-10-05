import { describe, expect, it } from "vitest";
import { initialHistory, runCommand, type ShellContext } from "../shell-commands";

const ctx: ShellContext = {
  posts: [
    { title: "Embracing Microservices", date: "Feb 2024" },
    { title: "Working with Docker Compose", date: "Feb 2024" },
  ],
};

describe("runCommand", () => {
  it("starts with a welcome line and whoami already run", () => {
    const h = initialHistory(ctx);
    expect(h[0].cmd).toBeNull();
    expect(h[0].out[0].text).toContain("ap-shell v1.0");
    expect(h[1].cmd).toBe("whoami");
    expect(h[1].out[0].text).toBe("Ananyobrata Pal");
  });
  it("reports unknown commands", () => {
    const { history, jump } = runCommand([], "frobnicate", ctx);
    expect(history.at(-1)?.out[0]).toEqual({ text: "command not found: frobnicate", tone: "err" });
    expect(jump).toBeNull();
  });
  it("normalises whitespace and case for open/cd", () => {
    expect(runCommand([], "  OPEN   Work ", ctx).jump).toBe("work");
    expect(runCommand([], "cd contact/", ctx).jump).toBe("contact");
    expect(runCommand([], "open nowhere", ctx).history.at(-1)?.out[0].tone).toBe("err");
  });
  it("sudo hire-me jumps to contact", () => {
    const r = runCommand([], "Sudo  Hire-Me", ctx);
    expect(r.jump).toBe("contact");
    expect(r.history.at(-1)?.out[1].text).toBe("Permission granted.");
  });
  it("clear wipes history", () => {
    expect(runCommand(initialHistory(ctx), "clear", ctx).history).toEqual([]);
  });
  it("keeps only the last 14 entries", () => {
    let h = initialHistory(ctx);
    for (let i = 0; i < 20; i++) h = runCommand(h, "ls", ctx).history;
    expect(h).toHaveLength(14);
  });
  it("lists writing from context", () => {
    const r = runCommand([], "writing", ctx);
    expect(r.history.at(-1)?.out[0].text).toBe("Feb 2024  Embracing Microservices");
  });
});
