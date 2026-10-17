"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/sections/Header";
import { HeroSection } from "@/components/ui/hero-section";
import ProgramOverviewBar from "@/components/sections/ProgramOverviewBar";
import ProblemSection from "@/components/sections/ProblemSection";
import ServicesSection from "@/components/sections/ServiceSection";
import FounderMessage from "@/components/sections/FounderMessage";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBanner from "@/components/sections/CtaBanner";
import Footer from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { ShapeBackground } from "@/components/ui/shape-background";

export default function ServiceEcommercePage() {
  const [heroConfig, setHeroConfig] = useState({
    badgeText: "Next Cohort Opening Soon",
    badgeCta: "Join the Waitlist",
    title: "Stop Waiting. Start Earning.",
    description: "We offer a structured mentorship program for graduates who refuse to let a degree be their ceiling. Mindset, Skills, Income. In that order.",
    whatsappPhone: "254796469972",
    whatsappMessage: "Hello Ascend Growth, I would like to inquire about the mentorship program",
  });

  useEffect(() => {
    async function loadSiteSettings() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes("placeholder")) return;

        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data } = await supabase.from("site_settings").select("*");

        if (data) {
          const heroRow = data.find((r) => r.key === "hero_config");
          const contactRow = data.find((r) => r.key === "contact_config");

          setHeroConfig((prev) => ({
            ...prev,
            ...(heroRow?.value
              ? {
                  badgeText: heroRow.value.badge_text || prev.badgeText,
                  badgeCta: heroRow.value.badge_cta || prev.badgeCta,
                  title: heroRow.value.title || prev.title,
                  description: heroRow.value.description || prev.description,
                }
              : {}),
            ...(contactRow?.value
              ? {
                  whatsappPhone: contactRow.value.whatsapp_phone || prev.whatsappPhone,
                  whatsappMessage: contactRow.value.whatsapp_default_message || prev.whatsappMessage,
                }
              : {}),
          }));
        }
      } catch (e) {
        console.error("Using fallback hero settings:", e);
      }
    }

    loadSiteSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-brand-gold/30 selection:text-white relative">
      <ShapeBackground />
      <Header />
      <main className="flex flex-col items-center relative z-10">
        <HeroSection
          badge={{
            text: heroConfig.badgeText,
            action: {
              text: heroConfig.badgeCta,
              href: "#waitlist",
            },
          }}
          title={heroConfig.title}
          description={heroConfig.description}
          actions={[
            {
              text: "Chat on WhatsApp",
              href: `https://wa.me/${heroConfig.whatsappPhone}?text=${encodeURIComponent(heroConfig.whatsappMessage)}`,
              variant: "whatsapp",
              icon: (
                <div className="relative w-5 h-5 shrink-0">
                  <Image src="/images/whatsapp.png" alt="WhatsApp" fill className="object-contain" />
                </div>
              ),
            },
            {
              text: "Book Clarity Call",
              href: "/book",
              variant: "glow",
            },
          ]}
          image={{
            light: "/images/founder.jpg",
            dark: "/images/founder.jpg",
            alt: "Purity Gaiti - Mentor",
          }}
        />
        <ProgramOverviewBar />
        <ProblemSection />
        <ServicesSection />
        <FounderMessage />
        <TestimonialsSection />
        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}