import { Metadata } from "next";
import Eyebrow from "@components/eyebrow";
import site from "@data/site.json";

const uses = [
  {
    title: "Editor",
    body: "I keep the editor setup boring: fast project search, TypeScript feedback, formatting on command, and enough keyboard flow to move between code, notes, and terminal without drama.",
  },
  {
    title: "Terminal",
    body: "zsh on macOS, with small aliases and scripts for the commands I actually repeat. The goal is less ceremony around checks, builds, and local debugging.",
  },
  {
    title: "Languages",
    body: "TypeScript and JavaScript are the default for this site and most web-facing work. I prefer typed boundaries and plain data shapes when code has to survive handoffs.",
  },
  {
    title: "Local development",
    body: "This portfolio is a Next.js App Router project with npm scripts for development, builds, and formatting. I keep static pages static unless a runtime dependency earns its keep.",
  },
  {
    title: "Deployment",
    body: "I favor simple release paths: build locally, keep configuration explicit, and make deploy-time assumptions visible. Static-first pages reduce the number of things that can fail at request time.",
  },
  {
    title: "AI/dev workflow",
    body: "I use AI as a pair for codebase search, review, refactors, and first-pass drafts, but keep the source of truth in tests, builds, docs, and local verification.",
  },
];

export const metadata: Metadata = {
  title: `Uses | ${site.name}`,
  description: "A modest overview of the tools and workflow preferences behind this portfolio.",
};

export default function UsesPage() {
  return (
    <div className="bg-bg-primary min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <Eyebrow>Uses</Eyebrow>
            <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
              Tools I keep <em className="text-text-muted italic">close to the work</em>.
            </h1>
          </div>
          <p className="text-text-muted max-w-xl text-[15px] leading-relaxed md:justify-self-end">
            A practical snapshot of my development defaults. Nothing exotic here: the setup is meant
            to make code easier to inspect, change, verify, and ship.
          </p>
        </section>

        <section
          className="bg-surface border-border-subtle mt-16 rounded-2xl border px-6 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.06)] md:px-8 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
          aria-label="Tools and workflow"
        >
          {uses.map((item, index) => (
            <article
              key={item.title}
              className={`grid gap-4 py-8 md:grid-cols-[180px_1fr] md:gap-10 ${
                index !== uses.length - 1 ? "border-border-subtle border-b" : ""
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span className="text-accent font-mono text-[11px] tracking-[0.18em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
                  {item.title}
                </h2>
              </div>
              <p className="text-text-muted text-[15px] leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
