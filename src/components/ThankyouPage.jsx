import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  MessageCircle,
  Home,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { Toaster } from "./ui/sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SWAMI_LOGO =
  "https://customer-assets.emergentagent.com/job_9ab53833-4649-4f8a-b885-2ebb429f52fb/artifacts/k7ho9fsh_%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%AE%E0%A5%80%20%E0%A4%AF%E0%A5%8B%20%283%29.png";

const WA_NUMBER = "919664003370";
const WA_LINK =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent(
    "Namaste, I just booked my seat for Anand Chakra (31 May 2026, Vadodara).",
  );

export default function ThankyouPage() {
  const [paymentUrls, setPaymentUrls] = useState({
    Diamond: "https://payments.cashfree.com/forms/AnandChakra5",
    gold: "https://payments.cashfree.com/forms/AnandChakra2",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        content_name: "Anand Chakra Booking",
        currency: "INR",
      });
    }
    window.scrollTo(0, 0);

    (async () => {
      try {
        const { data } = await axios.get(`${API}/config`);
        if (data) {
          setPaymentUrls((p) => ({
            Diamond: data.payment_url_Diamond || p.Diamond,
            gold: data.payment_url_gold || p.gold,
          }));
        }
      } catch (_) {}
    })();
  }, []);

  const goBook = (tier) => {
    const url = paymentUrls[tier];
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: `Anand Chakra ${tier}`,
        value: tier === "Diamond" ? 500 : 200,
        currency: "INR",
      });
    }
    if (url) window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#030305] text-[#F5ECD0] relative overflow-hidden">
      <Toaster position="top-center" richColors />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="hero-canvas opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/90 via-[#030305]/70 to-[#030305]" />
      </div>

      <header className="border-b border-[#d4a73d]/15 bg-[#08090d]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            data-testid="thankyou-home-link"
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[#B5AE97] hover:text-[#F0C149] transition font-semibold"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
          <img src={SWAMI_LOGO} alt="Swami Yo" className="h-9 w-auto" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <div className="text-center">
          <div
            data-testid="thankyou-success-icon"
            className="w-24 h-24 rounded-full border-2 border-[#F0C149] bg-[#F0C149]/10 backdrop-blur flex items-center justify-center mx-auto mb-8 pulse-Diamond"
          >
            <CheckCircle2
              className="w-12 h-12 text-[#F0C149]"
              strokeWidth={1.8}
            />
          </div>

          <p className="eyebrow mb-4">Booking Confirmed</p>
          <h1
            data-testid="thankyou-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#F5ECD0] leading-[1.02] mb-6"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}
          >
            Thank you.
            <br />
            <span className="italic text-[#F0C149]">
              Your seat is reserved.
            </span>
          </h1>
          <p className="text-[#D4CBAF] text-lg sm:text-xl font-medium max-w-xl mx-auto leading-relaxed mb-2">
            We've received your booking for{" "}
            <span className="text-[#F5ECD0] font-semibold">Anand Chakra</span>.
          </p>
          <p className="text-[#B5AE97] text-base max-w-xl mx-auto leading-relaxed">
            Our team will reach out to you within{" "}
            <span className="text-[#F0C149] font-semibold">24–48 hours</span>{" "}
            with your ticket number, venue details and entry instructions.
          </p>
        </div>

        <div className="Diamond-divider my-12" />

        <section
          data-testid="thankyou-next-steps"
          className="bg-[#0a0c11] border border-[#d4a73d]/20 p-7 sm:p-9 mb-12"
        >
          <p className="eyebrow mb-5">What happens next</p>
          <ul className="space-y-5">
            {[
              {
                icon: <Clock className="w-5 h-5" />,
                t: "Within 24–48 hours",
                d: "Our team will contact you on WhatsApp with your ticket number and confirmation.",
              },
              {
                icon: <MessageCircle className="w-5 h-5" />,
                t: "Pre-event information",
                d: "You'll receive a reminder with full venue directions, entry timing, and what to bring.",
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                t: "On event day — 31 May 2026",
                d: "Arrive at CC Mehta Auditorium by 6:30 PM. Guided sadhana starts sharp at 7:00 PM.",
              },
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#F0C149]/10 border border-[#F0C149]/30 flex items-center justify-center text-[#F0C149]">
                  {s.icon}
                </div>
                <div>
                  <div className="font-serif text-lg text-[#F5ECD0] font-bold mb-1">
                    {s.t}
                  </div>
                  <p className="text-[#B5AE97] text-sm leading-relaxed">
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section data-testid="thankyou-book-another" className="mb-12">
          <div className="text-center mb-7">
            <p className="eyebrow mb-3">Bringing a friend or family?</p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F5ECD0] leading-tight">
              Book another seat.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <button
              type="button"
              onClick={() => goBook("Diamond")}
              data-testid="thankyou-book-Diamond-btn"
              className="relative overflow-hidden group p-6 sm:p-7 text-left border-2 border-[#F0C149] bg-gradient-to-b from-[#1f1708] via-[#0f0c06] to-[#0a0c11] Diamond-shadow lift-hover"
            >
              <div className="absolute top-3 right-3 bg-[#F0C149] text-black text-[9px] tracking-[0.2em] uppercase font-bold px-2 py-0.5">
                Recommended
              </div>
              <p className="eyebrow mb-3">Diamond</p>
              <div className="font-serif text-4xl sm:text-5xl font-black text-[#F0C149] mb-2">
                ₹500
              </div>
              <p className="text-[#D4CBAF] text-sm mb-5 leading-relaxed">
                Closer seating · better visibility · deeper immersion.
              </p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[#F0C149] font-bold">
                Book Diamond{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => goBook("gold")}
              data-testid="thankyou-book-gold-btn"
              className="relative overflow-hidden group p-6 sm:p-7 text-left border border-white/15 bg-[#12151D] lift-hover hover:border-[#d4a73d]/35"
            >
              <p className="eyebrow mb-3" style={{ color: "#B5AE97" }}>
                gold
              </p>
              <div className="font-serif text-4xl sm:text-5xl font-black text-[#F5ECD0] mb-2">
                ₹200
              </div>
              <p className="text-[#B5AE97] text-sm mb-5 leading-relaxed">
                Standard auditorium access · full 2-hour guided sadhana.
              </p>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[#F0C149] font-bold">
                Book gold{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </span>
            </button>
          </div>
        </section>

        <section
          data-testid="thankyou-support"
          className="border-t border-[#d4a73d]/15 pt-10"
        >
          <div className="text-center mb-6">
            <p className="eyebrow mb-3">Questions?</p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5ECD0]">
              Reach out anytime.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="thankyou-whatsapp-cta"
              className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold uppercase tracking-[0.15em] py-3 px-6 text-xs hover:bg-[#1ebe5a] transition"
            >
              <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+919664003370"
              className="inline-flex items-center gap-2 text-[#F5ECD0] hover:text-[#F0C149] transition text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-[#F0C149]" /> +91 9664 003 370
            </a>
            <a
              href="mailto:swamiyomantra@gmail.com"
              className="inline-flex items-center gap-2 text-[#F5ECD0] hover:text-[#F0C149] transition text-sm"
            >
              <Mail className="w-4 h-4 text-[#F0C149]" />{" "}
              swamiyomantra@gmail.com
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d4a73d]/15 bg-[#030305] px-6 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] tracking-[0.22em] uppercase text-[#57504a] font-semibold">
          <p>© 2026 Elite Enterprise · Elitek Digitals</p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link
              to="/privacy-policy"
              className="hover:text-[#F0C149] transition"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="hover:text-[#F0C149] transition"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/refund-policy"
              className="hover:text-[#F0C149] transition"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
