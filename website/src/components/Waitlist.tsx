"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Check if user has scrolled past the bottom (overscroll / rubber band effect on Mac/iOS)
      const isOverscrollingBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      if (isOverscrollingBottom && !showBubbles) {
        setShowBubbles(true);
        // Hide them after animation completes so they can trigger again later
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

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const phone = formData.get("phone");

    try {
      const url = process.env.NEXT_PUBLIC_GOOGLE_WEBHOOK_URL;
      if (!url) throw new Error("Webhook URL missing");

      // We use no-cors because Google Scripts redirects to an HTML page with CORS headers that break fetch, 
      // but it still successfully processes the POST data.
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email: email as string, phone: phone as string }),
      });

      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="py-32 px-4 relative z-10 overflow-hidden">
      {/* Animated Rising Bubbles (Overscroll Triggered) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-end overflow-hidden">
        {showBubbles && [...Array(12)].map((_, i) => {
          const size = 30 + Math.random() * 80;
          return (
            <motion.div
              key={i}
              initial={{ y: 150, opacity: 0, scale: 0.5 }}
              animate={{
                y: -(600 + Math.random() * 400),
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 1],
                x: Math.sin(i * 45) * 150
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "easeOut",
                delay: Math.random() * 0.4
              }}
              className="rounded-full absolute bottom-0 border border-white/40"
              style={{
                width: size,
                height: size,
                left: `${10 + Math.random() * 80}%`,
                background: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset -5px -5px 15px rgba(255,255,255,0.4), inset 5px 5px 15px rgba(255,255,255,0.8), 0 5px 15px rgba(0,0,0,0.05)'
              }}
            />
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto glass-card rounded-[3rem] p-10 md:p-16 text-center relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Get Early Access
        </h2>
        <p className="text-gray-500 mb-10 text-lg">
          Join the next generation of personalized AI operators.
        </p>

        {status === "success" ? (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-medium text-gray-800 py-6"
          >
            🫧 You're on the waitlist
          </motion.p>
        ) : (
          <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input 
                name="email"
                type="email" 
                placeholder="Email address" 
                className="w-full px-6 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all text-gray-800 placeholder:text-gray-500"
                required
              />
              <input 
                name="phone"
                type="tel" 
                placeholder="Phone number" 
                className="w-full px-6 py-4 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-blue-400/30 transition-all text-gray-800 placeholder:text-gray-500"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={status === "loading"}
              className="w-full glass bg-white/40 hover:bg-white/60 text-gray-900 font-medium py-4 rounded-2xl transition-all mt-6 shadow-lg shadow-black/5 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Joining..." : "Request Early Access"}
            </button>
            
            {status === "error" && (
              <p className="text-red-500 text-sm mt-4">Something went wrong. Please try again.</p>
            )}
          </form>
        )}

      </motion.div>
    </section>
  );
}
