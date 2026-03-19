"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAdminStats, getRecentOrders } from "@/actions/admin";
import { TrendingUp, ShoppingBag, Users, Clock } from "lucide-react";

type Stats = { orders: number; users: number; revenue: number; pending: number };
type Order = { id: string; created_at: string; status: string; total: number; users: { email: string } | null };

const statusStyles: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border border-amber-200",
  processing: "bg-blue-50 text-blue-700 border border-blue-200",
  shipped:    "bg-purple-50 text-purple-700 border border-purple-200",
  delivered:  "bg-green-50 text-green-700 border border-green-200",
  cancelled:  "bg-red-50 text-red-700 border border-red-200",
};

export default function AdminDashboard() {
  const [stats, setStats]   = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminStats(), getRecentOrders()]).then(([s, o]) => {
      if (s && !("error" in s)) setStats(s as Stats);
      if (Array.isArray(o)) setOrders(o as Order[]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="px-8 py-5 bg-white border-b border-[#ede8e0] flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0f0a05]">Dashboard</h1>
          <p className="text-sm text-[#8a7060] mt-0.5">Welcome back — here's what's happening</p>
        </div>
        <Link href="/shop" target="_blank"
          className="text-xs font-semibold text-[#7a5c44] border border-[#e0d4c8] px-4 py-2 rounded-full hover:border-[#0f0a05] transition-colors">
          View Store →
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Revenue",   value: `$${Number(stats?.revenue ?? 0).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: TrendingUp, color: "text-green-600"  },
                { label: "Total Orders",    value: stats?.orders ?? 0,  icon: ShoppingBag, color: "text-blue-600"   },
                { label: "Customers",       value: stats?.users ?? 0,   icon: Users,       color: "text-purple-600" },
                { label: "Pending Orders",  value: stats?.pending ?? 0, icon: Clock,       color: "text-amber-600"  },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl border border-[#ede8e0] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8a7060]">{label}</p>
                    <Icon size={16} className={color} />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#0f0a05]">{value}</p>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#ede8e0] flex items-center justify-between">
                <h2 className="font-serif text-lg font-bold text-[#0f0a05]">Recent Orders</h2>
                <Link href="/admin/orders" className="text-xs text-[#7a5c44] font-semibold hover:underline">View all</Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ede8e0] bg-[#faf8f5]">
                    {["Order ID", "Customer", "Date", "Total", "Status"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#8a7060]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-[#f5f0eb] hover:bg-[#faf8f5] transition-colors">
                      <td className="px-6 py-3 font-mono text-xs font-bold text-[#0f0a05]">#{o.id.slice(0, 8).toUpperCase()}</td>
                      <td className="px-6 py-3 text-sm text-[#5a4a3a]">{o.users?.email ?? "—"}</td>
                      <td className="px-6 py-3 text-sm text-[#8a7060]">{new Date(o.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</td>
                      <td className="px-6 py-3 text-sm font-bold text-[#0f0a05]">${Number(o.total).toFixed(2)}</td>
                      <td className="px-6 py-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusStyles[o.status] ?? ""}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}