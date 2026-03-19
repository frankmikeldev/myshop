"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react";

// ── Product Data ──
const product = {
  name: "Classic Aviator Shades",
  slug: "classic-aviator-shades",
  category: "Accessories",
  categoryHref: "/shop/accessories",
  price: 58.0,
  originalPrice: null,
  rating: 4.7,
  reviews: 178,
  isSale: false,
  description:
    "Timeless never looked this good. Our Classic Aviator Shades feature a lightweight metal double-bridge frame and tear-drop lenses with 100% UV400 protection. Whether you're on the road or lounging poolside, these shades bring effortless cool to any outfit. A style that's been iconic for decades — and isn't going anywhere.",
  features: [
    "100% UV400 polarised lens protection",
    "Lightweight stainless steel frame",
    "Double-bridge design",
    "Spring-hinge temples for flexible fit",
    "Includes microfibre pouch & hard case",
    "Lens width: 58mm",
  ],
  colors: [
    { name: "Gold / Green",  frame: "#c8a830", lens: "#4a6040" },
    { name: "Silver / Grey", frame: "#a8a8a8", lens: "#505050" },
    { name: "Black / Smoke", frame: "#1a1a1a", lens: "#2a2a2a" },
    { name: "Rose Gold",     frame: "#c89880", lens: "#805848" },
  ],
  images: [
    "/accessories/aviator.jpg",
    "/accessories/aviator-2.jpg",
    "/accessories/aviator-3.jpg",
    "/accessories/aviator-4.jpg",
  ],
  bg: "#2a2218",
};

// ── Related Products (10 accessories) ──
const relatedProducts = [
  { id: "r1",  name: "Oversized Square Frames",   slug: "square-frames",         price: 65.00,  originalPrice: 82.00,  rating: 4.6, reviews: 143, isSale: true,  bg: "#1a1810", image: "/related/square-frames.jpg" },
  { id: "r2",  name: "Round Wire Frames",          slug: "round-wire-frames",     price: 52.00,  originalPrice: null,   rating: 4.7, reviews: 98,  isSale: false, bg: "#c0a858", image: "/related/round-frames.jpg" },
  { id: "r3",  name: "Leather Crossbody Bag",      slug: "leather-crossbody-bag", price: 95.00,  originalPrice: 120.00, rating: 4.9, reviews: 203, isSale: true,  bg: "#c8b8a0", image: "/accessories/crossbody.jpg" },
  { id: "r4",  name: "Minimalist Watch",           slug: "minimalist-watch",      price: 185.00, originalPrice: null,   rating: 4.9, reviews: 97,  isSale: false, bg: "#e8e0d5", image: "/accessories/watch.jpg" },
  { id: "r5",  name: "Tortoise Cat Eye Frames",    slug: "tortoise-cat-eye",      price: 72.00,  originalPrice: 90.00,  rating: 4.8, reviews: 134, isSale: true,  bg: "#c8a878", image: "/accessories/cat-eye.jpg" },
  { id: "r6",  name: "Sunglasses Chain Strap",     slug: "sunglasses-chain",      price: 18.00,  originalPrice: null,   rating: 4.5, reviews: 211, isSale: false, bg: "#e0d8c0", image: "/related/sunglass-chain.jpg" },
  { id: "r7",  name: "Woven Straw Hat",            slug: "woven-straw-hat",       price: 42.00,  originalPrice: 55.00,  rating: 4.6, reviews: 76,  isSale: true,  bg: "#d5c8a8", image: "/accessories/straw-hat.jpg" },
  { id: "r8",  name: "Silk Neck Scarf",            slug: "silk-neck-scarf",       price: 38.00,  originalPrice: 50.00,  rating: 4.7, reviews: 88,  isSale: true,  bg: "#e8d5d8", image: "/accessories/scarf.jpg" },
  { id: "r9",  name: "Canvas Tote Bag",            slug: "canvas-tote-bag",       price: 45.00,  originalPrice: null,   rating: 4.6, reviews: 312, isSale: false, bg: "#e8ddd5", image: "/accessories/tote.jpg" },
  { id: "r10", name: "Wool Knit Beanie",           slug: "wool-knit-beanie",      price: 32.00,  originalPrice: 42.00,  rating: 4.8, reviews: 145, isSale: true,  bg: "#d5d8e8", image: "/accessories/beanie.jpg" },
];

export default function ClassicAviatorPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [addedRelated, setAddedRelated] = useState<string | null>(null);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleRelatedCart = (id: string) => {
    setAddedRelated(id);
    setTimeout(() => setAddedRelated(null), 1800);
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#faf8f5] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-2 text-sm text-[#8a7060] mb-8">
            <Link href="/" className="hover:text-[#0f0a05] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/shop" className="hover:text-[#0f0a05] transition-colors">Shop</Link>
            <ChevronRight size={14} />
            <Link href={product.categoryHref} className="hover:text-[#0f0a05] transition-colors">{product.category}</Link>
            <ChevronRight size={14} />
            <span className="text-[#0f0a05] font-medium">{product.name}</span>
          </nav>

          {/* ── Product Section ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">

            {/* ── Left: Images ── */}
            <div className="flex flex-col gap-4">
              <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
                style={{ backgroundColor: product.bg }}
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? "border-[#0f0a05]" : "border-transparent"
                    }`}
                    style={{ backgroundColor: product.bg }}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: Details ── */}
            <div className="flex flex-col">

              {/* Category + Actions */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8a7060] font-semibold">
                  {product.category} · Eyewear
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full border border-[#e0d4c8] flex items-center justify-center text-[#5a4a3a] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05] transition-all duration-200">
                    <Heart size={15} />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-[#e0d4c8] flex items-center justify-center text-[#5a4a3a] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05] transition-all duration-200">
                    <Share2 size={15} />
                  </button>
                </div>
              </div>

              {/* Name */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05] mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                  ))}
                </div>
                <span className="text-sm text-[#8a7060]">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#ede8e0]">
                <span className="text-3xl font-bold text-[#0f0a05] font-serif">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#5a4a3a] text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color — dual swatch (frame + lens) */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-[#0f0a05] mb-3">
                  Colourway: <span className="font-normal text-[#5a4a3a]">{selectedColor.name}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`relative w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-200 ${
                        selectedColor.name === color.name
                          ? "border-[#0f0a05] scale-110"
                          : "border-[#e0d4c8] hover:scale-105"
                      }`}
                    >
                      {/* Top half = frame, bottom half = lens */}
                      <span className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundColor: color.frame }} />
                      <span className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundColor: color.lens }} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#8a7060] mt-2">Top: frame colour · Bottom: lens colour</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-sm font-semibold text-[#0f0a05]">Qty</p>
                <div className="flex items-center border border-[#e0d4c8] rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#5a4a3a] hover:bg-[#f0ebe3] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#0f0a05]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#5a4a3a] hover:bg-[#f0ebe3] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-[#0f0a05] text-white hover:bg-[#3a2818]"
                }`}
              >
                <ShoppingCart size={17} />
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-[#ede8e0]">
                <p className="text-sm font-semibold text-[#0f0a05] mb-3">Product Details</p>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#5a4a3a]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7a5c44] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ── Related Products ── */}
          <div>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-2">
                You May Also Like
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#0f0a05]">
                Related Products
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
              {relatedProducts.map((p) => (
                <div key={p.id} className="group flex flex-col">

                  <Link href={`/shop/product/${p.slug}`} className="block">
                    <div
                      className="relative overflow-hidden rounded-xl aspect-[3/4] mb-3"
                      style={{ backgroundColor: p.bg }}
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        unoptimized
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      {p.isSale && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                          Sale
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="flex flex-col flex-1">
                    <Link href={`/shop/product/${p.slug}`}>
                      <h3 className="font-serif text-[#0f0a05] font-semibold text-sm hover:text-[#7a5c44] transition-colors mb-1">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={9} className={i < Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-[#0f0a05] font-bold text-sm">${p.price.toFixed(2)}</span>
                      {p.originalPrice && (
                        <span className="text-[#8a7060] text-xs line-through">${p.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleRelatedCart(p.id)}
                      className={`mt-auto w-full flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-full border transition-all duration-300 ${
                        addedRelated === p.id
                          ? "bg-green-500 text-white border-green-500"
                          : "bg-white text-[#0f0a05] border-[#e0d4c8] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05]"
                      }`}
                    >
                      <ShoppingCart size={11} />
                      {addedRelated === p.id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}