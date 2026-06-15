export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-text-muted flex items-center gap-3.5 font-mono text-[11px] tracking-[0.22em] uppercase ${className}`}
    >
      <span className="bg-accent inline-block h-px w-[34px]" aria-hidden="true" />
      {children}
    </span>
  );
}
