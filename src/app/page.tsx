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
import { toSummary } from "@lib/blog";

export const metadata = {
  title: site.name,
  description: site.description,
};

export const revalidate = 360;

export default async function Home() {
  const posts = ((await getPosts()) ?? []) as unknown[];
  const summaries = posts.map((p, i) => toSummary(p, i));
  const shellPosts = summaries.map((p) => ({
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
      <section
        id="writing"
        className="wrap flex flex-wrap gap-x-20 gap-y-[72px] pt-[clamp(80px,9vw,140px)] pb-10"
      >
        <BlogPreview posts={summaries} />
        <Skills />
      </section>
      <Contact />
    </div>
  );
}
