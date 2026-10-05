"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { homeSections, type SectionId } from "@data/nav-items";
import ThemeToggle from "@components/theme-toggle";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");
  const [active, setActive] = useState<SectionId | "">("");
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, window.scrollY / max));
        if (barRef.current) barRef.current.style.width = `${(p * 100).toFixed(1)}%`;
        if (!isHome) return;
        let current: SectionId | "" = "";
        for (const s of homeSections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = s.id;
        }
        setActive((prev) => (prev === current ? prev : current));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  const links: { label: string; href: string; on: boolean }[] = isHome
    ? homeSections.map((s) => ({ label: s.label, href: `#${s.id}`, on: active === s.id }))
    : [
        { label: "Home", href: "/", on: false },
        { label: "Work", href: "/#work", on: false },
        { label: "Experience", href: "/#experience", on: false },
        { label: "Writing", href: "/blog", on: isBlog },
      ];

  return (
    <header className="border-line bg-nav sticky top-0 z-20 border-b backdrop-blur-[14px]">
      <a
        href="#main-content"
        className="focus:bg-accent focus:text-on-accent sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-3.5"
      >
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="bg-accent text-on-accent flex h-10 w-10 items-center justify-center rounded-[10px] text-[17px] font-extrabold tracking-[-0.04em]">
            ap
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold tracking-[-0.01em]">Ananyobrata Pal</span>
            <span className="text-muted font-mono text-[10.5px] tracking-[0.12em] uppercase">
              Software Engineer
            </span>
          </span>
        </Link>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-6 gap-y-1 text-sm md:order-none md:w-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.on ? "true" : undefined}
              className={`hover:text-ink flex min-h-11 items-center gap-[7px] no-underline transition-colors ${
                l.on ? "text-ink" : "text-muted"
              }`}
            >
              <span
                aria-hidden="true"
                className={`bg-accent h-1.5 w-1.5 rounded-full transition-opacity ${
                  l.on ? "opacity-100" : "opacity-0"
                }`}
              />
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a href={isHome ? "#contact" : "/#contact"} className="pill pill-solid h-11 px-5 text-sm">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
      <div
        ref={barRef}
        aria-hidden="true"
        className="bg-accent absolute bottom-[-1px] left-0 h-0.5 transition-[width] duration-100 ease-linear"
        style={{ width: "0%" }}
      />
    </header>
  );
}
