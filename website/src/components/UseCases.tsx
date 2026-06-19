"use client";

import { motion } from "framer-motion";

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
            Everyday Use Cases
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Email Management",
            "Research & Information Gathering",
            "Travel Planning",
            "Subscription Tracking",
            "Personal Productivity",
            "Workflow Automation"
          ].map((useCase, i) => (
            <motion.div
              key={useCase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl flex items-center justify-center text-center relative overflow-hidden group min-h-[160px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-lg font-semibold text-gray-900 relative z-10">{useCase}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
