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
    <div className="flex gap-4">
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:text-accent cursor-pointer text-sm transition-colors"
        >
          GitHub →
        </Link>
      )}
      {live && (
        <Link
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:text-accent cursor-pointer text-sm transition-colors"
        >
          Live →
        </Link>
      )}
      {youtube && (
        <Link
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:text-accent cursor-pointer text-sm transition-colors"
        >
          Video →
        </Link>
      )}
    </div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-16 flex items-end justify-between">
              <h2 className="text-text-primary font-serif text-5xl font-bold tracking-tight md:text-6xl">
                Selected Work
              </h2>
              <span className="text-accent hidden font-mono text-sm md:block">
                01
              </span>
            </div>
          </StaggerItem>

          {/* Featured project */}
          {featured && (
            <StaggerItem className="mb-16">
              <div className="group">
                <a
                  href={featured.github || featured.live || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <div className="bg-surface border-border-subtle mb-6 aspect-[2/1] w-full overflow-hidden rounded-lg border p-2 shadow-sm">
                    <div className="relative h-full w-full overflow-hidden rounded">
                      {featured.image ? (
                        <Image
                          src={featured.image}
                          alt={featured.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1200px) 100vw, 1200px"
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
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-2xl">
                    <div className="mb-3 flex gap-3">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent-light text-accent rounded-full px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase"
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
                      <h3 className="text-text-primary group-hover:text-accent mb-3 font-serif text-3xl font-bold transition-colors md:text-4xl">
                        {featured.title}
                      </h3>
                    </a>
                    <p className="text-text-muted text-lg leading-relaxed">
                      {featured.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 md:items-end">
                    <div className="flex flex-wrap gap-2">
                      {featured.tech.map((t) => (
                        <span
                          key={t}
                          className="bg-bg-cool text-text-primary rounded-full px-3 py-1 font-mono text-xs"
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
          <div className="grid gap-8 md:grid-cols-2">
            {regular.map((project) => (
              <StaggerItem key={project.id}>
                <div className="group">
                  <a
                    href={project.github || project.live || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer"
                  >
                  <div className="bg-surface border-border-subtle mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg border p-2 shadow-sm">
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
                          <span className="text-text-muted font-mono text-sm">
                            Screenshot
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  </a>
                  <div className="mb-2 flex gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-accent-light text-accent rounded-full px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase"
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
                    <h3 className="text-text-primary group-hover:text-accent mb-2 font-serif text-2xl font-bold transition-colors">
                      {project.title}
                    </h3>
                  </a>
                  <p className="text-text-muted mb-4 text-base leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-bg-cool text-text-primary rounded-full px-3 py-1 font-mono text-xs"
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
