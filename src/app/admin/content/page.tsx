"use client";

import { useEffect, useState } from "react";
import { FileEdit, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AgendaStep {
  time: string;
  title: string;
  desc: string;
}

const DEFAULT_AGENDA_STEPS: AgendaStep[] = [
  {
    time: "00 – 10m",
    title: "The Bottleneck Audit",
    desc: "We diagnose where you are stuck—whether it's sending ghosted CVs, low market clarity, or lack of commercial confidence.",
  },
  {
    time: "10 – 20m",
    title: "Skill & Offer Match",
    desc: "We map your natural strengths against our 4-Phase framework to identify the high-ticket service you can monetize immediately.",
  },
  {
    time: "20 – 30m",
    title: "Honest Fit & Action Plan",
    desc: "You get transparent feedback on whether AGI is the right next step. If not, you still leave with a practical roadmap.",
  },
];

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Hero & Cohort ──────────────────────────────────────────────────────────
  const [heroBadgeText, setHeroBadgeText] = useState("Next Cohort Opening Soon");
  const [heroBadgeCta, setHeroBadgeCta] = useState("Join the Waitlist");
  const [heroTitle, setHeroTitle] = useState("Stop Waiting. Start Earning.");
  const [heroDescription, setHeroDescription] = useState(
    "We offer a structured mentorship program for graduates who refuse to let a degree be their ceiling. Mindset, Skills, Income. In that order."
  );

  // ── Contact & Outreach ─────────────────────────────────────────────────────
  const [whatsappPhone, setWhatsappPhone] = useState("254796469972");
  const [whatsappMessage, setWhatsappMessage] = useState(
    "Hello Ascend Growth, I would like to inquire about the mentorship program"
  );
  const [calendlyUrl, setCalendlyUrl] = useState("https://calendly.com/dredyoj/clarity-call");

  // ── Cohort Dates & Program Format ──────────────────────────────────────────
  const [admissionDate, setAdmissionDate] = useState("4 Sep, 2026");
  const [duration, setDuration] = useState("12 weeks");
  const [format, setFormat] = useState("Cohort-based learning");

  // ── Founder Message ────────────────────────────────────────────────────────
  const [founderName, setFounderName] = useState("Purity Gaiti");
  const [founderTitle, setFounderTitle] = useState("Founder & Lead Mentor");
  const [founderParagraph1, setFounderParagraph1] = useState("");
  const [founderParagraph2, setFounderParagraph2] = useState("");
  const [founderQuote, setFounderQuote] = useState("");

  // ── CTA / Apply Section ────────────────────────────────────────────────────
  const [ctaBadgeText, setCtaBadgeText] = useState("Next Cohort Applications Open");
  const [ctaHeadlineLine1, setCtaHeadlineLine1] = useState("No commitment.");
  const [ctaHeadlineLine2, setCtaHeadlineLine2] = useState("No pressure.");
  const [ctaBody, setCtaBody] = useState("");
  const [ctaAgendaFooter, setCtaAgendaFooter] = useState(
    "Strictly capped at 30 minutes · Direct with Founder Purity Gaiti"
  );
  const [agendaSteps, setAgendaSteps] = useState<AgendaStep[]>(DEFAULT_AGENDA_STEPS);

  // ── Load from DB ───────────────────────────────────────────────────────────
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

          const cohortRow = data.find((row) => row.key === "cohort_config");
          if (cohortRow?.value) {
            setAdmissionDate(cohortRow.value.admission_date || "");
            setDuration(cohortRow.value.duration || "");
            setFormat(cohortRow.value.format || "");
          }

          const founderRow = data.find((row) => row.key === "founder_config");
          if (founderRow?.value) {
            setFounderName(founderRow.value.founder_name || "");
            setFounderTitle(founderRow.value.founder_title || "");
            setFounderParagraph1(founderRow.value.paragraph_1 || "");
            setFounderParagraph2(founderRow.value.paragraph_2 || "");
            setFounderQuote(founderRow.value.quote || "");
          }

          const ctaRow = data.find((row) => row.key === "cta_config");
          if (ctaRow?.value) {
            setCtaBadgeText(ctaRow.value.badge_text || "");
            setCtaHeadlineLine1(ctaRow.value.headline_line1 || "");
            setCtaHeadlineLine2(ctaRow.value.headline_line2 || "");
            setCtaBody(ctaRow.value.body || "");
            setCtaAgendaFooter(ctaRow.value.agenda_footer || "");
            if (Array.isArray(ctaRow.value.agenda_steps) && ctaRow.value.agenda_steps.length === 3) {
              setAgendaSteps(ctaRow.value.agenda_steps);
            }
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

  const updateAgendaStep = (index: number, field: keyof AgendaStep, value: string) => {
    setAgendaSteps((prev) => prev.map((step, i) => (i === index ? { ...step, [field]: value } : step)));
  };

  // ── Save Handler ───────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const supabase = createClient();

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

      const { error: cohortErr } = await supabase.from("site_settings").upsert({
        key: "cohort_config",
        value: {
          admission_date: admissionDate,
          duration,
          format,
        },
        updated_at: new Date().toISOString(),
      });
      if (cohortErr) throw cohortErr;

      const { error: founderErr } = await supabase.from("site_settings").upsert({
        key: "founder_config",
        value: {
          founder_name: founderName,
          founder_title: founderTitle,
          paragraph_1: founderParagraph1,
          paragraph_2: founderParagraph2,
          quote: founderQuote,
        },
        updated_at: new Date().toISOString(),
      });
      if (founderErr) throw founderErr;

      const { error: ctaErr } = await supabase.from("site_settings").upsert({
        key: "cta_config",
        value: {
          badge_text: ctaBadgeText,
          headline_line1: ctaHeadlineLine1,
          headline_line2: ctaHeadlineLine2,
          body: ctaBody,
          agenda_footer: ctaAgendaFooter,
          agenda_steps: agendaSteps,
        },
        updated_at: new Date().toISOString(),
      });
      if (ctaErr) throw ctaErr;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to update settings. Please check database permissions.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60";
  const labelClass = "block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1";
  const cardClass = "bg-[#0E1424] border border-white/10 rounded-2xl p-6 space-y-4";
  const subCardClass = "bg-black/20 border border-white/5 rounded-xl p-4 space-y-3";

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <FileEdit className="w-6 h-6 text-brand-gold" />
          <span>Site Content &amp; Announcement Controls</span>
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
        {/* ── Hero & Cohort Section ─────────────────────────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Hero &amp; Cohort Announcement</h2>
            <p className="text-xs text-zinc-400">Controls the prominent banner and headline on the homepage</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Cohort Badge Text</label>
              <input
                type="text"
                value={heroBadgeText}
                onChange={(e) => setHeroBadgeText(e.target.value)}
                placeholder="Next Cohort Opening Soon"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Badge CTA Text</label>
              <input
                type="text"
                value={heroBadgeCta}
                onChange={(e) => setHeroBadgeCta(e.target.value)}
                placeholder="Join the Waitlist"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Main Hero Title</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Stop Waiting. Start Earning."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold outline-none focus:border-brand-gold/60"
            />
          </div>

          <div>
            <label className={labelClass}>Hero Subtitle / Description</label>
            <textarea
              rows={3}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className={`${inputClass} leading-relaxed`}
            />
          </div>
        </div>

        {/* ── Contact & Calendar Channels ───────────────────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Contact &amp; Outreach Channels</h2>
            <p className="text-xs text-zinc-400">Configure phone and scheduling redirects across buttons</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>WhatsApp Phone Number (with Country Code)</label>
              <input
                type="text"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="254796469972"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-mono outline-none focus:border-brand-gold/60"
              />
            </div>

            <div>
              <label className={labelClass}>Calendly URL</label>
              <input
                type="url"
                value={calendlyUrl}
                onChange={(e) => setCalendlyUrl(e.target.value)}
                placeholder="https://calendly.com/dredyoj/clarity-call"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Default WhatsApp Pre-filled Inquire Message</label>
            <input
              type="text"
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Hello Ascend Growth, I would like to inquire about the mentorship program"
              className={inputClass}
            />
          </div>
        </div>

        {/* ── Section A: Cohort Dates & Program Format ──────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Cohort Dates &amp; Program Format</h2>
            <p className="text-xs text-zinc-400">Controls the overview bar visible below the hero section</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Admission Closes Date</label>
              <input
                type="text"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                placeholder="4 Sep, 2026"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Programme Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="12 weeks"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Learning Format</label>
              <input
                type="text"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                placeholder="Cohort-based learning"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* ── Section B: Founder Message ────────────────────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Founder Message Section</h2>
            <p className="text-xs text-zinc-400">
              Controls the bio, quote, and name displayed in the founder section
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Founder Full Name</label>
              <input
                type="text"
                value={founderName}
                onChange={(e) => setFounderName(e.target.value)}
                placeholder="Purity Gaiti"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Founder Title</label>
              <input
                type="text"
                value={founderTitle}
                onChange={(e) => setFounderTitle(e.target.value)}
                placeholder="Founder & Lead Mentor"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Bio Paragraph 1</label>
            <textarea
              rows={3}
              value={founderParagraph1}
              onChange={(e) => setFounderParagraph1(e.target.value)}
              className={`${inputClass} leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelClass}>Bio Paragraph 2</label>
            <textarea
              rows={3}
              value={founderParagraph2}
              onChange={(e) => setFounderParagraph2(e.target.value)}
              className={`${inputClass} leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelClass}>Signature Quote</label>
            <textarea
              rows={2}
              value={founderQuote}
              onChange={(e) => setFounderQuote(e.target.value)}
              className={`${inputClass} leading-relaxed`}
            />
          </div>
        </div>

        {/* ── Section C: CTA / Apply Section ───────────────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">CTA &amp; Apply Section</h2>
            <p className="text-xs text-zinc-400">
              Controls the headline, body, and agenda steps of the booking call-to-action section
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Application Badge Text</label>
              <input
                type="text"
                value={ctaBadgeText}
                onChange={(e) => setCtaBadgeText(e.target.value)}
                placeholder="Next Cohort Applications Open"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Headline Line 1</label>
              <input
                type="text"
                value={ctaHeadlineLine1}
                onChange={(e) => setCtaHeadlineLine1(e.target.value)}
                placeholder="No commitment."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Headline Line 2</label>
            <input
              type="text"
              value={ctaHeadlineLine2}
              onChange={(e) => setCtaHeadlineLine2(e.target.value)}
              placeholder="No pressure."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Body Copy</label>
            <textarea
              rows={3}
              value={ctaBody}
              onChange={(e) => setCtaBody(e.target.value)}
              className={`${inputClass} leading-relaxed`}
            />
          </div>

          <div>
            <label className={labelClass}>Agenda Footer Note</label>
            <input
              type="text"
              value={ctaAgendaFooter}
              onChange={(e) => setCtaAgendaFooter(e.target.value)}
              placeholder="Strictly capped at 30 minutes · Direct with Founder Purity Gaiti"
              className={inputClass}
            />
          </div>

          {/* Agenda Steps */}
          <div className="space-y-3 pt-1">
            <p className={labelClass}>30-Minute Agenda Steps</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {agendaSteps.map((step, index) => (
                <div key={index} className={subCardClass}>
                  <p className="text-[11px] font-black uppercase tracking-widest text-brand-gold">
                    Step {index + 1}
                  </p>
                  <div>
                    <label className={labelClass}>Time Slot</label>
                    <input
                      type="text"
                      value={step.time}
                      onChange={(e) => updateAgendaStep(index, "time", e.target.value)}
                      placeholder="00 – 10m"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Step Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateAgendaStep(index, "title", e.target.value)}
                      placeholder="The Bottleneck Audit"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={2}
                      value={step.desc}
                      onChange={(e) => updateAgendaStep(index, "desc", e.target.value)}
                      className={`${inputClass} leading-relaxed`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Save Bar ──────────────────────────────────────────────────────── */}
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
