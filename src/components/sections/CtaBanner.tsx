import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section id="apply" className="w-full bg-[#FAFAFA] py-12 sm:py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-[#0F121B] border border-zinc-800/80 p-8 sm:p-14 md:p-20 shadow-2xl text-center">
        {/* Subtle noise/texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-brand-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 sm:w-16 h-1 bg-brand-gold mb-6 sm:mb-8 rounded-full" />
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-brand-gold/90 mb-3 sm:mb-4">
            Ready to Start?
          </span>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-4 sm:mb-5 leading-tight max-w-3xl">
            No commitment. No pressure.
          </h3>
          <p className="text-base sm:text-lg text-zinc-300 mb-8 sm:mb-10 max-w-2xl leading-relaxed px-2">
            Just a 30-minute clarity call to see if AGI is the right fit for where you are right now.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 mb-10 sm:mb-12 w-full sm:w-auto justify-center max-w-md sm:max-w-none">
            <Button
              asChild
              className="bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 font-bold uppercase tracking-wider sm:tracking-widest h-13 sm:h-14 px-6 sm:px-8 rounded-xl transition-all shadow-lg hover:shadow-brand-gold/30 hover:shadow-xl hover:-translate-y-0.5 group text-xs sm:text-sm w-full sm:w-auto"
            >
              <Link href="/book">
                Book a free clarity call
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent uppercase tracking-wider sm:tracking-widest h-13 sm:h-14 px-6 sm:px-8 rounded-xl font-bold transition-all text-xs sm:text-sm w-full sm:w-auto"
            >
              <a href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20book%20a%20clarity%20call" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-10 text-zinc-300 font-medium text-xs sm:text-sm md:text-base border-t border-white/10 pt-6 sm:pt-8 w-full max-w-2xl justify-center">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold shrink-0" />
              No obligation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold shrink-0" />
              100% free call
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-gold shrink-0" />
              Limited cohort spots
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}