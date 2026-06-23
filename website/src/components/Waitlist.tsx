"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showBubbles, setShowBubbles] = useState(false);
  const [formData, setFormData] = useState({ email: "", phone: "" });
  const sectionRef = useRef<HTMLElement>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatingRef.current) {
          animatingRef.current = true;
          setShowBubbles(true);
          setTimeout(() => {
            setShowBubbles(false);
            animatingRef.current = false;
          }, 6000);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
    <section ref={sectionRef} id="waitlist" className="py-32 px-4 relative z-10 overflow-hidden">
      {/* Animated Rising Bubbles - fixed so they float over the whole site */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {showBubbles && [
          { size: 22,  left: 4,  delay: 0.0,  duration: 2.8 },
          { size: 95,  left: 11, delay: 0.5,  duration: 6.2 },
          { size: 38,  left: 19, delay: 0.1,  duration: 3.5 },
          { size: 140, left: 27, delay: 0.8,  duration: 7.4 },
          { size: 55,  left: 34, delay: 0.3,  duration: 4.6 },
          { size: 18,  left: 42, delay: 0.05, duration: 2.5 },
          { size: 115, left: 51, delay: 0.65, duration: 6.8 },
          { size: 44,  left: 58, delay: 0.2,  duration: 3.9 },
          { size: 78,  left: 65, delay: 0.45, duration: 5.5 },
          { size: 28,  left: 73, delay: 0.15, duration: 3.1 },
          { size: 130, left: 81, delay: 0.9,  duration: 7.0 },
          { size: 50,  left: 88, delay: 0.35, duration: 4.2 },
          { size: 20,  left: 95, delay: 0.7,  duration: 2.7 },
          { size: 85,  left: 7,  delay: 1.1,  duration: 5.8 },
          { size: 35,  left: 46, delay: 1.3,  duration: 3.4 },
          { size: 105, left: 62, delay: 0.55, duration: 6.4 },
          { size: 24,  left: 77, delay: 1.0,  duration: 2.9 },
          { size: 145, left: 38, delay: 0.4,  duration: 7.8 },
        ].map((b, i) => (
          <motion.img
            key={i}
            src="/bubblebub.png"
            alt=""
            initial={{ y: 0, opacity: 0, scale: 0.3 }}
            animate={{
              y: -1600,
              opacity: [0, 0.85, 0.85, 0],
              scale: [0.3, 1.0, 0.9],
              x: [0, Math.sin(i * 1.1) * 90, Math.sin(i * 1.1 + 1.5) * 55]
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
                className="w-full px-6 py-3 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 text-white"
                style={{ backgroundColor: "#FF4422" }}
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
