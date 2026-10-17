"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, scaleIn } from "@/hooks/useScrollReveal";
import { createClient } from "@/lib/supabase/client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface FounderConfig {
  section_badge?: string;
  founder_name?: string;
  founder_title?: string;
  paragraph_1?: string;
  paragraph_2?: string;
  quote?: string;
  brand_label?: string;
}

interface MediaConfig {
  message_image_url?: string | null;
  founder_image_url?: string | null;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------
const DEFAULT_FOUNDER: Required<FounderConfig> = {
  section_badge: "From the Founder",
  founder_name: "Purity Gaiti",
  founder_title: "Founder & Lead Mentor",
  paragraph_1:
    "I didn't learn business in a classroom. I learned it in the trenches of direct sales—building teams from scratch, mastering real-world outreach, and overcoming rejection daily.",
  paragraph_2:
    "I built Ascend because young professionals don't need another theoretical lecture. They need practical, battle-tested \u201cstreet smarts\u201d and a mentor who has actually walked the path to financial independence.",
  quote:
    "We don't teach theory. We teach mindset, resilience, and the exact skills you need to monetize your potential in the real world.",
  brand_label: "Ascend Growth International",
};

const DEFAULT_MESSAGE_IMAGE = "/images/message.jpg";

export default function FounderMessage() {
  const [cfg, setCfg] = useState<Required<FounderConfig>>(DEFAULT_FOUNDER);
  const [messageImage, setMessageImage] = useState(DEFAULT_MESSAGE_IMAGE);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    if (!supabaseUrl || supabaseUrl.includes("placeholder")) return;

    const supabase = createClient();

    async function fetchConfig() {
      const [founderResult, mediaResult] = await Promise.all([
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "founder_config")
          .single(),
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "media_config")
          .single(),
      ]);

      if (founderResult.data?.value) {
        const db = founderResult.data.value as FounderConfig;
        setCfg((prev) => ({ ...prev, ...db }));
      }

      if (mediaResult.data?.value) {
        const media = mediaResult.data.value as MediaConfig;
        if (media.message_image_url) setMessageImage(media.message_image_url);
      }
    }

    fetchConfig();
  }, []);

  return (
    <section 
      id="founder" 
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-transparent text-white scroll-mt-24"
    >
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[350px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        className="relative max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center text-center items-center max-w-xl mx-auto lg:mx-0 space-y-6">
            <motion.span variants={fadeUp} className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold bg-brand-gold/15 border border-brand-gold/30 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
              {cfg.section_badge}
            </motion.span>
            
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] text-center">
              A Message From <br className="hidden sm:block" />
              {cfg.founder_name}
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-center">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                {cfg.paragraph_1}
              </p>
              <p
                className="text-base sm:text-lg text-zinc-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: cfg.paragraph_2 }}
              />
            </motion.div>
            <motion.div variants={fadeUp} className="w-full text-center">
              <div className="relative bg-[#0E1424]/90 p-5 sm:p-6 rounded-2xl border border-white/12 shadow-2xl backdrop-blur-md space-y-3">
                <div className="w-8 h-8 mx-auto rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shadow-sm">
                  <Quote className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <p className="text-sm sm:text-base italic text-zinc-100 font-medium leading-relaxed max-w-lg mx-auto">
                  &ldquo;{cfg.quote}&rdquo;
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="font-bold text-white text-sm sm:text-base">{cfg.founder_name}</p>
                  <p className="text-brand-gold font-semibold text-xs">{cfg.founder_title}</p>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div variants={scaleIn} className="lg:col-span-5 w-full max-w-md sm:max-w-lg mx-auto lg:ml-auto">
            <div className="relative p-2.5 sm:p-3.5 rounded-3xl bg-[#0E1424]/90 border border-brand-gold/40 shadow-[0_0_50px_rgba(217,146,27,0.14)] backdrop-blur-xl">
              <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-brand-gold rounded-full z-20 shadow-lg animate-pulse" />
              
              <div className="relative z-10 w-full aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 bg-[#070A12] shadow-inner">
                <Image
                  src={messageImage}
                  alt="Purity Gaiti - Empowering young professionals and female entrepreneurs"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  priority
                />
              </div>

              <div className="pt-3 px-1 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                  {cfg.brand_label}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}