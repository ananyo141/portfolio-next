import React from "react";

import ImageCard from "@components/ImageCard";

import TestmonialsData from "@data/TestmonialsData";

const Testimonials = () => {
  return (
    <section
      id="Testimonials"
      className="mb-20 flex h-fit flex-col items-center justify-center text-gray-700 sm:h-screen"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h3 className="border-b-4 border-pink-500 pb-2 text-3xl font-bold text-white">
          Testimonials
        </h3>
        <p className="mb-6 pb-2 font-light text-gray-300 md:mb-12 md:pb-0">
          Let's see what my colleagues and mentors say about me
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-center">
        {TestmonialsData.map((testmObj) => (
          <ImageCard
            key={`testmonial-${testmObj.name}`}
            image={testmObj.image}
            name={testmObj.name}
            text={testmObj.text}
            designation={testmObj.designation}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
