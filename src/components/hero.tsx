"use client";

import { motion } from "framer-motion";
import Eyebrow from "@components/eyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-wash relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden px-6 py-32 md:px-8"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Eyebrow>Software Engineer · Kolkata, India</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-text-primary mt-7 max-w-[14ch] font-serif text-5xl leading-[0.98] font-[440] tracking-[-0.02em] md:text-7xl lg:text-8xl"
        >
          Building systems that{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">outlast</span>
            <span
              className="bg-accent absolute right-0 bottom-[0.05em] left-0 -z-0 h-[0.07em] w-full"
              aria-hidden="true"
            />
          </span>{" "}
          <em className="text-text-muted font-[430] italic">the hype</em>.
          <span className="text-accent-2 font-hand ml-3 inline-block rotate-[-7deg] text-3xl font-bold md:text-4xl">
            the long game ↗
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="text-text-muted mt-8 max-w-[48ch] text-lg leading-relaxed"
        >
          <span className="text-text-primary font-normal">
            Backend, distributed systems, and developer tooling.
          </span>{" "}
          I migrate 200+ legacy APIs, ship microservice video platforms, and build LLM-powered dev
          tools. Currently engineering at rtCamp.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() =>
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-accent cursor-pointer rounded-lg px-5 py-3 font-mono text-xs tracking-[0.1em] text-white uppercase shadow-[0_8px_30px_rgba(232,72,31,0.3)] transition-transform hover:-translate-y-0.5"
          >
            View selected work →
          </button>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-border-subtle text-text-primary hover:border-accent cursor-pointer rounded-lg border px-5 py-3 font-mono text-xs tracking-[0.06em] transition-colors"
          >
            Get in touch
          </button>
          <span className="text-text-muted flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase">
            <span className="h-[7px] w-[7px] rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
            Open to interesting problems
          </span>
        </motion.div>
      </div>
    </section>
  );
}
