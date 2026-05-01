import React from "react";
import {
  DoorOpen,
  Flame,
  Sparkles,
  Mic,
  MessageCircle,
  HandHeart,
  Clock,
} from "lucide-react";

const STEPS = [
  {
    time: "6:30 PM",
    title: "Arrival & Registration",
    desc: "Arrive, settle, receive your seat. The hall begins to fill with quiet anticipation.",
    icon: <DoorOpen className="w-5 h-5" />,
  },
  {
    time: "7:00 PM",
    title: "Energy Preparation",
    desc: "A guided opening — calming the body, gathering the breath, arriving fully into the room.",
    icon: <Flame className="w-5 h-5" />,
  },
  {
    time: "7:25 PM",
    title: "The Awakening",
    desc: "Core Shiv-Shakti & Bhairav sadhana — led directly by Swami Yo. The heart of the evening.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    time: "8:15 PM",
    title: "Seminar & Transmission",
    desc: "Direct, practical insight — how sadhana actually works, and how to carry it home.",
    icon: <Mic className="w-5 h-5" />,
  },
  {
    time: "8:40 PM",
    title: "Q&A With Swami Yo",
    desc: "Your real questions, answered with warmth and clarity. No filter, no performance.",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    time: "9:00 PM",
    title: "Blessings & Closing",
    desc: "A quiet, grounded closing. You walk out lighter than you walked in.",
    icon: <HandHeart className="w-5 h-5" />,
  },
];

export default function Timeline() {
  return (
    <section
      data-testid="timeline-section"
      className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-[#030305] via-[#08090d] to-[#030305] section-connect overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(230,83,42,0.1) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">The evening · 31 May 2026</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold leading-[1.1]">
            Your <span className="text-gold-gradient italic">2 hours</span>,
            mapped.
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-[#B5AE97] text-base sm:text-lg mt-6 max-w-xl mx-auto font-medium">
            A structured, intentional flow — so you know exactly what to
            expect before you arrive.
          </p>
        </div>

        <div className="relative pl-8 sm:pl-12">
          {/* Glowing spine */}
          <span className="timeline-spine left-[11px] sm:left-[19px]" aria-hidden />

          <ol className="space-y-6 sm:space-y-8">
            {STEPS.map((s, i) => (
              <li
                key={i}
                data-testid={`timeline-item-${i}`}
                className="timeline-item relative group"
              >
                {/* Dot */}
                <span
                  className="timeline-dot absolute -left-[calc(2rem-6px)] sm:-left-[calc(3rem-10px)] top-5"
                  aria-hidden
                />

                <div className="glass-gold p-5 sm:p-7 group-hover:border-[#F0C149]/50 transition">
                  <div className="flex items-start sm:items-center gap-3 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.22em] uppercase text-[#F0C149] font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {s.time}
                    </span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-[#F0C149]/40" />
                    <span className="inline-flex items-center gap-2 text-[#F0C149]">
                      {s.icon}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5ECD0] font-bold leading-tight mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[#B5AE97] leading-relaxed text-[14.5px] sm:text-[15px]">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 text-center text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#D4CBAF] font-semibold">
          CC Mehta Auditorium, Vadodara · Indicative timings
        </p>
      </div>
    </section>
  );
}
