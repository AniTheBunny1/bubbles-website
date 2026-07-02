"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "ai";
  text?: string;
  image?: string;
}

interface Chapter {
  label: string;
  messages: Message[];
}

const CHAPTERS: Chapter[] = [
  {
    label: "Errands",
    messages: [
      { role: "user", text: "2 thums up bottles to minerva heights please. cash on delivery" },
      { role: "ai", text: "on it. order placed, eight minutes out." },
      { role: "user", text: "it came bubbles", image: "/thums-up-delivery.webp" },
      { role: "ai", text: "told you." },
    ],
  },
  {
    label: "Meetings",
    messages: [
      { role: "user", text: "meeting with gaurav in 10 mins. what do i know about him?" },
      { role: "ai", text: "runs a D2C skincare brand. wants a distribution collab. keeps calls short, skips small talk." },
      { role: "ai", text: "your rev-share notes are ready when you are." },
    ],
  },
  {
    label: "Money",
    messages: [
      { role: "user", text: "what am i paying for every month?" },
      { role: "ai", text: "23 subscriptions. 7 of them untouched since april." },
      { role: "ai", text: "cancelled the dead ones. that's ₹2,145 a month back." },
    ],
  },
  {
    label: "Shopping",
    messages: [
      { role: "user", text: "order the boat airdopes from amazon" },
      { role: "ai", text: "₹1,299, prime, arrives tomorrow. UPI request sent, approve it and it ships." },
    ],
  },
  {
    label: "Life",
    messages: [
      { role: "user", text: "remind me to call mom sunday morning" },
      { role: "ai", text: "sunday, 10am. i'll nudge you." },
    ],
  },
];

/*
  The scroll timeline is a flat list of beats. Each beat pins which chapter
  is on screen, how many messages are visible, and whether Bubbles is
  "typing" the next one. Scrubbing back and forth replays it exactly.
*/
interface Beat {
  chapter: number;
  count: number;
  typing: boolean;
}

const BEATS: Beat[] = [];
CHAPTERS.forEach((chapter, ci) => {
  chapter.messages.forEach((msg, mi) => {
    if (msg.role === "ai") BEATS.push({ chapter: ci, count: mi, typing: true });
    BEATS.push({ chapter: ci, count: mi + 1, typing: false });
  });
  // linger on the finished exchange before the next chapter
  BEATS.push({ chapter: ci, count: chapter.messages.length, typing: false });
  BEATS.push({ chapter: ci, count: chapter.messages.length, typing: false });
});

const INTRO = 0.06; // slice of scroll spent raising the phone

const MessageBubble = ({ role, text, image }: Message) => {
  const isAI = role === "ai";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={`flex w-full ${isAI ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[80%] overflow-hidden rounded-2xl text-[15px] leading-snug md:text-base ${
          isAI
            ? "rounded-tl-sm border border-white/5 bg-[#202c33] text-gray-200"
            : "rounded-tr-sm bg-[#005c4b] text-white"
        }`}
      >
        {image && (
          <img src={image} alt="Delivered" className="max-h-32 w-full object-cover" />
        )}
        {text && (
          <p className={`whitespace-pre-line px-3.5 py-2 ${image ? "border-t border-white/10" : ""}`}>
            {text}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, transition: { duration: 0.08 } }}
    className="flex w-full justify-start"
  >
    <div className="rounded-2xl rounded-tl-sm border border-white/5 bg-[#202c33] px-4 py-2.5">
      <div className="flex h-3 items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1 w-1 rounded-full bg-gray-400"
            animate={{ y: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

export function PhoneStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState<Beat>(BEATS[0]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = Math.min(Math.max((v - INTRO) / (1 - INTRO), 0), 0.9999);
    const next = BEATS[Math.floor(t * BEATS.length)];
    setBeat((prev) =>
      prev.chapter === next.chapter && prev.count === next.count && prev.typing === next.typing
        ? prev
        : next,
    );
  });

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [beat]);

  const chapter = CHAPTERS[beat.chapter];
  const visible = chapter.messages.slice(0, beat.count);

  return (
    <section ref={sectionRef} className="relative z-10 h-[560vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

        {/* chapter rail, desktop */}
        <div className="absolute left-[6vw] top-1/2 hidden -translate-y-1/2 flex-col gap-5 lg:flex">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.label} className="flex items-baseline gap-3">
              <span
                className={`text-xs tabular-nums transition-colors duration-300 ${
                  i === beat.chapter ? "text-black/40" : "text-black/15"
                }`}
              >
                0{i + 1}
              </span>
              <span
                className={`font-semibold tracking-tight transition-all duration-300 ${
                  i === beat.chapter
                    ? "text-4xl text-[#1d1d1f]"
                    : "text-2xl text-black/15"
                }`}
              >
                {ch.label}
              </span>
            </div>
          ))}
        </div>

        {/* chapter label, mobile */}
        <div className="absolute top-[6vh] left-0 right-0 flex justify-center lg:hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={chapter.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-2xl font-semibold tracking-tight text-[#1d1d1f]"
            >
              {chapter.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* iridescent aura behind the glass */}
          <div
            className="pointer-events-none absolute inset-[-18%] rounded-full opacity-60"
            style={{
              background:
                "conic-gradient(from 30deg, rgba(150,175,255,0.20), rgba(255,155,205,0.14), rgba(150,235,205,0.12), rgba(150,175,255,0.20))",
              filter: "blur(50px)",
              animation: "slow-spin 40s linear infinite",
            }}
          />

          {/* phone frame + screen (Subject.webp is 700 x 1417) */}
          <div
            className="relative"
            style={{ height: "min(74vh, 720px)", aspectRatio: "700 / 1417" }}
          >
            <img
              src="/Subject.webp"
              alt=""
              className="pointer-events-none relative z-20 block h-full w-full"
            />

            {/* screen cutout: L 4.71% / R 4.86% / T 1.69%, radius ~83px */}
            <div
              className="absolute z-10 flex flex-col overflow-hidden"
              style={{
                top: "1.6%",
                left: "4.5%",
                right: "4.65%",
                bottom: "1.6%",
                borderRadius: "12% / 5.9%",
                backgroundColor: "#111b21",
              }}
            >
              <div
                className="flex shrink-0 items-center gap-2.5 px-3 pb-2.5"
                style={{ backgroundColor: "#1f2c34", paddingTop: "max(14px, 12%)" }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  <img src="/logo.webp" alt="Bubbles" className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-none text-white">Bubbles</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-green-400"
                    />
                    <span className="text-[11px] text-gray-400">online</span>
                  </div>
                </div>
              </div>

              <div
                ref={chatRef}
                className="scrollbar-hide flex-1 space-y-2.5 overflow-y-auto p-3"
                style={{
                  backgroundColor: "#111b21",
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <AnimatePresence mode="popLayout">
                  {visible.map((msg, i) => (
                    <MessageBubble
                      key={`${beat.chapter}-${i}`}
                      role={msg.role}
                      text={msg.text}
                      image={msg.image}
                    />
                  ))}
                  {beat.typing && <TypingIndicator key={`typing-${beat.chapter}-${beat.count}`} />}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
