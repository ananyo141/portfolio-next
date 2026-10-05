"use client";

import { useMemo, useState } from "react";
import experiences from "@data/experience.json";
import type { Experience as Span } from "@data/types";
import {
  formatDuration,
  formatPeriod,
  nowLinePosition,
  spanGeometry,
  spanMonths,
  traceYears,
} from "@lib/trace";

const spans = [...(experiences as Span[])].sort((a, b) => a.start.localeCompare(b.start));
const since = formatPeriod(spans[0].start, null).split(" — ")[0];
const DEFAULT = spans.find((s) => s.end === null)?.id ?? spans[spans.length - 1].id;

const MONO = "font-mono text-[11px] tracking-[0.1em] uppercase";

export default function Experience({ now: nowIso }: { now: string }) {
  const [selected, setSelected] = useState(DEFAULT);
  const now = useMemo(() => new Date(nowIso), [nowIso]);
  const years = traceYears(now);
  const gridStep = `${100 / years.length}%`;
  const nowPos = nowLinePosition(now) * 100;
  const cur = spans.find((s) => s.id === selected) ?? spans[0];
  const curMonths = spanMonths(cur.start, cur.end, now);
  const attrs: [string, string][] = [
    ["span.name", cur.company],
    ["span.kind", "employment"],
    ["period", formatPeriod(cur.start, cur.end)],
    ["duration", cur.end ? formatDuration(curMonths) : `${formatDuration(curMonths)} · ongoing`],
    ["team", cur.team],
    ["status", cur.end ? "completed" : "live"],
  ];

  return (
    <section id="experience" className="wrap flex flex-col gap-14 pt-[clamp(80px,9vw,140px)] pb-10">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex flex-col gap-5">
          <span className="eyebrow">[03] Experience</span>
          <h2 className="h2-display">
            A trace of <span className="si text-muted">where I&apos;ve shipped.</span>
          </h2>
        </div>
        <p className="text-muted m-0 max-w-[40ch] text-base leading-[1.6]">
          Read it like a request waterfall: every span is a team, overlapping where the work did.
          Select a span to inspect it.
        </p>
      </div>

      <div className="border-line2 bg-surface overflow-hidden rounded-[24px] border">
        <div
          className={`${MONO} border-line bg-bg2 text-muted flex flex-wrap gap-x-8 gap-y-2 border-b px-7 py-4`}
        >
          <span>
            trace <span className="text-ink">career.ananyo</span>
          </span>
          <span>
            spans <span className="text-ink">{spans.length}</span>
          </span>
          <span>
            since <span className="text-ink">{since}</span>
          </span>
          <span className="flex items-center gap-2">
            status <span className="pulse bg-accent h-[7px] w-[7px] rounded-full" />
            <span className="text-ink">live</span>
          </span>
        </div>

        <div className="flex flex-wrap gap-x-8 px-7 pt-3.5 pb-1.5">
          <div className="hidden max-w-[300px] flex-[1_1_260px] md:block" />
          <div className="text-muted relative h-[22px] min-w-0 flex-[999_1_420px] font-mono text-[11px]">
            {years.map((y, i) => (
              <span key={y} className="absolute" style={{ left: `${(i / years.length) * 100}%` }}>
                {y}
              </span>
            ))}
          </div>
        </div>

        <div role="group" aria-label="Career spans" className="flex flex-col">
          {spans.map((s) => {
            const on = s.id === selected;
            const live = s.end === null;
            const g = spanGeometry(s.start, s.end, now);
            const months = spanMonths(s.start, s.end, now);
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(s.id)}
                className="span-row border-line text-ink flex w-full cursor-pointer flex-wrap items-center gap-x-8 gap-y-3 border-0 border-t px-7 py-[18px] text-left"
                style={{ background: on ? "var(--sel-bg)" : "transparent" }}
              >
                <span className="flex max-w-[300px] flex-[1_1_260px] flex-col gap-[3px]">
                  <span className="text-[21px] font-semibold tracking-[-0.03em]">{s.company}</span>
                  <span className={`${MONO} ${on ? "text-accent-ink" : "text-muted"}`}>
                    {formatPeriod(s.start, s.end)}
                  </span>
                </span>
                <span
                  className="relative h-10 min-w-0 flex-[999_1_420px]"
                  style={{
                    background: `linear-gradient(90deg, var(--line) 1px, transparent 1px) 0 0 / ${gridStep} 100%`,
                  }}
                >
                  <span
                    className="absolute top-1.5 bottom-1.5 box-border flex items-center justify-between gap-2 overflow-hidden rounded-md border px-2.5 font-mono text-[11px] font-medium whitespace-nowrap transition-colors duration-300"
                    style={{
                      left: `${g.left * 100}%`,
                      width: `${g.width * 100}%`,
                      background: on
                        ? "var(--accent)"
                        : live
                          ? "color-mix(in srgb, var(--accent) 22%, transparent)"
                          : "transparent",
                      color: on ? "var(--on-accent)" : "var(--ink)",
                      borderColor: on || live ? "var(--accent)" : "var(--line2)",
                    }}
                  >
                    <span>{s.label}</span>
                    <span>{live ? "now" : formatDuration(months)}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="border-accent absolute top-0 bottom-0 border-l border-dashed"
                    style={{ left: `${nowPos}%` }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-line2 bg-bg2 flex flex-wrap border-t">
          <div className="border-line flex flex-[1_1_260px] flex-col gap-2.5 border-r px-7 py-6 font-mono text-xs">
            <span className="eyebrow text-[11px] tracking-[0.14em]">Span inspector</span>
            {attrs.map(([k, v]) => (
              <span key={k} className="border-line flex justify-between gap-4 border-b py-1.5">
                <span className="text-muted">{k}</span>
                <span className="text-right">{v}</span>
              </span>
            ))}
          </div>
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-4 px-7 pt-6 pb-7">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
              <span className="text-[30px] font-bold tracking-[-0.04em]">{cur.role}</span>
              <span className="si text-muted text-[26px]">at {cur.company}</span>
            </div>
            <p className="text-muted m-0 max-w-[72ch] text-base leading-[1.65]">
              {cur.description}
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-[11.5px]">
              {cur.tags.map((t) => (
                <span key={t} className="border-line2 rounded-full border px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
