"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    num: "01",
    title: "Memory that\nactually works.",
    hook: "No more context poisoning.",
    desc: "Three layers: short-term context, long-term facts, and weighted priorities. Bubbles refreshes what matters daily and forgets what doesn't. It knows you last spoke to Gaurav 3 weeks ago without you having to say it.",
    accentColor: "rgba(139, 92, 246, 1)",
    accentLight: "rgba(139, 92, 246, 0.08)",
  },
  {
    num: "02",
    title: "Gets more\nyou over time.",
    hook: "The longer you use it, the sharper it gets.",
    desc: "Adapts its sentence structure, tone, and response length uniquely for you. If you like short answers, it stops rambling. If you're formal with clients, it mirrors that. It doesn't need to be told twice.",
    accentColor: "rgba(59, 130, 246, 1)",
    accentLight: "rgba(59, 130, 246, 0.08)",
  },
  {
    num: "03",
    title: "Runs while\nyou sleep.",
    hook: "You ask once. It handles the rest.",
    desc: "Set up multi-step workflows and walk away. Monitor a price, draft a weekly report, clean your inbox every Monday. Bubbles runs them in the background without you lifting a finger again.",
    accentColor: "rgba(20, 184, 166, 1)",
    accentLight: "rgba(20, 184, 166, 0.08)",
  },
];

export function BuiltToAct() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl relative overflow-hidden flex flex-col"
              style={{ minHeight: 380 }}
            >
              {/* Background number watermark */}
              <div
                className="absolute -right-4 -top-6 font-black leading-none pointer-events-none select-none"
                style={{
                  fontSize: "10rem",
                  color: card.accentColor,
                  opacity: 0.07,
                  lineHeight: 1,
                }}
              >
                {card.num}
              </div>

              {/* Accent top strip */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${card.accentColor}, transparent)` }}
              />

              <div className="flex flex-col flex-1 p-10 gap-5 relative z-10">
                {/* Number label */}
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: card.accentColor }}
                >
                  {card.num}
                </span>

                {/* Title */}
                <h3
                  className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight whitespace-pre-line"
                >
                  {card.title}
                </h3>

                {/* Hook */}
                <p
                  className="text-base font-semibold"
                  style={{ color: card.accentColor }}
                >
                  {card.hook}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-black/10" />

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
