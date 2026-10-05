"use client";

import { useState } from "react";
import Link from "next/link";
import contact from "@data/contact.json";
import { TOPICS, emptyHint, filterPosts, resultSummary, type PostSummary } from "@lib/blog";

const CHIPS = ["All", ...TOPICS];
const MONO = "text-muted font-mono text-[11px] tracking-[0.1em] uppercase";

export default function BlogList({ posts }: { posts: PostSummary[] }) {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const shown = filterPosts(posts, topic, q);
  const [featured, ...rest] = shown;

  return (
    <section className="wrap flex flex-col gap-10 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {CHIPS.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(t)}
                className={`chip px-4 ${on ? "chip-on" : ""}`}
              >
                {t}
                <span className="font-mono text-[11px] opacity-75">
                  {filterPosts(posts, t, "").length}
                </span>
              </button>
            );
          })}
        </div>
        <label className="pill bg-surface min-w-[220px] flex-[0_1_320px] cursor-text gap-2.5 px-4 font-normal hover:translate-y-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
            className="text-muted flex-none"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="sr-only">Search essays</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search essays"
            className="text-ink min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-none"
          />
        </label>
      </div>
      <span aria-live="polite" className={`${MONO} -mt-5 text-[11.5px]`}>
        {resultSummary(posts.length, shown.length, topic, q)}
      </span>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="lift fadein border-line2 bg-surface text-ink flex flex-wrap overflow-hidden rounded-[28px] border no-underline"
        >
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-[22px] p-[clamp(28px,3.6vw,52px)]">
            <div className={`${MONO} flex flex-wrap items-center gap-x-[18px] gap-y-2.5`}>
              <span className="text-accent-ink">Latest</span>
              <span className="border-line2 text-ink rounded-full border px-2.5 py-[5px]">
                {featured.topic}
              </span>
              <span>{featured.dateLabel}</span>
              <span>{featured.readTime} min read</span>
            </div>
            <h2 className="m-0 text-[clamp(34px,3.8vw,58px)] leading-[0.98] font-bold tracking-[-0.045em] [text-wrap:balance]">
              {featured.title}
            </h2>
            <p className="text-muted m-0 max-w-[60ch] text-[17px] leading-[1.6]">
              {featured.excerpt}
            </p>
            <span className="text-accent-ink mt-auto flex items-center gap-2.5 text-[15px] font-semibold">
              Read the essay{" "}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </span>
          </div>
          <div className="bg-bg2 border-line flex flex-[1_1_360px] flex-col justify-between gap-8 border-l p-[clamp(28px,3.6vw,52px)]">
            <span className="outline-num text-[120px] leading-[0.8] font-bold tracking-[-0.05em]">
              {featured.n}
            </span>
            <blockquote className="m-0 flex flex-col gap-3.5">
              <span className="si text-[clamp(26px,2.4vw,34px)] leading-[1.2]">
                “{featured.pullQuote}”
              </span>
              <span className="text-muted font-mono text-[11px] tracking-[0.12em] uppercase">
                From the essay
              </span>
            </blockquote>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="border-line2 flex flex-col border-t">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="row-link border-line text-ink flex flex-wrap items-start gap-x-10 gap-y-4 border-b py-8 no-underline"
            >
              <span className="outline-num min-w-[92px] flex-none text-[64px] leading-[0.8] font-bold tracking-[-0.05em]">
                {p.n}
              </span>
              <span className="flex min-w-0 flex-[999_1_420px] flex-col gap-2.5">
                <span className={MONO}>
                  {p.dateLabel} · <span className="text-accent-ink">{p.readTime} min read</span>
                </span>
                <span className="text-[clamp(24px,2.4vw,34px)] leading-[1.1] font-semibold tracking-[-0.035em]">
                  {p.title}
                </span>
                <span className="text-muted max-w-[70ch] text-[15.5px] leading-[1.6]">
                  {p.excerpt}
                </span>
              </span>
              <span className="flex flex-[1_0_auto] items-center justify-end gap-5">
                <span className="border-line2 text-muted rounded-full border px-3 py-1.5 font-mono text-[11.5px]">
                  {p.topic}
                </span>
                <span className="arrow text-[28px]" aria-hidden="true">
                  ↗
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {shown.length === 0 && (
        <div className="fadein border-line2 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[24px] border border-dashed px-8 py-12">
          <p className="text-muted m-0 text-lg leading-[1.5]">
            Nothing here yet{emptyHint(topic, q)}. It&apos;s on the list.
          </p>
          <button
            type="button"
            onClick={() => {
              setTopic("All");
              setQ("");
            }}
            className="pill px-5"
          >
            Show all essays
          </button>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-8 pb-2">
        <p className="text-muted m-0 text-[17px] leading-[1.5]">
          Want me to write about something? <span className="text-ink">Send the question.</span>
        </p>
        <a
          href={`mailto:${contact.email}?subject=Essay%20idea`}
          className="inline-flex min-h-11 items-center text-[15px] font-semibold"
        >
          {contact.email} →
        </a>
      </div>
    </section>
  );
}
