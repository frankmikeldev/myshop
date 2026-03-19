"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Mens Wear",
    slug: "mens",
    image: "/categories/mens.jpg",
    description: "Sharp styles for every occasion",
  },
  {
    name: "Womens Wear",
    slug: "womens",
    image: "/categories/womens.jpg",
    description: "Elegant looks crafted for you",
  },
  {
    name: "Kids Wear",
    slug: "kids",
    image: "/categories/kids.jpg",
    description: "Playful & comfortable fits",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/categories/accessories.jpg",
    description: "Complete your look",
  },
];

export default function Categories() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-3">
            Browse By
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">
            Our Categories
          </h2>
          <p className="mt-4 text-[#5a4a3a] text-base max-w-md mx-auto">
            Explore a wide range of styles, handpicked to suit every taste and
            need.
          </p>
        </div>

        {/* ── Category Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-[#f5f0eb] block"
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-serif text-xl font-bold mb-1">
                  {cat.name}
                </h3>
                <p className="text-white/70 text-xs mb-3 hidden sm:block">
                  {cat.description}
                </p>

                {/* Shop Now button */}
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white border border-white/60 rounded-full px-4 py-1.5 group-hover:bg-white group-hover:text-[#0f0a05] transition-all duration-300">
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}