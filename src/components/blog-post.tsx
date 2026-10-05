"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { urlForImage } from "@/sanity/lib/image";
import Portrait from "@components/portrait";
import contact from "@data/contact.json";
import { headingsFrom, leadBlockKey, topicFor, wordCountOf } from "@lib/blog";
import { calculateReadingTime, formatDateShort } from "@lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface NextEssay {
  slug: string;
  title: string;
  readTime: number;
}

interface BlogPostProps {
  post: any;
  next: NextEssay | null;
}

const MONO = "text-muted font-mono text-[11px] tracking-[0.1em] uppercase";

function useFlash(ms: number): [boolean, () => void] {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on) return;
    const t = setTimeout(() => setOn(false), ms);
    return () => clearTimeout(t);
  }, [on, ms]);
  return [on, () => setOn(true)];
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // clipboard unavailable; UI still shows feedback
  }
}

function CodeCard({
  code,
  language,
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, flash] = useFlash(1600);
  return (
    <figure className="my-1.5 overflow-hidden rounded-2xl border border-[rgba(241,235,223,.16)] bg-[#100E0B] text-[#F1EBDF]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-[rgba(241,235,223,.12)] py-1.5 pr-2 pl-[18px] font-mono text-[11.5px] tracking-[0.06em] text-[#A69D8F]">
        <span>{filename ?? language ?? "code"}</span>
        <button
          type="button"
          onClick={() => copy(code).then(flash)}
          className={`h-[34px] cursor-pointer rounded-lg border border-[rgba(241,235,223,.2)] bg-transparent px-3 font-mono text-[11.5px] ${
            copied ? "text-accent" : "text-[#F1EBDF]"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <SyntaxHighlighter
        language={language || "text"}
        style={nightOwl}
        customStyle={{
          margin: 0,
          padding: "18px 20px",
          background: "transparent",
          fontSize: 14,
          lineHeight: 1.65,
        }}
        codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
      >
        {code}
      </SyntaxHighlighter>
    </figure>
  );
}

export default function BlogPost({ post, next }: BlogPostProps) {
  const body: any[] = post.body ?? [];
  const headings = useMemo(() => headingsFrom(body), [body]);
  const idByKey = useMemo(() => new Map(headings.map((h) => [h.key, h.id])), [headings]);
  const lead = useMemo(() => leadBlockKey(body), [body]);
  const words = wordCountOf(body);
  const readTime = calculateReadingTime(body);
  const topic = topicFor(post);
  const [linkCopied, flashLink] = useFlash(1800);

  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => (
        <Image
          src={urlForImage(value.asset?._ref ?? value)}
          width={1280}
          height={720}
          alt={value.alt || ""}
          className="my-2 rounded-2xl"
        />
      ),
      code: ({ value }) => (
        <CodeCard code={value.code} language={value.language} filename={value.filename} />
      ),
    },
    block: {
      h1: ({ children, value }) => (
        <h2
          id={idByKey.get(value._key ?? "")}
          className="mt-[26px] mb-0 scroll-mt-24 text-[clamp(26px,2.4vw,34px)] leading-[1.1] font-bold tracking-[-0.035em]"
        >
          {children}
        </h2>
      ),
      h2: ({ children, value }) => (
        <h2
          id={idByKey.get(value._key ?? "")}
          className="mt-[26px] mb-0 scroll-mt-24 text-[clamp(26px,2.4vw,34px)] leading-[1.1] font-bold tracking-[-0.035em]"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h2
          id={idByKey.get(value._key ?? "")}
          className="mt-[26px] mb-0 scroll-mt-24 text-[clamp(26px,2.4vw,34px)] leading-[1.1] font-bold tracking-[-0.035em]"
        >
          {children}
        </h2>
      ),
      normal: ({ children, value }) =>
        value._key === lead ? (
          <p className="text-ink m-0 text-[clamp(20px,1.7vw,23px)] leading-[1.6] [text-wrap:pretty]">
            {children}
          </p>
        ) : (
          <p className="text-muted m-0 text-lg leading-[1.75] [text-wrap:pretty]">{children}</p>
        ),
      blockquote: ({ children }) => (
        <blockquote className="si border-accent m-0 border-l-2 pl-5 text-[22px] leading-[1.4]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="text-muted m-0 ml-5 list-disc space-y-2 text-lg leading-[1.7]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="text-muted m-0 ml-5 list-decimal space-y-2 text-lg leading-[1.7]">
          {children}
        </ol>
      ),
    },
    marks: {
      code: ({ children }) => (
        <code className="bg-bg2 rounded px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
      ),
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-ink underline underline-offset-4"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <article id="top" className="wrap fadein flex flex-col gap-10 pt-[clamp(40px,5vw,72px)]">
      <Link href="/blog" className="pill self-start">
        <span aria-hidden="true">←</span>All writing
      </Link>

      <header className="border-line2 flex flex-col gap-7 border-b pb-9">
        <div className={`${MONO} flex flex-wrap items-center gap-x-[18px] gap-y-2.5`}>
          <span className="border-accent text-accent-ink rounded-full border px-2.5 py-[5px]">
            {topic}
          </span>
          <span>{formatDateShort(post.publishedAt)}</span>
          <span>{readTime} min read</span>
        </div>
        <h1
          className="m-0 max-w-[20ch] text-[clamp(42px,5.6vw,88px)] leading-[0.95] font-bold tracking-[-0.05em] [text-wrap:balance]"
          style={{ fontVariationSettings: "'opsz' 96" }}
        >
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex items-center gap-3.5">
            <span
              className="bg-disc relative h-[52px] w-[52px] flex-none overflow-hidden rounded-full"
              style={{ boxShadow: "inset 0 0 0 1.5px var(--disc-ring)" }}
            >
              <Portrait variant="avatar" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-base font-semibold">Ananyobrata Pal</span>
              <span className="text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
                Software Engineer @ rtCamp
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => copy(window.location.href).then(flashLink)}
              className={`pill font-mono text-[12.5px] font-normal ${linkCopied ? "border-accent" : ""}`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
              </svg>
              <span aria-live="polite">{linkCopied ? "Link copied" : "Copy link"}</span>
            </button>
            <a href={contact.social.rss} className="pill">
              Subscribe via RSS <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-wrap items-start gap-x-20 gap-y-12">
        <div className="flex max-w-[740px] min-w-0 flex-[999_1_600px] flex-col gap-[22px]">
          <PortableText value={body} components={components} />

          <div className="border-line2 mt-10 flex flex-col gap-6 border-t pt-8">
            <p className="si m-0 text-[32px] leading-[1.2]">Thanks for reading.</p>
            <p className="text-muted m-0 text-base leading-[1.6]">
              Disagree, or have a war story about this?{" "}
              <a
                href={`mailto:${contact.email}?subject=Re%3A%20${encodeURIComponent(post.title ?? "")}`}
                className="text-accent-ink"
              >
                Email me
              </a>{" "}
              — I read everything.
            </p>
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="lift border-line2 bg-surface text-ink flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-[20px] border px-7 py-6 no-underline"
              >
                <span className="flex flex-col gap-2">
                  <span className="eyebrow text-[11px] tracking-[0.12em]">
                    Next essay · {next.readTime} min read
                  </span>
                  <span className="text-2xl leading-[1.15] font-semibold tracking-[-0.03em]">
                    {next.title}
                  </span>
                </span>
                <span className="arrow text-[28px]" aria-hidden="true">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>

        <aside
          aria-label="In this essay"
          className="border-line2 bg-surface flex flex-[1_1_260px] flex-col gap-3.5 rounded-[20px] border p-6 lg:sticky lg:top-24"
        >
          <span className="eyebrow text-[11px] tracking-[0.14em]">In this essay</span>
          {headings.length > 0 ? (
            <nav aria-label="Sections" className="flex flex-col">
              {headings.map((h) => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="border-line text-muted hover:text-ink flex gap-3 border-t py-[9px] text-[14.5px] leading-[1.4] no-underline transition-colors"
                >
                  <span className="text-accent-ink pt-0.5 font-mono text-[11px]">{h.n}</span>
                  <span>{h.text}</span>
                </a>
              ))}
            </nav>
          ) : (
            <p className="text-muted m-0 text-sm">No sections — it&apos;s a straight read.</p>
          )}
          <span className="border-line text-muted border-t pt-1.5 font-mono text-[11px] tracking-[0.08em]">
            {words} words · {readTime} min read
          </span>
        </aside>
      </div>
    </article>
  );
}
