import skillCategories from "@data/skills.json";
import type { SkillCategory } from "@data/types";
import { CodeBrackets, GridFour, Server, Sparkles } from "@assets/icons";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <CodeBrackets size={16} />,
  Frameworks: <GridFour size={16} />,
  Infrastructure: <Server size={16} />,
  "Currently Exploring": <Sparkles size={16} />,
};

export default function Skills() {
  return (
    <section id="skills" className="px-5 py-16 sm:px-6 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <div className="mb-8 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
              <h2 className="text-text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Skills
              </h2>
              <span className="text-accent-warm hidden font-mono text-sm sm:block">04</span>
            </div>
          </StaggerItem>

          <div className="mt-8 flex flex-col">
            {skillCategories.map((category, index) => (
              <StaggerItem key={category.category}>
                <div
                  className={`group flex flex-col gap-3 py-5 sm:py-6 ${
                    index !== skillCategories.length - 1 ? "border-border-subtle border-b" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all duration-300 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
                        category.highlight
                          ? "bg-accent-warm/15 text-accent-warm"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {categoryIcons[category.category]}
                    </div>
                    <h3
                      className={`font-serif text-sm font-bold sm:text-base md:text-lg lg:text-xl ${
                        category.highlight ? "text-accent-warm" : "text-text-primary"
                      }`}
                    >
                      {category.category}
                    </h3>
                  </div>
                  <div className="text-text-muted flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm leading-relaxed sm:gap-x-2 sm:gap-y-1.5 sm:text-base">
                    {category.items.map((item, i) => (
                      <span key={item} className="flex items-center">
                        <span className="text-text-primary hover:text-accent-warm cursor-default font-medium transition-colors duration-200">
                          {item}
                        </span>
                        {i < category.items.length - 1 && (
                          <span className="text-border-subtle ml-1.5 sm:ml-2">·</span>
                        )}
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
