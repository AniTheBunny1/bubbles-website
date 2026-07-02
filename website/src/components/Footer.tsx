"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/5 px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-xl space-y-3"
      >
        <a
          href="mailto:bubbles@hemslabs.com"
          className="inline-block text-base text-[#6e6e73] transition-colors duration-200 hover:text-[#1d1d1f]"
        >
          bubbles@hemslabs.com
        </a>
        <p className="text-xs text-black/30">© 2026 Hems Labs. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}
