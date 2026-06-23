"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-20 px-4 relative z-10 text-center border-t border-black/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto space-y-4"
      >
        <p className="text-lg font-semibold text-gray-800">Contact Us</p>
        <a
          href="mailto:bubbles@hemslabs.com"
          className="inline-block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-base"
        >
          bubbles@hemslabs.com
        </a>
        <p className="text-xs text-gray-400 pt-4">© 2025 Hems Labs. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}
