"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 flex w-full items-center justify-between px-5 py-3 md:px-10"
    >
      {/* Left: Hems logo */}
      <a href="https://www.instagram.com/hemslabs/" target="_blank" rel="noopener noreferrer">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src="/hems-logo.webp"
          alt="Hems Logo"
          className="h-16 w-auto cursor-pointer object-contain md:h-24"
        />
      </a>

      {/* Right: CTA */}
      <motion.button
        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-[#1d1d1f] md:text-base"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
        }}
      >
        Get early access
      </motion.button>
    </motion.nav>
  );
}
