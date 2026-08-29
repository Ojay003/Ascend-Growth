"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ShieldCheck, Video, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/sections/Header";
import { ShapeBackground } from "@/components/ui/shape-background";
import { CustomSchedulePicker } from "@/components/ui/custom-schedule-picker";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const AGENDA_STEPS = [
  {
    step: "01",
    title: "The Bottleneck Diagnostic",
    desc: "We examine where you or your graduate are currently stuck—whether it's the CV black hole, low clarity, or lack of commercial skills.",
  },
  {
    step: "02",
    title: "4-Phase Roadmap Match",
    desc: "We map your natural strengths against the Ascend Methodology (Mindset, Skills, Monetization, and Scale) to see if you qualify for the next cohort.",
  },
  {
    step: "03",
    title: "Zero-Pressure Next Steps",
    desc: "You receive an honest recommendation on whether AGI is the right fit. If not, we still give you actionable steps to take immediately.",
  },
];

export default function BookClarityCallPage() {
  return (
    <div className="min-h-screen bg-[#030509] text-white selection:bg-white/20 selection:text-white flex flex-col justify-between relative overflow-hidden">
      <ShapeBackground />
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col space-y-6 text-center items-center mx-auto lg:mx-0 w-full"
          >
            <div className="flex justify-center w-full">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-black hover:bg-white transition-all group px-4 py-2 rounded-full bg-white/10 border border-white/30 shadow-md"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Overview</span>
              </Link>
            </div>

            {/* Header Content */}
            <div className="flex flex-col items-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.2em] bg-white/20 text-white border border-white/40 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                1-on-1 Discovery Session
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-center">
                Book Your 30-Minute Clarity Call
              </h1>
              <p className="text-base sm:text-lg text-zinc-100 font-medium leading-relaxed text-center max-w-lg">
                No automated pitch. No pressure. A private 1-on-1 strategy session to map out your transition from stuck graduate to independent, earning professional.
              </p>
            </div>

            <div className="w-full flex items-center justify-center gap-4 p-4 sm:p-5 rounded-2xl bg-white text-black border border-white shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-left">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-black shrink-0 shadow-md">
                <Image
                  src="/images/founder.jpg"
                  alt="Purity Gaiti"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-800">Your Host &amp; Mentor</p>
                <h4 className="font-black text-black text-base sm:text-lg">Purity Gaiti</h4>
                <p className="text-xs text-zinc-800 font-semibold">Founder &amp; Mentor Lead, Ascend Growth International</p>
              </div>
            </div>

            {/* What to Expect: 3-Step Agenda Cards */}
            <div className="w-full space-y-4">
              <h3 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white text-center">
                What we will cover in 30 minutes:
              </h3>
              <div className="space-y-3 w-full">
                {AGENDA_STEPS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-xl bg-white text-black border border-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-2xl hover:scale-[1.01] transition-all text-left"
                  >
                    <span className="text-xs font-black text-white bg-black w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-black text-sm text-black mb-1">{item.title}</h4>
                      <p className="text-xs text-zinc-900 leading-relaxed font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-100 font-semibold w-full">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>100% Free &amp; Confidential</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Video className="w-4 h-4 text-white shrink-0" />
                <span>Google Meet / Zoom</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-white shrink-0" />
                <span>Strictly 30 Minutes</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>Zero Hard Selling</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7/12): Native Custom Interactive Scheduler */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full flex flex-col space-y-4"
          >
            <CustomSchedulePicker />
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-white text-black border border-white text-xs gap-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <span className="text-black text-center sm:text-left font-black text-sm">
                Prefer to schedule directly on WhatsApp?
              </span>
              <a
                href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20schedule%20a%20clarity%20call%20directly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-black bg-[#25D366] text-white hover:bg-[#20bd5a] px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all text-xs shrink-0"
              >
                <div className="relative w-4 h-4">
                  <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>Chat on WhatsApp &rarr;</span>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <footer className="w-full border-t border-white/10 bg-[#030509]/90 backdrop-blur-md py-8 px-4 text-center text-xs text-zinc-300 relative z-10 font-medium">
        <p>© 2026 Ascend Growth International. All rights reserved.</p>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
