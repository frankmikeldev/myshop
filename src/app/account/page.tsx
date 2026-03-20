"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  User,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  ArrowRight,
  Edit3,
} from "lucide-react";
import { createClient } from "@/supabase/client";
import { signOut } from "@/actions/auth";
import { getUserOrders } from "@/actions/orders";

type Order = {
  id: string;
  created_at: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  order_items?: { quantity: number }[];
};

const statusConfig = {
  pending:    { label: "Pending",    icon: Clock,        color: "text-amber-500",  bg: "bg-amber-50",  border: "border-amber-200" },
  processing: { label: "Processing", icon: Package,      color: "text-blue-500",   bg: "bg-blue-50",   border: "border-blue-200" },
  shipped:    { label: "Shipped",    icon: Truck,        color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
  delivered:  { label: "Delivered",  icon: CheckCircle,  color: "text-green-500",  bg: "bg-green-50",  border: "border-green-200" },
  cancelled:  { label: "Cancelled",  icon: XCircle,      color: "text-red-400",    bg: "bg-red-50",    border: "border-red-200" },
};

const quickLinks = [
  { icon: Package,  label: "My Orders",    sub: "Track & manage orders",  href: "/account/orders" },
  { icon: User,     label: "Edit Profile", sub: "Update your details",    href: "/account/profile" },
  { icon: MapPin,   label: "Addresses",    sub: "Saved delivery addresses",href: "/account/addresses" },
  { icon: Heart,    label: "Wishlist",     sub: "Items you've saved",     href: "/account/wishlist" },
];

export default function AccountDashboard() {
  const router = useRouter();
  const [user, setUser]     = useState<{ name: string; email: string; created_at?: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push("/account/login");
        return;
      }

      setUser({
        name:       session.user.user_metadata?.name ?? session.user.email?.split("@")[0] ?? "Member",
        email:      session.user.email ?? "",
        created_at: session.user.created_at,
      });

      // Fetch recent orders
      try {
        const result = await getUserOrders();
        if (result && !("error" in result)) {
          setOrders((result as unknown as Order[]).slice(0, 3));
        }
      } catch {
        // orders stay empty
      }

      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "V";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Hero banner ── */}
      <div className="bg-[#0f0a05] relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Decorative ring */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute right-0 top-0 w-[260px] h-[260px] rounded-full border border-amber-400/10 translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-amber-400 text-[#0f0a05] text-xl font-bold flex items-center justify-center shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">
                  Welcome back
                </p>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {user?.name}
                </h1>
                {memberSince && (
                  <p className="text-white/30 text-xs mt-0.5">
                    Member since {memberSince}
                  </p>
                )}
              </div>
            </div>

            {/* Sign out */}
            <button
              onClick={handleSignOut}
              className="hidden sm:flex items-center gap-2 text-white/40 hover:text-white text-xs font-medium transition-colors group"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT: Quick links + profile ── */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-bold text-[#0f0a05]">My Profile</h2>
                <Link
                  href="/account/profile"
                  className="p-1.5 text-[#8a7060] hover:text-[#0f0a05] hover:bg-[#faf8f5] rounded-lg transition-colors"
                >
                  <Edit3 size={15} />
                </Link>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7060] font-semibold mb-0.5">Name</p>
                  <p className="text-sm font-medium text-[#0f0a05]">{user?.name}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7060] font-semibold mb-0.5">Email</p>
                  <p className="text-sm font-medium text-[#0f0a05] truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
              <div className="px-6 pt-5 pb-3">
                <h2 className="font-serif text-lg font-bold text-[#0f0a05]">Quick Links</h2>
              </div>
              <div className="divide-y divide-[#f5f0eb]">
                {quickLinks.map(({ icon: Icon, label, sub, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-[#faf8f5] transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#faf8f5] flex items-center justify-center shrink-0 group-hover:bg-[#f0e8e0] transition-colors">
                      <Icon size={16} className="text-[#7a5c44]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0f0a05]">{label}</p>
                      <p className="text-xs text-[#8a7060] truncate">{sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-[#c0b0a0] group-hover:text-[#7a5c44] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Sign out mobile */}
              <div className="px-6 py-4 border-t border-[#f5f0eb] sm:hidden">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Recent orders ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Orders",   value: orders.length.toString().padStart(2, "0") },
                { label: "Delivered",      value: orders.filter(o => o.status === "delivered").length.toString().padStart(2, "0") },
                { label: "In Progress",    value: orders.filter(o => ["pending","processing","shipped"].includes(o.status)).length.toString().padStart(2, "0") },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-2xl border border-[#ede8e0] p-5 text-center">
                  <p className="font-serif text-3xl font-bold text-[#0f0a05] mb-1">{value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7060] font-semibold">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <h2 className="font-serif text-lg font-bold text-[#0f0a05]">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-1 text-xs font-semibold text-[#7a5c44] hover:text-[#0f0a05] transition-colors group"
                >
                  View all
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {orders.length === 0 ? (
                /* Empty state */
                <div className="px-6 pb-10 pt-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#faf8f5] flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={22} className="text-[#c0b0a0]" />
                  </div>
                  <p className="font-serif text-lg font-bold text-[#0f0a05] mb-1">No orders yet</p>
                  <p className="text-sm text-[#8a7060] mb-6">
                    When you place an order, it will appear here.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-[#0f0a05] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#7a5c44] transition-colors"
                  >
                    Start Shopping
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#f5f0eb]">
                  {orders.map((order) => {
                    const cfg = statusConfig[order.status] ?? statusConfig.pending;
                    const StatusIcon = cfg.icon;
                    const itemCount = order.order_items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

                    return (
                      <Link
                        key={order.id}
                        href={`/account/orders/${order.id}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-[#faf8f5] transition-colors group"
                      >
                        {/* Status icon */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} border ${cfg.border}`}>
                          <StatusIcon size={16} className={cfg.color} />
                        </div>

                        {/* Order info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-[#0f0a05]">
                              Order #{order.id.slice(-6).toUpperCase()}
                            </p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                              {cfg.label}
                            </span>
                          </div>
                          <p className="text-xs text-[#8a7060]">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                            {itemCount > 0 && ` · ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
                          </p>
                        </div>

                        {/* Price + arrow */}
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-[#0f0a05]">
                            ${order.total.toFixed(2)}
                          </p>
                          <ChevronRight size={14} className="text-[#c0b0a0] group-hover:text-[#7a5c44] ml-auto mt-1 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Shop CTA */}
            <div className="bg-[#0f0a05] rounded-2xl p-6 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                    New arrivals
                  </p>
                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    Fresh styles just dropped.
                  </h3>
                  <p className="text-white/40 text-sm">
                    Explore the latest collection.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="shrink-0 flex items-center gap-2 bg-white text-[#0f0a05] font-bold text-sm px-5 py-3 rounded-full hover:bg-amber-400 transition-colors group"
                >
                  Shop Now
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}