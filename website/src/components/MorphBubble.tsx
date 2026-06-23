"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatingMemories = [
  { text: "Meeting with Gaurav",         startX: "-32vw", startY: "-20vh", driftStart: 0.30, driftEnd: 0.50 },
  { text: "Mum's birthday this week",    startX: "28vw",  startY: "-24vh", driftStart: 0.32, driftEnd: 0.52 },
  { text: "Running low on groceries",    startX: "-34vw", startY: "6vh",   driftStart: 0.31, driftEnd: 0.51 },
  { text: "These subscriptions add up",  startX: "30vw",  startY: "10vh",  driftStart: 0.33, driftEnd: 0.53 },
  { text: "That proposal from Hemant",   startX: "-18vw", startY: "26vh",  driftStart: 0.35, driftEnd: 0.55 },
  { text: "Flight lands at 6am",         startX: "22vw",  startY: "24vh",  driftStart: 0.34, driftEnd: 0.54 },
  { text: "Too many newsletters",        startX: "-6vw",  startY: "-32vh", driftStart: 0.29, driftEnd: 0.49 },
  { text: "Remind me Sunday",            startX: "8vw",   startY: "34vh",  driftStart: 0.36, driftEnd: 0.56 },
];

export function MorphBubble() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // flat arc → full sphere
  const scaleY        = useTransform(scrollYProgress, [0.06, 0.26], [0.018, 1]);
  const bubbleOpacity = useTransform(scrollYProgress, [0.04, 0.16, 0.84, 0.94], [0, 1, 1, 0]);
  // glow that intensifies as memories are absorbed
  const absorbGlow    = useTransform(scrollYProgress, [0.26, 0.40, 0.58, 0.68], [0, 1, 1, 0]);
  const textOpacity   = useTransform(scrollYProgress, [0.56, 0.68], [0, 1]);
  const textY         = useTransform(scrollYProgress, [0.56, 0.68], [16, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center">

        {/* The bubble */}
        <motion.div style={{ scaleY, opacity: bubbleOpacity }}>
          <motion.div
            animate={{ scale: [1, 1.022, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative"
              style={{ width: "min(60vw, 460px)", height: "min(60vw, 460px)" }}
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

              {/* absorption glow — pulses as memories drift in */}
              <motion.div
                style={{
                  opacity: absorbGlow,
                  position: "absolute",
                  inset: "-16%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(195,190,255,0.22) 0%, rgba(175,205,255,0.11) 44%, transparent 68%)",
                  filter: "blur(26px)",
                  pointerEvents: "none",
                }}
              />

              {/* outer ambient halo */}
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  inset: "-18%",
                  background: "radial-gradient(circle, rgba(195,185,255,0.07) 0%, transparent 56%)",
                  filter: "blur(24px)",
                }}
              />

              {/* THE BUBBLE — overflow-hidden clips all layers */}
              <div className="absolute inset-0 rounded-full overflow-hidden">

                {/* ① backdrop refraction */}
                <div
                  className="absolute inset-0"
                  style={{ backdropFilter: "blur(1.5px) brightness(1.05) saturate(1.12)" }}
                />

                {/* ② soap film */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(250,250,255,0.008) 35%, rgba(215,225,255,0.04) 70%, rgba(208,218,255,0.14) 88%, rgba(212,222,255,0.24) 100%)",
                    boxShadow:
                      "inset 0 0 0 1px rgba(215,225,255,0.42), inset 0 0 0 0.5px rgba(255,255,255,0.32), 0 0 0 0.5px rgba(210,220,255,0.20)",
                  }}
                />

                {/* ③ rainbow interference band */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 15%, rgba(255,108,152,0.08) 28%, rgba(255,212,62,0.065) 41%, rgba(95,255,178,0.065) 54%, rgba(62,158,255,0.08) 67%, rgba(212,84,255,0.065) 79%, transparent 89%)",
                  }}
                />

                {/* ④ counter-rotating pastel wash */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 195deg, transparent 22%, rgba(255,212,232,0.055) 39%, rgba(212,235,255,0.055) 56%, rgba(235,212,255,0.055) 72%, transparent 82%)",
                  }}
                />

                {/* ⑤ gravity film gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(175,210,255,0.08) 0%, transparent 22%, transparent 74%, rgba(198,175,255,0.06) 100%)",
                  }}
                />

                {/* ⑥ horizontal bright band */}
                <div
                  className="absolute"
                  style={{
                    top: "46%", left: "8%", right: "8%", height: "8%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.22) 0%, rgba(220,235,255,0.10) 40%, transparent 72%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* ⑦ interior frosting */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 52%, rgba(238,236,252,0.14) 0%, rgba(238,236,252,0.06) 36%, transparent 60%)",
                  }}
                />

                {/* ⑧ inset caustic glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow:
                      "inset 0 0 38px rgba(218,226,255,0.06), inset 0 0 88px rgba(218,226,255,0.03)",
                  }}
                />

                {/* ⑨ primary specular */}
                <div
                  className="absolute"
                  style={{
                    width: "28%", height: "17%", top: "10%", left: "14%",
                    background:
                      "radial-gradient(ellipse at 38% 32%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.54) 30%, rgba(255,255,255,0) 70%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* ⑩ sharp specular core */}
                <div
                  className="absolute"
                  style={{
                    width: "7%", height: "4.5%", top: "11%", left: "19%",
                    background: "radial-gradient(ellipse, rgba(255,255,255,1) 0%, transparent 62%)",
                    filter: "blur(1px)",
                  }}
                />

                {/* ⑪ secondary specular */}
                <div
                  className="absolute"
                  style={{
                    width: "9%", height: "5.5%", top: "21%", left: "67%",
                    background: "radial-gradient(ellipse, rgba(255,255,255,0.58) 0%, transparent 66%)",
                    filter: "blur(2.5px)",
                  }}
                />

                {/* ⑫ tertiary glint */}
                <div
                  className="absolute"
                  style={{
                    width: "3.5%", height: "2.2%", top: "63%", left: "22%",
                    background: "radial-gradient(ellipse, rgba(255,255,255,0.32) 0%, transparent 68%)",
                    filter: "blur(1.5px)",
                  }}
                />

                {/* ⑬ bottom caustic rim */}
                <div
                  className="absolute"
                  style={{
                    width: "42%", height: "7%", bottom: "11%", left: "29%",
                    background: "radial-gradient(ellipse, rgba(198,214,255,0.10) 0%, transparent 66%)",
                    filter: "blur(5px)",
                  }}
                />

                {/* ⑭ text — appears after memories are absorbed */}
                <motion.div
                  style={{ opacity: textOpacity, y: textY }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p
                    className="px-10 text-center text-[1.65rem] font-semibold leading-snug tracking-tight md:text-4xl"
                    style={{ color: "rgba(26,16,54,0.80)" }}
                  >
                    everything,<br />in one place.
                  </p>
                </motion.div>

              </div>{/* /bubble */}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating memories drawn toward the bubble by gravity */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {floatingMemories.map((mem) => (
            <FloatingMemory key={mem.text} memory={mem} progress={scrollYProgress} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FloatingMemory({
  memory,
  progress,
}: {
  memory: (typeof floatingMemories)[number];
  progress: MotionValue<number>;
}) {
  const { driftStart, driftEnd, startX, startY, text } = memory;
  const appearAt = driftStart - 0.10;

  const opacity = useTransform(
    progress,
    [appearAt, appearAt + 0.07, driftEnd - 0.06, driftEnd + 0.02],
    [0, 0.82, 0.82, 0],
  );
  const x     = useTransform(progress, [driftStart, driftEnd], [startX, "0vw"]);
  const y     = useTransform(progress, [driftStart, driftEnd], [startY, "0vh"]);
  const scale = useTransform(progress, [driftStart + 0.06, driftEnd], [1, 0.08]);

  return (
    <motion.div
      style={{ opacity, x, y, scale, position: "absolute" }}
      className="text-sm font-medium text-black/65 md:text-base"
    >
      {text}
    </motion.div>
  );
}
