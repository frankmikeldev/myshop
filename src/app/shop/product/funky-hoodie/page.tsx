"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react";

// ── Product Data ──
const product = {
  name: "Funky Graphic Hoodie",
  slug: "funky-hoodie",
  category: "Men",
  categoryHref: "/shop/mens",
  price: 125.0,
  originalPrice: 160.0,
  rating: 4.8,
  reviews: 124,
  isSale: true,
  description:
    "Make a bold statement with our Funky Graphic Hoodie. Crafted from premium heavyweight fleece, this oversized piece features a striking front graphic print and a relaxed silhouette built for all-day comfort. Whether you're heading out or staying in, this hoodie commands attention.",
  features: [
    "Premium 380gsm heavyweight fleece",
    "Oversized relaxed fit",
    "Kangaroo front pocket",
    "Ribbed cuffs and hem",
    "Machine washable",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Slate Blue", hex: "#dde0e8" },
    { name: "Charcoal", hex: "#3a3a3a" },
    { name: "Olive", hex: "#5a6040" },
  ],
  images: [
    "/products/hoodie-1.jpg",
    "/products/hoodie-2.jpg",
    "/products/hoodie-3.jpg",
    "/products/hoodie-4.jpg",
  ],
  bg: "#dde0e8",
};

// ── Related Products (10 different items never used before) ──
const relatedProducts = [
  { id: "r1",  name: "Varsity Bomber Jacket",   slug: "varsity-bomber",      category: "Men",  price: 145.00, originalPrice: 180.00, rating: 4.7, reviews: 89,  isSale: true,  bg: "#2a3040", image: "/related/varsity-bomber.jpg" },
  { id: "r2",  name: "Ribbed Turtleneck",        slug: "ribbed-turtleneck",   category: "Men",  price: 68.00,  originalPrice: null,   rating: 4.6, reviews: 113, isSale: false, bg: "#e0ddd8", image: "/related/turtleneck.jpg" },
  { id: "r3",  name: "Cargo Utility Pants",      slug: "cargo-utility-pants", category: "Men",  price: 92.00,  originalPrice: 115.00, rating: 4.8, reviews: 201, isSale: true,  bg: "#4a4838", image: "/related/cargo-pants.jpg" },
  { id: "r4",  name: "Oversized Flannel Shirt",  slug: "flannel-shirt",       category: "Men",  price: 75.00,  originalPrice: null,   rating: 4.5, reviews: 76,  isSale: false, bg: "#8a4838", image: "/related/flannel.jpg" },
  { id: "r5",  name: "Slim Tapered Joggers",     slug: "slim-joggers",        category: "Men",  price: 58.00,  originalPrice: 72.00,  rating: 4.7, reviews: 154, isSale: true,  bg: "#d8d5e0", image: "/related/joggers.jpg" },
  { id: "r6",  name: "Tech Zip-Up Jacket",       slug: "tech-zip-jacket",     category: "Men",  price: 118.00, originalPrice: null,   rating: 4.8, reviews: 67,  isSale: false, bg: "#1a2028", image: "/related/zip-jacket.jpg" },
  { id: "r7",  name: "Washed Denim Jacket",      slug: "washed-denim-jacket", category: "Men",  price: 135.00, originalPrice: 160.00, rating: 4.6, reviews: 98,  isSale: true,  bg: "#5a6878", image: "/related/denim-jacket.jpg" },
  { id: "r8",  name: "Printed Camp Shirt",       slug: "camp-shirt",          category: "Men",  price: 62.00,  originalPrice: null,   rating: 4.5, reviews: 143, isSale: false, bg: "#d8c8a8", image: "/related/camp-shirt.jpg" },
  { id: "r9",  name: "Sherpa Lined Vest",        slug: "sherpa-vest",         category: "Men",  price: 88.00,  originalPrice: 110.00, rating: 4.7, reviews: 55,  isSale: true,  bg: "#c8b898", image: "/related/sherpa-vest.jpg" },
  { id: "r10", name: "Knit Quarter Zip",         slug: "knit-quarter-zip",    category: "Men",  price: 95.00,  originalPrice: null,   rating: 4.9, reviews: 187, isSale: false, bg: "#383028", image: "/related/quarter-zip.jpg" },
];

export default function FunkyHoodiePage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [addedRelated, setAddedRelated] = useState<string | null>(null);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleRelatedCart = (id: string) => {
    setAddedRelated(id);
    setTimeout(() => setAddedRelated(null), 1800);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

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
              {/* Main Image */}
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
                {product.isSale && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      -{discount}% Off
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
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

              {/* Category + Wishlist */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8a7060] font-semibold">
                  {product.category}
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
                <span className="text-lg text-[#8a7060] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-50 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full">
                  Save {discount}%
                </span>
              </div>

              {/* Description */}
              <p className="text-[#5a4a3a] text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-[#0f0a05] mb-3">
                  Colour: <span className="font-normal text-[#5a4a3a]">{selectedColor.name}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor.name === color.name
                          ? "border-[#0f0a05] scale-110"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[#0f0a05]">Size</p>
                  <button className="text-xs text-[#7a5c44] underline underline-offset-2">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl text-sm font-bold border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                          : "bg-white text-[#5a4a3a] border-[#e0d4c8] hover:border-[#0f0a05] hover:text-[#0f0a05]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-xs text-[#8a7060] mt-2">Please select a size</p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-sm font-semibold text-[#0f0a05]">Qty</p>
                <div className="flex items-center gap-0 border border-[#e0d4c8] rounded-full overflow-hidden">
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
                disabled={!selectedSize}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                  added
                    ? "bg-green-500 text-white"
                    : selectedSize
                    ? "bg-[#0f0a05] text-white hover:bg-[#3a2818]"
                    : "bg-[#e0d4c8] text-[#8a7060] cursor-not-allowed"
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