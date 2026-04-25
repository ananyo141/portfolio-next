import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 font-[family-name:var(--font-jetbrains)] text-sm tracking-widest text-[#6B6B6B] uppercase">
        404
      </p>
      <h1 className="mb-6 font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#111111] md:text-6xl">
        Page not found
      </h1>
      <p className="mb-8 max-w-md font-[family-name:var(--font-inter)] text-lg text-[#6B6B6B]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-base text-[#FF4D00] hover:underline"
      >
        <span>←</span>
        Back home
      </Link>
    </div>
  );
}
