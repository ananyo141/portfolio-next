import { Metadata } from "next";
import BlogList from "@components/blog-list";
import Eyebrow from "@components/eyebrow";
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
        <Eyebrow>Writing</Eyebrow>
        <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
          Notes on the <em className="text-text-muted italic">craft</em>.
        </h1>
        <p className="text-text-muted mt-4 max-w-xl text-[15px] leading-relaxed">
          Essays on software engineering, system design, and the craft of building things.
        </p>
        <StaggerContainer className="mt-12">
          <BlogList />
        </StaggerContainer>
      </div>
    </div>
  );
}
