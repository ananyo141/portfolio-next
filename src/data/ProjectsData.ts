import smartshala from "../assets/smartshala_project.jpg";
import computershop_project from "../assets/computershop_project.png";
import snappio_project from "../assets/snappio_project.png";

const ProjectsData = [
  {
    title: "SmartShala (Flutter - SIH 2022)",
    description:
      "SmartShala is a mobile application that aims to automate the grading process using AI/ML to scan answer sheets and upload the results to teacher portal.",
    image: smartshala,
    ghlink: "https://github.com/ananyo141/smartshala_frontend",
    demolink: "https://youtu.be/0cB1Lrw7DwQ",
  },
  {
    title: "Computer Shop (MERN Stack)",
    description: "A full stack e-commerce web application for a computer shop.",
    image: computershop_project,
    ghlink: "https://github.com/ananyo141/ComputerShop",
    demolink: "https://computershop-frontend.onrender.com/",
  },
  {
    title: "Snappio Backend (Django Rest Framework, Channels)",
    description: "A backend for a social media/chat application.",
    image: snappio_project,
    ghlink: "https://github.com/Snappio/snappio_backend",
    demolink: "https://api-snappio.onrender.com/docs/swagger/",
  },
];

export default ProjectsData;
