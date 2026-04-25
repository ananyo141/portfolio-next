import { experiences } from "@data/experience";
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
                  className={`py-8 ${
                    index !== experiences.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-text-primary font-serif text-xl font-bold md:text-2xl">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="bg-accent rounded-full px-2.5 py-0.5 font-mono text-xs font-medium text-white">
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
                      <span key={tag} className="text-text-muted font-mono text-xs">
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
