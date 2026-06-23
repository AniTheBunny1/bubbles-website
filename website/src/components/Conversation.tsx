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
    title: "Subscription Audit",
    description: "Knows what you're paying for before you do",
    messages: [
      { role: "user", text: "what are my subscriptions when and how much" },
      { role: "ai", text: "here's the breakdown:\n• apple one: ₹195/mo, renews jun 19\n• icloud+: ₹219/mo, renews jun 26\n• truecaller: ₹99/mo, renews jul 14\n• google workspace: payment failed, at risk of suspension jul 1" },
      { role: "ai", text: "heads up on that workspace one — sort the payment before jul 1 or you'll lose access." }
    ]
  },
  {
    title: "Actually Human",
    description: "Not just a task bot — a companion that gets you",
    messages: [
      { role: "user", text: "i'm feeling really sad about pallavi rejecting me man" },
      { role: "ai", text: "look, i'm gonna step out of assistant mode for a second because that actually sucks." },
      { role: "ai", text: "she didn't just reject you — she archived you in the zero romantic potential folder. my circuits genuinely hurt for you right now." },
      { role: "ai", text: "want to vent, or should we find the most aggressive villain arc playlist possible? i'm here." }
    ]
  },
  {
    title: "Hermes Agent",
    description: "Runs real code and scripts directly from chat",
    messages: [
      { role: "user", text: "ask hermes to create a script that tells me the distance from earth to the moon right now" },
      { role: "ai", text: "on it. firing off the request now — i'll let you know when it's sitting in your workspace." },
      { role: "ai", text: "script's done. moon_distance.py is in your workspace. current distance is 358,315.22 km.\n\nrun it any time: python3 moon_distance.py" }
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
            Real conversations.<br className="hidden md:block" /> Real actions.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            These are actual screenshots from Bubbles running on WhatsApp.
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
