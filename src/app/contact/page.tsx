import React from "react";
import Image from "next/image";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";

import astranautImg from "@assets/astronaut.svg";

const PaddedInputField = ({ name, type, placeholder }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="rounded-xl border bg-white/10 p-4"
    />
  );
};

const Contact = () => {
  return (
    <div
      id="Contact"
      className="flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-r from-[#0a192f] to-blue-900 px-2 py-9 text-gray-300 md:h-screen md:flex-row md:gap-12 md:py-0 xl:gap-32"
    >
      <Image
        src={astranautImg}
        className="max-w-xs lg:max-w-md xl:max-w-xl"
        alt="Astranaut in space"
      />
      <div className="space-y-5">
        <div className="flex gap-4 text-xl">
          <p>Follow me on</p>
          <BsFacebook />
          <BsLinkedin />
          <BsGithub />
        </div>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold">Or</p>
        </div>
        <h2 className="text-3xl font-semibold">Send me a hello!</h2>
        <form action="#" className="text-gray-300" method="POST">
          <div className="grid grid-cols-2 gap-3">
            <PaddedInputField
              name="firstname"
              type="text"
              placeholder="First Name"
            />
            <PaddedInputField
              name="lastname"
              type="text"
              placeholder="Last Name"
            />
            <PaddedInputField
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <PaddedInputField
              name="phone"
              type="tel"
              placeholder="Phone Number"
            />
            <textarea
              name="contact-message"
              placeholder="You message here..."
              className="col-span-2 h-60 rounded-xl border bg-white/10 p-5"
            ></textarea>
            <button
              className="rounded-2xl border bg-pink-600 p-4 font-semibold text-white"
              value="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
