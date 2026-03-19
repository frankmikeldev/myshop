"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, Package, Users, Tag, LogOut
} from "lucide-react";

const navItems = [
  { href: "/admin",            label: "Dashboard", icon: LayoutDashboard, section: "Overview" },
  { href: "/admin/orders",     label: "Orders",    icon: ShoppingBag,     section: "Store" },
  { href: "/admin/products",   label: "Products",  icon: Package,         section: "Store" },
  { href: "/admin/users",      label: "Users",     icon: Users,           section: "Store" },
  { href: "/admin/categories", label: "Categories",icon: Tag,             section: "Store" },
];

type Props = {
  children: React.ReactNode;
  user: { email: string; full_name?: string; role: string };
};

export default function AdminShell({ children, user }: Props) {
  const pathname  = usePathname();
  const router    = useRouter();
  const initials  = (user.full_name ?? user.email).slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const sections = [...new Set(navItems.map((n) => n.section))];

  return (
    <div className="flex h-screen bg-[#faf8f5] overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="w-52 bg-[#0f0a05] flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/8">
          <p className="text-white font-serif text-lg font-bold tracking-wide">Velora</p>
          <p className="text-white/30 text-[11px] mt-0.5 uppercase tracking-widest">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {sections.map((section) => (
            <div key={section}>
              <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
                {section}
              </p>
              {navItems
                .filter((n) => n.section === section)
                .map(({ href, label, icon: Icon }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 mb-0.5 ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:bg-white/6 hover:text-white/80"
                      }`}
                    >
                      <Icon size={15} />
                      {label}
                    </Link>
                  );
                })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-[#7a5c44] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
              {initials}
            </div>
            <p className="text-white/60 text-xs truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/6 transition-all"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}