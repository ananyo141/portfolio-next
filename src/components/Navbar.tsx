"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { motion, useCycle } from "framer-motion";

// Navigation entries; have save section names
import NavItems from "@data/NavItemsData";
import logo from "@assets/logo.png";
import MenuItem from "./MenuItems";

// Top navigation bar for larger displays
const Navtopbar = () => {
  const path = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-50 hidden w-full items-center justify-between bg-transparent px-2 py-2 backdrop-blur-md md:flex">
      <Link href="/">
        <Image
          src={logo}
          className="ml-4 w-40 cursor-pointer backdrop-blur-3xl"
          alt="Logo"
        />
      </Link>
      <ul
        className={
          "flex justify-between pr-8 text-lg sm:space-x-4 md:space-x-6 lg:space-x-12 " +
          (path === "/projects" ? "text-gray-600" : "text-[#ccd6f6]")
        }
      >
        {NavItems.map((item) => (
          <Link key={`navtopitem_${item.name}`} href={item.route}>
            <li
              className={
                "cursor-pointer" +
                (path === item.route && ` border-b-2 border-b-red-500`)
              }
            >
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

// Side navigation bar for mobile view
// https://www.youtube.com/watch?v=qppZVzJB8oA
const Navsidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  // Animation for sidebar
  const sideVariants = {
    open: {
      clipPath: `circle(1000px at 40px 40px)`,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      clipPath: `circle(30px at 40px 40px)`,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Animation for each menu item
  const listVariants = {
    open: {
      transition: { staggerChildren: 0.05 },
    },
    closed: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  return (
    <>
      <RxHamburgerMenu
        className="fixed z-50 -ml-3 mt-2 scale-150 cursor-pointer text-white backdrop-blur md:hidden"
        onClick={() => toggleOpen()}
      />
      <motion.nav
        variants={sideVariants}
        animate={isOpen ? "open" : "closed"}
        className="fixed bottom-0 left-0 top-0 z-50 w-full bg-gray-200 sm:w-[300px] md:hidden"
      >
        <RxCross1
          className="ml-7 mt-6 scale-150 cursor-pointer"
          onClick={() => toggleOpen()}
        />
        <div className="flex h-full flex-col items-center justify-center sm:h-auto sm:items-start">
          <Image src={logo} alt="logo" className="mt-4 scale-75" />
          <div>
            <motion.ul
              variants={listVariants}
              className="mt-5 w-full p-5 sm:w-[260px]"
            >
              {NavItems.map((item) => (
                <MenuItem
                  key={`navsideitem_${item.name}`}
                  icon={item.icon}
                  title={item.name}
                  linkname={item.route}
                  toggleCallback={toggleOpen}
                />
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

// Main navbar
const Navbar = () => {
  return (
    <section>
      <Navsidebar />
      <Navtopbar />
    </section>
  );
};

export default Navbar;
