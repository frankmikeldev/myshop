"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { getCart } from "@/actions/cart";
import { createOrder } from "@/actions/orders";
import { ChevronRight, Lock, Package, Truck, CheckCircle } from "lucide-react";

type CartItem = {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  } | null;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"details" | "review" | "success">("details");
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postcode: "",
    country: "Nigeria",
  });

  useEffect(() => {
    getCart().then((data) => {
      if (data && !("error" in data)) setCart(data as CartItem[]);
      setLoading(false);
    });
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.products?.price ?? 0) * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 12;
  const total    = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.line1 || !form.city || !form.postcode) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStep("review");
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    const result = await createOrder({
      full_name: form.full_name,
      line1:     form.line1,
      line2:     form.line2,
      city:      form.city,
      state:     form.state,
      postcode:  form.postcode,
      country:   form.country,
      phone:     form.phone,
      email:     form.email,
    });
    setPlacing(false);

    if (result && "error" in result) {
      setError(result.error as string);
      setStep("details");
      return;
    }

    if (result && "orderId" in result) {
      setOrderId(result.orderId as string);
      window.dispatchEvent(new Event("cart:updated"));
      setStep("success");
    }
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

  if (step === "success") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-[#0f0a05] mb-3">Order Placed!</h1>
            <p className="text-[#8a7060] mb-2">Thank you for shopping with Velora.</p>
            <p className="text-[#8a7060] text-sm mb-8">
              Order <span className="font-mono font-bold text-[#0f0a05]">#{orderId.slice(0, 8).toUpperCase()}</span> is confirmed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/account/orders/${orderId}`}
                className="px-8 py-3 bg-[#0f0a05] text-white text-sm font-bold rounded-full hover:bg-[#7a5c44] transition-colors"
              >
                View Order
              </Link>
              <Link
                href="/shop"
                className="px-8 py-3 border border-[#e0d4c8] text-[#0f0a05] text-sm font-bold rounded-full hover:border-[#0f0a05] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">

          {/* Header */}
          <div className="mb-10">
            <nav className="flex items-center gap-2 text-sm text-[#8a7060] mb-4">
              <Link href="/cart" className="hover:text-[#0f0a05] transition-colors">Cart</Link>
              <ChevronRight size={13} />
              <span className={step === "details" ? "text-[#0f0a05] font-semibold" : ""}>Details</span>
              <ChevronRight size={13} />
              <span className={step === "review" ? "text-[#0f0a05] font-semibold" : ""}>Review</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10">

            {/* ── Left: Form / Review ── */}
            <div>
              {step === "details" && (
                <form onSubmit={handleSubmitDetails} className="space-y-6">
                  {/* Contact */}
                  <div className="bg-white rounded-2xl p-6 border border-[#ede8e0]">
                    <h2 className="font-serif text-xl font-bold text-[#0f0a05] mb-5">Contact Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Full Name *</label>
                        <input name="full_name" value={form.full_name} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="+234 000 000 0000" />
                      </div>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="bg-white rounded-2xl p-6 border border-[#ede8e0]">
                    <h2 className="font-serif text-xl font-bold text-[#0f0a05] mb-5">Shipping Address</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Address Line 1 *</label>
                        <input name="line1" value={form.line1} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="123 Main Street" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Address Line 2</label>
                        <input name="line2" value={form.line2} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="Apartment, suite, etc." />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">City *</label>
                        <input name="city" value={form.city} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="Lagos" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">State</label>
                        <input name="state" value={form.state} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="Lagos State" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Postcode *</label>
                        <input name="postcode" value={form.postcode} onChange={handleChange} required
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors"
                          placeholder="100001" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Country</label>
                        <select name="country" value={form.country} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-[#0f0a05] text-sm focus:outline-none focus:border-[#0f0a05] transition-colors">
                          <option>Nigeria</option>
                          <option>Ghana</option>
                          <option>Kenya</option>
                          <option>South Africa</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit"
                    className="w-full py-4 bg-[#0f0a05] text-white font-bold text-sm rounded-full hover:bg-[#7a5c44] transition-colors">
                    Continue to Review →
                  </button>
                </form>
              )}

              {step === "review" && (
                <div className="space-y-6">
                  {/* Shipping summary */}
                  <div className="bg-white rounded-2xl p-6 border border-[#ede8e0]">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-serif text-xl font-bold text-[#0f0a05]">Shipping To</h2>
                      <button onClick={() => setStep("details")} className="text-xs text-[#7a5c44] font-semibold hover:underline">Edit</button>
                    </div>
                    <div className="text-sm text-[#5a4a3a] space-y-1">
                      <p className="font-semibold text-[#0f0a05]">{form.full_name}</p>
                      <p>{form.line1}{form.line2 ? `, ${form.line2}` : ""}</p>
                      <p>{form.city}{form.state ? `, ${form.state}` : ""} {form.postcode}</p>
                      <p>{form.country}</p>
                      {form.phone && <p>{form.phone}</p>}
                    </div>
                  </div>

                  {/* Payment notice */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                    <Lock size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Payment on Delivery</p>
                      <p className="text-xs text-amber-700 mt-0.5">Pay with cash when your order arrives. No card needed.</p>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button onClick={handlePlaceOrder} disabled={placing}
                    className={`w-full py-4 font-bold text-sm rounded-full transition-colors ${
                      placing ? "bg-[#8a7060] text-white cursor-wait" : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"
                    }`}>
                    {placing ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Placing Order…
                      </span>
                    ) : "Place Order"}
                  </button>
                </div>
              )}
            </div>

            {/* ── Right: Order Summary ── */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#ede8e0]">
                  <h2 className="font-serif text-lg font-bold text-[#0f0a05]">Order Summary</h2>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#f0ebe3]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 px-6 py-4">
                      <div className="w-14 h-14 rounded-xl bg-[#f0ebe3] overflow-hidden shrink-0 relative">
                        {item.products?.image_url && (
                          <Image src={item.products.image_url} alt={item.products.name} fill unoptimized className="object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0f0a05] truncate">{item.products?.name}</p>
                        <p className="text-xs text-[#8a7060]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-[#0f0a05] shrink-0">
                        ${((item.products?.price ?? 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="px-6 py-4 border-t border-[#ede8e0] space-y-2">
                  <div className="flex justify-between text-sm text-[#5a4a3a]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#5a4a3a]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-green-600 font-semibold">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#0f0a05] pt-2 border-t border-[#ede8e0]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping perks */}
              <div className="bg-white rounded-2xl border border-[#ede8e0] p-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#5a4a3a]">
                  <Truck size={16} className="text-[#7a5c44]" />
                  <span>Free shipping on orders over $150</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#5a4a3a]">
                  <Package size={16} className="text-[#7a5c44]" />
                  <span>Delivered in 3–7 business days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#5a4a3a]">
                  <Lock size={16} className="text-[#7a5c44]" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}