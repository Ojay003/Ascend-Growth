"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ShieldCheck, Video, Clock, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { CalendlyEmbed } from "@/components/ui/calendly-embed";
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
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-brand-gold/20 selection:text-zinc-950 flex flex-col justify-between">
      {/* Top Floating Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-[#FAFAFA]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-950 transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Overview</span>
          </Link>

          <Link href="/" className="flex-shrink-0 flex items-center h-8 sm:h-9">
            <Image
              src="/images/logo.png"
              alt="Ascend Growth International Logo"
              width={400}
              height={120}
              className="object-contain w-auto h-7 sm:h-8"
              priority
            />
          </Link>

          <a
            href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20clarity%20call"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/10 text-emerald-700 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Help</span>
          </a>
        </div>
      </header>

      {/* Main Content: Editorial Split */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column (5/12): Priming & Trust Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col space-y-8"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] bg-brand-gold/10 text-brand-gold-hover border border-brand-gold/20 mb-4">
                <Sparkles className="w-3 h-3 text-brand-gold" />
                1-on-1 Discovery Session
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.15] mb-4">
                Book Your 30-Minute Clarity Call
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
                No automated pitch. No pressure. A private 1-on-1 strategy session to map out your transition from stuck graduate to independent, earning professional.
              </p>
            </div>

            {/* Host Credibility Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-xs">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-gold shrink-0">
                <Image
                  src="/images/portrait.jpg"
                  alt="Purity Gaiti"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">Your Host &amp; Mentor</p>
                <h4 className="font-bold text-zinc-900 text-base">Purity Gaiti</h4>
                <p className="text-xs text-zinc-500">Founder &amp; Mentor Lead, Ascend Growth International</p>
              </div>
            </div>

            {/* What to Expect: 3-Step Agenda */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-wider uppercase text-zinc-900">
                What we will cover in 30 minutes:
              </h3>
              <div className="space-y-3">
                {AGENDA_STEPS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-zinc-200/90 hover:border-zinc-300 transition-colors shadow-xs"
                  >
                    <span className="text-xs font-extrabold text-brand-gold bg-brand-gold/10 w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                <span>100% Free &amp; Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Google Meet / Zoom</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Strictly 30 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Zero Hard Selling</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7/12): Double-Bezel Hardware Calendar Enclosure */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full flex flex-col space-y-4"
          >
            {/* Outer Hardware Shell */}
            <div className="relative p-1.5 sm:p-2.5 rounded-[2rem] bg-white border border-zinc-200/90 shadow-xl">
              {/* Inner Core Container */}
              <div className="relative z-10 w-full bg-[#FAFAFA] rounded-[calc(2rem-0.375rem)] overflow-hidden border border-zinc-200 shadow-xs">
                <CalendlyEmbed />
              </div>
            </div>

            {/* Quick WhatsApp Alternative Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-white border border-zinc-200 text-xs gap-3 shadow-xs">
              <span className="text-zinc-600 text-center sm:text-left font-medium">
                Can't find a suitable time slot on the calendar?
              </span>
              <a
                href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20schedule%20a%20clarity%20call%20directly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:underline shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Chat directly on WhatsApp &rarr;</span>
              </a>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-zinc-200 bg-[#FAFAFA] py-8 px-4 text-center text-xs text-zinc-500">
        <p>© 2026 Ascend Growth International. All rights reserved.</p>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
