"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Users, 
  FileEdit, 
  MessageSquareQuote, 
  UserPlus, 
  LogOut, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAVIGATION_ITEMS = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Waitlist", href: "/admin/waitlist", icon: Users },
  { name: "Site Content", href: "/admin/content", icon: FileEdit },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Team & Invites", href: "/admin/team", icon: UserPlus },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show admin dashboard sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white flex flex-col md:flex-row selection:bg-brand-gold/30">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0A0F1D] border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/images/favicon-mark.png"
                alt="Ascend Growth"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider uppercase text-white block">
                Ascend Growth
              </span>
              <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-widest block">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-brand-gold text-black font-semibold shadow-md shadow-brand-gold/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-zinc-400"}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-black/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
