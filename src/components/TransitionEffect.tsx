"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {};

const TransitionEffect = (props: Props) => {
  return (
    <>
      <motion.div
        className="bg-[#1b1b1b] fixed bottom-0 right-full top-0 z-50 h-screen w-screen"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-[#f5f5f5] fixed bottom-0 right-full top-0 z-30 h-screen w-screen"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        className="bg-[#b63e96] fixed bottom-0 right-full top-0 z-10 h-screen w-screen"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeInOut" }}
      />
    </>
  );
};

export default TransitionEffect;
