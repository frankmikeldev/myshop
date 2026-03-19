"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { createClient } from "@/supabase/client";
import { ChevronRight, MapPin, Plus, Pencil, Trash2, Star, X, CheckCircle } from "lucide-react";

type Address = {
  id: string;
  label: string;
  full_name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postcode: string;
  country: string;
  phone: string | null;
  is_default: boolean;
};

const emptyForm = {
  label: "Home",
  full_name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postcode: "",
  country: "Nigeria",
  phone: "",
  is_default: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<string | null>(null);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState("");
  const [form, setForm]           = useState(emptyForm);

  const supabase = createClient();

  const fetchAddresses = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true });
    if (data) setAddresses(data as Address[]);
    setLoading(false);
  };

  useEffect(() => { fetchAddresses(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    setForm((f) => ({
      ...f,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const openAdd = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
    setError("");
  };

  const openEdit = (addr: Address) => {
    setForm({
      label:      addr.label,
      full_name:  addr.full_name,
      line1:      addr.line1,
      line2:      addr.line2 ?? "",
      city:       addr.city,
      state:      addr.state ?? "",
      postcode:   addr.postcode,
      country:    addr.country,
      phone:      addr.phone ?? "",
      is_default: addr.is_default,
    });
    setEditing(addr.id);
    setShowForm(true);
    setError("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.line1 || !form.city || !form.postcode) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    // If setting as default, unset others first
    if (form.is_default) {
      await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
    }

    const payload = {
      user_id:    user.id,
      label:      form.label,
      full_name:  form.full_name,
      line1:      form.line1,
      line2:      form.line2 || null,
      city:       form.city,
      state:      form.state || null,
      postcode:   form.postcode,
      country:    form.country,
      phone:      form.phone || null,
      is_default: form.is_default,
    };

    if (editing) {
      await supabase.from("addresses").update(payload).eq("id", editing);
    } else {
      await supabase.from("addresses").insert(payload);
    }

    setSaving(false);
    setShowForm(false);
    setEditing(null);
    fetchAddresses();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
    await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    fetchAddresses();
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">

          {/* Header */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-[#8a7060] mb-4">
              <Link href="/account" className="hover:text-[#0f0a05] transition-colors">Account</Link>
              <ChevronRight size={13} />
              <span className="text-[#0f0a05] font-semibold">Addresses</span>
            </nav>
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-4xl font-bold text-[#0f0a05]">My Addresses</h1>
              <button onClick={openAdd}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0f0a05] text-white text-sm font-bold rounded-full hover:bg-[#7a5c44] transition-colors">
                <Plus size={15} /> Add New
              </button>
            </div>
          </div>

          {/* Address Form Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-serif text-xl font-bold text-[#0f0a05]">{editing ? "Edit Address" : "Add Address"}</h2>
                  <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-[#0f0a05] hover:text-white transition-colors">
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Label</label>
                      <select name="label" value={form.label} onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]">
                        <option>Home</option>
                        <option>Work</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input name="full_name" value={form.full_name} onChange={handleChange} required
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                        placeholder="Full name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Address Line 1 *</label>
                    <input name="line1" value={form.line1} onChange={handleChange} required
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                      placeholder="Street address" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Address Line 2</label>
                    <input name="line2" value={form.line2} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                      placeholder="Apartment, floor, etc." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">City *</label>
                      <input name="city" value={form.city} onChange={handleChange} required
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                        placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">State</label>
                      <input name="state" value={form.state} onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                        placeholder="State" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Postcode *</label>
                      <input name="postcode" value={form.postcode} onChange={handleChange} required
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                        placeholder="Postcode" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Country</label>
                      <select name="country" value={form.country} onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]">
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm focus:outline-none focus:border-[#0f0a05]"
                      placeholder="+234 000 000 0000" />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="is_default" checked={form.is_default} onChange={handleChange}
                      className="w-4 h-4 rounded border-[#e0d4c8] accent-[#0f0a05]" />
                    <span className="text-sm text-[#5a4a3a] font-medium">Set as default address</span>
                  </label>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit" disabled={saving}
                    className={`w-full py-3 font-bold text-sm rounded-full transition-colors ${
                      saving ? "bg-[#8a7060] text-white cursor-wait" : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"
                    }`}>
                    {saving ? "Saving…" : editing ? "Update Address" : "Save Address"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Address List */}
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-[#f0ebe3] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-[#8a7060]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0f0a05] mb-2">No addresses saved</h2>
              <p className="text-[#8a7060] mb-6">Add a shipping address to speed up checkout.</p>
              <button onClick={openAdd} className="inline-flex items-center gap-2 px-8 py-3 bg-[#0f0a05] text-white text-sm font-bold rounded-full hover:bg-[#7a5c44] transition-colors">
                <Plus size={15} /> Add Address
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div key={addr.id} className={`bg-white rounded-2xl border p-6 transition-colors ${addr.is_default ? "border-[#0f0a05]" : "border-[#ede8e0]"}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-[#f0ebe3] text-[#5a4a3a] px-3 py-1 rounded-full">
                        {addr.label}
                      </span>
                      {addr.is_default && (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                          <CheckCircle size={12} /> Default
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {!addr.is_default && (
                        <button onClick={() => handleSetDefault(addr.id)}
                          className="flex items-center gap-1 text-xs text-[#8a7060] hover:text-[#0f0a05] transition-colors font-medium">
                          <Star size={12} /> Set default
                        </button>
                      )}
                      <button onClick={() => openEdit(addr)}
                        className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-[#0f0a05] hover:text-white transition-colors text-[#5a4a3a]">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDelete(addr.id)}
                        className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-[#5a4a3a]">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-[#5a4a3a] space-y-0.5">
                    <p className="font-semibold text-[#0f0a05]">{addr.full_name}</p>
                    <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                    <p>{addr.city}{addr.state ? `, ${addr.state}` : ""} {addr.postcode}</p>
                    <p>{addr.country}</p>
                    {addr.phone && <p className="text-[#8a7060]">{addr.phone}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}