"use client";

import { motion } from "framer-motion";

export function WhyBubbles() {
  return (
    <section className="relative z-10 overflow-hidden w-full" style={{ background: "#0c0c0f" }}>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />


      <div className="max-w-7xl mx-auto px-8 md:px-16 py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-16 md:gap-24">

          {/* Left: big statement */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 min-w-0"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-6">
              Why Bubbles
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.05] mb-8">
              Most AIs<br />suggest.<br />
              <span style={{ color: "#ffffff" }}>We act.</span>
            </h2>
            <div className="w-12 h-px bg-white/30" />
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 min-w-0 flex flex-col gap-7 md:pt-14"
          >
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Most assistants are glorified chat boxes. They watch you drown in suggestions while you do all the work.
            </p>

            <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
              Bubbles eats your boring tasks, automates the friction, and sells you back your own time. It doesn't just comment on your life. It acts.
            </p>

            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-gray-500 leading-relaxed">
                Building the Personal Intelligence Layer for Life.<br />
                Two student founders, bootstrapped, shipping from India.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
