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
  const now = new Date().toISOString();
  const posts = ((await getPosts()) ?? []) as unknown[];
  const summaries = posts.map((p, i) => toSummary(p, i));
  const shellPosts = summaries.map((p) => ({
    title: p.title,
    date: formatDateShort(p.publishedAt, "month"),
  }));

  return (
    <>
      <Hero />
      {/* pin-and-reveal: the sheet that slides over the hero starts at the band's tilted top edge
          (rotate -1.2deg about its centre: left end sits ~1.1vw below the box top, right end ~1.1vw above it) */}
      <div
        className="bg-bg relative z-10"
        style={{
          clipPath: "polygon(0 calc(1.1vw + 1px), 100% calc(-1.1vw + 1px), 100% 100%, 0 100%)",
        }}
      >
        <Marquee />
        <Shell posts={shellPosts} />
        <Projects />
        <Experience now={now} />
        <section
          id="writing"
          className="wrap flex flex-wrap gap-x-20 gap-y-[72px] pt-[clamp(80px,9vw,140px)] pb-10"
        >
          <BlogPreview posts={summaries} />
          <Skills />
        </section>
        <Contact />
      </div>
    </>
  );
}
