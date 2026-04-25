import { projects } from "@data/projects";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          Selected Work
        </h2>
        <span className="hidden font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B] md:block">
          01
        </span>
      </div>

      {/* Featured project */}
      {featured && (
        <div className="group mb-16">
          <div className="relative mb-6 aspect-[2/1] w-full overflow-hidden rounded-lg bg-[#E0E0D8]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
                Project Screenshot
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-jetbrains)] text-xs tracking-wider text-[#6B6B6B] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#111111] transition-colors group-hover:text-[#FF4D00] md:text-4xl">
                {featured.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-lg leading-relaxed text-[#6B6B6B]">
                {featured.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <div className="flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#E0E0D8] px-3 py-1 font-[family-name:var(--font-jetbrains)] text-xs text-[#111111]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {featured.github && (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-inter)] text-sm text-[#111111] transition-colors hover:text-[#FF4D00]"
                  >
                    GitHub →
                  </a>
                )}
                {featured.live && (
                  <a
                    href={featured.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-[family-name:var(--font-inter)] text-sm text-[#111111] transition-colors hover:text-[#FF4D00]"
                  >
                    Live →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular projects grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {regular.map((project) => (
          <div key={project.id} className="group">
            <div className="relative mb-4 aspect-[3/2] w-full overflow-hidden rounded-lg bg-[#E0E0D8]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
                  Screenshot
                </span>
              </div>
            </div>
            <div className="mb-2 flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[family-name:var(--font-jetbrains)] text-xs tracking-wider text-[#6B6B6B] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#111111] transition-colors group-hover:text-[#FF4D00]">
              {project.title}
            </h3>
            <p className="mb-4 font-[family-name:var(--font-inter)] text-base leading-relaxed text-[#6B6B6B]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#E0E0D8] px-3 py-1 font-[family-name:var(--font-jetbrains)] text-xs text-[#111111]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
