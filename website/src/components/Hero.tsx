"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);

  const pills = [
    "Adaptive Memory",
    "Custom Personalities",
    "Browser Automation",
    "Workflow Execution"
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
      
      {/* Dynamic Logo Container */}
      <motion.div
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-48 h-48 mb-12 flex items-center justify-center group"
      >
        <motion.div 
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 rounded-full glass before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-tr before:from-blue-200/40 before:to-transparent after:absolute after:inset-2 after:rounded-full after:shadow-[inset_0_20px_20px_rgba(255,255,255,0.8)] shadow-[0_20px_40px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500"
        />
        <img 
          src="/logo.png" 
          alt="Bubbles Logo" 
          className="w-24 h-24 object-contain relative z-10 drop-shadow-xl"
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
          Your Personal <br className="hidden md:block" />
          <span className="iridescent-text">AI Operator</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-600 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed"
        >
          Adaptive memory, custom personalities, browser automation, and workflow execution. All through WhatsApp.
        </motion.p>
        
        {/* Glass Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 pt-6"
        >
          {pills.map((pill, i) => (
            <motion.div
              key={pill}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              className="glass px-5 py-2 rounded-full text-sm font-medium text-gray-700"
            >
              {pill}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}

