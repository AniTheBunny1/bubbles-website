"use client";

import { motion } from "framer-motion";
import { Lock, GraduationCap, BrainCircuit, Globe } from "lucide-react";

const PILLS = [
  { text: "Emotive Architecture", icon: Lock },
  { text: "Unhinged Persona", icon: GraduationCap },
  { text: "Multilingual Fluidity", icon: Globe },
  { text: "Browser Actions Enabled", icon: BrainCircuit },
];

export function FeaturePills() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
        {PILLS.map((pill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex items-center gap-3 px-6 py-4 glass-card rounded-2xl cursor-pointer group"
          >
            <div className="p-2 rounded-full bg-white/50 group-hover:bg-white/80 transition-colors">
              <pill.icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
            </div>
            <span className="font-medium text-gray-800 tracking-tight">
              {pill.text}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
