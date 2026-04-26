import experiences from "@data/experience.json";
import type { Experience } from "@data/types";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Experience() {
  return (
    <section id="work" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-16 flex items-end justify-between">
              <h2 className="text-text-primary font-serif text-5xl font-bold tracking-tight md:text-6xl">
                Experience
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm md:block">02</span>
            </div>
          </StaggerItem>

          <div className="mt-12">
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.company}>
                <div
                  className={`relative py-8 pl-8 ${
                    index !== experiences.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  {/* Timeline dot + line */}
                  <div className="absolute top-9 left-0 flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-bg-primary)] ${
                        exp.current
                          ? "bg-accent-warm ring-accent-warm/40"
                          : "bg-border-subtle ring-border-subtle/30"
                      } transition-all duration-300`}
                    />
                    {index !== experiences.length - 1 && (
                      <div className="bg-border-subtle mt-2 h-full min-h-[80px] w-px transition-colors duration-300" />
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-text-primary font-serif text-xl font-bold md:text-2xl">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="bg-accent-warm rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-white uppercase">
                          Currently
                        </span>
                      )}
                    </div>
                    <div className="text-right md:text-right">
                      <p className="text-text-primary text-sm font-medium">{exp.role}</p>
                      <p className="text-text-muted font-mono text-xs">{exp.period}</p>
                    </div>
                  </div>
                  <p className="text-text-muted mt-4 max-w-3xl text-base leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-bg-cool text-text-primary hover:bg-accent-light hover:text-accent cursor-default rounded-full px-3 py-1 font-mono text-xs transition-colors"
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
