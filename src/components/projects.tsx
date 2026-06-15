import Link from "next/link";
import projects from "@data/projects.json";
import type { Project } from "@data/types";
import Eyebrow from "@components/eyebrow";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

function ProjectLinks({ github, live, youtube }: Pick<Project, "github" | "live" | "youtube">) {
  const items: [string | undefined, string][] = [
    [live, "Live"],
    [github, "Code"],
    [youtube, "Video"],
  ];
  return (
    <div className="mt-5 flex gap-4">
      {items.map(([href, label]) =>
        href ? (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link text-text-muted hover:text-accent inline-flex cursor-pointer items-center gap-1 font-mono text-xs transition-colors"
          >
            {label}
            <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
          </Link>
        ) : null
      )}
    </div>
  );
}

export default function Projects() {
  // featured first, then the rest, in declared order
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <section id="projects" className="bg-bg-primary px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-14 grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
              <div>
                <Eyebrow>Selected Work</Eyebrow>
                <h2 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-5xl">
                  Things I&apos;ve <em className="text-text-muted italic">shipped</em>.
                </h2>
              </div>
              <p className="text-text-muted text-[15px] leading-relaxed">
                A few projects that show how I think about scale, correctness, and the craft of
                building things that last.
              </p>
            </div>
          </StaggerItem>

          <div className="grid gap-5 md:grid-cols-3">
            {ordered.map((project, i) => (
              <StaggerItem key={project.id}>
                <div className="bg-surface border-border-subtle hover:border-accent/60 group flex h-full flex-col rounded-2xl border p-7 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                  <span className="numeral text-[80px]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-text-primary mt-4 font-sans text-xl font-medium">
                    {project.title}
                  </h3>
                  <p className="text-text-muted mt-3 flex-1 text-[13.5px] leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t, ti) => (
                      <span
                        key={t}
                        className={`rounded-md border px-2.5 py-1 font-mono text-[10.5px] ${
                          ti === 0
                            ? "border-accent/50 text-accent"
                            : "border-border-subtle text-text-muted"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <ProjectLinks
                    github={project.github}
                    live={project.live}
                    youtube={project.youtube}
                  />
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
