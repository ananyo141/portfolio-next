import site from "@data/site.json";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border-subtle border-t px-6 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
        <p className="text-text-muted font-mono text-xs">© {year} {site.name}</p>
        <p className="text-text-muted font-mono text-xs">Built with Next.js + Tailwind + Sanity</p>
      </div>
    </footer>
  );
}
