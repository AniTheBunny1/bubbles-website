"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { text: "notes ready", left: "24%", top: "28%" },
  { text: "seat picked", left: "62%", top: "24%" },
  { text: "mom reminded", left: "48%", top: "58%" },
  { text: "bill fixed", left: "18%", top: "68%" },
  { text: "flight watched", left: "70%", top: "66%" },
  { text: "email sent", left: "38%", top: "42%" },
];

export function InsideBubble() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.05, 0.45, 0.78], [0.45, 1, 0.76]);
  const opacity = useTransform(scrollYProgress, [0.02, 0.24, 0.88], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.5], [120, 0]);

  return (
    <section ref={ref} className="relative z-10 flex min-h-[145vh] items-center justify-center overflow-hidden px-5 py-32" style={{ background: "linear-gradient(to bottom, #070913, #0e1018 30%, #0e1018 70%, #08080c)" }}>
      <motion.div
        style={{ scale, opacity, y }}
        className="relative aspect-square w-[min(62vw,720px)] min-w-[320px] overflow-hidden rounded-full border border-white/25 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,.42),rgba(219,229,255,.22)_28%,rgba(74,81,122,.28)_62%,rgba(10,12,28,.55))]"
      >
        <div className="absolute inset-0 opacity-25 iridescent-animation bg-[conic-gradient(from_90deg,rgba(255,255,255,.35),rgba(176,210,255,.28),rgba(255,181,225,.22),rgba(187,255,236,.2),rgba(255,255,255,.35))]" />
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M190 210 C 280 260, 350 160, 460 210 S 540 410, 430 450 S 260 430, 190 520" fill="none" stroke="white" strokeOpacity=".2" strokeWidth="1" />
          <path d="M300 360 C 410 300, 490 340, 560 430" fill="none" stroke="white" strokeOpacity=".16" strokeWidth="1" />
        </svg>
        {nodes.map((node, index) => (
          <span
            key={node.text}
            className="absolute rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/75"
            style={{ left: node.left, top: node.top, animationDelay: `${index * 0.6}s` }}
          >
            {node.text}
          </span>
        ))}
        <div className="absolute left-[34%] top-[34%] h-1.5 w-1.5 rounded-full bg-white/70" />
        <div className="absolute left-[58%] top-[48%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[44%] top-[72%] h-1 w-1 rounded-full bg-white/55" />
      </motion.div>
    </section>
  );
}
