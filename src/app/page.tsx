import HeroSection from "src/components/home/HeroSection";
import About from "src/components/home/About";
import Navbar from "src/components/Navbar";
import Experience from "src/components/home/Experience";

export default function Home() {
  return (
    <main className="animate-fadeIn px-8 animation-delay-2 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a192f] to-purple-900">
      <Navbar />
      <HeroSection />
      <About />
      <Experience />
    </main>
  );
}
