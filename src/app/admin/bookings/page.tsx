"use client";

import { useEffect, useState } from "react";
import { 
  CalendarCheck, 
  Search, 
  Download, 
  Phone, 
  Mail, 
  MessageSquare, 
  Check, 
  Clock, 
  X,
  FileText
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time_slot: string;
  degree?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setBookings(data);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id: string, newStatus: Booking["status"]) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  const saveNotes = async (id: string) => {
    const supabase = createClient();
    await supabase
      .from("bookings")
      .update({ notes: noteText, updated_at: new Date().toISOString() })
      .eq("id", id);

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, notes: noteText } : b))
    );
    setActiveNotesId(null);
  };

  const exportToCSV = () => {
    if (bookings.length === 0) return;

    const headers = ["Name", "Email", "Phone", "Date", "TimeSlot", "Degree", "Status", "Notes", "CreatedAt"];
    const rows = bookings.map((b) => [
      `"${b.name}"`,
      `"${b.email}"`,
      `"${b.phone || ""}"`,
      `"${b.date}"`,
      `"${b.time_slot}"`,
      `"${b.degree || ""}"`,
      `"${b.status}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      `"${b.created_at}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ascend_clarity_calls_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.phone && b.phone.includes(searchTerm));
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
            <CalendarCheck className="w-6 h-6 text-brand-gold" />
            <span>Clarity Call Bookings</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Review schedule requests, update consultation statuses, and initiate follow-ups.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          disabled={bookings.length === 0}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by candidate name, email, or phone..."
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
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#0E1424] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-400 text-xs">Loading bookings data...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-sm">
            No bookings found matching your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 text-zinc-400 uppercase tracking-wider border-b border-white/10 font-semibold">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Scheduled Slot</th>
                  <th className="py-3 px-4">Background</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Candidate Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{b.name}</div>
                      <div className="text-zinc-400 text-xs flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-zinc-500" />
                        <a href={`mailto:${b.email}`} className="hover:text-brand-gold underline">
                          {b.email}
                        </a>
                      </div>
                    </td>

                    {/* Date & Time Slot */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-200">{b.date}</div>
                      <div className="text-brand-gold text-[11px] font-mono mt-0.5">{b.time_slot}</div>
                    </td>

                    {/* Background / Degree */}
                    <td className="py-3.5 px-4 text-zinc-400">
                      {b.degree || <span className="text-zinc-600">Not provided</span>}
                    </td>

                    {/* Quick WhatsApp & Call links */}
                    <td className="py-3.5 px-4">
                      {b.phone ? (
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(b.name)}%2C%20following%20up%20on%20your%20Ascend%20Growth%20clarity%20call`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`tel:${b.phone}`}
                            className="p-1.5 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10"
                            title="Call Phone"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <span className="text-zinc-300 text-[11px]">{b.phone}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => updateBookingStatus(b.id, e.target.value as Booking["status"])}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                          b.status === "confirmed"
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            : b.status === "completed"
                            ? "bg-sky-500/15 text-sky-300 border-sky-500/30"
                            : b.status === "cancelled"
                            ? "bg-red-500/15 text-red-300 border-red-500/30"
                            : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                        }`}
                      >
                        <option value="pending" className="bg-[#0E1424] text-white">Pending</option>
                        <option value="confirmed" className="bg-[#0E1424] text-white">Confirmed</option>
                        <option value="completed" className="bg-[#0E1424] text-white">Completed</option>
                        <option value="cancelled" className="bg-[#0E1424] text-white">Cancelled</option>
                      </select>
                    </td>

                    {/* Notes Modal / Button */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setActiveNotesId(b.id);
                          setNoteText(b.notes || "");
                        }}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                        title="Add/Edit Notes"
                      >
                        <FileText className={`w-4 h-4 ${b.notes ? "text-brand-gold" : "text-zinc-500"}`} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notes Popover */}
      {activeNotesId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1424] border border-white/15 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-sm">Internal Lead Notes</h3>
              <button
                onClick={() => setActiveNotesId(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={4}
              placeholder="Add call observations, outcome, or follow-up instructions..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-gold/60"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setActiveNotesId(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => saveNotes(activeNotesId)}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-brand-gold text-black hover:opacity-90"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
