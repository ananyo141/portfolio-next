"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-end overflow-hidden px-6 pt-32 pb-16 md:px-8"
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

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-accent mb-6 font-mono text-sm tracking-widest uppercase"
        >
          Ananyobrata Pal — <span className="text-accent-warm">Software Engineer</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-text-primary mb-8 max-w-4xl font-serif text-5xl leading-[1.1] font-bold tracking-tight md:text-7xl lg:text-8xl"
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
          className="text-text-muted max-w-xl text-lg leading-relaxed"
        >
          <div className="mb-2">
            Senior software engineer focused on{" "}
            {mounted && (
              <span className="text-accent inline-block min-w-[180px] font-mono text-sm">
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-text-muted font-mono text-[10px] tracking-widest uppercase opacity-60">
          Scroll
        </span>
        <motion.button
          onClick={() =>
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
          }
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-text-muted hover:text-accent-warm cursor-pointer transition-colors"
          aria-label="Scroll to projects"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
