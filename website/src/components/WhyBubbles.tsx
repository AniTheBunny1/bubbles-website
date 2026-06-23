"use client";

import { motion } from "framer-motion";

export function WhyBubbles() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-12 md:p-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-black"
          >
            Why Bubbles?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
          >
            Most assistants are just glorified chat boxes that watch you drown in suggestions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-900 font-semibold leading-relaxed mb-6"
          >
            Bubbles eats your boring tasks, automates the friction, and sells you back your own time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
          >
            It doesn't just comment on your life. It acts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="h-1 w-16 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-500 leading-relaxed"
          >
            We're building the Personal Intelligence Layer for Life.
            <br className="hidden md:block" />
            Two student founders, bootstrapped, shipping from India.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
