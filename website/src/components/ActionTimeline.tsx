"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const events = [
  ["9:01 AM", "Bubbles checked your subscriptions."],
  ["9:12 AM", "Google Workspace payment failed."],
  ["9:13 AM", "Bubbles sent the UPI alert."],
  ["9:15 AM", "Payment retried. Work email stayed alive."],
  ["9:47 AM", "Bubbles removed 7 dead newsletters."],
  ["10:00 AM", "Rs 2,145/month saved."],
];

export function ActionTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const statementOpacity = useTransform(scrollYProgress, [0.72, 0.9], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.72, 0.9], [40, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[145vh] px-5 py-32">
      <div className="mx-auto max-w-3xl">
        <div className="relative mx-auto w-full py-16">
          <div className="space-y-20">
            {events.map(([time, action], index) => (
              <TimelineEntry key={time} time={time} action={action} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        <motion.h2
          style={{ opacity: statementOpacity, y: statementY }}
          className="pt-40 text-center text-5xl font-semibold tracking-tight text-black md:text-7xl"
        >
          While you were sleeping.
        </motion.h2>
      </div>
    </section>
  );
}

function TimelineEntry({
  time,
  action,
  index,
  progress,
}: {
  time: string;
  action: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.08 + index * 0.09;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.1], [24, 0]);

  return (
    <motion.div style={{ opacity, y }} className="relative mx-auto w-full max-w-sm text-center">
      <p className="mb-3 text-sm text-black/40">{time}</p>
      <p className="text-xl text-black/70 md:text-2xl">{action}</p>
    </motion.div>
  );
}
