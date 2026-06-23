"use client";

import { motion } from "framer-motion";

export function BuiltToAct() {
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
            Under the hood
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Three systems that make Bubbles different from every AI you've tried.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "3-Layer Persistent Memory",
              desc: "Continuously learns, updates, and retrieves context. Assigns weights to what matters. Refreshes daily."
            },
            {
              title: "Adaptive Personality Engine",
              desc: "Evolves its communication style, sentence structure, and tone uniquely for every user."
            },
            {
              title: "Hermes Agent Framework",
              desc: "Executes complex workflows, manages tools, runs scripts, and navigates the web on your behalf."
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl relative overflow-hidden group"
            >
              {/* Subtle glass hover highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
