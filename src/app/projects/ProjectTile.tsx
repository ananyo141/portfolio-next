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
      <div className="flex max-w-4xl flex-col justify-center gap-12 md:flex-row">
        <div
          className="relative h-56 w-[840px] rounded-xl shadow-lg shadow-gray-400"
          style={{ backgroundColor: props.bgColor ?? randomColor() }}
        >
          <Image
            src={props.image}
            alt={props.title}
            width={400}
            height={250}
            className="absolute bottom-0 left-20 h-40 w-80 rounded-tl-lg rounded-tr-lg"
          />
        </div>
        <div className="flex w-3/4 flex-col justify-center">
          <h3 className="text-2xl text-[#2D3047] border-b border-b-pink-500 mb-2 font-bold">{props.title}</h3>
          <p className="text-lg text-[#82204A]">{props.description}</p>
          <p className="mt-4 text-sm">
            <span className="font-bold text-[#558C8C]">Tech Used:{" "}</span>
            <span className="italic text-[#3F3047]">{props.techStack.join(", ")} </span>
          </p>
          <div className="mt-4 text-[#2D3047] flex gap-8">
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
