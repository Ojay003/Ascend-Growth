"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// ---------------------------------------------------------------------------
// Defaults – always used as a fallback when DB is unavailable or empty
// ---------------------------------------------------------------------------
const DEFAULT_HERO = {
  title: "Stop Waiting. Start Earning.",
  description:
    "We offer a structured mentorship program for graduates who refuse to let a degree be their ceiling. Mindset, Skills, Income. In that order.",
};

const DEFAULT_FOUNDER_IMAGE = "/images/founder.jpg";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface HeroConfig {
  badge_text?: string;
  badge_cta?: string;
  badge_href?: string;
  title?: string;
  description?: string;
}

interface MediaConfig {
  founder_image_url?: string | null;
}

export default function HeroSection() {
  const [title, setTitle] = useState(DEFAULT_HERO.title);
  const [description, setDescription] = useState(DEFAULT_HERO.description);
  const [founderImage, setFounderImage] = useState(DEFAULT_FOUNDER_IMAGE);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    if (!supabaseUrl || supabaseUrl.includes("placeholder")) return;

    const supabase = createClient();

    async function fetchConfig() {
      const [heroResult, mediaResult] = await Promise.all([
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "hero_config")
          .single(),
        supabase
          .from("site_settings")
          .select("value")
          .eq("key", "media_config")
          .single(),
      ]);

      if (heroResult.data?.value) {
        const cfg = heroResult.data.value as HeroConfig;
        if (cfg.title) setTitle(cfg.title);
        if (cfg.description) setDescription(cfg.description);
      }

      if (mediaResult.data?.value) {
        const media = mediaResult.data.value as MediaConfig;
        if (media.founder_image_url) setFounderImage(media.founder_image_url);
      }
    }

    fetchConfig();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 py-24 md:py-32 lg:py-40 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl leading-[1.1]">
                {title}
              </h1>
              <p className="max-w-[500px] text-lg text-zinc-800 md:text-xl leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-zinc-900 text-white hover:bg-zinc-800 shadow-md">
                Talk to an expert
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-white/50 backdrop-blur-sm border-zinc-300 shadow-sm">
                Chat on WhatsApp
              </Button>
            </div>
            <div className="flex items-center gap-6 text-sm font-medium text-zinc-700">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent" /> Mentorship you can trust</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-accent" /> With you all the way</span>
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-200 shadow-2xl bg-zinc-100">
            <Image 
              src={founderImage} 
              alt="Image of the founder" 
              fill 
              sizes="(max-width: 400px) 90vw, (max-width: 1024px) 400px, 450px"
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}