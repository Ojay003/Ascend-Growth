"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down a bit
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumber = "254796469972";
  const message = "Hello Ascend Growth, I would like to inquire about the mentorship program.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative w-8 h-8 sm:w-9 sm:h-9">
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp Chat"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 px-4 py-2 bg-zinc-900 text-white text-xs sm:text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-2xl border border-zinc-800">
        Chat on WhatsApp
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-[6px] border-transparent border-l-zinc-900" />
      </div>
      
      {/* Pulse ring effect */}
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-25 pointer-events-none" />
    </a>
  );
}
