"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CalendarCheck, 
  Users, 
  FileEdit, 
  ArrowUpRight, 
  Clock, 
  AlertTriangle,
  UserCheck
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalWaitlist: 0,
    newWaitlist: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
          setIsConfigured(false);
          setLoading(false);
          return;
        }

        const supabase = createClient();

        // 1. Fetch bookings
        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        // 2. Fetch waitlist
        const { data: waitlistData } = await supabase
          .from("waitlist")
          .select("*")
          .order("created_at", { ascending: false });

        const bookings = bookingsData || [];
        const waitlist = waitlistData || [];

        setStats({
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((b: any) => b.status === "pending").length,
          totalWaitlist: waitlist.length,
          newWaitlist: waitlist.filter((w: any) => w.status === "new").length,
        });

        setRecentBookings(bookings.slice(0, 5));
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Executive Overview
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Real-time tracking of applicant inquiries, clarity call bookings, and site status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all"
          >
            Manage Bookings
          </Link>
          <Link
            href="/admin/content"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-gold text-black hover:opacity-90 transition-all shadow-md shadow-brand-gold/15"
          >
            Edit Site Content
          </Link>
        </div>
      </div>

      {/* Supabase Not Yet Configured Banner */}
      {!isConfigured && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Supabase Setup Step Needed</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                To connect live bookings and team invites to your cloud database, paste your Supabase Project URL & Keys into your <code className="text-brand-gold font-mono">.env.local</code> file and Vercel dashboard.
                Your SQL schema is ready inside <code className="text-brand-gold font-mono">supabase/schema.sql</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E1424] border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Total Clarity Calls
            </span>
            <div className="p-2 rounded-xl bg-brand-gold/10 text-brand-gold">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{stats.totalBookings}</div>
            <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{stats.pendingBookings} awaiting confirmation</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1424] border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Waitlist Members
            </span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-white">{stats.totalWaitlist}</div>
            <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-400" />
              <span>{stats.newWaitlist} new applicants</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1424] border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Live Status
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 block animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-white">Active & Deployed</div>
            <div className="text-[11px] text-emerald-400 mt-1">Vercel Production</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1424] border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Quick Action
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold hover:underline"
            >
              Update Cohort Text <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[11px] text-zinc-500 mt-1">Changes go live instantly</div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table Preview */}
      <div className="bg-[#0E1424] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Recent Clarity Call Bookings</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Most recent inquiries received through the website</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs text-brand-gold hover:underline flex items-center gap-1 font-semibold"
          >
            View All Bookings <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs">
            No bookings recorded yet or Supabase database not connected.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/30 text-zinc-400 uppercase tracking-wider border-b border-white/5 font-semibold">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{b.name}</div>
                      <div className="text-zinc-500 text-[11px]">{b.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">
                      <div>{b.date}</div>
                      <div className="text-zinc-500 text-[11px]">{b.time_slot}</div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">
                      {b.phone || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        b.status === "confirmed"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : b.status === "pending"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : "bg-zinc-500/15 text-zinc-300 border border-zinc-500/30"
                      }`}>
                        {b.status}
                      </span>
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
