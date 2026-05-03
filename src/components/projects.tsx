import Image from "next/image";
import Link from "next/link";
import projects from "@data/projects.json";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

function ProjectLinks({
  github,
  live,
  youtube,
}: {
  github?: string;
  live?: string;
  youtube?: string;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link bg-accent-warm hover:bg-accent-warm/90 inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium text-white transition-all sm:px-3 sm:py-1 sm:text-xs"
        >
          GitHub
          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
            →
          </span>
        </Link>
      )}
      {live && (
        <Link
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link text-text-primary hover:text-accent-warm inline-flex cursor-pointer items-center gap-1 text-xs transition-colors sm:text-sm"
        >
          Live
          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
            →
          </span>
        </Link>
      )}
      {youtube && (
        <Link
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link text-text-primary hover:text-accent-warm inline-flex cursor-pointer items-center gap-1 text-xs transition-colors sm:text-sm"
        >
          Video
          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
            →
          </span>
        </Link>
      )}
    </div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-5 py-16 sm:px-6 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
              <h2 className="text-text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Selected Work
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm sm:block">01</span>
            </div>
          </StaggerItem>

          {/* Featured project */}
          {featured && (
            <StaggerItem className="mb-12">
              <div className="group">
                <a
                  href={featured.github || featured.live || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <div className="bg-surface border-border-subtle group-hover:border-accent/30 group-hover:shadow-accent/10 mb-6 aspect-video w-full overflow-hidden rounded-lg border p-2 shadow-sm transition-all duration-500 group-hover:shadow-xl md:aspect-[2/1]">
                    <div className="relative h-full w-full overflow-hidden rounded">
                      {featured.image ? (
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          loading="eager"
                          priority
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-text-muted font-mono text-sm">
                            Project Screenshot
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </a>
                <div className="flex flex-col gap-4">
                  <div className="max-w-2xl">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent-light text-accent rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase sm:px-2.5 sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={featured.github || featured.live || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block cursor-pointer"
                    >
                      <h3 className="text-text-primary mb-2 font-serif text-lg font-bold transition-all duration-300 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] sm:mb-3 sm:text-xl md:text-2xl lg:text-3xl">
                        {featured.title}
                      </h3>
                    </a>
                    <p className="text-text-muted text-sm leading-relaxed sm:text-base">
                      {featured.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {featured.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-bg-cool text-text-primary rounded-full px-2 py-0.5 font-mono text-[10px] sm:px-3 sm:py-1 sm:text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <ProjectLinks
                      github={featured.github}
                      live={featured.live}
                      youtube={featured.youtube}
                    />
                  </div>
                </div>
              </div>
            </StaggerItem>
          )}

          {/* Regular projects grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {regular.map((project) => (
              <StaggerItem key={project.id}>
                <div className="group">
                  <a
                    href={project.github || project.live || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                    <div className="bg-surface border-border-subtle group-hover:border-accent/30 group-hover:shadow-accent/10 mb-4 aspect-video w-full overflow-hidden rounded-lg border p-2 shadow-sm transition-all duration-500 group-hover:shadow-xl sm:aspect-[3/2]">
                      <div className="relative h-full w-full overflow-hidden rounded">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-text-muted font-mono text-sm">Screenshot</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-accent-light text-accent rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase sm:px-2.5 sm:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github || project.live || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block cursor-pointer"
                  >
                    <h3 className="text-text-primary mb-1 font-serif text-base font-bold transition-all duration-300 group-hover:drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] sm:mb-2 sm:text-lg md:text-xl">
                      {project.title}
                    </h3>
                  </a>
                  <p className="text-text-muted mb-4 text-sm leading-relaxed sm:text-base">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-bg-cool text-text-primary rounded-full px-2 py-0.5 font-mono text-[10px] sm:px-3 sm:py-1 sm:text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <ProjectLinks
                      github={project.github}
                      live={project.live}
                      youtube={project.youtube}
                    />
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
