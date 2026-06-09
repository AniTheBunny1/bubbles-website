"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BUBBLES = [
  { size: 300, color: "rgba(91, 134, 229, 0.15)", delay: 0 },
  { size: 400, color: "rgba(255, 154, 158, 0.15)", delay: 2 },
  { size: 250, color: "rgba(200, 150, 255, 0.15)", delay: 4 },
  { size: 350, color: "rgba(54, 209, 220, 0.1)", delay: 1 },
];

export function FloatingBubbles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Removed the opaque hardcoded background here to let CSS background show */}
      {BUBBLES.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle, ${bubble.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth * 0.8,
              Math.random() * window.innerWidth * 0.8,
              Math.random() * window.innerWidth * 0.8,
            ],
            y: [
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.8,
              Math.random() * window.innerHeight * 0.8,
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
}
