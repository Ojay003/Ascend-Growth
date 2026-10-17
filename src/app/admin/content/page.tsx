"use client";

import { useEffect, useState } from "react";
import { FileEdit, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Editable Form Fields
  const [heroBadgeText, setHeroBadgeText] = useState("Next Cohort Opening Soon");
  const [heroBadgeCta, setHeroBadgeCta] = useState("Join the Waitlist");
  const [heroTitle, setHeroTitle] = useState("Stop Waiting. Start Earning.");
  const [heroDescription, setHeroDescription] = useState(
    "We offer a structured mentorship program for graduates who refuse to let a degree be their ceiling. Mindset, Skills, Income. In that order."
  );
  const [whatsappPhone, setWhatsappPhone] = useState("254796469972");
  const [whatsappMessage, setWhatsappMessage] = useState(
    "Hello Ascend Growth, I would like to inquire about the mentorship program"
  );
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/dredyoj/clarity-call");

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase.from("site_settings").select("*");

        if (data && !error) {
          const heroRow = data.find((row) => row.key === "hero_config");
          if (heroRow?.value) {
            setHeroBadgeText(heroRow.value.badge_text || "");
            setHeroBadgeCta(heroRow.value.badge_cta || "");
            setHeroTitle(heroRow.value.title || "");
            setHeroDescription(heroRow.value.description || "");
          }

          const contactRow = data.find((row) => row.key === "contact_config");
          if (contactRow?.value) {
            setWhatsappPhone(contactRow.value.whatsapp_phone || "");
            setWhatsappMessage(contactRow.value.whatsapp_default_message || "");
            setCalendlyUrl(contactRow.value.calendly_url || "");
          }
        }
      } catch (err) {
        console.error("Failed to load content settings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const supabase = createClient();

      // Upsert hero_config
      const { error: heroErr } = await supabase.from("site_settings").upsert({
        key: "hero_config",
        value: {
          badge_text: heroBadgeText,
          badge_cta: heroBadgeCta,
          badge_href: "#waitlist",
          title: heroTitle,
          description: heroDescription,
        },
        updated_at: new Date().toISOString(),
      });

      if (heroErr) throw heroErr;

      // Upsert contact_config
      const { error: contactErr } = await supabase.from("site_settings").upsert({
        key: "contact_config",
        value: {
          whatsapp_phone: whatsappPhone,
          whatsapp_default_message: whatsappMessage,
          calendly_url: calendlyUrl,
        },
        updated_at: new Date().toISOString(),
      });

      if (contactErr) throw contactErr;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to update settings. Please check database permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <FileEdit className="w-6 h-6 text-brand-gold" />
          <span>Site Content & Announcement Controls</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Modify the live copy, cohort banners, and communication links without editing any source code.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Content updated successfully! Changes are live immediately.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero & Cohort Section */}
        <div className="bg-[#0E1424] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Hero & Cohort Announcement</h2>
            <p className="text-xs text-zinc-400">Controls the prominent banner and headline on the homepage</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Cohort Badge Text
              </label>
              <input
                type="text"
                value={heroBadgeText}
                onChange={(e) => setHeroBadgeText(e.target.value)}
                placeholder="Next Cohort Opening Soon"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Badge CTA Text
              </label>
              <input
                type="text"
                value={heroBadgeCta}
                onChange={(e) => setHeroBadgeCta(e.target.value)}
                placeholder="Join the Waitlist"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Main Hero Title
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Stop Waiting. Start Earning."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold outline-none focus:border-brand-gold/60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Hero Subtitle / Description
            </label>
            <textarea
              rows={3}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-brand-gold/60"
            />
          </div>
        </div>

        {/* Contact & Calendar Channels */}
        <div className="bg-[#0E1424] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Contact & Outreach Channels</h2>
            <p className="text-xs text-zinc-400">Configure phone and scheduling redirects across buttons</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="254796469972"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono outline-none focus:border-brand-gold/60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Calendly URL
              </label>
              <input
                type="url"
                value={calendlyUrl}
                onChange={(e) => setCalendlyUrl(e.target.value)}
                placeholder="https://calendly.com/dredyoj/clarity-call"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Default WhatsApp Pre-filled Inquire Message
            </label>
            <input
              type="text"
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Hello Ascend Growth, I would like to inquire about the mentorship program"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-brand-gold via-[#e6c15c] to-brand-gold text-black hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-brand-gold/20 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Publish Live Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
