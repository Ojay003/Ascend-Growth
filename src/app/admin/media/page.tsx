"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, CheckCircle2, AlertCircle, Info, Upload, RotateCcw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface MediaConfig {
  founder_image_url: string | null;
  message_image_url: string | null;
}

const DEFAULT_MEDIA: MediaConfig = {
  founder_image_url: null,
  message_image_url: null,
};

type SlotKey = keyof MediaConfig;

interface SlotState {
  uploading: boolean;
  success: string | null;
  error: string | null;
}

export default function MediaPage() {
  const [mediaConfig, setMediaConfig] = useState<MediaConfig>(DEFAULT_MEDIA);
  const [loading, setLoading] = useState(true);

  const [founderFile, setFounderFile] = useState<File | null>(null);
  const [messageFile, setMessageFile] = useState<File | null>(null);

  const [founderSlot, setFounderSlot] = useState<SlotState>({ uploading: false, success: null, error: null });
  const [messageSlot, setMessageSlot] = useState<SlotState>({ uploading: false, success: null, error: null });

  const founderInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  // ── Load media_config from DB ──────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .eq("key", "media_config")
          .single();

        if (data && !error && data.value) {
          setMediaConfig({
            founder_image_url: data.value.founder_image_url ?? null,
            message_image_url: data.value.message_image_url ?? null,
          });
        }
      } catch (err) {
        console.error("Failed to load media config:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // ── Generic upsert helper ──────────────────────────────────────────────────
  const saveMediaConfig = async (updated: MediaConfig) => {
    const supabase = createClient();
    const { error } = await supabase.from("site_settings").upsert({
      key: "media_config",
      value: updated,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    setMediaConfig(updated);
  };

  // ── Upload & Apply ─────────────────────────────────────────────────────────
  const handleUpload = async (
    slot: "founder" | "message",
    file: File | null,
    setSlot: React.Dispatch<React.SetStateAction<SlotState>>
  ) => {
    if (!file) {
      setSlot((s) => ({ ...s, error: "Please select a file first." }));
      return;
    }

    setSlot({ uploading: true, success: null, error: null });

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `images/${slot}-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-media")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-media").getPublicUrl(path);

      const urlKey: SlotKey = slot === "founder" ? "founder_image_url" : "message_image_url";
      const updated: MediaConfig = { ...mediaConfig, [urlKey]: publicUrl };
      await saveMediaConfig(updated);

      setSlot({ uploading: false, success: "Image uploaded and applied successfully!", error: null });
      setTimeout(() => setSlot((s) => ({ ...s, success: null })), 5000);

      // Clear file selection
      if (slot === "founder") {
        setFounderFile(null);
        if (founderInputRef.current) founderInputRef.current.value = "";
      } else {
        setMessageFile(null);
        if (messageInputRef.current) messageInputRef.current.value = "";
      }
    } catch (err: any) {
      setSlot({ uploading: false, success: null, error: err?.message || "Upload failed. Please try again." });
    }
  };

  // ── Reset to Default ───────────────────────────────────────────────────────
  const handleReset = async (
    slot: "founder" | "message",
    setSlot: React.Dispatch<React.SetStateAction<SlotState>>
  ) => {
    setSlot({ uploading: true, success: null, error: null });
    try {
      const urlKey: SlotKey = slot === "founder" ? "founder_image_url" : "message_image_url";
      const updated: MediaConfig = { ...mediaConfig, [urlKey]: null };
      await saveMediaConfig(updated);
      setSlot({ uploading: false, success: "Reset to default.", error: null });
      setTimeout(() => setSlot((s) => ({ ...s, success: null })), 3000);
    } catch (err: any) {
      setSlot({ uploading: false, success: null, error: err?.message || "Reset failed." });
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60 font-mono";
  const cardClass = "bg-[#0E1424] border border-white/10 rounded-2xl p-6 space-y-5";

  const ImageSlot = ({
    slotKey,
    label,
    description,
    file,
    setFile,
    slotState,
    setSlotState,
    inputRef,
    slotName,
  }: {
    slotKey: SlotKey;
    label: string;
    description: string;
    file: File | null;
    setFile: (f: File | null) => void;
    slotState: SlotState;
    setSlotState: React.Dispatch<React.SetStateAction<SlotState>>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    slotName: "founder" | "message";
  }) => {
    const currentUrl = mediaConfig[slotKey];

    return (
      <div className={cardClass}>
        <div className="border-b border-white/10 pb-3">
          <h2 className="text-base font-bold text-white">{label}</h2>
          <p className="text-xs text-zinc-400">{description}</p>
        </div>

        {/* Preview */}
        <div className="flex items-start gap-5">
          <div className="w-28 h-28 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            {currentUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentUrl}
                alt={label}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-600">
                <ImageIcon className="w-8 h-8" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">No Image</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                Current URL
              </label>
              <input
                type="text"
                readOnly
                value={currentUrl ?? ""}
                placeholder="No image assigned"
                className={`${inputClass} opacity-60 cursor-default`}
              />
            </div>
          </div>
        </div>

        {/* Upload section */}
        <div className="space-y-3 pt-1">
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Upload New Image
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-400 cursor-pointer hover:border-brand-gold/40 transition-colors">
              <Upload className="w-4 h-4 text-zinc-500 shrink-0" />
              <span className="truncate">{file ? file.name : "Choose image file…"}</span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <button
              type="button"
              disabled={slotState.uploading || !file}
              onClick={() => handleUpload(slotName, file, setSlotState)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-gold via-[#e6c15c] to-brand-gold text-black hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-brand-gold/20 cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              {slotState.uploading ? "Uploading…" : "Upload & Apply"}
            </button>

            <button
              type="button"
              disabled={slotState.uploading || !currentUrl}
              onClick={() => handleReset(slotName, setSlotState)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          {slotState.success && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{slotState.success}</span>
            </div>
          )}

          {slotState.error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{slotState.error}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <ImageIcon className="w-6 h-6 text-brand-gold" />
          <span>Media &amp; Image Manager</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Upload and manage site images. Changes apply instantly without redeployment.
        </p>
      </div>

      {/* Important notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <p className="font-bold text-amber-300">Storage Bucket Required</p>
          <p>
            The <code className="bg-amber-500/20 px-1.5 py-0.5 rounded font-mono text-amber-100">site-media</code>{" "}
            storage bucket must be created in your Supabase dashboard under{" "}
            <span className="font-semibold">Storage → New Bucket</span>. Set it to{" "}
            <span className="font-semibold">Public</span> so images are accessible. Name it exactly{" "}
            <code className="bg-amber-500/20 px-1.5 py-0.5 rounded font-mono text-amber-100">site-media</code>.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-zinc-500 text-xs flex items-center gap-2 py-6">
          <div className="w-4 h-4 border-2 border-brand-gold/40 border-t-brand-gold rounded-full animate-spin" />
          Loading media config…
        </div>
      ) : (
        <>
          <ImageSlot
            slotKey="founder_image_url"
            label="Slot A: Hero / Founder Photo"
            description="Used in the HeroSection. Shows the main founder portrait."
            file={founderFile}
            setFile={setFounderFile}
            slotState={founderSlot}
            setSlotState={setFounderSlot}
            inputRef={founderInputRef}
            slotName="founder"
          />

          <ImageSlot
            slotKey="message_image_url"
            label="Slot B: Message / About Photo"
            description="Used in the FounderMessage section. Shows the about/bio image."
            file={messageFile}
            setFile={setMessageFile}
            slotState={messageSlot}
            setSlotState={setMessageSlot}
            inputRef={messageInputRef}
            slotName="message"
          />
        </>
      )}
    </div>
  );
}
