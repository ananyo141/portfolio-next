import React from "react";
import { getPosts } from "@src/network/cmsHandlers";
import PostComponent from "@components/PostComponent";
import TransitionEffect from "@components/TransitionEffect";

type Props = {};

const Blog = async (_: Props) => {
  const posts = await getPosts();

  return (
    <main className="bg-blue-950">
      <TransitionEffect />
      <h1 className="text-center text-4xl font-bold text-gray-200 pt-20 pb-12">
        Blogs
      </h1>
      <div className="container mx-auto min-h-screen">
        <div>
          {posts?.length > 0 &&
            posts?.map((post: any, index: number) => (
              <PostComponent key={`post-page-${index}`} post={post} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Blog;

export const revalidate = 360;
