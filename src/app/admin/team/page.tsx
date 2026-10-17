"use client";

import { useEffect, useState } from "react";
import { UserPlus, Mail, ShieldCheck, CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  confirmed_at?: string;
}

export default function AdminTeamPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/invite");
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to load admin users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setInviting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send invitation.");
      }

      setMessage({ type: "success", text: `Invitation sent to ${inviteEmail}!` });
      setInviteEmail("");
      fetchUsers();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to invite user." });
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <UserPlus className="w-6 h-6 text-brand-gold" />
          <span>Team & Admin Invitations</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Invite colleagues and team members to collaborate on lead management and content updates.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
              : "bg-red-500/10 border border-red-500/20 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Invite Form */}
      <div className="bg-[#0E1424] border border-white/10 rounded-2xl p-6">
        <h2 className="text-sm font-bold text-white mb-1">Invite New Administrator</h2>
        <p className="text-xs text-zinc-400 mb-4">
          The recipient will receive an email invitation to set up their password and log in.
        </p>

        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="email"
              required
              placeholder="colleague@ascendgrowth.co"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm outline-none focus:border-brand-gold/60"
            />
          </div>
          <button
            type="submit"
            disabled={inviting}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-gold text-black hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-gold/15 disabled:opacity-50"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{inviting ? "Sending Invite..." : "Send Invitation"}</span>
          </button>
        </form>
      </div>

      {/* Current Team Members */}
      <div className="bg-[#0E1424] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h3 className="font-bold text-white text-base">Active Administrators</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Team members who currently have dashboard access</p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-zinc-400 text-xs">Loading team accounts...</div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs">
            No team members loaded. Configure SUPABASE_SERVICE_ROLE_KEY to manage accounts.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {users.map((u) => (
              <div key={u.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold text-xs uppercase">
                    {u.email.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{u.email}</div>
                    <div className="text-zinc-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-zinc-600" />
                      <span>
                        Joined {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Administrator</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
