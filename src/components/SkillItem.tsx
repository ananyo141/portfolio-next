import React from "react";
import Image from "next/image";

const SkillItem = ({ imgfile, proficiency }) => {
  return (
    <div className="group relative flex cursor-pointer">
      <Image
        src={imgfile}
        alt="Skill Index"
        className="block h-24 w-24 rounded-full border-2 border-gray-500 object-cover p-2 filter transition duration-300 ease-in-out group-hover:grayscale"
      />
      <div className="absolute z-0 h-24 w-24 rounded-full opacity-0 transition duration-500 ease-in-out group-hover:scale-110 group-hover:bg-white group-hover:opacity-80">
        <div className="flex h-full items-center justify-center">
          <p className="text-3xl font-bold text-black opacity-100">
            {proficiency}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
