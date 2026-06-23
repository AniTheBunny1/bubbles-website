"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TONES = [
  {
    label: "Professional",
    sublabel: "Formal & structured",
    response: "Certainly. To optimize your schedule for tomorrow, I'll need your current commitments, deadlines, and priority tasks. Once shared, I'll create a structured plan to maximize your productivity."
  },
  {
    label: "Direct",
    sublabel: "Clear, no fluff",
    response: "Send me your calendar and to-do list. I'll have a clean plan ready in 2 minutes. What's your top priority tomorrow?"
  },
  {
    label: "Balanced",
    sublabel: "Warm and helpful",
    response: "Sure! Walk me through what you've got tomorrow — meetings, deadlines, anything you've been putting off — and I'll help you build a solid plan around it."
  },
  {
    label: "Casual",
    sublabel: "Friendly and real",
    response: "Let's sort out tomorrow! Drop everything you've got going on and I'll make it actually manageable. You've got this 💙"
  },
  {
    label: "Bestie",
    sublabel: "Full unhinged energy",
    response: "bro yes okay we are PLANNING tomorrow right now. dump everything — meetings, that email you've been avoiding, the thing from last week — ALL of it. let's go 🫧"
  }
];

const QUESTION = "Can you help me plan tomorrow?";

export function PersonalitySelector() {
  const [selected, setSelected] = useState(2);

  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
          >
            Adapts to your energy.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-xl mx-auto"
          >
            Dial in the tone. Bubbles learns your style and matches it automatically.
          </motion.p>
        </div>

        {/* Tone slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative flex items-start mb-12 px-4"
        >
          {/* Track line */}
          <div className="absolute left-4 right-4 top-[11px] h-0.5 bg-black/10 rounded-full pointer-events-none" />
          {/* Active fill */}
          <motion.div
            className="absolute left-4 top-[11px] h-0.5 bg-gradient-to-r from-blue-300 to-purple-400 rounded-full pointer-events-none"
            style={{ width: `calc(${(selected / 4) * 100}% - ${(selected / 4) * 8}px + ${(selected / 4) * 0}px)` }}
            animate={{ width: `calc(${(selected / 4) * (100 - 8)}% + ${(selected / 4) * 4}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {TONES.map((tone, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="relative flex-1 flex flex-col items-center gap-3 group"
            >
              {/* Dot with layout animation */}
              <div className="relative w-5 h-5 flex items-center justify-center z-10">
                <div className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                  i === selected
                    ? "border-blue-400 bg-blue-400 scale-125"
                    : i < selected
                    ? "border-purple-300 bg-purple-300"
                    : "border-black/20 bg-white/60 group-hover:border-black/40"
                }`} />
                {i === selected && (
                  <motion.div
                    layoutId="tone-ring"
                    className="absolute inset-0 rounded-full border-2 border-blue-300"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>

              {/* Label */}
              <span className={`text-xs font-semibold transition-colors duration-200 ${
                i === selected ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
              }`}>
                {tone.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* WhatsApp chat demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="bg-[#1f2c34] px-5 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-white/10 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Bubbles</p>
              <p className="text-green-400 text-xs">online</p>
            </div>
          </div>

          {/* Chat */}
          <div className="bg-[#111b21] px-5 py-6 min-h-52 flex flex-col gap-3">
            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-[#005c4b] text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                {QUESTION}
              </div>
            </div>

            {/* AI response — crossfades on tone change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="flex items-end gap-2"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-white/10 shrink-0">
                  <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                </div>
                <div className="bg-[#202c33] text-white text-sm rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm leading-relaxed whitespace-pre-line">
                  {TONES[selected].response}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Sublabel */}
        <motion.p
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-500 mt-4"
        >
          {TONES[selected].sublabel}
        </motion.p>
      </div>
    </section>
  );
}
