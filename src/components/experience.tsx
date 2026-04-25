import experiences from "@data/experience.json";
import type { Experience } from "@data/types";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Experience() {
  return (
    <section id="work" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <h2 className="text-text-primary font-serif text-3xl font-bold md:text-5xl">
              Experience
            </h2>
          </StaggerItem>

          <div className="mt-12">
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.company}>
                <div
                  className={`relative py-8 pl-6 ${
                    index !== experiences.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute top-10 left-0 flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        exp.current ? "bg-accent" : "bg-border-subtle"
                      }`}
                    />
                    {index !== experiences.length - 1 && (
                      <div className="bg-border-subtle mt-1 h-full min-h-[60px] w-px" />
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-text-primary font-serif text-xl font-bold md:text-2xl">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="bg-accent-warm-light text-accent-warm rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold">
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
                        className="bg-bg-cool text-text-muted rounded-full px-2.5 py-0.5 font-mono text-xs"
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
