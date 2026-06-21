import { Metadata } from "next";
import Eyebrow from "@components/eyebrow";
import site from "@data/site.json";

const principles = [
  {
    title: "Boring technology beats clever infrastructure",
    body: "Reach for tools the team can operate on a bad day. A queue, a relational model, a cache, or a cron job only earns its place when its failure modes are understandable.",
  },
  {
    title: "Make failure visible",
    body: "Silent failure is the expensive kind. I prefer explicit errors, retry boundaries, useful logs, and dashboards that show where the system is hurting before users have to explain it.",
  },
  {
    title: "Prefer small interfaces",
    body: "Small interfaces force decisions into the open. They make services easier to test, replace, document, and reason about when the implementation inevitably changes.",
  },
  {
    title: "Measure before optimizing",
    body: "Performance work starts with evidence. I would rather remove one measured bottleneck than add five speculative abstractions that make the system harder to understand.",
  },
  {
    title: "Automate the sharp edges",
    body: "The best automation removes recurring risk: formatting, builds, deployment checks, migrations, and scripts that keep dangerous manual steps from becoming folklore.",
  },
  {
    title: "Write down tradeoffs",
    body: "A decision record is a gift to the next person. Capturing what was chosen, what was rejected, and why makes future changes less political and more technical.",
  },
];

export const metadata: Metadata = {
  title: `Principles | ${site.name}`,
  description: "Engineering principles for building backend systems, tools, and reliable software.",
};

export default function PrinciplesPage() {
  return (
    <div className="bg-bg-primary min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <Eyebrow>Principles</Eyebrow>
            <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
              Defaults for building <em className="text-text-muted italic">software that lasts</em>.
            </h1>
          </div>
          <p className="text-text-muted max-w-xl text-[15px] leading-relaxed md:justify-self-end">
            These are the working rules I come back to when designing systems, debugging incidents,
            and deciding whether a new abstraction is worth its operational cost.
          </p>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-2" aria-label="Engineering principles">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="bg-surface border-border-subtle rounded-2xl border p-7 shadow-[0_18px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
            >
              <span className="numeral text-[72px]">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="text-text-primary mt-4 font-sans text-xl font-medium">
                {principle.title}
              </h2>
              <p className="text-text-muted mt-3 text-[14px] leading-relaxed">{principle.body}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
