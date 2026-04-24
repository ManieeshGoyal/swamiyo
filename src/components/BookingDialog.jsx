import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TIER_META = {
  premium: {
    label: "Premium Seat",
    price: 500,
    note: "Limited premium seating — closer to the stage.",
  },
  general: {
    label: "General Entry",
    price: 200,
    note: "General auditorium seating.",
  },
};

export default function BookingDialog({ open, onOpenChange, tier }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", seats: 1 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ name: "", phone: "", email: "", seats: 1 });
    }
  }, [open]);

  if (!tier) return null;
  const meta = TIER_META[tier];
  const total = meta.price * Number(form.seats || 1);

  const handleChange = (field) => (e) => {
    const value = field === "seats" ? Math.max(1, Math.min(10, Number(e.target.value) || 1)) : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      toast.error("Please enter your full name");
      return;
    }
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setSubmitting(true);
    try {
      const { data } = await axios.post(`${API}/bookings`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        tier,
        seats: Number(form.seats) || 1,
      });

      // Meta Pixel: InitiateCheckout
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          value: data.amount,
          currency: "INR",
          content_name: `Anand Chakra - ${meta.label}`,
          num_items: data.seats,
        });
      }

      if (data.payment_url && /^https?:\/\//i.test(data.payment_url)) {
        toast.success("Booking received. Redirecting to payment…");
        setTimeout(() => {
          window.location.href = data.payment_url;
        }, 700);
      } else {
        toast.success("Booking saved", {
          description: "Redirecting you to confirmation…",
          duration: 2500,
        });
        setTimeout(() => {
          onOpenChange?.(false);
          window.location.href = "/thankyou";
        }, 900);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="booking-dialog"
        className="bg-[#08090d] border border-[#F0C149]/35 text-[#F5ECD0] sm:max-w-md"
      >
        <DialogHeader>
          <p className="eyebrow mb-1">Reserve your seat</p>
          <DialogTitle className="font-serif text-3xl font-bold text-[#F5ECD0]">
            {meta.label} — ₹{meta.price}
          </DialogTitle>
          <DialogDescription className="text-[#B5AE97]">
            {meta.note} 31 May 2026 · CC Mehta Auditorium, Vadodara.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label htmlFor="b-name" className="text-[#A8A28E] text-xs tracking-widest uppercase">
              Full Name
            </Label>
            <Input
              id="b-name"
              data-testid="booking-name-input"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Your full name"
              className="mt-1.5 bg-[#12151D] border-white/10 text-[#F8EBC1] focus-visible:ring-[#C8A35E] placeholder:text-[#57504a]"
              required
            />
          </div>

          <div>
            <Label htmlFor="b-phone" className="text-[#A8A28E] text-xs tracking-widest uppercase">
              Phone (WhatsApp)
            </Label>
            <Input
              id="b-phone"
              data-testid="booking-phone-input"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="+91 98XXXXXXXX"
              inputMode="tel"
              className="mt-1.5 bg-[#12151D] border-white/10 text-[#F8EBC1] focus-visible:ring-[#C8A35E] placeholder:text-[#57504a]"
              required
            />
          </div>

          <div>
            <Label htmlFor="b-email" className="text-[#A8A28E] text-xs tracking-widest uppercase">
              Email (optional)
            </Label>
            <Input
              id="b-email"
              data-testid="booking-email-input"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="name@example.com"
              className="mt-1.5 bg-[#12151D] border-white/10 text-[#F8EBC1] focus-visible:ring-[#C8A35E] placeholder:text-[#57504a]"
            />
          </div>

          <div>
            <Label htmlFor="b-seats" className="text-[#A8A28E] text-xs tracking-widest uppercase">
              Number of Seats
            </Label>
            <Input
              id="b-seats"
              data-testid="booking-seats-input"
              type="number"
              min={1}
              max={10}
              value={form.seats}
              onChange={handleChange("seats")}
              className="mt-1.5 bg-[#12151D] border-white/10 text-[#F8EBC1] focus-visible:ring-[#C8A35E]"
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-[#A8A28E] text-sm tracking-widest uppercase">
              Total
            </span>
            <span
              className="font-serif text-3xl font-black text-[#F0C149]"
              data-testid="booking-total"
            >
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>

          <DialogFooter className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              data-testid="booking-submit-btn"
              className="btn-gold w-full disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing…
                </>
              ) : (
                <>Proceed to Payment →</>
              )}
            </button>
          </DialogFooter>
          <p className="text-[11px] text-[#757063] text-center tracking-wide">
            By booking you agree to event guidelines. We will contact you on WhatsApp for confirmation.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
