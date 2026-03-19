"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] bg-[#0f0a05] overflow-hidden flex items-center">

      {/* ── Background Image ── */}
      <div className="absolute inset-0">
        <Image
          src="/hero-model.jpg"
          alt="Velora fashion collection"
          fill
          priority
          className="object-cover object-center opacity-60"
        />
        {/* Left fade so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a05] via-[#0f0a05]/70 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a05]/80 via-transparent to-transparent" />
      </div>

      {/* ── Subtle grid lines ── */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "120px 120px" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-24 lg:py-0">
        <div className="max-w-2xl">

          {/* Tag */}
          <div
            className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a07a]" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a07a] font-semibold">
              New Collection · Spring 2026
            </p>
          </div>

          {/* Headline */}
          <h1
            className={`font-serif leading-[1.05] text-white mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "120ms", fontSize: "clamp(48px, 7vw, 80px)" }}
          >
            Timeless <br />
            <span className="italic font-light text-[#c9a07a]">Fashion</span>{" "}
            for the <br />
            <span className="font-bold">Modern Wardrobe.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-sm text-white/40 leading-relaxed max-w-md mb-10 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            Curated pieces crafted for every occasion — from relaxed everyday wear
            to tailored evening looks. Quality you can feel, style that endures.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-[#0f0a05] text-sm font-bold px-8 py-4 rounded-full hover:bg-[#c9a07a] hover:text-white transition-all duration-300 tracking-wide"
            >
              Explore Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/shop/womens"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors duration-300 tracking-wide group"
            >
              View New Arrivals
              <span className="w-5 h-px bg-white/40 group-hover:w-8 group-hover:bg-white transition-all duration-300 inline-block" />
            </Link>
          </div>

          {/* Stats row */}
          <div
            className={`flex gap-10 mt-14 pt-8 border-t border-white/10 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "420ms" }}
          >
            {[
              { value: "2,400+", label: "Products" },
              { value: "98%",    label: "Happy Customers" },
              { value: "Free",   label: "Returns" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Delivery badge ── */}
      <div
        className={`hidden lg:flex absolute right-8 bottom-8 z-10 items-center gap-3 bg-white/8 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10 transition-all duration-700 ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        <span className="text-xs font-medium text-white/60 tracking-wide">
          Free delivery on orders over $100
        </span>
      </div>

      {/* ── New Season floating badge ── */}
      <div
        className={`hidden lg:block absolute right-8 top-1/3 z-10 bg-[#c9a07a]/15 border border-[#c9a07a]/30 px-4 py-3 transition-all duration-700 ${
          loaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        <p className="text-[10px] text-[#c9a07a] uppercase tracking-widest font-semibold">20% Off</p>
        <p className="text-xs text-white/60 mt-0.5">Tank Tops</p>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-semibold">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

    </section>
  );
}