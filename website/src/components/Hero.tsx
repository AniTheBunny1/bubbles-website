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
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 420], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 60]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 50, damping: 30 });
  const springY = useSpring(pointerY, { stiffness: 50, damping: 30 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
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
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16"
    >
      {/* the bubble, floating over its own wordmark */}
      <motion.div
        style={{ scale, opacity, y, rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative -mb-8 aspect-square w-52 md:-mb-14 md:w-72"
      >
        <motion.div
          animate={{ y: [-7, 7, -7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* soft prismatic halo, restrained */}
          <div
            className="absolute inset-[-22%] rounded-full"
            style={{
              background:
                "conic-gradient(from 40deg, rgba(255,140,185,0.16), rgba(255,215,95,0.13), rgba(95,245,190,0.12), rgba(95,165,255,0.16), rgba(200,95,255,0.13), rgba(255,140,185,0.16))",
              filter: "blur(30px)",
            }}
          />
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <img
              src="/logo.webp"
              alt="Bubbles"
              className="h-full w-full object-contain"
            />
            <motion.div
              style={{ left: highlightX, top: highlightY }}
              className="absolute h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.45),rgba(255,255,255,.10)_38%,transparent_70%)]"
            />
          </div>
          {/* caustic arc catching the light on the rim */}
          <div
            className="pointer-events-none absolute"
            style={{
              inset: "-8px",
              borderRadius: "50%",
              background:
                "conic-gradient(from 250deg, transparent 0%, rgba(255,255,255,0.95) 5%, rgba(255,248,220,0.6) 13%, transparent 22%, transparent 100%)",
              WebkitMask:
                "radial-gradient(circle at center, transparent calc(100% - 12px), white calc(100% - 9px), white 100%)",
              mask: "radial-gradient(circle at center, transparent calc(100% - 12px), white calc(100% - 9px), white 100%)",
              filter: "blur(2px)",
              animation: "slow-spin 9s ease-in-out infinite",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ scale, opacity, y }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-[19vw] font-semibold leading-none tracking-tighter text-[#1d1d1f] md:text-[10rem]"
        >
          Bubbles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-xl text-xl font-medium leading-snug text-[#6e6e73] md:text-2xl"
        >
          Your executive assistant.
          <br />
          <span className="text-[#1d1d1f]">It lives on WhatsApp.</span>
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-5 rounded-full border border-black/20 pt-1.5"
        >
          <div className="mx-auto h-2 w-0.5 rounded-full bg-black/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
