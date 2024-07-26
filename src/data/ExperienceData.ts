import { MdCrop, MdAndroid, MdAssignmentTurnedIn } from "react-icons/md";

export interface ExperienceType {
  icon: any;
  company: string;
  location: string;
  date: string;
  designation: string;
  description?: string[];
  techStack?: string[];
}

const ExperienceData: ExperienceType[] = [
  {
    icon: MdCrop,
    company: "HJ InfoTech",
    location: "Remote",
    date: "July 2022 - August 2022",
    designation: "Frontend Developer",
    description: [
      "Built the company landing website, deployed using Microsoft Azure",
      "Increased the website reach by 80% using Search Engine Optimisation (SEO).",
    ],
    techStack: ["WordPress", "Azure", "Semrush SEO"],
  },
  {
    icon: MdAndroid,
    company: "CipherSchools",
    location: "Remote",
    date: "May 2023",
    designation: "Full Stack Developer",
    description: [
      "Built a functional Digital Whiteboard with Undo/Redo , inserting shapes , export/reload features",
      "Worked on community backend to build scalable api services with micro-architecture design",
    ],
    techStack: ["ReactJS", "FabricJS", "NodeJS", "MongoDB", "ExpressJS"],
  },
  {
    icon: MdAssignmentTurnedIn,
    company: "Firebond",
    location: "Remote",
    date: "July 2023 - August 2023",
    designation: "Full Stack Engineer",
    description: [
      "Built the analytics dashboard for overview of user activity and engagement",
      "Worked on discord integration for user data collection and analysis",
      "Use custom Supabase queries for data storage and analysis",
    ],
    techStack: ["NextJS", "Supabase", "PostgreSQL", "Discord API"],
  },
  {
    icon: MdAssignmentTurnedIn,
    company: "Varlyq Technologies",
    location: "Remote",
    date: "May 2023 - January 2024",
    designation: "Backend Developer",
    description: [
      "Migrated 200+ apis from CORE PHP to Node + ExpressJS with TypeScript.",
      "Followed best practices and industrial conventions for scalable APIs ",
      "Deployed applications on DigitalOcean Servers, setup CI/CD with Render, Vercel.",
    ],
    techStack: ["ExpressJS", "MongoDB Aggregation", "Typescript"],
  },
  {
    icon: MdAssignmentTurnedIn,
    company: "ScalenowTech",
    location: "Remote",
    date: "July 2023 - June 2024",
    designation: "Full Stack Developer",
    description: [
      "Built the company landing website , deployed using DigitalOcean droplet",
      "Increased the website reach by 80% using best practices for Search Engine Optimisation (SEO) .",
    ],
    techStack: ["NextJS13", "ExpressJS", "Docker", "CI/CD", "Google Analytics"],
  },
  {
    icon: MdAssignmentTurnedIn,
    company: "rtCamp Solutions",
    location: "Remote / Hybrid",
    date: "July 2024 - Present",
    designation: "Software Engineer",
    description: [
      "Help the dynamic team to build scalable and maintainable applications",
    ],
    techStack: ["Python"],
  },
].reverse();

export default ExperienceData;
