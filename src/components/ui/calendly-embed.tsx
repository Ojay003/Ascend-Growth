"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface CalendlyEmbedProps {
  url?: string;
  className?: string;
}

export function CalendlyEmbed({
  url = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/dredyoj/clarity-call",
  className = "",
}: CalendlyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Append light theme styling parameters matching #FAFAFA palette
  const themedUrl = `${url}${
    url.includes("?") ? "&" : "?"
  }background_color=fafafa&text_color=09090b&primary_color=d9921b&hide_gdpr_banner=1`;

  useEffect(() => {
    // If iframe is already present or loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAFAFA] gap-4 p-8 rounded-2xl">
          <div className="w-10 h-10 border-3 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
          <p className="text-sm font-medium text-zinc-600 animate-pulse">
            Loading secure booking calendar...
          </p>
        </div>
      )}

      {/* Calendly Inline Widget */}
      <div
        className="calendly-inline-widget w-full rounded-2xl"
        data-url={themedUrl}
        style={{ minWidth: "320px", height: "700px" }}
      />

      {/* Fallback standard iframe in case script is blocked */}
      <noscript>
        <iframe
          src={themedUrl}
          width="100%"
          height="700"
          frameBorder="0"
          title="Book a Free Clarity Call"
          className="rounded-2xl"
        />
      </noscript>

      {/* Load Calendly External Widget Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
