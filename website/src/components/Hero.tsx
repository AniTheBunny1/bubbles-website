"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);


  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">

      {/* Logo - no glass bubble, no shadow */}
      <motion.div
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-12"
      >
        <motion.img
          src="/logo.png"
          alt="Bubbles Logo"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-44 h-44 md:w-56 md:h-56 object-contain"
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        style={{ scale, opacity, y }}
        className="text-center z-10 max-w-3xl mx-auto space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-black"
        >
          An AI that <br className="hidden md:block" />
          <span className="iridescent-text">actually does stuff</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Lives in WhatsApp. Remembers everything. Doesn't just suggest, it executes.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-base md:text-lg text-gray-500 max-w-xl mx-auto"
        >
          Stop managing the chaos and start living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-4"
        >
          <p className="text-sm text-gray-500 font-medium">Bootstrapped 4L+ for development. Public beta out soon.</p>
        </motion.div>
      </motion.div>

    </section>
  );
}

