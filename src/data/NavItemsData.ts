import { GoHome, GoProject } from "react-icons/go";
import { GrContactInfo } from "react-icons/gr";

// Navigation entries; have save section names
const NavItems = [
  { name: "Home", icon: GoHome, route: "/home" },
  { name: "Projects", icon: GoProject, route: "/projects" },
  { name: "Contact", icon: GrContactInfo, route: "/contact" },
];

export default NavItems;
