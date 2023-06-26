import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlinePlayCircle } from "react-icons/md";

import robotImg from "@assets/robot.gif";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Image
            className="h-20 w-auto rounded-full bg-blue-700"
            src={robotImg}
            alt="Robot banging head"
          />
          <p className="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400">
            Striving to build a better world, one line of code at a time.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-center">
            <button className="order-1 mt-3 flex w-full transform items-center justify-center rounded-md border border-gray-400 px-2 py-2 text-sm capitalize tracking-wide text-gray-600 transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 sm:mx-2 sm:mt-0 sm:w-auto">
              <MdOutlinePlayCircle className="mx-1 h-5 w-5" />
              <Link href="/projects" className="mx-1">Explore Projects</Link>
            </button>
            <button className="w-full transform rounded-md bg-blue-600 px-5 py-2 text-sm capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:order-2 sm:mx-2 sm:w-auto">
              <Link href="/contact">
              Contact Me
              </Link>
            </button>
          </div>
        </div>
        <hr className="my-10 border-gray-300 dark:border-gray-700" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            © Copyright 2023 - Present. All Rights Reserved.
          </p>
          <div className="-mx-2 mt-3 flex sm:mt-0">
            <Link
              href="https://github.com/ananyo141"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Github"
              target="_blank"
            >
              {" "}
              Github{" "}
            </Link>
            <Link
              href="https://www.linkedin.com/in/ananyobrata-pal-7b5178200/"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="LinkedIn"
              target="_blank"
            >
              {" "}
              LinkedIn{" "}
            </Link>
            <Link
              href="https://leetcode.com/ananyo141/"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Leetcode"
              target="_blank"
            >
              {" "}
              Leetcode{" "}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
