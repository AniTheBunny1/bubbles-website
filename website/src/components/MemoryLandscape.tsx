"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Depth = "fg" | "mg" | "bg";

const memories = [
  { user: "I have a flight tomorrow.",       action: "aisle seat. bag policy checked.",           left: "4%",  top: "12%", size: "text-xl md:text-3xl",  opacity: 0.82, rotate: "-2deg", depth: "mg" as Depth },
  { user: "Need to call Gaurav.",            action: "last spoke 3 weeks ago. hates small talk.", left: "60%", top: "18%", size: "text-lg md:text-2xl",  opacity: 0.65, rotate: "2deg",  depth: "mg" as Depth },
  { user: "Running low on groceries.",       action: "cart filled. delivery in eight minutes.",   left: "16%", top: "30%", size: "text-2xl md:text-4xl", opacity: 0.88, rotate: "1deg",  depth: "fg" as Depth },
  { user: "Mom's birthday this week.",       action: "gift ordered. reminder set.",               left: "56%", top: "36%", size: "text-base md:text-xl", opacity: 0.60, rotate: "-3deg", depth: "bg" as Depth },
  { user: "Can't miss the dentist.",         action: "tuesday 11am. blocked.",                   left: "6%",  top: "48%", size: "text-xl md:text-3xl",  opacity: 0.72, rotate: "3deg",  depth: "mg" as Depth },
  { user: "These subscriptions add up.",     action: "₹2,145 in dead subs. killed seven.",       left: "50%", top: "53%", size: "text-lg md:text-2xl",  opacity: 0.68, rotate: "-1deg", depth: "fg" as Depth },
  { user: "That proposal from Hemant.",      action: "saved. flagged for thursday.",             left: "22%", top: "61%", size: "text-base md:text-xl", opacity: 0.55, rotate: "2deg",  depth: "bg" as Depth },
  { user: "Flight lands at 6am.",            action: "cab booked. alarm set for 5.",             left: "66%", top: "67%", size: "text-xl md:text-2xl",  opacity: 0.74, rotate: "-2deg", depth: "mg" as Depth },
  { user: "She prefers oat milk.",           action: "noted. won't forget.",                    left: "8%",  top: "74%", size: "text-base md:text-xl", opacity: 0.50, rotate: "1deg",  depth: "bg" as Depth },
  { user: "Workspace keeps logging me out.", action: "billing fixed. won't happen again.",      left: "40%", top: "78%", size: "text-lg md:text-2xl",  opacity: 0.62, rotate: "-3deg", depth: "mg" as Depth },
  { user: "Remind me on Sunday.",            action: "10am. i'll be there.",                    left: "70%", top: "83%", size: "text-base md:text-xl", opacity: 0.56, rotate: "2deg",  depth: "bg" as Depth },
  { user: "Too many unread newsletters.",    action: "archived. inbox at zero.",                left: "12%", top: "87%", size: "text-lg md:text-2xl",  opacity: 0.65, rotate: "-1deg", depth: "fg" as Depth },
  { user: "Need context before the call.",   action: "notes loaded. last spoke two weeks ago.", left: "54%", top: "91%", size: "text-base md:text-xl", opacity: 0.52, rotate: "3deg",  depth: "bg" as Depth },
  { user: "Running late on the invoice.",    action: "sent. cc'd the right people.",            left: "28%", top: "94%", size: "text-lg md:text-2xl",  opacity: 0.60, rotate: "-2deg", depth: "mg" as Depth },
];

// Organic irregular polygons — broken soap bubble fragments
const fragmentShapes = [
  "polygon(8% 2%, 96% 0%, 100% 88%, 88% 100%, 2% 96%, 0% 12%)",
  "polygon(4% 6%, 88% 0%, 100% 14%, 98% 92%, 82% 100%, 6% 98%, 0% 58%)",
  "polygon(14% 0%, 100% 6%, 94% 96%, 86% 100%, 0% 88%, 6% 28%)",
  "polygon(6% 10%, 88% 2%, 100% 82%, 90% 100%, 18% 96%, 0% 64%, 10% 28%)",
  "polygon(2% 18%, 82% 0%, 100% 10%, 96% 86%, 68% 100%, 0% 94%)",
  "polygon(10% 0%, 92% 4%, 98% 78%, 84% 100%, 4% 92%, 0% 38%)",
  "polygon(6% 4%, 94% 2%, 100% 92%, 72% 100%, 2% 88%, 8% 22%)",
];

const depthConfig: Record<Depth, { scaleFactor: number; opacityCap: number; yRange: [number, number] }> = {
  fg: { scaleFactor: 1.14, opacityCap: 1.0,  yRange: [28, -22] },
  mg: { scaleFactor: 1.0,  opacityCap: 1.0,  yRange: [24, -18] },
  bg: { scaleFactor: 0.72, opacityCap: 0.42, yRange: [18, -10] },
};

export function MemoryLandscape() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleOpacity = useTransform(scrollYProgress, [0.03, 0.15, 0.55], [0, 1, 0]);
  const titleY       = useTransform(scrollYProgress, [0.03, 0.15], [40, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[200vh] overflow-x-clip px-5 py-32">

      {/* Giant partially off-screen bubbles — atmospheric depth */}
      <GiantBubble size={900}  posX="-120px"              posY="80px"               opacity={0.14} rotDur={90}  />
      <GiantBubble size={1100} posX="calc(100% + 180px)"  posY="38%"                opacity={0.11} rotDur={110} />
      <GiantBubble size={760}  posX="48%"                 posY="calc(100% + 180px)" opacity={0.13} rotDur={78}  />

      <motion.p
        style={{ opacity: titleOpacity, y: titleY }}
        className="relative z-20 mx-auto max-w-2xl text-center text-5xl font-semibold tracking-tight text-black md:text-7xl"
      >
        It remembers so you<br />don't have to.
      </motion.p>

      <div className="absolute inset-0 z-10 mx-auto max-w-7xl">
        {memories.map((memory, index) => (
          <MemoryFragment key={memory.user} memory={memory} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function GiantBubble({
  size, posX, posY, opacity, rotDur,
}: {
  size: number; posX: string; posY: string; opacity: number; rotDur: number;
}) {
  return (
    <div
      className="pointer-events-none absolute z-0"
      style={{
        width: size,
        height: size,
        left: posX,
        top: posY,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        overflow: "hidden",
        opacity,
      }}
    >
      {/* soap film edge */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(250,250,255,0.008) 35%, rgba(215,225,255,0.035) 70%, rgba(208,218,255,0.10) 88%, rgba(212,222,255,0.18) 100%)",
          boxShadow:
            "inset 0 0 0 1.5px rgba(215,225,255,0.28), inset 0 0 0 0.5px rgba(255,255,255,0.18)",
        }}
      />
      {/* slow iridescent rotation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: rotDur, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 15%, rgba(255,108,152,0.06) 28%, rgba(255,212,62,0.05) 41%, rgba(95,255,178,0.05) 54%, rgba(62,158,255,0.06) 67%, rgba(212,84,255,0.05) 79%, transparent 89%)",
        }}
      />
      {/* primary specular */}
      <div
        className="absolute"
        style={{
          width: "16%", height: "10%", top: "9%", left: "15%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />
    </div>
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
  const cfg   = depthConfig[memory.depth];
  const start = 0.08 + index * 0.046;
  const opacity = useTransform(
    progress,
    [start, start + 0.10, start + 0.28],
    [0, Math.min(memory.opacity, cfg.opacityCap), 0],
  );
  const y     = useTransform(progress, [start, start + 0.28], cfg.yRange);
  const shape = fragmentShapes[index % fragmentShapes.length];

  return (
    // outer: positioning, depth scale, scroll-driven opacity + y
    <motion.div
      style={{ opacity, y, left: memory.left, top: memory.top, rotate: memory.rotate, scale: cfg.scaleFactor }}
      className={`absolute ${memory.size}`}
    >
      {/* inner: breathing pulse (separate to avoid conflicting with scale) */}
      <motion.div
        animate={{ scale: [1, 1.026, 1] }}
        transition={{
          scale: { duration: 3.2 + (index % 5) * 0.55, repeat: Infinity, ease: "easeInOut", delay: index * 0.28 },
        }}
      >
        <div className="relative">
          {/* glass membrane */}
          <div
            className="pointer-events-none absolute"
            style={{
              inset: "-14px -22px",
              clipPath: shape,
              background: "rgba(238, 242, 255, 0.07)",
              boxShadow: "inset 0 0 0 0.5px rgba(200, 215, 255, 0.36), 0 2px 10px rgba(190, 205, 255, 0.06)",
            }}
          />
          {/* iridescent edge shimmer */}
          <div
            className="pointer-events-none absolute"
            style={{
              inset: "-14px -22px",
              clipPath: shape,
              background:
                "conic-gradient(from 200deg at 50% 50%, rgba(255,130,170,0.07), rgba(255,220,80,0.055), rgba(80,240,200,0.055), rgba(80,160,255,0.07), rgba(200,90,255,0.065), rgba(255,130,170,0.07))",
              opacity: 0.8,
            }}
          />
          {/* text */}
          <p className="relative z-10 text-shadow-soft font-medium leading-tight text-black/85">
            {memory.user}
          </p>
          <p className="relative z-10 mt-1.5 text-[0.62em] font-normal leading-snug text-black/38">
            {memory.action}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
