"use client";

import { useEffect, useState } from "react";

export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function useCountUp(
  targets: number[],
  { enabled, delay = 650, duration = 1800 }: { enabled: boolean; delay?: number; duration?: number }
): number[] {
  const [values, setValues] = useState(() => targets.map(() => 0));

  useEffect(() => {
    if (!enabled) {
      setValues(targets);
      return;
    }
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const k = easeOutExpo(Math.min(1, (ts - t0) / duration));
      setValues(targets.map((v) => Math.round(v * k)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // targets is a static literal at the call site; intentionally not a dependency
  }, [enabled, delay, duration]);

  return values;
}
