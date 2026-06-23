"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const memories = [
  { user: "I have a flight tomorrow.",         action: "aisle seat. bag policy checked.",              left: "4%",  top: "12%", size: "text-xl md:text-3xl",  opacity: 0.82, rotate: "-2deg" },
  { user: "Need to call Gaurav.",              action: "last spoke 3 weeks ago. hates small talk.",    left: "60%", top: "18%", size: "text-lg md:text-2xl",  opacity: 0.65, rotate: "2deg"  },
  { user: "Running low on groceries.",         action: "cart filled. delivery in eight minutes.",      left: "16%", top: "30%", size: "text-2xl md:text-4xl", opacity: 0.88, rotate: "1deg"  },
  { user: "Mom's birthday this week.",         action: "gift ordered. reminder set.",                  left: "56%", top: "36%", size: "text-base md:text-xl", opacity: 0.60, rotate: "-3deg" },
  { user: "Can't miss the dentist.",           action: "tuesday 11am. blocked.",                       left: "6%",  top: "48%", size: "text-xl md:text-3xl",  opacity: 0.72, rotate: "3deg"  },
  { user: "These subscriptions add up.",       action: "₹2,145 in dead subs. killed seven.",          left: "50%", top: "53%", size: "text-lg md:text-2xl",  opacity: 0.68, rotate: "-1deg" },
  { user: "That proposal from Hemant.",        action: "saved. flagged for thursday.",                 left: "22%", top: "61%", size: "text-base md:text-xl", opacity: 0.55, rotate: "2deg"  },
  { user: "Flight lands at 6am.",              action: "cab booked. alarm set for 5.",                 left: "66%", top: "67%", size: "text-xl md:text-2xl",  opacity: 0.74, rotate: "-2deg" },
  { user: "She prefers oat milk.",             action: "noted. won't forget.",                        left: "8%",  top: "74%", size: "text-base md:text-xl", opacity: 0.50, rotate: "1deg"  },
  { user: "Workspace keeps logging me out.",   action: "billing fixed. won't happen again.",          left: "40%", top: "78%", size: "text-lg md:text-2xl",  opacity: 0.62, rotate: "-3deg" },
  { user: "Remind me on Sunday.",              action: "10am. i'll be there.",                        left: "70%", top: "83%", size: "text-base md:text-xl", opacity: 0.56, rotate: "2deg"  },
  { user: "Too many unread newsletters.",      action: "archived. inbox at zero.",                    left: "12%", top: "87%", size: "text-lg md:text-2xl",  opacity: 0.65, rotate: "-1deg" },
  { user: "Need context before the call.",     action: "notes loaded. last spoke two weeks ago.",     left: "54%", top: "91%", size: "text-base md:text-xl", opacity: 0.52, rotate: "3deg"  },
  { user: "Running late on the invoice.",      action: "sent. cc'd the right people.",                left: "28%", top: "94%", size: "text-lg md:text-2xl",  opacity: 0.60, rotate: "-2deg" },
];

export function MemoryLandscape() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleOpacity = useTransform(scrollYProgress, [0.03, 0.15, 0.55], [0, 1, 0]);
  const titleY       = useTransform(scrollYProgress, [0.03, 0.15], [40, 0]);

  return (
    <section ref={ref} className="relative z-10 min-h-[200vh] overflow-hidden px-5 py-32">
      {/* smooth bridge into ActionTimeline below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-52"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(7,8,15,0.35))" }}
      />

      <motion.p
        style={{ opacity: titleOpacity, y: titleY }}
        className="relative z-20 mx-auto max-w-2xl text-center text-5xl font-semibold tracking-tight text-black md:text-7xl"
      >
        It remembers so you<br />don't have to.
      </motion.p>

      <div className="absolute inset-0 z-10 mx-auto max-w-7xl">
        {memories.map((memory, index) => (
          <MemoryFragment key={memory.user} memory={memory} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function MemoryFragment({
  memory,
  index,
  progress,
}: {
  memory: (typeof memories)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start   = 0.08 + index * 0.046;
  const opacity = useTransform(progress, [start, start + 0.10, start + 0.28], [0, memory.opacity, 0]);
  const y       = useTransform(progress, [start, start + 0.28], [24, -18]);

  return (
    <motion.div
      style={{ opacity, y, left: memory.left, top: memory.top, rotate: memory.rotate }}
      animate={{ scale: [1, 1.028, 1] }}
      transition={{
        scale: {
          duration: 3.2 + (index % 5) * 0.55,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.28,
        },
      }}
      className={`absolute max-w-xs text-black/85 ${memory.size}`}
    >
      <p className="text-shadow-soft font-medium leading-tight">{memory.user}</p>
      <p className="mt-1.5 text-[0.62em] font-normal leading-snug text-black/38">{memory.action}</p>
    </motion.div>
  );
}
