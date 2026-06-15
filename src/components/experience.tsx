import experiences from "@data/experience.json";
import Eyebrow from "@components/eyebrow";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Experience() {
  return (
    <section id="work" className="bg-bg-deep px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-14 grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
              <div>
                <Eyebrow>Experience</Eyebrow>
                <h2 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-5xl">
                  Where I&apos;ve <em className="text-text-muted italic">built</em>.
                </h2>
              </div>
              <p className="text-text-muted text-[15px] leading-relaxed">
                Backend and full-stack roles across distributed teams — from legacy migrations to
                scalable platforms.
              </p>
            </div>
          </StaggerItem>

          <div>
            {experiences.map((exp, index) => (
              <StaggerItem key={exp.company}>
                <div
                  className={`grid gap-4 py-8 md:grid-cols-[200px_1fr] ${
                    index !== experiences.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  <div>
                    <p className="text-text-muted font-mono text-xs tracking-[0.08em]">
                      {exp.period}
                    </p>
                    {exp.current && (
                      <span className="text-accent border-accent/50 mt-2 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider">
                        Current
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-text-primary font-serif text-2xl font-[440]">
                      {exp.role}
                      <span className="text-text-muted"> · {exp.company}</span>
                    </h3>
                    <p className="text-text-muted mt-3 max-w-3xl text-[15px] leading-relaxed">
                      {exp.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border-border-subtle text-text-muted rounded-md border px-2.5 py-1 font-mono text-[10.5px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
