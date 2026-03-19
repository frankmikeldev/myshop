"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  CheckCircle,
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@velora.com",
    sub: "We reply within 2 hours",
    href: "mailto:hello@velora.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+234 901 234 5678",
    sub: "Mon–Fri, 9am – 6pm WAT",
    href: "tel:+2349012345678",
  },
  {
    icon: MessageCircle,
    label: "Live Chat",
    value: "Start a conversation",
    sub: "Available during business hours",
    href: "#",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "14 Broad Street, Lagos Island",
    sub: "Lagos, Nigeria",
    href: "#",
  },
];

const topics = [
  "Order enquiry",
  "Return or exchange",
  "Sizing help",
  "Product question",
  "Wholesale & partnerships",
  "Press & media",
  "Career enquiry",
  "Other",
];

const officeHours = [
  { day: "Monday – Friday", hours: "9:00am – 6:00pm WAT" },
  { day: "Saturday",        hours: "10:00am – 4:00pm WAT" },
  { day: "Sunday",          hours: "Closed" },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  const isOrderTopic =
    form.topic === "Order enquiry" || form.topic === "Return or exchange";

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="bg-[#0f0a05] pt-32 pb-20 relative overflow-hidden">
        {/* Decorative amber dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-10">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Home
            </Link>
            <ChevronRight size={13} />
            <span className="text-white/60">Contact</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-4">
                Get in Touch
              </p>
              <h1 className="font-serif font-bold text-white leading-none">
                <span className="block text-6xl sm:text-7xl lg:text-8xl">We'd love</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl italic text-amber-400">
                  to hear
                </span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl">from you.</span>
              </h1>
            </div>
            <div className="lg:pb-3 max-w-sm">
              <p className="text-white/40 text-lg leading-relaxed">
                Whether it's a question about your order, a return, or just
                wanting to say hello — our team is here for you.
              </p>
            </div>
          </div>

          {/* Contact method cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                className="group p-5 rounded-2xl border border-white/10 hover:border-amber-400/30 hover:bg-white/5 transition-all duration-300 block"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                  <method.icon size={17} className="text-amber-400" />
                </div>
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">
                  {method.label}
                </p>
                <p className="text-white font-semibold text-sm mb-0.5">
                  {method.value}
                </p>
                <p className="text-white/30 text-xs">{method.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          MAIN — Form + Info
      ══════════════════════════════ */}
      <main className="bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">

            {/* ── Contact Form ── */}
            <div>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
                  Send a Message
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05]">
                  How can we help?
                </h2>
              </div>

              {!submitted ? (
                <div className="bg-white border border-[#ede8e0] rounded-3xl p-8 sm:p-10 space-y-6">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full border border-[#e0d4c8] rounded-xl px-4 py-3 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors bg-[#faf8f5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full border border-[#e0d4c8] rounded-xl px-4 py-3 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors bg-[#faf8f5]"
                      />
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                      Topic
                    </label>
                    <div className="relative">
                      <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        className="w-full border border-[#e0d4c8] rounded-xl px-4 py-3 text-sm text-[#0f0a05] focus:outline-none focus:border-[#0f0a05] transition-colors bg-[#faf8f5] appearance-none cursor-pointer"
                      >
                        <option value="">Select a topic…</option>
                        {topics.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronRight
                        size={14}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[#8a7060] pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Order Number — conditional */}
                  {isOrderTopic && (
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                        Order Number
                      </label>
                      <input
                        type="text"
                        name="orderNumber"
                        value={form.orderNumber}
                        onChange={handleChange}
                        placeholder="e.g. VLR-2026-00412"
                        className="w-full border border-[#e0d4c8] rounded-xl px-4 py-3 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors bg-[#faf8f5]"
                      />
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us what's on your mind…"
                      className="w-full border border-[#e0d4c8] rounded-xl px-4 py-3 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors bg-[#faf8f5] resize-none"
                    />
                    <p className="text-[11px] text-[#8a7060] mt-1.5 text-right">
                      {form.message.length} / 1000
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.message || loading}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                      loading
                        ? "bg-[#e0d4c8] text-[#8a7060] cursor-wait"
                        : !form.name || !form.email || !form.message
                        ? "bg-[#e0d4c8] text-[#8a7060] cursor-not-allowed"
                        : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#8a7060] text-center">
                    Fields marked <span className="text-red-400">*</span> are required. We typically reply within 2 hours.
                  </p>
                </div>
              ) : (

                /* ── Success State ── */
                <div className="bg-white border border-[#ede8e0] rounded-3xl p-10 sm:p-14 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0f0a05] mb-3">
                    Message sent!
                  </h3>
                  <p className="text-[#5a4a3a] text-sm leading-relaxed max-w-sm mx-auto mb-8">
                    Thanks for reaching out, <strong>{form.name.split(" ")[0]}</strong>. We've received your message and will get back to you at <strong>{form.email}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "", orderNumber: "", message: "" }); }}
                    className="inline-flex items-center gap-2 border border-[#e0d4c8] text-[#0f0a05] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05] transition-all duration-300"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>

            {/* ── Right Info Panel ── */}
            <div className="space-y-6">

              {/* Office hours */}
              <div className="bg-white border border-[#ede8e0] rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#0f0a05] flex items-center justify-center">
                    <Clock size={15} className="text-amber-400" />
                  </div>
                  <p className="font-serif font-bold text-[#0f0a05] text-lg">Office Hours</p>
                </div>
                <div className="space-y-3">
                  {officeHours.map((o) => (
                    <div key={o.day} className="flex justify-between items-center py-2.5 border-b border-[#f0ebe3] last:border-0">
                      <span className="text-sm text-[#5a4a3a] font-medium">{o.day}</span>
                      <span className={`text-sm font-semibold ${o.hours === "Closed" ? "text-red-400" : "text-[#0f0a05]"}`}>
                        {o.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="bg-white border border-[#ede8e0] rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#0f0a05] flex items-center justify-center">
                    <MapPin size={15} className="text-amber-400" />
                  </div>
                  <p className="font-serif font-bold text-[#0f0a05] text-lg">Find Us</p>
                </div>
                <p className="text-sm text-[#5a4a3a] leading-relaxed mb-4">
                  14 Broad Street, Lagos Island<br />
                  Lagos, Nigeria 101001
                </p>
                {/* Map placeholder */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#e8ddd5] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={24} className="text-[#8a7060] mx-auto mb-2" />
                    <p className="text-[#8a7060] text-xs">Map placeholder</p>
                    <p className="text-[#8a7060] text-xs">Embed Google Maps here</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-[#0f0a05] rounded-2xl p-7">
                <p className="font-serif font-bold text-white text-lg mb-2">Follow Velora</p>
                <p className="text-white/30 text-sm mb-5">Stay connected for the latest drops, edits and stories.</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Instagram, label: "Instagram", href: "#" },
                    { icon: Twitter,   label: "Twitter",   href: "#" },
                    { icon: Youtube,   label: "YouTube",   href: "#" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.label}
                      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-200"
                    >
                      <s.icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ shortcut */}
              <Link
                href="/faqs"
                className="group flex items-center justify-between gap-4 bg-amber-400 rounded-2xl p-6 hover:bg-amber-300 transition-colors duration-300"
              >
                <div>
                  <p className="font-serif font-bold text-[#0f0a05] text-lg">Looking for quick answers?</p>
                  <p className="text-[#0f0a05]/60 text-sm mt-0.5">Browse our FAQ page</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#0f0a05]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0f0a05]/20 transition-colors">
                  <ChevronRight size={16} className="text-[#0f0a05]" />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}