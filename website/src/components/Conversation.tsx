"use client";

import { motion } from "framer-motion";

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
    description: "Book flights with preferences automatically applied",
    messages: [
      { role: "user", text: "Find me flights to Bali next month. Prefer early morning departures." },
      { role: "ai", text: "🫧 Checking flights for June 15-22. Applying your preferences: early departures, direct when possible. Found 4 options on GoIBibo with prices from ₹12,500." },
      { role: "ai", text: "🫧 Booking the IndiGo 6:15 AM flight. Seat 12A reserved. Confirmation sent to your email." }
    ]
  },
  {
    title: "Email Management",
    description: "Scan emails and handle subscriptions",
    messages: [
      { role: "user", text: "How many newsletter subscriptions do I have?" },
      { role: "ai", text: "🫧 Scanning your inbox. Found 23 active subscriptions. 7 are dormant (haven't opened in 2+ months)." },
      { role: "ai", text: "🫧 Cancelled the dead weight subscriptions. You'll save ₹2,145/month. Unsubscribe confirmations sent." }
    ]
  },
  {
    title: "Research Assistant",
    description: "Gather information and summarize findings",
    messages: [
      { role: "user", text: "What's trending in AI startups this week?" },
      { role: "ai", text: "🫧 Pulling from Hacker News, Product Hunt, and TechCrunch. Top trends: multimodal models, AI agents for enterprise, and open-source LLMs." },
      { role: "ai", text: "🫧 Saved 12 relevant articles to your reading list with summaries attached." }
    ]
  }
];

const MessageBubble = ({ role, text }: { role: string; text: string }) => {
  const isAI = role === "ai";
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} w-full`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 mr-3 bg-white/20">
          <img src="/logo.png" alt="Bubbles" className="w-full h-full object-contain" />
        </div>
      )}
      <div className={`px-5 py-3 rounded-2xl max-w-[75%] backdrop-blur-sm border text-sm leading-relaxed ${
        isAI 
        ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-white/10 rounded-tl-sm text-gray-200' 
        : 'bg-[#005c4b] border-[#005c4b]/50 rounded-tr-sm text-white'
      }`}>
        {text}
      </div>
    </motion.div>
  );
};

export function Conversation() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20">
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

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {DEMOS.map((demo, demoIdx) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: demoIdx * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Demo Header */}
              <div className="mb-6 pb-4 border-b border-white/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{demo.title}</h3>
                <p className="text-sm text-gray-600">{demo.description}</p>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 space-y-4 min-h-[300px]">
                {demo.messages.map((msg, i) => (
                  <MessageBubble key={i} role={msg.role} text={msg.text} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
