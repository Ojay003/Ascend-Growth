"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Zap, TrendingUp, Repeat2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeUp } from "@/hooks/useScrollReveal";

const PHASES = [
  {
    step: "Phase 1",
    title: "Mindset Calibration",
    desc: "Rewire the graduate mindset. Unlearn the 'wait to be hired' mentality and build true entrepreneurial clarity and confidence.",
    icon: BrainCircuit,
    gradient: "from-brand-gold/20 to-brand-gold/5",
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/10",
  },
  {
    step: "Phase 2",
    title: "High-Value Skills",
    desc: "Acquire the practical skills the market actually pays for. No classroom theory—just real-world sales, marketing, and delivery.",
    icon: Zap,
    gradient: "from-brand-green/20 to-brand-green/5",
    iconColor: "text-brand-green",
    iconBg: "bg-brand-green/10",
  },
  {
    step: "Phase 3",
    title: "Real-World Monetisation",
    desc: "Land your first client, close your first sale, and generate independent income before the program even ends.",
    icon: TrendingUp,
    gradient: "from-brand-gold/20 to-brand-gold/5",
    iconColor: "text-brand-gold",
    iconBg: "bg-brand-gold/10",
  },
  {
    step: "Phase 4",
    title: "Scaling & Independence",
    desc: "Build reliable systems to grow your revenue. Strengthen your professional network and establish unshakeable independence.",
    icon: Repeat2,
    gradient: "from-brand-green/20 to-brand-green/5",
    iconColor: "text-brand-green",
    iconBg: "bg-brand-green/10",
  },
];

const DELIVERABLES = [
  "Personalized 1-on-1 Guidance",
  "Weekly Accountability Tracking",
  "Practical Communication Role-Plays",
];

export default function ServicesSection() {
  const { ref, controls } = useScrollReveal();

  return (
    <section ref={ref} id="services" className="w-full max-w-6xl px-4 py-16 sm:py-24 md:py-32 mx-auto">
      <motion.div 
        className="mb-12 sm:mb-16 flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start md:items-end"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <div className="max-w-2xl">
          <motion.span variants={fadeUp} className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold mb-3 block">
            The Framework
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-zinc-900 leading-tight">
            The 4-Phase Ascend Methodology
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed">
            A structured 12-week intensive cohort designed to transform stuck graduates into confident, self-reliant professionals.
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-xs w-full md:w-auto shrink-0">
          <h4 className="font-bold text-zinc-900 mb-3 text-xs sm:text-sm uppercase tracking-wider">Inside the 12-Week Cohort:</h4>
          <ul className="space-y-2.5">
            {DELIVERABLES.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-zinc-700 font-medium text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        {PHASES.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <motion.div key={index} variants={fadeUp} className="h-full">
              <Card
                className="group relative overflow-hidden bg-white border border-zinc-200/90 shadow-xs hover:shadow-xl hover:border-brand-gold/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <CardContent className="relative p-6 sm:p-8 flex flex-col gap-3 sm:gap-4 flex-1">
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-zinc-400">
                    {phase.step}
                  </span>
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 ${phase.iconBg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-1 sm:mb-2`}
                  >
                    <Icon size={20} strokeWidth={2} className={phase.iconColor} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 leading-snug">{phase.title}</h3>
                  <p className="text-zinc-600 leading-relaxed text-sm mt-auto">{phase.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}