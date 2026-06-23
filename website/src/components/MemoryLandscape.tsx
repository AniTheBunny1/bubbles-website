"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const memories = [
  { text: "You mentioned your flight.", meta: "Three weeks ago.", left: "9%", top: "18%", size: "text-xl md:text-3xl", opacity: 0.75, rotate: "-3deg" },
  { text: "You prefer aisle seats.", left: "62%", top: "22%", size: "text-lg md:text-2xl", opacity: 0.62, rotate: "2deg" },
  { text: "Meeting with Gaurav in ten minutes.", left: "24%", top: "44%", size: "text-2xl md:text-4xl", opacity: 0.88, rotate: "1deg" },
  { text: "Want me to pull up your notes?", left: "54%", top: "52%", size: "text-base md:text-xl", opacity: 0.58, rotate: "-2deg" },
  { text: "She prefers oat milk.", left: "12%", top: "72%", size: "text-sm md:text-lg", opacity: 0.42, rotate: "4deg" },
  { text: "Your subscription renews Thursday.", left: "68%", top: "76%", size: "text-lg md:text-2xl", opacity: 0.66, rotate: "-1deg" },
  { text: "You have not called mom in two weeks.", left: "38%", top: "84%", size: "text-base md:text-xl", opacity: 0.54, rotate: "3deg" },
];

export function MemoryLandscape() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.22, 0.65], [0, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.05, 0.22], [30, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[140vh] overflow-hidden px-5 py-32">
      <motion.p
        style={{ opacity: titleOpacity, y: titleY }}
        className="mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight text-black md:text-6xl"
      >
        You told me that already.
      </motion.p>

      <div className="absolute inset-0 mx-auto max-w-7xl">
        {memories.map((memory, index) => (
          <MemoryFragment key={memory.text} memory={memory} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function MemoryFragment({
  memory,
  index,
  progress,
}: {
  memory: (typeof memories)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.12 + index * 0.075;
  const opacity = useTransform(progress, [start, start + 0.14, start + 0.34], [0, memory.opacity, 0]);
  const y = useTransform(progress, [start, start + 0.34], [34, -28]);

  return (
    <motion.div
      style={{ opacity, y, left: memory.left, top: memory.top, rotate: memory.rotate }}
      className={`absolute max-w-[18rem] drift-slow text-black/80 ${memory.size}`}
    >
      <p className="text-shadow-soft">{memory.text}</p>
      {memory.meta && <p className="mt-2 text-sm text-black/35 md:text-base">{memory.meta}</p>}
    </motion.div>
  );
}
