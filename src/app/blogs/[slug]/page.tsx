import React from "react";
import Image from "next/image";
import { Laila } from "next/font/google";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import { getPost } from "@src/network/cmsHandlers";

type Props = any;

const PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return <Image className="py-9" src={urlForImage(value.asset._ref)} width={1280} height={720} alt="blog image" />;
    },
  },
};

const blogFont = Laila({
  weight: ["400", "300", "700", "500"],
  subsets: ["latin"],
});

const Blogs = async ({ params }: Props) => {
  const post = await getPost(params?.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={blogFont.className + " text-xl text-gray-200 bg-blue-950 pt-20 pb-8"}>
      <h2 className="text-center font-bold text-2xl"> {post?.title}</h2>
      <div className="text-center">
        <span className="text-purple-500">
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag: any) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 rounded-sm border p-1 text-sm lowercase dark:border-gray-900 dark:bg-gray-950">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="prose-heading:text-2xl m-auto mt-14 max-w-2xl text-justify prose-headings:my-5 prose-p:pb-5 prose-p:leading-7 prose-li:ml-4 prose-li:list-disc prose-li:leading-7">
          <PortableText
            value={post?.body}
            components={PortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
export const revalidate = 360;
