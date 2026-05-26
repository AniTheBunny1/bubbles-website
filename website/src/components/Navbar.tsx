"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-center"
    >
      {/* Top Left Logo */}
      <div className="absolute left-6 md:left-10 top-2 flex items-center">
        <img 
          src="/hems-logo.png" 
          alt="Hems Logo" 
          className="h-24 w-auto object-contain"
        />
      </div>

      <button 
        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
        Join Public Beta
      </button>
    </motion.nav>
  );
}
