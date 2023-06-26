import { StaticImageData } from "next/image";

import smartshala from "@assets/smartshala_project.jpg";
import computershop_project from "@assets/computershop_project.png";
import snappio_project from "@assets/snappio_project.png";

export interface ProjectType {
  title: string;
  description: string;
  techStack: string[];
  image: string | StaticImageData;
  github: string;
  demo?: string;
  youtube?: string;
}

const ProjectsData: ProjectType[] = [
  {
    title: "SmartShala (SIH 2022)",
    techStack: ["Flutter"],
    description:
      "SmartShala is a mobile application that aims to automate the grading process using AI/ML to scan answer sheets and upload the results to teacher portal.",
    image: smartshala,
    github: "https://github.com/ananyo141/smartshala_frontend",
    youtube: "https://youtu.be/0cB1Lrw7DwQ",
  },
  {
    title: "Computer Shop",
    techStack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux-Toolkit",
      "Typescript",
    ],
    description: "A full stack e-commerce web application for a computer shop.",
    image: computershop_project,
    github: "https://github.com/ananyo141/ComputerShop",
    demo: "https://computershop-frontend.vercel.app/",
  },
  {
    title: "Snappio Backend",
    techStack: ["Django", "Django Rest Framework", "Django Channels", "PostgreSQL"],
    description: "A backend for a social media/chat application.",
    image: snappio_project,
    github: "https://github.com/Snappio/snappio_backend",
    demo: "https://api-snappio.onrender.com/docs/swagger/",
  },
];

export default ProjectsData;
