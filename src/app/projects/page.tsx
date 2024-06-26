"use client";

import React from "react";
import { motion } from "framer-motion";

import ProjectsData from "@data/ProjectsData";
import TransitionEffect from "@components/TransitionEffect";
import ProjectTile from "./ProjectTile";

const ProjectsSection = () => {
  return (
    <section
      id="Projects"
      className="flex min-h-screen flex-col items-center bg-gradient-to-r from-gray-200 to-pink-200 pb-8 pt-20"
    >
      <TransitionEffect />
      <h1 className="mb-12 border-b-4 border-red-600 text-center text-4xl font-bold text-[#231123]">
        Projects
      </h1>
      <div className="flex flex-col items-center">
        <motion.div
          transition={{ staggerChildren: 1, delayChildren: 2 }}
          className="flex flex-col items-center divide-y divide-red-300 md:items-start"
        >
          {ProjectsData.map((project, index) => (
            <motion.div
              key={`projectsection-${index}`}
              onClick={() =>
                window
                  .open(project.youtube ?? project.github, "_blank")
                  ?.focus()
              }
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <ProjectTile
                className="my-8 cursor-pointer duration-300 hover:scale-105"
                {...project}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
