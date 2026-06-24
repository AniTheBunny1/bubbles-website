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
const sparkles = Array.from({ length: 20 }, (_, i) => ({
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

/* ── Layer 6: micro bubbles — tiny, barely there ─────────────── */
const microBubbles = Array.from({ length: 10 }, (_, i) => ({
  left:    `${(i * 43 + 7) % 100}%`,
  top:     `${(i * 67 + 13) % 100}%`,
  size:    2 + (i % 5) * 1.4,
  delay:   `${(i * 0.7) % 9}s`,
  opacity: 0.10 + (i % 4) * 0.025,
}));

/* ── Layer 7: refraction streaks — thin iridescent slivers ───── */
const refractionStreaks = [
  { left: "11%",  top: "26%", width: 160, angle: "-22deg", color: "rgba(200,220,255,0.06)",  delay: "0s"  },
  { left: "54%",  top: "13%", width: 200, angle: "18deg",  color: "rgba(255,200,220,0.055)", delay: "5s"  },
  { left: "77%",  top: "61%", width: 140, angle: "-15deg", color: "rgba(180,255,220,0.05)",  delay: "11s" },
  { left: "27%",  top: "71%", width: 180, angle: "28deg",  color: "rgba(220,200,255,0.055)", delay: "8s"  },
  { left: "8%",   top: "47%", width: 120, angle: "-35deg", color: "rgba(255,245,200,0.045)", delay: "3s"  },
  { left: "62%",  top: "38%", width: 150, angle: "12deg",  color: "rgba(200,240,255,0.05)",  delay: "14s" },
];

/* ── Layer 8: rainbow glints — momentary color sparks ────────── */
const rainbowGlints = [
  { left: "22%",  top: "31%", size: 2.5, color: "rgba(255,90,130,0.13)",  delay: "0s"    },
  { left: "68%",  top: "19%", size: 2,   color: "rgba(255,200,50,0.11)",  delay: "1.8s"  },
  { left: "14%",  top: "58%", size: 3,   color: "rgba(80,220,180,0.11)",  delay: "4.2s"  },
  { left: "82%",  top: "44%", size: 2,   color: "rgba(80,160,255,0.13)",  delay: "2.6s"  },
  { left: "38%",  top: "82%", size: 2.5, color: "rgba(200,80,255,0.12)",  delay: "7.1s"  },
  { left: "51%",  top: "6%",  size: 1.5, color: "rgba(255,160,80,0.11)",  delay: "3.5s"  },
  { left: "5%",   top: "78%", size: 2,   color: "rgba(120,255,180,0.12)", delay: "5.9s"  },
  { left: "91%",  top: "68%", size: 2.5, color: "rgba(80,200,255,0.13)",  delay: "1.1s"  },
];

/* ── Layer 9: bokeh circles — large soft out-of-focus rings ──── */
const bokehCircles = [
  { left: "16%",  top: "22%", size: 48, delay: "0s"   },
  { left: "72%",  top: "8%",  size: 36, delay: "3.2s" },
  { left: "88%",  top: "48%", size: 58, delay: "6.8s" },
  { left: "32%",  top: "64%", size: 42, delay: "1.5s" },
  { left: "56%",  top: "86%", size: 32, delay: "9.4s" },
  { left: "3%",   top: "36%", size: 52, delay: "4.7s" },
];

export function ParallaxAtmosphere() {
  const { scrollY } = useScroll();

  const cloudFarY   = useTransform(scrollY, [0, 3000], [0,  -90]);
  const cloudMidY   = useTransform(scrollY, [0, 3000], [0, -180]);
  const iridY       = useTransform(scrollY, [0, 3000], [0, -260]);
  const bubbleY     = useTransform(scrollY, [0, 3000], [0, -400]);
  const particleY   = useTransform(scrollY, [0, 3000], [0, -600]);
  const microY      = useTransform(scrollY, [0, 3000], [0, -520]);
  const streakY     = useTransform(scrollY, [0, 3000], [0, -320]);
  const glintY      = useTransform(scrollY, [0, 3000], [0, -680]);

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
              filter: "blur(28px)",
              animationDelay: c.dur,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 2: mid-distance pastel blobs ───────────────────── */}
      <motion.div style={{ y: cloudMidY }} className="absolute inset-0 hidden md:block">
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
              filter: "blur(32px)",
              animationDelay: c.dur,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 3: iridescent refraction band ──────────────────── */}
      <motion.div style={{ y: iridY }} className="absolute inset-0 hidden md:flex items-center justify-center">
        <div
          className="iridescent-animation"
          style={{
            width:  "140%",
            height: "340px",
            background: "conic-gradient(from 0deg at 50% 50%, rgba(255,210,230,0.07), rgba(200,220,255,0.09), rgba(180,255,230,0.06), rgba(255,245,200,0.07), rgba(220,200,255,0.08), rgba(255,210,230,0.07))",
            filter: "blur(26px)",
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

      {/* ── Layer 6: micro bubbles — almost invisible ─────────────── */}
      <motion.div style={{ y: microY }} className="absolute inset-0 hidden md:block">
        {microBubbles.map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full bubble-orb twinkle-animation"
            style={{
              width:        b.size,
              height:       b.size,
              left:         b.left,
              top:          b.top,
              opacity:      b.opacity,
              animationDelay: b.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 7: refraction streaks ──────────────────────────── */}
      <motion.div style={{ y: streakY }} className="absolute inset-0 hidden md:block">
        {refractionStreaks.map((s, i) => (
          <div
            key={i}
            className="absolute drift-animation"
            style={{
              left:    s.left,
              top:     s.top,
              width:   s.width,
              height:  2,
              background: `linear-gradient(to right, transparent, ${s.color}, transparent)`,
              filter:  "blur(2px)",
              transform: `rotate(${s.angle})`,
              animationDelay: s.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 8: rainbow glints ───────────────────────────────── */}
      <motion.div style={{ y: glintY }} className="absolute inset-0">
        {rainbowGlints.map((g, i) => (
          <span
            key={i}
            className="absolute rounded-full twinkle-animation"
            style={{
              left:    g.left,
              top:     g.top,
              width:   g.size,
              height:  g.size,
              background: g.color,
              boxShadow:  `0 0 ${g.size * 3}px ${g.color}`,
              filter:  "blur(0.5px)",
              animationDelay: g.delay,
            }}
          />
        ))}
      </motion.div>

      {/* ── Layer 9: bokeh circles — soft out-of-focus rings ─────── */}
      <motion.div style={{ y: bubbleY }} className="absolute inset-0 hidden md:block">
        {bokehCircles.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full breathe-animation"
            style={{
              left:   b.left,
              top:    b.top,
              width:  b.size,
              height: b.size,
              border: "0.5px solid rgba(200,215,255,0.10)",
              boxShadow: "0 0 12px rgba(200,215,255,0.06), inset 0 0 8px rgba(220,230,255,0.04)",
              animationDelay: b.delay,
            }}
          />
        ))}
      </motion.div>

    </div>
  );
}
