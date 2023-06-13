"use client"; // this is a client component
import React from "react";
import Image from "next/image";
import Typewriter from "typewriter-effect";

import heroImage from "src/assets/HeroImage.png";

const HeroSection = () => {
  return (
    <section id="Home" className="min-h-fit h-screen">
      <div className="flex h-full flex-col items-center justify-center gap-20 text-center sm:py-32 md:flex-row md:space-x-4 md:py-48 md:text-left">
        <Image
          src={heroImage}
          alt=""
          width={325}
          height={325}
          className="rounded-full bg-gradient-to-br from-[#0a192f] to-purple-900 shadow-2xl"
        />

        <div className="md:mt-2 md:w-3/5">
          <div className="flex h-fit max-w-lg items-center justify-center lg:max-w-full">
            <div className="max-w-5xl space-y-6">
              <h4 className="-mb-6 text-xl text-pink-400">
                Hello World, my name is
              </h4>
              <h1 className="text-6xl font-bold text-[#ccd6f6]">
                Ananyobrata Pal
              </h1>
              <h1 className="text-6xl font-bold text-[#9b7c58]">
                I'm a{"  "}
                <div className="rounded-md bg-yellow-800 px-1 py-2 font-semibold text-gray-300 lg:inline-block">
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
              <h4 className="text-xl text-[#9b7c58]">
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
