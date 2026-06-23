"use client";

import { motion } from "framer-motion";
import { Mail, Globe, MapPin, CheckSquare, Zap, Brain } from "lucide-react";

const USE_CASES = [
  { 
    icon: Mail, 
    title: "Manage Email", 
    description: "Automatically organize, summarize, and respond to important emails." 
  },
  { 
    icon: Globe, 
    title: "Research Faster", 
    description: "Gather information from across the web and synthesize it instantly." 
  },
  { 
    icon: MapPin, 
    title: "Plan Travel", 
    description: "Find flights, hotels, and itineraries with your preferences built in." 
  },
  { 
    icon: CheckSquare, 
    title: "Track Tasks", 
    description: "Stay on top of deadlines and get proactive reminders at the right time." 
  },
  { 
    icon: Zap, 
    title: "Automate Work", 
    description: "Replace repetitive tasks with intelligent workflows that run in background." 
  },
  { 
    icon: Brain, 
    title: "Organize Info", 
    description: "Process documents and extract insights using context-aware intelligence." 
  }
];

export function UseCases() {
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
            Real-World Use Cases
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From everyday productivity to complex workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {USE_CASES.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl relative overflow-hidden group"
              >
                {/* Hover highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-white/40 group-hover:bg-white/60 transition-colors duration-300 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{useCase.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
