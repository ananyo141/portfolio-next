import { Metadata } from "next";
import BlogList from "@components/blog-list";
import Eyebrow from "@components/eyebrow";
import { StaggerContainer } from "@components/motion-wrapper";
import site from "@data/site.json";

const topics = ["System Design", "Backend", "Developer Tools", "Debugging", "Operations"];

export const metadata: Metadata = {
  title: `Writing | ${site.name}`,
  description:
    "Essays on system design, backend engineering, developer tools, debugging, and operations.",
};

export const revalidate = 360;

export default function BlogPage() {
  return (
    <div className="min-h-screen px-6 py-32 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Writing</Eyebrow>
        <h1 className="text-text-primary mt-5 font-serif text-4xl leading-[1.02] font-[440] tracking-[-0.015em] md:text-6xl">
          Notes from the <em className="text-text-muted italic">systems edge</em>.
        </h1>
        <p className="text-text-muted mt-4 max-w-xl text-[15px] leading-relaxed">
          Essays on backend boundaries, system design tradeoffs, tooling, debugging, and the
          operational details that shape reliable software.
        </p>
        <div className="mt-6 flex max-w-2xl flex-wrap gap-2" aria-label="Writing topics">
          {topics.map((topic) => (
            <span
              key={topic}
              className="border-border-subtle text-text-muted rounded-md border px-2.5 py-1 font-mono text-[10.5px]"
            >
              {topic}
            </span>
          ))}
        </div>
        <StaggerContainer className="mt-12">
          <BlogList />
        </StaggerContainer>
      </div>
    </div>
  );
}
