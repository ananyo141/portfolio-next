import { experiences } from "@data/experience";

export default function Experience() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          Experience
        </h2>
        <span className="hidden font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B] md:block">
          02
        </span>
      </div>

      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <div
            key={exp.company}
            className={`py-10 ${
              index !== experiences.length - 1 ? "border-b border-[#E0E0D8]" : ""
            }`}
          >
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div className="flex items-start gap-4">
                <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#111111] md:text-4xl">
                  {exp.company}
                </h3>
                {exp.current && (
                  <span className="mt-1.5 rounded-full bg-[#FF4D00] px-3 py-1 font-[family-name:var(--font-jetbrains)] text-xs text-white">
                    Currently
                  </span>
                )}
              </div>
              <div className="text-left md:text-right">
                <p className="font-[family-name:var(--font-inter)] text-base font-medium text-[#111111]">
                  {exp.role}
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B]">
                  {exp.period}
                </p>
              </div>
            </div>

            <p className="mb-6 max-w-3xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-[#6B6B6B]">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[family-name:var(--font-jetbrains)] text-xs tracking-wider text-[#6B6B6B] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
