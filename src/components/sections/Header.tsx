"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Floating Glass Island Pill Container */}
        <div className="w-full flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 rounded-full bg-[#070A12]/85 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          
          {/* Logo pinned on the far left of the glass island */}
          <Link href="/" className="flex-shrink-0 flex items-center h-8 sm:h-9 hover:opacity-90 transition-opacity">
            <Image 
              src="/images/logo.png" 
              alt="Ascend Growth International" 
              width={400} 
              height={120} 
              className="object-contain w-auto h-7 sm:h-8"
              priority
            />
          </Link>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9 text-xs sm:text-sm font-semibold tracking-wide text-white">
            {[
              { href: "/", label: "Home" },
              { href: "#services", label: "Methodology" },
              { href: "#founder", label: "About Founder" },
              { href: "#testimonials", label: "Real Results" },
              { href: "#waitlist", label: "Join Waitlist" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-brand-gold transition-colors duration-200 py-1"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp CTA pinned to the far right of the glass island */}
          <Button
            asChild
            className="hidden sm:inline-flex bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-4 sm:px-5 py-2 shadow-[0_4px_15px_rgba(37,211,102,0.35)] text-xs transition-all hover:scale-105"
          >
            <a
              href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <div className="relative w-4 h-4">
                <Image
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                  fill
                  className="object-contain"
                />
              </div>
              <span>WhatsApp</span>
            </a>
          </Button>

          {/* Mobile WhatsApp Quick Icon */}
          <a
            href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-1.5 rounded-full bg-[#25D366] text-white shadow-md hover:scale-105 transition-transform"
            aria-label="Chat on WhatsApp"
          >
            <div className="relative w-5 h-5">
              <Image
                src="/images/whatsapp.png"
                alt="WhatsApp"
                fill
                className="object-contain"
              />
            </div>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white focus:outline-none rounded-full hover:bg-white/10 transition-colors ml-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay Dropdown */}
      {isMobileMenuOpen && (
        <div className="pointer-events-auto md:hidden max-w-sm mx-auto mt-2 rounded-2xl bg-[#070A12]/95 border border-white/15 shadow-2xl backdrop-blur-2xl p-5 text-center animate-in slide-in-from-top-2">
          <nav className="flex flex-col items-center gap-2 text-sm font-medium text-white">
            {[
              { href: "/", label: "Home" },
              { href: "#services", label: "Methodology" },
              { href: "#founder", label: "About Founder" },
              { href: "#testimonials", label: "Real Results" },
              { href: "#waitlist", label: "Join Waitlist" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={toggleMenu}
                className="text-white hover:text-brand-gold hover:bg-white/5 transition-colors w-full text-center py-2.5 rounded-lg font-semibold"
              >
                {label}
              </Link>
            ))}

            {/* Mobile Action in Drawer */}
            <div className="mt-3 w-full pt-3 border-t border-white/10">
              <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full rounded-full py-5 font-bold shadow-[0_4px_15px_rgba(37,211,102,0.35)] text-xs">
                <a
                  href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <div className="relative w-4 h-4">
                    <Image
                      src="/images/whatsapp.png"
                      alt="WhatsApp"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}