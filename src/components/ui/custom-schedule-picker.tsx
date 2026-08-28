"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, Globe, ArrowRight, User, Mail, Phone, GraduationCap, AlertCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = [
  { time: "09:30 AM", period: "Morning" },
  { time: "11:00 AM", period: "Morning" },
  { time: "02:00 PM", period: "Afternoon" },
  { time: "03:30 PM", period: "Afternoon" },
  { time: "05:00 PM", period: "Afternoon" },
  { time: "06:30 PM", period: "Evening" },
];

export function CustomSchedulePicker() {
  // Generate next 14 available days (excluding Sundays)
  const availableDates = useMemo(() => {
    const dates = [];
    const now = new Date();
    let current = new Date(now);
    // Start from tomorrow
    current.setDate(current.getDate() + 1);

    while (dates.length < 12) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0) { // Exclude Sunday
        dates.push({
          fullDate: new Date(current),
          dateString: current.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          dayName: current.toLocaleDateString("en-US", { weekday: "short" }),
          dayNumber: current.getDate(),
          monthName: current.toLocaleDateString("en-US", { month: "short" }),
        });
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<typeof availableDates[0]>(availableDates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>("02:00 PM");
  const [step, setStep] = useState<"slot" | "details" | "confirmed">("slot");

  // Form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMessage("Please provide your name and email.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          degree,
          date: selectedDate.dateString,
          timeSlot: selectedSlot,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep("confirmed");
      } else {
        setErrorMessage(data.error || "Failed to schedule. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white text-zinc-950 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-5 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          {/* Blue Calendar Icon Background */}
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-zinc-950 leading-tight">
              Select Date &amp; Time
            </h3>
            <p className="text-xs text-zinc-600 font-medium">
              30-Min 1-on-1 Clarity Session with Purity Gaiti
            </p>
          </div>
        </div>

        {/* Timezone pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>EAT (GMT+3)</span>
        </div>
      </div>

      {/* View Switcher */}
      <AnimatePresence mode="wait">
        {step === "slot" && (
          <motion.div
            key="slot-picker"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 pt-6"
          >
            {/* Horizontal Date Selector Carousel */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 mb-3">
                1. Choose a Date:
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5">
                {availableDates.map((item, idx) => {
                  const isSelected = selectedDate.dateString === item.dateString;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDate(item)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.35)] scale-105"
                          : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? "text-blue-100" : "text-zinc-500"}`}>
                        {item.dayName}
                      </span>
                      <span className="text-lg sm:text-xl font-black leading-tight my-0.5">
                        {item.dayNumber}
                      </span>
                      <span className={`text-[10px] font-semibold ${isSelected ? "text-blue-100" : "text-zinc-500"}`}>
                        {item.monthName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-700 mb-3">
                2. Available Time Slots for {selectedDate.dateString}:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TIME_SLOTS.map((slot, idx) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.35)] ring-2 ring-blue-400/50 scale-[1.02]"
                          : "bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-zinc-500"}`} />
                        {slot.time}
                      </span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-600"}`}>
                        {slot.period}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Action Button (Blue) */}
            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
              <div className="text-xs text-zinc-600 font-medium">
                Selected: <strong className="text-blue-600 font-extrabold">{selectedDate.dateString} at {selectedSlot} EAT</strong>
              </div>

              <Button
                type="button"
                onClick={() => setStep("details")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3 rounded-xl shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.6)] hover:scale-105 transition-all text-xs sm:text-sm flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === "details" && (
          <motion.div
            key="details-form"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            className="pt-6 space-y-5"
          >
            {/* Selected summary pill */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs">
              <div className="flex items-center gap-2 text-blue-950 font-bold">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{selectedDate.dateString} &middot; {selectedSlot} (EAT)</span>
              </div>
              <button
                type="button"
                onClick={() => setStep("slot")}
                className="text-xs text-blue-600 hover:text-blue-800 font-extrabold underline"
              >
                Change Time
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jackson Mwangi"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Email Address (for Google Meet Invitation) *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jackson@gmail.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    WhatsApp Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000000"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Degree / Background (Optional)
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="e.g. BCom Finance, IT, Engineering"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep("slot")}
                  className="text-xs font-bold text-zinc-600 hover:text-zinc-950 flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Slots</span>
                </button>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-3.5 rounded-xl shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_10px_30px_rgba(37,99,235,0.6)] hover:scale-105 transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Confirm 1-on-1 Clarity Call</span>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {step === "confirmed" && (
          <motion.div
            key="confirmed-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="pt-8 pb-4 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-lg border-2 border-blue-300">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Booking Confirmed! 🎉
              </span>
              <h3 className="text-2xl font-black text-zinc-950">
                We're Ready for You, {name.split(" ")[0]}!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                Your private 30-minute diagnostic session with founder Purity Gaiti has been scheduled.
              </p>
            </div>

            {/* Details Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 max-w-md mx-auto text-left space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-bold uppercase">Date &amp; Time:</span>
                <span className="font-extrabold text-blue-600">{selectedDate.dateString} at {selectedSlot} (EAT)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-bold uppercase">Meeting Format:</span>
                <span className="font-extrabold text-zinc-950">Google Meet / Zoom</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-bold uppercase">Invitee Email:</span>
                <span className="font-extrabold text-zinc-950">{email}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
              <a
                href={`https://wa.me/254796469972?text=Hello%20Purity%2C%20I%20just%20booked%20a%20clarity%20call%20for%20${encodeURIComponent(selectedDate.dateString)}%20at%20${encodeURIComponent(selectedSlot)}.%20My%20name%20is%20${encodeURIComponent(name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3 rounded-xl shadow-md text-xs transition-all hover:scale-105"
              >
                <div className="relative w-4 h-4">
                  <Image src="/images/whatsapp.png" alt="WhatsApp" fill className="object-contain" />
                </div>
                <span>Send Quick Note on WhatsApp</span>
              </a>

              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto border-zinc-300 text-zinc-800 hover:bg-zinc-100 rounded-xl text-xs font-bold"
              >
                <a href="/">Return Home</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
