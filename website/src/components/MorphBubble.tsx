"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function MorphBubble() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY      = useTransform(scrollYProgress, [0.08, 0.36], [0.022, 1]);
  const opacity     = useTransform(scrollYProgress, [0.05, 0.17, 0.83, 0.95], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.34, 0.50], [0, 1]);
  const textY       = useTransform(scrollYProgress, [0.34, 0.50], [16, 0]);

  return (
    <section
      ref={ref}
      className="relative z-10 min-h-[240vh]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(8,5,20,0.9) 0%, #07080f 7%, #07080f 100%)",
      }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        {/* scroll-morphing wrapper */}
        <motion.div style={{ scaleY, opacity }}>
          {/* breathing wrapper — separate element so it doesn't fight scaleY */}
          <motion.div
            animate={{ scale: [1, 1.026, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative rounded-full"
              style={{ width: "min(66vw, 500px)", height: "min(66vw, 500px)" }}
            >
              {/* ambient outer glow */}
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  inset: "-22%",
                  background:
                    "radial-gradient(circle, rgba(180,155,255,0.07) 0%, rgba(120,160,255,0.03) 42%, transparent 64%)",
                  filter: "blur(28px)",
                }}
              />

              {/* glass base */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 33% 27%, rgba(255,255,255,0.12) 0%, rgba(195,212,255,0.07) 34%, rgba(38,50,108,0.18) 66%, rgba(6,7,20,0.46) 100%)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow:
                    "inset 0 0 60px rgba(255,255,255,0.03), 0 0 80px rgba(140,165,255,0.05)",
                }}
              />

              {/* rainbow refraction — slow clockwise */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 14%, rgba(255,88,120,0.14) 27%, rgba(255,200,58,0.11) 40%, rgba(88,255,158,0.11) 53%, rgba(58,148,255,0.14) 66%, rgba(200,78,255,0.11) 78%, transparent 88%)",
                }}
              />

              {/* soft counter-rotating pastel wash */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 210deg, transparent 28%, rgba(255,218,238,0.07) 43%, rgba(218,238,255,0.07) 58%, rgba(238,218,255,0.07) 73%, transparent 83%)",
                }}
              />

              {/* inner depth vignette */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 55%, transparent 26%, rgba(6,7,22,0.28) 60%, rgba(3,4,14,0.50) 100%)",
                }}
              />

              {/* primary specular highlight */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "30%", height: "19%",
                  top: "12%", left: "18%",
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.50) 0%, transparent 70%)",
                  filter: "blur(9px)",
                }}
              />

              {/* secondary specular */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "11%", height: "8%",
                  top: "20%", left: "64%",
                  background:
                    "radial-gradient(ellipse, rgba(255,255,255,0.26) 0%, transparent 70%)",
                  filter: "blur(4px)",
                }}
              />

              {/* bottom rim light */}
              <div
                className="absolute rounded-full"
                style={{
                  width: "54%", height: "10%",
                  bottom: "9%", left: "23%",
                  background:
                    "radial-gradient(ellipse, rgba(165,198,255,0.09) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />

              {/* text */}
              <motion.div
                style={{ opacity: textOpacity, y: textY }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p className="px-12 text-center text-3xl font-semibold leading-snug tracking-tight text-white/88 md:text-4xl lg:text-5xl">
                  let us handle<br />the noise.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
