"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/hooks/useScrollReveal";
import { ShapeBackground } from "@/components/ui/shape-background";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow" | "whatsapp" | "outline" | "secondary" | "ghost" | "link" | "destructive";
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

  return (
    <section
      className={cn(
        "bg-transparent text-white",
        "relative py-12 sm:py-20 md:py-28 px-4 sm:px-6 overflow-hidden w-full"
      )}
    >

      <motion.div 
        className="relative z-10 mx-auto flex max-w-6xl flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 pt-2 sm:pt-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left / Center Column: Centered Text & Actions */}
        <motion.div 
          className="flex flex-1 flex-col items-center text-center gap-5 sm:gap-6 w-full max-w-2xl lg:max-w-none"
          variants={staggerContainer}
        >
          {/* Badge */}
          {badge && (
            <motion.div variants={fadeUp} className="w-full sm:w-auto flex justify-center">
              <Badge variant="outline" className="gap-2 px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-center w-fit border-white/20 bg-white/[0.08] backdrop-blur-md shadow-lg text-zinc-100 rounded-full">
                <span>{badge.text}</span>
                <a href={badge.action.href} className="flex items-center gap-1 font-bold text-brand-gold hover:underline transition-colors">
                  {badge.action.text}
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 
            variants={fadeUp}
            className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.12] text-white tracking-tight text-center max-w-2xl"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl relative z-10 max-w-xl font-normal text-zinc-200 leading-relaxed text-center px-2"
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div 
            variants={fadeUp}
            className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto"
          >
            {actions.map((action, index) => (
              <Button 
                key={index} 
                variant={action.variant as any} 
                size="lg" 
                asChild 
                className="w-[260px] sm:w-auto h-11 sm:h-12 px-5 sm:px-8 rounded-xl font-bold text-xs sm:text-base hover:scale-[1.02] transition-transform shadow-xl"
              >
                <a href={action.href} className="flex items-center justify-center gap-2">
                  {action.icon}
                  {action.text}
                </a>
              </Button>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Founder Portrait on the Right Side */}
        <motion.div 
          className="relative w-full max-w-[300px] sm:max-w-[360px] lg:w-[380px] xl:w-[420px] flex-shrink-0 pt-4 lg:pt-0 px-2 sm:px-0 mx-auto lg:mx-0"
          variants={scaleIn}
        >
          <div className="relative w-full mx-auto group">
            {/* Backdrop Decorative Elements */}
            <motion.div 
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 w-full h-[95%] bg-[#111726] border border-white/15 rounded-[1.5rem] sm:rounded-[2rem] z-0 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 shadow-2xl" 
            />
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-brand-gold rounded-full z-20 shadow-lg animate-pulse" />
            <div className="absolute bottom-3 -right-2 sm:bottom-4 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 bg-brand-accent rounded-full z-20 opacity-80" />

            {/* Image Container */}
            <div className="relative z-10 w-full aspect-[3/4] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-3 sm:border-4 border-zinc-700 bg-zinc-900">
              <Image
                src={imageSrc}
                alt={image.alt}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 360px, 420px"
                priority
              />
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}