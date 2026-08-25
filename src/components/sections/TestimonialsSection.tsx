"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal, staggerContainer, fadeUp } from "@/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    type: "Graduate",
    name: "Samuel K.",
    role: "Secured First Independent Client",
    quote: "I sent out over 100 CVs with zero responses. Ascend taught me how to stop begging for jobs and start offering value. Within 5 weeks, I landed a high-paying freelance client.",
    rating: 5,
  },
  {
    type: "Parent",
    name: "Grace M.",
    role: "Mother of a Cohort 2 Graduate",
    quote: "It was heartbreaking seeing my daughter stuck at home after we paid for her degree. AGI didn't just give her skills—they gave her back her confidence. She is completely transformed.",
    rating: 5,
  },
  {
    type: "Graduate",
    name: "Linda A.",
    role: "Built a Sustainable Consulting Income",
    quote: "School taught me theory. AGI taught me street smarts, sales, and resilience. I went from being an unpaid intern to making my own independent income. The mindset shift was everything.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { ref, controls } = useScrollReveal();

  return (
    <section ref={ref} id="testimonials" className="w-full max-w-6xl px-4 py-16 sm:py-24 md:py-32 mx-auto bg-white border border-zinc-200/80 rounded-2xl sm:rounded-3xl md:rounded-[3rem] my-8 sm:my-12 shadow-xs">
      <motion.div 
        className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.span variants={fadeUp} className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold mb-3 block">
          Real Results
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-zinc-900 leading-tight">
          Don't just take our word for it
        </motion.h2>
        <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed">
          Hear from graduates who broke out of the degree trap, and parents who watched them transform.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div key={index} variants={fadeUp} className="h-full">
            <Card className="h-full border border-zinc-200/90 shadow-xs hover:shadow-md transition-all duration-300 bg-[#FAFAFA] flex flex-col relative overflow-hidden group hover:border-brand-gold/40">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-zinc-900">
                <Quote size={70} />
              </div>
              <CardContent className="p-6 sm:p-8 flex flex-col flex-1 relative z-10">
                <div className="flex gap-1 mb-5 text-brand-gold">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-current w-4 h-4 sm:w-5 sm:h-5" />
                  ))}
                </div>
                <p className="text-zinc-700 italic text-base sm:text-lg leading-relaxed flex-1 mb-6 sm:mb-8">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto border-t border-zinc-200/80 pt-5 sm:pt-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2.5 ${testimonial.type === 'Parent' ? 'bg-sky-50 text-sky-700 border border-sky-200' : 'bg-brand-gold/10 text-brand-gold-hover border border-brand-gold/20'}`}>
                    {testimonial.type}
                  </span>
                  <h4 className="font-bold text-zinc-900 text-base sm:text-lg">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm font-medium text-zinc-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
