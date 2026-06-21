import Link from "next/link";
import projects from "@data/projects.json";
import type { Project } from "@data/types";
import Eyebrow from "@components/eyebrow";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

function ProjectLinks({
  project,
  compact = false,
}: {
  project: Pick<Project, "id" | "caseStudy" | "github" | "live" | "youtube">;
  compact?: boolean;
}) {
  const items: [string | undefined, string, boolean][] = [
    [project.caseStudy ? `/projects/${project.id}` : undefined, "Case study", false],
    [project.live, "Live", true],
    [project.github, "Code", true],
    [project.youtube, "Video", true],
  ];
  return (
    <div className={`${compact ? "mt-3" : "mt-6"} flex flex-wrap gap-4`}>
      {items.map(([href, label, external]) =>
        href ? (
          <Link
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
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
  const selectedProjects = (projects as Project[]).filter((project) => !project.archived);
  const archivedProjects = (projects as Project[]).filter((project) => project.archived);

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

          <div className="grid gap-5 lg:grid-cols-2">
            {selectedProjects.map((project, i) => (
              <StaggerItem key={project.id}>
                <article className="bg-surface border-border-subtle hover:border-accent/60 group flex h-full flex-col rounded-2xl border p-7 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 md:p-8 dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      {project.role && (
                        <p className="text-accent font-mono text-[10.5px] tracking-[0.16em] uppercase">
                          {project.role}
                        </p>
                      )}
                      <h3 className="text-text-primary mt-4 font-serif text-2xl font-[440] tracking-[-0.01em]">
                        {project.title}
                      </h3>
                    </div>
                    <span className="numeral text-[72px] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-text-muted mt-4 text-[14px] leading-relaxed">
                    {project.description}
                  </p>

                  {project.highlight && (
                    <p className="border-border-subtle text-text-primary mt-5 border-l pl-4 font-serif text-xl leading-snug font-[440]">
                      {project.highlight}
                    </p>
                  )}

                  {project.evidence?.length ? (
                    <ul className="mt-5 space-y-2">
                      {project.evidence.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="text-text-muted flex gap-3 text-[13.5px] leading-relaxed"
                        >
                          <span className="bg-accent mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t, ti) => (
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
                  <ProjectLinks project={project} />
                </article>
              </StaggerItem>
            ))}
          </div>

          {archivedProjects.length > 0 && (
            <StaggerItem className="mt-16">
              <div className="border-border-subtle border-t pt-8">
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-text-muted font-mono text-[11px] tracking-[0.18em] uppercase">
                      Archive
                    </p>
                    <h3 className="text-text-primary mt-2 font-serif text-2xl font-[440]">
                      Earlier builds and experiments.
                    </h3>
                  </div>
                  <p className="text-text-muted max-w-xl text-[13.5px] leading-relaxed">
                    Smaller projects kept compact so the proof-heavy work stays in focus.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {archivedProjects.map((project) => (
                    <article
                      key={project.id}
                      className="border-border-subtle bg-surface/60 rounded-xl border p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-text-primary font-sans text-base font-medium">
                            {project.title}
                          </h4>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="border-border-subtle text-text-muted rounded-md border px-2 py-0.5 font-mono text-[10px]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ProjectLinks project={project} compact />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
