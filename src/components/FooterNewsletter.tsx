"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import { useState } from "react";

// ── Newsletter Section ──
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="w-full py-20 bg-[#0f0a05] relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-white/[0.03] font-serif text-[180px] font-bold whitespace-nowrap">
          VELORA
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-4">
          Stay in the Loop
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
          Get Our Latest <br />
          <span className="italic font-light text-amber-300">Products & Offers</span>
        </h2>
        <p className="text-white/50 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
          Subscribe and get 10% off your first order, plus exclusive access to
          new drops and insider deals.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-full text-sm font-medium">
            ✓ You're subscribed! Check your inbox.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-full px-6 py-3.5 text-sm focus:outline-none focus:border-amber-300 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0f0a05] font-bold text-sm px-7 py-3.5 rounded-full hover:bg-amber-300 transition-colors duration-300 shrink-0"
            >
              Subscribe
              <Send size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Footer Section ──
const footerLinks = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "My Account", href: "/account" },
      { label: "Cart", href: "/cart" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "For Her",
    links: [
      { label: "Women Dresses", href: "/shop/womens" },
      { label: "Tops & Shirts", href: "/shop/womens" },
      { label: "Women Jackets", href: "/shop/womens" },
      { label: "Heels & Flats", href: "/shop/accessories" },
      { label: "Women Accessories", href: "/shop/accessories" },
    ],
  },
  {
    heading: "For Him",
    links: [
      { label: "Men Jeans", href: "/shop/mens" },
      { label: "Men Shirts", href: "/shop/mens" },
      { label: "Men Shoes", href: "/shop/mens" },
      { label: "Men Accessories", href: "/shop/accessories" },
      { label: "Men Jackets", href: "/shop/mens" },
    ],
  },
  {
    heading: "Help & Info",
    links: [
      { label: "FAQ's", href: "/faqs" },
      { label: "Return Policy", href: "/returns" },
      { label: "Order Status", href: "/orders" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#faf8f5] border-t border-[#ede8e0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Top Footer ── */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h5 className="font-serif font-bold text-[#0f0a05] text-base mb-5">
                {col.heading}
              </h5>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#5a4a3a] text-sm hover:text-[#0f0a05] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom Footer ── */}
        <div className="py-6 border-t border-[#ede8e0] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + Copyright */}
          <div className="flex items-center gap-4">
            <span className="font-serif font-bold text-xl text-[#0f0a05] uppercase">
              Velora
            </span>
            <span className="text-[#8a7060] text-xs">
              © {new Date().getFullYear()} Velora. All rights reserved.
            </span>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#e0d4c8] flex items-center justify-center text-[#5a4a3a] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05] transition-all duration-200"
                >
                  <Icon size={15} />
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
}