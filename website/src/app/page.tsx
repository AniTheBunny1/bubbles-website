import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Conversation } from "@/components/Conversation";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Conversation />
      <Waitlist />
    </main>
  );
}

