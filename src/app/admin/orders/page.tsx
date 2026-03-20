"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getUserOrders } from "@/actions/orders";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: { quantity: number }[];
};

const statusStyles: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped:    "bg-purple-50 text-purple-700 border-purple-200",
  delivered:  "bg-green-50 text-green-700 border-green-200",
  cancelled:  "bg-red-50 text-red-700 border-red-200",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders().then((data) => {
      if (Array.isArray(data)) setOrders(data as unknown as Order[]);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">

          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-[#8a7060] mb-4">
              <Link href="/account" className="hover:text-[#0f0a05] transition-colors">Account</Link>
              <ChevronRight size={13} />
              <span className="text-[#0f0a05] font-semibold">My Orders</span>
            </nav>
            <h1 className="font-serif text-4xl font-bold text-[#0f0a05]">My Orders</h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-[#f0ebe3] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} className="text-[#8a7060]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0f0a05] mb-2">No orders yet</h2>
              <p className="text-[#8a7060] mb-6">When you place an order it will appear here.</p>
              <Link href="/shop" className="inline-flex px-8 py-3 bg-[#0f0a05] text-white text-sm font-bold rounded-full hover:bg-[#7a5c44] transition-colors">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const itemCount = order.order_items.reduce((s, i) => s + i.quantity, 0);
                const date = new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
                return (
                  <Link key={order.id} href={`/account/orders/${order.id}`}
                    className="flex items-center gap-5 bg-white rounded-2xl border border-[#ede8e0] px-6 py-5 hover:border-[#0f0a05] transition-colors group">
                    <div className="w-12 h-12 bg-[#f0ebe3] rounded-xl flex items-center justify-center shrink-0">
                      <Package size={20} className="text-[#7a5c44]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-mono text-sm font-bold text-[#0f0a05]">#{order.id.slice(0, 8).toUpperCase()}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusStyles[order.status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8a7060]">{date} · {itemCount} item{itemCount !== 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-[#0f0a05]">${order.total.toFixed(2)}</p>
                      <ChevronRight size={16} className="text-[#c0b0a0] group-hover:text-[#0f0a05] transition-colors ml-auto mt-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}