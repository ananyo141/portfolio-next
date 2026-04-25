import { skillCategories } from "@data/skills";
import { StaggerContainer, StaggerItem } from "./motion-wrapper";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <StaggerContainer>
          <StaggerItem>
            <h2 className="text-text-primary font-serif text-3xl font-bold md:text-5xl">Skills</h2>
          </StaggerItem>

          <div className="mt-12 flex flex-col gap-10">
            {skillCategories.map((category) => (
              <StaggerItem key={category.category}>
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-12">
                  <h3
                    className={`min-w-[200px] font-serif text-xl font-bold md:text-2xl ${
                      category.highlight ? "text-accent" : "text-text-primary"
                    }`}
                  >
                    {category.category}
                  </h3>
                  <p className="text-text-muted text-base leading-relaxed">
                    {category.items.join(" · ")}
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
