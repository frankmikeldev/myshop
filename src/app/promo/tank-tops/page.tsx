"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, Tag } from "lucide-react";

// ── 10 Tank Top Products ──
const products = [
  { id: "1",  name: "Ribbed Scoop Tank",         slug: "ribbed-scoop-tank",       category: "Women", price: 28.00, originalPrice: 35.00, rating: 4.8, reviews: 214, isNew: true,  bg: "#e8d5c8", image: "/promo/tank-ribbed-scoop.jpg" },
  { id: "2",  name: "Oversized Muscle Tee",       slug: "oversized-muscle-tee",    category: "Men",   price: 30.00, originalPrice: 38.00, rating: 4.7, reviews: 178, isNew: false, bg: "#2a2820", image: "/promo/tank-muscle-tee.jpg" },
  { id: "3",  name: "Linen Tie-Front Tank",       slug: "linen-tie-front-tank",    category: "Women", price: 32.00, originalPrice: 40.00, rating: 4.9, reviews: 143, isNew: true,  bg: "#d8e0c8", image: "/promo/tank-linen-tie.jpg" },
  { id: "4",  name: "Classic White Vest",         slug: "classic-white-vest",      category: "Men",   price: 22.00, originalPrice: 28.00, rating: 4.6, reviews: 301, isNew: false, bg: "#f0ece8", image: "/promo/tank-white-vest.jpg" },
  { id: "5",  name: "Spaghetti Strap Cami",       slug: "spaghetti-strap-cami",    category: "Women", price: 24.00, originalPrice: 30.00, rating: 4.7, reviews: 256, isNew: true,  bg: "#e8d8d0", image: "/promo/tank-spaghetti.jpg" },
  { id: "6",  name: "Printed Graphic Tank",       slug: "printed-graphic-tank",    category: "Men",   price: 28.00, originalPrice: 35.00, rating: 4.5, reviews: 189, isNew: true,  bg: "#d0d8e8", image: "/promo/tank-graphic.jpg" },
  { id: "7",  name: "Cropped Racerback Tank",     slug: "cropped-racerback-tank",  category: "Women", price: 26.00, originalPrice: 32.00, rating: 4.8, reviews: 167, isNew: true,  bg: "#e8d0d8", image: "/promo/tank-racerback.jpg" },
  { id: "8",  name: "Striped Nautical Tank",      slug: "striped-nautical-tank",   category: "Men",   price: 30.00, originalPrice: 38.00, rating: 4.6, reviews: 122, isNew: false, bg: "#d8e8e0", image: "/promo/tank-nautical.jpg" },
  { id: "9",  name: "Flowy Chiffon Cami",         slug: "flowy-chiffon-cami",      category: "Women", price: 34.00, originalPrice: 42.00, rating: 4.9, reviews: 98,  isNew: true,  bg: "#e0d8e8", image: "/promo/tank-chiffon.jpg" },
  { id: "10", name: "Performance Active Tank",    slug: "performance-active-tank", category: "Unisex",price: 32.00, originalPrice: 40.00, rating: 4.7, reviews: 144, isNew: true,  bg: "#1a2028", image: "/promo/tank-active.jpg" },
];

const filters = ["All", "Men", "Women", "Unisex"];

export default function TankTopsPromoPage() {
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
      <section className="relative w-full min-h-[70vh] bg-[#0a1408] overflow-hidden flex items-center">

        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/promo/tank-banner.jpg')] bg-cover bg-center opacity-40" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1408]/90 via-[#0a1408]/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-20">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight size={13} />
            <span className="text-white/70">Tank Tops</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Tag size={13} className="text-amber-300" />
            <span className="text-amber-300 text-xs font-bold uppercase tracking-[0.2em]">
              Limited Summer Deal
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            20% Off On
            <span className="block italic text-amber-300">Tank Tops</span>
          </h1>

          <p className="text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
            Fresh summer styles made for warmth, comfort, and effortless confidence.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-8 mb-10">
            {[
              { value: "10+", label: "New Styles" },
              { value: "20%", label: "Off Everything" },
              { value: "Free", label: "Returns" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white font-serif">{stat.value}</p>
                <p className="text-xs text-white/50 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-white text-[#0a1408] px-7 py-3.5 rounded-full font-bold text-sm hover:bg-amber-300 transition-colors duration-300"
            >
              <ShoppingCart size={15} />
              Shop the Drop
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors duration-300"
            >
              View All
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
                Summer Collection
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05]">
                Latest Tank Tops
              </h2>
            </div>

            {/* Promo pill */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-5 py-2.5 shrink-0">
              <Tag size={13} className="text-red-500" />
              <span className="text-red-500 text-sm font-bold">20% Off All Styles</span>
            </div>
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
            <span className="text-sm text-[#8a7060] ml-2">{filtered.length} styles</span>
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
                      <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        -20%
                      </span>
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
                    <span className="text-[#8a7060] text-xs line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
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
              <p className="text-[#8a7060] font-serif text-lg">No styles found.</p>
            </div>
          )}

          {/* Bottom CTA banner */}
          <div className="mt-16 rounded-3xl bg-[#0f0a05] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-2">
                Don't Miss Out
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Summer sale ends soon.
              </h3>
              <p className="text-white/50 text-sm mt-1">
                20% off applied automatically at checkout.
              </p>
            </div>
            <Link
              href="/shop"
              className="shrink-0 bg-amber-300 text-[#0f0a05] font-bold text-sm px-8 py-3.5 rounded-full hover:bg-white transition-colors duration-300"
            >
              Explore All Deals
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}