"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "The Personality",
    description: "Turns utility into affinity. A relationship-based moat.",
    color: "from-blue-400 to-indigo-400"
  },
  {
    title: "The Agent",
    description: "Browser-native execution. Bypasses gatekeepers.",
    color: "from-pink-400 to-rose-400"
  }
];

export function WhyBubbles() {
  return (
    <section id="how-it-works" className="py-32 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            The Digital Accomplice.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto"
          >
            A decentralized, personality-driven multimodal interface that replaces 50+ fragmented apps with a single, sharp-tongued conversation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-card p-12 rounded-[2rem] relative overflow-hidden group text-center"
            >
              {/* Floating Orb Icon */}
              <div className="w-20 h-20 mb-8 relative mx-auto">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-inner" />
                <div className={`absolute inset-2 bg-gradient-to-tr ${feature.color} rounded-full opacity-50 mix-blend-multiply`} />
              </div>

              <h3 className="text-3xl font-semibold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
