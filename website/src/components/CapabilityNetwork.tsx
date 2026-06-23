"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, Mail, Globe, Clock, Workflow, BarChart3, BookOpen, Calendar } from "lucide-react";

const CAPABILITIES = [
  {
    id: "planning", label: "Planning", icon: Calendar, angle: -90,
    detail: "Schedules meetings, sets reminders, and keeps your calendar in order — without being asked."
  },
  {
    id: "monitoring", label: "Monitoring", icon: Clock, angle: -45,
    detail: "Watches for price drops, deadlines, and updates. Alerts you before it's too late."
  },
  {
    id: "research", label: "Research", icon: Globe, angle: 0,
    detail: "Deep-dives any topic, surfaces what matters, and delivers a clean summary."
  },
  {
    id: "workflows", label: "Workflows", icon: Workflow, angle: 45,
    detail: "Chains multi-step tasks and runs them in the background. You set it once, it handles the rest."
  },
  {
    id: "automation", label: "Automation", icon: BarChart3, angle: 90,
    detail: "Tracks your goals, spending, and habits. Reports progress without being prompted."
  },
  {
    id: "learning", label: "Learning", icon: BookOpen, angle: 135,
    detail: "Adapts its tone, pacing, and style uniquely for you the longer you use it."
  },
  {
    id: "memory", label: "Memory", icon: Brain, angle: 180,
    detail: "3-layer persistent memory that learns, weights context, and refreshes daily."
  },
  {
    id: "email", label: "Email", icon: Mail, angle: -135,
    detail: "Reads, drafts, and sends emails based on your habits, history, and preferences."
  },
];

const R = 37; // radius as % of container
const CX = 50;
const CY = 50;

function toXY(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

export function CapabilityNetwork() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
          >
            One System. Many Superpowers.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Bubbles orchestrates multiple capabilities working together seamlessly.
          </motion.p>
        </div>

        {/* Network diagram */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: 720, width: "100%", aspectRatio: "1 / 1" }}
        >
          {/* SVG connector lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Octagon outline */}
            <polygon
              points={CAPABILITIES.map(c => {
                const { x, y } = toXY(c.angle);
                return `${x},${y}`;
              }).join(" ")}
              fill="none"
              stroke="rgba(120, 130, 180, 0.35)"
              strokeWidth="0.35"
            />
            {/* Line from center to hovered node */}
            {CAPABILITIES.map(c => {
              if (c.id !== hovered) return null;
              const { x, y } = toXY(c.angle);
              return (
                <line
                  key={c.id}
                  x1={CX} y1={CY}
                  x2={x} y2={y}
                  stroke="rgba(91, 134, 229, 0.65)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1"
                />
              );
            })}
          </svg>

          {/* Center node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="absolute glass-card rounded-full flex items-center justify-center"
            style={{
              left: "50%", top: "50%",
              width: "11%", height: "11%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Brain className="text-gray-700" style={{ width: "45%", height: "45%" }} />
          </motion.div>

          {/* Capability nodes */}
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            const { x, y } = toXY(cap.angle);
            const isHovered = hovered === cap.id;
            const isBottom = y > 55;
            const isRight = x > 65;
            const isLeft = x < 35;

            return (
              <motion.div
                key={cap.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.07, type: "spring", stiffness: 220 }}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHovered(cap.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <motion.div
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`rounded-full flex items-center justify-center cursor-pointer transition-shadow duration-200 ${
                    isHovered ? "glass-card shadow-xl" : "glass"
                  }`}
                  style={{ width: "clamp(52px, 9vw, 80px)", height: "clamp(52px, 9vw, 80px)" }}
                >
                  <Icon
                    className={isHovered ? "text-gray-900" : "text-gray-600"}
                    style={{ width: "36%", height: "36%" }}
                  />
                </motion.div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: isBottom ? -6 : 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-30 glass-card rounded-2xl p-3 pointer-events-none"
                      style={{
                        width: 190,
                        ...(isBottom
                          ? { bottom: "calc(100% + 10px)" }
                          : { top: "calc(100% + 10px)" }),
                        ...(isRight
                          ? { right: 0 }
                          : isLeft
                          ? { left: 0 }
                          : { left: "50%", transform: "translateX(-50%)" }),
                      }}
                    >
                      <p className="text-xs font-bold text-gray-900 mb-1">{cap.label}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{cap.detail}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">Hover over each capability to learn more</p>
        </div>
      </div>
    </section>
  );
}
