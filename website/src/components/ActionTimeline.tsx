"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const events = [
  ["9:01 AM", "Checked your subscriptions."],
  ["9:12 AM", "Google Workspace payment failed."],
  ["9:13 AM", "Sent the UPI alert."],
  ["9:15 AM", "Payment retried. Work email stayed alive."],
  ["9:47 AM", "Removed 7 dead newsletters."],
  ["10:00 AM", "₹2,145/month back in your pocket."],
];

export function ActionTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  /* background fades from fully transparent (top) to #07080f (bottom) */
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.65], [0, 1]);

  /* statement */
  const statementOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const statementY       = useTransform(scrollYProgress, [0.72, 0.88], [48, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[160vh] overflow-hidden px-5 py-24">

      {/* darkening overlay — fades in as you scroll, matching TaskConstellation */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 bg-[#07080f]"
      />

      <div className="relative mx-auto max-w-2xl">
        <div className="space-y-24 py-16">
          {events.map(([time, action], index) => (
            <TimelineEntry
              key={time}
              time={time}
              action={action}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: statementOpacity, y: statementY }}
          className="pb-24 pt-32 text-center"
        >
          <p className="text-6xl font-semibold tracking-tight text-white md:text-8xl">
            While you were sleeping.
          </p>
        </motion.div>
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
  const start   = 0.06 + index * 0.085;
  const opacity = useTransform(progress, [start, start + 0.09], [0, 1]);
  const y       = useTransform(progress, [start, start + 0.09], [28, 0]);

  /* each entry's text color transitions from dark (on light bg) to light (on dark bg) */
  const timeColor   = useTransform(progress, [0.15, 0.65], ["rgba(0,0,0,0.35)", "rgba(255,255,255,0.30)"]);
  const actionColor = useTransform(progress, [0.15, 0.65], ["rgba(0,0,0,0.75)", "rgba(255,255,255,0.80)"]);

  return (
    <motion.div style={{ opacity, y }} className="text-center">
      <motion.p style={{ color: timeColor }} className="mb-3 text-sm tracking-widest uppercase">
        {time}
      </motion.p>
      <motion.p style={{ color: actionColor }} className="text-2xl font-medium md:text-3xl">
        {action}
      </motion.p>
    </motion.div>
  );
}
