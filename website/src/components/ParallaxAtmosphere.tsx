"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const bubbles = [
  { size: 42, left: "8%", top: "18%", delay: "0s" },
  { size: 18, left: "18%", top: "66%", delay: "2s" },
  { size: 64, left: "72%", top: "20%", delay: "1s" },
  { size: 28, left: "86%", top: "54%", delay: "3s" },
  { size: 36, left: "48%", top: "78%", delay: "4s" },
  { size: 16, left: "58%", top: "34%", delay: "1.5s" },
  { size: 52, left: "26%", top: "42%", delay: "2.8s" },
  { size: 22, left: "93%", top: "12%", delay: "0.6s" },
];

const sparkles = Array.from({ length: 42 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 61) % 100}%`,
  delay: `${(i % 9) * 0.45}s`,
  size: 1 + (i % 3),
}));

export function ParallaxAtmosphere() {
  const { scrollY } = useScroll();
  const farY = useTransform(scrollY, [0, 3000], [0, -150]);
  const cloudY = useTransform(scrollY, [0, 3000], [0, -260]);
  const refractionY = useTransform(scrollY, [0, 3000], [0, -360]);
  const bubbleY = useTransform(scrollY, [0, 3000], [0, -520]);
  const particleY = useTransform(scrollY, [0, 3000], [0, -700]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#ede8f5]">
      <motion.div style={{ y: farY }} className="absolute inset-[-15%] opacity-40 drift-animation">
        <div className="absolute left-[-10%] top-[8%] h-72 w-[55vw] rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[32%] h-80 w-[62vw] rounded-full bg-[#d9e6ff]/60 blur-3xl" />
        <div className="absolute left-[18%] bottom-[10%] h-64 w-[48vw] rounded-full bg-[#f5dfff]/45 blur-3xl" />
      </motion.div>

      <motion.div style={{ y: cloudY }} className="absolute inset-0 opacity-70">
        <div className="absolute left-[4%] top-[24%] h-80 w-80 rounded-full bg-[#c8d6ff]/35 blur-[80px] breathe-animation" />
        <div className="absolute right-[10%] top-[18%] h-96 w-96 rounded-full bg-[#ffd6ec]/30 blur-[90px] breathe-animation" />
        <div className="absolute left-[34%] bottom-[8%] h-[28rem] w-[34rem] rounded-full bg-white/35 blur-[100px] drift-animation" />
      </motion.div>

      <motion.div style={{ y: refractionY }} className="absolute inset-[-10%] opacity-25">
        <div className="absolute left-[12%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-[conic-gradient(from_40deg,transparent,rgba(255,255,255,.7),rgba(172,202,255,.55),rgba(255,184,231,.45),transparent)] blur-3xl iridescent-animation" />
        <div className="absolute right-[6%] bottom-[4%] h-[34rem] w-[34rem] rounded-full bg-[conic-gradient(from_120deg,transparent,rgba(189,255,241,.35),rgba(255,255,255,.55),rgba(217,181,255,.45),transparent)] blur-3xl iridescent-animation" />
      </motion.div>

      <motion.div style={{ y: bubbleY }} className="absolute inset-0">
        {bubbles.map((bubble, index) => (
          <span
            key={index}
            className="absolute rounded-full opacity-45 bubble-orb"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              top: bubble.top,
              animationDelay: bubble.delay,
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: particleY }} className="absolute inset-0">
        {sparkles.map((sparkle, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white twinkle-animation"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
              boxShadow: "0 0 12px rgba(255,255,255,.8)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
