"use client";

import { Star, Quote, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/hooks/useScrollReveal";

const GRADUATE_STORIES = [
  {
    id: 1,
    name: "Samuel K.",
    role: "Marketing Consultant · Cohort 1",
    quote: "Sent 100+ CVs with zero replies. Ascend taught me commercial outreach and I landed a high-ticket client in 5 weeks.",
    tag: "Graduate Alum",
    tagColor: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  },
  {
    id: 2,
    name: "Linda A.",
    role: "Growth Strategist · Cohort 2",
    quote: "Went from being an invisible unpaid intern to managing 3 active retainer clients independently.",
    tag: "Graduate Alum",
    tagColor: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  },
  {
    id: 3,
    name: "David O.",
    role: "B2B Lead Specialist · Cohort 3",
    quote: "Zero sales background before AGI. The live call roleplays helped me close my first $600 client by Week 8.",
    tag: "Graduate Alum",
    tagColor: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  },
  {
    id: 4,
    name: "Kevin T.",
    role: "Direct Sales Lead · Cohort 1",
    quote: "Shattered my imposter syndrome. I now pitch business owners directly without fear and invoice with pride.",
    tag: "Graduate Alum",
    tagColor: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  },
];

const PARENT_AND_COMMUNITY_STORIES = [
  {
    id: 5,
    name: "Grace M.",
    role: "Mother of Cohort 2 Graduate",
    quote: "My daughter went from post-graduation anxiety to waking up early, managing client projects, and smiling with true self-belief.",
    tag: "Parent Perspective",
    tagColor: "bg-sky-950/70 text-sky-300 border-sky-500/30",
  },
  {
    id: 6,
    name: "Dr. Peter N.",
    role: "Parent of Economics Graduate",
    quote: "The best post-university investment we made. It replaced theoretical lectures with real commercial execution.",
    tag: "Parent Perspective",
    tagColor: "bg-sky-950/70 text-sky-300 border-sky-500/30",
  },
  {
    id: 7,
    name: "Sarah W.",
    role: "Cohort 3 Alum",
    quote: "Purity's 1-on-1 feedback on my pitch scripts completely altered how I communicate with high-budget decision makers.",
    tag: "Graduate Alum",
    tagColor: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
  },
  {
    id: 8,
    name: "James M.",
    role: "Parent of Cohort 1 Graduate",
    quote: "Seeing my son achieve financial self-reliance and pay his own bills within 12 weeks was an immense relief.",
    tag: "Parent Perspective",
    tagColor: "bg-sky-950/70 text-sky-300 border-sky-500/30",
  },
];

function TestimonialCard({ story }: { story: typeof GRADUATE_STORIES[0] }) {
  return (
    <div className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0E1424]/90 border border-white/12 hover:border-brand-gold/60 shadow-xl hover:shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group flex flex-col justify-between select-none">
      <div className="space-y-3.5">
        {/* Top Header inside card */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-2xs ${story.tagColor}`}>
            {story.tag}
          </span>
          <div className="flex items-center gap-0.5 text-brand-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="fill-current w-3.5 h-3.5 text-brand-gold" />
            ))}
          </div>
        </div>

        {/* Quote text */}
        <p className="text-zinc-200 text-xs sm:text-sm italic leading-relaxed line-clamp-4">
          &ldquo;{story.quote}&rdquo;
        </p>
      </div>

      {/* Author signature footer */}
      <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-xs">
            {story.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm leading-tight">{story.name}</h4>
            <p className="text-[11px] text-zinc-400 font-medium">{story.role}</p>
          </div>
        </div>
        <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 opacity-80" />
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  // Duplicate arrays for seamless infinite loop
  const row1 = [...GRADUATE_STORIES, ...GRADUATE_STORIES, ...GRADUATE_STORIES];
  const row2 = [...PARENT_AND_COMMUNITY_STORIES, ...PARENT_AND_COMMUNITY_STORIES, ...PARENT_AND_COMMUNITY_STORIES];

  return (
    <section 
      id="testimonials" 
      className="w-full py-16 sm:py-24 md:py-32 relative bg-transparent text-white overflow-hidden scroll-mt-24"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14 text-center space-y-4">
        {/* Centered Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="space-y-3"
        >
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Proof That the Method Works.
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Glance through verified breakthroughs from graduates and parents across our previous cohorts.
          </p>
        </motion.div>
      </div>

      {/* Infinite Dual-Velocity Rails Container with Edge Fades */}
      <div className="relative w-full overflow-hidden space-y-5 sm:space-y-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#070A12] via-[#070A12]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#070A12] via-[#070A12]/80 to-transparent z-20" />
        <div className="flex gap-4 sm:gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-2">
          {row1.map((story, i) => (
            <TestimonialCard key={`top-${story.id}-${i}`} story={story} />
          ))}
        </div>
        <div className="flex gap-4 sm:gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused] py-2">
          {row2.map((story, i) => (
            <TestimonialCard key={`bottom-${story.id}-${i}`} story={story} />
          ))}
        </div>

      </div>
    </section>
  );
}
