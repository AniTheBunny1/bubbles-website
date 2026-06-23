"use client";

import { motion } from "framer-motion";

const statements = [
  ["Most AI suggests.", "We act."],
  ["ChatGPT answers.", "Bubbles handles it."],
  ["Day 1:\nWho are you?", "Day 100:\nHow did the meeting with Gaurav go?"],
  ["You woke up.", "It did not."],
];

const stars = Array.from({ length: 60 }, (_, i) => ({
  left: `${(i * 41) % 100}%`,
  top: `${(i * 67) % 100}%`,
  opacity: 0.12 + (i % 6) * 0.06,
}));

export function DarkContrast() {
  return (
    <section className="relative z-10 min-h-[190vh] overflow-hidden bg-[#08080c] px-5 py-40 text-white">
      <div className="film-grain absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(51,68,122,.35),transparent_36%),linear-gradient(to_bottom,rgba(237,232,245,.55),transparent_14%,transparent_88%,rgba(237,232,245,.2))]" />
      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute h-0.5 w-0.5 rounded-full bg-white"
          style={{ left: star.left, top: star.top, opacity: star.opacity }}
        />
      ))}

      <div className="relative mx-auto flex max-w-5xl flex-col gap-64 py-24">
        {statements.map(([first, second]) => (
          <motion.div
            key={first}
            initial={{ opacity: 0, y: 38 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="text-center"
          >
            <p className="whitespace-pre-line text-4xl font-medium tracking-tight text-white/38 md:text-6xl">{first}</p>
            <p className="mt-5 whitespace-pre-line text-4xl font-semibold tracking-tight text-white md:text-6xl">{second}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
