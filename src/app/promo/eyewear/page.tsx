"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, Sparkles } from "lucide-react";

// ── 10 Eyewear Products ──
const products = [
  { id: "1",  name: "Classic Aviator Shades",    slug: "classic-aviator-shades",  category: "Eyewear",     price: 58.00,  originalPrice: null,   rating: 4.7, reviews: 178, isNew: false, isSale: false, bg: "#2a2218", image: "/accessories/aviator.jpg" },
  { id: "2",  name: "Tortoise Cat Eye Frames",   slug: "tortoise-cat-eye",        category: "Eyewear",     price: 72.00,  originalPrice: 90.00,  rating: 4.8, reviews: 134, isNew: true,  isSale: true,  bg: "#c8a878", image: "/accessories/cat-eye.jpg" },
  { id: "3",  name: "Oversized Square Frames",   slug: "square-frames",           category: "Eyewear",     price: 65.00,  originalPrice: 82.00,  rating: 4.6, reviews: 143, isNew: false, isSale: true,  bg: "#1a1810", image: "/related/square-frames.jpg" },
  { id: "4",  name: "Round Wire Frames",         slug: "round-wire-frames",       category: "Eyewear",     price: 52.00,  originalPrice: null,   rating: 4.7, reviews: 98,  isNew: true,  isSale: false, bg: "#c0a858", image: "/related/round-frames.jpg" },
  { id: "5",  name: "Minimalist Watch",          slug: "minimalist-watch",        category: "Watches",     price: 185.00, originalPrice: null,   rating: 4.9, reviews: 97,  isNew: true,  isSale: false, bg: "#e8e0d5", image: "/accessories/watch.jpg" },
  { id: "6",  name: "Leather Crossbody Bag",     slug: "leather-crossbody-bag",   category: "Bags",        price: 95.00,  originalPrice: 120.00, rating: 4.9, reviews: 203, isNew: false, isSale: true,  bg: "#c8b8a0", image: "/accessories/crossbody.jpg" },
  { id: "7",  name: "Gold Chain Necklace",       slug: "gold-chain-necklace",     category: "Jewellery",   price: 65.00,  originalPrice: null,   rating: 4.9, reviews: 221, isNew: true,  isSale: false, bg: "#e8e0c8", image: "/accessories/necklace.jpg" },
  { id: "8",  name: "Wool Knit Beanie",          slug: "wool-knit-beanie",        category: "Hats",        price: 32.00,  originalPrice: 42.00,  rating: 4.8, reviews: 145, isNew: false, isSale: true,  bg: "#d5d8e8", image: "/accessories/beanie.jpg" },
  { id: "9",  name: "Silk Neck Scarf",           slug: "silk-neck-scarf",         category: "Scarves",     price: 38.00,  originalPrice: 50.00,  rating: 4.7, reviews: 88,  isNew: false, isSale: true,  bg: "#e8d5d8", image: "/accessories/scarf.jpg" },
  { id: "10", name: "Canvas Tote Bag",           slug: "canvas-tote-bag",         category: "Bags",        price: 45.00,  originalPrice: null,   rating: 4.6, reviews: 312, isNew: true,  isSale: false, bg: "#e8ddd5", image: "/accessories/tote.jpg" },
];

const filters = ["All", "Eyewear", "Watches", "Bags", "Jewellery", "Hats", "Scarves"];

export default function EyewearPromoPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddToCart = (id: string) => {
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const filtered = activeFilter === "All"
    ? products
    : products.filter((p) => p.category === activeFilter);

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative w-full min-h-[70vh] bg-[#1a1208] overflow-hidden flex items-center">

        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/promo/eyewear-banner.jpg')] bg-cover bg-center opacity-40" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1208]/95 via-[#1a1208]/65 to-transparent" />

        {/* Floating decorative rings */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-72 h-72 rounded-full border border-amber-300/10" />
          <div className="absolute inset-6 rounded-full border border-amber-300/15" />
          <div className="absolute inset-14 rounded-full border border-amber-300/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight size={13} />
            <Link href="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link>
            <ChevronRight size={13} />
            <span className="text-white/70">Eyewear</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles size={13} className="text-amber-300" />
            <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
              Curated Collection
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Latest Eyewear
            <span className="block italic text-amber-300">For You</span>
          </h1>

          <p className="text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
            Complete your look with our curated collection of premium eyewear.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-8 mb-10">
            {[
              { value: "4+",   label: "Frame Styles" },
              { value: "100%", label: "UV Protection" },
              { value: "Free", label: "Returns" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white font-serif">{stat.value}</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-white text-[#1a1208] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-amber-300 transition-colors duration-300"
            >
              <ShoppingCart size={15} />
              Shop Eyewear
            </a>
            <Link
              href="/shop/accessories"
              className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors duration-300"
            >
              All Accessories
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf8f5] to-transparent" />
      </section>

      {/* ── Products Section ── */}
      <main id="products" className="bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-2">
                Premium Accessories
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05]">
                Shop The Collection
              </h2>
            </div>
            <Link
              href="/shop/accessories"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#0f0a05] border-b-2 border-[#0f0a05] pb-0.5 hover:text-[#7a5c44] hover:border-[#7a5c44] transition-colors self-start sm:self-auto"
            >
              View All Accessories
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Filter Tabs */}
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
            <span className="text-sm text-[#8a7060] ml-2">{filtered.length} items</span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filtered.map((product) => (
              <div key={product.id} className="group flex flex-col">

                {/* Image */}
                <Link href={`/shop/product/${product.slug}`} className="block">
                  <div
                    className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3"
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

                    {/* Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="bg-[#0f0a05] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                          Sale
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7060] font-semibold mb-1">
                    {product.category}
                  </p>

                  <Link href={`/shop/product/${product.slug}`}>
                    <h3 className="font-serif text-[#0f0a05] font-semibold text-sm hover:text-[#7a5c44] transition-colors mb-1.5">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={9} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8a7060]">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[#0f0a05] font-bold text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[#8a7060] text-xs line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="text-red-500 text-[10px] font-bold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className={`mt-auto w-full flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-full border transition-all duration-300 ${
                      addedId === product.id
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-[#0f0a05] border-[#e0d4c8] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05]"
                    }`}
                  >
                    <ShoppingCart size={11} />
                    {addedId === product.id ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#8a7060] font-serif text-lg">No items found.</p>
            </div>
          )}

          {/* Bottom CTA banner */}
          <div className="mt-16 rounded-3xl bg-[#0f0a05] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-2">
                The Full Edit
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Explore all accessories.
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Bags, jewellery, scarves, hats and more.
              </p>
            </div>
            <Link
              href="/shop/accessories"
              className="shrink-0 bg-amber-300 text-[#0f0a05] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-white transition-colors duration-300"
            >
              Shop Accessories
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}