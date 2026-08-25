"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Globe, Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    <footer className="w-full bg-[#FAFAFA] py-16 px-4 md:px-8 border-t border-zinc-200" id="waitlist">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
        
        <div className="md:col-span-5 flex flex-col space-y-8">
          <Link href="/" className="flex-shrink-0 flex items-center h-8 md:h-10">
            <Image 
              src="/images/logo.png" 
              alt="Ascend Growth International Logo" 
              width={400} 
              height={120} 
              className="object-contain w-auto h-full"
              priority
            />
          </Link>
          
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-sm">
            Empowering individuals through learning, leadership, mentorship, and coaching.
          </p>
          
          <div className="flex flex-col space-y-4 text-zinc-700 text-sm md:text-base">
            <a href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-zinc-950 transition-colors font-medium">
              <Phone className="w-5 h-5 text-zinc-500" /> +2547 96469972 (WhatsApp / Call)
            </a>
            <a href="mailto:info@ascendgrowth.com" className="flex items-center gap-3 hover:text-zinc-950 transition-colors font-medium">
              <Mail className="w-5 h-5 text-zinc-500" /> info@ascendgrowth.com
            </a>
            <a href="https://agi.co.ke" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-zinc-950 transition-colors font-medium">
              <Globe className="w-5 h-5 text-zinc-500" /> agi.co.ke
            </a>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors shadow-xs">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors shadow-xs">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-900 hover:text-white transition-colors shadow-xs">
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col space-y-6 lg:ml-8">
          <h4 className="text-zinc-900 text-sm font-bold tracking-widest uppercase">
            Quick Links
          </h4>
          <nav className="flex flex-col space-y-4 text-zinc-600 text-sm md:text-base font-medium">
            <Link href="#" className="hover:text-zinc-950 hover:translate-x-1 transition-all">Home</Link>
            <Link href="#services" className="hover:text-zinc-950 hover:translate-x-1 transition-all">How It Works</Link>
            <Link href="#testimonials" className="hover:text-zinc-950 hover:translate-x-1 transition-all">Success Stories</Link>
            <a href="https://wa.me/254796469972" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 hover:translate-x-1 transition-all">Contact Us</a>
          </nav>
        </div>

        <div className="md:col-span-4 flex flex-col space-y-6">
          <h4 className="text-zinc-900 text-sm font-bold tracking-widest uppercase">
            Join the Waitlist
          </h4>
          <p className="text-zinc-600 text-sm leading-relaxed">
            Join our waiting list for upcoming cohorts and get notified before spots open to the public.
          </p>
          
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                required
                disabled={status === "loading" || status === "success"}
                className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all disabled:opacity-50 shadow-xs"
              />
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success" || !email}
                className="absolute right-1 top-1 bottom-1 bg-brand-gold hover:bg-brand-gold-hover text-zinc-950 p-2 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center min-w-[40px] font-bold"
              >
                {status === "loading" ? (
                  <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {status === "success" && (
              <div className="flex items-center gap-2 text-emerald-600 text-sm mt-1 animate-in fade-in slide-in-from-top-1 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <p>{message}</p>
              </div>
            )}
            
            {status === "error" && (
              <div className="flex items-center gap-2 text-rose-600 text-sm mt-1 animate-in fade-in slide-in-from-top-1 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
        <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
          <span>© 2026 Ascend Growth International. All rights reserved.</span>
          <span className="hidden md:inline">·</span>
          <span>
            Built for High-Growth Cohorts
          </span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="#" className="hover:text-zinc-950 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-zinc-950 transition-colors">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}