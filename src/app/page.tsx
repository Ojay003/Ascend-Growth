"use client";

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
  return (
    <div className="min-h-screen bg-[#070A12] text-white selection:bg-brand-gold/30 selection:text-white relative">
      <ShapeBackground />
      <Header />
      <main className="flex flex-col items-center relative z-10">
        <HeroSection
          badge={{
            text: "Next Cohort Opening Soon",
            action: {
              text: "Join the Waitlist",
              href: "#waitlist",
            },
          }}
          title="Stop Waiting. Start Earning."
          description="We offer a structured mentorship program for graduates who refuse to let a degree be their ceiling. Mindset, Skills, Income. In that order."
          actions={[
            {
              text: "Chat on WhatsApp",
              href: "https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program",
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