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
            Built to Act, Not Just Chat
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { 
              title: "Understands Context", 
              desc: "Retains relevant information across interactions." 
            },
            { 
              title: "Takes Action", 
              desc: "Completes tasks instead of simply suggesting them." 
            },
            { 
              title: "Adapts Over Time", 
              desc: "Becomes increasingly personalized through continued use." 
            }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
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
