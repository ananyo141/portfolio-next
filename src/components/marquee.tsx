"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@lib/use-reduced-motion";

const ITEMS = [
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "PostgreSQL",
  "Redis",
  "RabbitMQ",
  "Docker",
  "FastAPI",
  "Django",
  "Next.js",
  "LangChain",
];

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = track.current;
    if (!el || reduced) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const half = el.scrollWidth / 2 || 1;
        const x = (window.scrollY * 0.6) % half;
        el.style.transform = `translate3d(${(-x).toFixed(1)}px,0,0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <div aria-hidden="true" className="my-6 mb-2 overflow-x-clip">
      <div className="border-band-bg bg-band-bg text-band-fg scale-[1.02] -rotate-[1.2deg] overflow-hidden border-y">
        <div ref={track} className="flex w-max py-[18px] will-change-transform">
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-8 pr-8 text-[30px] font-bold tracking-[-0.03em] whitespace-nowrap"
            >
              {t}
              <span className="bg-band-dot h-2.5 w-2.5 rotate-45" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
