"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, ArrowRight } from "lucide-react";

// ── 10 Suit Products ──
const products = [
  { id: "1",  name: "The Slim Black Tuxedo",      slug: "slim-black-tuxedo",       category: "Tuxedos",    price: 389.00, originalPrice: 480.00, rating: 4.9, reviews: 87,  isNew: true,  isSale: true,  bg: "#0f0f0f", image: "/suits/black-tuxedo.jpg" },
  { id: "2",  name: "Classic Navy Two-Piece",      slug: "navy-two-piece",          category: "Suits",      price: 295.00, originalPrice: null,   rating: 4.8, reviews: 134, isNew: false, isSale: false, bg: "#1a2038", image: "/suits/navy-suit.jpg" },
  { id: "3",  name: "Charcoal Double Breasted",    slug: "charcoal-double-breasted",category: "Suits",      price: 345.00, originalPrice: 420.00, rating: 4.7, reviews: 76,  isNew: false, isSale: true,  bg: "#2a2a2a", image: "/suits/charcoal-db.jpg" },
  { id: "4",  name: "Ivory Linen Wedding Suit",    slug: "ivory-linen-wedding",     category: "Wedding",    price: 315.00, originalPrice: null,   rating: 4.9, reviews: 112, isNew: true,  isSale: false, bg: "#e8e0d0", image: "/suits/ivory-linen.jpg" },
  { id: "5",  name: "Grey Pinstripe Three-Piece",  slug: "grey-pinstripe-3piece",   category: "3-Piece",    price: 375.00, originalPrice: 460.00, rating: 4.8, reviews: 63,  isNew: true,  isSale: true,  bg: "#505058", image: "/suits/grey-pinstripe.jpg" },
  { id: "6",  name: "Camel Wool Blazer",           slug: "camel-wool-blazer",       category: "Blazers",    price: 195.00, originalPrice: null,   rating: 4.7, reviews: 198, isNew: true,  isSale: false, bg: "#c8a870", image: "/suits/camel-blazer.jpg" },
  { id: "7",  name: "Midnight Blue Tuxedo",        slug: "midnight-blue-tuxedo",    category: "Tuxedos",    price: 420.00, originalPrice: 510.00, rating: 4.9, reviews: 54,  isNew: true,  isSale: true,  bg: "#101828", image: "/suits/midnight-tuxedo.jpg" },
  { id: "8",  name: "Brown Heritage Check Suit",   slug: "brown-check-suit",        category: "Suits",      price: 310.00, originalPrice: null,   rating: 4.6, reviews: 89,  isNew: false, isSale: false, bg: "#5a3820", image: "/suits/brown-check.jpg" },
  { id: "9",  name: "Olive Slim Fit Suit",         slug: "olive-slim-fit",          category: "Suits",      price: 275.00, originalPrice: 340.00, rating: 4.7, reviews: 117, isNew: false, isSale: true,  bg: "#3a4028", image: "/suits/olive-slim.jpg" },
  { id: "10", name: "White Evening Dinner Jacket", slug: "white-dinner-jacket",     category: "Blazers",    price: 225.00, originalPrice: null,   rating: 4.8, reviews: 72,  isNew: true,  isSale: false, bg: "#e8e8e0", image: "/suits/white-dinner.jpg" },
];

const filters = ["All", "Suits", "Tuxedos", "Blazers", "Wedding", "3-Piece"];

// Featured 3 for the editorial grid
const featured = products.slice(0, 3);

export default function SuitsPromoPage() {
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

      {/* ══════════════════════════════════════
          HERO — Split layout, dark left / image right
      ══════════════════════════════════════ */}
      <section className="w-full min-h-screen bg-[#0f0a05] flex flex-col lg:flex-row overflow-hidden">

        {/* Left: Text panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20 lg:py-0 lg:w-[52%] shrink-0">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-10">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/shop" className="hover:text-white/70 transition-colors">Shop</Link>
            <ChevronRight size={13} />
            <Link href="/shop/mens" className="hover:text-white/70 transition-colors">Men</Link>
            <ChevronRight size={13} />
            <span className="text-white/60">Suits</span>
          </nav>

          {/* Vertical rule + label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-amber-400" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.35em]">
              New Season · 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif font-bold text-white leading-[0.95] mb-6">
            <span className="block text-6xl sm:text-7xl lg:text-8xl">Let's</span>
            <span className="block text-6xl sm:text-7xl lg:text-8xl italic text-amber-400">Suit Up.</span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed mb-10">
            Sharp, tailored suits for every occasion — crafted to impress. From boardroom to black tie, wear it like you mean it.
          </p>

          {/* Suit stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 border-t border-white/10 pt-8">
            {[
              { value: "10",    label: "Styles" },
              { value: "5",     label: "Categories" },
              { value: "Made",  label: "To Last" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl lg:text-3xl font-bold text-white font-serif">{s.value}</p>
                <p className="text-[11px] text-white/30 uppercase tracking-widest mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#collection"
              className="group inline-flex items-center gap-3 bg-amber-400 text-[#0f0a05] px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors duration-300"
            >
              Shop the Collection
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/shop/mens"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full font-bold text-sm hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Men's Wear
            </Link>
          </div>

        </div>

        {/* Right: Editorial image collage */}
        <div className="relative lg:flex-1 min-h-[50vh] lg:min-h-screen overflow-hidden">

          {/* Main image */}
          <div className="absolute inset-0 bg-[url('/promo/suits-banner.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0f0a05]/60" />

          {/* Floating product card — bottom left */}
          <div className="absolute bottom-8 left-6 right-6 sm:right-auto sm:w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-16 rounded-xl overflow-hidden shrink-0 bg-[#1a2038]">
                <Image
                  src="/suits/navy-suit.jpg"
                  alt="Navy Suit"
                  width={56}
                  height={64}
                  unoptimized
                  className="object-cover w-full h-full"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold font-serif truncate">Classic Navy Two-Piece</p>
                <div className="flex gap-0.5 my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-amber-400 text-sm font-bold">$295.00</p>
              </div>
            </div>
          </div>

          {/* Sale badge — top right */}
          <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-amber-400 flex flex-col items-center justify-center">
            <span className="text-[#0f0a05] text-xs font-bold uppercase leading-none">Up to</span>
            <span className="text-[#0f0a05] text-2xl font-bold font-serif leading-none">20%</span>
            <span className="text-[#0f0a05] text-[9px] font-bold uppercase tracking-widest leading-none">Off</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EDITORIAL FEATURE — 3 hero cards
      ══════════════════════════════════════ */}
      <section className="bg-[#faf8f5] py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-2">Editor's Pick</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05]">Featured Styles</h2>
            </div>
          </div>

          {/* 3-column editorial grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <Link key={p.id} href={`/shop/product/${p.slug}`} className="group relative overflow-hidden rounded-2xl block">
                <div
                  className={`relative w-full overflow-hidden ${i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-[3/5]" : "aspect-[3/4]"}`}
                  style={{ backgroundColor: p.bg }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold mb-1">{p.category}</p>
                    <h3 className="font-serif text-white font-bold text-lg leading-snug mb-1">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-bold text-base">${p.price.toFixed(2)}</span>
                      <span className="text-white/50 text-xs font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                        View →
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    {p.isNew && (
                      <span className="bg-white text-[#0f0a05] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">New</span>
                    )}
                    {p.isSale && (
                      <span className="bg-amber-400 text-[#0f0a05] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Sale</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL COLLECTION GRID
      ══════════════════════════════════════ */}
      <main id="collection" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-2">Full Range</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05]">The Full Collection</h2>
            </div>
            <Link
              href="/shop/mens"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-[#0f0a05] border-b-2 border-[#0f0a05] pb-0.5 hover:text-[#7a5c44] hover:border-[#7a5c44] transition-colors self-start sm:self-auto"
            >
              All Men's Wear
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Filters */}
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

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filtered.map((product) => (
              <div key={product.id} className="group flex flex-col">

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
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="bg-white text-[#0f0a05] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">New</span>
                      )}
                      {product.isSale && (
                        <span className="bg-amber-400 text-[#0f0a05] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Sale</span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7060] font-semibold mb-1">{product.category}</p>
                  <Link href={`/shop/product/${product.slug}`}>
                    <h3 className="font-serif text-[#0f0a05] font-semibold text-sm hover:text-[#7a5c44] transition-colors mb-1.5">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={9} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8a7060]">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[#0f0a05] font-bold text-sm">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-[#8a7060] text-xs line-through">${product.originalPrice.toFixed(2)}</span>
                        <span className="text-amber-600 text-[10px] font-bold">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

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

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#8a7060] font-serif text-lg">No styles found.</p>
            </div>
          )}

          {/* Bottom CTA — dark editorial strip */}
          <div className="mt-16 rounded-3xl bg-[#0f0a05] overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/promo/suits-banner.jpg')] bg-cover bg-center opacity-15" />
            <div className="relative z-10 px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-2">The Velora Standard</p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Dressed for every chapter.
                </h3>
                <p className="text-white/40 text-sm mt-1">Free alterations on all suits over $300.</p>
              </div>
              <Link
                href="/shop/mens"
                className="shrink-0 group inline-flex items-center gap-3 bg-amber-400 text-[#0f0a05] font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
              >
                Explore Men's Wear
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}