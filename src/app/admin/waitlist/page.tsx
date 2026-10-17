"use client";

import { useEffect, useState } from "react";
import { Users, Search, Download, Mail, CheckCircle2, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface WaitlistEntry {
  id: string;
  email: string;
  source: string;
  status: "new" | "contacted" | "converted" | "archived";
  notes?: string;
  created_at: string;
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchWaitlist = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setEntries(data);
      }
    } catch (err) {
      console.error("Failed to fetch waitlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const updateStatus = async (id: string, newStatus: WaitlistEntry["status"]) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("waitlist")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      setEntries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    }
  };

  const exportToCSV = () => {
    if (entries.length === 0) return;

    const headers = ["Email", "Status", "Source", "Notes", "DateJoined"];
    const rows = entries.map((e) => [
      `"${e.email}"`,
      `"${e.status}"`,
      `"${e.source || "Website"}"`,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
      `"${e.created_at}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ascend_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEntries = entries.filter((e) => {
    const matchesSearch = e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-brand-gold" />
            <span>Cohort Waitlist Inquiries</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Graduates and students registered for upcoming mentorship intake notification.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          disabled={entries.length === 0}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Waitlist CSV</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E1424] border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-brand-gold/60"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-[#0E1424] border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60 cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="bg-[#0E1424] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-400 text-xs">Loading waitlist entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No waitlist entries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 text-zinc-400 uppercase tracking-wider border-b border-white/10 font-semibold">
                <tr>
                  <th className="py-3 px-4">Applicant Email</th>
                  <th className="py-3 px-4">Joined On</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEntries.map((e) => (
                  <tr key={e.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{e.email}</div>
                      <div className="text-zinc-500 text-[11px]">{e.source || "Website Footer Waitlist"}</div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">
                      <div>{new Date(e.created_at).toLocaleDateString()}</div>
                      <div className="text-zinc-500 text-[11px]">
                        {new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={e.status}
                        onChange={(evt) => updateStatus(e.id, evt.target.value as WaitlistEntry["status"])}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          e.status === "new"
                            ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                            : e.status === "contacted"
                            ? "bg-sky-500/15 text-sky-300 border-sky-500/30"
                            : e.status === "converted"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : "bg-zinc-500/15 text-zinc-300 border-zinc-500/30"
                        }`}
                      >
                        <option value="new" className="bg-[#0E1424] text-white">New</option>
                        <option value="contacted" className="bg-[#0E1424] text-white">Contacted</option>
                        <option value="converted" className="bg-[#0E1424] text-white">Converted</option>
                        <option value="archived" className="bg-[#0E1424] text-white">Archived</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`mailto:${e.email}?subject=Ascend%20Growth%20Cohort%20Update`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-gold text-xs font-semibold transition-all"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Email</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
