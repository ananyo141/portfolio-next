import HeroSection from "./HeroSection";
import About from "./About";
import Experience from "./Experience";
import Testimonials from "./Testimonials";
import TransitionEffect from "@src/components/TransitionEffect";

export const metadata = {
  title: "Portfolio - Home",
  description:
    "Introduction",
};

export default function Home() {
  return (
    <main className="animate-fadeIn animation-delay-2 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a192f] to-purple-900 px-8">
      <TransitionEffect />
      <HeroSection />
      <About />
      <Experience />
      <Testimonials />
    </main>
  );
}
