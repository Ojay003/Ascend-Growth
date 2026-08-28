"use client";

import { useState } from "react";
import { BrainCircuit, Zap, TrendingUp, Repeat2, CheckCircle2, ArrowRight, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeUp } from "@/hooks/useScrollReveal";

const PHASES = [
  {
    id: 0,
    step: "Phase 01",
    weeks: "Weeks 1–3",
    title: "Mindset Calibration",
    shortDesc: "Rewire the graduate mindset and unlearn the 'wait-to-be-hired' passive mentality.",
    fullDesc: "Before you learn to sell or invoice, you must shatter the academic illusion. We eliminate imposter syndrome, instill daily discipline, and train you to think like an independent service provider rather than a hopeful applicant.",
    icon: BrainCircuit,
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/20",
    deliverables: [
      "Deconstruct the 'Employee Mindset' & build unshakeable confidence",
      "Daily high-performance routines & rejection desensitization",
      "Define your market positioning and high-leverage service offering",
    ],
    milestone: "Graduation from theoretical student to active market operator.",
  },
  {
    id: 1,
    step: "Phase 02",
    weeks: "Weeks 4–6",
    title: "High-Value Market Skills",
    shortDesc: "Acquire the practical digital skills, direct outreach, and sales mastery the market pays for.",
    fullDesc: "No academic theory. You will master the exact skills businesses pay top-dollar for: direct DM & email outreach, objection handling, high-converting offer crafting, and effective client communication.",
    icon: Zap,
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/20",
    deliverables: [
      "Master high-ticket closing & live sales roleplay simulations",
      "Build a client-attracting portfolio & personalized outreach scripts",
      "Identify high-budget decision makers and craft irresistible proposals",
    ],
    milestone: "A battle-tested pitch deck and 50+ qualified prospects contacted.",
  },
  {
    id: 2,
    step: "Phase 03",
    weeks: "Weeks 7–9",
    title: "Real-World Monetisation",
    shortDesc: "Pitch live prospects, handle objections, and land your first paying client before cohort ends.",
    fullDesc: "This is where theory turns into bank alerts. Under direct 1-on-1 mentorship, you will conduct live discovery calls, pitch your services to real businesses, and close your first paying client.",
    icon: TrendingUp,
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/20",
    deliverables: [
      "Live call reviews & real-time pitch feedback from mentor leads",
      "Negotiating payment terms, retainers, and closing deals",
      "Deploy your first service delivery without overwhelming yourself",
    ],
    milestone: "Securing your first closed client and independent invoice paid.",
  },
  {
    id: 3,
    step: "Phase 04",
    weeks: "Weeks 10–12",
    title: "Scaling & Independence",
    shortDesc: "Build reliable systems to turn one-off gigs into predictable, recurring monthly income.",
    fullDesc: "Transform an initial client win into sustainable financial freedom. Build automated referral engines, structure retainer agreements, and master the art of long-term career independence.",
    icon: Repeat2,
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/20",
    deliverables: [
      "Transition from one-off gigs to recurring monthly retainers",
      "Systematized referral generation & network leverage",
      "12-Month Post-Cohort Independence & Growth Blueprint",
    ],
    milestone: "A repeatable revenue engine and lifetime alumni network access.",
  },
];

const DELIVERABLES_PILLS = [
  "1-on-1 Mentor Guidance",
  "Weekly Accountability Reviews",
  "Live Sales Role-Plays",
  "Real Client Invoicing",
];

export default function ServicesSection() {
  const { ref, controls } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<number>(0);

  const activePhase = PHASES[activeTab];
  const IconComponent = activePhase.icon;

  return (
    <section 
      ref={ref} 
      id="services" 
      className="w-full bg-transparent text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Radiant ambient gold lighting orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-brand-gold/12 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Centered Section Header */}
        <motion.div className="text-center max-w-3xl mx-auto space-y-4" variants={fadeUp}>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
            The Framework
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The 4-Phase Ascend Methodology
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            A structured 12-week intensive cohort designed to transform stuck graduates into confident, self-reliant professionals.
          </p>

          {/* Deliverables summary strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {DELIVERABLES_PILLS.map((item, i) => (
              <span 
                key={i} 
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111726] border border-white/15 text-xs sm:text-sm font-semibold text-zinc-200 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Interactive 4-Phase Stepper & Tab Selector */}
        <motion.div variants={fadeUp} className="space-y-6 sm:space-y-8">
          
          {/* Phase Tab Selector Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 p-2 bg-[#0B0F18]/90 rounded-2xl sm:rounded-full max-w-4xl mx-auto border border-white/12 backdrop-blur-md shadow-2xl">
            {PHASES.map((phase) => {
              const isSelected = activeTab === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActiveTab(phase.id)}
                  className={`relative flex flex-col items-center justify-center py-3 px-3 sm:px-4 rounded-xl sm:rounded-full text-center transition-all duration-300 ${
                    isSelected
                      ? "bg-brand-gold text-zinc-950 font-extrabold shadow-[0_8px_25px_rgba(217,146,27,0.35)] scale-[1.02]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isSelected ? "text-zinc-950 font-black" : "text-zinc-500"}`}>
                    {phase.weeks}
                  </span>
                  <span className="text-xs sm:text-sm font-bold truncate w-full mt-0.5">
                    {phase.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Spotlight Panel with Radiant Gold Rim & Ambient Glow */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-[#0E1424]/90 border border-brand-gold/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(217,146,27,0.18)] relative overflow-hidden backdrop-blur-2xl"
              >
                {/* Top phase header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${activePhase.iconBg} border border-brand-gold/40 flex items-center justify-center shrink-0 shadow-sm`}>
                      <IconComponent className={`w-7 h-7 ${activePhase.iconColor}`} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">{activePhase.step}</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/15">{activePhase.weeks}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                        {activePhase.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-zinc-400 hidden md:block uppercase tracking-wider">
                    Step {activeTab + 1} of 4 in Journey
                  </span>
                </div>

                {/* Phase Core Description */}
                <p className="text-zinc-200 text-sm sm:text-base leading-relaxed mt-6">
                  {activePhase.fullDesc}
                </p>

                {/* Deliverables Section */}
                <div className="mt-8 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    Key Deliverables Inside This Phase:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {activePhase.deliverables.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-xl bg-[#131A2B] border border-white/10 flex items-start gap-2.5 shadow-xs hover:border-brand-gold/40 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-zinc-100 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Banner */}
                <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-gold/25 via-amber-500/10 to-transparent border border-brand-gold/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-brand-gold/30 text-brand-gold border border-brand-gold/40">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block">Phase Goal &amp; Milestone</span>
                      <span className="text-xs sm:text-sm font-bold text-white">{activePhase.milestone}</span>
                    </div>
                  </div>

                  {activeTab < PHASES.length - 1 ? (
                    <button
                      onClick={() => setActiveTab(activeTab + 1)}
                      className="text-xs sm:text-sm font-bold text-brand-gold hover:text-white hover:underline flex items-center gap-1 shrink-0 pt-2 sm:pt-0"
                    >
                      Next: {PHASES[activeTab + 1].title} <ArrowRight className="w-4 h-4 text-brand-gold" />
                    </button>
                  ) : (
                    <a
                      href="/book"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(255,255,255,0.45)] hover:shadow-[0_0_35px_rgba(255,255,255,0.7)] transition-all border border-white/80 shrink-0"
                    >
                      Apply for Next Cohort <ArrowRight className="w-3.5 h-3.5 text-zinc-950" />
                    </a>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </motion.div>
    </section>
  );
}