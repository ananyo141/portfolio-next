import Hero from "@components/hero";
import Projects from "@components/projects";
import Experience from "@components/experience";
import BlogPreview from "@components/blog-preview";
import Skills from "@components/skills";
import Contact from "@components/contact";

export const metadata = {
  title: "Ananyo Bhowmick",
  description:
    "Software engineer writing about system design, scalable architecture, and the craft of building software.",
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
