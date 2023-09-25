"use client";
import React from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";

import heroImage from "@assets/HeroImage.png";

const HeroSection = () => {
  return (
    <section id="Home" className="md:h-screen min-h-fit py-9">
      <div className="flex h-full flex-col items-center md:justify-center gap-8 md:gap-20 text-center md:flex-row md:space-x-4 md:py-48 md:text-left">
        <Image
          src={heroImage}
          alt="hero image"
          width={325}
          height={325}
          className="rounded-full h-52 w-52 bg-gradient-to-br from-[#0a192f] to-purple-900 shadow-md"
        />

        <div className="md:mt-2 md:w-3/5">
          <div className="flex h-fit max-w-lg items-center justify-center lg:max-w-full">
            <div className="max-w-5xl space-y-6">
              <h4 className="-mb-6 text-xl text-pink-400">
                Hello World, my name is
              </h4>
              <h1 className="text-3xl font-bold -mb-96 text-[#ccd6f6] md:text-6xl">
                Ananyobrata Pal
              </h1>
              <h1 className="text-3xl -mt-9 font-bold text-[#9b7c58] md:text-6xl">
                <span className="text-2xl md:text-6xl font-semibold">I&apos;m a{"  "}</span>
                <div className="rounded-md px-1 md:py-2 font-semibold text-pink-400 lg:text-gray-300 lg:inline-block lg:bg-yellow-800">
                  <Typewriter
                    options={{
                      strings: [
                        "Software Engineer.",
                        "Full-Stack Developer.",
                        "OSS Enthusiast.",
                        "Backend Developer.",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </h1>
              <h4 className="text-base text-[#9b7c58] md:text-xl">
                I am a full stack developer specializing in building and
                designing full featured web and mobile apps. An ardent linux
                lover, I strive to solve real-world problems.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
