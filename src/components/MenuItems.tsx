import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const MenuItem = ({ title, linkname, toggleCallback, ...others }) => {
  const menuVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };
  return (
    <motion.li
      variants={menuVariants}
      className="mb-5 flex cursor-pointer items-center space-x-6"
    >
      <Link
        className="h-8 flex-1 px-4"
        activeClass="active"
        to={linkname}
        smooth={true}
        duration={500}
        onClick={toggleCallback}
      >
        <div className="flex items-center gap-10">
          <div className="scale-150">
            <others.icon />
          </div>
          <span className="text-xl uppercase">{title}</span>
        </div>
      </Link>
    </motion.li>
  );
};

export default MenuItem;
