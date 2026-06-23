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

  /* background descends into midnight as you scroll */
  const bgOpacity        = useTransform(scrollYProgress, [0.05, 0.52], [0, 1]);

  /* the thread fills downward */
  const lineScaleY       = useTransform(scrollYProgress, [0.08, 0.72], [0, 1]);

  /* closing statement */
  const statementOpacity = useTransform(scrollYProgress, [0.74, 0.89], [0, 1]);
  const statementY       = useTransform(scrollYProgress, [0.74, 0.89], [52, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[185vh] overflow-hidden px-5 py-24">

      {/* darkening overlay */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 bg-[#07080f]"
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="relative py-16">

          {/* The thread — dim track behind, bright fill on top */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10">
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-white/55 via-white/30 to-transparent"
            />
          </div>

          <div className="space-y-24">
            {events.map(([time, action], index) => (
              <PulseEntry
                key={time}
                time={time}
                action={action}
                index={index}
                progress={scrollYProgress}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Statement */}
        <motion.div
          style={{ opacity: statementOpacity, y: statementY }}
          className="pb-24 pt-28 text-center"
        >
          <p className="text-5xl font-semibold tracking-tight text-white md:text-7xl lg:text-8xl">
            While you were sleeping.
          </p>
        </motion.div>
      </div>

    </section>
  );
}

function PulseEntry({
  time,
  action,
  index,
  progress,
  isLeft,
}: {
  time: string;
  action: string;
  index: number;
  progress: MotionValue<number>;
  isLeft: boolean;
}) {
  const start = 0.06 + index * 0.082;

  /* entry reveal */
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const y       = useTransform(progress, [start, start + 0.08], [22, 0]);

  /* dot: scale up on fire, settle back */
  const dotScale        = useTransform(progress, [start, start + 0.04, start + 0.10], [0, 2.2, 1]);
  /* pulse ring: expands outward and fades */
  const ringScale       = useTransform(progress, [start, start + 0.11], [1, 3.8]);
  const ringOpacity     = useTransform(progress, [start, start + 0.04, start + 0.11], [0, 0.5, 0]);

  /* text: shift from dark (on light bg) to white (on dark bg) */
  const timeColor   = useTransform(progress, [0.12, 0.52], ["rgba(0,0,0,0.30)", "rgba(255,255,255,0.28)"]);
  const actionColor = useTransform(progress, [0.12, 0.52], ["rgba(0,0,0,0.72)", "rgba(255,255,255,0.84)"]);

  return (
    <motion.div style={{ opacity, y }} className="relative flex items-center gap-0">

      {/* Left content */}
      <div className={`w-1/2 pr-10 text-right ${isLeft ? "" : "invisible"}`}>
        <motion.p style={{ color: timeColor }} className="mb-1.5 text-[11px] font-medium tracking-widest uppercase">
          {time}
        </motion.p>
        <motion.p style={{ color: actionColor }} className="text-lg font-medium leading-snug md:text-xl">
          {action}
        </motion.p>
      </div>

      {/* Dot on the thread */}
      <div className="absolute left-1/2 z-10 -translate-x-1/2">
        {/* expanding pulse ring */}
        <motion.div
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
        {/* core dot */}
        <motion.div
          style={{ scale: dotScale, boxShadow: "0 0 10px 2px rgba(255,255,255,0.55)" }}
          className="h-2.5 w-2.5 rounded-full bg-white"
        />
      </div>

      {/* Right content */}
      <div className={`w-1/2 pl-10 ${!isLeft ? "" : "invisible"}`}>
        <motion.p style={{ color: timeColor }} className="mb-1.5 text-[11px] font-medium tracking-widest uppercase">
          {time}
        </motion.p>
        <motion.p style={{ color: actionColor }} className="text-lg font-medium leading-snug md:text-xl">
          {action}
        </motion.p>
      </div>

    </motion.div>
  );
}
