"use client";

import { motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ email: "", phone: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const url = process.env.NEXT_PUBLIC_GOOGLE_WEBHOOK_URL;
      if (!url) throw new Error("Webhook URL missing");

      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ 
          email: formData.email, 
          phone: formData.phone 
        }),
      });

      setStatus("success");
      setFormData({ email: "", phone: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="relative z-10 overflow-hidden px-4 py-40">
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-xl text-center"
      >
        <p className="mb-8 text-lg text-black/55">Bubbles is in early access.</p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <h3 className="mb-3 text-3xl font-semibold tracking-tight text-black">You are in.</h3>
            <p className="text-black/55">We will be in touch soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full rounded-full border border-white/45 bg-white/30 px-5 py-4 text-gray-900 placeholder-gray-500 outline-none transition focus:border-white/80"
            />

            <input
              type="tel"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full rounded-full border border-white/45 bg-white/30 px-5 py-4 text-gray-900 placeholder-gray-500 outline-none transition focus:border-white/80"
            />

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-black/80 px-6 py-4 font-medium text-white shadow-[0_20px_80px_rgba(0,0,0,.18)] transition disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Request early access"}
            </motion.button>

            {status === "error" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-3 text-sm text-red-500">
                Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
