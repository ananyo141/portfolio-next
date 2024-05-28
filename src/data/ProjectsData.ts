import { StaticImageData } from "next/image";

import smartshala from "@assets/smartshala_project.jpg";
import vimero from "@assets/vimero_demo.png";
import computershop_project from "@assets/computershop_project.png";
import snappio_project from "@assets/snappio_project.png";
import calories_project from "@assets/calories_project.png";
import cipherschools_project from "@assets/cipherschools_project.png";
import fabric_project from "@assets/fabric_project.png";
import peermessage_project from "@assets/peermessage_project.png";
import jwtposts_project from "@assets/jwtposts_project.png";
import analytics_project from "@assets/analytics_api_project.png";
import code_grader_project from "@assets/code_grader.png";

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
    title: "Code Grader",
    techStack: ["Langchain", "Codellama LLM", "FastAPI",  "Next.js"],
    description:
      "A platform for grading and optimising user code submissions using Large Language models.",
    image: code_grader_project,
    github: "https://github.com/code-grader/backend",
    youtube: "https://youtu.be/CbBZT48CM-U",
  },
  {
    title: "Vimero",
    techStack: [
      "Next.js",
      "Golang",
      "Rust",
      "Node.js",
      "Redis",
      "RabbitMQ",
      "System Design",
    ],
    description:
      "A microservices application that shares user videos scalably.",
    image: vimero,
    github: "https://github.com/ananyo141/video-sharing-platform",
    demo: "https://vimero.vercel.app/",
    youtube: "https://youtu.be/DHSdUD67kjY",
  },
  {
    title: "Analytics API",
    techStack: ["Next.js", "Django Rest Framework", "Typescript", "Python"],
    description:
      "An admin panel dashboard for analytics of user activity and engagement.",
    image: analytics_project,
    github: "https://github.com/ananyo141/analytics-api",
    demo: "https://analytics-dashboard-frontend.vercel.app/",
    youtube: "https://www.youtube.com/watch?v=4kpaeNSYbLI",
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
    youtube: "https://www.youtube.com/watch?v=1uHAwhE77C0",
  },
  {
    title: "Snappio Backend",
    techStack: [
      "Django Rest Framework",
      "Django Channels",
      "Redis",
      "PostgreSQL",
    ],
    description: "A backend for a social media/chat application.",
    image: snappio_project,
    github: "https://github.com/Snappio/snappio_backend",
    demo: "https://api-snappio.onrender.com/docs/swagger/",
    youtube: "https://www.youtube.com/watch?v=judvqLhOCjs",
  },
  {
    title: "SmartShala (SIH 2022)",
    techStack: ["Flutter", "Dart"],
    description:
      "SmartShala is a mobile application that aims to automate the grading process using AI/ML to scan answer sheets and upload the results to teacher portal.",
    image: smartshala,
    github: "https://github.com/ananyo141/smartshala_frontend",
    youtube: "https://youtu.be/0cB1Lrw7DwQ",
  },
  {
    title: "Calories Tracker API",
    techStack: ["Django Rest Framework", "Nutritionix API"],
    description:
      "A REST API for tracking calories and macronutrients of food items via Natural Language Processing.",
    image: calories_project,
    github: "https://github.com/ananyo141/calories-api",
    demo: "https://api-calories-drf.vercel.app",
  },
  {
    title: "Cipherschools Profile Page",
    techStack: [
      "ReactJS",
      "Redux-Toolkit",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Typescript",
    ],
    description:
      "A clone of Cipherschools profile page with a backend for storing user data.",
    image: cipherschools_project,
    github: "https://github.com/ananyo141/cipherschools-profile-page",
    demo: "https://cipherschools-profile.vercel.app/",
  },
  {
    title: "Digital Whiteboard",
    techStack: ["ReactJS", "Fabric.js", "CSS", "Typescript"],
    description: "A digital whiteboard for drawing and writing.",
    image: fabric_project,
    github: "https://github.com/ananyo141/fabric-whiteboard",
    demo: "https://fabric-whiteboard.onrender.com/",
  },
  {
    title: "PeerMessaging",
    techStack: ["NextJS13", "PeerJS", "Redux-Toolkit", "Typescript"],
    description:
      "A completely decentralized peer to peer messaging and video-calling application.",
    image: peermessage_project,
    github: "https://github.com/ananyo141/PeerMessaging",
    demo: "https://peermessage.vercel.app/",
  },
  {
    title: "JWT Posts API",
    techStack: ["Node.js", "Express.js", "MongoDB", "Redis"],
    description: "A REST API for creating and fetching posts using JWT.",
    image: jwtposts_project,
    github: "https://github.com/ananyo141/jwt-posts-api/",
    demo: "https://api-jwtposts.onrender.com/api/v1/users/",
  },
];

export default ProjectsData;
