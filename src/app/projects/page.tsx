import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";

import ProjectsData from "@data/ProjectsData";
import TransitionEffect from "@components/TransitionEffect";

export const metadata = {
  title: "Portfolio - Projects",
  description: "Projects I have worked on",
};

const ProjectsSection = () => {
  return (
    <section id="Projects">
      <TransitionEffect />
      <div></div>
    </section>
  );
};

export default ProjectsSection;
