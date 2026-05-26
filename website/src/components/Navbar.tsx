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
        className="bg-black text-white px-6 py-3 rounded-full text-sm md:text-base font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/10 whitespace-nowrap"
      >
        Join Public Beta
      </button>
    </motion.nav>
  );
}

