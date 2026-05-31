import { useEffect, useState } from "react";

export default function GuruPurnimaModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    // Optional: Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm">
      <div className="flex h-full items-center justify-center p-2 md:p-4">
        <div className="relative h-full w-full overflow-hidden border border-yellow-500/20 bg-[#0B0B0B] md:h-auto md:max-h-[90vh] md:max-w-6xl md:rounded-3xl shadow-[0_0_50px_rgba(255,215,0,0.08)]">
          {/* Close Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              document.body.style.overflow = "";
            }}
            className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-yellow-500/20 bg-black/60 text-xl text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            ✕
          </button>

          <div className="grid h-full md:grid-cols-2">
            {/* Left Image */}
            <div className="relative h-[280px] md:h-[90vh]">
              <img
                src="https://customer-assets.emergentagent.com/job_inner-awakening-vdo/artifacts/4dsfoxue_Gemini_Generated_Image_98ke4s98ke4s98ke.png"
                alt="Swamiji"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30" />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <p className="text-sm uppercase tracking-[4px] text-yellow-500">
                  Guru Purnima 2026
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  Shri Vidya
                  <span className="block text-yellow-400">
                    Through Guru Sadhana
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Content */}
            <div className="overflow-y-auto p-6 md:max-h-[90vh] md:p-10 lg:p-12">
              {/* Badge */}
              <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-yellow-400">
                Ahmedabad Registrations Coming Soon
              </span>

              <p className="mt-5 text-sm uppercase tracking-[3px] text-yellow-500">
                🕉️ On The Auspicious Occasion Of Guru Purnima
              </p>

              <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                SHRI VIDYA
                <span className="block text-yellow-400">THROUGH</span>
                GURU SADHANA
              </h1>

              <p className="mt-6 text-base leading-7 text-gray-300">
                Join us for a powerful day of spiritual learning, devotion, and
                transformation under the divine guidance of Swamiji.
              </p>

              {/* Event Details */}
              <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-white/[0.03] p-6">
                <h3 className="mb-5 text-lg font-semibold text-yellow-400">
                  Event Details
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3 text-gray-200">
                    <span className="text-yellow-400">📅</span>
                    <div>
                      <strong>Date:</strong>
                      <br />
                      26 July 2026
                    </div>
                  </div>

                  <div className="flex gap-3 text-gray-200">
                    <span className="text-yellow-400">🕘</span>
                    <div>
                      <strong>Time:</strong>
                      <br />
                      9:00 AM – 7:00 PM
                    </div>
                  </div>

                  <div className="flex gap-3 text-gray-200">
                    <span className="text-yellow-400">📍</span>
                    <div>
                      <strong>Location:</strong>
                      <br />
                      Ahmedabad
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mt-8">
                <h3 className="mb-5 text-lg font-semibold text-yellow-400">
                  What's Included
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3 text-gray-300">
                    <span className="text-yellow-400">✨</span>
                    <span>Limited to 50 Participants Only</span>
                  </div>

                  <div className="flex gap-3 text-gray-300">
                    <span className="text-yellow-400">💰</span>
                    <span>Participation Fee: ₹5,000</span>
                  </div>

                  <div className="flex gap-3 text-gray-300">
                    <span className="text-yellow-400">🎁</span>
                    <span>Shri Vidya Puja Kit Included</span>
                  </div>

                  <div className="flex gap-3 text-gray-300">
                    <span className="text-yellow-400">🍽️</span>
                    <span>Breakfast, Lunch & High Tea Included</span>
                  </div>
                </div>
              </div>

              {/* Coming Soon Box */}
              <div className="mt-10 rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-yellow-500/10 p-6 text-center">
                <p className="text-xs uppercase tracking-[4px] text-yellow-500">
                  Ahmedabad Bookings
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  COMING SOON
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  Registration details and booking information will be announced
                  shortly.
                </p>
              </div>

              {/* Bottom spacing */}
              <div className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
