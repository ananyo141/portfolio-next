"use client";

import React from "react";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import ExperienceData from "src/data/ExperienceData";

const Skills = () => {
  const iconColorEven = React.useRef({
    background: "rgb(233, 30, 99)",
    color: "#fff",
  });
  const iconColorOdd = React.useRef({
    background: "rgb(16, 204, 82)",
    color: "#fff",
  });

  const contentColorEven = React.useRef({
    background: "#0a192f",
    color: "white",
  });
  const contentColorOdd = React.useRef({
    background: "rgb(33, 150, 243)",
    color: "#fff",
  });

// bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500

  return (
    <div
      id="Experience"
      className="flex h-fit min-h-screen w-full flex-col items-center justify-center"
    >
      <h1 className="mb-5 border-b-4 border-pink-500 pb-2 text-4xl font-bold text-[#ccd6f6]">
        Experience
      </h1>
      <VerticalTimeline>
        {ExperienceData.map((data, i) => (
          <VerticalTimelineElement
            key={`experience-${data.id}`}
            contentStyle={
              i & 1 ? contentColorOdd.current : contentColorEven.current
            }
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date={data.date}
            iconStyle={i & 1 ? iconColorOdd.current : iconColorEven.current}
            icon={<data.icon />}
          >
            <h3 className="vertical-timeline-element-title">{data.company}</h3>
            <h4 className="vertical-timeline-element-subtitle">
              {data.location}
            </h4>
            <p>{data.designation}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Skills;