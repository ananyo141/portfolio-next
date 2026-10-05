"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projects from "@data/projects.json";
import type { Project } from "@data/types";
import {
  FILTERS,
  archiveLinks,
  filterCount,
  filterSummary,
  matchesFilter,
  type Filter,
} from "@lib/projects";

const all = projects as Project[];
const featured = all.find((p) => p.featured)!;
const recent = all.filter((p) => !p.archived && !p.featured);
const archived = all.filter((p) => p.archived);
const filterable = [...recent, ...archived];

const MONO_META = "text-muted font-mono text-[11px] tracking-[0.1em] uppercase";
const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 font-mono text-[11.5px]">
      {items.map((t) => (
        <span key={t} className="border-line2 rounded-full border px-3 py-1.5">
          {t}
        </span>
      ))}
    </div>
  );
}

function FeaturedCard({ p }: { p: Project }) {
  return (
    <article className="lift border-line2 bg-surface flex flex-wrap overflow-hidden rounded-[28px] border">
      <div className="bg-bg2 border-line flex min-w-0 flex-[999_1_560px] flex-col gap-3.5 border-r p-[clamp(20px,3vw,40px)]">
        <div className={`${MONO_META} flex justify-between gap-3`}>
          <span>{p.id} / backend</span>
          <span className="text-accent-ink">Featured case study</span>
        </div>
        <div
          className="border-line2 overflow-hidden rounded-2xl border bg-[#05060c]"
          style={{ aspectRatio: "1292 / 665" }}
        >
          {p.image && (
            <Image
              src={p.image}
              alt="Code Grader interface: code editor beside complexity, readability and optimisation scores"
              width={1292}
              height={665}
              sizes="(max-width: 900px) 100vw, 60vw"
              className="zoom block h-full w-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex flex-[1_1_400px] flex-col gap-6 p-[clamp(28px,3.4vw,48px)]">
        <div className="flex items-baseline justify-between gap-4">
          <span className="outline-num text-[96px] leading-[0.8] font-bold tracking-[-0.05em]">
            01
          </span>
          <span className={MONO_META}>{p.tags.join(" · ")}</span>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="m-0 text-[clamp(36px,3.6vw,52px)] leading-[0.95] font-bold tracking-[-0.045em]">
            {p.title}
          </h3>
          <p className="text-muted m-0 text-[17px] leading-[1.55]">{p.blurb}</p>
        </div>
        {p.constraint && (
          <div className="border-line flex flex-col gap-2 border-y py-[18px]">
            <span className="eyebrow text-[10.5px] tracking-[0.14em]">Constraint</span>
            <p className="m-0 text-[15.5px] leading-[1.55]">{p.constraint}</p>
          </div>
        )}
        {p.tradeoffs?.length ? (
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-[10.5px] tracking-[0.14em]">Tradeoffs</span>
            <ul className="text-muted m-0 flex list-none flex-col gap-2 p-0 text-[14.5px] leading-[1.5]">
              {p.tradeoffs.map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <TechChips items={p.tech} />
        <div className="tap-row mt-auto flex flex-wrap gap-x-6 text-[14.5px] font-medium">
          <Link href={`/projects/${p.id}`} className="text-accent-ink">
            Read the case study →
          </Link>
          {p.github && (
            <a href={p.github} {...EXT}>
              GitHub
            </a>
          )}
          {p.youtube && (
            <a href={p.youtube} {...EXT}>
              Walkthrough
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function GridCard({ p, n }: { p: Project; n: number }) {
  const liveFirst = !p.caseStudy && p.live;
  return (
    <article className="lift fadein border-line2 bg-surface flex h-full flex-col overflow-hidden rounded-[24px] border">
      <div
        className="border-line bg-bg2 overflow-hidden border-b"
        style={{ aspectRatio: "16 / 8.5" }}
      >
        {p.image && (
          <Image
            src={p.image}
            alt={`${p.title} screenshot`}
            width={1600}
            height={850}
            sizes="(max-width: 1100px) 100vw, 50vw"
            className="zoom block h-full w-full object-cover object-top"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-8 pt-7 pb-8">
        <div className={`${MONO_META} flex justify-between gap-3`}>
          <span>
            {String(n).padStart(2, "0")} — {p.tags[0]}
          </span>
          <span>{p.stackLabel}</span>
        </div>
        <h3 className="m-0 text-[34px] leading-none font-bold tracking-[-0.04em]">{p.title}</h3>
        <p className="text-muted m-0 text-[15.5px] leading-[1.55]">{p.blurb}</p>
        <div className="tap-row mt-auto flex flex-wrap gap-x-[22px] text-sm font-medium">
          {p.caseStudy && (
            <Link href={`/projects/${p.id}`} className="text-accent-ink">
              Case study →
            </Link>
          )}
          {p.live && (
            <a href={p.live} {...EXT} className={liveFirst ? "text-accent-ink" : undefined}>
              {p.liveLabel ?? "Live demo"}
              {liveFirst ? " →" : ""}
            </a>
          )}
          {p.github && (
            <a href={p.github} {...EXT}>
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const grid = recent.filter((p) => matchesFilter(p.categories, filter));
  const arch = archived.filter((p) => matchesFilter(p.categories, filter));

  return (
    <section id="work" className="wrap flex flex-col gap-14 pt-[clamp(80px,9vw,140px)] pb-10">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="flex flex-col gap-5">
          <span className="eyebrow">[02] Selected work</span>
          <h2 className="h2-display">
            Built to <span className="si text-muted">carry load.</span>
          </h2>
        </div>
        <p className="text-muted m-0 max-w-[40ch] text-base leading-[1.6]">
          Each project started from a constraint, not a stack. Here&apos;s what I was solving for,
          what I traded away, and the evidence it works.
        </p>
      </div>

      <FeaturedCard p={featured} />

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-2">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`chip ${on ? "chip-on" : ""}`}
              >
                {f}
                <span className="font-mono text-[11px] opacity-75">
                  {filterCount(filterable, f)}
                </span>
              </button>
            );
          })}
        </div>
        <span
          aria-live="polite"
          className="text-muted font-mono text-[11.5px] tracking-[0.1em] uppercase"
        >
          {filterSummary(filter, grid.length, arch.length)}
        </span>
      </div>

      {grid.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(520px,100%),1fr))] gap-6">
          {grid.map((p, i) => (
            <GridCard key={p.id} p={p} n={i + 2} />
          ))}
        </div>
      ) : (
        <div className="fadein border-line2 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[24px] border border-dashed px-8 py-12">
          <p className="text-muted m-0 text-lg leading-[1.5]">
            No recent case studies in <span className="text-ink">{filter}</span> — the archive has
            some.
          </p>
          <button type="button" onClick={() => setArchiveOpen(true)} className="pill px-5">
            Open the archive ↓
          </button>
        </div>
      )}

      <div className="border-line border-y">
        <button
          type="button"
          aria-expanded={archiveOpen}
          onClick={() => setArchiveOpen((o) => !o)}
          className="text-ink flex min-h-[72px] w-full cursor-pointer flex-wrap items-center justify-between gap-x-8 gap-y-3 border-0 bg-transparent py-5 text-left"
        >
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase">Archive</span>
            <span className="text-muted text-[15px]">
              {archived.length} earlier experiments — e-commerce, mobile, NLP, canvas, auth
            </span>
          </span>
          <span className="flex items-center gap-2.5 text-[14.5px] font-semibold">
            {archiveOpen ? "Hide archive" : "Show archive"}
            <span
              aria-hidden="true"
              className={`inline-block transition-transform duration-300 ${archiveOpen ? "rotate-180" : ""}`}
            >
              ↓
            </span>
          </span>
        </button>
        {archiveOpen && (
          <div className="fadein flex flex-col pb-3">
            {arch.map((p) => (
              <div
                key={p.id}
                className="border-line flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t py-5"
              >
                <span className="flex-[1_1_240px] text-[21px] font-semibold tracking-[-0.03em]">
                  {p.title}
                </span>
                <span className="text-muted flex-[3_1_360px] text-[15px] leading-[1.55]">
                  {p.blurb}
                </span>
                <span className="text-muted flex-[2_1_220px] font-mono text-[11.5px]">
                  {p.stackLabel}
                </span>
                <span className="tap-row flex flex-none gap-[18px] text-sm font-medium">
                  {archiveLinks(p).map((l, i) => (
                    <a
                      key={l.label}
                      href={l.href}
                      {...EXT}
                      className={i === 0 ? "text-accent-ink" : undefined}
                    >
                      {l.label}
                      {i === 0 ? " →" : ""}
                    </a>
                  ))}
                </span>
              </div>
            ))}
            {arch.length === 0 && (
              <p className="border-line text-muted m-0 border-t py-5 text-[15px]">
                Nothing archived under {filter}.
              </p>
            )}
          </div>
        )}
      </div>
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center self-end text-[14.5px] font-semibold"
      >
        All projects →
      </Link>
    </section>
  );
}
