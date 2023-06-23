import { GoHome, GoProject } from "react-icons/go";
import { MdOutlineContactSupport } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { GrContactInfo, GrWorkshop } from "react-icons/gr";

// Navigation entries; have save section names
const NavItems = [
  { name: "Home", icon: GoHome },
  { name: "About", icon: MdOutlineContactSupport },
  { name: "Skills", icon: GiSkills },
  { name: "Experience", icon: GrWorkshop },
  { name: "Projects", icon: GoProject },
  { name: "Testimonials", icon: GoHome },
  { name: "Contact", icon: GrContactInfo },
];

export default NavItems;
