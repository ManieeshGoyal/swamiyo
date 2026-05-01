import React from "react";
import { Flame, Sparkles, ArrowRight, Eye, Brain } from "lucide-react";

const CARDS = [
  {
    tag: "I · Shiv-Shakti",
    title: "Shiv-Shakti Sadhana",
    tagline: "The union of stillness and energy",
    desc:
      "Experience the primordial balance — the witnessing presence of Shiv and the rising intelligence of Shakti moving together, inside you.",
    bullets: [
      "Settling into the inner witness",
      "Feeling the subtle energy move",
      "Direct union of awareness & aliveness",
    ],
    accent: "from-[#1a0f1f] via-[#120a18] to-[#08090d]",
    icon: <Sparkles className="w-6 h-6" />,
    glyph: "शिव",
  },
  {
    tag: "II · Bhairav",
    title: "Bhairav Sadhana",
    tagline: "The fierce path to inner awakening",
    desc:
      "A concentrated practice that dissolves fear, restlessness and inner noise — leaving an unshakeable stillness that you carry beyond the hall.",
    bullets: [
      "Dissolving inner restlessness",
      "Cutting through mental noise",
      "Rooted, fearless awareness",
    ],
    accent: "from-[#1f0d0a] via-[#18080a] to-[#08090d]",
    icon: <Flame className="w-6 h-6" />,
    glyph: "भैरव",
  },
];

export default function PremiumExperience({ onBook }) {
  return (
    <section
      data-testid="premium-experience-section"
      className="relative py-20 md:py-28 px-6 bg-[#030305] section-connect overflow-hidden"
    >
      <div className="smoky" aria-hidden />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">The experience</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold leading-[1.1]">
            Two practices.{" "}
            <span className="text-gold-gradient italic">One awakening.</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-[#B5AE97] text-base sm:text-lg mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
            Not a discourse. A guided inner journey — woven across two ancient
            currents, moving you from noise into presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {CARDS.map((c, i) => (
            <article
              key={i}
              data-testid={`premium-exp-card-${i}`}
              className={`exp-premium relative overflow-hidden border border-[#F0C149]/25 bg-gradient-to-br ${c.accent} p-8 md:p-10 group`}
            >
              {/* Glyph watermark */}
              <span
                className="absolute -right-4 -bottom-8 font-serif text-[9rem] md:text-[11rem] leading-none text-[#F0C149]/[0.06] select-none pointer-events-none"
                aria-hidden
              >
                {c.glyph}
              </span>
              <div className="mandala-bg" aria-hidden />

              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-11 h-11 flex items-center justify-center border border-[#F0C149]/50 bg-[#F0C149]/10 text-[#F0C149] shadow-[inset_0_1px_0_rgba(240,193,73,0.3)]">
                  {c.icon}
                </div>
                <span className="eyebrow">{c.tag}</span>
              </div>

              <h3 className="relative font-serif text-3xl sm:text-4xl text-[#F5ECD0] font-black leading-tight mb-2">
                {c.title}
              </h3>
              <p className="relative font-serif italic text-[#F0C149] text-lg mb-5">
                {c.tagline}
              </p>
              <p className="relative text-[#D4CBAF] leading-relaxed text-[15px] mb-6">
                {c.desc}
              </p>

              <ul className="relative space-y-2.5 mb-8">
                {c.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-[#F5ECD0] text-[14.5px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0C149] mt-[9px] shrink-0 shadow-[0_0_8px_rgba(240,193,73,0.8)]" />
                    {b}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onBook?.("premium")}
                data-testid={`premium-exp-btn-${i}`}
                className="relative btn-ghost-gold group-hover:bg-[#F0C149]/10 group-hover:border-[#F0C149]"
              >
                Reserve your seat <ArrowRight className="w-4 h-4" />
              </button>

              {/* Corner ornaments */}
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((cls, k) => (
                <span
                  key={k}
                  className={`absolute ${cls} w-5 h-5 border-[#F0C149]/50 pointer-events-none`}
                  aria-hidden
                />
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
