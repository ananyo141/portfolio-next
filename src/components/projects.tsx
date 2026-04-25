import Link from "next/link";
import { projects } from "@data/projects";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <h2 className="text-text-primary font-serif text-3xl font-bold md:text-5xl">
              Selected Work
            </h2>
          </StaggerItem>

          {/* Featured project */}
          {featured && (
            <StaggerItem className="mt-12">
              <div className="group border-border-subtle relative rounded-lg border bg-white/50 p-6 transition-shadow hover:shadow-lg md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <span className="text-accent font-mono text-xs tracking-wider uppercase">
                      {featured.tags.join(" · ")}
                    </span>
                    <h3 className="text-text-primary group-hover:text-accent mt-2 font-serif text-2xl font-bold transition-colors md:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="text-text-muted mt-3 max-w-xl text-base leading-relaxed">
                      {featured.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featured.tech.map((t) => (
                        <span
                          key={t}
                          className="border-border-subtle text-text-muted rounded-full border px-3 py-1 font-mono text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-4">
                      {featured.github && (
                        <Link
                          href={featured.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:text-accent font-mono text-sm underline underline-offset-4 transition-colors"
                        >
                          GitHub →
                        </Link>
                      )}
                      {featured.live && (
                        <Link
                          href={featured.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-primary hover:text-accent font-mono text-sm underline underline-offset-4 transition-colors"
                        >
                          Live →
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* Placeholder screenshot */}
                  <div className="mt-4 md:mt-0 md:w-80">
                    <div className="bg-border-subtle flex aspect-video items-center justify-center rounded-md">
                      <span className="text-text-muted font-mono text-xs">
                        Screenshot placeholder
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          )}

          {/* Regular projects grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {regular.map((project) => (
              <StaggerItem key={project.id}>
                <div className="group border-border-subtle flex h-full flex-col rounded-lg border bg-white/50 p-6 transition-shadow hover:shadow-md">
                  <span className="text-accent font-mono text-xs tracking-wider uppercase">
                    {project.tags.join(" · ")}
                  </span>
                  <h3 className="text-text-primary group-hover:text-accent mt-2 font-serif text-xl font-bold transition-colors md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="text-text-muted mt-2 line-clamp-2 flex-1 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="border-border-subtle text-text-muted rounded-full border px-2.5 py-0.5 font-mono text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-4">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-accent font-mono text-xs underline underline-offset-4 transition-colors"
                      >
                        GitHub →
                      </Link>
                    )}
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-accent font-mono text-xs underline underline-offset-4 transition-colors"
                      >
                        Live →
                      </Link>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
