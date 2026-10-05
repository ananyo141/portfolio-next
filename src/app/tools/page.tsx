import { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@components/eyebrow";
import site from "@data/site.json";

const tools = [
  {
    title: "JWT Inspector",
    href: "/tools/jwt-inspector",
    description:
      "Decode JWT headers and payloads locally in the browser while debugging authentication flows.",
    meta: "Client-side utility",
  },
];

export const metadata: Metadata = {
  title: `Tools | ${site.name}`,
  description: "Small developer utilities built to make debugging easier.",
};

export default function ToolsPage() {
  return (
    <div className="bg-bg-primary min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <Eyebrow>Tools</Eyebrow>
            <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
              Small utilities for <em className="text-text-muted italic">debugging faster</em>.
            </h1>
          </div>
          <p className="text-text-muted max-w-xl text-[15px] leading-relaxed md:justify-self-end">
            Practical browser-side tools for inspecting data, checking assumptions, and removing a
            little friction from day-to-day debugging.
          </p>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-2" aria-label="Developer tools">
          {tools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-surface border-border-subtle group rounded-2xl border p-7 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
            >
              <span className="numeral text-[72px]">{String(index + 1).padStart(2, "0")}</span>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <h2 className="text-text-primary font-sans text-xl font-medium">{tool.title}</h2>
                <span className="border-border-subtle text-text-muted rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
                  {tool.meta}
                </span>
              </div>
              <p className="text-text-muted mt-3 text-[14px] leading-relaxed">{tool.description}</p>
              <span className="text-accent mt-6 inline-block font-mono text-[11px] tracking-[0.16em] uppercase group-hover:underline">
                Open tool
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
