import skillCategories from "@data/skills.json";

export default function Skills() {
  const rows = skillCategories.filter((c) => !c.highlight);
  const exploring = skillCategories.find((c) => c.highlight);
  return (
    <aside id="stack" aria-label="Stack" className="flex flex-[1_1_340px] flex-col gap-7">
      <span className="eyebrow">[05] Stack</span>
      {rows.map((c) => (
        <div key={c.category} className="border-line flex flex-col gap-2.5 border-b pb-[22px]">
          <span className="text-muted font-mono text-[11px] tracking-[0.12em] uppercase">
            {c.category}
          </span>
          <span className="text-xl leading-[1.45] font-medium tracking-[-0.02em]">
            {c.items.join(", ")}
          </span>
        </div>
      ))}
      {exploring && (
        <div className="border-accent flex flex-col gap-3 rounded-[18px] border px-6 py-[22px]">
          <span className="eyebrow flex items-center gap-2 text-[11px] tracking-[0.12em]">
            <span className="pulse bg-accent h-[7px] w-[7px] rounded-full" />
            {exploring.category}
          </span>
          <span className="si text-[30px] leading-[1.15]">{exploring.items.join(", ")}</span>
        </div>
      )}
    </aside>
  );
}
