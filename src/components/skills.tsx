import skillCategories from "@data/skills.json";
import Eyebrow from "@components/eyebrow";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Skills() {
  return (
    <section id="skills" className="bg-bg-deep px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-14">
              <Eyebrow>Toolkit</Eyebrow>
              <h2 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-5xl">
                What I <em className="text-text-muted italic">reach for</em>.
              </h2>
            </div>
          </StaggerItem>

          <div className="flex flex-col">
            {skillCategories.map((category, index) => (
              <StaggerItem key={category.category}>
                <div
                  className={`flex flex-col gap-3 py-7 md:flex-row md:items-baseline md:gap-12 ${
                    index !== skillCategories.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  <span
                    className={`min-w-[220px] font-mono text-[11px] tracking-[0.18em] uppercase ${
                      category.highlight ? "text-accent" : "text-text-muted"
                    }`}
                  >
                    {category.category}
                  </span>
                  <p className="text-text-primary flex flex-wrap gap-x-2 gap-y-1 text-lg">
                    {category.items.map((item, i) => (
                      <span key={item}>
                        {item}
                        {i < category.items.length - 1 && (
                          <span className="text-border-subtle ml-2">·</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
