"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import site from "@data/site.json";
import contact from "@data/contact.json";

const links: [string, string][] = [
  ["/projects", "Case studies"],
  ["/uses", "Uses"],
  ["/tools", "Tools"],
  ["/blog", "Blog"],
];

export default function Footer() {
  const isHome = usePathname() === "/";
  const year = new Date().getFullYear();
  return (
    <footer
      className={`border-line bg-bg2 border-t ${isHome ? "inv" : "mt-[clamp(80px,9vw,128px)]"}`}
    >
      <div className="wrap text-muted flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-4 text-[13.5px]">
        <span className="font-mono text-[11.5px] tracking-[0.08em]">
          © {year} {site.name} — Next.js on Vercel
        </span>
        <div className="tap-row flex flex-wrap items-center gap-x-6">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-accent-ink no-underline">
              {label}
            </Link>
          ))}
          <a href={contact.social.rss} className="hover:text-accent-ink no-underline">
            RSS
          </a>
          <a href="#top" className="text-ink no-underline">
            Back to top ↑
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="overflow-hidden px-[clamp(12px,2vw,24px)] leading-[0.74]">
        <span className="outline-num block translate-y-[14%] text-[clamp(80px,15.4vw,236px)] font-extrabold tracking-[-0.065em] whitespace-nowrap">
          ananyobrata
        </span>
      </div>
    </footer>
  );
}
