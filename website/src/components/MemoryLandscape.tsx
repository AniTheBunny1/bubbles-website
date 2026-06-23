"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const memories = [
  { text: "You mentioned your flight.", meta: "Three weeks ago.", left: "5%",  top: "22%", size: "text-2xl md:text-4xl",  opacity: 0.78, rotate: "-2deg" },
  { text: "Aisle seat. Always.",         left: "66%", top: "28%", size: "text-xl md:text-3xl",   opacity: 0.62, rotate: "2deg"  },
  { text: "Gaurav in ten minutes.",      meta: "Your notes are ready.", left: "18%", top: "42%", size: "text-3xl md:text-5xl",  opacity: 0.90, rotate: "1deg"  },
  { text: "She prefers oat milk.",       left: "58%", top: "46%", size: "text-lg md:text-2xl",   opacity: 0.55, rotate: "-3deg" },
  { text: "Thursday. The renewal.",      left: "10%", top: "62%", size: "text-xl md:text-3xl",   opacity: 0.68, rotate: "2deg"  },
  { text: "You haven't called mom.",     left: "52%", top: "70%", size: "text-2xl md:text-4xl",  opacity: 0.72, rotate: "-1deg" },
  { text: "Two weeks.",                  left: "72%", top: "78%", size: "text-base md:text-xl",  opacity: 0.42, rotate: "3deg"  },
  { text: "The pitch. Rev-share.",       left: "30%", top: "82%", size: "text-lg md:text-2xl",   opacity: 0.58, rotate: "-2deg" },
  { text: "Workspace payment failed.",   left: "6%",  top: "88%", size: "text-base md:text-xl",  opacity: 0.44, rotate: "1deg"  },
];

export function MemoryLandscape() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleOpacity = useTransform(scrollYProgress, [0.04, 0.18, 0.60], [0, 1, 0]);
  const titleY       = useTransform(scrollYProgress, [0.04, 0.18], [40, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[160vh] overflow-hidden px-5 py-32">
      <motion.p
        style={{ opacity: titleOpacity, y: titleY }}
        className="relative z-20 mx-auto max-w-2xl text-center text-5xl font-semibold tracking-tight text-black md:text-7xl"
      >
        It remembers so you<br />don't have to.
      </motion.p>

      <div className="absolute inset-0 z-10 mx-auto max-w-7xl">
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
  const start   = 0.10 + index * 0.068;
  const opacity = useTransform(progress, [start, start + 0.12, start + 0.30], [0, memory.opacity, 0]);
  const y       = useTransform(progress, [start, start + 0.30], [28, -22]);

  return (
    <motion.div
      style={{ opacity, y, left: memory.left, top: memory.top, rotate: memory.rotate }}
      className={`absolute max-w-xs drift-slow text-black/85 ${memory.size}`}
    >
      <p className="text-shadow-soft leading-tight">{memory.text}</p>
      {memory.meta && <p className="mt-2 text-sm text-black/40 md:text-base">{memory.meta}</p>}
    </motion.div>
  );
}
