"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ChevronDown } from "@assets/icons";
import { HeroGeometric } from "@assets/graphics";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[75dvh] flex-col justify-center overflow-hidden px-5 pt-24 pb-12 sm:min-h-[calc(100dvh-4rem)] sm:justify-end sm:px-6 sm:pt-32 sm:pb-16 md:px-8"
    >
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="hero-gradient-mesh absolute inset-0" />
      </div>

      {/* Subtle dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #7c3aed 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-end justify-between">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-accent mb-4 font-mono text-xs tracking-widest uppercase sm:mb-6 sm:text-sm"
          >
            Ananyobrata Pal — <span className="text-accent-warm">Software Engineer</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-primary mb-4 max-w-4xl font-serif text-3xl leading-[1.1] font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            Building systems that{" "}
            <span className="text-accent-warm relative inline-block">
              <span className="relative z-10">outlast the hype</span>
              <span
                className="bg-accent-warm absolute -bottom-1 left-0 -z-0 h-[0.6em] w-full -rotate-1 rounded-sm opacity-20"
                aria-hidden="true"
              />
            </span>{" "}
            cycles.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-muted max-w-xl text-base leading-relaxed sm:text-lg"
          >
            <div className="mb-2 text-sm sm:text-base">
              Senior software engineer focused on{" "}
              {mounted && (
                <span className="text-accent inline-block min-w-[120px] font-mono text-xs sm:min-w-[180px] sm:text-sm">
                  <Typewriter
                    options={{
                      strings: [
                        "distributed systems",
                        "developer experience",
                        "software craft",
                        "scalable architecture",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                      cursor: "|",
                    }}
                  />
                </span>
              )}
            </div>
            <p>and the long game of building things that last.</p>
          </motion.div>
        </div>

        {/* Abstract geometric decoration — desktop only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none hidden lg:block"
          aria-hidden="true"
        >
          <HeroGeometric className="opacity-30" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-8"
      >
        <span className="text-text-muted font-mono text-[8px] tracking-widest uppercase opacity-60 sm:text-[10px]">
          Scroll
        </span>
        <motion.button
          onClick={() =>
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
          }
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
          aria-label="Scroll to projects"
        >
          <ChevronDown size={16} className="sm:h-5 sm:w-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
