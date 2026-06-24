"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "ai";
  text?: string;
  image?: string;
}

const MESSAGES: Message[] = [
  // Blinkit: proof of delivery
  { role: "user", text: "add 2 thums up 750 ml bottles to the cart and deliver them to the minerva heights address. cash on delivery" },
  { role: "ai",   text: "two thums ups, minerva heights, cash on delivery. adding to cart now." },
  { role: "ai",   text: "sorted. eight minutes. i'd start making fridge space." },
  { role: "user", text: "it came bubbles", image: "/thums-up-delivery.webp" },
  { role: "ai",   text: "told you." },

  // Amazon + UPI
  { role: "user", text: "order me those boat airdopes from amazon" },
  { role: "ai",   text: "found them. boAt Airdopes 141, ₹1,299, prime delivery tomorrow. should i go ahead?" },
  { role: "user", text: "yes" },
  { role: "ai",   text: "payment request of ₹1,299 sent to your UPI ID. approve it to confirm the order." },

  // Meeting prep: memory use case
  { role: "user", text: "i have a meeting with gaurav in 10 minutes, what do I know about him?" },
  { role: "ai",   text: "from memory: gaurav runs a D2C skincare brand. last spoke 3 weeks ago, interested in a distribution collab. short calls only, hates small talk." },
  { role: "ai",   text: "you had a rev-share pitch in mind. want me to pull your notes so you walk in sharp?" },

  // Subscriptions
  { role: "user", text: "what are my subscriptions when and how much" },
  { role: "ai",   text: "here's the damage:\n• apple one: ₹195/mo, renews jun 19\n• icloud+: ₹219/mo, renews jun 26\n• truecaller: ₹99/mo, renews jul 14\n• google workspace: payment failed, at risk jul 1" },
  { role: "ai",   text: "that workspace one is actively a problem. fix the payment before jul 1 or google pulls the plug on you." },

  // Swiggy + UPI
  { role: "user", text: "order me 2 paneer rolls from punjab grill on swiggy" },
  { role: "ai",   text: "found it. punjab grill, 2 paneer rolls, ₹340 total, 25 mins. payment request sent to your UPI ID. approve it on your phone to confirm." },

  // Email cleanup
  { role: "user", text: "clean up my newsletter subscriptions" },
  { role: "ai",   text: "scanning inbox. 23 active subscriptions, 7 ghosts (not opened in 2+ months)." },
  { role: "ai",   text: "killed the 7 dead ones. you just saved ₹2,145/month. you're welcome." },

  // Reminder
  { role: "user", text: "remind me to call mom on sunday morning" },
  { role: "ai",   text: "done. hitting you sunday at 10am. want a little nudge on what to say so it doesn't get awkward?" },

  // Emotional support
  { role: "user", text: "i'm feeling really sad about pallavi rejecting me man" },
  { role: "ai",   text: "stepping out of assistant mode for a sec because that genuinely sucks." },
  { role: "ai",   text: "she didn't just reject you, she put you in the zero romantic potential folder and hit archive. that's a specific kind of awful." },
  { role: "ai",   text: "want to vent into the void, or should we pull up the most unhinged villain arc playlist we can find? i'm here either way." },

  // Script execution
  { role: "user", text: "ask hermes to create a script that tells me the distance from earth to the moon right now" },
  { role: "ai",   text: "sending the request to hermes now." },
  { role: "ai",   text: "done. moon_distance.py is sitting in your workspace. current distance: 358,315.22 km.\n\npython3 moon_distance.py any time." },
];

const MessageBubble = ({ role, text, image }: Message) => {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isAI ? "justify-start" : "justify-end"} w-full`}
    >
      <div
        className={`rounded-2xl max-w-[80%] overflow-hidden text-[18px] leading-snug ${
          isAI
            ? "bg-[#202c33] border border-white/5 rounded-tl-sm text-gray-200"
            : "bg-[#005c4b] rounded-tr-sm text-white"
        }`}
      >
        {image && (
          <img src={image} alt="Delivered" className="w-full max-h-36 object-cover" />
        )}
        {text && (
          <p className={`px-3.5 py-2.5 whitespace-pre-line ${image ? "border-t border-white/10" : ""}`}>
            {text}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="flex justify-start w-full"
  >
    <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[#202c33] border border-white/5">
      <div className="flex gap-1 items-center h-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-gray-400"
            animate={{ y: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export function Conversation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const phoneOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let t = 1000;

    MESSAGES.forEach((msg, i) => {
      if (msg.role === "ai") {
        const tt = t;
        timeouts.push(setTimeout(() => setShowTyping(true), tt));
        t += 1800;
      }
      const mt = t;
      timeouts.push(setTimeout(() => {
        setVisibleCount(i + 1);
        setShowTyping(false);
      }, mt));
      t += 900;
    });

    timeouts.push(setTimeout(() => setCycleKey((k) => k + 1), t + 5000));
    return () => timeouts.forEach(clearTimeout);
  }, [cycleKey]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleCount, showTyping]);

  const visibleMessages = MESSAGES.slice(0, visibleCount);

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden pt-32 pb-0">
      <div className="mx-auto max-w-lg px-0">
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: "122%" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="absolute inset-x-0 top-0 w-full"
          style={{
            y: phoneY,
            opacity: phoneOpacity,
            scale: phoneScale,
          }}
        >
          <img
            src="/Subject.webp"
            alt=""
            className="relative z-20 block h-auto w-full pointer-events-none"
          />

          <div
            className="absolute flex flex-col overflow-hidden z-10"
            style={{
              top: "1.67%",
              left: "4.69%",
              right: "4.99%",
              bottom: "39.7%",
              borderRadius: "7% 7% 0 0 / 3.25% 3.25% 0 0",
              backgroundColor: "#111b21",
            }}
          >
            <div
              className="px-4 py-3 flex items-center gap-3 shrink-0"
              style={{ backgroundColor: "#1f2c34", paddingTop: "max(16px, 9%)" }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-white/10 flex items-center justify-center">
                <img src="/logo.webp" alt="Bubbles" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-none">Bubbles</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                  />
                  <span className="text-xs text-gray-400">online</span>
                </div>
              </div>
            </div>

            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3"
              style={{
                backgroundColor: "#111b21",
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {visibleMessages.map((msg, i) => (
                <MessageBubble key={i} role={msg.role} text={msg.text} image={msg.image} />
              ))}
              {showTyping && <TypingIndicator />}
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
