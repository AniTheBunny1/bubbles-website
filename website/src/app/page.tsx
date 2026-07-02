import { Navbar } from "@/components/Navbar";
import { ParallaxAtmosphere } from "@/components/ParallaxAtmosphere";
import { Hero } from "@/components/Hero";
import { PhoneStory } from "@/components/PhoneStory";
import { Statements } from "@/components/Statements";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParallaxAtmosphere />
      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
        <PhoneStory />
        <Statements />
        <Waitlist />
        <Footer />
      </main>
    </>
  );
}
