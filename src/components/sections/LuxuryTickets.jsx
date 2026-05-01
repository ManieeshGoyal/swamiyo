import React, { forwardRef } from "react";
import { CheckCircle2, Flame, Sparkles, ArrowRight, Star } from "lucide-react";

const LuxuryTickets = forwardRef(function LuxuryTickets({ onBook }, ref) {
  return (
    <section
      ref={ref}
      id="tickets"
      data-testid="tickets-section"
      className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-[#030305] via-[#08090d] to-[#030305] scroll-mt-10 section-connect overflow-hidden"
    >
      <div className="mandala-bg" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(240,193,73,0.1) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Reserve your seat</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-[#F5ECD0] font-black leading-[0.95]">
            Two tiers.{" "}
            <span className="text-gold-gradient italic">Limited seats.</span>
          </h2>
          <div className="gold-divider mt-6" />
          <p className="text-[#B5AE97] text-base sm:text-lg mt-6 max-w-xl mx-auto font-medium">
            Choose the seat that matches the depth you want.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-7 max-w-5xl mx-auto items-stretch">
          {/* GOLD SEAT — ₹200 */}
          <div
            data-testid="gold-ticket-card"
            className="md:col-span-2 relative overflow-hidden p-8 md:p-9 glass-gold group transition hover:border-[#F0C149]/50"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-[#F0C149]" />
              <p className="eyebrow">Gold Seat</p>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-5xl md:text-6xl font-black text-[#F5ECD0]">
                ₹200
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#B5AE97] font-semibold">
                · Entry
              </span>
            </div>
            <p className="text-[#B5AE97] text-sm mb-7 leading-relaxed">
              Standard auditorium access to the full 2-hour guided sadhana.
            </p>

            <ul className="space-y-3 mb-8 text-sm">
              {[
                "Reserve your seat",
                "Standard auditorium seating for all participants",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[#D4CBAF]">
                  <CheckCircle2 className="w-4 h-4 text-[#B5AE97] mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onBook?.("general")}
              data-testid="gold-book-btn"
              className="btn-ghost-gold w-full justify-center"
            >
              Reserve Gold Seat <ArrowRight className="w-4 h-4" />
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
                className={`absolute ${cls} w-5 h-5 border-[#F0C149]/30 pointer-events-none`}
                aria-hidden
              />
            ))}
          </div>

          {/* DIAMOND SEAT — ₹500 — HIGHLIGHTED */}
          <div
            data-testid="diamond-ticket-card"
            className="md:col-span-3 glow-border-gold relative overflow-hidden p-8 md:p-10 glass-gold-strong md:-my-5"
          >
            <div className="ribbon">Recommended</div>

            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#F0C149]" />
              <p className="eyebrow">Diamond Seat · Premium</p>
            </div>

            <div className="flex items-baseline gap-3 mb-1">
              <span
                className="font-serif text-6xl md:text-7xl font-black text-gold-gradient"
                style={{ textShadow: "0 0 40px rgba(240,193,73,0.35)" }}
              >
                ₹500
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#B5AE97] font-semibold">
                · Limited
              </span>
            </div>
            <p className="text-[#F5ECD0] text-sm md:text-base mb-8 mt-2 leading-relaxed font-medium">
              Front & closer seating · better visibility of Swami Ji
            </p>

            <ul className="space-y-3.5 mb-9 text-sm md:text-base">
              {[
                <>
                  <strong className="font-semibold">
                    Closer seating for stronger spiritual connection & focus
                  </strong>{" "}
                </>,
                <>
                  <strong className="font-semibold">
                    Better visibility of Swami Ji during live guidance
                  </strong>{" "}
                </>,
                <>
                  <strong className="font-semibold">
                    Limited Diamond seats
                  </strong>{" "}
                </>,
                <>Full Anand Chakra experience</>,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[#F5ECD0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => onBook?.("premium")}
              data-testid="diamond-book-btn"
              className="btn-gold w-full pulse-gold"
            >
              <Flame className="w-4 h-4" />
              Reserve Diamond Seat
            </button>
            <p className="text-[11px] text-center text-[#D4CBAF] mt-4 tracking-[0.15em] uppercase font-semibold">
              Most chosen by past attendees
            </p>

            {/* Corner ornaments */}
            {[
              "top-3 left-3 border-t border-l",
              "top-3 right-3 border-t border-r",
              "bottom-3 left-3 border-b border-l",
              "bottom-3 right-3 border-b border-r",
            ].map((cls, k) => (
              <span
                key={k}
                className={`absolute ${cls} w-6 h-6 border-[#F0C149]/80 pointer-events-none`}
                aria-hidden
              />
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto text-center text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#B5AE97] font-semibold">
          Booking via WhatsApp · Confirmation & payment details shared instantly
        </div>
      </div>
    </section>
  );
});

export default LuxuryTickets;
