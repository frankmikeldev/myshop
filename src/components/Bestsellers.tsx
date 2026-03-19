"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Star } from "lucide-react";

const filters = ["All", "Men", "Women", "Kids", "Accessories"];

const bestsellers = [
  {
    id: "1",
    name: "Funky Hoodie",
    slug: "funky-hoodie",
    category: "Men",
    price: 125.0,
    originalPrice: 160.0,
    image: "/products/hoodie-1.jpg",
    rating: 4.8,
    reviews: 124,
    isSale: true,
    bg: "#dde0e8",
  },
  {
    id: "2",
    name: "Mini Jacket",
    slug: "mini-jacket",
    category: "Women",
    price: 155.0,
    originalPrice: null,
    image: "/products/jacket-1.jpg",
    rating: 4.9,
    reviews: 98,
    isSale: false,
    bg: "#e8ddd5",
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    category: "Accessories",
    price: 95.0,
    originalPrice: 120.0,
    image: "/accessories/crossbody.jpg",
    rating: 4.9,
    reviews: 203,
    isSale: true,
    bg: "#c8b8a0",
  },
  {
    id: "4",
    name: "Classic Aviator Shades",
    slug: "classic-aviator-shades",
    category: "Accessories",
    price: 58.0,
    originalPrice: null,
    image: "/accessories/aviator.jpg",
    rating: 4.7,
    reviews: 178,
    isSale: false,
    bg: "#2a2218",
  },
  {
    id: "5",
    name: "Kids Denim Set",
    slug: "kids-denim-set",
    category: "Kids",
    price: 55.0,
    originalPrice: 70.0,
    image: "/products/kids-1.jpg",
    rating: 4.8,
    reviews: 56,
    isSale: true,
    bg: "#d5e8dd",
  },
  {
    id: "6",
    name: "Linen Trousers",
    slug: "linen-trousers",
    category: "Women",  // ✅ fixed from Men to Women
    price: 75.0,
    originalPrice: null,
    image: "/products/trousers-1.jpg",
    rating: 4.5,
    reviews: 142,
    isSale: false,
    bg: "#e8ddd5",
  },
];

export default function Bestsellers() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? bestsellers
      : bestsellers.filter((p) => p.category === activeFilter);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-3">
              Customer Favourites
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">
              Bestsellers
            </h2>
            <p className="mt-3 text-[#5a4a3a] text-base max-w-md">
              From cult-favorite jackets to must-have accessories — these are our customer faves.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#0f0a05] border-b-2 border-[#0f0a05] pb-0.5 hover:text-[#7a5c44] hover:border-[#7a5c44] transition-colors duration-300 self-start sm:self-auto"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeFilter === f
                  ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                  : "bg-white text-[#5a4a3a] border-[#e0d4c8] hover:border-[#0f0a05] hover:text-[#0f0a05]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="group flex flex-col">

              {/* ── Image — clicks to product page ── */}
              <Link href={`/shop/product/${product.slug}`} className="block">
                <div
                  className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4"
                  style={{ backgroundColor: product.bg }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />

                  {/* Sale Badge */}
                  {product.isSale && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        Sale
                      </span>
                    </div>
                  )}

                  {/* Quick View — top right on hover */}
                  <div className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm text-[#0f0a05] hover:bg-[#0f0a05] hover:text-white">
                    <Eye size={14} />
                  </div>
                </div>
              </Link>

              {/* ── Product Info ── */}
              <div className="flex flex-col flex-1">
                <p className="text-[11px] uppercase tracking-widest text-[#8a7060] font-semibold mb-1">
                  {product.category}
                </p>

                {/* ── Name — clicks to product page ── */}
                <Link href={`/shop/product/${product.slug}`}>
                  <h3 className="font-serif text-[#0f0a05] font-semibold text-base hover:text-[#7a5c44] transition-colors duration-200 mb-1.5">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8a7060]">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-[#0f0a05] font-bold text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[#8a7060] text-sm line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-red-500 text-xs font-bold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}