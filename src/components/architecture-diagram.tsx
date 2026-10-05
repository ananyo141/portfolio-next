interface ArchitectureDiagramProps {
  nodes: string[];
  edges: string[];
}

export default function ArchitectureDiagram({ nodes, edges }: ArchitectureDiagramProps) {
  return (
    <div className="bg-bg-deep border-border-subtle rounded-2xl border p-5 md:p-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {nodes.map((node, index) => (
          <div
            key={node}
            className="bg-surface border-border-subtle rounded-xl border px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          >
            <span className="text-accent font-mono text-[10px] tracking-[0.18em] uppercase">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-text-primary mt-2 font-mono text-[12px] leading-relaxed">{node}</p>
          </div>
        ))}
      </div>

      <div className="border-border-subtle mt-5 space-y-2 border-t pt-5">
        {edges.map((edge) => (
          <p
            key={edge}
            className="text-text-muted flex gap-3 font-mono text-[11px] leading-relaxed"
          >
            <span className="text-accent" aria-hidden="true">
              →
            </span>
            <span>{edge}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
