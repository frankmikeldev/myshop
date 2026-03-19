"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, ChevronRight, Minus, Plus, Heart, Share2 } from "lucide-react";

// ── Product Data ──
const product = {
  name: "Kids Denim Set",
  slug: "kids-denim-set",
  category: "Kids",
  categoryHref: "/shop/kids",
  price: 55.0,
  originalPrice: 70.0,
  rating: 4.8,
  reviews: 56,
  isSale: true,
  description:
    "Adventure-ready and undeniably cool, the Kids Denim Set pairs a classic denim jacket with matching jeans for a put-together look that's built to keep up with the most active little ones. Made from soft, stretchy denim with reinforced knees and adjustable waistband, it's as comfortable as it is stylish. Great for school, playdates, or any occasion.",
  features: [
    "Soft stretch denim — 98% cotton, 2% elastane",
    "Reinforced double-stitched knees",
    "Adjustable elasticated waistband on jeans",
    "Snap-button closure on jacket",
    "Machine washable at 30°C",
    "Available in ages 2–12",
  ],
  sizes: ["2–3Y", "3–4Y", "4–5Y", "5–6Y", "7–8Y", "9–10Y", "11–12Y"],
  colors: [
    { name: "Classic Blue",  hex: "#4a6080" },
    { name: "Light Wash",    hex: "#8aA0c0" },
    { name: "Dark Indigo",   hex: "#2a3050" },
  ],
  images: [
    "/products/kids-1.jpg",
    "/products/kids-2.jpg",
    "/products/kids-3.jpg",
    "/products/kids-4.jpg",
  ],
  bg: "#d5e8dd",
};

// ── Related Products (10 kids items) ──
const relatedProducts = [
  { id: "r1",  name: "Tie-Dye Sweatsuit",         slug: "tie-dye-sweatsuit",     price: 48.00,  originalPrice: 60.00,  rating: 4.7, reviews: 102, isSale: true,  bg: "#e8d5e8", image: "/related/tie-dye-sweatsuit.jpg" },
  { id: "r2",  name: "Rainbow Zip Hoodie",         slug: "rainbow-zip-hoodie",    price: 42.00,  originalPrice: null,   rating: 4.8, reviews: 87,  isSale: false, bg: "#e8e0d0", image: "/related/rainbow-hoodie.jpg" },
  { id: "r3",  name: "Adventure Cargo Shorts",     slug: "kids-cargo-shorts",     price: 32.00,  originalPrice: 42.00,  rating: 4.6, reviews: 134, isSale: true,  bg: "#d0c8a8", image: "/related/kids-cargo.jpg" },
  { id: "r4",  name: "Dinosaur Print Tee",         slug: "dino-print-tee",        price: 22.00,  originalPrice: null,   rating: 4.9, reviews: 218, isSale: false, bg: "#d5e8d5", image: "/related/dino-tee.jpg" },
  { id: "r5",  name: "Soft Fleece Joggers",        slug: "kids-fleece-joggers",   price: 35.00,  originalPrice: 45.00,  rating: 4.7, reviews: 76,  isSale: true,  bg: "#e0d8e8", image: "/related/kids-joggers.jpg" },
  { id: "r6",  name: "Striped Rugby Shirt",        slug: "kids-rugby-shirt",      price: 38.00,  originalPrice: null,   rating: 4.5, reviews: 91,  isSale: false, bg: "#d0d8e8", image: "/related/rugby-shirt.jpg" },
  { id: "r7",  name: "Puffer Gilet",               slug: "kids-puffer-gilet",     price: 52.00,  originalPrice: 65.00,  rating: 4.8, reviews: 63,  isSale: true,  bg: "#1a2838", image: "/related/puffer-gilet.jpg" },
  { id: "r8",  name: "Floral Cord Dungarees",      slug: "cord-dungarees",        price: 45.00,  originalPrice: null,   rating: 4.6, reviews: 109, isSale: false, bg: "#e8d8c8", image: "/related/cord-dungarees.jpg" },
  { id: "r9",  name: "Colour Block Tracksuit",     slug: "colour-block-track",    price: 58.00,  originalPrice: 72.00,  rating: 4.7, reviews: 84,  isSale: true,  bg: "#e8e0d5", image: "/related/colourblock-track.jpg" },
  { id: "r10", name: "Knitted Bobble Hat",         slug: "kids-bobble-hat",       price: 18.00,  originalPrice: null,   rating: 4.8, reviews: 156, isSale: false, bg: "#c8d8e8", image: "/related/bobble-hat.jpg" },
];

export default function KidsDenimSetPage() {
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

  const discount = Math.round((1 - product.price / product.originalPrice!) * 100);

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
                {product.isSale && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      -{discount}% Off
                    </span>
                  </div>
                )}
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
                  ${product.originalPrice!.toFixed(2)}
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
                          : "border-[#e0d4c8] hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Age / Size */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[#0f0a05]">Age / Size</p>
                  <button className="text-xs text-[#7a5c44] underline underline-offset-2">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 h-11 rounded-xl text-sm font-bold border transition-all duration-200 ${
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
                  <p className="text-xs text-[#8a7060] mt-2">Please select an age group</p>
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