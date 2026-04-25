"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Work", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-[#E0E0D8] bg-[#F5F5F0]/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-tight text-[#111111]"
          >
            AE
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-[family-name:var(--font-inter)] text-sm tracking-wide transition-colors ${
                  activeSection === link.href
                    ? "text-[#FF4D00]"
                    : "text-[#6B6B6B] hover:text-[#111111]"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#FF4D00]" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-[2px] w-6 bg-[#111111]" />
            <span className="block h-[2px] w-6 bg-[#111111]" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[#F5F5F0] md:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 p-2"
            aria-label="Close menu"
          >
            <span className="block h-[2px] w-8 translate-y-[1px] rotate-45 bg-[#111111]" />
            <span className="block h-[2px] w-8 -translate-y-[1px] -rotate-45 bg-[#111111]" />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-playfair)] text-4xl text-[#111111] transition-colors hover:text-[#FF4D00]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
