"use client";

import { Clock, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/hooks/useScrollReveal";

const PROGRAM_METRICS = [
  {
    icon: Clock,
    label: "Admission closes",
    value: "4 Sep, 2026",
    badge: "Next Cohort",
  },
  {
    icon: Calendar,
    label: "Programme duration",
    value: "12 weeks",
    badge: "Intensive",
  },
  {
    icon: BookOpen,
    label: "Learning format",
    value: "Cohort-based learning",
    badge: "1-on-1 Mentorship",
  },
];

export default function ProgramOverviewBar() {
  return (
    <section className="w-full px-4 sm:px-6 -mt-4 sm:-mt-6 mb-8 sm:mb-12 relative z-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0E1424]/90 border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl p-5 sm:p-7"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 md:divide-x md:divide-white/10 items-center">
          {PROGRAM_METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-4 ${
                  idx === 0 
                    ? "md:pr-6" 
                    : idx === 1 
                    ? "md:px-6" 
                    : "md:pl-6"
                }`}
              >
                {/* Icon Container with subtle gold glow */}
                <div className="w-12 h-12 rounded-2xl bg-[#13192B] border border-brand-gold/30 text-brand-gold flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Metric Copy */}
                <div className="flex flex-col space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {item.label}
                  </span>
                  <span className="text-base sm:text-lg font-black text-white tracking-tight">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
