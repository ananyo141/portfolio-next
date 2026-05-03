import experiences from "@data/experience.json";
import type { Experience } from "@data/types";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Experience() {
  return (
    <section id="work" className="px-5 py-16 sm:px-6 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
              <h2 className="text-text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Experience
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm sm:block">02</span>
            </div>
          </StaggerItem>

          <div className="mt-8">
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.company}>
                <div
                  className={`relative py-6 pl-6 sm:pl-8 ${
                    index !== experiences.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  {/* Timeline dot + line */}
                  <div className="absolute top-7 left-0 flex flex-col items-center sm:top-9">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-bg-primary)] sm:h-3 sm:w-3 ${
                        exp.current
                          ? "bg-accent-warm ring-accent-warm/40"
                          : "bg-border-subtle ring-border-subtle/30"
                      } transition-all duration-300`}
                    />
                    {index !== experiences.length - 1 && (
                      <div className="bg-border-subtle mt-2 h-full min-h-[60px] w-px transition-colors duration-300 sm:min-h-[80px]" />
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="text-text-primary font-serif text-sm font-bold sm:text-base md:text-lg lg:text-xl">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="text-accent-warm border-accent-warm rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold tracking-wider sm:text-[10px]">
                          Currently
                        </span>
                      )}
                    </div>
                    <div className="text-left sm:text-right md:text-right">
                      <p className="text-text-primary text-xs font-medium sm:text-sm">{exp.role}</p>
                      <p className="text-text-muted font-mono text-xs">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-text-muted mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
                    {exp.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-bg-cool text-text-primary hover:bg-accent-light hover:text-accent cursor-default rounded-full px-2 py-0.5 font-mono text-[9px] transition-colors sm:px-2.5 sm:py-0.5 sm:text-[10px] md:px-3 md:py-1 md:text-xs"
                      >
                        {tag}
                      </span>
                    ))}
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
