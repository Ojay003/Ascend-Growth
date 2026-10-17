"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Plus, Trash2, Edit2, CheckCircle2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  tag: "Graduate Alum" | "Parent Perspective";
  tag_color?: string;
  order_index: number;
  is_active: boolean;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("order_index", { ascending: true });

      if (data && !error) {
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const toggleStatus = async (id: string, currentActive: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !currentActive })
      .eq("id", id);

    if (!error) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_active: !currentActive } : t))
      );
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (!error) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem?.quote) return;

    const supabase = createClient();
    const tag = editingItem.tag || "Graduate Alum";
    const tagColor =
      tag === "Graduate Alum"
        ? "bg-brand-gold/15 text-brand-gold border-brand-gold/30"
        : "bg-sky-950/70 text-sky-300 border-sky-500/30";

    if (editingItem.id) {
      // Update
      const { error } = await supabase
        .from("testimonials")
        .update({
          name: editingItem.name,
          role: editingItem.role,
          quote: editingItem.quote,
          tag,
          tag_color: tagColor,
          order_index: editingItem.order_index ?? 0,
        })
        .eq("id", editingItem.id);

      if (!error) {
        fetchTestimonials();
        setIsModalOpen(false);
      }
    } else {
      // Create new
      const { error } = await supabase.from("testimonials").insert({
        name: editingItem.name,
        role: editingItem.role || "",
        quote: editingItem.quote,
        tag,
        tag_color: tagColor,
        order_index: testimonials.length + 1,
        is_active: true,
      });

      if (!error) {
        fetchTestimonials();
        setIsModalOpen(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <MessageSquareQuote className="w-6 h-6 text-brand-gold" />
            <span>Success Stories & Testimonials</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Manage real graduate results and parent perspectives displayed on the marquee carousel.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingItem({
              name: "",
              role: "",
              quote: "",
              tag: "Graduate Alum",
              order_index: testimonials.length + 1,
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-gold text-black hover:opacity-90 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md shadow-brand-gold/15"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      <div className="bg-[#0E1424] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-400 text-xs">Loading stories...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No testimonials found in database.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {testimonials.map((t) => (
              <div key={t.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02]">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white text-sm">{t.name}</span>
                    <span className="text-xs text-zinc-400">· {t.role}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      t.tag === "Graduate Alum" 
                        ? "bg-brand-gold/15 text-brand-gold border-brand-gold/30" 
                        : "bg-sky-500/15 text-sky-300 border-sky-500/30"
                    }`}>
                      {t.tag}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-xs italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => toggleStatus(t.id, t.is_active)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                      t.is_active
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : "bg-zinc-600/20 text-zinc-400 border-zinc-600/30"
                    }`}
                  >
                    {t.is_active ? "Live on site" : "Hidden"}
                  </button>

                  <button
                    onClick={() => {
                      setEditingItem(t);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1424] border border-white/15 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white text-base">
                {editingItem?.id ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel K."
                  value={editingItem?.name || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marketing Consultant · Cohort 1"
                    value={editingItem?.role || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Category Tag
                  </label>
                  <select
                    value={editingItem?.tag || "Graduate Alum"}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
                  >
                    <option value="Graduate Alum">Graduate Alum</option>
                    <option value="Parent Perspective">Parent Perspective</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Quote
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Client feedback or graduate breakthrough story..."
                  value={editingItem?.quote || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs leading-relaxed outline-none focus:border-brand-gold/60"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-gold text-black hover:opacity-90"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
