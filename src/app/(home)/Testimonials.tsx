"use client";

import React from "react";
import { motion } from "framer-motion";

import ImageCard from "@components/ImageCard";

import TestmonialsData from "@data/TestmonialsData";

const Testimonials = () => {
  const itemVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="Testimonials"
      className="mb-14 flex h-fit flex-col items-center justify-center text-gray-700"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h3 className="mb-5 border-b-4 border-pink-500 pb-2 text-3xl font-bold text-[#ccd6f6]">
          Testimonials
        </h3>
        <p className="mb-6 pb-2 font-light text-gray-300 md:mb-12 md:pb-0">
          Let&apos;s see what my colleagues and mentors say about me
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-center">
        {TestmonialsData.map((testmObj, i) => (
          <motion.div
            key={`testmonial-${testmObj.name}`}
            initial={{ x: 220, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
            }}
          >
            <ImageCard
              key={`testmonial-${testmObj.name}`}
              image={testmObj.image}
              name={testmObj.name}
              text={testmObj.text}
              designation={testmObj.designation}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
