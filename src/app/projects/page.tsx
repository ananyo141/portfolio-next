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
    <section id="Projects" className="mt-20 min-h-screen">
      <TransitionEffect />
      <h1 className="text-center text-4xl mb-12 font-bold">Projects</h1>
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
