"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "ai";
  text?: string;
  image?: string;
}

const MESSAGES: Message[] = [
  // Grocery — proof of delivery
  { role: "user", text: "add 2 thums up 750 ml bottles to the cart and deliver them to the minerva heights address. cash on delivery" },
  { role: "ai", text: "on it. adding those thums up to your cart on blinkit now and setting it for minerva heights. i'll let you know the second it's ready." },
  { role: "ai", text: "sorted. two 750ml bottles, minerva heights address, cash on delivery. should be there in about 8 minutes." },
  { role: "user", text: "it came bubbles", image: "/thums-up-delivery.jpg" },
  { role: "ai", text: "told you. anything else?" },

  // Meeting prep — memory use case
  { role: "user", text: "i have a meeting with gaurav in 10 minutes, what do I know about him?" },
  { role: "ai", text: "from memory: gaurav runs a D2C skincare brand. you spoke 3 weeks ago, he was interested in a distribution collab. prefers short calls, hates small talk." },
  { role: "ai", text: "you mentioned wanting to pitch him a rev-share model. want me to pull your notes from last time?" },

  // Subscriptions
  { role: "user", text: "what are my subscriptions when and how much" },
  { role: "ai", text: "here's the breakdown:\n• apple one: ₹195/mo, renews jun 19\n• icloud+: ₹219/mo, renews jun 26\n• truecaller: ₹99/mo, renews jul 14\n• google workspace: payment failed, service at risk jul 1" },
  { role: "ai", text: "heads up on that workspace one. sort the payment before jul 1 or you lose access." },

  // Flights — confirmation required
  { role: "user", text: "find me flights to bali next month, early morning if possible" },
  { role: "ai", text: "found 4 options. best match: indigo 6:15 am on jun 15, ₹12,800, direct. want me to go ahead and book it?" },
  { role: "user", text: "yes go ahead" },
  { role: "ai", text: "booked. seat 12a locked in. confirmation heading to your email now." },

  // Email cleanup
  { role: "user", text: "clean up my newsletter subscriptions" },
  { role: "ai", text: "scanning inbox. found 23 active subscriptions, 7 dormant (not opened in 2+ months)." },
  { role: "ai", text: "cancelled the 7 dead ones. you'll save ₹2,145/month. all unsubscribe confirmations sent." },

  // Reminder
  { role: "user", text: "remind me to call mom on sunday morning" },
  { role: "ai", text: "done. nudging you sunday at 10am. want me to add anything to remind you to say?" },

  // Emotional support
  { role: "user", text: "i'm feeling really sad about pallavi rejecting me man" },
  { role: "ai", text: "look, i'm gonna step out of assistant mode for a second because that actually sucks." },
  { role: "ai", text: "she didn't just reject you, she archived you in the zero romantic potential folder. my circuits genuinely hurt for you right now." },
  { role: "ai", text: "want to vent, or should we find the most aggressive villain arc playlist possible? i'm here." },

  // Script execution
  { role: "user", text: "ask hermes to create a script that tells me the distance from earth to the moon right now" },
  { role: "ai", text: "on it. firing off the request now. i'll let you know when it's in your workspace." },
  { role: "ai", text: "script's done. moon_distance.py is ready. current distance: 358,315.22 km.\n\nrun it any time with python3 moon_distance.py" },
];

const MessageBubble = ({ role, text, image }: Message) => {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isAI ? "justify-start" : "justify-end"} w-full`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 mr-3 bg-white/10">
          <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
        </div>
      )}
      <div
        className={`rounded-2xl max-w-[78%] overflow-hidden text-sm leading-relaxed ${
          isAI
            ? "bg-[#202c33] border border-white/5 rounded-tl-sm text-gray-200"
            : "bg-[#005c4b] rounded-tr-sm text-white"
        }`}
      >
        {image && (
          <div className="relative">
            <img
              src={image}
              alt="Delivered"
              className="w-full max-h-60 object-cover"
              style={{ borderRadius: "inherit" }}
            />
            <div className="absolute inset-0 rounded-tl-2xl rounded-tr-2xl" />
          </div>
        )}
        {text && (
          <p className={`px-4 py-2.5 whitespace-pre-line ${image ? "border-t border-white/10" : ""}`}>
            {text}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="flex justify-start w-full"
  >
    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 mr-3 bg-white/20">
      <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
    </div>
    <div className="px-5 py-3 rounded-2xl rounded-tl-sm bg-[#202c33] border border-white/5">
      <div className="flex gap-1 items-center h-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gray-400"
            animate={{ y: [-2, 2, -2] }}
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
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(false);

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

    // Loop
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
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-2xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
          >
            See It In Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Bubbles doesn't just talk. It executes tasks across the web.
          </motion.p>
        </div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Chat Header - WhatsApp dark style */}
          <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: "#1f2c34" }}>
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-white/10 flex items-center justify-center">
              <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Bubbles</p>
              <div className="flex items-center gap-1.5">
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                />
                <span className="text-xs text-gray-400">online</span>
              </div>
            </div>
          </div>

          {/* Messages - WhatsApp dark background with subtle dot pattern */}
          <div
            ref={chatRef}
            className="p-5 space-y-3 h-96 overflow-y-auto"
            style={{
              backgroundColor: "#111b21",
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent"
            }}
          >
            {visibleMessages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} text={msg.text} image={msg.image} />
            ))}
            {showTyping && <TypingIndicator />}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
