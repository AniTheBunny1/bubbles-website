"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Brain, Mail, Globe, Clock, Workflow, BarChart3, BookOpen, Calendar } from "lucide-react";

const CAPABILITIES = [
  { id: "memory", label: "Memory", icon: Brain, angle: 0 },
  { id: "email", label: "Email", icon: Mail, angle: 45 },
  { id: "research", label: "Research", icon: Globe, angle: 90 },
  { id: "workflows", label: "Workflows", icon: Workflow, angle: 135 },
  { id: "automation", label: "Automation", icon: BarChart3, angle: 180 },
  { id: "learning", label: "Learning", icon: BookOpen, angle: 225 },
  { id: "planning", label: "Planning", icon: Calendar, angle: 270 },
  { id: "monitoring", label: "Monitoring", icon: Clock, angle: 315 }
];

export function CapabilityNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCapability, setHoveredCapability] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current?.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: Math.max(rect.height, 500) });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Draw connecting lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = Math.min(canvasSize.width, canvasSize.height) * 0.25;
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.strokeStyle = `rgba(255, 255, 255, ${hoveredCapability ? 0.15 : 0.08})`;
    ctx.lineWidth = 1.5;

    // Draw connecting lines
    CAPABILITIES.forEach((cap, i) => {
      const nextCap = CAPABILITIES[(i + 1) % CAPABILITIES.length];
      const angle1 = (cap.angle * Math.PI) / 180;
      const angle2 = (nextCap.angle * Math.PI) / 180;

      const x1 = centerX + radius * Math.cos(angle1);
      const y1 = centerY + radius * Math.sin(angle1);
      const x2 = centerX + radius * Math.cos(angle2);
      const y2 = centerY + radius * Math.sin(angle2);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw to center
      if (hoveredCapability === cap.id) {
        ctx.strokeStyle = `rgba(91, 134, 229, 0.3)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
      }
    });
  }, [canvasSize, hoveredCapability]);

  const radius = Math.min(canvasSize.width, canvasSize.height) * 0.25;
  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;

  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
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

        <div className="relative max-w-4xl mx-auto" style={{ height: Math.max(canvasSize.width * 0.8, 500) }}>
          {/* Canvas for drawing lines */}
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={Math.max(canvasSize.width * 0.8, 500)}
            className="absolute inset-0 w-full"
          />

          {/* Center Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 80,
              height: 80,
              x: "-50%",
              y: "-50%"
            }}
          >
            <div className="w-full h-full rounded-full glass-card flex items-center justify-center border-white/40">
              <Brain className="w-8 h-8 text-gray-700" />
            </div>
          </motion.div>

          {/* Capability Nodes */}
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            const angle = (cap.angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const isHovered = hoveredCapability === cap.id;

            return (
              <motion.button
                key={cap.id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onMouseEnter={() => setHoveredCapability(cap.id)}
                onMouseLeave={() => setHoveredCapability(null)}
                className="absolute group"
                style={{
                  left: `${(x / canvasSize.width) * 100}%`,
                  top: `${(y / (Math.max(canvasSize.width * 0.8, 500))) * 100}%`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isHovered 
                      ? "glass-card border-white/60 shadow-lg" 
                      : "glass hover:border-white/50"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isHovered ? "text-gray-900" : "text-gray-700"}`} />
                </motion.div>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full -left-8 mb-4 px-3 py-1.5 rounded-lg glass-card whitespace-nowrap text-sm font-medium text-gray-900 pointer-events-none"
                >
                  {cap.label}
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-base">Hover over each capability to see how they connect</p>
        </div>
      </div>
    </section>
  );
}
