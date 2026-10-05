import Hero from "@components/hero";
import Marquee from "@components/marquee";
import Shell from "@components/shell";
import Projects from "@components/projects";
import Experience from "@components/experience";
import BlogPreview from "@components/blog-preview";
import Skills from "@components/skills";
import Contact from "@components/contact";
import site from "@data/site.json";
import { getPosts } from "@src/network/cmsHandlers";
import { formatDateShort } from "@lib/utils";

export const metadata = {
  title: site.name,
  description: site.description,
};

export const revalidate = 360;

export default async function Home() {
  const posts = ((await getPosts()) ?? []) as { title: string; publishedAt: string }[];
  const shellPosts = posts.map((p) => ({
    title: p.title,
    date: formatDateShort(p.publishedAt, "month"),
  }));

  return (
    <div className="bg-bg-primary">
      <Hero />
      <Marquee />
      <Shell posts={shellPosts} />
      <Projects />
      <Experience />
      <BlogPreview />
      <Skills />
      <Contact />
    </div>
  );
}
