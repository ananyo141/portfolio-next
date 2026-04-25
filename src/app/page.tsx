import Nav from "@components/nav";
import Projects from "@components/projects";
import Experience from "@components/experience";
import BlogPreview from "@components/blog-preview";
import Skills from "@components/skills";
import Contact from "@components/contact";
import Footer from "@components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        {/* Hero */}
        <section className="flex min-h-[100dvh] flex-col justify-end px-6 pt-32 pb-16 md:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <p className="mb-6 font-[family-name:var(--font-jetbrains)] text-sm tracking-widest text-[#6B6B6B] uppercase">
              Software Engineer
            </p>
            <h1 className="mb-8 max-w-4xl font-[family-name:var(--font-playfair)] text-5xl leading-[1.1] font-semibold tracking-tight text-[#111111] md:text-7xl lg:text-8xl">
              Building systems that outlast the hype cycles.
            </h1>
            <p className="max-w-xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-[#6B6B6B]">
              Senior software engineer focused on distributed systems, developer experience, and the
              long game of software craft.
            </p>
          </div>
        </section>

        <Projects />
        <Experience />
        <BlogPreview />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
