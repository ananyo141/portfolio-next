"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Portrait from "@components/portrait";
import { useReducedMotion } from "@lib/use-reduced-motion";
import { useCountUp } from "@lib/use-count-up";
import { clockNote, kolkataClock } from "@lib/time";

const WORDS = ["the hype.", "the rewrite.", "the pager.", "the trend.", "the framework."];
const STATS: [number, string, string][] = [
  [200, "+", "Legacy APIs moved from PHP to TypeScript"],
  [80, "%", "Organic reach lift from technical SEO"],
  [4, "", "Case studies with live walkthroughs"],
];

function useFitHeadline(
  h1Ref: React.RefObject<HTMLHeadingElement | null>,
  measureRef: React.RefObject<HTMLSpanElement | null>
) {
  const [fit, setFit] = useState<{ px: number | null; wrap: boolean }>({
    px: null,
    wrap: false,
  });
  useLayoutEffect(() => {
    const run = () => {
      const h1 = h1Ref.current;
      const m = measureRef.current;
      if (!h1 || !m) return;
      const avail = h1.clientWidth;
      const w = m.getBoundingClientRect().width;
      if (!avail || !w) return;
      let px = Math.min(156, ((100 * avail) / w) * 0.97);
      let wrap = false;
      if (px < 40) {
        px = 40;
        wrap = true;
      }
      setFit((prev) =>
        prev.px !== null && Math.abs(px - prev.px) <= 0.5 && prev.wrap === wrap
          ? prev
          : { px, wrap }
      );
    };
    run();
    const ro = new ResizeObserver(run);
    if (h1Ref.current) ro.observe(h1Ref.current);
    document.fonts?.ready.then(run);
    const t = setTimeout(run, 400);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [h1Ref, measureRef]);
  return fit;
}

interface ParallaxRefs {
  section: React.RefObject<HTMLElement | null>;
  grid: React.RefObject<HTMLDivElement | null>;
  eyebrow: React.RefObject<HTMLDivElement | null>;
  figure: React.RefObject<HTMLDivElement | null>;
  band: React.RefObject<HTMLSpanElement | null>;
}

/**
 * Scroll-linked hero motion over the first viewport only:
 * grid drifts at 0.6x (same reference speed as the marquee), portrait at 0.9x with a
 * slight scale-down, eyebrow fades, the headline underline unwinds, the sticker peels.
 * Transforms/opacity only, written straight to the DOM from one rAF.
 */
function useHeroParallax(refs: ParallaxRefs, reduced: boolean) {
  useEffect(() => {
    const { section, grid, eyebrow, figure, band } = refs;
    const els = [grid.current, eyebrow.current, figure.current, band.current];
    const reset = () => {
      for (const el of els) {
        if (!el) continue;
        el.style.transform = "";
        el.style.opacity = "";
        el.style.animation = "";
      }
      figure.current?.style.removeProperty("--peel");
      figure.current?.style.removeProperty("--peel-scale");
    };
    if (reduced) {
      reset();
      return;
    }
    let raf = 0;
    let last = -1;
    let scrubbing = false;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sec = section.current;
        if (!sec) return;
        const h = sec.offsetHeight || 1;
        const y = Math.min(window.scrollY, h);
        const p = Math.min(1, Math.max(0, y / h));
        if (p === 1 && last === 1) return; // hero is off-screen; stop writing
        last = p;
        if (grid.current)
          grid.current.style.transform = `translate3d(0, ${(y * 0.4).toFixed(1)}px, 0)`;
        if (figure.current) {
          figure.current.style.transform = `translate3d(0, ${(y * 0.1).toFixed(1)}px, 0) scale(${(1 - 0.06 * p).toFixed(3)})`;
          figure.current.style.setProperty("--peel", `${(-10 * p).toFixed(2)}deg`);
          figure.current.style.setProperty("--peel-scale", (1 - 0.08 * p).toFixed(3));
        }
        if (eyebrow.current) eyebrow.current.style.opacity = Math.max(0, 1 - 1.6 * p).toFixed(3);
        if (band.current) {
          // Hand control from the entrance animation to the scroll position the first time we move.
          if (!scrubbing && y > 0) {
            scrubbing = true;
            band.current.style.animation = "none";
          }
          if (scrubbing) {
            band.current.style.transform = `rotate(-2deg) scaleX(${Math.max(0, 1 - 1.4 * p).toFixed(3)})`;
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // refs are stable objects; only the reduced-motion flag matters
  }, [reduced]);
}

export default function Hero() {
  const reduced = useReducedMotion();
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLSpanElement>(null);
  useHeroParallax(
    { section: sectionRef, grid: gridRef, eyebrow: eyebrowRef, figure: figureRef, band: bandRef },
    reduced
  );
  const measureRef = useRef<HTMLSpanElement>(null);
  const fit = useFitHeadline(h1Ref, measureRef);

  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, [reduced]);

  const [clock, setClock] = useState<{ clock: string; hour: number } | null>(null);
  useEffect(() => {
    const tick = () => setClock(kolkataClock(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  const stats = useCountUp(
    STATS.map(([v]) => v),
    { enabled: !reduced }
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden"
    >
      <div
        ref={gridRef}
        className="grid-bg pointer-events-none absolute inset-x-0 top-[-40%] bottom-0 will-change-transform"
        aria-hidden="true"
      />
      <div className="wrap relative flex flex-1 flex-col justify-center gap-14 py-[clamp(32px,4vw,64px)]">
        {/* headline + portrait */}
        <div className="flex flex-wrap items-end gap-12">
          <div className="flex min-w-0 flex-[999_1_640px] flex-col gap-7">
            {/* eyebrow row (wrapper is the parallax target; inner div keeps the entrance) */}
            <div ref={eyebrowRef}>
              <div className="rise text-muted flex flex-wrap items-center gap-x-7 gap-y-2.5 font-mono text-[11.5px] tracking-[0.14em] uppercase">
                <span className="text-ink flex items-center gap-2.5">
                  <span className="pulse bg-accent h-2 w-2 rounded-full" />
                  Open to interesting problems
                </span>
                <span>Backend · Distributed systems · Dev tooling</span>
                <span>
                  Kolkata <span className="text-ink">{clock?.clock ?? "--:--"} IST</span> —{" "}
                  {clock ? clockNote(clock.hour) : "probably shipping"}
                </span>
              </div>
            </div>
            <h1
              ref={h1Ref}
              aria-label="Systems that outlast the hype."
              className="rise d1 relative m-0 min-w-0 font-bold tracking-[-0.055em]"
              style={{
                fontSize: fit.px ? `${fit.px.toFixed(1)}px` : "clamp(48px, 7.2vw, 112px)",
                lineHeight: 0.86,
                fontVariationSettings: "'opsz' 96",
              }}
            >
              <span
                aria-hidden="true"
                className="block"
                style={{ whiteSpace: fit.wrap ? "normal" : "nowrap" }}
              >
                Systems that{" "}
                <span className="si text-accent relative [isolation:isolate] inline-block text-[1.08em] tracking-[-0.03em]">
                  outlast
                  <span ref={bandRef} className="hl-band" aria-hidden="true" />
                </span>
              </span>
              <span
                ref={measureRef}
                aria-hidden="true"
                className="pointer-events-none invisible absolute top-0 left-0 whitespace-nowrap"
                style={{ fontSize: 100 }}
              >
                Systems that <span className="si text-[1.08em] tracking-[-0.03em]">outlast</span>
              </span>
              <span aria-hidden="true" className="block min-h-[0.9em] whitespace-nowrap">
                <span key={wordIdx} className={reduced ? "" : "swap"}>
                  {WORDS[wordIdx]}
                </span>
              </span>
            </h1>
          </div>

          <div ref={figureRef} className="max-w-[300px] flex-[1_1_260px] will-change-transform">
            <figure className="portrait-figure rise d3 m-0 flex w-full flex-col gap-3.5">
              <div className="relative w-full">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "1 / 1.12", borderRadius: "0 0 50% 50% / 0 0 44.6% 44.6%" }}
                >
                  <div
                    aria-hidden="true"
                    className="bg-disc absolute right-0 bottom-0 left-0 aspect-square rounded-full transition-colors duration-[600ms]"
                    style={{ boxShadow: "inset 0 0 0 1.5px var(--disc-ring)" }}
                  />
                  <Portrait variant="hero" />
                </div>
                <button
                  type="button"
                  className="sticker si bg-ink text-bg absolute right-[-14px] bottom-[12%] min-h-11 rounded-full border-0 px-4 pt-1.5 pb-2 text-[21px] whitespace-nowrap"
                  aria-label="Friendly neighbourhood engineer"
                >
                  <span aria-hidden="true" className="not-italic">
                    🤖
                  </span>
                  <span className="sticker-text" aria-hidden="true">
                    friendly neighbourhood engineer
                  </span>
                  <span aria-hidden="true" className="ml-1.5">
                    ↗
                  </span>
                </button>
              </div>
              <figcaption className="border-line2 text-muted flex justify-between gap-3 border-t pt-2.5 font-mono text-[10.5px] tracking-[0.12em] uppercase">
                <span>Fig. 01</span>
                <span>Engineer, mid-thought</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* intro + stats */}
        <div className="flex flex-wrap items-start justify-between gap-x-16 gap-y-10">
          <div className="rise d4 flex max-w-[560px] flex-[1_1_440px] flex-col gap-8">
            <p className="text-muted m-0 text-[clamp(18px,1.5vw,21px)] leading-[1.5] [text-wrap:pretty]">
              <span className="text-ink">Backend, distributed systems and developer tooling.</span>{" "}
              I&apos;ve migrated 200+ legacy APIs, shipped a microservice video platform and built
              LLM-powered dev tools. Currently engineering at rtCamp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="pill pill-solid h-[52px] px-[26px] text-[15px]">
                Read case studies <span aria-hidden="true">→</span>
              </Link>
              <a href="#shell" className="pill h-[52px] px-[22px] text-[15px]">
                <span className="text-accent-ink font-mono text-[13px]">&gt;_</span>Try the shell
              </a>
            </div>
          </div>

          <dl className="rise d5 border-line2 m-0 grid max-w-[640px] flex-[1_1_520px] grid-cols-[repeat(auto-fit,minmax(min(170px,100%),1fr))] border-t">
            {STATS.map(([, suffix, label], i) => (
              <div key={label} className="flex flex-col gap-2 pt-5 pr-5 last:pr-0">
                <dt className="text-muted order-2 font-mono text-[11px] leading-[1.5] tracking-[0.1em] uppercase">
                  {label}
                </dt>
                <dd className="order-1 m-0 text-[56px] leading-none font-semibold tracking-[-0.05em]">
                  {i === 2 ? String(stats[i]).padStart(2, "0") : stats[i]}
                  {suffix && <span className="text-accent">{suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
