import Link from "next/link";
import React from "react";
import { Lilita_One, VT323 } from "next/font/google";

interface Props {
  post: any;
}

const font = Lilita_One({ weight: "400", subsets: ["latin"] });
const dateFont = VT323({ weight: "400", subsets: ["latin"] });

const PostComponent = ({ post }: Props) => {
  return (
    <div className="mb-8 cursor-pointer rounded-md border border-gray-300 p-4 shadow-sm shadow-purple-950 bg-purple-700 active:scale-95 duration-200 hover:bg-purple-800 text-white hover:shadow-md">
      <Link href={`/blogs/${post?.slug?.current}`}>
        <h2 className={`${font.className} text-2xl `}>
          {post?.title}
        </h2>
        <p className={`${dateFont.className} my-2 text-gray-100`}>
          {new Date(post?.publishedAt).toDateString()}
        </p>
        <p className="mb-4 line-clamp-2 ">{post?.excerpt}</p>
      </Link>

      {/* TAGS */}
      <div>
        {post?.tags?.map((tag: any, index: number) => (
          <span
            key={`post-tag-${index}`}
            className="mr-2 rounded-sm border p-1 text-sm lowercase "
          >
            #{tag?.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PostComponent;
