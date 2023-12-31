"use client";

import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";
import { type ToastOptions, toast } from "react-toastify";

import TransitionEffect from "@components/TransitionEffect";
import astranautImg from "@assets/astronaut.svg";
import PaddedInputField from "./PaddedInput";

const ToastStyle: ToastOptions = {
  hideProgressBar: true,
  position: "bottom-right",
};

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [loading, setLoading] = useState(false);

  type EventType = React.ChangeEvent<HTMLInputElement>;
  const handleFirstNameChange = (e: EventType) => setFirstName(e.target.value);
  const handleLastNameChange = (e: EventType) => setLastName(e.target.value);
  const handleContactEmailChange = (e: EventType) =>
    setContactEmail(e.target.value);
  const handleContactPhoneChange = (e: EventType) =>
    setContactPhone(e.target.value);
  const handleContactMessageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setContactMessage(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: firstName + " " + lastName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMessage,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 201) {
        // Reset form
        setFirstName("");
        setLastName("");
        setContactEmail("");
        setContactPhone("");
        setContactMessage("");
        toast.success("Message sent successfully!", ToastStyle);
      } else {
        console.error("Error");
        toast.error("Error sending message! " + json.message, ToastStyle);
      }
    } catch (err) {
      console.error(err);
      toast.error("Sorry, please try again.", ToastStyle);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="Contact"
      className="flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-r from-[#0a192f] to-blue-900 px-2 py-9 text-gray-300 md:h-screen md:flex-row md:gap-12 md:py-0 xl:gap-32"
    >
      <TransitionEffect />
      <motion.div
        initial={{ rotate: 270 }}
        animate={{ rotate: 0 }}
        whileTap={{ rotate: 320, transition: { delay: 0, duration: 0.5 } }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        transition={{ delay: 0.55, duration: 1, type: "spring", stiffness: 50 }}
      >
        <Image
          src={astranautImg}
          className="pointer-events-none max-w-xs cursor-pointer lg:max-w-md xl:max-w-xl"
          alt="Astranaut in space"
        />
      </motion.div>
      <div className="space-y-5">
        <div className="flex gap-4 text-xl">
          <p>Follow me on</p>
          <Link
            className="duration-200 hover:scale-125"
            href="https://www.facebook.com/ananyobrata.pal/"
            target="_blank"
          >
            <BsFacebook />
          </Link>
          <Link
            className="duration-200 hover:scale-125"
            href="https://www.linkedin.com/in/ananyobrata-pal-7b5178200/"
            target="_blank"
          >
            <BsLinkedin />
          </Link>
          <Link
            className="duration-200 hover:scale-125"
            href="https://github.com/ananyo141"
            target="_blank"
          >
            <BsGithub />
          </Link>
        </div>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold">Or</p>
        </div>
        <h2 className="text-3xl font-semibold">Send me a hello!</h2>
        <form onSubmit={handleSubmit} className="text-gray-300">
          <div className="grid grid-cols-2 gap-3">
            <PaddedInputField
              name="firstname"
              type="text"
              required
              onChange={handleFirstNameChange}
              value={firstName}
              placeholder="First Name"
            />
            <PaddedInputField
              name="lastname"
              type="text"
              required
              onChange={handleLastNameChange}
              value={lastName}
              placeholder="Last Name"
            />
            <PaddedInputField
              name="email"
              type="email"
              required
              onChange={handleContactEmailChange}
              value={contactEmail}
              placeholder="Email Address"
            />
            <PaddedInputField
              name="phone"
              type="tel"
              onChange={handleContactPhoneChange}
              value={contactPhone}
              placeholder="Phone Number"
            />
            <textarea
              name="contact-message"
              required
              placeholder="You message here..."
              onChange={handleContactMessageChange}
              value={contactMessage}
              className="col-span-2 h-60 rounded-xl border bg-white/10 p-5"
            ></textarea>
            <button
              className="rounded-2xl border bg-pink-600 p-4 font-semibold text-white"
              value="submit"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
