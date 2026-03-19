"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Set your sale end date here
const SALE_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const interval = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

function Pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function PromoBanner() {
  const { days, hours, minutes, seconds } = useCountdown(SALE_END);

  return (
    <section className="w-full bg-[#0f0a05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 py-16 lg:py-0 lg:min-h-[480px]">

          {/* ── Left: Text Content ── */}
          <div className="flex-1 text-center lg:text-left lg:py-16">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">
                Limited Time Offer
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4">
              Hurry Up! <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                Get Up to 50% Off
              </span>
            </h2>

            <p className="text-white/60 text-base mb-8 max-w-sm mx-auto lg:mx-0">
              Step into summer with sun-ready styles at can't-miss prices.
              Don't wait — these deals won't last long.
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Mins", value: minutes },
                { label: "Secs", value: seconds },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="bg-white/10 border border-white/10 rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white font-serif tabular-nums">
                        {Pad(unit.value)}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1.5 font-semibold">
                      {unit.label}
                    </p>
                  </div>
                  {i < 3 && (
                    <span className="text-white/30 text-2xl font-bold mb-4">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/shop/sale"
              className="inline-flex items-center gap-2 bg-white text-[#0f0a05] text-sm font-bold px-8 py-4 rounded-full hover:bg-amber-300 transition-colors duration-300 tracking-wide"
            >
              Shop the Summer Sale
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* ── Right: Image ── */}
          <div className="flex-1 w-full lg:w-auto relative">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-500/10 rounded-3xl blur-3xl" />

            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:max-w-none rounded-3xl overflow-hidden bg-[#1a1208]">
              <Image
                src="/promo-banner.jpg"
                alt="Summer Sale"
                fill
                unoptimized
                className="object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />

              {/* Discount badge overlay */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-red-500 rounded-full flex flex-col items-center justify-center shadow-lg rotate-12">
                <span className="text-white text-xl font-black font-serif leading-none">
                  50%
                </span>
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                  Off
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}