"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ShoppingCart, SlidersHorizontal, ChevronDown, Star, Eye } from "lucide-react";
import { addToCart } from "@/actions/cart";
import { createClient } from "@/supabase/client";

const allProducts = [
  { id: "758ab4d8-1854-4cc7-b4b8-53ba1ac7c3c8", name: "Classic Oxford Shirt",    category: "Shirts",   price: 65.00,  originalPrice: null,   rating: 4.8, reviews: 124, isNew: true,  isSale: false, bg: "#d5dde8", image: "/mens/oxford-shirt.jpg" },
  { id: "222d9dd4-2e0a-4252-aead-5378659aafda", name: "Slim Fit Chinos",          category: "Trousers", price: 78.00,  originalPrice: 95.00,  rating: 4.7, reviews: 98,  isNew: false, isSale: true,  bg: "#e8e0d5", image: "/mens/chinos.jpg" },
  { id: "63635afe-f93f-4dc7-9878-2e5948aa24d7", name: "Merino Wool Sweater",      category: "Knitwear", price: 110.00, originalPrice: null,   rating: 4.9, reviews: 76,  isNew: true,  isSale: false, bg: "#dde8d5", image: "/mens/sweater.jpg" },
  { id: "c0ef231d-542c-4a11-b9fe-1fa637a00b7f", name: "Leather Biker Jacket",     category: "Jackets",  price: 220.00, originalPrice: 280.00, rating: 4.8, reviews: 203, isNew: false, isSale: true,  bg: "#2a2218", image: "/mens/biker-jacket.jpg" },
  { id: "8a441af7-6ade-4081-bc92-34d99bddddd3", name: "Linen Summer Shirt",       category: "Shirts",   price: 55.00,  originalPrice: null,   rating: 4.6, reviews: 87,  isNew: true,  isSale: false, bg: "#e8ddd5", image: "/mens/linen-shirt.jpg" },
  { id: "5fd58431-857e-42b3-a5e7-b53e4f78821c", name: "Tailored Dress Trousers",  category: "Trousers", price: 95.00,  originalPrice: null,   rating: 4.7, reviews: 142, isNew: false, isSale: false, bg: "#d8d5e8", image: "/mens/dress-trousers.jpg" },
  { id: "466c5a3c-e9b0-4d41-9336-b4aa77f5cd61", name: "Essential Polo Shirt",     category: "Shirts",   price: 45.00,  originalPrice: 60.00,  rating: 4.5, reviews: 213, isNew: false, isSale: true,  bg: "#d5e8e0", image: "/mens/polo.jpg" },
  { id: "e0654ed1-7136-4025-a4e4-7030860d097c", name: "Quilted Puffer Jacket",    category: "Jackets",  price: 175.00, originalPrice: null,   rating: 4.8, reviews: 156, isNew: true,  isSale: false, bg: "#1a2030", image: "/mens/puffer.jpg" },
  { id: "c625849c-a753-4d25-af32-a78b9fccb226", name: "Vintage Denim Jeans",      category: "Trousers", price: 88.00,  originalPrice: 110.00, rating: 4.6, reviews: 321, isNew: false, isSale: true,  bg: "#3a4858", image: "/mens/denim.jpg" },
  { id: "3d0d9074-a5b0-4b56-8a54-055c2c275d41", name: "Funky Graphic Hoodie",     category: "Knitwear", price: 72.00,  originalPrice: null,   rating: 4.7, reviews: 99,  isNew: true,  isSale: false, bg: "#e8d5d5", image: "/mens/hoodie.jpg" },
];

const categories  = ["All", "Shirts", "Trousers", "Jackets", "Knitwear"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"];

export default function MensWearPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]                 = useState("Featured");
  const [sortOpen, setSortOpen]             = useState(false);
  const [addedId, setAddedId]               = useState<string | null>(null);
  const [loadingId, setLoadingId]           = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    // Check auth first
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push("/account/login?redirect=/shop/mens");
      return;
    }

    setLoadingId(productId);
    const result = await addToCart(productId, 1);
    setLoadingId(null);

    if (result && "error" in result) {
      console.error("Add to cart error:", result.error);
      return;
    }

    // Show green success feedback
    setAddedId(productId);
    window.dispatchEvent(new Event("cart:updated"));
    setTimeout(() => setAddedId(null), 1800);
  };

  let filtered = activeCategory === "All"
    ? [...allProducts]
    : allProducts.filter((p) => p.category === activeCategory);

  if (sortBy === "Price: Low to High")      filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "Price: High to Low") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "Newest")             filtered = filtered.filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));
  else if (sortBy === "Best Rated")         filtered.sort((a, b) => b.rating - a.rating);

  return (
    <>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative w-full h-64 sm:h-80 bg-[#0f0a05] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[url('/mens/banner.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-3">
            New Season
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-3">
            Mens Wear
          </h1>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/70">Mens Wear</span>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="bg-[#faf8f5] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">

          {/* ── Toolbar ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                      : "bg-white text-[#5a4a3a] border-[#e0d4c8] hover:border-[#0f0a05] hover:text-[#0f0a05]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="text-sm text-[#8a7060]">{filtered.length} items</span>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0f0a05] border border-[#e0d4c8] bg-white px-4 py-2 rounded-full hover:border-[#0f0a05] transition-colors"
                >
                  <SlidersHorizontal size={14} />
                  {sortBy}
                  <ChevronDown size={13} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#e0d4c8] rounded-xl shadow-lg py-2 z-20">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sortBy === opt
                            ? "text-[#0f0a05] font-semibold bg-[#faf8f5]"
                            : "text-[#5a4a3a] hover:bg-[#faf8f5] hover:text-[#0f0a05]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Product Grid ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group flex flex-col">

                {/* Image */}
                <div
                  className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4"
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

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                      <span className="bg-[#0f0a05] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Quick View */}
                  <Link
                    href={`/shop/product/${product.id}`}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-[#0f0a05] hover:text-white text-[#0f0a05]"
                  >
                    <Eye size={14} />
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-widest text-[#8a7060] font-semibold mb-1">
                    {product.category}
                  </p>
                  <Link href={`/shop/product/${product.id}`}>
                    <h3 className="font-serif text-[#0f0a05] font-semibold text-sm sm:text-base hover:text-[#7a5c44] transition-colors duration-200 mb-1.5">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8a7060]">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#0f0a05] font-bold text-sm">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-[#8a7060] text-sm line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                    {product.originalPrice && (
                      <span className="text-red-500 text-xs font-bold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={loadingId === product.id}
                    className={`mt-auto w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-full border transition-all duration-300 ${
                      addedId === product.id
                        ? "bg-green-500 text-white border-green-500"
                        : loadingId === product.id
                        ? "bg-[#f5f0eb] text-[#8a7060] border-[#e0d4c8] cursor-wait"
                        : "bg-white text-[#0f0a05] border-[#e0d4c8] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05]"
                    }`}
                  >
                    {loadingId === product.id ? (
                      <>
                        <div className="w-3 h-3 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />
                        Adding…
                      </>
                    ) : addedId === product.id ? (
                      <>
                        <ShoppingCart size={13} />
                        Added to Cart ✓
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={13} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[#8a7060] text-lg font-serif">No products found.</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}