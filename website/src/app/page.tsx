import { Navbar } from "@/components/Navbar";
import { ParallaxAtmosphere } from "@/components/ParallaxAtmosphere";
import { Hero } from "@/components/Hero";
import { Conversation } from "@/components/Conversation";
import { MemoryLandscape } from "@/components/MemoryLandscape";
import { ActionTimeline } from "@/components/ActionTimeline";
import { TaskConstellation } from "@/components/TaskConstellation";
import { InsideBubble } from "@/components/InsideBubble";
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
        <ActionTimeline />
        <TaskConstellation />
        <InsideBubble />
        <Waitlist />
        <Footer />
      </main>
    </>
  );
}
