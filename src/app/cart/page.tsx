"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag, ChevronRight, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { createClient } from "@/supabase/client";
import { getCart, updateCartQuantity, removeFromCart } from "@/actions/cart";
import Navbar from "@/components/Navbar";

type CartItem = {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
};

const trustBadges = [
  { icon: Truck,       label: "Free shipping over $100" },
  { icon: RotateCcw,   label: "Free 30-day returns" },
  { icon: ShieldCheck, label: "Secure checkout" },
];

export default function CartPage() {
  const router = useRouter();
  const [items, setItems]               = useState<CartItem[]>([]);
  const [loading, setLoading]           = useState(true);
  const [updating, setUpdating]         = useState<string | null>(null);
  const [promoCode, setPromoCode]       = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError]     = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/account/login?redirect=/cart");
        return;
      }
      fetchCart();
    });
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    const result = await getCart();

    if (!result || "error" in result) {
      console.error("Cart fetch error:", result);
      setLoading(false);
      return;
    }

    // Filter out any items where products is null
    const validItems = (result as unknown as CartItem[]).filter(
      (item) => item.products !== null
    );
    setItems(validItems);
    setLoading(false);
  };

  const handleQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    setUpdating(itemId);
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
    await updateCartQuantity(itemId, newQty);
    setUpdating(null);
  };

  const handleRemove = async (itemId: string) => {
    setUpdating(itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    await removeFromCart(itemId);
    setUpdating(null);
  };

  const handlePromo = () => {
    setPromoError("");
    if (promoCode.toUpperCase() === "VELORA15") {
      setPromoApplied(true);
    } else {
      setPromoError("Invalid promo code.");
    }
  };

  const subtotal  = items.reduce((s, i) => s + i.products.price * i.quantity, 0);
  const discount  = promoApplied ? subtotal * 0.15 : 0;
  const shipping  = subtotal >= 100 ? 0 : 9.99;
  const total     = subtotal - discount + shipping;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

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

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-white border border-[#ede8e0] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} className="text-[#c0b0a0]" />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
            Your Cart
          </p>
          <h1 className="font-serif text-3xl font-bold text-[#0f0a05] mb-3">
            Your cart is empty.
          </h1>
          <p className="text-[#8a7060] text-sm mb-8 max-w-xs">
            Looks like you haven't added anything yet. Explore our collections and find something you love.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0f0a05] text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-[#7a5c44] transition-colors group"
          >
            Browse Collections
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Page header ── */}
      <div className="bg-white border-b border-[#ede8e0]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-2">
                Shopping
              </p>
              <h1 className="font-serif text-4xl font-bold text-[#0f0a05]">
                Your Cart
              </h1>
            </div>
            <p className="text-sm text-[#8a7060] pb-1">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Cart items ── */}
          <div className="lg:col-span-2 flex flex-col gap-3">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#8a7060] mb-2">
              <Link href="/" className="hover:text-[#0f0a05] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-[#0f0a05] font-medium">Cart</span>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border border-[#ede8e0] p-4 sm:p-5 flex gap-4 transition-opacity duration-200 ${
                  updating === item.id ? "opacity-50" : "opacity-100"
                }`}
              >
                {/* Product image */}
                <Link href={`/shop/product/${item.products.id}`} className="shrink-0">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl bg-[#f5f0eb] overflow-hidden relative">
                    {item.products.image_url ? (
                      <Image
                        src={item.products.image_url}
                        alt={item.products.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={20} className="text-[#c0b0a0]" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>

                      <Link href={`/shop/product/${item.products.id}`}>
                        <h3 className="font-serif text-base font-bold text-[#0f0a05] hover:text-[#7a5c44] transition-colors leading-snug">
                          {item.products.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-semibold text-[#7a5c44] mt-1">
                        ${item.products.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-[#c0b0a0] hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Quantity + line total */}
                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1 border border-[#ede8e0] rounded-full px-1 py-1 bg-[#faf8f5]">
                      <button
                        onClick={() => handleQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updating === item.id}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#5a4a3a] hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#0f0a05]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#5a4a3a] hover:bg-white hover:shadow-sm transition-all"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Line total */}
                    <p className="text-sm font-bold text-[#0f0a05]">
                      ${(item.products.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7a5c44] hover:text-[#0f0a05] transition-colors mt-2 group"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* ── RIGHT: Order summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden sticky top-24">

              <div className="px-6 pt-6 pb-4 border-b border-[#f5f0eb]">
                <h2 className="font-serif text-lg font-bold text-[#0f0a05]">
                  Order Summary
                </h2>
              </div>

              <div className="px-6 py-5 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a4a3a]">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-[#0f0a05]">${subtotal.toFixed(2)}</span>
                </div>

                {/* Discount */}
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <Tag size={12} /> VELORA15 (15% off)
                    </span>
                    <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                  <span className="text-[#5a4a3a]">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-[#0f0a05]"}`}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {/* Free shipping nudge */}
                {shipping > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5">
                    <p className="text-xs text-amber-700 font-medium">
                      Add <strong>${(100 - subtotal).toFixed(2)}</strong> more for free shipping!
                    </p>
                    <div className="mt-1.5 h-1.5 bg-amber-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="border-t border-[#f5f0eb] pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#0f0a05]">Total</span>
                    <span className="font-bold text-xl text-[#0f0a05]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              <div className="px-6 pb-5">
                {!promoApplied ? (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                        placeholder="Promo code"
                        className="flex-1 border border-[#e0d4c8] bg-[#faf8f5] rounded-xl px-3 py-2.5 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors"
                      />
                      <button
                        onClick={handlePromo}
                        className="px-4 py-2.5 bg-[#0f0a05] text-white text-xs font-bold rounded-xl hover:bg-[#7a5c44] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-xs text-red-500 mt-1.5 font-medium">{promoError}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <Tag size={13} className="text-green-600" />
                      <span className="text-xs font-bold text-green-700">VELORA15 applied!</span>
                    </div>
                    <button
                      onClick={() => { setPromoApplied(false); setPromoCode(""); }}
                      className="text-xs text-green-600 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout button */}
              <div className="px-6 pb-6">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-[#0f0a05] text-white font-bold text-sm py-4 rounded-full hover:bg-[#7a5c44] transition-colors group"
                >
                  Proceed to Checkout
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="border-t border-[#f5f0eb] px-6 py-4 flex flex-col gap-2.5">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <Icon size={14} className="text-[#7a5c44] shrink-0" />
                    <span className="text-xs text-[#8a7060]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}