import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Youtube,
  Eye,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const SWAMI_PORTRAIT =
  "https://customer-assets.emergentagent.com/job_inner-awakening-vdo/artifacts/4dsfoxue_Gemini_Generated_Image_98ke4s98ke4s98ke.png";

function useInView(ref, options = { threshold: 0.35 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);
  return inView;
}

function Counter({ target, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="stat-counter">
      {Math.round(val)}
      {suffix}
    </span>
  );
}

const TRUST_BULLETS = [
  "1M+ Spiritual Family guided through direct practice",
  "Bhairav & Shiv-Shakti sadhana mentor",
  "No rituals — only inner reality & experience",
  "Thousands of seekers shifted from knowing to knowing",
];

export default function MeetGuide({ onBook }) {
  return (
    <section
      data-testid="meet-guide-section"
      className="relative py-20 md:py-28 px-6 bg-[#030305] section-connect overflow-hidden"
    >
      <div className="mandala-spin" aria-hidden />
      <div className="smoky" aria-hidden />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Your guide</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-[#F5ECD0] font-black leading-[0.95]">
            Meet <span className="text-gold-gradient italic">Swami Yo</span>
          </h2>
          <div className="om-divider mt-7">
            <span
              className="font-serif"
              style={{
                fontSize: "1.4rem",
                textShadow: "0 0 22px rgba(240,193,73,0.9)",
              }}
            >
              ॐ
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait — large premium frame */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              {/* Outer gold frame */}
              <div
                className="absolute -inset-2 pointer-events-none opacity-80"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(240,193,73,0.45), rgba(240,193,73,0) 45%, rgba(230,83,42,0.3) 100%)",
                  filter: "blur(14px)",
                }}
                aria-hidden
              />
              <div className="relative h-full glass-gold-strong overflow-hidden">
                <img
                  src={SWAMI_PORTRAIT}
                  alt="Swami Yo"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.1) saturate(1.08)" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(3,3,5,0.9), transparent 60%), radial-gradient(circle at 50% 35%, rgba(240,193,73,0.12), transparent 55%)",
                  }}
                  aria-hidden
                />
                {/* Corner gold cuts */}
                {[
                  "top-3 left-3 border-t border-l",
                  "top-3 right-3 border-t border-r",
                  "bottom-3 left-3 border-b border-l",
                  "bottom-3 right-3 border-b border-r",
                ].map((cls, i) => (
                  <span
                    key={i}
                    className={`absolute ${cls} w-6 h-6 border-[#F0C149]/70`}
                    aria-hidden
                  />
                ))}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="eyebrow mb-1">Swami Yo</p>
                  <p className="text-[11px] text-[#D4CBAF] tracking-[0.18em] uppercase font-semibold">
                    Practical · Direct · Experiential
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy + bullets + counters */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">About</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5ECD0] mb-6 leading-[0.95] font-black">
              The voice guiding
              <br />
              <span className="text-[#F0C149]">thousands inward.</span>
            </h2>
            <p className="text-[#D4CBAF] text-base sm:text-lg leading-relaxed font-medium mb-7">
              A contemporary voice in Indian spirituality, known for making
              sadhana direct, practical and accessible. Swami Yo has guided
              thousands online through experiential teachings — away from
              rituals, into inner reality.
            </p>

            {/* <ul className="space-y-3.5 mb-9">
              {TRUST_BULLETS.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  data-testid={`guide-bullet-${i}`}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span className="text-[#F5ECD0] leading-relaxed">{b}</span>
                </li>
              ))}
            </ul> */}

            {/* Animated counters */}
            <div className="grid grid-cols-2 gap-6 md:gap-8 border-t border-[#F0C149]/20 pt-7 mb-9">
              <div className="flex items-center gap-3">
                <Youtube className="w-6 h-6 text-[#F0C149] mt-1 shrink-0" />
                <div>
                  <div className="font-serif text-4xl sm:text-5xl text-gold-gradient font-black leading-none">
                    <Counter target={1} />
                    M+
                  </div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[#B5AE97] mt-2 font-semibold">
                    Spiritual Family
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-[#F0C149] mt-1 shrink-0" />
                <div>
                  <div className="font-serif text-4xl sm:text-5xl text-gold-gradient font-black leading-none">
                    <Counter target={100} />
                    M+
                  </div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-[#B5AE97] mt-2 font-semibold">
                    Views · Inner Reality
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onBook?.("premium")}
              data-testid="guide-book-btn"
              className="btn-gold"
            >
              Meet Swami Yo in Person
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
