import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Toaster } from "./ui/sonner";
import WhatsAppIcon from "./WhatsAppIcon";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Flame,
  Brain,
  Sparkles,
  Eye,
  CheckCircle2,
  XCircle,
  Youtube,
  ArrowRight,
  Phone,
  Play,
  Volume2,
  Shield,
  Star,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SWAMI_LOGO =
  "https://customer-assets.emergentagent.com/job_9ab53833-4649-4f8a-b885-2ebb429f52fb/artifacts/k7ho9fsh_%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%AE%E0%A5%80%20%E0%A4%AF%E0%A5%8B%20%283%29.png";
const SWAMI_HERO =
  "https://customer-assets.emergentagent.com/job_inner-awakening-vdo/artifacts/e22d3u43_DSC05684%202.jpg";
const SWAMI_ABOUT =
  "https://customer-assets.emergentagent.com/job_inner-awakening-vdo/artifacts/4dsfoxue_Gemini_Generated_Image_98ke4s98ke4s98ke.png";

// Auditorium images (distraction-free environment) — real CC Mehta Auditorium, Vadodara
const AUDITORIUM_1 =
  "https://customer-assets.emergentagent.com/job_inner-awakening-vdo/artifacts/6vheed83_33c029e0-4ec3-4f67-8da8-c6e57176970f.jpeg";
const AUDITORIUM_2 =
  "https://customer-assets.emergentagent.com/job_inner-awakening-vdo/artifacts/3zusqtbp_e3f4067e-26d8-474d-8bf7-55c9f26b21a7.jpeg";

const SOCIAL_PROOF_BG =
  "https://images.pexels.com/photos/7163160/pexels-photo-7163160.jpeg";

const FAQS = [
  {
    q: "Is this for beginners?",
    a: "Yes. Anand Chakra is designed for both beginners and experienced seekers. No prior sadhana background is required — Swami Yo will guide you step by step.",
  },
  {
    q: "What should I bring?",
    a: "Bring yourself with an open mind. Wear loose, comfortable clothing. A small water bottle is allowed. Avoid heavy meals just before the session.",
  },
  {
    q: "What is the entry timing?",
    a: "Please arrive by 6:30 PM for smooth check-in. The guided sadhana starts sharp at 7:00 PM and runs till 9:00 PM. Late entry may be restricted after the session begins.",
  },
  {
    q: "Are there age restrictions?",
    a: "Open to all adults (18+). Youth aged 14–17 may attend only when accompanied by a booked guardian.",
  },
  {
    q: "Will the session be recorded?",
    a: "This is a live experiential session. Out of respect for participants, phone use inside the hall is not permitted during the practice.",
  },
];

export default function LandingPage() {
  const [stats, setStats] = useState({
    total_seats: 500,
    seats_booked: 327,
    seats_remaining: 173,
  });
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [whatsapp, setWhatsapp] = useState("919664003370");
  const [paymentUrls, setPaymentUrls] = useState({
    premium:
      "https://wa.me/919664003370?text=" +
      encodeURIComponent(
        "Namaste! I want to book the Premium ₹500 seat for Anand Chakra (31 May 2026, Vadodara). Please share payment details.",
      ),
    general:
      "https://wa.me/919664003370?text=" +
      encodeURIComponent(
        "Namaste! I want to book the General ₹200 seat for Anand Chakra (31 May 2026, Vadodara). Please share payment details.",
      ),
  });

  const ticketsRef = useRef(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const [s, c] = await Promise.all([
          axios.get(`${API}/bookings/stats`),
          axios.get(`${API}/config`),
        ]);
        if (s?.data) setStats(s.data);
        if (c?.data) {
          if (c.data.whatsapp_number) setWhatsapp(c.data.whatsapp_number);
          setPaymentUrls((p) => ({
            premium: c.data.payment_url_premium || p.premium,
            general: c.data.payment_url_general || p.general,
          }));
        }
      } catch (_) {
        /* fallback to defaults */
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const target = new Date("2026-05-31T19:00:00+05:30").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);
      setCountdown({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const openBooking = (tier = "premium") => {
    const url = paymentUrls[tier];
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: `Anand Chakra ${tier}`,
        value: tier === "premium" ? 500 : 200,
        currency: "INR",
      });
    }
    if (url) {
      window.location.href = url;
    }
  };

  const waLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Namaste, I have a question about the Anand Chakra event in Vadodara (31 May 2026).",
  )}`;

  const pct = stats?.total_seats
    ? Math.min(
        Math.round(
          (Number(stats.seats_booked) / Number(stats.total_seats)) * 100,
        ),
        100,
      )
    : 0;

  return (
    <div className="bg-[#030305] text-[#F5ECD0] has-sticky-cta relative overflow-x-hidden">
      <Toaster position="top-center" richColors />

      {/* =========================================================
          SECTION 1 — HERO (intense, high-contrast, CTA dominant)
      ========================================================= */}
      <section
        data-testid="hero-section"
        className="relative min-h-[100svh] flex items-center isolate overflow-hidden"
      >
        {/* Background — CSS-only cinematic ember / flame canvas (no photo, no video) */}
        <div className="absolute inset-0 -z-10">
          <div className="hero-canvas" />
          {/* Rising ember particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => {
              const left = (i * 3.6 + (i % 7) * 2.3) % 100;
              const dur = 8 + ((i * 1.3) % 9);
              const delay = (i * 0.7) % 12;
              const size = 2 + ((i * 1.7) % 3);
              return (
                <span
                  key={i}
                  className="ember-particle"
                  style={{
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDuration: `${dur}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
          </div>
          {/* Subtle mandala ornament */}
          <svg
            className="hero-mandala"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <radialGradient id="mg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(240,193,73,0.6)" />
                <stop offset="60%" stopColor="rgba(212,167,61,0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="198"
              fill="none"
              stroke="url(#mg)"
              strokeWidth="0.6"
            />
            <circle
              cx="200"
              cy="200"
              r="160"
              fill="none"
              stroke="rgba(212,167,61,0.4)"
              strokeWidth="0.4"
            />
            <circle
              cx="200"
              cy="200"
              r="120"
              fill="none"
              stroke="rgba(212,167,61,0.3)"
              strokeWidth="0.4"
            />
            <circle
              cx="200"
              cy="200"
              r="80"
              fill="none"
              stroke="rgba(212,167,61,0.3)"
              strokeWidth="0.4"
            />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="200"
                x2="200"
                y2="10"
                stroke="rgba(212,167,61,0.25)"
                strokeWidth="0.25"
                transform={`rotate(${(i * 360) / 24} 200 200)`}
              />
            ))}
          </svg>
          {/* Read-gradient — dark on left for text, transparent on right for embers */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/98 via-[#030305]/80 to-transparent md:from-[#030305]/95 md:via-[#030305]/40 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/95 via-transparent to-[#030305]/20" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 py-10 md:py-16 w-full">
          {/* Brand row */}
          <div className="flex items-center justify-between mb-10 md:mb-16 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <img
                src={SWAMI_LOGO}
                alt="Swami Yo"
                className="h-10 md:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-whatsapp-link"
              className="hidden sm:inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B5AE97] hover:text-[#F0C149] transition"
            >
              <WhatsAppIcon className="w-4 h-4" /> Chat Support
            </a>
          </div>

          <div
            className="max-w-3xl animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <p className="eyebrow mb-5 flex items-center gap-3">
              <Flame className="w-3.5 h-3.5 text-[#e6532a]" />
              For the first time in Vadodara
            </p>

            <h1
              data-testid="hero-heading"
              className="font-serif text-[2rem] leading-[1.02] sm:text-[3.25rem] lg:text-[4.5rem] font-black text-[#F5ECD0] mb-6"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
            >
              Experience{" "}
              <span
                className="italic font-black"
                style={{
                  background:
                    "linear-gradient(180deg, #f0c149 0%, #c89a2e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Shiv-Shakti
              </span>
              <span className="not-italic text-[#F5ECD0] font-black"> & </span>
              <span
                className="italic font-black"
                style={{
                  background:
                    "linear-gradient(180deg, #f0c149 0%, #c89a2e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Bhairav Sadhana
              </span>
              <br />
              <span className="text-[#F5ECD0]">like never before.</span>
            </h1>

            <p className="text-lg sm:text-2xl text-[#D4CBAF] font-medium max-w-2xl leading-snug mb-8">
              A guided inner awakening session with{" "}
              <span className="text-[#F0C149] font-bold">Swami Yo</span>.
              <br className="hidden sm:block" />
              Not a discourse. An <em className="text-[#F0C149]">experience</em>
              .
            </p>

            {/* Event meta — tighter, bolder */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-[#F0C149]" />
                <span className="text-[#F5ECD0] font-semibold">
                  31 May 2026
                </span>
              </div>
              <span className="hidden sm:inline text-[#B5AE97]">·</span>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#F0C149]" />
                <span className="text-[#F5ECD0] font-semibold">
                  7:00 – 9:00 PM
                </span>
              </div>
              <span className="hidden sm:inline text-[#B5AE97]">·</span>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#F0C149]" />
                <span className="text-[#F5ECD0] font-semibold">
                  CC Mehta Auditorium, Vadodara
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-stretch">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openBooking("premium")}
                  data-testid="hero-book-btn"
                  className="btn-gold pulse-gold flex-1 sm:flex-none"
                >
                  <span className="flex flex-col items-start leading-tight text-left">
                    <span className="text-[10px] tracking-[0.2em] opacity-80">
                      Premium
                    </span>
                    <span>Book · ₹500</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openBooking("general")}
                  data-testid="hero-book-general-btn"
                  className="btn-ghost-gold flex-1 sm:flex-none"
                >
                  <span className="flex flex-col items-start leading-tight text-left">
                    <span className="text-[10px] tracking-[0.2em] opacity-80">
                      General
                    </span>
                    <span>Book · ₹200</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 gap-y-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    ticketsRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  data-testid="compare-tiers-btn"
                  className="text-[11px] tracking-[0.22em] uppercase text-[#F0C149] hover:text-[#f5d97c] underline underline-offset-4 decoration-[#F0C149]/40 hover:decoration-[#F0C149] transition font-semibold inline-flex items-center gap-1.5"
                >
                  What's the difference? <ArrowRight className="w-3 h-3" />
                </button>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#D4CBAF] font-semibold">
                  <Users className="w-3.5 h-3.5 inline mr-1.5 text-[#F0C149]" />
                  {stats.seats_remaining} of 500 seats left
                </p>
              </div>
            </div>

            {/* Countdown — compact row */}
            <div className="mt-10 flex items-center gap-5 sm:gap-8">
              {[
                { l: "Days", v: countdown.d },
                { l: "Hours", v: countdown.h },
                { l: "Min", v: countdown.m },
                { l: "Sec", v: countdown.s },
              ].map((c) => (
                <div key={c.l} className="text-left">
                  <div className="font-serif text-3xl sm:text-4xl font-black text-[#F5ECD0] tabular-nums leading-none">
                    {String(c.v).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#B5AE97] mt-1.5 font-semibold">
                    {c.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-[#7a7263] hidden md:block">
          ↓ Scroll
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — TRUST STRIP (connected, tight)
      ========================================================= */}
      <section
        data-testid="trust-strip"
        className="relative border-y border-[#d4a73d]/15 bg-gradient-to-b from-[#08090d] to-[#030305]"
      >
        <div className="max-w-6xl mx-auto px-6 py-7">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-6 text-center md:text-left">
            {[
              {
                icon: <Youtube className="w-6 h-6" />,
                stat: "1M+",
                label: "YouTube Subscribers",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                stat: "100M+",
                label: "Views on Spiritual Content",
              },
              {
                icon: <Users className="w-6 h-6" />,
                stat: "Thousands",
                label: "Guided Online",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-4 flex-1 justify-center md:justify-start"
              >
                <div className="text-[#F0C149] shrink-0">{t.icon}</div>
                <div>
                  <div className="font-serif text-2xl md:text-3xl font-bold text-[#F5ECD0] leading-none">
                    {t.stat}
                  </div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#B5AE97] mt-1.5 font-semibold">
                    {t.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — HOOK (intense quote)
      ========================================================= */}
      <section
        data-testid="hook-section"
        className="relative py-16 md:py-24 px-6 section-connect bg-[#030305]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-[1.9rem] sm:text-4xl lg:text-5xl leading-[1.15] font-bold text-[#F5ECD0] italic">
            "Most people <span className="not-italic text-[#B5AE97]">pray</span>
            ,
            <br />
            but never{" "}
            <span
              className="text-[#F0C149] not-italic"
              style={{ textShadow: "0 0 40px rgba(240,193,73,0.35)" }}
            >
              experience
            </span>
            ."
          </p>
          <div className="gold-divider my-8" />
          <p className="text-[#D4CBAF] text-base sm:text-lg max-w-xl mx-auto font-medium">
            This is not a discourse. This is a guided sadhana — a direct inner
            practice.
          </p>
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — VIDEO (placeholder, easy embed-ready)
      ========================================================= */}
      <section
        data-testid="video-section"
        className="px-6 pb-16 md:pb-20 bg-[#030305]"
      >
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow text-center mb-4">Watch · 60 seconds</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-center text-[#F5ECD0] mb-10 font-bold">
            A glimpse of <span className="text-[#F0C149]">Swami Yo</span>
          </h2>
          <div
            data-testid="video-placeholder"
            className="relative aspect-video bg-gradient-to-br from-[#0f1118] to-[#030305] border border-[#d4a73d]/30 flex items-center justify-center overflow-hidden group cursor-pointer premium-shadow"
          >
            <img
              src={SWAMI_ABOUT}
              alt="Swami Yo"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 transition duration-500"
              style={{ filter: "contrast(1.15)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#F0C149] bg-[#F0C149]/15 backdrop-blur-md flex items-center justify-center mx-auto mb-5 group-hover:bg-[#F0C149]/25 group-hover:scale-110 transition duration-300 shadow-[0_0_40px_rgba(240,193,73,0.3)]">
                <Play
                  className="w-7 h-7 text-[#F0C149] ml-1"
                  fill="currentColor"
                />
              </div>
              <p className="text-sm tracking-[0.25em] uppercase text-[#D4CBAF] font-semibold">
                Video coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 — EXPERIENCE (what they will feel)
      ========================================================= */}
      <section
        data-testid="experience-section"
        className="py-16 md:py-24 px-6 bg-gradient-to-b from-[#030305] via-[#08090d] to-[#030305] section-connect"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">What you will feel</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold">
              An <span className="text-[#F0C149]">experience</span>, not a
              lecture.
            </h2>
            <div className="gold-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {[
              {
                icon: <Flame className="w-7 h-7" />,
                title: "Guided Shiv-Shakti & Bhairav Sadhana inner practices",
                d: "Direct, structured sadhana led personally by Swami Yo — step by step.",
              },
              {
                icon: <Brain className="w-7 h-7" />,
                title: "Deep meditative state",
                d: "Move past the surface mind into a stillness you rarely access.",
              },
              {
                icon: <Sparkles className="w-7 h-7" />,
                title: "Practical understanding of sadhana",
                d: "Clarity on how and why sadhana actually works — not theory.",
              },
              {
                icon: <Eye className="w-7 h-7" />,
                title: "Inner awareness experience",
                d: "A felt shift in awareness you can carry back into daily life.",
              },
            ].map((x, i) => (
              <div
                key={i}
                className="bg-[#0a0c11] border border-[#d4a73d]/15 p-7 md:p-9 lift-hover hover:border-[#d4a73d]/40 hover:bg-[#0e1118]"
              >
                <div className="text-[#F0C149] mb-4">{x.icon}</div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5ECD0] mb-2.5 font-bold leading-tight">
                  {x.title}
                </h3>
                <p className="text-[#B5AE97] leading-relaxed text-[15px]">
                  {x.d}
                </p>
              </div>
            ))}
          </div>

          {/* Repeat CTA */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => openBooking("premium")}
              data-testid="experience-book-btn"
              className="btn-gold"
            >
              Reserve Your Seat <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6 — IMMERSIVE ENVIRONMENT (NEW)
      ========================================================= */}
      <section
        data-testid="immersive-section"
        className="py-16 md:py-24 px-6 bg-[#030305] section-connect"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="eyebrow mb-4">The environment</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold leading-tight mb-6">
                A powerful,
                <br />
                <span className="text-[#F0C149]">distraction-free</span>
                <br />
                environment.
              </h2>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Volume2 className="w-5 h-5" />,
                    t: "Conducted in a quiet, focused auditorium setting",
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    t: "Designed for deep inner immersion without disturbance",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    t: "Structured seating to maintain attention and energy flow",
                  },
                  {
                    icon: <Sparkles className="w-5 h-5" />,
                    t: "Every participant experiences the session with clarity and presence",
                  },
                ].map((x, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#F0C149] mt-0.5 shrink-0">
                      {x.icon}
                    </span>
                    <span className="text-[#D4CBAF] leading-relaxed text-[15px]">
                      {x.t}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => openBooking("premium")}
                data-testid="immersive-book-btn"
                className="btn-ghost-gold mt-9"
              >
                Reserve your seat <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Auditorium images — 2 only, connected */}
            <div className="grid grid-cols-5 grid-rows-6 gap-3 aspect-[4/5] md:aspect-auto md:h-[560px]">
              <div className="col-span-5 row-span-4 relative overflow-hidden border border-[#d4a73d]/20 premium-shadow">
                <img
                  src={AUDITORIUM_1}
                  alt="Auditorium"
                  className="w-full h-full object-cover"
                  style={{
                    filter: "brightness(0.8) contrast(1.1) saturate(0.85)",
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-[11px] tracking-[0.2em] uppercase text-[#F0C149] font-semibold">
                  Designed for a focused, distraction-free spiritual experience
                </figcaption>
              </div>
              <div className="col-span-5 row-span-2 relative overflow-hidden border border-[#d4a73d]/20">
                <img
                  src={AUDITORIUM_2}
                  alt="Seating"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.75) contrast(1.1)" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 7 — WHO FOR + WHAT NOT
      ========================================================= */}
      <section className="py-16 md:py-20 px-6 bg-[#08090d] section-connect">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div data-testid="who-for-section">
            <p className="eyebrow mb-4">Who is this for</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5ECD0] mb-7 font-bold leading-tight">
              If you are seeking depth —
              <br />
              <span className="text-[#F0C149]">this is for you.</span>
            </h2>
            <ul className="space-y-3.5">
              {[
                "People seeking a deeper spiritual experience",
                "Those curious about Shiv-Shakti & Bhairav Sadhana",
                "Beginners stepping into practice for the first time",
                "Experienced seekers wanting a direct transmission",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span className="text-[#D4CBAF] leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-testid="what-not-section"
            className="md:border-l md:pl-14 border-[#d4a73d]/20"
          >
            <p className="eyebrow mb-4" style={{ color: "#e06b75" }}>
              What this is not
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5ECD0] mb-7 font-bold leading-tight">
              Clear about
              <br />
              <span className="text-[#e06b75]">what it isn't.</span>
            </h2>
            <ul className="space-y-3.5">
              {[
                "Not only religious lecture",
                "Not a bhajan or entertainment session",
                "Not a discourse-only event",
                "Not passive listening — you will practice",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#e06b75] mt-0.5 shrink-0" />
                  <span className="text-[#D4CBAF] leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8 — ABOUT SWAMI YO
      ========================================================= */}
      <section
        data-testid="about-swami-section"
        className="py-16 md:py-24 px-6 bg-[#030305] relative section-connect"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
          <div className="md:col-span-2">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#d4a73d]/30 premium-shadow">
              <img
                src={SWAMI_ABOUT}
                alt="Swami Yo"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.15) saturate(1.1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                <p className="eyebrow mb-1">Swami Yo</p>
                <p className="text-[11px] text-[#B5AE97] tracking-[0.15em] uppercase">
                  Practical · Direct · Experiential
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow mb-3">About</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5ECD0] mb-6 leading-[0.95] font-black">
              The voice guiding
              <br />
              <span className="text-[#F0C149]">thousands inward.</span>
            </h2>
            <p className="text-[#D4CBAF] text-base sm:text-lg leading-relaxed mb-6 font-medium">
              A contemporary voice in Indian spirituality, known for making
              sadhana direct, practical and accessible. Swami Yo has guided
              thousands online through experiential teachings — away from
              rituals, into inner reality.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-[#d4a73d]/20 pt-6 mb-8">
              <div>
                <div className="font-serif text-4xl text-[#F0C149] font-black">
                  1M+
                </div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-[#B5AE97] mt-1.5 font-semibold">
                  YouTube Subscribers
                </div>
              </div>
              <div>
                <div className="font-serif text-4xl text-[#F0C149] font-black">
                  100M+
                </div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-[#B5AE97] mt-1.5 font-semibold">
                  Views · No rituals, only reality
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openBooking("premium")}
              data-testid="about-book-btn"
              className="btn-gold"
            >
              Meet Swami Yo in Person <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 9 — SOCIAL PROOF
      ========================================================= */}
      <section
        data-testid="social-proof-section"
        className="py-16 md:py-24 px-6 bg-[#08090d] section-connect"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Voices from seekers</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold">
              What people share after his sessions
            </h2>
            <div className="gold-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                q: "I came skeptical. I left speechless. This wasn't a talk — something actually shifted inside.",
                n: "Ritesh P.",
                loc: "Ahmedabad",
              },
              {
                q: "Swamiji doesn't preach. He guides. First time I felt what 'meditation' actually means.",
                n: "Anjali S.",
                loc: "Mumbai",
              },
              {
                q: "Direct. Honest. Powerful. The 2 hours passed like 15 minutes.",
                n: "Kunal M.",
                loc: "Surat",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="bg-[#0a0c11] border border-[#d4a73d]/15 p-7 relative lift-hover hover:border-[#d4a73d]/35"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 text-[#F0C149]"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <blockquote className="text-[#D4CBAF] leading-relaxed text-[15px] font-medium">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-[#d4a73d]/10">
                  <div className="text-[#F5ECD0] text-sm font-semibold">
                    {t.n}
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#B5AE97] mt-1">
                    {t.loc}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 relative aspect-[16/5] overflow-hidden border border-[#d4a73d]/15 premium-shadow">
            <img
              src={SOCIAL_PROOF_BG}
              alt="Past gathering"
              className="w-full h-full object-cover opacity-65"
              style={{ filter: "contrast(1.1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-transparent to-[#030305]/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#F5ECD0] text-center px-6 font-bold">
                "A room full of people, one silence."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 10 — TICKETS (Premium highlighted)
      ========================================================= */}
      <section
        ref={ticketsRef}
        id="tickets"
        data-testid="tickets-section"
        className="py-16 md:py-24 px-6 bg-gradient-to-b from-[#030305] via-[#08090d] to-[#030305] scroll-mt-10 section-connect"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Reserve your seat</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-[#F5ECD0] font-bold leading-tight">
              Two tiers.
              <br />
              <span className="text-[#F0C149]">Limited seats.</span>
            </h2>
            <div className="gold-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-6 max-w-5xl mx-auto items-stretch">
            {/* General — smaller, on the left */}
            <div
              data-testid="general-ticket-card"
              className="md:col-span-2 relative overflow-hidden p-7 md:p-8 border border-white/10 bg-[#0a0c11] lift-hover hover:border-[#d4a73d]/25"
            >
              <p className="eyebrow mb-4" style={{ color: "#B5AE97" }}>
                General Entry
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-5xl md:text-6xl font-black text-[#F5ECD0]">
                  ₹200
                </span>
              </div>
              <p className="text-[#B5AE97] text-sm mb-6 leading-relaxed">
                Standard auditorium access to the full guided session.
              </p>
              <ul className="space-y-3 mb-7 text-sm">
                <li className="flex items-start gap-2.5 text-[#D4CBAF]">
                  <CheckCircle2 className="w-4 h-4 text-[#B5AE97] mt-0.5 shrink-0" />
                  Access to full session
                </li>
                <li className="flex items-start gap-2.5 text-[#D4CBAF]">
                  <CheckCircle2 className="w-4 h-4 text-[#B5AE97] mt-0.5 shrink-0" />
                  Standard seating arrangement
                </li>
                <li className="flex items-start gap-2.5 text-[#D4CBAF]">
                  <CheckCircle2 className="w-4 h-4 text-[#B5AE97] mt-0.5 shrink-0" />
                  Entry from 6:30 PM
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openBooking("general")}
                data-testid="general-book-btn"
                className="btn-ghost-gold w-full justify-center"
              >
                Reserve General →
              </button>
            </div>

            {/* Premium — bigger, highlighted, ribbon, scale up */}
            <div
              data-testid="premium-ticket-card"
              className="md:col-span-3 relative overflow-hidden p-8 md:p-10 border-2 border-[#F0C149] bg-gradient-to-b from-[#1f1708] via-[#0f0c06] to-[#0a0c11] premium-shadow md:-my-4"
            >
              <div className="ribbon">Recommended</div>

              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-4 h-4 text-[#F0C149]" />
                <p className="eyebrow">Premium Experience</p>
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="font-serif text-6xl md:text-7xl font-black text-[#F0C149]"
                  style={{
                    textShadow: "0 0 40px rgba(240,193,73,0.25)",
                  }}
                >
                  ₹500
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#B5AE97] font-semibold">
                  · Limited
                </span>
              </div>
              <p className="text-[#D4CBAF] text-sm md:text-base mb-7 leading-relaxed font-medium">
                Closer seating · better visibility · a deeper, more immersive
                experience.
              </p>
              <ul className="space-y-3.5 mb-8 text-sm md:text-base">
                <li className="flex items-start gap-2.5 text-[#F5ECD0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-[#F5ECD0] font-semibold">
                      Closer seating
                    </strong>{" "}
                    for better connection & focus
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-[#F5ECD0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-[#F5ECD0] font-semibold">
                      Better visibility
                    </strong>{" "}
                    of Swami Ji during guidance
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-[#F5ECD0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-[#F5ECD0] font-semibold">
                      Limited seats
                    </strong>{" "}
                    for a more immersive experience
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-[#F5ECD0]">
                  <CheckCircle2 className="w-5 h-5 text-[#F0C149] mt-0.5 shrink-0" />
                  <span>Priority check-in · Full 2-hour guided sadhana</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => openBooking("premium")}
                data-testid="premium-book-btn"
                className="btn-gold w-full pulse-gold"
              >
                Reserve Premium →
              </button>
              <p className="text-[11px] text-center text-[#B5AE97] mt-4 tracking-wide">
                Most chosen by past attendees
              </p>
            </div>
          </div>

          {/* Comparison strip */}
          <div className="mt-10 max-w-3xl mx-auto text-center text-xs tracking-[0.2em] uppercase text-[#B5AE97] font-semibold">
            Secure checkout · External payment gateway · WhatsApp confirmation
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 11 — URGENCY
      ========================================================= */}
      <section
        data-testid="urgency-section"
        className="py-14 md:py-16 px-6 bg-[#030305] border-t border-[#d4a73d]/15"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#e06b75]/50 text-[#e6a8ae] text-[11px] tracking-[0.25em] uppercase mb-5 font-semibold">
            <Flame className="w-3.5 h-3.5" /> Filling fast
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] mb-6 font-bold leading-tight">
            Only{" "}
            <span className="text-[#F0C149]" data-testid="seats-remaining">
              {stats.seats_remaining}
            </span>{" "}
            seats left of {stats.total_seats}
          </h2>

          <div className="w-full max-w-xl mx-auto mb-7">
            <div className="h-2.5 bg-[#0f1118] border border-[#d4a73d]/25 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8A232E] via-[#F0C149] to-[#f5d97c] transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] tracking-[0.2em] uppercase text-[#B5AE97] font-semibold">
              <span>{pct}% booked</span>
              <span>
                {stats.seats_booked} / {stats.total_seats}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openBooking("premium")}
            data-testid="urgency-book-btn"
            className="btn-gold"
          >
            Reserve Before It Closes →
          </button>
        </div>
      </section>

      {/* =========================================================
          SECTION 12 — FAQ
      ========================================================= */}
      <section
        data-testid="faq-section"
        className="py-16 md:py-24 px-6 bg-[#08090d] section-connect"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-4">Questions</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5ECD0] font-bold">
              Before you book
            </h2>
            <div className="gold-divider mt-6" />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                data-testid={`faq-item-${i}`}
                className="border-b border-[#d4a73d]/15"
              >
                <AccordionTrigger className="text-left font-serif text-lg sm:text-xl text-[#F5ECD0] hover:no-underline py-5 font-bold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#B5AE97] leading-relaxed text-base pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* =========================================================
          SECTION 13 — FINAL CTA
      ========================================================= */}
      <section
        data-testid="final-cta-section"
        className="py-20 md:py-28 px-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="hero-canvas opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/92 via-[#030305]/80 to-[#030305]" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="gold-divider mb-8" />
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-[#F5ECD0] mb-8 leading-[0.95] font-black">
            This is not just an event.
            <br />
            <span
              className="italic text-[#F0C149]"
              style={{
                textShadow: "0 0 40px rgba(240,193,73,0.3)",
              }}
            >
              It's an experience.
            </span>
          </h2>
          <button
            type="button"
            onClick={() => openBooking("premium")}
            data-testid="final-cta-btn"
            className="btn-gold pulse-gold"
          >
            Book Now Before It Closes →
          </button>
          <p className="mt-6 text-xs tracking-[0.2em] uppercase text-[#D4CBAF] font-semibold">
            31 May 2026 · CC Mehta Auditorium, Vadodara
          </p>
        </div>
      </section>

      {/* =========================================================
          SECTION 14 — WHATSAPP SUPPORT
      ========================================================= */}
      <section
        data-testid="whatsapp-section"
        className="py-12 px-6 bg-[#08090d] border-t border-[#d4a73d]/15"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-3">Still have questions?</p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5ECD0] mb-6 font-bold">
            Our team is a message away.
          </h3>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-cta"
            className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold uppercase tracking-[0.15em] py-4 px-8 text-sm hover:bg-[#1ebe5a] transition shadow-[0_10px_30px_rgba(37,211,102,0.25)]"
          >
            <WhatsAppIcon className="w-5 h-5" /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* =========================================================
          SECTION 15 — FOOTER
      ========================================================= */}
      <footer
        data-testid="footer"
        className="bg-[#030305] border-t border-[#d4a73d]/15 px-6 py-12 text-sm"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={SWAMI_LOGO} alt="Swami Yo" className="h-11 w-auto mb-4" />
            <p className="text-[#7a7263] leading-relaxed text-xs">
              Anand Chakra — Inner Awakening Through Shiv-Shakti & Bhairav
              Sadhana. A guided experiential session with Swami Yo.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Organised by</p>
            <p className="text-[#F5ECD0] mb-1 font-semibold">
              Elite Enterprise
            </p>
            <p className="text-[#B5AE97] text-xs leading-relaxed mb-1">
              Saptrangi Co-op HSG, near Dutt Nagar,
              <br />
              Civil Road, Valsad, Gujarat – 396001
            </p>
            <p className="text-[#7a7263] text-xs mt-2">
              GSTIN: 24AALFE2677G1ZC
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4">Contact</p>
            <a
              href="tel:+919664003370"
              data-testid="footer-phone"
              className="flex items-center gap-2 text-[#F5ECD0] hover:text-[#F0C149] transition mb-2 font-semibold"
            >
              <Phone className="w-4 h-4" /> +91 9664 003 370
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#B5AE97] hover:text-[#F0C149] transition text-xs"
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Support
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#d4a73d]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#57504a] font-semibold">
          <p>© 2026 Elite Enterprise · Elitek Digitals</p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              to="/privacy-policy"
              data-testid="footer-privacy-link"
              className="hover:text-[#F0C149] transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              data-testid="footer-terms-link"
              className="hover:text-[#F0C149] transition"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refund-policy"
              data-testid="footer-refund-link"
              className="hover:text-[#F0C149] transition"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        data-testid="floating-whatsapp-btn"
        className="fixed bottom-24 md:bottom-8 right-5 bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] z-40 hover:scale-110 transition-transform"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>

      {/* Sticky mobile CTA — split two tiers */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex shadow-[0_-10px_40px_rgba(240,193,73,0.35)]"
        data-testid="sticky-mobile-cta-bar"
      >
        <button
          type="button"
          onClick={() => openBooking("general")}
          data-testid="sticky-mobile-general-cta"
          className="flex-1 py-3.5 text-center uppercase tracking-[0.15em] text-xs font-bold bg-[#0f1118] text-[#F0C149] border-t border-r border-[#F0C149]/50"
        >
          <span className="block text-[9px] opacity-80 tracking-[0.2em]">
            General
          </span>
          <span className="block text-sm font-black">₹200 Entry</span>
        </button>
        <button
          type="button"
          onClick={() => openBooking("premium")}
          data-testid="sticky-mobile-cta"
          className="flex-[1.3] py-3.5 text-center uppercase tracking-[0.15em] text-xs font-bold border-t border-[#F0C149]"
          style={{
            background: "linear-gradient(180deg, #f0c149 0%, #c89a2e 100%)",
            color: "#0a0a0a",
          }}
        >
          <span className="block text-[9px] opacity-80 tracking-[0.2em]">
            Premium · Recommended
          </span>
          <span className="block text-sm font-black">₹500 Book Now</span>
        </button>
      </div>
    </div>
  );
}
