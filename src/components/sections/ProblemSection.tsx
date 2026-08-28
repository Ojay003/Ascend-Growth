"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Users, Clock, ArrowRight, XCircle, CheckCircle2, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/hooks/useScrollReveal";

export default function ProblemSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device is touch-primary (no mouse hover capability)
    if (typeof window !== "undefined") {
      setIsTouchDevice(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    }
  }, []);

  const getCardClasses = (index: number) => {
    // On mobile / touch devices, keep all cards 100% sharp and readable with no blur
    if (isTouchDevice || hoveredIndex === null) {
      return "opacity-100 blur-0 scale-100 border-white/12 bg-[#0D121F]/85 shadow-2xl";
    }
    // On desktop mouse hover
    if (hoveredIndex === index) {
      return "opacity-100 blur-0 scale-[1.025] -translate-y-2 z-30 border-brand-gold bg-[#0F172A] shadow-[0_20px_50px_rgba(217,146,27,0.3)] ring-1 ring-brand-gold/60";
    }
    return "opacity-40 blur-[1.5px] scale-[0.98] border-white/5 bg-[#0D121F]/40";
  };

  return (
    <section 
      className="relative z-20 w-full bg-transparent text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden"
    >

      {/* Ambient background light glows */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-gold/10 via-transparent to-transparent pointer-events-none z-1" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none z-1" />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Centered Section Header */}
        <motion.div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4" variants={fadeUp}>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-3.5 py-1.5 rounded-full inline-block">
            The Hard Reality
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Degree Trap is Real.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Why ambitious graduates find themselves stuck with high honors, empty inboxes, and mounting frustration.
          </p>
        </motion.div>
        
        {/* Asymmetric Hard Reality Bento Grid with Interactive Focus Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Bento Card 1: The Academic Paradox (Spans 2 cols) */}
          <motion.div 
            variants={fadeUp} 
            className="md:col-span-2 lg:col-span-2 transition-all duration-300 ease-out"
            onMouseEnter={() => !isTouchDevice && setHoveredIndex(0)}
            onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
          >
            <Card className={`backdrop-blur-xl transition-all duration-300 h-full overflow-hidden flex flex-col justify-between group ${getCardClasses(0)}`}>
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-brand-gold border border-amber-500/30">
                        <BookOpen className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Trap #01</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">The Academic Paradox</h3>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/15">
                      Theory vs Market
                    </span>
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    You spent 4+ years memorizing textbooks and chasing GPAs. But the marketplace doesn't pay for test-taking—it pays for <strong className="text-white font-semibold">monetizable problem solving</strong>.
                  </p>
                </div>

                {/* Visual Comparison Split Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="space-y-2 p-3.5 bg-red-950/30 rounded-lg border border-red-500/30 shadow-xs">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
                      <XCircle className="w-4 h-4 shrink-0" />
                      <span>What School Taught</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-normal">
                      Abstract theory, memorized answers, and waiting for an employer to choose you.
                    </p>
                  </div>

                  <div className="space-y-2 p-3.5 bg-amber-950/30 rounded-lg border border-brand-gold/40 shadow-xs">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                      <TrendingDown className="w-4 h-4 shrink-0" />
                      <span>What It Left Out</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-normal">
                      Client outreach, high-ticket sales, objection handling, and independent invoicing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bento Card 2: The 50:2 Black Hole (1 Col) */}
          <motion.div 
            variants={fadeUp} 
            className="md:col-span-1 lg:col-span-1 transition-all duration-300 ease-out"
            onMouseEnter={() => !isTouchDevice && setHoveredIndex(1)}
            onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
          >
            <Card className={`backdrop-blur-xl transition-all duration-300 h-full flex flex-col justify-between group ${getCardClasses(1)}`}>
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      <AlertTriangle className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Trap #02</span>
                      <h3 className="text-xl font-bold text-white">The 50:2 Black Hole</h3>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    You send out fifty customized CVs. Two automated replies. Both ghost you after round two.
                  </p>
                </div>

                {/* Simulation Metric Pill */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-zinc-300">
                    <span>50 Sent</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    <span>2 Replies</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-red-400 font-bold">0 Offers</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[4%]" />
                  </div>
                  <span className="text-[11px] text-zinc-400 block text-center pt-1 font-medium">
                    Filtered out by automated ATS bots
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bento Card 3: The Compound Clock (1 Col) */}
          <motion.div 
            variants={fadeUp} 
            className="md:col-span-1 lg:col-span-1 transition-all duration-300 ease-out"
            onMouseEnter={() => !isTouchDevice && setHoveredIndex(2)}
            onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
          >
            <Card className={`backdrop-blur-xl transition-all duration-300 h-full flex flex-col justify-between group ${getCardClasses(2)}`}>
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      <Clock className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Trap #03</span>
                      <h3 className="text-xl font-bold text-white">The Ticking Clock</h3>
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    Every idle month without income isn't just lost revenue—it erodes your self-belief, increases financial dependency, and widens your career gap.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  <span className="text-xs font-semibold text-rose-200 leading-tight">
                    Lost Momentum = Compound Loss of Confidence
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bento Card 4: Family & Social Gravity (Spans 2 cols) */}
          <motion.div 
            variants={fadeUp} 
            className="md:col-span-2 lg:col-span-2 transition-all duration-300 ease-out"
            onMouseEnter={() => !isTouchDevice && setHoveredIndex(3)}
            onMouseLeave={() => !isTouchDevice && setHoveredIndex(null)}
          >
            <Card className={`backdrop-blur-xl transition-all duration-300 h-full overflow-hidden flex flex-col justify-between group ${getCardClasses(3)}`}>
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        <Users className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Trap #04</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Family &amp; Social Gravity</h3>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-950/50 text-purple-300 border border-purple-500/30">
                      Expectation Burden
                    </span>
                  </div>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    The dread of family gatherings and casual questions: <em className="text-white font-medium">&ldquo;Are you working yet?&rdquo;</em> You feel pushed to take any underpaid, soul-draining position just to look occupied.
                  </p>
                </div>

                {/* Antidote Callout Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-brand-gold/20 via-amber-500/10 to-transparent border border-brand-gold/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-white">
                      The Ascend Antidote: Shift from CV applicant to high-value service consultant.
                    </span>
                  </div>
                  <a href="#services" className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1 shrink-0">
                    See Framework <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}