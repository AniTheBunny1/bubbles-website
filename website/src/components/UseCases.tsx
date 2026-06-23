"use client";

import { motion } from "framer-motion";

const USE_CASES = [
  { title: "Clear your inbox",       desc: "Read, draft, and send. Triage your email in seconds, not minutes." },
  { title: "Place orders",            desc: "Blinkit, Swiggy, Amazon. Tell it what you want. It pays and confirms." },
  { title: "Order groceries",        desc: "Say what you need. It shows up at your door." },
  { title: "Prep for meetings",      desc: "Pulls everything you know about the person you're about to talk to." },
  { title: "Track your money",       desc: "Subscriptions, spending, failed payments. Always on top of it." },
  { title: "Run background tasks",   desc: "Set a workflow once. It runs while you live your life." },
];

export function UseCases() {
  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-black"
          >
            What it actually does.
          </motion.h2>
        </div>

        <div className="flex flex-col">
          {USE_CASES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12 py-7 border-t border-black/8 hover:border-black/20 transition-colors duration-200"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 md:w-72 shrink-0 group-hover:text-black transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
          <div className="border-t border-black/8" />
        </div>

      </div>
    </section>
  );
}
