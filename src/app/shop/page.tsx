"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ShoppingCart, Star, Eye, ChevronRight, ArrowRight } from "lucide-react";
import { addToCart } from "@/actions/cart";
import { createClient } from "@/supabase/client";

// ── Men's Products (real UUIDs) ──
const mensProducts = [
  { id: "3d0d9074-a5b0-4b56-8a54-055c2c275d41", name: "Funky Graphic Hoodie",    price: 72.00,  originalPrice: null,   rating: 4.7, reviews: 99,  isNew: true,  isSale: false, bg: "#e8d5d5", image: "/mens/hoodie.jpg" },
  { id: "c0ef231d-542c-4a11-b9fe-1fa637a00b7f", name: "Leather Biker Jacket",    price: 220.00, originalPrice: 280.00, rating: 4.8, reviews: 203, isNew: false, isSale: true,  bg: "#2a2218", image: "/mens/biker-jacket.jpg" },
  { id: "222d9dd4-2e0a-4252-aead-5378659aafda", name: "Slim Fit Chinos",          price: 78.00,  originalPrice: 95.00,  rating: 4.7, reviews: 98,  isNew: false, isSale: true,  bg: "#e8e0d5", image: "/mens/chinos.jpg" },
  { id: "63635afe-f93f-4dc7-9878-2e5948aa24d7", name: "Merino Wool Sweater",      price: 110.00, originalPrice: null,   rating: 4.9, reviews: 76,  isNew: true,  isSale: false, bg: "#dde8d5", image: "/mens/sweater.jpg" },
  { id: "758ab4d8-1854-4cc7-b4b8-53ba1ac7c3c8", name: "Classic Oxford Shirt",     price: 65.00,  originalPrice: null,   rating: 4.8, reviews: 124, isNew: true,  isSale: false, bg: "#d5dde8", image: "/mens/oxford-shirt.jpg" },
  { id: "8a441af7-6ade-4081-bc92-34d99bddddd3", name: "Linen Summer Shirt",       price: 55.00,  originalPrice: null,   rating: 4.6, reviews: 87,  isNew: true,  isSale: false, bg: "#e8ddd5", image: "/mens/linen-shirt.jpg" },
  { id: "5fd58431-857e-42b3-a5e7-b53e4f78821c", name: "Tailored Dress Trousers",  price: 95.00,  originalPrice: null,   rating: 4.7, reviews: 142, isNew: false, isSale: false, bg: "#d8d5e8", image: "/mens/dress-trousers.jpg" },
  { id: "466c5a3c-e9b0-4d41-9336-b4aa77f5cd61", name: "Essential Polo Shirt",     price: 45.00,  originalPrice: 60.00,  rating: 4.5, reviews: 213, isNew: false, isSale: true,  bg: "#d5e8e0", image: "/mens/polo.jpg" },
  { id: "e0654ed1-7136-4025-a4e4-7030860d097c", name: "Quilted Puffer Jacket",    price: 175.00, originalPrice: null,   rating: 4.8, reviews: 156, isNew: true,  isSale: false, bg: "#1a2030", image: "/mens/puffer.jpg" },
  { id: "c625849c-a753-4d25-af32-a78b9fccb226", name: "Vintage Denim Jeans",      price: 88.00,  originalPrice: 110.00, rating: 4.6, reviews: 321, isNew: false, isSale: true,  bg: "#3a4858", image: "/mens/denim.jpg" },
];

// ── Women's Products (real UUIDs) ──
const womensProducts = [
  { id: "7aa4b8e5-338c-41d0-91e3-47a0fc2c096d", name: "Floral Wrap Dress",     price: 89.00,  originalPrice: 120.00, rating: 4.9, reviews: 214, isNew: true,  isSale: true,  bg: "#e8d5d8", image: "/womens/wrap-dress.jpg" },
  { id: "c827f8cd-391a-4b62-a284-af30df848864", name: "Linen Wide Leg Pants",  price: 72.00,  originalPrice: null,   rating: 4.7, reviews: 98,  isNew: true,  isSale: false, bg: "#e8e5d5", image: "/womens/wide-pants.jpg" },
  { id: "329b11a3-0cd1-4978-a3be-059b0df70f8d", name: "Cropped Blazer",        price: 135.00, originalPrice: 170.00, rating: 4.8, reviews: 156, isNew: false, isSale: true,  bg: "#d5d8e8", image: "/womens/blazer.jpg" },
  { id: "9e8559e1-47ee-42b2-b5ef-b97492d67c05", name: "Silk Slip Dress",       price: 115.00, originalPrice: null,   rating: 4.9, reviews: 87,  isNew: true,  isSale: false, bg: "#e8ddd5", image: "/womens/slip-dress.jpg" },
  { id: "01fd0af2-7f54-462f-93da-9e972b58f708", name: "Ribbed Knit Sweater",   price: 95.00,  originalPrice: null,   rating: 4.6, reviews: 132, isNew: true,  isSale: false, bg: "#dde8d5", image: "/womens/knit-sweater.jpg" },
  { id: "f8e04c33-2e90-4c2d-afeb-fbb2d335248b", name: "High Waist Jeans",      price: 82.00,  originalPrice: 105.00, rating: 4.7, reviews: 301, isNew: false, isSale: true,  bg: "#3a4858", image: "/womens/jeans.jpg" },
  { id: "72fc3f3d-561e-4e93-a6a9-3c3f2e9046b9", name: "Pleated Midi Skirt",    price: 68.00,  originalPrice: null,   rating: 4.8, reviews: 176, isNew: true,  isSale: false, bg: "#e8d5e5", image: "/womens/midi-skirt.jpg" },
  { id: "965ce480-2fa9-4f61-9435-bfeb621899ed", name: "Oversized Trench Coat", price: 195.00, originalPrice: 240.00, rating: 4.9, reviews: 89,  isNew: false, isSale: true,  bg: "#d5c8b8", image: "/womens/trench.jpg" },
  { id: "3eb3116b-33cd-4fab-9864-e0728fd0489e", name: "Mini Pleated Skirt",    price: 55.00,  originalPrice: 70.00,  rating: 4.6, reviews: 211, isNew: false, isSale: true,  bg: "#d8d5e8", image: "/womens/mini-skirt.jpg" },
  { id: "fa618eac-abac-488b-8ea1-36a278329080", name: "Flowy Maxi Dress",      price: 98.00,  originalPrice: null,   rating: 4.7, reviews: 143, isNew: true,  isSale: false, bg: "#e8e0d5", image: "/womens/maxi-dress.jpg" },
];

// ── Kids Products (real UUIDs) ──
const kidsProducts = [
  { id: "9426f42a-43c5-46a9-9d70-049b8623378d", name: "Denim Dungarees",     price: 42.00, originalPrice: 55.00, rating: 4.9, reviews: 187, isNew: true,  isSale: true,  bg: "#3a4858", image: "/kids/dungarees.jpg" },
  { id: "8cc02288-0cac-44bd-ac1c-95b3a9be95d6", name: "Stripe Tee",          price: 22.00, originalPrice: null,  rating: 4.7, reviews: 134, isNew: true,  isSale: false, bg: "#e8ddd5", image: "/kids/stripe-tee.jpg" },
  { id: "ebe3c6b3-7775-4761-a815-03ecf55e18e2", name: "Cozy Fleece Hoodie",  price: 48.00, originalPrice: 60.00, rating: 4.8, reviews: 98,  isNew: false, isSale: true,  bg: "#d5d8e8", image: "/kids/hoodie.jpg" },
  { id: "37e2e5d7-bede-4f33-94e6-39ddda484f36", name: "Floral Summer Dress", price: 38.00, originalPrice: null,  rating: 4.9, reviews: 211, isNew: true,  isSale: false, bg: "#e8d5d8", image: "/kids/floral-dress.jpg" },
  { id: "1455f1c6-dd2b-41ad-b983-ddbb47275524", name: "Jogger Sweatpants",   price: 35.00, originalPrice: null,  rating: 4.6, reviews: 156, isNew: true,  isSale: false, bg: "#dde8d5", image: "/kids/joggers.jpg" },
  { id: "ed1f096f-bf15-4a3b-bd89-b8fec598d368", name: "Puffer Zip Jacket",   price: 65.00, originalPrice: 85.00, rating: 4.8, reviews: 76,  isNew: false, isSale: true,  bg: "#1a2030", image: "/kids/puffer.jpg" },
  { id: "c3ca49ea-2264-4ad4-82ab-b2e3dbb7f4b1", name: "Printed Graphic Tee", price: 25.00, originalPrice: null,  rating: 4.7, reviews: 243, isNew: true,  isSale: false, bg: "#e8e5d5", image: "/kids/graphic-tee.jpg" },
  { id: "0bc65a77-dfbb-48e0-a44e-ff92767868ee", name: "Knit Cardigan",       price: 52.00, originalPrice: 65.00, rating: 4.8, reviews: 88,  isNew: false, isSale: true,  bg: "#e8d5e5", image: "/kids/cardigan.jpg" },
  { id: "aa410e94-fc20-401c-a8da-21feb2d2def5", name: "Cargo Shorts",        price: 30.00, originalPrice: null,  rating: 4.5, reviews: 119, isNew: true,  isSale: false, bg: "#d5c8b8", image: "/kids/shorts.jpg" },
  { id: "9752f428-87e3-44ea-993b-89bb4a7208df", name: "Tutu Party Dress",    price: 45.00, originalPrice: 58.00, rating: 4.9, reviews: 162, isNew: true,  isSale: true,  bg: "#e8d5d8", image: "/kids/tutu-dress.jpg" },
];

// ── Accessories Products (real UUIDs) ──
const accessoriesProducts = [
  { id: "1d9873ff-2530-4c5b-9fb3-e7e6c3bf5392", name: "Leather Crossbody Bag", price: 95.00,  originalPrice: 120.00, rating: 4.9, reviews: 203, isNew: true,  isSale: true,  bg: "#c8b8a0", image: "/accessories/crossbody.jpg" },
  { id: "50c2c7f9-f334-4c78-8528-c4f74cdeb79a", name: "Sunglasses",            price: 58.00,  originalPrice: null,   rating: 4.7, reviews: 178, isNew: true,  isSale: false, bg: "#2a2218", image: "/accessories/sunglasses.jpg" },
  { id: "92440e14-a480-4c9b-9e8c-773ce7dc0e98", name: "Knit Beanie",           price: 32.00,  originalPrice: 42.00,  rating: 4.8, reviews: 145, isNew: false, isSale: true,  bg: "#d5d8e8", image: "/accessories/beanie.jpg" },
  { id: "be9a3124-5007-4d61-9fc9-3466049bd605", name: "Minimalist Watch",      price: 185.00, originalPrice: null,   rating: 4.9, reviews: 97,  isNew: true,  isSale: false, bg: "#e8e0d5", image: "/accessories/watch.jpg" },
  { id: "1097f4ee-7aa5-430f-9105-10361f27dafe", name: "Canvas Tote Bag",       price: 45.00,  originalPrice: null,   rating: 4.6, reviews: 312, isNew: true,  isSale: false, bg: "#e8ddd5", image: "/accessories/tote.jpg" },
  { id: "f108e9c4-8230-40f5-8a4c-d8743b0b3db0", name: "Wool Scarf",            price: 38.00,  originalPrice: 50.00,  rating: 4.7, reviews: 88,  isNew: false, isSale: true,  bg: "#e8d5d8", image: "/accessories/scarf.jpg" },
  { id: "c16e7e74-f737-4bfd-a3bd-2df1f10e49b1", name: "Leather Wallet",        price: 72.00,  originalPrice: null,   rating: 4.8, reviews: 134, isNew: true,  isSale: false, bg: "#c8a878", image: "/accessories/wallet.jpg" },
  { id: "928d3347-e1b2-48cb-9d8c-0fb396f919de", name: "Silver Hoop Earrings",  price: 42.00,  originalPrice: 55.00,  rating: 4.6, reviews: 76,  isNew: false, isSale: true,  bg: "#e8e8e0", image: "/accessories/earrings.jpg" },
  { id: "0044cf35-e35a-4a50-a012-29fadb9652e9", name: "Silk Hair Scrunchie",   price: 18.00,  originalPrice: null,   rating: 4.9, reviews: 221, isNew: true,  isSale: false, bg: "#e8d5e5", image: "/accessories/scrunchie.jpg" },
  { id: "f5966b4a-805f-472f-a17d-cec01e54a5e8", name: "Leather Belt",          price: 48.00,  originalPrice: 62.00,  rating: 4.7, reviews: 159, isNew: false, isSale: true,  bg: "#3a2818", image: "/accessories/belt.jpg" },
];

const sections = [
  { id: "all",         label: "All",         count: 40 },
  { id: "mens",        label: "Men",         count: 10 },
  { id: "womens",      label: "Women",       count: 10 },
  { id: "kids",        label: "Kids",        count: 10 },
  { id: "accessories", label: "Accessories", count: 10 },
];

type SectionId = "all" | "mens" | "womens" | "kids" | "accessories";
type Product = {
  id: string; name: string; price: number; originalPrice: number | null;
  rating: number; reviews: number; isNew: boolean; isSale: boolean; bg: string; image: string;
};

function ProductCard({ product, addedId, loadingId, onAddToCart }: {
  product: Product; addedId: string | null; loadingId: string | null; onAddToCart: (id: string) => void;
}) {
  const discount  = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const isAdded   = addedId === product.id;
  const isLoading = loadingId === product.id;

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3" style={{ backgroundColor: product.bg }}>
        <Image src={product.image} alt={product.name} fill unoptimized
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew  && <span className="bg-[#0f0a05] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">New</span>}
          {product.isSale && <span className="bg-red-500  text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Sale</span>}
        </div>
        <Link href={`/shop/product/${product.id}`}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm text-[#0f0a05] hover:bg-[#0f0a05] hover:text-white"
        >
          <Eye size={13} />
        </Link>
      </div>

      <div className="flex flex-col flex-1">
        <Link href={`/shop/product/${product.id}`}>
          <h3 className="font-serif text-[#0f0a05] font-semibold text-sm hover:text-[#7a5c44] transition-colors mb-1.5">{product.name}</h3>
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
          {product.originalPrice && <span className="text-[#8a7060] text-xs line-through">${product.originalPrice.toFixed(2)}</span>}
          {discount && <span className="text-red-500 text-[10px] font-bold">-{discount}%</span>}
        </div>
        <button
          onClick={() => onAddToCart(product.id)}
          disabled={isLoading}
          className={`mt-auto w-full flex items-center justify-center gap-1.5 text-[11px] font-bold py-2.5 rounded-full border transition-all duration-300 ${
            isAdded   ? "bg-green-500 text-white border-green-500" :
            isLoading ? "bg-[#f5f0eb] text-[#8a7060] border-[#e0d4c8] cursor-wait" :
                        "bg-white text-[#0f0a05] border-[#e0d4c8] hover:bg-[#0f0a05] hover:text-white hover:border-[#0f0a05]"
          }`}
        >
          {isLoading ? (
            <><div className="w-3 h-3 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />Adding…</>
          ) : isAdded ? (
            <><ShoppingCart size={11} />Added ✓</>
          ) : (
            <><ShoppingCart size={11} />Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}

function SectionBlock({ title, subtitle, products, href, addedId, loadingId, onAddToCart, sectionRef }: {
  title: string; subtitle: string; products: Product[]; href: string;
  addedId: string | null; loadingId: string | null; onAddToCart: (id: string) => void;
  sectionRef: React.RefObject<HTMLElement>;
}) {
  return (
    <section ref={sectionRef} className="py-14 border-b border-[#ede8e0] last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-2">{subtitle}</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0f0a05]">{title}</h2>
        </div>
        <Link href={href} className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-[#0f0a05] border-b-2 border-[#0f0a05] pb-0.5 hover:text-[#7a5c44] hover:border-[#7a5c44] transition-colors group self-start sm:self-auto">
          View All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addedId={addedId} loadingId={loadingId} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}

export default function ShopPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SectionId>("all");
  const [addedId, setAddedId]             = useState<string | null>(null);
  const [loadingId, setLoadingId]         = useState<string | null>(null);

  const mensRef   = useRef<HTMLElement>(null);
  const womensRef = useRef<HTMLElement>(null);
  const kidsRef   = useRef<HTMLElement>(null);
  const accessRef = useRef<HTMLElement>(null);

  const handleAddToCart = async (productId: string) => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { router.push("/account/login?redirect=/shop"); return; }

    setLoadingId(productId);
    const result = await addToCart(productId, 1);
    setLoadingId(null);
    if (result && "error" in result) { console.error(result.error); return; }

    setAddedId(productId);
    window.dispatchEvent(new Event("cart:updated"));
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleFilter = (id: SectionId) => {
    setActiveSection(id);
    if (id === "all") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const refMap: Record<string, React.RefObject<HTMLElement>> = {
      mens: mensRef, womens: womensRef, kids: kidsRef, accessories: accessRef,
    };
    const ref = refMap[id];
    if (ref?.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="bg-[#0f0a05] pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-8">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-white/60">Shop</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-4">All Collections</p>
              <h1 className="font-serif font-bold text-white leading-none">
                <span className="block text-6xl sm:text-7xl">Shop</span>
                <span className="block text-6xl sm:text-7xl italic text-amber-400">Everything.</span>
              </h1>
            </div>
            <p className="text-white/40 text-lg max-w-md leading-relaxed lg:pb-2">
              40 curated pieces across Men, Women, Kids and Accessories. All in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              { label: "Men's Wear",   href: "/shop/mens",        count: 10 },
              { label: "Women's Wear", href: "/shop/womens",      count: 10 },
              { label: "Kids Wear",    href: "/shop/kids",        count: 10 },
              { label: "Accessories",  href: "/shop/accessories", count: 10 },
            ].map((c) => (
              <Link key={c.label} href={c.href}
                className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white/70 text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/15 hover:text-white transition-all duration-200"
              >
                {c.label}
                <span className="bg-white/10 text-white/50 text-[10px] px-2 py-0.5 rounded-full">{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#ede8e0] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            {sections.map((s) => (
              <button key={s.id} onClick={() => handleFilter(s.id as SectionId)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${
                  activeSection === s.id
                    ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                    : "bg-transparent text-[#5a4a3a] border-transparent hover:border-[#e0d4c8] hover:bg-[#faf8f5]"
                }`}
              >
                {s.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeSection === s.id ? "bg-white/20 text-white" : "bg-[#f0ebe3] text-[#8a7060]"
                }`}>{s.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Collections ── */}
      <main className="bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <SectionBlock title="Men's Wear"   subtitle="For Him"             products={mensProducts}        href="/shop/mens"        addedId={addedId} loadingId={loadingId} onAddToCart={handleAddToCart} sectionRef={mensRef} />
          <SectionBlock title="Women's Wear" subtitle="For Her"             products={womensProducts}      href="/shop/womens"      addedId={addedId} loadingId={loadingId} onAddToCart={handleAddToCart} sectionRef={womensRef} />
          <SectionBlock title="Kids Wear"    subtitle="For the Little Ones" products={kidsProducts}        href="/shop/kids"        addedId={addedId} loadingId={loadingId} onAddToCart={handleAddToCart} sectionRef={kidsRef} />
          <SectionBlock title="Accessories"  subtitle="Complete the Look"   products={accessoriesProducts} href="/shop/accessories" addedId={addedId} loadingId={loadingId} onAddToCart={handleAddToCart} sectionRef={accessRef} />
        </div>
      </main>
    </>
  );
}