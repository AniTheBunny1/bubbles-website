"use client";

import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const TASKS = [
  "Reply to Gaurav's email",        "Renew Spotify subscription",     "Book dentist appointment",
  "Check credit card statement",    "File GST return",                 "Order mom's birthday gift",
  "Fix Google Workspace billing",   "Set rent reminder",               "Cancel Audible trial",
  "Schedule car service",           "Send freelance invoice #14",       "Read Hemant's proposal",
  "Confirm flight check-in",        "Update LinkedIn",                  "Pay electricity bill",
  "Review Notion workspace",        "Call insurance agent",             "Backup phone photos",
  "Reply to recruiter on LinkedIn", "Set alarm for 6am standup",        "Order groceries for Sunday",
  "Check iCloud storage",           "Send project update to client",    "Block study time this week",
  "Renew domain hosting",           "Reply to Priya about collab",      "Clear download folder",
  "Book cab for airport",           "Read that Substack from last week","Pay outstanding Swiggy order",
];

export function InsideBubble() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bubbleScale   = useTransform(scrollYProgress, [0.05, 0.52, 0.85], [0.12, 1.35, 1.35]);
  const bubbleOpacity = useTransform(scrollYProgress, [0.04, 0.22, 0.88], [0, 1, 0]);
  const blurAmount    = useTransform(scrollYProgress, [0.05, 0.45], [0, 38]);
  const textOpacity   = useTransform(scrollYProgress, [0.38, 0.58, 0.82], [0, 1, 0]);
  const textScale     = useTransform(scrollYProgress, [0.38, 0.58], [0.88, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative z-10 flex min-h-[200vh] items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #07080f, #07080f)" }}
    >
      {/* Dense task text wall — the noise of life */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="absolute inset-0 flex flex-wrap content-start gap-x-6 gap-y-5 overflow-hidden p-8 pt-16"
        aria-hidden="true"
      >
        {/* repeat twice for density */}
        {[...TASKS, ...TASKS].map((task, i) => (
          <span
            key={i}
            className="shrink-0 whitespace-nowrap font-medium text-white/18"
            style={{ fontSize: `${11 + (i % 5) * 2}px` }}
          >
            {task}
          </span>
        ))}
      </motion.div>

      {/* The bubble — grows and blurs everything behind it */}
      <motion.div
        style={{ scale: bubbleScale, opacity: bubbleOpacity }}
        className="pointer-events-none absolute"
      >
        <BlurBubble blurAmount={blurAmount} />
      </motion.div>

      {/* Text inside the bubble */}
      <motion.p
        style={{ opacity: textOpacity, scale: textScale }}
        className="relative z-30 text-center text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
      >
        Let Bubbles<br />take care of this.
      </motion.p>
    </section>
  );
}

function BlurBubble({ blurAmount }: { blurAmount: MotionValue<number> }) {
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;
  return (
    <motion.div
      style={{ backdropFilter }}
      className="relative flex h-[min(88vw,780px)] w-[min(88vw,780px)] items-center justify-center rounded-full"
    >
      {/* Glass sphere */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.22), rgba(200,210,255,0.14) 32%, rgba(60,70,120,0.28) 64%, rgba(10,12,28,0.52))",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "inset 0 0 80px rgba(255,255,255,0.06), 0 0 120px rgba(180,190,255,0.12)",
        }}
      />
      {/* Iridescent shimmer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full opacity-15"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), rgba(160,210,255,0.3), rgba(255,180,230,0.25), transparent)",
        }}
      />
      {/* Specular highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: "28%",
          height: "18%",
          top: "14%",
          left: "22%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.45), transparent 70%)",
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
}
