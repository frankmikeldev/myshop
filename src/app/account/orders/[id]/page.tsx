"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getOrderById, cancelOrder } from "@/actions/orders";
import { ChevronRight, Package, MapPin, AlertCircle } from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  products: { id: string; name: string; image_url: string | null } | null;
};

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  shipping_address: Record<string, string> | null;
  order_items: OrderItem[];
};

const statusStyles: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  shipped:    "bg-purple-50 text-purple-700 border-purple-200",
  delivered:  "bg-green-50 text-green-700 border-green-200",
  cancelled:  "bg-red-50 text-red-700 border-red-200",
};

const steps = ["pending", "processing", "shipped", "delivered"];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const [order, setOrder]           = useState<Order | null>(null);
  const [loading, setLoading]       = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;
    getOrderById(id).then((data) => {
      if (data && typeof data === "object" && "id" in data) {
        setOrder(data as unknown as Order);
      }
      setLoading(false);
    });
  }, [id]);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(true);
    const result = await cancelOrder(id);
    if (result && !("error" in result)) {
      setOrder((o) => (o ? { ...o, status: "cancelled" } : o));
    }
    setCancelling(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
          <p className="text-[#8a7060]">Order not found.</p>
        </div>
      </>
    );
  }

  const date = new Date(order.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
  const stepIndex = steps.indexOf(order.status);
  const addr = order.shipping_address;

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
              <Link href="/account/orders" className="hover:text-[#0f0a05] transition-colors">Orders</Link>
              <ChevronRight size={13} />
              <span className="text-[#0f0a05] font-semibold">#{order.id.slice(0, 8).toUpperCase()}</span>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-[#0f0a05]">
                  Order #{order.id.slice(0, 8).toUpperCase()}
                </h1>
                <p className="text-sm text-[#8a7060] mt-1">Placed on {date}</p>
              </div>
              <span className={`self-start sm:self-auto text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border ${statusStyles[order.status] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Progress tracker */}
          {order.status !== "cancelled" && (
            <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 mb-6">
              <div className="flex items-start justify-between">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors ${
                      i <= stepIndex ? "bg-[#0f0a05] text-white" : "bg-[#f0ebe3] text-[#8a7060]"
                    }`}>
                      {i < stepIndex ? "✓" : i + 1}
                    </div>
                    <p className={`text-[10px] uppercase tracking-wider font-semibold text-center ${
                      i <= stepIndex ? "text-[#0f0a05]" : "text-[#c0b0a0]"
                    }`}>
                      {s}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-[1fr_280px] gap-6">

            {/* Items */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#ede8e0]">
                  <h2 className="font-serif text-lg font-bold text-[#0f0a05] flex items-center gap-2">
                    <Package size={18} /> Items
                  </h2>
                </div>
                <div className="divide-y divide-[#f0ebe3]">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex gap-4 px-6 py-4">
                      <div className="w-16 h-16 rounded-xl bg-[#f0ebe3] overflow-hidden shrink-0 relative">
                        {item.products?.image_url && (
                          <Image
                            src={item.products.image_url}
                            alt={item.products.name}
                            fill
                            unoptimized
                            className="object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#0f0a05] text-sm">{item.products?.name ?? "Product"}</p>
                        <p className="text-xs text-[#8a7060] mt-0.5">Qty: {item.quantity}</p>
                        <p className="text-xs text-[#8a7060]">${Number(item.price).toFixed(2)} each</p>
                      </div>
                      <p className="font-bold text-[#0f0a05] text-sm shrink-0">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-[#ede8e0] flex justify-between">
                  <span className="font-bold text-[#0f0a05]">Total</span>
                  <span className="font-bold text-[#0f0a05]">${Number(order.total).toFixed(2)}</span>
                </div>
              </div>

              {order.status === "pending" && (
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-red-200 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-50 transition-colors"
                >
                  <AlertCircle size={15} />
                  {cancelling ? "Cancelling…" : "Cancel Order"}
                </button>
              )}
            </div>

            {/* Shipping address */}
            {addr && (
              <div className="bg-white rounded-2xl border border-[#ede8e0] p-6 h-fit">
                <h2 className="font-serif text-lg font-bold text-[#0f0a05] flex items-center gap-2 mb-4">
                  <MapPin size={18} /> Shipping To
                </h2>
                <div className="text-sm text-[#5a4a3a] space-y-1">
                  <p className="font-semibold text-[#0f0a05]">{addr.full_name}</p>
                  <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                  <p>{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postcode}</p>
                  <p>{addr.country}</p>
                  {addr.phone && <p className="pt-1 text-[#8a7060]">{addr.phone}</p>}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </>
  );
}