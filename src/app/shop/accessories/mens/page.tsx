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
  { id: "0fe191d4-1f4b-4f4e-9b2e-76bfcae0a656", name: "Leather Bifold Wallet", category: "Bags", price: 55.00, originalPrice: null, rating: 4.8, reviews: 178, isNew: true, isSale: false, bg: "#3a2818", image: "/accessories/mens/wallet.jpg" },
  { id: "aee5974e-5a63-4156-b7b8-b587d394d3a6", name: "Canvas Messenger Bag", category: "Bags", price: 85.00, originalPrice: 110.00, rating: 4.7, reviews: 92, isNew: false, isSale: true, bg: "#4a4838", image: "/accessories/mens/messenger.jpg" },
  { id: "1eaf88d9-6b9f-4160-9c6d-b1f5d6a39e01", name: "Woven Leather Belt", category: "Belts", price: 48.00, originalPrice: null, rating: 4.6, reviews: 203, isNew: true, isSale: false, bg: "#2a2218", image: "/accessories/mens/belt.jpg" },
  { id: "8980c99a-5652-4819-ac0c-4f730f018853", name: "Minimalist Silver Watch", category: "Watches", price: 195.00, originalPrice: 240.00, rating: 4.9, reviews: 67, isNew: true, isSale: true, bg: "#e8e0d5", image: "/accessories/mens/watch.jpg" },
  { id: "b0629317-4655-457f-804f-2a8fe74d7fdd", name: "Wool Flat Cap", category: "Hats", price: 38.00, originalPrice: null, rating: 4.7, reviews: 145, isNew: false, isSale: false, bg: "#8a6848", image: "/accessories/mens/flat-cap.jpg" },
  { id: "aee5974e-5a63-4156-b7b8-b587d394d3a6", name: "Canvas Backpack", category: "Bags", price: 72.00, originalPrice: 92.00, rating: 4.8, reviews: 119, isNew: true, isSale: true, bg: "#d5c8b8", image: "/accessories/mens/backpack.jpg" },
];

const categories  = ["All", "Bags", "Belts", "Watches", "Hats"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"];

export default function AccessoriesMensPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy]                 = useState("Featured");
  const [sortOpen, setSortOpen]             = useState(false);
  const [addedId, setAddedId]               = useState<string | null>(null);
  const [loadingId, setLoadingId]           = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/account/login?redirect=/shop/accessories/mens"); return; }
    setLoadingId(productId);
    const result = await addToCart(productId, 1);
    setLoadingId(null);
    if (result && "error" in result) { console.error(result.error); return; }
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

      <section className="relative w-full h-64 sm:h-80 bg-[#1a1208] overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-3">Complete Your Look</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-3">Men's Accessories</h1>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link>
            <span>/</span>
            <span className="text-white/70">Men</span>
          </div>
        </div>
      </section>

      <main className="bg-[#faf8f5] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                      : "bg-white text-[#5a4a3a] border-[#e0d4c8] hover:border-[#0f0a05] hover:text-[#0f0a05]"
                  }`}>{cat}</button>
              ))}
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-sm text-[#8a7060]">{filtered.length} items</span>
              <div className="relative">
                <button onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#0f0a05] border border-[#e0d4c8] bg-white px-4 py-2 rounded-full hover:border-[#0f0a05] transition-colors">
                  <SlidersHorizontal size={14} />{sortBy}<ChevronDown size={13} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#e0d4c8] rounded-xl shadow-lg py-2 z-20">
                    {sortOptions.map((opt) => (
                      <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt ? "text-[#0f0a05] font-semibold bg-[#faf8f5]" : "text-[#5a4a3a] hover:bg-[#faf8f5] hover:text-[#0f0a05]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4" style={{ backgroundColor: product.bg }}>
                  <Image src={product.image} alt={product.name} fill unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && <span className="bg-[#0f0a05] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">New</span>}
                    {product.isSale && <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Sale</span>}
                  </div>
                  <Link href={`/shop/product/${product.id}`}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm hover:bg-[#0f0a05] hover:text-white text-[#0f0a05]">
                    <Eye size={14} />
                  </Link>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-widest text-[#8a7060] font-semibold mb-1">{product.category}</p>
                  <Link href={`/shop/product/${product.id}`}>
                    <h3 className="font-serif text-[#0f0a05] font-semibold text-sm sm:text-base hover:text-[#7a5c44] transition-colors mb-1.5">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8a7060]">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#0f0a05] font-bold text-sm">${product.price.toFixed(2)}</span>
                    {product.originalPrice && <span className="text-[#8a7060] text-sm line-through">${product.originalPrice.toFixed(2)}</span>}
                    {product.originalPrice && <span className="text-red-500 text-xs font-bold">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
                  </div>
                  <button onClick={() => handleAddToCart(product.id)} disabled={loadingId === product.id}
                    className={`mt-auto w-full flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-full border transition-all duration-300 ${
                      addedId === product.id ? "bg-green-500 text-white border-green-500" :
                      loadingId === product.id ? "bg-[#f5f0eb] text-[#8a7060] border-[#e0d4c8] cursor-wait" :
                      "bg-white text-[#0f0a05] border-[#e0d4c8] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05]"
                    }`}>
                    {loadingId === product.id ? (
                      <><div className="w-3 h-3 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />Adding…</>
                    ) : addedId === product.id ? (
                      <><ShoppingCart size={13} />Added to Cart ✓</>
                    ) : (
                      <><ShoppingCart size={13} />Add to Cart</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

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