"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-amber-500/[0.3]",
  borderRadius = 16,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  borderRadius?: number;
}) {
  return (
    <motion.div
      animate={{
        opacity: 1,
        y: 0,
        rotate,
      }}
      className={cn("absolute pointer-events-none", className)}
      initial={{
        opacity: 0,
        y: -120,
        rotate: rotate - 15,
      }}
      transition={{
        duration: 2.2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        className="relative"
        style={{
          width,
          height,
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[6px]",
            "ring-1 ring-white/[0.12]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.22),transparent_70%)]",
            "after:rounded-[inherit]"
          )}
          style={{ borderRadius }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ShapeBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#070A12]">
      {/* Global Ambient Lighting Orbs */}
      <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gold/[0.16] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-amber-500/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[650px] h-[650px] bg-indigo-500/[0.10] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-1/3 w-[500px] h-[500px] bg-amber-500/[0.08] rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Kokonut UI Shapes across the canvas */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Tall rectangle - top left */}
        <ElegantShape
          borderRadius={24}
          className="top-[-5%] left-[-5%] sm:left-[-2%]"
          delay={0.2}
          gradient="from-amber-500/[0.35] to-yellow-500/[0.05]"
          height={450}
          rotate={-8}
          width={260}
        />

        {/* Wide rectangle - top right */}
        <ElegantShape
          borderRadius={20}
          className="top-[5%] right-[-8%]"
          delay={0.4}
          gradient="from-rose-500/[0.3] to-orange-500/[0.05]"
          height={160}
          rotate={15}
          width={500}
        />

        {/* Square - middle left */}
        <ElegantShape
          borderRadius={32}
          className="top-[32%] left-[-4%]"
          delay={0.3}
          gradient="from-amber-400/[0.3] to-amber-600/[0.05]"
          height={240}
          rotate={22}
          width={240}
        />

        {/* Small rectangle - upper center */}
        <ElegantShape
          borderRadius={14}
          className="top-[12%] right-[15%]"
          delay={0.5}
          gradient="from-indigo-500/[0.3] to-purple-500/[0.05]"
          height={90}
          rotate={-18}
          width={220}
        />

        {/* Medium rectangle - center right */}
        <ElegantShape
          borderRadius={18}
          className="top-[48%] right-[-5%]"
          delay={0.6}
          gradient="from-emerald-500/[0.3] to-teal-500/[0.05]"
          height={140}
          rotate={32}
          width={340}
        />

        {/* Small square - mid bottom left */}
        <ElegantShape
          borderRadius={24}
          className="top-[68%] left-[5%]"
          delay={0.3}
          gradient="from-blue-500/[0.3] to-cyan-500/[0.05]"
          height={160}
          rotate={-20}
          width={160}
        />

        {/* Wide rectangle - bottom right */}
        <ElegantShape
          borderRadius={18}
          className="bottom-[8%] right-[10%]"
          delay={0.8}
          gradient="from-purple-500/[0.3] to-indigo-500/[0.05]"
          height={110}
          rotate={-12}
          width={360}
        />

        {/* Tiny rectangle - center */}
        <ElegantShape
          borderRadius={10}
          className="top-[25%] left-[30%]"
          delay={0.7}
          gradient="from-amber-300/[0.3] to-yellow-500/[0.05]"
          height={70}
          rotate={38}
          width={120}
        />
      </div>
    </div>
  );
}

export default ShapeBackground;
