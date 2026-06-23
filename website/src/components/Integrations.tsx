"use client";

import { motion } from "framer-motion";

const GROUPS = [
  {
    title: "Daily life",
    emoji: "🌅",
    gradientFrom: "rgba(251,146,60,0.18)",
    gradientTo: "rgba(251,191,36,0.12)",
    dotColor: "#fb923c",
    apps: [
      { emoji: "🍕", name: "Swiggy" },
      { emoji: "⚡", name: "Blinkit" },
      { emoji: "📦", name: "Amazon" },
      { emoji: "🗺️", name: "Maps" },
    ],
    userMsg: "Order me 2 Thums Up from Blinkit",
    aiMsg: "order placed. two chilled thums ups, arriving in 12 mins. ₹78 cash ready.",
  },
  {
    title: "Work",
    emoji: "💼",
    gradientFrom: "rgba(96,165,250,0.18)",
    gradientTo: "rgba(167,139,250,0.12)",
    dotColor: "#818cf8",
    apps: [
      { emoji: "✉️", name: "Gmail" },
      { emoji: "💬", name: "Slack" },
      { emoji: "📝", name: "Notion" },
      { emoji: "📅", name: "Calendar" },
    ],
    userMsg: "Summarize my unread Slack messages",
    aiMsg: "three things: Priya needs the deck, Rahul's poking about the API bug, standup in 20. pick your battles.",
  },
  {
    title: "Manipal students",
    emoji: "🎓",
    gradientFrom: "rgba(52,211,153,0.18)",
    gradientTo: "rgba(56,189,248,0.12)",
    dotColor: "#34d399",
    apps: [
      { emoji: "🏫", name: "Lighthouse" },
      { emoji: "✉️", name: "Gmail" },
      { emoji: "📝", name: "Notion" },
      { emoji: "📅", name: "Calendar" },
    ],
    userMsg: "Do I have any submissions due this week?",
    aiMsg: "yep. DSA assignment due Thursday, quiz Friday at 9am. want me to block some panic study time or are you feeling brave?",
  },
];

export function Integrations() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black"
          >
            One chat. Every app.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Swiggy orders, Slack messages, Manipal assignments. All from WhatsApp. No app switching.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col"
            >
              {/* Gradient header */}
              <div
                className="relative px-8 pt-8 pb-6"
                style={{
                  background: `linear-gradient(135deg, ${group.gradientFrom}, ${group.gradientTo})`,
                }}
              >
                {/* Accent glow blob */}
                <div
                  className="absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-30 blur-2xl pointer-events-none"
                  style={{ background: group.dotColor }}
                />
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-3xl">{group.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{group.title}</h3>
                </div>

                {/* App pills */}
                <div className="flex flex-wrap gap-2 mt-5 relative z-10">
                  {group.apps.map((app) => (
                    <span
                      key={app.name}
                      className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-white/70 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                    >
                      <span>{app.emoji}</span>
                      {app.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini WhatsApp preview */}
              <div className="flex flex-col flex-1 px-5 py-5 bg-[#111b21] gap-3">
                {/* User bubble */}
                <div className="flex justify-end">
                  <div className="bg-[#005c4b] text-white text-xs rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[80%] leading-relaxed">
                    {group.userMsg}
                  </div>
                </div>

                {/* AI bubble */}
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-white/10 shrink-0">
                    <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="bg-[#202c33] text-white text-xs rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[80%] leading-relaxed">
                    {group.aiMsg}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
