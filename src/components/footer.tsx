export default function Footer() {
  return (
    <footer className="border-t border-[#E0E0D8]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-12">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[#6B6B6B]">
          © {new Date().getFullYear()} Built with Next.js, TypeScript, and curiosity.
        </p>
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[#6B6B6B]">
          No tracking. No cookies. Just words.
        </p>
      </div>
    </footer>
  );
}
