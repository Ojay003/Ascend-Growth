"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Video } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/hooks/useScrollReveal";

const TIMELINE_STEPS = [
  {
    time: "00 – 10m",
    title: "The Bottleneck Audit",
    desc: "We diagnose where you are stuck—whether it's sending ghosted CVs, low market clarity, or lack of commercial confidence.",
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/30",
  },
  {
    time: "10 – 20m",
    title: "Skill & Offer Match",
    desc: "We map your natural strengths against our 4-Phase framework to identify the high-ticket service you can monetize immediately.",
    iconColor: "text-brand-gold",
    bgColor: "bg-brand-gold/15 border-brand-gold/40",
  },
  {
    time: "20 – 30m",
    title: "Honest Fit & Action Plan",
    desc: "You get transparent feedback on whether AGI is the right next step. If not, you still leave with a practical roadmap.",
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
  },
];

export default function CtaBanner() {
  return (
    <section 
      id="apply" 
      className="w-full bg-transparent py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-[#0E1424]/95 border border-brand-gold/40 p-6 sm:p-10 md:p-14 shadow-[0_0_60px_rgba(217,146,27,0.15)] backdrop-blur-2xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Subtle dot mesh texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient corners */}
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (7/12): Centered Text & Conversion Action */}
          <motion.div variants={fadeUp} className="lg:col-span-7 flex flex-col space-y-6 text-center items-center mx-auto lg:mx-0">
            
            {/* Live Status Pill */}
            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-gold/15 text-brand-gold border border-brand-gold/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Next Cohort Applications Open
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.12] tracking-tight text-center">
              No commitment. <br />
              <span className="text-brand-gold">No pressure.</span>
            </h2>

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl text-center">
              A private 1-on-1 strategy call with founder Purity Gaiti to audit where you are currently stuck and map your transition into an independent, earning professional.
            </p>

            {/* Call Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 w-full max-w-md">
              <Button
                asChild
                className="bg-white hover:bg-zinc-100 text-zinc-950 font-black uppercase tracking-wider h-13 sm:h-14 px-7 rounded-xl transition-all shadow-[0_0_25px_rgba(255,255,255,0.45)] hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] hover:-translate-y-0.5 group text-xs sm:text-sm w-full sm:w-auto border border-white/80"
              >
                <Link href="/book" className="flex items-center justify-center">
                  Book Free Clarity Call
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="whatsapp"
                className="h-13 sm:h-14 px-6 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm w-full sm:w-auto shadow-lg hover:scale-[1.02] transition-transform"
              >
                <a 
                  href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20clarity%20call" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <div className="relative w-4 h-4 shrink-0">
                    <Image
                      src="/images/whatsapp.png"
                      alt="WhatsApp"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
            </div>

            {/* Reassurance Trust Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400 font-medium pt-3 border-t border-white/10 w-full">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                100% Free Strategy Call
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                Zero Hard Selling
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Video className="w-4 h-4 text-brand-gold shrink-0" />
                Google Meet / Zoom
              </span>
            </div>

          </motion.div>

          {/* Right Column (5/12): Interactive 30-Minute Timeline Visualizer */}
          <motion.div variants={fadeUp} className="lg:col-span-5 w-full">
            <div className="rounded-2xl sm:rounded-3xl bg-[#13192B]/90 border border-white/10 p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
              
              {/* Box Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Inside Your 30 Minutes:
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                  Agenda
                </span>
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {TIMELINE_STEPS.map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#192135] border border-white/8 hover:border-brand-gold/40 transition-colors shadow-xs group space-y-1.5 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-gold">
                        {step.time}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Reassurance */}
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                <p className="text-[11px] text-zinc-400 font-medium">
                  Strictly capped at 30 minutes · Direct with Founder Purity Gaiti
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}