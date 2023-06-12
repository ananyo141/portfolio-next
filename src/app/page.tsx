import HeroSection from "src/components/HeroSection";
import Navbar from "src/components/Navbar";

export default function Home() {
  return (
    <main className="animate-fadeIn px-8 animation-delay-2 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a192f] to-purple-900">
      <Navbar />
      <HeroSection />
      <section></section>
    </main>
  );
}
