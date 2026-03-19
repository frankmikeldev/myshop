"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronRight, Clock, ArrowRight, Tag } from "lucide-react";

// ── Blog Posts ──
const posts = [
  {
    id: "1",
    slug: "summer-style-guide-2026",
    category: "Style Guide",
    title: "The Ultimate Summer Style Guide for 2026",
    excerpt: "From linen sets to minimalist accessories, here's everything you need to dress for the heat without breaking a sweat.",
    author: "Amara Osei",
    authorRole: "Head Stylist",
    date: "March 5, 2026",
    readTime: "6 min read",
    featured: true,
    bg: "#d8c8a8",
    image: "/blog/summer-style.jpg",
  },
  {
    id: "2",
    slug: "how-to-build-a-capsule-wardrobe",
    category: "Fashion Tips",
    title: "How to Build a Capsule Wardrobe That Actually Works",
    excerpt: "Less is more. We break down the 30 essential pieces every wardrobe needs — and the ones you can finally let go of.",
    author: "Lena Müller",
    authorRole: "Fashion Editor",
    date: "Feb 28, 2026",
    readTime: "8 min read",
    featured: false,
    bg: "#e0ddd8",
    image: "/blog/capsule-wardrobe.jpg",
  },
  {
    id: "3",
    slug: "suit-up-modern-mens-tailoring",
    category: "Men's Edit",
    title: "Suit Up: The Return of Modern Men's Tailoring",
    excerpt: "Structured shoulders are back. Here's how to wear a suit in 2026 without looking like you're heading to a job interview.",
    author: "James Khoury",
    authorRole: "Menswear Correspondent",
    date: "Feb 18, 2026",
    readTime: "5 min read",
    featured: false,
    bg: "#1a2038",
    image: "/blog/mens-tailoring.jpg",
  },
  {
    id: "4",
    slug: "kids-fashion-trends-spring",
    category: "Kids",
    title: "Spring Kids Fashion: Fun Prints, Practical Fabrics",
    excerpt: "Bold colours, stretchy waistbands, and reinforced knees — spring dressing for little ones has never been this good.",
    author: "Amara Osei",
    authorRole: "Head Stylist",
    date: "Feb 12, 2026",
    readTime: "4 min read",
    featured: false,
    bg: "#d5e8d5",
    image: "/blog/kids-fashion.jpg",
  },
  {
    id: "5",
    slug: "accessories-that-elevate-any-outfit",
    category: "Accessories",
    title: "5 Accessories That Elevate Any Outfit Instantly",
    excerpt: "The right bag, a pair of frames, one good scarf — small additions that make a massive difference to how you're perceived.",
    author: "Lena Müller",
    authorRole: "Fashion Editor",
    date: "Feb 5, 2026",
    readTime: "5 min read",
    featured: false,
    bg: "#c8b8a0",
    image: "/blog/accessories-edit.jpg",
  },
  {
    id: "6",
    slug: "sustainable-fashion-velora",
    category: "Behind the Brand",
    title: "Our Commitment to Conscious Fashion",
    excerpt: "How Velora is rethinking supply chains, fabrics, and packaging — one collection at a time.",
    author: "James Khoury",
    authorRole: "Menswear Correspondent",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    featured: false,
    bg: "#3a4028",
    image: "/blog/sustainable.jpg",
  },
  {
    id: "7",
    slug: "dress-for-your-body-type",
    category: "Style Guide",
    title: "Dress for You: A No-Rules Body Confidence Guide",
    excerpt: "Forget the old rules. Velora believes every silhouette is worth celebrating. Here's how to find cuts that feel like you.",
    author: "Amara Osei",
    authorRole: "Head Stylist",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    featured: false,
    bg: "#e8d5e0",
    image: "/blog/body-confidence.jpg",
  },
  {
    id: "8",
    slug: "care-for-your-clothes",
    category: "Care & Maintenance",
    title: "Make It Last: How to Properly Care For Your Clothes",
    excerpt: "Washing, drying, storing — the simple habits that double the life of your favourite pieces.",
    author: "Lena Müller",
    authorRole: "Fashion Editor",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    featured: false,
    bg: "#e8e0d0",
    image: "/blog/clothes-care.jpg",
  },
];

const categories = ["All", "Style Guide", "Fashion Tips", "Men's Edit", "Kids", "Accessories", "Behind the Brand", "Care & Maintenance"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredPost = posts.find((p) => p.featured)!;
  const regularPosts = posts.filter((p) => !p.featured);

  const filteredRegular = activeCategory === "All"
    ? regularPosts
    : regularPosts.filter((p) => p.category === activeCategory);

  const showFeatured = activeCategory === "All" || featuredPost.category === activeCategory;

  return (
    <>
      <Navbar />

      {/* ── Page Header ── */}
      <section className="bg-[#0f0a05] pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/30 pt-8 mb-10">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-white/60">Journal</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-4">
                The Velora Journal
              </p>
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none">
                Style.<br />
                <span className="italic text-amber-400">Stories.</span>
              </h1>
            </div>
            <p className="text-white/40 text-base max-w-sm lg:text-right pb-2">
              Fashion insights, trend reports, and behind-the-scenes stories from the Velora team.
            </p>
          </div>
        </div>
      </section>

      <main className="bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">

          {/* ── Category Filter ── */}
          <div className="flex items-center gap-2 mb-12 flex-wrap">
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

          {/* ── Featured Post ── */}
          {showFeatured && (
            <Link href={`/blog/${featuredPost.slug}`} className="group block mb-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white border border-[#ede8e0] hover:shadow-xl transition-shadow duration-500">

                {/* Image */}
                <div
                  className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden"
                  style={{ backgroundColor: featuredPost.bg }}
                >
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {/* Featured badge */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-amber-400 text-[#0f0a05] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={12} className="text-[#8a7060]" />
                    <span className="text-xs uppercase tracking-widest text-[#8a7060] font-semibold">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f0a05] leading-snug mb-4 group-hover:text-[#7a5c44] transition-colors duration-300">
                    {featuredPost.title}
                  </h2>

                  <p className="text-[#5a4a3a] text-sm leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>

                  {/* Author row */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#ede8e0]">
                    <div>
                      <p className="text-sm font-semibold text-[#0f0a05]">{featuredPost.author}</p>
                      <p className="text-xs text-[#8a7060]">{featuredPost.authorRole}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#8a7060]">
                      <Clock size={12} />
                      <span>{featuredPost.readTime}</span>
                      <span>·</span>
                      <span>{featuredPost.date}</span>
                    </div>
                  </div>

                  {/* Read more */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0f0a05] group-hover:text-[#7a5c44] transition-colors">
                      Read Article
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* ── Regular Posts Grid ── */}
          {filteredRegular.length > 0 && (
            <>
              {activeCategory === "All" && (
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#c8b8a8]" />
                  <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold">Latest Posts</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRegular.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#ede8e0] hover:shadow-lg transition-all duration-400">

                    {/* Image */}
                    <div
                      className="relative aspect-[16/10] overflow-hidden"
                      style={{ backgroundColor: post.bg }}
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        unoptimized
                        className="object-cover object-center transition-transform duration-600 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] uppercase tracking-widest text-[#8a7060] font-semibold bg-[#faf8f5] px-2.5 py-1 rounded-full border border-[#ede8e0]">
                          {post.category}
                        </span>
                      </div>

                      <h3 className="font-serif text-[#0f0a05] font-bold text-lg leading-snug mb-3 group-hover:text-[#7a5c44] transition-colors duration-300 flex-1">
                        {post.title}
                      </h3>

                      <p className="text-[#8a7060] text-sm leading-relaxed mb-5 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#ede8e0]">
                        <div>
                          <p className="text-xs font-semibold text-[#0f0a05]">{post.author}</p>
                          <p className="text-[11px] text-[#8a7060]">{post.date}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#8a7060]">
                          <Clock size={10} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {!showFeatured && filteredRegular.length === 0 && (
            <div className="text-center py-24">
              <p className="font-serif text-[#8a7060] text-xl">No posts in this category yet.</p>
            </div>
          )}

          {/* ── Newsletter CTA ── */}
          <div className="mt-20 rounded-3xl bg-[#0f0a05] px-8 sm:px-14 py-14 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-amber-400/10 translate-x-1/3" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-amber-400/15 translate-x-1/3" />

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-3">
                Stay in the loop
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                The Velora Edit,<br />
                <span className="italic text-amber-400">in your inbox.</span>
              </h3>
              <p className="text-white/40 text-sm max-w-sm">
                New arrivals, style guides, and exclusive offers — delivered weekly.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 lg:w-72 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/50 transition-colors"
                />
                <button className="bg-amber-400 text-[#0f0a05] font-bold text-sm px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-300 shrink-0">
                  Subscribe
                </button>
              </div>
              <p className="text-white/20 text-xs mt-3 text-center sm:text-left">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}