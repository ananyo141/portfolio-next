"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@data/nav-items";
import ThemeToggle from "@components/theme-toggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (!isHome) {
      router.push("/" + href);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="focus:bg-accent sr-only cursor-pointer focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <nav
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bg-primary/90 shadow-sm backdrop-blur-md"
            : "bg-bg-primary/80 backdrop-blur-sm md:bg-transparent md:shadow-none md:backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-6 md:px-8 md:py-4">
          {/* Monogram */}
          <Link
            href="/"
            className="bg-accent ring-accent/20 hover:ring-accent-warm/40 flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm font-bold text-white ring-2 transition-all duration-300 hover:scale-110"
          >
            A
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative cursor-pointer text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-accent after:bg-accent after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full"
                    : "text-text-primary hover:text-accent"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="border-border-subtle border-l pl-6">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={`bg-text-primary block h-0.5 w-6 transition-transform duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`bg-text-primary block h-0.5 w-6 transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`bg-text-primary block h-0.5 w-6 transition-transform duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="bg-bg-primary fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-6 cursor-pointer font-mono text-2xl"
            aria-label="Close menu"
          >
            ✕
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-text-primary hover:text-accent cursor-pointer font-serif text-2xl transition-colors sm:text-3xl"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
