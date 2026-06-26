"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";

export function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 50, damping: 30 });
  const springY = useSpring(pointerY, { stiffness: 50, damping: 30 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const highlightX = useTransform(springX, [-0.5, 0.5], ["34%", "66%"]);
  const highlightY = useTransform(springY, [-0.5, 0.5], ["28%", "58%"]);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20"
    >
      <motion.div
        style={{ scale, opacity, y, rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative mb-14 aspect-square w-60 md:w-80"
      >
        {/* iridescent ambient halo — prismatic outer glow, slow breathing */}
        <motion.div
          animate={{ scale: [1, 1.20, 1], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[-32%] rounded-full pointer-events-none"
          style={{
            background:
              "conic-gradient(from 40deg, rgba(255,130,175,0.50), rgba(255,210,75,0.44), rgba(75,245,185,0.42), rgba(75,155,255,0.48), rgba(195,75,255,0.44), rgba(255,130,175,0.50))",
            filter: "blur(28px)",
          }}
        />
        <motion.div
          animate={{ y: [-8, 8, -8], scale: [1, 1.03, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 overflow-hidden rounded-full"
        >
          <img
            src="/logo.webp"
            alt="Bubbles"
            className="h-full w-full object-contain"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-3 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,.55),rgba(158,205,255,.35),rgba(255,176,225,.28),transparent)] opacity-20 mix-blend-screen"
          />
          <motion.div
            style={{ left: highlightX, top: highlightY }}
            className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.48),rgba(255,255,255,.12)_38%,transparent_70%)]"
          />
          <motion.div
            animate={{ x: ["-12%", "14%", "-12%"], y: ["10%", "-8%", "10%"] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-10 rounded-full bg-[radial-gradient(circle_at_40%_45%,rgba(255,255,255,.32),transparent_54%)]"
          />
        </motion.div>

        {/* caustic arc — bright crescent sweeping the edge like sun catching a dewdrop */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute pointer-events-none"
          style={{
            inset: "-10px",
            borderRadius: "50%",
            background:
              "conic-gradient(from 248deg, transparent 0%, rgba(255,255,255,1) 5%, rgba(255,248,220,0.70) 14%, transparent 24%, transparent 100%)",
            WebkitMask:
              "radial-gradient(circle at center, transparent calc(100% - 14px), white calc(100% - 10px), white 100%)",
            mask:
              "radial-gradient(circle at center, transparent calc(100% - 14px), white calc(100% - 10px), white 100%)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ scale, opacity, y }}
        className="z-10 mx-auto max-w-3xl space-y-6 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-semibold tracking-tight text-black md:text-8xl"
        >
          <span style={{ color: "#000000", WebkitTextFillColor: "#000000" }}>Bubbles</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-gray-700 md:text-xl"
        >
          The conversation that runs your life.
        </motion.p>
      </motion.div>
    </section>
  );
}
