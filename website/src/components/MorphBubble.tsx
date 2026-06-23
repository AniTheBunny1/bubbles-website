"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function MorphBubble() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // flat arc (scaleY ≈ 0) → full sphere (scaleY = 1)
  const scaleY      = useTransform(scrollYProgress, [0.08, 0.34], [0.018, 1]);
  const opacity     = useTransform(scrollYProgress, [0.05, 0.18, 0.78, 0.90], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.32, 0.47], [0, 1]);
  const textY       = useTransform(scrollYProgress, [0.32, 0.47], [14, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[240vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center">

        {/* scroll-driven morph */}
        <motion.div style={{ scaleY, opacity }}>

          {/* breathing pulse — separate element avoids fighting scaleY */}
          <motion.div
            animate={{ scale: [1, 1.022, 1] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="relative"
              style={{ width: "min(60vw, 460px)", height: "min(60vw, 460px)" }}
            >

              {/* ground shadow — floats below the sphere */}
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
                  background:
                    "radial-gradient(circle, rgba(195,185,255,0.07) 0%, transparent 56%)",
                  filter: "blur(24px)",
                }}
              />

              {/* THE BUBBLE — overflow-hidden clips all layers to the circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden">

                {/* ① backdrop: water refracts & brightens what's behind */}
                <div
                  className="absolute inset-0"
                  style={{
                    backdropFilter: "blur(1.5px) brightness(1.05) saturate(1.12)",
                  }}
                />

                {/* ② soap film — nearly transparent center, thicker edge */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(250,250,255,0.008) 35%, rgba(215,225,255,0.04) 70%, rgba(208,218,255,0.14) 88%, rgba(212,222,255,0.24) 100%)",
                    boxShadow:
                      "inset 0 0 0 1px rgba(215,225,255,0.42), inset 0 0 0 0.5px rgba(255,255,255,0.32), 0 0 0 0.5px rgba(210,220,255,0.20)",
                  }}
                />

                {/* ③ rainbow interference band — slow clockwise */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 15%, rgba(255,108,152,0.08) 28%, rgba(255,212,62,0.065) 41%, rgba(95,255,178,0.065) 54%, rgba(62,158,255,0.08) 67%, rgba(212,84,255,0.065) 79%, transparent 89%)",
                  }}
                />

                {/* ④ counter-rotating pastel wash — slower */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 195deg, transparent 22%, rgba(255,212,232,0.055) 39%, rgba(212,235,255,0.055) 56%, rgba(235,212,255,0.055) 72%, transparent 82%)",
                  }}
                />

                {/* ⑤ gravity film gradient: thin=blue at top, thicker at bottom */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(175,210,255,0.08) 0%, transparent 22%, transparent 74%, rgba(198,175,255,0.06) 100%)",
                  }}
                />

                {/* ⑥ horizontal bright band — visible as iridescent arc in flat phase */}
                <div
                  className="absolute"
                  style={{
                    top: "46%", left: "8%", right: "8%", height: "8%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.22) 0%, rgba(220,235,255,0.10) 40%, transparent 72%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* ⑦ interior frosting for text legibility — centre only */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 52%, rgba(238,236,252,0.14) 0%, rgba(238,236,252,0.06) 36%, transparent 60%)",
                  }}
                />

                {/* ⑧ inset caustic glow from wall curvature */}
                <div
                  className="absolute inset-0"
                  style={{
                    boxShadow:
                      "inset 0 0 38px rgba(218,226,255,0.06), inset 0 0 88px rgba(218,226,255,0.03)",
                  }}
                />

                {/* ⑨ primary specular — large soft oval, top-left */}
                <div
                  className="absolute"
                  style={{
                    width: "28%", height: "17%",
                    top: "10%", left: "14%",
                    background:
                      "radial-gradient(ellipse at 38% 32%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.54) 30%, rgba(255,255,255,0) 70%)",
                    filter: "blur(4px)",
                  }}
                />

                {/* ⑩ sharp core of primary — pinpoint specular */}
                <div
                  className="absolute"
                  style={{
                    width: "7%", height: "4.5%",
                    top: "11%", left: "19%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,1) 0%, transparent 62%)",
                    filter: "blur(1px)",
                  }}
                />

                {/* ⑪ secondary specular — opposite side, dimmer */}
                <div
                  className="absolute"
                  style={{
                    width: "9%", height: "5.5%",
                    top: "21%", left: "67%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.58) 0%, transparent 66%)",
                    filter: "blur(2.5px)",
                  }}
                />

                {/* ⑫ tiny tertiary glint — depth cue */}
                <div
                  className="absolute"
                  style={{
                    width: "3.5%", height: "2.2%",
                    top: "63%", left: "22%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.32) 0%, transparent 68%)",
                    filter: "blur(1.5px)",
                  }}
                />

                {/* ⑬ bottom caustic rim — light focusing through lower wall */}
                <div
                  className="absolute"
                  style={{
                    width: "42%", height: "7%",
                    bottom: "11%", left: "29%",
                    background:
                      "radial-gradient(ellipse, rgba(198,214,255,0.10) 0%, transparent 66%)",
                    filter: "blur(5px)",
                  }}
                />

                {/* ⑭ text */}
                <motion.div
                  style={{ opacity: textOpacity, y: textY }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p
                    className="px-10 text-center text-[1.65rem] font-semibold leading-snug tracking-tight md:text-4xl"
                    style={{ color: "rgba(26,16,54,0.80)" }}
                  >
                    let us handle<br />the noise.
                  </p>
                </motion.div>

              </div>{/* /bubble overflow-hidden */}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
