"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react";

// ── Product Data ──
const product = {
  name: "Mini Jacket",
  slug: "mini-jacket",
  category: "Women",
  categoryHref: "/shop/womens",
  price: 155.0,
  originalPrice: null,
  rating: 4.9,
  reviews: 98,
  isSale: false,
  description:
    "Effortlessly chic and tailored to perfection, the Mini Jacket is your go-to layering piece this season. Featuring a structured cropped silhouette, notched lapels, and a clean single-button closure, it pairs beautifully over everything from slip dresses to high-waist trousers. A wardrobe staple that never goes out of style.",
  features: [
    "Structured cropped silhouette",
    "Notched lapel with single-button closure",
    "Fully lined interior",
    "Two front welt pockets",
    "Dry clean recommended",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Warm Ivory", hex: "#e8ddd5" },
    { name: "Blush Rose", hex: "#d8b8b0" },
    { name: "Jet Black", hex: "#1a1a1a" },
  ],
  images: [
    "/products/jacket-1.jpg",
    "/products/jacket-2.jpg",
    "/products/jacket-3.jpg",
    "/products/jacket-4.jpg",
  ],
  bg: "#e8ddd5",
};

// ── Related Products (10 women's items) ──
const relatedProducts = [
  { id: "r1",  name: "Satin Wrap Blouse",        slug: "satin-wrap-blouse",    category: "Women", price: 72.00,  originalPrice: 90.00,  rating: 4.7, reviews: 134, isSale: true,  bg: "#e8d5d8", image: "/related/wrap-blouse.jpg" },
  { id: "r2",  name: "Wide Brim Felt Hat",        slug: "wide-brim-hat",        category: "Women", price: 55.00,  originalPrice: null,   rating: 4.6, reviews: 88,  isSale: false, bg: "#c8b898", image: "/related/felt-hat.jpg" },
  { id: "r3",  name: "Belted Trench Coat",        slug: "belted-trench",        category: "Women", price: 210.00, originalPrice: 260.00, rating: 4.9, reviews: 72,  isSale: true,  bg: "#d5c8b0", image: "/related/belted-trench.jpg" },
  { id: "r4",  name: "Tailored Cigarette Pants",  slug: "cigarette-pants",      category: "Women", price: 88.00,  originalPrice: null,   rating: 4.7, reviews: 119, isSale: false, bg: "#e0ddd8", image: "/related/cigarette-pants.jpg" },
  { id: "r5",  name: "Ruched Bodycon Dress",      slug: "ruched-bodycon",       category: "Women", price: 95.00,  originalPrice: 120.00, rating: 4.8, reviews: 201, isSale: true,  bg: "#e8d5e0", image: "/related/bodycon.jpg" },
  { id: "r6",  name: "Lace Trim Cami Top",        slug: "lace-cami",            category: "Women", price: 42.00,  originalPrice: null,   rating: 4.5, reviews: 156, isSale: false, bg: "#f0e8e0", image: "/related/lace-cami.jpg" },
  { id: "r7",  name: "Plisse Pleated Skirt",      slug: "plisse-skirt",         category: "Women", price: 65.00,  originalPrice: 80.00,  rating: 4.6, reviews: 94,  isSale: true,  bg: "#d8e0e8", image: "/related/plisse-skirt.jpg" },
  { id: "r8",  name: "Cashmere Blend Pullover",   slug: "cashmere-pullover",    category: "Women", price: 138.00, originalPrice: null,   rating: 4.9, reviews: 63,  isSale: false, bg: "#e8e0d0", image: "/related/cashmere-pullover.jpg" },
  { id: "r9",  name: "Straight Leg Barrel Jeans", slug: "barrel-jeans",         category: "Women", price: 98.00,  originalPrice: 125.00, rating: 4.7, reviews: 178, isSale: true,  bg: "#4a5868", image: "/related/barrel-jeans.jpg" },
  { id: "r10", name: "Chain Strap Mini Bag",      slug: "chain-mini-bag",       category: "Women", price: 78.00,  originalPrice: null,   rating: 4.8, reviews: 112, isSale: false, bg: "#c0a888", image: "/related/chain-bag.jpg" },
];

export default function MiniJacketPage() {
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