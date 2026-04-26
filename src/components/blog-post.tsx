"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { urlForImage } from "@/sanity/lib/image";
import { formatDate, calculateReadingTime } from "@lib/utils";

interface BlogPostProps {
  post: any;
}

const PortableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => (
      <div className="my-8">
        <Image
          src={urlForImage(value.asset._ref)}
          width={1280}
          height={720}
          alt={value.alt || "Blog image"}
          className="rounded-lg"
        />
      </div>
    ),
    code: ({ value }: { value: any }) => (
      <div className="relative my-6">
        <SyntaxHighlighter
          showLineNumbers
          customStyle={{ marginBottom: 0, borderRadius: "0.5rem" }}
          style={nightOwl}
          language={value.language || "text"}
        >
          {value.code}
        </SyntaxHighlighter>
        <button
          onClick={() => navigator.clipboard.writeText(value.code)}
          className="absolute top-2 right-3 cursor-pointer rounded-md bg-[#1e1e1e] px-2 py-1 font-mono text-xs text-gray-300 transition-colors hover:bg-[#333]"
        >
          Copy
        </button>
      </div>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-text-primary mt-10 mb-4 font-serif text-2xl font-bold md:text-3xl">
        {children}
      </h2>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-text-primary mt-10 mb-4 font-serif text-2xl font-bold md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-text-primary mt-8 mb-3 font-serif text-xl font-bold md:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-text-primary mb-5 text-base leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-accent text-text-muted my-6 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="text-text-primary mb-5 ml-5 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="text-text-primary mb-5 ml-5 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

export default function BlogPost({ post }: BlogPostProps) {
  const readTime = calculateReadingTime(post.body || []);

  return (
    <article className="mx-auto max-w-3xl">
      <header>
        <h1 className="text-accent-warm font-serif text-3xl font-bold md:text-5xl">{post.title}</h1>
        <div className="text-text-muted mt-4 flex items-center gap-3 font-mono text-xs">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>
        {post.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="border-border-subtle text-text-muted rounded-full border px-2.5 py-0.5 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose-custom mt-10">
        <PortableText value={post.body} components={PortableTextComponents} />
      </div>

      <div className="border-border-subtle mt-16 border-t pt-8">
        <Link
          href="/blog"
          className="text-text-primary hover:text-accent-warm cursor-pointer font-mono text-sm underline underline-offset-4 transition-colors"
        >
          ← Back to writing
        </Link>
      </div>
    </article>
  );
}
