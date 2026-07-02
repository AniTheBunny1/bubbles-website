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
          phone: formData.phone,
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
    <section id="waitlist" className="relative z-10 px-4 py-36">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-md text-center"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
          Early access is open.
        </h2>
        <p className="mt-4 text-lg text-[#6e6e73]">
          Leave your number. Bubbles texts you first.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center"
          >
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-[#1d1d1f]">
              You are in.
            </h3>
            <p className="text-[#6e6e73]">We will be in touch soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-3">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full rounded-2xl border border-black/10 bg-white/70 px-5 py-4 text-[#1d1d1f] placeholder-black/35 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none backdrop-blur transition focus:border-black/30"
            />

            <input
              type="tel"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full rounded-2xl border border-black/10 bg-white/70 px-5 py-4 text-[#1d1d1f] placeholder-black/35 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none backdrop-blur transition focus:border-black/30"
            />

            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-2xl bg-[#1d1d1f] px-6 py-4 font-medium text-white shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Request early access"}
            </motion.button>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-3 text-sm text-red-500"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
