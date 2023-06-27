"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";

import TransitionEffect from "@components/TransitionEffect";
import astranautImg from "@assets/astronaut.svg";
import PaddedInputField from "./PaddedInput";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: firstName + " " + lastName,
      email: contactEmail,
      phone: contactPhone,
      message: contactMessage,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received", res);
      if (res.status === 200) {
        console.log("Response succeeded!", res);
        setSubmitted(true);

        // Reset form
        setFirstName("");
        setLastName("");
        setContactEmail("");
        setContactPhone("");
        setContactMessage("");
      }
    });
  };

  return (
    <div
      id="Contact"
      className="flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-r from-[#0a192f] to-blue-900 px-2 py-9 text-gray-300 md:h-screen md:flex-row md:gap-12 md:py-0 xl:gap-32"
    >
      <TransitionEffect />
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
        <form onSubmit={handleSubmit} className="text-gray-300">
          <div className="grid grid-cols-2 gap-3">
            <PaddedInputField
              name="firstname"
              type="text"
              onChange={handleFirstNameChange}
              value={firstName}
              placeholder="First Name"
            />
            <PaddedInputField
              name="lastname"
              type="text"
              onChange={handleLastNameChange}
              value={lastName}
              placeholder="Last Name"
            />
            <PaddedInputField
              name="email"
              type="email"
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
              placeholder="You message here..."
              onChange={handleContactMessageChange}
              value={contactMessage}
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
