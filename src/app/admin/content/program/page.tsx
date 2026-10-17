"use client";

import { useEffect, useState } from "react";
import { Layers, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ICON_OPTIONS = ["BrainCircuit", "Zap", "TrendingUp", "Repeat2"] as const;
type IconName = (typeof ICON_OPTIONS)[number];

interface Phase {
  id: number;
  step: string;
  weeks: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: IconName;
  deliverables: [string, string, string];
  milestone: string;
}

const DEFAULT_PHASES: Phase[] = [
  {
    id: 0,
    step: "Phase 01",
    weeks: "Weeks 1-3",
    title: "Mindset Calibration",
    shortDesc: "Rewire the graduate mindset and unlearn the 'wait-to-be-hired' passive mentality.",
    fullDesc:
      "Before you learn to sell or invoice, you must shatter the academic illusion. We eliminate imposter syndrome, instill daily discipline, and train you to think like an independent service provider rather than a hopeful applicant.",
    iconName: "BrainCircuit",
    deliverables: [
      "Deconstruct the 'Employee Mindset' & build unshakeable confidence",
      "Daily high-performance routines & rejection desensitization",
      "Define your market positioning and high-leverage service offering",
    ],
    milestone: "Graduation from theoretical student to active market operator.",
  },
  {
    id: 1,
    step: "Phase 02",
    weeks: "Weeks 4-6",
    title: "High-Value Market Skills",
    shortDesc: "Acquire the practical digital skills, direct outreach, and sales mastery the market pays for.",
    fullDesc:
      "No academic theory. You will master the exact skills businesses pay top-dollar for: direct DM & email outreach, objection handling, high-converting offer crafting, and effective client communication.",
    iconName: "Zap",
    deliverables: [
      "Master high-ticket closing & live sales roleplay simulations",
      "Build a client-attracting portfolio & personalized outreach scripts",
      "Identify high-budget decision makers and craft irresistible proposals",
    ],
    milestone: "A battle-tested pitch deck and 50+ qualified prospects contacted.",
  },
  {
    id: 2,
    step: "Phase 03",
    weeks: "Weeks 7-9",
    title: "Real-World Monetisation",
    shortDesc: "Pitch live prospects, handle objections, and land your first paying client before cohort ends.",
    fullDesc:
      "This is where theory turns into bank alerts. Under direct 1-on-1 mentorship, you will conduct live discovery calls, pitch your services to real businesses, and close your first paying client.",
    iconName: "TrendingUp",
    deliverables: [
      "Live call reviews & real-time pitch feedback from mentor leads",
      "Negotiating payment terms, retainers, and closing deals",
      "Deploy your first service delivery without overwhelming yourself",
    ],
    milestone: "Securing your first closed client and independent invoice paid.",
  },
  {
    id: 3,
    step: "Phase 04",
    weeks: "Weeks 10-12",
    title: "Scaling & Independence",
    shortDesc: "Build reliable systems to turn one-off gigs into predictable, recurring monthly income.",
    fullDesc:
      "Transform an initial client win into sustainable financial freedom. Build automated referral engines, structure retainer agreements, and master the art of long-term career independence.",
    iconName: "Repeat2",
    deliverables: [
      "Transition from one-off gigs to recurring monthly retainers",
      "Systematized referral generation & network leverage",
      "12-Month Post-Cohort Independence & Growth Blueprint",
    ],
    milestone: "A repeatable revenue engine and lifetime alumni network access.",
  },
];

const DEFAULT_PILLS: [string, string, string, string] = [
  "1-on-1 Mentor Guidance",
  "Weekly Accountability Reviews",
  "Live Sales Role-Plays",
  "Real Client Invoicing",
];

export default function ProgramEditorPage() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Section-level fields ───────────────────────────────────────────────────
  const [sectionBadge, setSectionBadge] = useState("The Framework");
  const [heading, setHeading] = useState("The 4-Phase Ascend Methodology");
  const [subheading, setSubheading] = useState(
    "A structured 12-week intensive cohort designed to transform stuck graduates into confident, self-reliant professionals."
  );

  // ── Deliverables pills ─────────────────────────────────────────────────────
  const [pills, setPills] = useState<[string, string, string, string]>([...DEFAULT_PILLS]);

  // ── Phases ─────────────────────────────────────────────────────────────────
  const [phases, setPhases] = useState<Phase[]>(DEFAULT_PHASES);

  // ── Load from DB ───────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .eq("key", "program_config")
          .single();

        if (data && !error && data.value) {
          const v = data.value;
          setSectionBadge(v.section_badge || "");
          setHeading(v.heading || "");
          setSubheading(v.subheading || "");
          if (Array.isArray(v.deliverables_pills) && v.deliverables_pills.length === 4) {
            setPills(v.deliverables_pills as [string, string, string, string]);
          }
          if (Array.isArray(v.phases) && v.phases.length === 4) {
            setPhases(v.phases as Phase[]);
          }
        }
      } catch (err) {
        console.error("Failed to load program config:", err);
      }
    }
    load();
  }, []);

  // ── Update helpers ─────────────────────────────────────────────────────────
  const updatePhase = (phaseId: number, field: keyof Omit<Phase, "id" | "deliverables">, value: string) => {
    setPhases((prev) =>
      prev.map((p) => (p.id === phaseId ? { ...p, [field]: value } : p))
    );
  };

  const updatePhaseDeliverable = (phaseId: number, index: number, value: string) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.id !== phaseId) return p;
        const updated = [...p.deliverables] as [string, string, string];
        updated[index] = value;
        return { ...p, deliverables: updated };
      })
    );
  };

  const updatePill = (index: number, value: string) => {
    setPills((prev) => {
      const next = [...prev] as [string, string, string, string];
      next[index] = value;
      return next;
    });
  };

  // ── Save Handler ───────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const supabase = createClient();
      const { error: saveErr } = await supabase.from("site_settings").upsert({
        key: "program_config",
        value: {
          section_badge: sectionBadge,
          heading,
          subheading,
          deliverables_pills: pills,
          phases,
        },
        updated_at: new Date().toISOString(),
      });
      if (saveErr) throw saveErr;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to save program config.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60";
  const labelClass = "block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1";
  const cardClass = "bg-[#0E1424] border border-white/10 rounded-2xl p-6 space-y-4";

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <Layers className="w-6 h-6 text-brand-gold" />
          <span>4-Phase Program Editor</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Edit the 12-week framework structure displayed on the homepage services section.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Program config saved successfully! Changes are live immediately.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Section-level fields ──────────────────────────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Section Header</h2>
            <p className="text-xs text-zinc-400">The top badge, title, and subtitle of the services section</p>
          </div>

          <div>
            <label className={labelClass}>Section Badge</label>
            <input
              type="text"
              value={sectionBadge}
              onChange={(e) => setSectionBadge(e.target.value)}
              placeholder="The Framework"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="The 4-Phase Ascend Methodology"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm font-bold outline-none focus:border-brand-gold/60"
            />
          </div>

          <div>
            <label className={labelClass}>Subheading</label>
            <textarea
              rows={2}
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className={`${inputClass} leading-relaxed`}
            />
          </div>
        </div>

        {/* ── Deliverables Pills ────────────────────────────────────────────── */}
        <div className={cardClass}>
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Deliverables Summary Pills</h2>
            <p className="text-xs text-zinc-400">
              The four feature pills displayed beneath the section heading
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pills.map((pill, i) => (
              <div key={i}>
                <label className={labelClass}>Pill {i + 1}</label>
                <input
                  type="text"
                  value={pill}
                  onChange={(e) => updatePill(i, e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Phase Cards ───────────────────────────────────────────────────── */}
        {phases.map((phase) => (
          <div key={phase.id} className={cardClass}>
            <div className="border-b border-white/10 pb-3 flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-lg">
                {phase.step}
              </span>
              <div>
                <h2 className="text-base font-bold text-white">{phase.title}</h2>
                <p className="text-xs text-zinc-400">{phase.weeks}</p>
              </div>
            </div>

            {/* Row: step (readonly), weeks, title */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Step Label</label>
                <input
                  type="text"
                  value={phase.step}
                  readOnly
                  className={`${inputClass} opacity-50 cursor-not-allowed`}
                />
              </div>
              <div>
                <label className={labelClass}>Weeks</label>
                <input
                  type="text"
                  value={phase.weeks}
                  onChange={(e) => updatePhase(phase.id, "weeks", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phase Title</label>
                <input
                  type="text"
                  value={phase.title}
                  onChange={(e) => updatePhase(phase.id, "title", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Icon selector */}
            <div>
              <label className={labelClass}>Icon</label>
              <select
                value={phase.iconName}
                onChange={(e) => updatePhase(phase.id, "iconName", e.target.value as IconName)}
                className={`${inputClass} cursor-pointer`}
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>

            {/* Short description */}
            <div>
              <label className={labelClass}>Short Description (tab selector)</label>
              <textarea
                rows={2}
                value={phase.shortDesc}
                onChange={(e) => updatePhase(phase.id, "shortDesc", e.target.value)}
                className={`${inputClass} leading-relaxed`}
              />
            </div>

            {/* Full description */}
            <div>
              <label className={labelClass}>Full Description</label>
              <textarea
                rows={4}
                value={phase.fullDesc}
                onChange={(e) => updatePhase(phase.id, "fullDesc", e.target.value)}
                className={`${inputClass} leading-relaxed`}
              />
            </div>

            {/* Deliverables */}
            <div className="space-y-2">
              <label className={labelClass}>Key Deliverables</label>
              <div className="space-y-2">
                {phase.deliverables.map((d, i) => (
                  <div key={i}>
                    <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                      Deliverable {i + 1}
                    </label>
                    <input
                      type="text"
                      value={d}
                      onChange={(e) => updatePhaseDeliverable(phase.id, i, e.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone */}
            <div>
              <label className={labelClass}>Phase Milestone / Goal</label>
              <input
                type="text"
                value={phase.milestone}
                onChange={(e) => updatePhase(phase.id, "milestone", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        ))}

        {/* ── Save Bar ──────────────────────────────────────────────────────── */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-brand-gold via-[#e6c15c] to-brand-gold text-black hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-brand-gold/20 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Publish Program Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
