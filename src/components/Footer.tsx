import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <a href="#">
            <img
              className="h-7 w-auto"
              src="https://merakiui.com/images/full-logo.svg"
              alt=""
            />
          </a>
          <p className="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-center">
            <button className="order-1 mt-3 flex w-full transform items-center justify-center rounded-md border px-2 py-2 text-sm capitalize tracking-wide text-gray-600 transition-colors duration-300 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-800 sm:mx-2 sm:mt-0 sm:w-auto">
              <svg
                className="mx-1 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z"
                  fill="currentColor"
                />
              </svg>
              <span className="mx-1">View Demo</span>
            </button>
            <button className="w-full transform rounded-md bg-blue-600 px-5 py-2 text-sm capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:order-2 sm:mx-2 sm:w-auto">
              Get started
            </button>
          </div>
        </div>
        <hr className="my-10 border-gray-200 dark:border-gray-700" />
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">
            © Copyright 2023 - Present. All Rights Reserved.
          </p>
          <div className="-mx-2 mt-3 flex sm:mt-0">
            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Teams{" "}
            </a>
            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Privacy{" "}
            </a>
            <a
              href="#"
              className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Cookies{" "}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
