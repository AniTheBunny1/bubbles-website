"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/* ── Layer 4: floating glass bubble orbs ─────────────────────── */
const bubbles = [
  { size: 42, left: "8%",  top: "18%", delay: "0s"    },
  { size: 18, left: "18%", top: "66%", delay: "2s"    },
  { size: 64, left: "72%", top: "20%", delay: "1s"    },
  { size: 28, left: "86%", top: "54%", delay: "3s"    },
  { size: 36, left: "48%", top: "78%", delay: "4s"    },
  { size: 16, left: "58%", top: "34%", delay: "1.5s"  },
  { size: 52, left: "26%", top: "42%", delay: "2.8s"  },
  { size: 22, left: "93%", top: "12%", delay: "0.6s"  },
  { size: 30, left: "4%",  top: "52%", delay: "3.4s"  },
  { size: 14, left: "38%", top: "8%",  delay: "1.9s"  },
];

/* ── Layer 5: sparkle particles ──────────────────────────────── */
const sparkles = Array.from({ length: 44 }, (_, i) => ({
  left:  `${(i * 37) % 100}%`,
  top:   `${(i * 61) % 100}%`,
  delay: `${(i % 9) * 0.45}s`,
  size:  1 + (i % 3),
}));

/* ── Layer 1: very distant drifting cloud blobs ──────────────── */
const cloudsFar = [
  { w: 700, h: 280, left: "-8%",  top: "5%",  color: "rgba(230,225,248,0.28)", dur: "0s"    },
  { w: 580, h: 220, left: "45%",  top: "22%", color: "rgba(220,230,255,0.22)", dur: "8s"    },
  { w: 820, h: 300, left: "18%",  top: "60%", color: "rgba(240,220,248,0.20)", dur: "14s"   },
  { w: 640, h: 240, left: "60%",  top: "75%", color: "rgba(210,235,255,0.18)", dur: "5s"    },
];

/* ── Layer 2: softer mid-distance pastel blobs ───────────────── */
const cloudsMid = [
  { w: 440, h: 180, left: "12%",  top: "14%", color: "rgba(218,208,252,0.30)", dur: "2s"    },
  { w: 360, h: 160, left: "56%",  top: "32%", color: "rgba(255,215,235,0.24)", dur: "11s"   },
  { w: 500, h: 200, left: "30%",  top: "68%", color: "rgba(200,232,255,0.26)", dur: "6s"    },
  { w: 320, h: 140, left: "74%",  top: "55%", color: "rgba(228,218,255,0.28)", dur: "16s"   },
];

export function ParallaxAtmosphere() {
  const { scrollY } = useScroll();

  /* different parallax speeds per depth layer */
  const cloudFarY   = useTransform(scrollY, [0, 3000], [0,  -90]);
  const cloudMidY   = useTransform(scrollY, [0, 3000], [0, -180]);
  const iridY       = useTransform(scrollY, [0, 3000], [0, -260]);
  const bubbleY     = useTransform(scrollY, [0, 3000], [0, -400]);
  const particleY   = useTransform(scrollY, [0, 3000], [0, -600]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* ── Layer 1: very distant clouds ─────────────────────────── */}
      <motion.div style={{ y: cloudFarY }} className="absolute inset-0">
        {cloudsFar.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full drift-animation"
            style={{
              width:  c.w,
              height: c.h,
              left:   c.left,
              top:    c.top,
              background: `radial-gradient(ellipse, ${c.color} 0%, transparent 68%)`,
              filter: "blur(48px)",
              animationDelay: c.dur,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 2: mid-distance pastel blobs ───────────────────── */}
      <motion.div style={{ y: cloudMidY }} className="absolute inset-0">
        {cloudsMid.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full breathe-animation"
            style={{
              width:  c.w,
              height: c.h,
              left:   c.left,
              top:    c.top,
              background: `radial-gradient(ellipse, ${c.color} 0%, transparent 62%)`,
              filter: "blur(64px)",
              animationDelay: c.dur,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 3: iridescent refraction band ──────────────────── */}
      <motion.div style={{ y: iridY }} className="absolute inset-0 flex items-center justify-center">
        <div
          className="iridescent-animation"
          style={{
            width:  "140%",
            height: "340px",
            background: "conic-gradient(from 0deg at 50% 50%, rgba(255,210,230,0.07), rgba(200,220,255,0.09), rgba(180,255,230,0.06), rgba(255,245,200,0.07), rgba(220,200,255,0.08), rgba(255,210,230,0.07))",
            filter: "blur(40px)",
            transform: "rotate(-8deg)",
          }}
        />
      </motion.div>

      {/* ── Layer 4: glass bubble orbs ────────────────────────────── */}
      <motion.div style={{ y: bubbleY }} className="absolute inset-0">
        {bubbles.map((bubble, index) => (
          <span
            key={index}
            className="absolute rounded-full opacity-40 bubble-orb"
            style={{
              width:  bubble.size,
              height: bubble.size,
              left:   bubble.left,
              top:    bubble.top,
              animationDelay: bubble.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 5: sparkle particles ───────────────────────────── */}
      <motion.div style={{ y: particleY }} className="absolute inset-0">
        {sparkles.map((sparkle, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white twinkle-animation"
            style={{
              width:  sparkle.size,
              height: sparkle.size,
              left:   sparkle.left,
              top:    sparkle.top,
              animationDelay:  sparkle.delay,
              boxShadow: "0 0 6px rgba(255,255,255,.42)",
            }}
          />
        ))}
      </motion.div>

    </div>
  );
}
