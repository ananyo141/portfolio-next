"use client";

import { useEffect, useRef, useState } from "react";
import {
  QUICK_COMMANDS,
  initialHistory,
  runCommand,
  type Entry,
  type ShellContext,
  type Tone,
} from "@lib/shell-commands";

const TONE: Record<Tone | "cmd", string> = {
  out: "#F1EBDF",
  dim: "#9A9183",
  acc: "var(--accent)",
  err: "#FF9A85",
  cmd: "#F1EBDF",
};

export default function Shell({ posts }: ShellContext) {
  const ctx: ShellContext = { posts };
  const [history, setHistory] = useState<Entry[]>(() => initialHistory(ctx));
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [history]);

  const run = (raw: string) => {
    const { history: next, jump } = runCommand(history, raw, ctx);
    setHistory(next);
    setInput("");
    if (jump) {
      setTimeout(() => {
        document.getElementById(jump)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 450);
    }
  };

  return (
    <section
      id="shell"
      className="wrap flex flex-wrap items-center gap-x-[72px] gap-y-12 pt-[clamp(80px,9vw,128px)]"
    >
      <div className="flex flex-[1_1_380px] flex-col gap-6">
        <span className="eyebrow">[01] Skip the scroll</span>
        <h2 className="h2-display text-[clamp(44px,5.4vw,84px)]">
          Ask the <span className="si text-muted">shell.</span>
        </h2>
        <p className="text-muted m-0 max-w-[42ch] text-base leading-[1.6]">
          Everything on this page, one command away. Type{" "}
          <span className="text-ink font-mono">help</span>, or tap a command to run it.
        </p>
        <div className="flex flex-wrap gap-2">
          {QUICK_COMMANDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="chip h-10 rounded-[10px] px-3.5 font-mono text-[13px] font-normal"
            >
              <span className="text-accent-ink">❯</span>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div
        className="min-w-0 flex-[999_1_560px] overflow-hidden rounded-[20px] border border-[rgba(241,235,223,.16)] bg-[#100E0B] text-[#F1EBDF]"
        style={{ boxShadow: "0 40px 80px -30px var(--shadow)" }}
      >
        <div className="flex justify-between gap-3 border-b border-[rgba(241,235,223,.12)] px-5 py-3.5 font-mono text-[11.5px] tracking-[0.06em] text-[#A69D8F]">
          <span>ananyo@portfolio: ~</span>
          <span className="flex items-center gap-2">
            <span className="pulse bg-accent h-[7px] w-[7px] rounded-full" />
            ap-shell
          </span>
        </div>
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label="Shell output"
          className="term-out h-[340px] overflow-y-auto px-[22px] pt-[18px] pb-2 font-mono text-[13.5px] leading-[1.7]"
        >
          {history.map((h, hi) => (
            <div key={hi} className={hi === 0 ? "" : "mt-2.5"}>
              {h.cmd !== null && (
                <div className="whitespace-pre-wrap" style={{ color: TONE.cmd }}>
                  ❯ {h.cmd}
                </div>
              )}
              {h.out.map((o, oi) => (
                <div key={oi} className="whitespace-pre-wrap" style={{ color: TONE[o.tone] }}>
                  {o.text}
                </div>
              ))}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
          className="flex items-center gap-2.5 border-t border-[rgba(241,235,223,.08)] px-[22px] pt-3.5 pb-[18px]"
        >
          <label htmlFor="ap-shell-input" className="text-accent font-mono text-sm">
            ~ ❯
          </label>
          <input
            id="ap-shell-input"
            className="term-in h-8 font-mono text-sm"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label="Shell command"
            placeholder="type a command, e.g. projects"
          />
          <button
            type="submit"
            className="h-8 cursor-pointer rounded-lg border border-[rgba(241,235,223,.2)] bg-transparent px-3 font-mono text-xs text-[#F1EBDF]"
          >
            enter ↵
          </button>
        </form>
      </div>
    </section>
  );
}
