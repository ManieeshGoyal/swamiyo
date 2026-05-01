import React from "react";
import {
  Brain,
  Target,
  Cloud,
  Compass,
  Wind,
  Ghost,
} from "lucide-react";

const BLOCKS = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Constant mental restlessness",
    desc: "The mind rarely pauses. Thoughts pile on thoughts until even rest feels exhausting.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Lack of focus & clarity",
    desc: "You know what matters — but attention scatters the moment you sit down to do it.",
  },
  {
    icon: <Cloud className="w-7 h-7" />,
    title: "Heavy, unexplained energy",
    desc: "A low hum of tiredness and negativity you can't quite name — draining without reason.",
  },
  {
    icon: <Compass className="w-7 h-7" />,
    title: "Feeling stuck or disconnected",
    desc: "Outwardly things move, inwardly nothing does. The center feels missing.",
  },
  {
    icon: <Wind className="w-7 h-7" />,
    title: "Fear, anxiety, overthinking",
    desc: "A constant undercurrent of worry — about the future, about yourself, about everything.",
  },
  {
    icon: <Ghost className="w-7 h-7" />,
    title: "No real spiritual experience",
    desc: "You've read, you've tried, you've listened. But the actual inner shift has never landed.",
  },
];

export default function InternalBlocks() {
  return (
    <section
      data-testid="internal-blocks-section"
      className="relative py-20 md:py-28 px-6 bg-[#030305] section-connect overflow-hidden"
    >
      <div className="mandala-bg" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(138,35,46,0.18) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Honestly — pause here</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold leading-[1.1]">
            Are you{" "}
            <span className="text-gold-gradient italic">internally blocked?</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-[#B5AE97] text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
            Before you book anything — read these. If even one of them
            feels like yours, this evening was made for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {BLOCKS.map((b, i) => (
            <div
              key={i}
              data-testid={`block-card-${i}`}
              className="pain-card relative glass-gold p-7 md:p-8 group"
            >
              <div className="w-14 h-14 flex items-center justify-center border border-[#F0C149]/40 bg-[#F0C149]/5 text-[#F0C149] mb-5 shadow-[inset_0_1px_0_rgba(240,193,73,0.25)] group-hover:bg-[#e6532a]/10 group-hover:border-[#e6532a]/50 group-hover:text-[#f5ad84] transition">
                {b.icon}
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-[#F5ECD0] font-bold leading-tight mb-2.5">
                {b.title}
              </h3>
              <p className="text-[#B5AE97] leading-relaxed text-[14.5px]">
                {b.desc}
              </p>

              {/* Corner ornament */}
              <span
                className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#F0C149]/30 group-hover:border-[#F0C149]/60 transition"
                aria-hidden
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] sm:text-sm tracking-[0.2em] uppercase text-[#F0C149]/80 font-semibold">
          If this feels like you — Anand Chakra is the next step.
        </p>
      </div>
    </section>
  );
}
