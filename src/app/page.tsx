import Hero from "@components/hero";
import Projects from "@components/projects";
import Experience from "@components/experience";
import BlogPreview from "@components/blog-preview";
import Skills from "@components/skills";
import Contact from "@components/contact";
import site from "@data/site.json";

export const metadata = {
  title: site.name,
  description: site.description,
};

export default function Home() {
  return (
    <div className="bg-bg-primary">
      <Hero />
      <Projects />
      <Experience />
      <BlogPreview />
      <Skills />
      <Contact />
    </div>
  );
}
