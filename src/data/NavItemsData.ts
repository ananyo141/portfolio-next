import { GoHome, GoProject } from "react-icons/go";
import { MdOutlineContactSupport } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GrContactInfo, GrWorkshop } from "react-icons/gr";

// Navigation entries; have save section names
const NavItems = [
  { name: "Home", icon: <GoHome className="scale-150" /> },
  { name: "About", icon: <MdOutlineContactSupport className="scale-150" /> },
  { name: "Skills", icon: <GiSkills className="scale-150" /> },
  { name: "Experience", icon: <GrWorkshop className="scale-150" /> },
  { name: "Projects", icon: <GoProject className="scale-150" /> },
  { name: "Testimonials", icon: <GoHome className="scale-150" /> },
  { name: "Contact", icon: <GrContactInfo className="scale-150" /> },
];

export default NavItems;
