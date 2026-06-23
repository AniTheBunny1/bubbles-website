import { Navbar } from "@/components/Navbar";
import { ParallaxAtmosphere } from "@/components/ParallaxAtmosphere";
import { Hero } from "@/components/Hero";
import { Conversation } from "@/components/Conversation";
import { MemoryLandscape } from "@/components/MemoryLandscape";
import { MorphBubble } from "@/components/MorphBubble";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParallaxAtmosphere />
      <main className="min-h-screen relative selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <Hero />
        <Conversation />
        <MemoryLandscape />
        <MorphBubble />
        <Waitlist />
        <Footer />
      </main>
    </>
  );
}
