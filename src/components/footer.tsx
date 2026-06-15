import site from "@data/site.json";
import contact from "@data/contact.json";
import { Github, LinkedIn, Twitter, Email } from "@assets/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const links: [string, React.ReactNode, string][] = [
    [contact.social.github, <Github key="gh" size={16} />, "GitHub"],
    [contact.social.linkedin, <LinkedIn key="li" size={16} />, "LinkedIn"],
    [contact.social.twitter, <Twitter key="tw" size={16} />, "Twitter / X"],
    [`mailto:${contact.email}`, <Email key="em" size={16} />, "Email"],
  ];

  return (
    <footer className="border-border-subtle bg-bg-deep border-t px-6 py-10 md:px-8">
      <div className="text-text-muted mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[10.5px] tracking-[0.12em] uppercase md:flex-row">
        <span>
          {site.name} · {site.title}
        </span>
        <div className="flex items-center gap-5">
          {links.map(([href, icon, label]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-accent cursor-pointer transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
        <span>Built with intent · © {year}</span>
      </div>
    </footer>
  );
}
