"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showBubbles, setShowBubbles] = useState(false);
  const [formData, setFormData] = useState({ email: "", phone: "" });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const isOverscrollingBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (isOverscrollingBottom && !showBubbles) {
        setShowBubbles(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setShowBubbles(false), 3000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [showBubbles]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <section id="waitlist" className="py-32 px-4 relative z-10 overflow-hidden">
      {/* Animated Rising Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {showBubbles && [
          { size: 40,  left: 12, delay: 0,    duration: 3.2 },
          { size: 70,  left: 22, delay: 0.15, duration: 3.8 },
          { size: 30,  left: 35, delay: 0.05, duration: 2.9 },
          { size: 90,  left: 45, delay: 0.3,  duration: 4.1 },
          { size: 50,  left: 55, delay: 0.1,  duration: 3.5 },
          { size: 110, left: 65, delay: 0.25, duration: 4.4 },
          { size: 35,  left: 74, delay: 0,    duration: 3.0 },
          { size: 75,  left: 82, delay: 0.2,  duration: 3.7 },
          { size: 55,  left: 18, delay: 0.35, duration: 3.3 },
          { size: 95,  left: 50, delay: 0.08, duration: 4.0 },
          { size: 42,  left: 70, delay: 0.18, duration: 3.1 },
          { size: 65,  left: 30, delay: 0.28, duration: 3.6 },
        ].map((b, i) => (
          <motion.img
            key={i}
            src="/bubblebub.png"
            alt=""
            initial={{ y: 0, opacity: 0, scale: 0.4 }}
            animate={{
              y: -(700 + i * 40),
              opacity: [0, 0.95, 0],
              scale: [0.4, 1.1, 0.9],
              x: Math.sin(i * 0.8) * 120
            }}
            transition={{
              duration: b.duration,
              ease: "easeOut",
              delay: b.delay
            }}
            className="absolute bottom-0 object-contain"
            style={{ width: b.size, height: b.size, left: `${b.left}%` }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black"
          >
            Join the Future of Personal AI
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-8"
          >
            Be among the first users shaping the next generation of AI operators.
          </motion.p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="text-5xl mb-4">🫧</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">You're in!</h3>
              <p className="text-gray-600">We'll be in touch soon. Check your email for updates.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-5 py-3 rounded-xl glass border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
              
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-5 py-3 rounded-xl glass border-white/40 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading"}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-gray-900 font-semibold rounded-xl transition-all duration-300 disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Get Early Access"}
              </motion.button>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
