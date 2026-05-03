import site from "@data/site.json";
import contact from "@data/contact.json";
import { Github, LinkedIn, Twitter, Email } from "@assets/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-accent-warm/40 border-t-2 px-5 py-10 sm:px-6 md:px-8 md:py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-text-muted font-mono text-xs">
            © {year} {site.name}
          </p>
          <p className="text-text-muted font-mono text-[10px] opacity-60">
            Built with Next.js + Tailwind + Sanity
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={contact.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href={contact.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
          >
            <LinkedIn size={18} />
          </a>
          <a
            href={contact.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
          >
            <Email size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
