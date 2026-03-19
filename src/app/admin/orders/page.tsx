"use client";

import { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "@/actions/admin";
import { ChevronDown } from "lucide-react";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  users: { email: string } | null;
  order_items: { quantity: number }[];
};

const statusStyles: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border border-amber-200",
  processing: "bg-blue-50 text-blue-700 border border-blue-200",
  shipped:    "bg-purple-50 text-purple-700 border border-purple-200",
  delivered:  "bg-green-50 text-green-700 border border-green-200",
  cancelled:  "bg-red-50 text-red-700 border border-red-200",
};

const allStatuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
const nextStatus: Record<string, string> = {
  pending:    "processing",
  processing: "shipped",
  shipped:    "delivered",
};

export default function AdminOrdersPage() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [filter, setFilter]   = useState("all");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = (status: string) => {
    setLoading(true);
    getAllOrders(status === "all" ? undefined : status).then((data) => {
      if (Array.isArray(data)) setOrders(data as Order[]);
      setLoading(false);
    });
  };

  useEffect(() => { fetchOrders(filter); }, [filter]);

  const handleUpdate = async (orderId: string, status: string) => {
    setUpdating(orderId);
    await updateOrderStatus(orderId, status);
    setUpdating(null);
    fetchOrders(filter);
  };

  return (
    <>
      <div className="px-8 py-5 bg-white border-b border-[#ede8e0] shrink-0">
        <h1 className="font-serif text-2xl font-bold text-[#0f0a05]">Orders</h1>
        <p className="text-sm text-[#8a7060] mt-0.5">{orders.length} orders found</p>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {allStatuses.map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border capitalize transition-all ${
                filter === s
                  ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                  : "bg-white text-[#5a4a3a] border-[#e0d4c8] hover:border-[#0f0a05]"
              }`}>
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ede8e0] bg-[#faf8f5]">
                  {["Order ID", "Customer", "Items", "Total", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#8a7060]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => {
                  const itemCount = o.order_items.reduce((s, i) => s + i.quantity, 0);
                  const next = nextStatus[o.status];
                  return (
                    <tr key={o.id} className="border-b border-[#f5f0eb] hover:bg-[#faf8f5] transition-colors">
                      <td className="px-5 py-3 font-mono text-xs font-bold text-[#0f0a05]">#{o.id.slice(0, 8).toUpperCase()}</td>
                      <td className="px-5 py-3 text-sm text-[#5a4a3a]">{o.users?.email ?? "—"}</td>
                      <td className="px-5 py-3 text-sm text-[#8a7060]">{itemCount} item{itemCount !== 1 ? "s" : ""}</td>
                      <td className="px-5 py-3 text-sm font-bold text-[#0f0a05]">${Number(o.total).toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusStyles[o.status] ?? ""}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-[#8a7060]">
                        {new Date(o.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-3">
                        {next && (
                          <button
                            onClick={() => handleUpdate(o.id, next)}
                            disabled={updating === o.id}
                            className="text-xs font-semibold text-[#7a5c44] border border-[#e0d4c8] px-3 py-1 rounded-full hover:border-[#7a5c44] transition-colors capitalize disabled:opacity-50"
                          >
                            {updating === o.id ? "…" : `→ ${next}`}
                          </button>
                        )}
                        {o.status === "pending" && (
                          <button
                            onClick={() => handleUpdate(o.id, "cancelled")}
                            disabled={updating === o.id}
                            className="ml-2 text-xs font-semibold text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {orders.length === 0 && (
              <div className="text-center py-16 text-[#8a7060]">No orders found.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}