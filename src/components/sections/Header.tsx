"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#problem", label: "Problem" },
  { href: "#services", label: "How it works" },
  { href: "#founder", label: "Founder story" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#waitlist", label: "Waitlist" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsMobileMenuOpen(false);
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }

      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const headerOffset = 90;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        // Update URL without triggering reload
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Floating Glass Island Pill Container */}
        <div className="w-full flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 rounded-full bg-[#070A12]/85 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          
          {/* Minimalist Golden Emblem + Wordmark */}
          <Link href="/" onClick={(e) => handleNavClick(e, "/")} className="flex-shrink-0 flex items-center gap-2.5 hover:opacity-90 transition-opacity group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
              <Image 
                src="/images/favicon-mark.png" 
                alt="Ascend Growth International" 
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase font-sans">
              Ascend Growth
            </span>
          </Link>

          {/* Centered Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-7 lg:gap-9 text-xs sm:text-sm font-semibold tracking-wide text-white">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-white hover:text-brand-gold transition-colors duration-200 py-1 cursor-pointer font-medium"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA pinned to the far right of the glass island (Desktop Only) */}
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

          {/* Clean Mobile Menu Toggle (No floating whatsapp icon) */}
          <button
            className="md:hidden p-2 text-white focus:outline-none rounded-full hover:bg-white/10 transition-colors"
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
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-white hover:text-brand-gold hover:bg-white/5 transition-colors w-full text-center py-2.5 rounded-lg font-semibold cursor-pointer"
              >
                {label}
              </a>
            ))}

            {/* Mobile Action in Drawer */}
            <div className="mt-3 w-full pt-3 border-t border-white/10">
              <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white w-full rounded-full py-3.5 font-bold shadow-[0_4px_15px_rgba(37,211,102,0.35)] text-xs">
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