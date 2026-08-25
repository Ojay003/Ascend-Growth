"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-zinc-200/90 bg-[#FAFAFA]/90 shadow-sm backdrop-blur-md"
          : "border-zinc-200/60 bg-[#FAFAFA]/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex-shrink-0 flex items-center h-8 sm:h-10">
            <Image
              src="/images/logo.png"
              alt="Ascend Growth International Logo"
              width={400}
              height={120}
              className="object-contain w-auto h-7 sm:h-9"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link href="/" className="hover:text-zinc-950 transition-colors duration-200">Home</Link>
            <Link href="#services" className="hover:text-zinc-950 transition-colors duration-200">Methodology</Link>
            <Link href="#founder" className="hover:text-zinc-950 transition-colors duration-200">About Founder</Link>
            <Link href="#testimonials" className="hover:text-zinc-950 transition-colors duration-200">Results</Link>
            <Link href="#waitlist" className="hover:text-zinc-950 transition-colors duration-200">Waitlist</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button asChild className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-full px-5 py-2 sm:px-6 shadow-sm text-xs sm:text-sm transition-all">
              <a href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-zinc-700 focus:outline-none rounded-lg hover:bg-zinc-200/60 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-zinc-900" /> : <Menu className="w-6 h-6 text-zinc-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#FAFAFA] border-b border-zinc-200 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2">
          <nav className="flex flex-col items-center py-6 px-4 gap-1 text-base font-medium text-zinc-800">
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
                className="hover:text-brand-gold hover:bg-zinc-100 transition-colors w-full text-center py-3 rounded-lg text-sm font-semibold"
              >
                {label}
              </Link>
            ))}

            {/* Mobile-only CTA */}
            <div className="sm:hidden mt-4 w-full pt-3 border-t border-zinc-200">
              <Button asChild className="bg-[#25D366] hover:bg-[#20ba59] text-white w-full rounded-xl py-6 font-semibold transition-colors shadow-md">
                <a href="https://wa.me/254796469972?text=Hello%20Ascend%20Growth%2C%20I%20would%20like%20to%20inquire%20about%20the%20mentorship%20program" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}