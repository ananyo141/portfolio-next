import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsGithub, BsArrowUpRightSquare, BsYoutube } from "react-icons/bs";

import { ProjectType } from "@data/ProjectsData";

type Props = ProjectType & {
  className?: string;
  bgColor?: string;
};

const bgColors = [
  "#6A7FDB",
  "#57E2E5",
  "#153131",
  "#E08DAC",
  "#F3D34A",
  "#3E8914",
  "#07004D",
  "#ADE25D",
  "#3B7080",
  "#3A5743",
];

const randomColor = () => bgColors[Math.floor(Math.random() * bgColors.length)];

const ProjectTile = (props: Props) => {
  return (
    <div className={props.className}>
      <div className="group px-4 flex max-w-4xl flex-col justify-center gap-12 md:flex-row">
        <div
          className="relative border h-56 mx-auto rounded-xl shadow-lg shadow-gray-400 md:w-[840px]"
          style={{
            backgroundColor: props.bgColor ?? randomColor(),
          }}
        >
          <Image
            src={props.image}
            alt={props.title}
            width={400}
            height={250}
            className="md:absolute w-full object-scale-down h-full bottom-0 md:left-20 rounded-tl-lg rounded-tr-lg md:h-40 md:w-80"
          />
        </div>
        <div className="flex flex-col items-center md:items-start justify-center md:w-3/4">
          <div className="group">
            <h3 className="mb-2 cursor-pointer text-2xl font-bold text-[#2D3047]">
              {props.title}
            </h3>
            <hr className="pb-2 transition-all duration-300 group-hover:border-red-600" />
          </div>
          <p className="text-lg text-[#82204A]">{props.description}</p>
          <p className="mt-4 text-sm">
            <span className="font-bold text-[#558C8C]">Tech Used: </span>
            <span className="italic text-[#3F3047]">
              {props.techStack.join(", ")}{" "}
            </span>
          </p>
          <div className="mt-4 flex gap-8 text-[#2D3047]">
            <Link
              href={props.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-lg"
            >
              <BsGithub className="h-8 w-8" />
            </Link>
            {props.demo !== undefined && (
              <Link
                href={props.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg"
              >
                <BsArrowUpRightSquare className="h-8 w-8" />
              </Link>
            )}
            {props.youtube !== undefined && (
              <Link
                href={props.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg"
              >
                <BsYoutube className="h-10 w-10 text-red-600" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;
