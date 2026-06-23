"use client";

import { motion } from "framer-motion";

const APPS = [
  { name: "Swiggy",           emoji: "🍕" },
  { name: "Blinkit",          emoji: "⚡" },
  { name: "Amazon",           emoji: "📦" },
  { name: "Gmail",            emoji: "✉️" },
  { name: "Notion",           emoji: "📝" },
  { name: "Slack",            emoji: "💬" },
  { name: "Lighthouse LMS",   emoji: "🎓" },
  { name: "Google Calendar",  emoji: "📅" },
  { name: "Google Maps",      emoji: "🗺️" },
  { name: "Zomato",           emoji: "🍜" },
];

const GROUPS = [
  {
    title: "Daily life",
    items: [
      { app: "Swiggy", desc: "Order food and track your delivery without opening the app." },
      { app: "Blinkit", desc: "Groceries in 10 minutes. Just say what you need." },
      { app: "Amazon", desc: "Search, compare prices, and place orders in one message." },
      { app: "Google Maps", desc: "Get directions, find nearby places, book a cab." },
    ]
  },
  {
    title: "Work",
    items: [
      { app: "Gmail", desc: "Read, draft, and send emails. Clean your inbox on command." },
      { app: "Slack", desc: "Send messages, summarize channels, set reminders for threads." },
      { app: "Notion", desc: "Log tasks, update databases, and create pages instantly." },
      { app: "Google Calendar", desc: "Schedule meetings and reminders. Never double-book." },
    ]
  },
  {
    title: "Manipal students",
    items: [
      { app: "Lighthouse LMS", desc: "Check deadlines, upcoming quizzes, and assignment submissions." },
      { app: "Gmail", desc: "Get faculty emails summarized so you don't miss anything." },
      { app: "Notion", desc: "Auto-log notes and build your study schedule." },
      { app: "Google Calendar", desc: "Sync your timetable and get reminders before class." },
    ]
  }
];

export function Integrations() {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
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
            Swiggy orders, Slack messages, Manipal assignments — handle everything from WhatsApp without switching apps.
          </motion.p>
        </div>

        {/* Scrolling app marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-20 overflow-hidden"
        >
          <div className="flex" style={{ width: "max-content" }}>
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex gap-4"
            >
              {[...APPS, ...APPS].map((app, i) => (
                <div
                  key={i}
                  className="glass px-5 py-3 rounded-2xl flex items-center gap-3 shrink-0"
                >
                  <span className="text-xl">{app.emoji}</span>
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{app.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Feature groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="glass-card rounded-3xl p-8 flex flex-col gap-6"
            >
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{group.title}</h3>
              <ul className="flex flex-col gap-4">
                {group.items.map((item) => (
                  <li key={item.app} className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-800">{item.app}</span>
                    <span className="text-xs text-gray-500 leading-relaxed">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
