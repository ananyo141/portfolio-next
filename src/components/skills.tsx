import skillCategories from "@data/skills.json";
import type { SkillCategory } from "@data/types";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-16 flex items-end justify-between">
              <h2 className="text-text-primary font-serif text-5xl font-bold tracking-tight md:text-6xl">
                Skills
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm md:block">04</span>
            </div>
          </StaggerItem>

          <div className="mt-12 flex flex-col">
            {skillCategories.map((category, index) => (
              <StaggerItem key={category.category}>
                <div
                  className={`group flex flex-col gap-3 py-6 md:flex-row md:items-baseline md:gap-12 ${
                    index !== skillCategories.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  <div className="flex min-w-[200px] items-center gap-3">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-bg-primary)] transition-all duration-300 ${
                        category.highlight
                          ? "bg-accent-warm ring-accent-warm/30"
                          : "bg-accent ring-accent/20 group-hover:ring-accent/40"
                      }`}
                    />
                    <h3
                      className={`font-serif text-xl font-bold transition-colors duration-300 md:text-2xl ${
                        category.highlight
                          ? "text-accent-warm"
                          : "text-text-primary group-hover:text-accent"
                      }`}
                    >
                      {category.category}
                    </h3>
                  </div>
                  <p className="text-text-muted text-base leading-relaxed">
                    {category.items.map((item, i) => (
                      <span key={item}>
                        <span className="text-text-primary hover:text-accent-warm cursor-default font-medium transition-colors duration-200">
                          {item}
                        </span>
                        {i < category.items.length - 1 && (
                          <span className="text-border-subtle mx-2">·</span>
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
