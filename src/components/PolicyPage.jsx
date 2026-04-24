import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const SWAMI_LOGO =
  "https://customer-assets.emergentagent.com/job_9ab53833-4649-4f8a-b885-2ebb429f52fb/artifacts/k7ho9fsh_%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%AE%E0%A5%80%20%E0%A4%AF%E0%A5%8B%20%283%29.png";

const WA_LINK =
  "https://wa.me/919664003370?text=" +
  encodeURIComponent(
    "Namaste, I have a question about the Anand Chakra event in Vadodara (31 May 2026)."
  );

const POLICIES = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "This privacy policy explains how Elite Enterprise collects and uses personal information for the Anand Chakra event.",
    sections: [
      {
        h: "Information We Collect",
        items: ["Name", "Email", "Phone Number"],
      },
      {
        h: "How We Use Your Information",
        items: [
          "Confirm bookings and event registrations",
          "Send event updates, reminders and WhatsApp confirmations",
          "Provide customer support before and during the event",
        ],
      },
      {
        h: "Data Protection",
        body: "We do NOT sell or misuse your data. Users can request data updates or deletion at any time by contacting us on the details below.",
      },
    ],
  },
  "terms-conditions": {
    title: "Terms & Conditions",
    intro: "Organisation: Elite Enterprise",
    sections: [
      {
        h: "1. Nature of Services",
        body: "Services provided are spiritual and experiential in nature and are meant for personal growth, inner awakening and well-being.",
      },
      {
        h: "2. User Information",
        body: "Accurate information must be provided during booking. Incorrect details may result in booking cancellation without refund.",
      },
      {
        h: "3. Payments",
        body: "All payments follow our Refund Policy. Please review the refund policy before making payment.",
      },
      {
        h: "4. Intellectual Property",
        body: "All content — including teachings, video recordings, photographs and event materials — belongs to Swami Yo, Elite Enterprise and their partners.",
      },
      {
        h: "5. Purpose",
        body: "The Anand Chakra session is conducted for spiritual and educational purposes only.",
      },
      {
        h: "6. Technical Issues",
        body: "We are not responsible for user-side technical issues (internet, payment gateway failures on the user end, device errors) that may affect booking or service delivery.",
      },
      {
        h: "7. Governing Law",
        body: "These terms are governed by the laws of Valsad, Gujarat, India.",
      },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    intro: "Elite Enterprise · Anand Chakra Event",
    sections: [
      {
        h: "General Policy",
        body: "Payments for spiritual services are generally non-refundable unless stated otherwise.",
      },
      {
        h: "Missed Sessions",
        body: "If you are unable to attend, missed sessions may be reviewed for alternate arrangements where applicable. Please contact us before the event date.",
      },
      {
        h: "Duplicate Transactions",
        body: "Duplicate transactions within 48 hours will be reviewed and the excess amount will be processed for refund accordingly.",
      },
    ],
  },
};

export default function PolicyPage({ slug }) {
  const p = POLICIES[slug];
  if (!p) {
    return (
      <div className="min-h-screen bg-[#030305] text-[#F5ECD0] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Page not found</h1>
          <Link to="/" className="btn-gold inline-flex">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-[#F5ECD0]">
      {/* Top bar */}
      <header className="border-b border-[#d4a73d]/15 bg-[#08090d]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            data-testid="back-to-home"
            className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[#B5AE97] hover:text-[#F0C149] transition font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <img src={SWAMI_LOGO} alt="Swami Yo" className="h-9 w-auto" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-14 md:py-20">
        <p className="eyebrow mb-4">Legal</p>
        <h1
          data-testid={`policy-title-${slug}`}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#F5ECD0] leading-[1.02] mb-5"
        >
          {p.title}
        </h1>
        <p className="text-[#B5AE97] text-base sm:text-lg mb-12 leading-relaxed">
          {p.intro}
        </p>
        <div className="gold-divider !mx-0 mb-12" />

        <div className="space-y-10">
          {p.sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F0C149] mb-4">
                {s.h}
              </h2>
              {s.body && (
                <p className="text-[#D4CBAF] leading-relaxed">{s.body}</p>
              )}
              {s.items && (
                <ul className="space-y-2">
                  {s.items.map((it, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-[#D4CBAF]"
                    >
                      <span className="text-[#F0C149] mt-1.5 w-1 h-1 rounded-full bg-[#F0C149] shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Contact block */}
        <div className="mt-16 pt-8 border-t border-[#d4a73d]/15">
          <p className="eyebrow mb-4">Contact</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href="mailto:swamiyomantra@gmail.com"
              className="inline-flex items-center gap-2 text-[#F5ECD0] hover:text-[#F0C149] transition"
            >
              <Mail className="w-4 h-4 text-[#F0C149]" />
              swamiyomantra@gmail.com
            </a>
            <a
              href="tel:+919664003370"
              className="inline-flex items-center gap-2 text-[#F5ECD0] hover:text-[#F0C149] transition"
            >
              <Phone className="w-4 h-4 text-[#F0C149]" />
              +91 9664 003 370
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] hover:opacity-80 transition"
            >
              <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Footer cross-links */}
        <nav className="mt-12 pt-6 border-t border-[#d4a73d]/10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] tracking-[0.22em] uppercase font-semibold">
          {Object.keys(POLICIES)
            .filter((s) => s !== slug)
            .map((s) => (
              <Link
                key={s}
                to={`/${s}`}
                className="text-[#B5AE97] hover:text-[#F0C149] transition"
              >
                {POLICIES[s].title} →
              </Link>
            ))}
        </nav>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-[#d4a73d]/15 bg-[#030305] px-6 py-8">
        <div className="max-w-4xl mx-auto text-center text-[11px] tracking-[0.22em] uppercase text-[#57504a] font-semibold">
          © 2026 Elite Enterprise · Elitek Digitals
        </div>
      </footer>
    </div>
  );
}
