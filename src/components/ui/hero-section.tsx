"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useScrollReveal, fadeUp, staggerContainer, scaleIn } from "@/hooks/useScrollReveal";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow" | "outline" | "secondary" | "ghost" | "link" | "destructive";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const imageSrc = resolvedTheme === "light" ? image.light : image.dark;
  const { ref, controls } = useScrollReveal();

  return (
    <section
      ref={ref}
      className={cn(
        "bg-background text-foreground",
        "py-8 sm:py-16 md:py-24 px-4 overflow-hidden w-full"
      )}
    >
      <motion.div 
        className="mx-auto flex max-w-6xl flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-4 sm:pt-8"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        
        {/* Left Column: Text */}
        <motion.div className="flex flex-1 flex-col items-start gap-5 sm:gap-6 text-left w-full" variants={staggerContainer}>
          {/* Badge */}
          {badge && (
            <motion.div variants={fadeUp} className="w-full sm:w-auto">
              <Badge variant="outline" className="gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium flex items-center justify-start sm:justify-center w-fit border-zinc-200 bg-white/80 backdrop-blur-sm shadow-xs">
                <span className="text-zinc-600">{badge.text}</span>
                <a href={badge.action.href} className="flex items-center gap-1 font-semibold text-brand-gold hover:underline transition-colors">
                  {badge.action.text}
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            variants={fadeUp}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.12] text-zinc-900 tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl relative z-10 max-w-[600px] font-normal text-zinc-600 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div 
            variants={fadeUp}
            className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 mt-2 w-full sm:w-auto"
          >
            {actions.map((action, index) => (
              <Button 
                key={index} 
                variant={action.variant as any} 
                size="lg" 
                asChild 
                className="w-full sm:w-auto h-13 sm:h-12 px-6 sm:px-8 rounded-xl font-semibold text-sm sm:text-base hover:scale-[1.02] transition-transform"
              >
                <a href={action.href} className="flex items-center justify-center gap-2">
                  {action.icon}
                  {action.text}
                </a>
              </Button>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Portrait Image */}
        <motion.div 
          className="relative w-full max-w-[360px] sm:max-w-md lg:w-1/2 flex-shrink-0 pt-6 sm:pt-8 lg:pt-0 px-2 sm:px-0"
          variants={scaleIn}
        >
          <div className="relative w-full max-w-[380px] mx-auto group">
            {/* Backdrop Decorative Elements matching Founder section */}
            <motion.div 
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-full h-[95%] bg-[#0F121B] rounded-[1.5rem] sm:rounded-[2rem] z-0 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-2" 
            />
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-14 sm:h-14 bg-brand-gold rounded-full z-20 shadow-lg animate-pulse" />
            <div className="absolute bottom-3 -right-2 sm:bottom-4 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 bg-brand-accent rounded-full z-20 opacity-70" />

            {/* Image Container */}
            <div className="relative z-10 w-full aspect-[3/4] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-3 sm:border-4 border-white bg-white">
              <Image
                src={imageSrc}
                alt={image.alt}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 450px"
                priority
              />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}