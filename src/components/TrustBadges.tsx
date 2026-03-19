"use client";

import { Globe, Sparkles, Tag, ShieldCheck } from "lucide-react";

const badges = [
  {
    icon: Globe,
    title: "Worldwide Shipping",
    description: "We deliver to over 100 countries so you can shop from anywhere in the world.",
  },
  {
    icon: Sparkles,
    title: "Best Quality",
    description: "Every piece is carefully crafted with premium materials built to last.",
  },
  {
    icon: Tag,
    title: "Best Offers",
    description: "Get the best deals and exclusive discounts on all your favourite styles.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Shop with confidence — all transactions are encrypted and fully secure.",
  },
];

export default function TrustBadges() {
  return (
    <section className="w-full py-20 bg-[#faf8f5] border-y border-[#ede8e0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-3">
            Why Choose Us
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">
            The Velora Promise
          </h2>
        </div>

        {/* ── Badges Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-full bg-[#f0ebe3] border border-[#e0d4c8] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#0f0a05] group-hover:border-[#0f0a05]">
                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    className="text-[#7a5c44] transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                {/* Title */}
                <h4 className="font-serif font-bold text-[#0f0a05] text-base mb-2">
                  {badge.title}
                </h4>

                {/* Divider */}
                <div className="w-8 h-px bg-[#c8b8a8] mb-3" />

                {/* Description */}
                <p className="text-[#5a4a3a] text-sm leading-relaxed max-w-[190px]">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}