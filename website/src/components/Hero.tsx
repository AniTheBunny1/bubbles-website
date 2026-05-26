"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
      
      {/* Logo Image */}
      <motion.div
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-48 h-48 mb-12 flex items-center justify-center"
      >
        <img 
          src="/logo.png" 
          alt="Bubbles Logo" 
          className="w-full h-full object-contain"
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
          className="text-7xl md:text-9xl font-bold tracking-tighter text-black"
        >
          BUBBLES
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl md:text-4xl text-gray-800 font-medium tracking-tight"
        >
          The AI That Cares.
        </motion.h2>
        
      </motion.div>

    </section>
  );
}

