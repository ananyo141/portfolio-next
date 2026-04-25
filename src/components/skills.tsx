import { skills } from "@data/skills";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          Skills
        </h2>
        <span className="hidden font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B] md:block">
          04
        </span>
      </div>

      <div className="flex flex-col gap-12">
        {skills.map((category) => (
          <div
            key={category.category}
            className="flex flex-col gap-4 md:flex-row md:items-baseline md:gap-16"
          >
            <h3 className="min-w-[200px] font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#111111] md:text-3xl">
              {category.category}
            </h3>
            <p className="font-[family-name:var(--font-jetbrains)] text-base leading-relaxed text-[#6B6B6B]">
              {category.items.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
