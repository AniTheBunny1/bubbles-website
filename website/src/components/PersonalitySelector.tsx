"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, BookOpen, Microscope, Lightbulb } from "lucide-react";

type Personality = "founder" | "student" | "researcher" | "creator";

const PERSONALITIES = [
  {
    id: "founder" as Personality,
    name: "Founder",
    icon: Briefcase,
    description: "Strategic, ambitious, focused on growth.",
    response: "Let me help you scale. What's the bottleneck right now? Revenue, team, or product-market fit?"
  },
  {
    id: "student" as Personality,
    name: "Student",
    icon: BookOpen,
    description: "Curious, learning-focused, detail-oriented.",
    response: "Breaking this down: first, understand the fundamentals. Then we can optimize. What's the core concept you're stuck on?"
  },
  {
    id: "researcher" as Personality,
    name: "Researcher",
    icon: Microscope,
    description: "Analytical, evidence-driven, thorough.",
    response: "Based on current data: here's what the research shows. Let me pull the latest studies and we'll validate this together."
  },
  {
    id: "creator" as Personality,
    name: "Creator",
    icon: Lightbulb,
    description: "Experimental, bold, idea-driven.",
    response: "Okay, wild idea incoming. What if we flipped this completely? Let's explore the unconventional angle first."
  }
];

export function PersonalitySelector() {
  const [selectedPersonality, setSelectedPersonality] = useState<Personality>("founder");
  
  const activePersonality = PERSONALITIES.find(p => p.id === selectedPersonality);

  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
          >
            Choose Your Vibe
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Bubbles adapts its personality to match how you think and work.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto">
          {PERSONALITIES.map((personality, i) => {
            const Icon = personality.icon;
            const isSelected = selectedPersonality === personality.id;
            
            return (
              <motion.button
                key={personality.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedPersonality(personality.id)}
                whileHover={{ y: -5 }}
                className={`relative p-6 rounded-2xl transition-all duration-300 group ${
                  isSelected 
                    ? "glass-card border-white/60 shadow-lg" 
                    : "glass hover:border-white/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-3 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? "bg-white/60" 
                      : "bg-white/40 group-hover:bg-white/50"
                  }`}>
                    <Icon className={`w-6 h-6 ${isSelected ? "text-gray-900" : "text-gray-700"}`} />
                  </div>
                  <span className={`font-semibold ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                    {personality.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Response Demo */}
        <motion.div
          key={activePersonality?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/40">
                <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {activePersonality?.response}
                </p>
                <p className="text-sm text-gray-500 mt-3">As <span className="font-semibold">{activePersonality?.name}</span></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
