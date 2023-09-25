"use client";

import React from "react";
import { motion } from "framer-motion";

import csslogo from "@assets/css.png";
import awslogo from "@assets/aws.png";
import firebaselogo from "@assets/firebase.png";
import githublogo from "@assets/github.png";
import htmllogo from "@assets/html.png";
import jslogo from "@assets/javascript.png";
import mongologo from "@assets/mongo.png";
import nodelogo from "@assets/node.png";
import reactlogo from "@assets/react.png";
import tailwindlogo from "@assets/tailwind.png";

import SkillItem from "@components/SkillItem";

type Props = {};

const About = (props: Props) => {
  return (
    <div id="About" className="flex min-h-screen flex-col gap-9 lg:flex-row">
      <motion.div
        initial={{ x: -220, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-col items-center justify-center gap-5 text-center text-[#ccd6f6] md:max-w-lg lg:max-w-xl lg:items-end lg:text-right"
      >
        <h3 className="border-b-4 border-pink-500 pb-2 text-3xl font-bold">
          About
        </h3>
        <p className="text-xl md:text-2xl font-bold">
          Hey, I am Ananyobrata Pal, nice to meet you! You can contact me, or
          just have a look around!
        </p>
        <p className="text-base md:text-lg font-light text-gray-400">
          I am a CSE Undergrad diving into the world of technology, interested
          in building full stack apps. An Open Source advocate obsessed with
          ArchLinux and (N)vim. I am passionate about building excellent
          software that improves the lives of those around me. I specialize in
          creating software for clients ranging from individuals and
          small-businesses all the way to large enterprise corporations. What
          would you do if you had a software expert available at your
          fingertips?
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 220, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-col items-center justify-center text-gray-300 lg:items-start"
      >
        <h3 className="border-b-4 border-pink-500 pb-2 text-3xl font-bold">
          Skills
        </h3>
        <div className="mt-4 grid grid-cols-2 justify-center gap-3 sm:grid-cols-4">
          <SkillItem imgfile={htmllogo} proficiency={97} />
          <SkillItem imgfile={csslogo} proficiency={91} />
          <SkillItem imgfile={jslogo} proficiency={93} />
          <SkillItem imgfile={nodelogo} proficiency={92} />
          <SkillItem imgfile={mongologo} proficiency={89} />
          <SkillItem imgfile={reactlogo} proficiency={90} />
          <SkillItem imgfile={tailwindlogo} proficiency={95} />
          <SkillItem imgfile={githublogo} proficiency={97} />
          <SkillItem imgfile={firebaselogo} proficiency={86} />
          <SkillItem imgfile={awslogo} proficiency={79} />
        </div>
      </motion.div>
    </div>
  );
};

export default About;
