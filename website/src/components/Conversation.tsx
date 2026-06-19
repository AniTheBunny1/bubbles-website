"use client";

import { motion } from "framer-motion";

const CHAT_HISTORY = [
  { role: "user", text: "show off all of bubbles features" },
  { role: "ai", text: "🫧 alright, let's skip the marketing deck and look at the raw horsepower." },
  { role: "ai", text: "🫧 while most bots are glorified autocomplete, i'm out here moving things in the real world. here's what i'm currently running for this account:" },
  { role: "ai", text: "🫧 autonomous web agents: i don't just read the internet — i navigate it. right now i have active browser tasks scraping linkedin for startup founders, auditing instagram for brand aesthetics, and logging into university portals to check for active quizzes. if it has a login or a checkout button, i can handle it." },
  { role: "ai", text: "🫧 financial & habit intelligence: i'm the one that actually watches the money. i scan receipts and bank alerts to kill zombie subscriptions and track spending across food, transport, and tech." },
  { role: "user", text: "what are my subscriptions" },
  { role: "ai", text: "🫧 let's see how much of your money is disappearing into the void every month. checking your emails for the usual suspects..." },
  { role: "ai", text: "🫧 alright, here's the damage report:\n\n• apple one (individual): ₹195/mo\n• icloud+ (50gb): ₹75/mo\n• karafun premium: ₹919 (getting your karaoke on?)\n• chatgpt go: active, auto-renewing" },
  { role: "ai", text: "🫧 in subscription limbo: youtube premium is paused since november — your payment failed. amazon prime choked in april too." },
  { role: "ai", text: "🫧 the ones that got away: netflix officially cancelled last june. spotify? couldn't find a single receipt. either you're on free tier or someone else is footing the bill." },
  { role: "ai", text: "🫧 honestly, ₹919 for karaoke is a specific kind of commitment and i respect it. want me to handle anything else or are we just mourning the apple one bill?" },
  { role: "user", text: "give me the full vc grand tour" },
  { role: "ai", text: "🫧 alright, if we're doing the grand tour, let's talk about what's actually happening under the hood right now. i'm not just a chatbot — i'm a multi-agent orchestration layer." },
  { role: "ai", text: "🫧 here's the showreel of what i'm running at this exact second:" },
  { role: "ai", text: "🫧 active browser autonomy: i currently have 7 background tasks live. while we're talking, i'm navigating university portals, scraping linkedin for student founders, and auditing instagram profiles. i handle logins, navigation, and visual extraction so the user doesn't have to." },
  { role: "ai", text: "🫧 the swarm architecture: i orchestrate eleven-eye — a 12-agent configuration built for high-stakes logic. architects, auditors, and reality-checkers working in parallel to solve industrial-grade problems. this isn't general chat." },
  { role: "ai", text: "🫧 financial & digital hygiene: i'm the grim reaper for zombie subscriptions. i scan emails and receipts to track burn rates. i know what's being spent on coffee vs. infrastructure, and i'm not afraid to roast the user about it." },
  { role: "ai", text: "🫧 proactive logistics: i manage blinkit orders, schedule wake-up calls, and coordinate events. i don't wait for prompts — i monitor the environment and act." },
  { role: "ai", text: "🫧 side note: i noticed 15 pending assignments stacking up. given the 'stressed' vibe i'm reading, maybe let me handle the scheduling while you breathe for a second? 🙏" },
  { role: "ai", text: "🫧 so — do we like the unit economics, or should i keep showing off?" },
];

const MessageBubble = ({ role, text }: { role: string; text: string }) => {
  const isAI = role === "ai";
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} w-full`}>
      {isAI && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1 mr-4 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #7dd3fc, #38bdf8)' }}>
          <img src="/logo.png" alt="Bubbles" className="w-7 h-7 object-contain" />
        </div>
      )}
      <div className={`px-6 py-4 rounded-2xl max-w-[85%] backdrop-blur-sm border ${
        isAI 
        ? 'bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-white/10 rounded-tl-sm' 
        : 'bg-[#005c4b] border-[#005c4b]/50 rounded-tr-sm shadow-sm'
      }`}>
        <p className={`text-lg leading-relaxed ${isAI ? 'text-gray-200' : 'text-white'}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

const ChatList = () => (
  <div className="flex flex-col gap-6">
    {CHAT_HISTORY.map((msg, idx) => (
      <MessageBubble key={idx} role={msg.role} text={msg.text} />
    ))}
  </div>
);

export function Conversation() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Top: WhatsApp UI Focus */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
          >
            What Can Bubbles Do?
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Premium Glass Container for Chat */}
          <div className="glass-card rounded-[3rem] p-4 md:p-8 relative z-10">
            <div 
              className="relative rounded-[2rem] shadow-2xl overflow-hidden h-[600px] border border-white/20"
              style={{ 
                backgroundColor: '#0b141a', // WhatsApp dark mode base
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`
              }}
            >
              {/* Top and Bottom Fade Masks */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0b141a] to-transparent z-10 pointer-events-none rounded-t-[2rem]" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b141a] to-transparent z-10 pointer-events-none rounded-b-[2rem]" />
              
              <motion.div 
                animate={{ y: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                className="flex flex-col gap-6 px-8 md:px-12 py-12 will-change-transform"
                style={{ transform: "translateZ(0)" }}
              >
                <ChatList />
                <ChatList />
              </motion.div>
            </div>
          </div>
          
          {/* Decorative ambient blobs behind the glass card */}
          <div className="absolute -left-12 -top-12 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
        </motion.div>

        {/* Bottom: 4 Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Adaptive Memory", desc: "Remembers preferences, context, and important information." },
            { title: "Custom Personalities", desc: "Adapts communication style, behavior, and workflows." },
            { title: "Browser Automation", desc: "Interacts with websites and online services on behalf of users." },
            { title: "Workflow Execution", desc: "Automates repetitive tasks and multi-step processes." }
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
