import { Metadata } from "next";
import BlogList from "@components/blog-list";
import { StaggerContainer } from "@components/motion-wrapper";
import site from "@data/site.json";

export const metadata: Metadata = {
  title: `Writing | ${site.name}`,
  description: "Essays on software engineering, system design, and the craft of building things.",
};

export const revalidate = 360;

export default function BlogPage() {
  return (
    <div className="min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-text-primary font-serif text-3xl font-bold md:text-5xl">Writing</h1>
        <p className="text-text-muted mt-4 max-w-xl text-base">
          Essays on software engineering, system design, and the craft of building things.
        </p>
        <StaggerContainer className="mt-12">
          <BlogList />
        </StaggerContainer>
      </div>
    </div>
  );
}
