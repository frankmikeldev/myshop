"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

type PromoCard = {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  bg: string;
  modal: {
    label: string;
    options: { label: string; href: string; icon: string; sub: string }[];
  };
};

const promoCards: PromoCard[] = [
  {
    id: "tanks",
    title: "20% Off On Tank Tops",
    description: "Fresh summer styles made for warmth, comfort, and effortless confidence.",
    cta: "Shop Now",
    image: "/promo/womens-promo.jpg",
    bg: "#c9a89a",
    modal: {
      label: "Which tank tops do you want to shop?",
      options: [
        { label: "Men",   href: "/shop/tanks/mens",   icon: "👔", sub: "Men's tank tops" },
        { label: "Women", href: "/shop/tanks/womens", icon: "👗", sub: "Women's tank tops" },
        { label: "Kids",  href: "/shop/tanks/kids",   icon: "🧒", sub: "Kids' tank tops" },
      ],
    },
  },
  {
    id: "accessories",
    title: "Latest Accessories For You",
    description: "Complete your look with our curated collection of premium accessories.",
    cta: "Shop Now",
    image: "/promo/mens-promo.jpg",
    bg: "#7a9aaa",
    modal: {
      label: "Which accessories do you want to shop?",
      options: [
        { label: "Men",   href: "/shop/accessories/mens",   icon: "👔", sub: "Men's accessories" },
        { label: "Women", href: "/shop/accessories/womens", icon: "👗", sub: "Women's accessories" },
        { label: "Kids",  href: "/shop/accessories/kids",   icon: "🧒", sub: "Kids' accessories" },
      ],
    },
  },
  {
    id: "suits",
    title: "Let's Suit Up!",
    description: "Sharp, tailored suits for every occasion — crafted to impress.",
    cta: "Check Out",
    image: "/promo/suits-promo.jpg",
    bg: "#b89aaa",
    modal: {
      label: "Which suits do you want to shop?",
      options: [
        { label: "Men",   href: "/shop/suits/mens",   icon: "👔", sub: "Men's suits" },
        { label: "Women", href: "/shop/suits/womens", icon: "👗", sub: "Women's suits" },
        { label: "Kids",  href: "/shop/suits/kids",   icon: "🧒", sub: "Kids' suits" },
      ],
    },
  },
];

export default function PromoCards() {
  const [activeCard, setActiveCard] = useState<PromoCard | null>(null);

  return (
    <>
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* ── Section Header ── */}
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-3">
              Explore
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">
              Latest Products
            </h2>
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {promoCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setActiveCard(card)}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                style={{ backgroundColor: card.bg }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  unoptimized
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-white font-serif text-2xl font-bold leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center bg-white text-[#0f0a05] text-xs font-bold uppercase tracking-widest px-7 py-3 rounded-sm group-hover:bg-[#0f0a05] group-hover:text-white transition-colors duration-300">
                    {card.cta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Modal ── */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setActiveCard(null)}
        >
          <div
            className="relative bg-[#faf8f5] rounded-2xl p-8 w-full max-w-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center text-[#5a4a3a] hover:bg-[#0f0a05] hover:text-white transition-colors"
            >
              <X size={15} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-1">
                {activeCard.title}
              </p>
              <h3 className="font-serif text-2xl font-bold text-[#0f0a05] leading-snug">
                {activeCard.modal.label}
              </h3>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {activeCard.modal.options.map((opt) => (
                <Link
                  key={opt.label}
                  href={opt.href}
                  onClick={() => setActiveCard(null)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border border-[#e0d4c8] bg-white hover:border-[#0f0a05] hover:bg-[#0f0a05] group transition-all duration-200"
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <p className="font-serif font-bold text-[#0f0a05] group-hover:text-white transition-colors text-base">
                      {opt.label}
                    </p>
                    <p className="text-xs text-[#8a7060] group-hover:text-white/70 transition-colors">
                      {opt.sub}
                    </p>
                  </div>
                  <span className="ml-auto text-[#c0b0a0] group-hover:text-white/60 transition-colors text-lg">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}