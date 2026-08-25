"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeUp, scaleIn } from "@/hooks/useScrollReveal";

export default function FounderMessage() {
  const { ref, controls } = useScrollReveal({ once: false, amount: 0.2 });

  return (
    <section ref={ref} id="founder" className="w-full py-16 sm:py-24 md:py-32 px-4 relative overflow-hidden bg-[#FAFAFA]">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(240,179,66,0.06),transparent)]" />

      <motion.div 
        className="relative max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text column */}
          <div className="flex flex-col justify-center max-w-lg">
            <motion.span variants={fadeUp} className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold mb-3 block">
              From the Founder
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-[1.15] mb-5 sm:mb-6">
              A Message From <br />
              Purity Gaiti
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-zinc-600 mb-4 sm:mb-6 leading-relaxed">
              I didn't learn business in a classroom. I learned it in the trenches of network marketing—building teams from scratch, mastering real-world sales, and overcoming rejection daily.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-zinc-600 mb-6 sm:mb-8 leading-relaxed">
              I built Ascend because young professionals don't need another theoretical lecture. They need practical, battle-tested "street smarts" and a mentor who has actually walked the path to independence.
            </motion.p>

            {/* Pull quote */}
            <motion.div variants={fadeUp} className="relative border-l-[3px] border-brand-gold pl-5 sm:pl-6 group bg-white p-5 rounded-r-xl border border-zinc-200/90 shadow-xs">
              <Quote className="absolute -top-3 -left-3 w-5 h-5 text-brand-gold bg-white rounded-full transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" strokeWidth={2} />
              <p className="text-base sm:text-lg italic text-zinc-700 mb-3 sm:mb-4 font-medium leading-relaxed">
                &ldquo;We don't teach theory. We teach mindset, resilience, and the exact skills you need to monetize your potential in the real world.&rdquo;
              </p>
              <div>
                <p className="font-bold text-zinc-900 text-base sm:text-lg">Purity Gaiti</p>
                <p className="text-brand-gold font-semibold text-xs sm:text-sm">Founder &amp; Mentor Lead</p>
              </div>
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div variants={scaleIn} className="relative w-full max-w-[360px] sm:max-w-[420px] mx-auto lg:ml-auto lg:mt-0 mt-4 group px-2 sm:px-0">
            {/* Shadow block */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-full h-[95%] bg-[#0F121B] rounded-[1.5rem] sm:rounded-[2rem] z-0 transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2" />
            {/* Accent dot */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-14 sm:h-14 bg-brand-gold rounded-full z-20 shadow-lg animate-pulse" />
            {/* Second smaller accent */}
            <div className="absolute bottom-3 -right-2 sm:bottom-4 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 bg-brand-accent rounded-full z-20 opacity-70" />

            <div className="relative z-10 w-full aspect-[3/4] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-3 sm:border-4 border-white bg-white">
              <Image
                src="/images/portrait.jpg"
                alt="Purity Gaiti, Founder of Ascend Growth International"
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 450px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}