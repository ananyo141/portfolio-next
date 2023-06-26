import React from "react";

import ProjectsData from "@data/ProjectsData";
import TransitionEffect from "@components/TransitionEffect";
import ProjectTile from "./ProjectTile";

export const metadata = {
  title: "Portfolio - Projects",
  description: "Projects I have worked on",
};

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
        <div className="flex flex-col items-start gap-10">
          {ProjectsData.map((project) => (
            <ProjectTile
              key={`project-${project.title}`}
              {...project}
              className=""
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
