"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const tasks = [
  { task: "Bubbles ordered groceries.", left: "8%", top: "24%" },
  { task: "Bubbles booked the flight.", left: "28%", top: "14%" },
  { task: "Bubbles replied to the email.", left: "62%", top: "20%" },
  { task: "Bubbles watched the deadline.", left: "76%", top: "42%" },
  { task: "Bubbles renewed the subscription.", left: "18%", top: "62%" },
  { task: "Bubbles scheduled the dentist.", left: "45%", top: "52%" },
  { task: "Bubbles sent the invoice.", left: "67%", top: "72%" },
  { task: "Bubbles checked the flight status.", left: "34%", top: "82%" },
];

const stars = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 29) % 100}%`,
  top: `${(i * 47) % 100}%`,
  opacity: 0.18 + (i % 5) * 0.08,
}));

export function TaskConstellation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skyOpacity = useTransform(scrollYProgress, [0, 0.3], [0.86, 1]);

  return (
    <section ref={ref} className="relative z-10 min-h-screen overflow-hidden bg-[#070913] px-5 py-32" style={{ paddingTop: "8rem" }}>
      {/* Transition fade from light sections above */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(232,226,240,0.18), transparent)" }} />
      <motion.div style={{ opacity: skyOpacity }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(37,43,78,.5),transparent_45%),linear-gradient(to_bottom,#050711,#0b1020_55%,#050711)]" />

      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{ left: star.left, top: star.top, opacity: star.opacity, boxShadow: "0 0 8px rgba(255,255,255,.55)" }}
        />
      ))}

      <div className="absolute inset-0 mx-auto max-w-7xl">
        {tasks.map((item, index) => (
          <TaskStar key={item.task} item={item} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function TaskStar({
  item,
  index,
  progress,
}: {
  item: (typeof tasks)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.1 + index * 0.055;
  const opacity = useTransform(progress, [start, start + 0.16], [0, 1]);
  const y = useTransform(progress, [start, start + 0.16], [18, 0]);

  return (
    <motion.div
      style={{ opacity, y, left: item.left, top: item.top }}
      className="absolute text-white"
    >
      <p className="text-lg md:text-2xl">{item.task}</p>
      <p className="mt-1 text-sm text-white/55 md:text-base">Done.</p>
    </motion.div>
  );
}
