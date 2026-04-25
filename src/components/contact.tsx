export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-[#111111] md:text-6xl">
          Contact
        </h2>
        <span className="hidden font-[family-name:var(--font-jetbrains)] text-sm text-[#6B6B6B] md:block">
          05
        </span>
      </div>

      <div className="max-w-4xl">
        <p className="mb-12 font-[family-name:var(--font-playfair)] text-3xl leading-tight font-semibold text-[#111111] md:text-5xl">
          Let&apos;s think out loud together.
        </p>

        <a
          href="mailto:hello@example.com"
          className="mb-16 inline-block font-[family-name:var(--font-playfair)] text-2xl text-[#FF4D00] hover:underline md:text-4xl"
        >
          hello@example.com
        </a>

        <div className="flex gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-[family-name:var(--font-inter)] text-sm text-[#6B6B6B] transition-colors hover:text-[#111111]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-[family-name:var(--font-inter)] text-sm text-[#6B6B6B] transition-colors hover:text-[#111111]"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="font-[family-name:var(--font-inter)] text-sm text-[#6B6B6B] transition-colors hover:text-[#111111]"
          >
            Twitter
          </a>
          <a
            href="/feed.xml"
            aria-label="RSS Feed"
            className="font-[family-name:var(--font-inter)] text-sm text-[#6B6B6B] transition-colors hover:text-[#111111]"
          >
            RSS
          </a>
        </div>
      </div>
    </section>
  );
}
