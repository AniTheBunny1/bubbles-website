"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════
   PREMIUM ATMOSPHERIC BACKGROUND
   ─────────────────────────────────────────────────────────────────
   8 layers of living atmosphere:
     1. Slow camera drift on the bg-clouds image
     2. Cloud depth layers (near / far illusion)
     3. Light ray breathing
     4. Atmospheric colour shift
     5. Ambient dust particles
     6. Animated film grain
     7. Mouse parallax (desktop only)
     8. Scroll parallax
   ═══════════════════════════════════════════════════════════════════ */

/* ── Fixed data (deterministic, never regenerated) ──────────────── */

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  startTop: 20 + ((i * 53 + 7) % 80),
  size: 1 + (i % 2) * 0.5,
  opacity: 0.02 + (i % 5) * 0.008,
  drift: ((i % 3) - 1) * 6,
  duration: 14 + (i % 7) * 3,
  delay: (i * 1.3) % 12,
}));

export function ParallaxAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  /* ── Layer 7: Mouse parallax values ───────────────────────────── */
  const mouseRawX = useSpring(0, { stiffness: 20, damping: 40 });
  const mouseRawY = useSpring(0, { stiffness: 20, damping: 40 });

  /* Parallax offsets at different depths */
  const bgParX     = useTransform(mouseRawX, [-1, 1], [10, -10]);
  const bgParY     = useTransform(mouseRawY, [-1, 1], [6, -6]);
  const midParX    = useTransform(mouseRawX, [-1, 1], [18, -18]);
  const midParY    = useTransform(mouseRawY, [-1, 1], [12, -12]);
  const nearParX   = useTransform(mouseRawX, [-1, 1], [25, -25]);
  const nearParY   = useTransform(mouseRawY, [-1, 1], [16, -16]);
  const lightParX  = useTransform(mouseRawX, [-1, 1], [8, -8]);
  const lightParY  = useTransform(mouseRawY, [-1, 1], [5, -5]);

  useEffect(() => {
    setMounted(true);
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  /* Listen to mouse movement (desktop only) */
  useEffect(() => {
    if (isTouch || !mounted) return;
    const handleMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRawX.set(nx);
      mouseRawY.set(ny);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouch, mounted, mouseRawX, mouseRawY]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* ═══════════════════════════════════════════════════════════
          LAYER 1: Camera drift
          The bg-clouds.webp with slow imperceptible drift. Fixed to
          the viewport — scrolling never translates the sky, so it
          stays seamless over any page length.
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute"
        style={{
          inset: "-30px", /* extra bleed to hide edges during drift */
          x: isTouch ? 0 : bgParX,
          y: isTouch ? 0 : bgParY,
          willChange: "transform",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(255,255,255,0.18), rgba(255,255,255,0.18)), url('/bg-clouds.webp') center center / cover no-repeat",
            animation: "camera-drift 58s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1.5: Aurora wash
          A huge iridescent conic gradient turning very slowly over
          the sky, so the light itself visibly lives and moves.
         ═══════════════════════════════════════════════════════════ */}
      <div
        className="absolute"
        style={{
          inset: "-40%",
          background:
            "conic-gradient(from 0deg, transparent 12%, rgba(255,140,185,0.07) 26%, rgba(255,215,95,0.05) 38%, rgba(95,245,190,0.05) 52%, rgba(95,165,255,0.07) 66%, rgba(200,95,255,0.06) 80%, transparent 92%)",
          filter: "blur(70px)",
          animation: "slow-spin 90s linear infinite",
          willChange: "transform",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2: Cloud depth layers
          Overlaid gradient blobs that drift independently,
          creating the illusion the clouds themselves are alive.
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: isTouch ? 0 : midParX,
          y: isTouch ? 0 : midParY,
          willChange: "transform",
        }}
      >
        {/* Far cloud layer — large, slow, subtle */}
        <div
          className="absolute"
          style={{
            top: "-5%",
            left: "-10%",
            width: "120%",
            height: "60%",
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(230, 225, 248, 0.22) 0%, transparent 60%), radial-gradient(ellipse at 75% 40%, rgba(210, 230, 255, 0.18) 0%, transparent 55%)",
            filter: "blur(50px)",
            animation: "cloud-drift-far 42s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        {/* Near cloud layer — slightly faster, slightly more opaque */}
        <div
          className="absolute"
          style={{
            bottom: "-5%",
            left: "-5%",
            width: "110%",
            height: "55%",
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(240, 220, 248, 0.2) 0%, transparent 55%), radial-gradient(ellipse at 25% 60%, rgba(220, 235, 255, 0.16) 0%, transparent 50%)",
            filter: "blur(45px)",
            animation: "cloud-drift-near 34s ease-in-out infinite",
            animationDelay: "-12s",
            willChange: "transform",
          }}
        />
        {/* Mid cloud accent — a third subtle layer for extra depth */}
        <div
          className="absolute"
          style={{
            top: "25%",
            left: "15%",
            width: "70%",
            height: "50%",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(245, 230, 240, 0.14) 0%, transparent 50%)",
            filter: "blur(60px)",
            animation: "cloud-drift-far 50s ease-in-out infinite",
            animationDelay: "-20s",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3: Light rays
          Soft diagonal shafts that breathe gently.
          Opacity stays under 6.5%, shift stays under 3%.
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: isTouch ? 0 : lightParX,
          y: isTouch ? 0 : lightParY,
          willChange: "transform",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "-20%",
            right: "-10%",
            width: "80%",
            height: "120%",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 60%, rgba(255,250,240,0.03) 100%)",
            animation: "light-breathe 28s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "-15%",
            width: "70%",
            height: "100%",
            background:
              "linear-gradient(165deg, rgba(255,252,245,0.04) 0%, transparent 35%)",
            animation: "light-breathe 36s ease-in-out infinite",
            animationDelay: "-14s",
            willChange: "transform, opacity",
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 4: Atmospheric colour shift
          An extremely subtle hue/saturation/brightness modulation
          overlaid on the entire scene. Invisible consciously but
          makes the light feel naturally alive.
         ═══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          animation: "colour-shift 45s ease-in-out infinite",
          willChange: "filter",
          pointerEvents: "none",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════
          LAYER 5: Ambient particles
          Tiny dust motes catching sunlight. Rise slowly upward
          with gentle lateral drift. Sparse, barely visible.
         ═══════════════════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: isTouch ? 0 : nearParX,
          y: isTouch ? 0 : nearParY,
          willChange: "transform",
        }}
      >
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: `${p.startTop}%`,
              width: p.size,
              height: p.size,
              backgroundColor: `rgba(255, 255, 255, ${p.opacity + 0.15})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(255, 255, 255, ${p.opacity})`,
              filter: "blur(0.3px)",
              animation: `particle-rise ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              "--p-opacity": p.opacity,
              "--p-drift": `${p.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 6: Film grain
          Very light animated noise. Prevents gradients from feeling
          digitally flat. Only noticeable when user stops scrolling.
         ═══════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          animation: "grain-shift 8s steps(4) infinite",
          opacity: 0.6,
          willChange: "transform",
        }}
      />
    </div>
  );
}
