import { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@components/eyebrow";
import projects from "@data/projects.json";
import site from "@data/site.json";
import type { Project } from "@data/types";

const caseStudies = (projects as Project[]).filter((project) => project.caseStudy);

export const metadata: Metadata = {
  title: `Case Studies | ${site.name}`,
  description:
    "System-focused case studies for backend, realtime, data, and developer tooling work.",
};

export default function ProjectsIndexPage() {
  return (
    <div className="bg-bg-primary min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <Eyebrow>Case Studies</Eyebrow>
            <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
              System notes from <em className="text-text-muted italic">selected work</em>.
            </h1>
          </div>
          <p className="text-text-muted max-w-xl text-[15px] leading-relaxed md:justify-self-end">
            Deeper writeups for the projects with enough architecture, constraints, and tradeoffs to
            show how the system was shaped.
          </p>
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-2" aria-label="Project case studies">
          {caseStudies.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-surface border-border-subtle hover:border-accent/60 group rounded-2xl border p-7 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 md:p-8 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  {project.role && (
                    <p className="text-accent font-mono text-[10.5px] tracking-[0.16em] uppercase">
                      {project.role}
                    </p>
                  )}
                  <h2 className="text-text-primary group-hover:text-accent mt-4 font-serif text-2xl font-[440] tracking-[-0.01em] transition-colors">
                    {project.title}
                  </h2>
                </div>
                <span className="numeral text-[72px] leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              {project.highlight && (
                <p className="text-text-muted mt-5 text-[14px] leading-relaxed">
                  {project.highlight}
                </p>
              )}
              <span className="text-text-primary group-hover:text-accent mt-6 inline-flex items-center gap-1 font-mono text-xs tracking-[0.08em] uppercase transition-colors">
                Read case study
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
