"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, Heart, Leaf, Zap, Users } from "lucide-react";

const team = [
  { name: "Amara Osei",      role: "Founder & Creative Director", bg: "#c8b8a0", image: "/team/amara.jpg" },
  { name: "Lena Müller",     role: "Head of Design",              bg: "#d8c8b8", image: "/team/lena.jpg" },
  { name: "James Khoury",    role: "Head of Menswear",            bg: "#2a2218", image: "/team/james.jpg" },
  { name: "Priya Nair",      role: "Sustainability Lead",         bg: "#d5e0c8", image: "/team/priya.jpg" },
];

const values = [
  {
    icon: Heart,
    title: "Made With Intention",
    body: "Every piece we design starts with a question: will someone still love this in five years? We build for longevity, not trends.",
  },
  {
    icon: Leaf,
    title: "Consciously Crafted",
    body: "From fabric sourcing to final packaging, we think about our footprint at every step. Less waste. Better materials. Real accountability.",
  },
  {
    icon: Zap,
    title: "Effortlessly Wearable",
    body: "Great clothing shouldn't require effort. Our pieces are designed to work together, dress up or down, and move with your life.",
  },
  {
    icon: Users,
    title: "For Every Body",
    body: "Velora is built for real people — not mannequins. We design across sizes, silhouettes, ages, and occasions without compromise.",
  },
];

const milestones = [
  { year: "2018", event: "Velora founded in Lagos with a 12-piece debut collection." },
  { year: "2019", event: "First physical pop-up store. 400 customers on opening day." },
  { year: "2020", event: "Launched online store. Shipped to 14 countries in year one." },
  { year: "2022", event: "Introduced kids and accessories lines. 50,000 happy customers." },
  { year: "2024", event: "Committed to 100% recycled packaging across all orders." },
  { year: "2026", event: "Now serving customers in 60+ countries. Still just getting started." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ══════════════════════════════
          HERO — full-bleed editorial
      ══════════════════════════════ */}
      <section className="relative min-h-screen bg-[#0f0a05] flex flex-col justify-end overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/about/hero.jpg')] bg-cover bg-center opacity-30" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a05] via-[#0f0a05]/40 to-transparent" />

        {/* Floating label top-right */}
        <div className="absolute top-10 right-8 sm:right-14 lg:right-20 text-right hidden sm:block">
          <p className="text-white/20 text-xs uppercase tracking-[0.4em] font-semibold">Est. 2018</p>
          <p className="text-white/20 text-xs uppercase tracking-[0.4em] font-semibold mt-1">Lagos, Nigeria</p>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pb-20 pt-32 w-full">
          <p className="text-amber-400 text-xs uppercase tracking-[0.4em] font-bold mb-6">
            Our Story
          </p>
          <h1 className="font-serif font-bold text-white leading-[0.9] mb-8">
            <span className="block text-6xl sm:text-8xl lg:text-[9rem]">We are</span>
            <span className="block text-6xl sm:text-8xl lg:text-[9rem] italic text-amber-400">Velora.</span>
          </h1>
          <p className="text-white/50 text-lg sm:text-xl max-w-2xl leading-relaxed">
            A fashion brand born from the belief that clothing should feel as good as it looks — timeless, intentional, and made for real life.
          </p>

          {/* Scroll hint */}
          <div className="flex items-center gap-3 mt-14">
            <div className="w-px h-10 bg-white/20" />
            <span className="text-white/20 text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          ORIGIN STORY
      ══════════════════════════════ */}
      <section className="bg-[#faf8f5] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#e8ddd5]">
                <Image
                  src="/about/hero.jpg"
                  alt="Velora origin"
                  fill
                  unoptimized
                  className="object-cover object-center"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-4 sm:right-0 bg-[#0f0a05] text-white px-7 py-5 rounded-2xl shadow-xl">
                <p className="text-3xl font-bold font-serif text-amber-400">60+</p>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Countries Served</p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-5">
                Where It All Began
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05] leading-tight mb-6">
                Built on a vision of<br />
                <span className="italic text-[#7a5c44]">timeless style.</span>
              </h2>
              <div className="space-y-4 text-[#5a4a3a] text-base leading-relaxed">
                <p>
                  Velora was founded in Lagos in 2018 by Amara Osei — a designer tired of fashion that chased trends instead of building lasting wardrobes. She started with 12 pieces, a small workshop, and one clear principle: everything we make should still feel right in five years.
                </p>
                <p>
                  What began as a local brand quickly became something global. Today Velora ships to over 60 countries, with collections spanning menswear, womenswear, kids, and accessories. The workshop is bigger. The team has grown. But the principle hasn't changed.
                </p>
                <p>
                  We design clothes that move with you — through seasons, occasions, and chapters of life. Not fast fashion. Not fleeting. Just really good clothing, made to last.
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-[#0f0a05] border-b-2 border-[#0f0a05] pb-0.5 hover:text-[#7a5c44] hover:border-[#7a5c44] transition-colors group"
              >
                Read our Journal
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          VALUES
      ══════════════════════════════ */}
      <section className="bg-white py-24 border-y border-[#ede8e0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-4">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="group p-7 rounded-2xl bg-[#faf8f5] border border-[#ede8e0] hover:border-[#c8b8a8] hover:shadow-md transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#0f0a05] flex items-center justify-center mb-5 group-hover:bg-[#7a5c44] transition-colors duration-300">
                  <v.icon size={18} className="text-amber-400" />
                </div>
                <h3 className="font-serif text-[#0f0a05] font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-[#5a4a3a] text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          TIMELINE
      ══════════════════════════════ */}
      <section className="bg-[#0f0a05] py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-4">
              Eight Years In
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              The Velora Timeline
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] sm:left-[88px] top-0 bottom-0 w-px bg-white/10 hidden sm:block" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex items-start gap-6 sm:gap-10 group">
                  {/* Year */}
                  <div className="shrink-0 w-16 sm:w-20 text-right">
                    <span className="font-serif text-lg sm:text-xl font-bold text-amber-400">{m.year}</span>
                  </div>

                  {/* Dot */}
                  <div className="relative shrink-0 hidden sm:flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors duration-300 mt-1.5" />
                  </div>

                  {/* Event */}
                  <div className="flex-1 pb-8 border-b border-white/5 sm:border-0">
                    <p className="text-white/60 text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {m.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          BOTTOM CTA
      ══════════════════════════════ */}
      <section className="bg-[#0f0a05] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about/cta-bg.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber-400/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-400/8" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold mb-6">
            Wear What Matters
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Ready to find your<br />
            <span className="italic text-amber-400">signature style?</span>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Browse our latest collections and discover pieces built to last — for every occasion, every chapter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-amber-400 text-[#0f0a05] font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 group"
            >
              Shop All Collections
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-bold text-sm px-8 py-4 rounded-full hover:border-white/50 hover:text-white transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}