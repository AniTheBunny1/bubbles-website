"use client";

import { motion } from "framer-motion";

const GROUPS = [
  {
    title: "Daily life",
    apps: ["Swiggy", "Blinkit", "Amazon", "Google Maps"],
    userMsg: "Order me 2 Thums Up from Blinkit",
    aiMsg: "order placed. two chilled thums ups, arriving in 12 mins. ₹78 cash ready.",
  },
  {
    title: "Work",
    apps: ["Gmail", "Slack", "Notion", "Google Calendar"],
    userMsg: "Summarize my unread Slack messages",
    aiMsg: "three things: Priya needs the deck, Rahul's poking about the API bug, standup in 20. pick your battles.",
  },
  {
    title: "Manipal students",
    apps: ["Lighthouse LMS", "Gmail", "Notion", "Google Calendar"],
    userMsg: "Do I have any submissions due this week?",
    aiMsg: "yep. DSA assignment due Thursday, quiz Friday at 9am. want me to block some panic study time or are you feeling brave?",
  },
];

export function Integrations() {
  return (
    <section className="py-32 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">

        <div className="mb-20">
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
            className="text-lg text-gray-500 max-w-xl"
          >
            Swiggy orders, Slack messages, Manipal assignments. All from WhatsApp. No app switching.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-black/8">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="flex flex-col gap-6 px-0 md:px-10 first:pl-0 last:pr-0 py-4 md:py-0"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{group.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{group.apps.join(" · ")}</p>
              </div>

              {/* Chat preview — keeps its container since it's functional UI */}
              <div className="rounded-2xl overflow-hidden">
                <div className="bg-[#111b21] px-4 py-4 flex flex-col gap-3">
                  <div className="flex justify-end">
                    <div className="bg-[#005c4b] text-white text-xs rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[85%] leading-relaxed">
                      {group.userMsg}
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 shrink-0">
                      <img src="/logo.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="bg-[#202c33] text-white text-xs rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[85%] leading-relaxed">
                      {group.aiMsg}
                    </div>
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
