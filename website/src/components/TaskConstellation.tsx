"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const tasks = [
  { task: "Order groceries.", left: "8%", top: "24%" },
  { task: "Book flight.", left: "28%", top: "14%" },
  { task: "Reply to email.", left: "62%", top: "20%" },
  { task: "Monitor deadline.", left: "78%", top: "42%" },
  { task: "Renew subscription.", left: "18%", top: "62%" },
  { task: "Schedule dentist.", left: "45%", top: "52%" },
  { task: "Send invoice.", left: "67%", top: "72%" },
  { task: "Check flight status.", left: "36%", top: "82%" },
];

const stars = Array.from({ length: 28 }, (_, i) => ({
  left: `${(i * 29) % 100}%`,
  top: `${(i * 47) % 100}%`,
  opacity: 0.18 + (i % 5) * 0.08,
}));

export function TaskConstellation() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const skyOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.55, 0.15]);

  return (
    <section ref={ref} className="relative z-10 min-h-screen overflow-hidden px-5 py-32">
      <motion.div style={{ opacity: skyOpacity }} className="absolute inset-0 bg-gradient-to-b from-transparent via-[#17182b] to-transparent" />
      <svg className="absolute inset-0 h-full w-full opacity-25" aria-hidden="true">
        <path d="M120 180 C 260 80, 420 190, 620 150 S 900 250, 1100 190" fill="none" stroke="white" strokeOpacity=".18" strokeWidth="1" />
        <path d="M260 580 C 440 450, 620 650, 850 520" fill="none" stroke="white" strokeOpacity=".12" strokeWidth="1" />
      </svg>

      {stars.map((star, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{ left: star.left, top: star.top, opacity: star.opacity, boxShadow: "0 0 14px rgba(255,255,255,.8)" }}
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
      className="absolute text-white drop-shadow-[0_0_24px_rgba(255,255,255,.18)]"
    >
      <p className="text-lg md:text-2xl">{item.task}</p>
      <p className="mt-1 text-sm text-white/55 md:text-base">Done.</p>
    </motion.div>
  );
}
