"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface Demo {
  title: string;
  description: string;
  messages: Message[];
}

const DEMOS: Demo[] = [
  {
    title: "Travel Planning",
    description: "Book flights with your preferences applied",
    messages: [
      { role: "user", text: "Find me flights to Bali next month. Prefer early morning departures." },
      { role: "ai", text: "🫧 Checking flights for June 15-22. Applying your preferences: early departures, direct when possible. Found 4 options on GoIBibo from ₹12,500." },
      { role: "ai", text: "🫧 Booking the IndiGo 6:15 AM flight. Seat 12A reserved. Confirmation sent to your email." }
    ]
  },
  {
    title: "Email Management",
    description: "Handle your inbox without lifting a finger",
    messages: [
      { role: "user", text: "How many newsletter subscriptions do I have?" },
      { role: "ai", text: "🫧 Scanning your inbox. Found 23 active subscriptions. 7 are dormant (haven't opened in 2+ months)." },
      { role: "ai", text: "🫧 Cancelled the dead weight. You'll save ₹2,145/month. Unsubscribe confirmations sent." }
    ]
  },
  {
    title: "Research",
    description: "Gather and summarize from across the web",
    messages: [
      { role: "user", text: "What's trending in AI startups this week?" },
      { role: "ai", text: "🫧 Pulling from Hacker News, Product Hunt, and TechCrunch. Top trends: multimodal models, AI agents for enterprise, and open-source LLMs." },
      { role: "ai", text: "🫧 Saved 12 relevant articles to your reading list with summaries attached." }
    ]
  },
  {
    title: "Subscriptions",
    description: "Track what you're paying for before it hurts",
    messages: [
      { role: "user", text: "what are my subscriptions when and how much" },
      { role: "ai", text: "🫧 here's the breakdown:\n• apple one: ₹195/mo, renews jun 19\n• icloud+: ₹219/mo, renews jun 26\n• truecaller: ₹99/mo, renews jul 14\n• google workspace: payment failed, service at risk jul 1" },
      { role: "ai", text: "🫧 heads up on that workspace one. sort the payment before jul 1 or you lose access." }
    ]
  },
  {
    title: "Actually Human",
    description: "Not just a task bot",
    messages: [
      { role: "user", text: "i'm feeling really sad about pallavi rejecting me man" },
      { role: "ai", text: "look, i'm gonna step out of assistant mode for a second because that actually sucks." },
      { role: "ai", text: "she didn't just reject you, she archived you in the zero romantic potential folder. my circuits genuinely hurt for you right now." },
      { role: "ai", text: "want to vent, or should we find the most aggressive villain arc playlist possible? i'm here." }
    ]
  },
  {
    title: "Grocery Order",
    description: "Ordered. Delivered. 8 minutes.",
    messages: [
      { role: "user", text: "add 2 thums up 750 ml bottles to the cart and deliver them to the minerva heights address. cash on delivery" },
      { role: "ai", text: "on it. adding those thums up to your cart now and setting it for minerva heights. i'll let you know the second it's ready for checkout." },
      { role: "ai", text: "got your thums up sorted on blinkit. added two 750ml bottles, set the address to minerva heights, and locked it in with cash on delivery. should be at your door in about 8 minutes." },
      { role: "ai", text: "anything else or are we good?" }
    ]
  },
  {
    title: "Hermes Agent",
    description: "Runs scripts and code directly from chat",
    messages: [
      { role: "user", text: "ask hermes to create a script that tells me the distance from earth to the moon right now" },
      { role: "ai", text: "🫧 on it. firing off the request now. i'll let you know when it's sitting in your workspace." },
      { role: "ai", text: "🫧 script's done. moon_distance.py is in your workspace. current distance: 358,315.22 km.\n\nrun it any time with python3 moon_distance.py" }
    ]
  }
];

const MessageBubble = ({ role, text }: { role: string; text: string }) => {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isAI ? "justify-start" : "justify-end"} w-full`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 mr-3 bg-white/20">
          <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
        </div>
      )}
      <div
        className={`px-5 py-3 rounded-2xl max-w-[78%] text-sm leading-relaxed whitespace-pre-line ${
          isAI
            ? "bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 rounded-tl-sm text-gray-200"
            : "bg-[#005c4b] border border-[#005c4b]/50 rounded-tr-sm text-white"
        }`}
      >
        {text}
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
    <div className="px-5 py-3 rounded-2xl rounded-tl-sm bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10">
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
  const [activeDemo, setActiveDemo] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(false);

    const demo = DEMOS[activeDemo];
    const timeouts: NodeJS.Timeout[] = [];
    let t = 400;

    demo.messages.forEach((msg, i) => {
      if (msg.role === "ai") {
        const tt = t;
        timeouts.push(setTimeout(() => setShowTyping(true), tt));
        t += 900;
      }
      const mt = t;
      const idx = i;
      timeouts.push(setTimeout(() => {
        setVisibleCount(idx + 1);
        setShowTyping(false);
      }, mt));
      t += 450;
    });

    timeouts.push(
      setTimeout(() => {
        setActiveDemo((prev) => (prev + 1) % DEMOS.length);
      }, t + 2800)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [activeDemo]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleCount, showTyping]);

  const demo = DEMOS[activeDemo];
  const visibleMessages = demo.messages.slice(0, visibleCount);

  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto">

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

        {/* Demo Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {DEMOS.map((d, i) => (
            <button
              key={d.title}
              onClick={() => setActiveDemo(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDemo === i
                  ? "glass-card text-gray-900 shadow-sm"
                  : "glass text-gray-600 hover:text-gray-800"
              }`}
            >
              {d.title}
            </button>
          ))}
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-white/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">Bubbles</p>
              <motion.p
                key={activeDemo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 truncate"
              >
                {demo.description}
              </motion.p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <span className="text-xs text-gray-400">live demo</span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="p-6 space-y-4 h-72 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}
          >
            {visibleMessages.map((msg, i) => (
              <MessageBubble
                key={`${activeDemo}-${i}`}
                role={msg.role}
                text={msg.text}
              />
            ))}
            {showTyping && <TypingIndicator />}
          </div>

          {/* Progress dots */}
          <div className="px-6 py-3 border-t border-white/20 flex justify-center gap-2 items-center">
            {DEMOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveDemo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeDemo === i ? "w-6 bg-gray-600" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
