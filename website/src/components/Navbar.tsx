"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 px-5 md:px-10 py-3 flex items-center justify-between"
    >
      {/* Left: Hems Logo */}
      <img 
        src="/hems-logo.png" 
        alt="Hems Logo" 
        className="h-32 md:h-40 w-auto object-contain"
      />

      {/* Right: CTA Button */}
      <button 
        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        className="glass px-6 py-3 rounded-full text-sm md:text-base font-medium text-gray-900 hover:bg-white/40 transition-all duration-300 shadow-lg shadow-black/5 whitespace-nowrap"
      >
        Get Early Access
      </button>
    </motion.nav>
  );
}

