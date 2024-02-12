"use client";

import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { urlForImage } from "@/sanity/lib/image";

type Props = {
  text: any;
};

const PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        className="py-9"
        src={urlForImage(value.asset._ref)}
        width={1280}
        height={720}
        alt="blog image"
      />
    ),
    code: ({ value }) => (
      <div className="relative">
        <SyntaxHighlighter
          showLineNumbers
          customStyle={{ marginBottom: "1.2rem" }}
          style={nightOwl}
          language={value.language || "text"}
        >
          {value.code}
        </SyntaxHighlighter>
        <button
          onClick={() => {
            return navigator.clipboard.writeText(value.code);
          }}
          className="absolute right-3 active:scale-90 duration-300 top-2 rounded-md bg-blue-950 p-2 text-base text-gray-200 hover:bg-blue-900"
        >
          Copy
        </button>
      </div>
    ),
  },
};

const Viewer = (props: Props) => {
  return (
    <PortableText value={props.text} components={PortableTextComponents} />
  );
};

export default Viewer;
