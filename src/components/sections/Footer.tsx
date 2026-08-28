"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Mail, ArrowRight, CheckCircle2, AlertCircle, ArrowUp, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list! 🎉");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to join waitlist.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <footer className="w-full bg-[#05070E] text-white py-16 px-4 sm:px-6 border-t border-white/10 relative overflow-hidden" id="waitlist">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-brand-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* Brand & Contact Column (Aligned with Navbar Logo) */}
        <div className="md:col-span-5 flex flex-col space-y-6">
          <Link href="/" className="flex-shrink-0 flex items-center h-8 sm:h-9 hover:opacity-90 transition-opacity">
            <Image 
              src="/images/logo.png" 
              alt="Ascend Growth International Logo" 
              width={400} 
              height={120} 
              className="object-contain w-auto h-7 sm:h-8"
              priority
            />
          </Link>
          
          <p className="text-zinc-200 text-sm md:text-base leading-relaxed max-w-sm font-medium">
            Empowering individuals through learning, leadership, mentorship, and commercial coaching.
          </p>

          {/* Live HQ Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E1424] border border-white/12 text-xs font-semibold text-zinc-200 w-max shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
            <span>Nairobi, Kenya</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            <span className="text-[11px] text-emerald-400">Admissions Active</span>
          </div>
          
          <div className="flex flex-col space-y-3.5 text-zinc-100 text-sm md:text-base pt-1">
            <a href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#25D366] transition-colors font-semibold">
              <div className="relative w-4 h-4 shrink-0">
                <Image src="/images/whatsapp.png" alt="WhatsApp" fill className="object-contain" />
              </div>
              <span>+2547 96469972 (WhatsApp / Call)</span>
            </a>
            <a href="mailto:info@ascendgrowth.com" className="flex items-center gap-3 hover:text-brand-gold transition-colors font-semibold">
              <Mail className="w-4 h-4 text-brand-gold shrink-0" /> info@ascendgrowth.com
            </a>
            <a href="https://agi.co.ke" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-gold transition-colors font-semibold">
              <Globe className="w-4 h-4 text-brand-gold shrink-0" /> agi.co.ke
            </a>
          </div>
          
          {/* Official Brand Social Media Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://x.com/AscendGrowth" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on X"
              className="w-10 h-10 rounded-xl bg-[#0E1424] border border-white/12 flex items-center justify-center hover:border-white/40 hover:scale-105 transition-all shadow-sm group p-2 overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image src="/images/x.png" alt="X (Twitter)" fill className="object-contain" />
              </div>
            </a>
            <a 
              href="https://linkedin.com/company/ascend-growth-international" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Connect on LinkedIn"
              className="w-10 h-10 rounded-xl bg-[#0E1424] border border-white/12 flex items-center justify-center hover:border-white/40 hover:scale-105 transition-all shadow-sm group p-2 overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image src="/images/linkedin.png" alt="LinkedIn" fill className="object-contain" />
              </div>
            </a>
            <a 
              href="https://instagram.com/ascendgrowth" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Instagram"
              className="w-10 h-10 rounded-xl bg-[#0E1424] border border-white/12 flex items-center justify-center hover:border-white/40 hover:scale-105 transition-all shadow-sm group p-2 overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image src="/images/instagram.png" alt="Instagram" fill className="object-contain" />
              </div>
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="md:col-span-3 flex flex-col space-y-6 lg:ml-8">
          <h4 className="text-brand-gold text-xs sm:text-sm font-extrabold tracking-widest uppercase">
            Quick Links
          </h4>
          <nav className="flex flex-col space-y-3.5 text-zinc-200 text-sm md:text-base font-semibold">
            <Link href="/" className="hover:text-white hover:translate-x-1 transition-all">Home</Link>
            <Link href="#services" className="hover:text-white hover:translate-x-1 transition-all">Methodology</Link>
            <Link href="#founder" className="hover:text-white hover:translate-x-1 transition-all">About Founder</Link>
            <Link href="#testimonials" className="hover:text-white hover:translate-x-1 transition-all">Real Results</Link>
            <Link href="/book" className="hover:text-white hover:translate-x-1 transition-all">Book Clarity Call</Link>
          </nav>
        </div>

        {/* Waitlist Subscription Column */}
        <div className="md:col-span-4 flex flex-col space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-brand-gold text-xs sm:text-sm font-extrabold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Join the Waitlist</span>
            </div>
            <p className="text-zinc-200 text-sm leading-relaxed font-medium pt-1">
              Join our priority waiting list for upcoming cohorts and get notified before spots open to the general public.
            </p>
          </div>
          
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                required
                disabled={status === "loading" || status === "success"}
                className="w-full bg-[#0E1424] border border-white/20 rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all disabled:opacity-50 shadow-inner"
              />
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success" || !email}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 px-3.5 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center min-w-[42px] font-bold shadow-sm"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {status === "success" && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm mt-1 animate-in fade-in slide-in-from-top-1 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <p>{message}</p>
              </div>
            )}
            
            {status === "error" && (
              <div className="flex items-center gap-2 text-rose-400 text-sm mt-1 animate-in fade-in slide-in-from-top-1 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Bar with Back to Top Launcher */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-300 relative z-10 font-medium">
        <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
          <span className="text-zinc-200">© 2026 Ascend Growth International. All rights reserved.</span>
          <span className="hidden md:inline text-zinc-500">·</span>
          <span className="text-zinc-400">
            Website built by Jackson Ojwang
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
          
          {/* Smooth Back-to-Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E1424] border border-white/15 text-xs font-bold text-brand-gold hover:bg-brand-gold hover:text-zinc-950 transition-all shadow-sm group"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
