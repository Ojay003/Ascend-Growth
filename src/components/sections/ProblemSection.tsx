"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Users, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeUp } from "@/hooks/useScrollReveal";

const PROBLEMS = [
  {
    title: "The Black Hole",
    description: "You send out fifty CVs. You hear back from two. Both ghost you after the second round.",
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Knowledge Gap",
    description: "You were taught to get grades, not generate income. Now you don't know how to start.",
    icon: BookOpen,
    color: "text-sky-400",
    bg: "bg-sky-400/10",
  },
  {
    title: "Family Pressure",
    description: "You feel pressure from family to pursue a traditional career path.",
    icon: Users,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    title: "The Clock is Ticking",
    description: "Every month without income is another month of borrowed time and borrowed confidence.",
    icon: Timer,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
];

export default function ProblemSection() {
  const { ref, controls } = useScrollReveal();

  return (
    <section ref={ref} className="relative z-20 w-full bg-[#FAFAFA] text-zinc-900 py-16 sm:py-24 md:py-32 px-4 overflow-hidden">
      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div 
        className="relative max-w-6xl mx-auto space-y-10 sm:space-y-12"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="mb-8 sm:mb-12" variants={fadeUp}>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold mb-3 block">
            The Reality
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            The degree trap <br />
            <span className="text-zinc-500">is real</span>
          </h2>
        </motion.div>
        
        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={fadeUp} className="h-full">
                <Card
                  className="group border border-zinc-200/90 bg-white shadow-xs hover:border-zinc-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                >
                  <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
                    <div
                      className={`mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl ${item.bg} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color}`} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-zinc-600 leading-relaxed text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}