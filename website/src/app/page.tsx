import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Conversation } from "@/components/Conversation";
import { Integrations } from "@/components/Integrations";
import { CapabilityNetwork } from "@/components/CapabilityNetwork";
import { BuiltToAct } from "@/components/BuiltToAct";
import { UseCases } from "@/components/UseCases";
import { WhyBubbles } from "@/components/WhyBubbles";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Conversation />
      <Integrations />
      <CapabilityNetwork />
      <BuiltToAct />
      <UseCases />
      <WhyBubbles />
      <Waitlist />
      <Footer />
    </main>
  );
}

