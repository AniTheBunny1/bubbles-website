"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 px-5 md:px-10 py-4 flex items-center justify-between"
    >
      {/* Left: Hems Logo */}
      <a
        href="https://www.instagram.com/hemslabs/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start"
      >
        {/* "Built by" sized to span ~half the (square) logo width and sit snug on top */}
        <span className="ml-1 w-10 text-center text-sm font-normal leading-none text-gray-600 md:w-20 md:text-xl">
          Built by
        </span>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src="/hems-logo.webp"
          alt="Hems Logo"
          className="-mt-2 h-20 md:h-40 w-auto object-contain cursor-pointer md:-mt-3"
        />
      </a>

      {/* Right: CTA Button */}
      <motion.button
        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="px-6 py-3 rounded-full text-sm md:text-base font-medium text-gray-800 whitespace-nowrap"
        style={{
          background: "rgba(255,255,255,0.52)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        Get Early Access
      </motion.button>
    </motion.nav>
  );
}

