"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/*
  One pinned viewport, three acts. The soap bubble holds each statement
  while glass chips of its evidence drift in around the rim, then hand
  the stage to the next act as you scroll.
*/

interface Act {
  lead: string;
  gradient: string;
  tail: string;
  chips: { text: string; left: string; top: string; delay: number }[];
}

const ACTS: Act[] = [
  {
    lead: "Remembers",
    gradient: "everything",
    tail: "you tell it.",
    chips: [
      { text: "gaurav: skips small talk", left: "2%", top: "16%", delay: 0 },
      { text: "she prefers oat milk", left: "70%", top: "10%", delay: 0.6 },
      { text: "flight lands at 6am", left: "76%", top: "72%", delay: 1.2 },
      { text: "mom's birthday friday", left: "0%", top: "78%", delay: 1.8 },
    ],
  },
  {
    lead: "Spends only when you say",
    gradient: "yes",
    tail: ".",
    chips: [
      { text: "UPI request sent", left: "4%", top: "12%", delay: 0 },
      { text: "₹1,299 · approve?", left: "72%", top: "18%", delay: 0.6 },
      { text: "you said yes", left: "78%", top: "76%", delay: 1.2 },
      { text: "order confirmed", left: "6%", top: "82%", delay: 1.8 },
    ],
  },
  {
    lead: "No new app. It's a contact on",
    gradient: "WhatsApp",
    tail: ".",
    chips: [
      { text: "online", left: "10%", top: "10%", delay: 0 },
      { text: "no downloads", left: "74%", top: "14%", delay: 0.6 },
      { text: "just text it", left: "80%", top: "78%", delay: 1.2 },
      { text: "one contact", left: "4%", top: "84%", delay: 1.8 },
    ],
  },
];

// [fade in start, settled, hold until, gone]
const WINDOWS: [number, number, number, number][] = [
  [0.05, 0.13, 0.30, 0.38],
  [0.38, 0.46, 0.60, 0.68],
  [0.68, 0.76, 0.90, 0.97],
];

export function Statements() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
  const bubbleScale = useTransform(scrollYProgress, [0, 0.08], [0.88, 1]);

  return (
    <section ref={ref} className="relative z-10 h-[340vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: bubbleOpacity, scale: bubbleScale }}>
          <motion.div
            animate={{ scale: [1, 1.022, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative"
              style={{ width: "min(72vw, 500px)", height: "min(72vw, 500px)" }}
            >
              {/* ground shadow */}
              <div
                className="pointer-events-none absolute"
                style={{
                  width: "70%", height: "10%",
                  bottom: "-11%", left: "15%",
                  background: "radial-gradient(ellipse, rgba(120,100,180,0.13) 0%, transparent 68%)",
                  filter: "blur(16px)",
                }}
              />

              {/* outer ambient halo */}
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  inset: "-18%",
                  background: "radial-gradient(circle, rgba(195,185,255,0.09) 0%, transparent 56%)",
                  filter: "blur(24px)",
                }}
              />

              {/* THE BUBBLE — overflow-hidden clips all layers */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {/* backdrop refraction */}
                <div
                  className="absolute inset-0"
                  style={{ backdropFilter: "blur(1.5px) brightness(1.05) saturate(1.12)" }}
                />

                {/* soap film */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(250,250,255,0.008) 35%, rgba(215,225,255,0.04) 70%, rgba(208,218,255,0.14) 88%, rgba(212,222,255,0.24) 100%)",
                    boxShadow:
                      "inset 0 0 0 1px rgba(215,225,255,0.42), inset 0 0 0 0.5px rgba(255,255,255,0.32), 0 0 0 0.5px rgba(210,220,255,0.20)",
                  }}
                />

                {/* rainbow interference band */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 15%, rgba(255,108,152,0.08) 28%, rgba(255,212,62,0.065) 41%, rgba(95,255,178,0.065) 54%, rgba(62,158,255,0.08) 67%, rgba(212,84,255,0.065) 79%, transparent 89%)",
                  }}
                />

                {/* counter-rotating pastel wash */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 195deg, transparent 22%, rgba(255,212,232,0.055) 39%, rgba(212,235,255,0.055) 56%, rgba(235,212,255,0.055) 72%, transparent 82%)",
                  }}
                />

                {/* gravity film gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(175,210,255,0.08) 0%, transparent 22%, transparent 74%, rgba(198,175,255,0.06) 100%)",
                  }}
                />

                {/* interior frosting so text reads */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 52%, rgba(244,242,254,0.30) 0%, rgba(244,242,254,0.12) 40%, transparent 62%)",
                  }}
                />

                {/* primary specular */}
                <div
                  className="absolute"
                  style={{
                    width: "28%", height: "17%", top: "10%", left: "14%",
                    background:
                      "radial-gradient(ellipse at 38% 32%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.54) 30%, rgba(255,255,255,0) 70%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* sharp specular core */}
                <div
                  className="absolute"
                  style={{
                    width: "7%", height: "4.5%", top: "11%", left: "19%",
                    background: "radial-gradient(ellipse, rgba(255,255,255,1) 0%, transparent 62%)",
                    filter: "blur(1px)",
                  }}
                />

                {/* secondary specular */}
                <div
                  className="absolute"
                  style={{
                    width: "9%", height: "5.5%", top: "21%", left: "67%",
                    background: "radial-gradient(ellipse, rgba(255,255,255,0.58) 0%, transparent 66%)",
                    filter: "blur(2.5px)",
                  }}
                />

                {/* bottom caustic rim */}
                <div
                  className="absolute"
                  style={{
                    width: "42%", height: "7%", bottom: "11%", left: "29%",
                    background: "radial-gradient(ellipse, rgba(198,214,255,0.10) 0%, transparent 66%)",
                    filter: "blur(5px)",
                  }}
                />

                {/* the three statements, taking turns inside the bubble */}
                {ACTS.map((act, i) => (
                  <Statement key={act.gradient} act={act} window={WINDOWS[i]} progress={scrollYProgress} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* evidence chips ringing the bubble */}
        <div
          className="pointer-events-none absolute"
          style={{ width: "min(96vw, 760px)", height: "min(96vw, 700px)" }}
        >
          {ACTS.map((act, i) =>
            act.chips.map((chip, j) => (
              <Chip
                key={chip.text}
                chip={chip}
                window={WINDOWS[i]}
                index={j}
                progress={scrollYProgress}
              />
            )),
          )}
        </div>
      </div>
    </section>
  );
}

function Statement({
  act,
  window: [a, b, c, d],
  progress,
}: {
  act: Act;
  window: [number, number, number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [26, 0, 0, -26]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <p
        className="px-[10%] text-center text-[1.45rem] font-semibold leading-snug tracking-tight md:text-4xl"
        style={{ color: "rgba(26,16,54,0.82)" }}
      >
        {act.lead} <span className="text-iridescent">{act.gradient}</span>
        {act.tail.startsWith(".") ? act.tail : <> {act.tail}</>}
      </p>
    </motion.div>
  );
}

function Chip({
  chip,
  window: [a, b, c, d],
  index,
  progress,
}: {
  chip: Act["chips"][number];
  window: [number, number, number, number];
  index: number;
  progress: MotionValue<number>;
}) {
  // chips trail the statement slightly, each a beat later than the last
  const lag = index * 0.018;
  const opacity = useTransform(progress, [a + lag, b + lag, c, d], [0, 1, 1, 0]);
  const drift = index % 2 === 0 ? 34 : -34;
  const y = useTransform(progress, [a + lag, b + lag, c, d], [drift, 0, 0, -drift * 0.6]);
  const scale = useTransform(progress, [a + lag, b + lag], [0.85, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale, left: chip.left, top: chip.top }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{
          duration: 4.6 + index * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: chip.delay,
        }}
        className="rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-medium text-black/60 shadow-[0_4px_24px_rgba(140,130,200,0.14)] backdrop-blur-md md:text-base"
      >
        {chip.text}
      </motion.div>
    </motion.div>
  );
}
