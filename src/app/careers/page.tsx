"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowRight, MapPin, Clock, ChevronDown, ChevronRight, Briefcase, Globe, Heart, Zap } from "lucide-react";

const perks = [
  { icon: Globe,     title: "Remote Friendly",       body: "Work from anywhere. We're a distributed team across 3 continents." },
  { icon: Heart,     title: "Staff Wardrobe Allowance", body: "£500 annual clothing credit to spend across any Velora collection." },
  { icon: Zap,       title: "Fast Growth",            body: "We move quickly. Strong performers grow fast — titles and comp included." },
  { icon: Briefcase, title: "Real Ownership",         body: "Everyone has a voice here. We hire people we trust, then trust them fully." },
];

const openings = [
  {
    id: "1",
    title: "Senior Fashion Buyer",
    department: "Merchandising",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Senior",
    description: "Own the buying process across Womenswear and Accessories. You'll work closely with the Creative Director to shape seasonal product selections and manage supplier relationships globally.",
    responsibilities: [
      "Lead seasonal buying strategy for Womenswear and Accessories",
      "Manage relationships with 20+ international suppliers",
      "Analyse sales data and trend reports to inform buying decisions",
      "Collaborate with the design team on product development",
    ],
    requirements: [
      "5+ years fashion buying experience",
      "Strong analytical and negotiation skills",
      "Experience with buying management software",
      "Willingness to travel internationally",
    ],
  },
  {
    id: "2",
    title: "Full-Stack Engineer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    level: "Mid-Senior",
    description: "Build and scale the digital experiences behind Velora's e-commerce platform. You'll work on everything from checkout flows to internal tooling, using Next.js, TypeScript and Supabase.",
    responsibilities: [
      "Build and maintain our Next.js storefront and internal tools",
      "Design and implement Supabase database schemas and APIs",
      "Collaborate with design on component systems and UX",
      "Own performance monitoring and incident response",
    ],
    requirements: [
      "3+ years full-stack experience",
      "Strong TypeScript and React skills",
      "Experience with PostgreSQL or Supabase",
      "Excellent written communication (remote team)",
    ],
  },
  {
    id: "3",
    title: "Content & Social Media Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    level: "Mid",
    description: "Lead Velora's content strategy across Instagram, TikTok and editorial channels. You'll write, direct, and publish content that turns our brand story into compelling visuals and copy.",
    responsibilities: [
      "Own the content calendar across all social platforms",
      "Write editorial copy for the Velora Journal and email campaigns",
      "Brief and direct photo shoots and UGC creators",
      "Report on engagement metrics and community growth",
    ],
    requirements: [
      "3+ years content/social experience in fashion or lifestyle",
      "Strong copywriting and creative direction skills",
      "Experience with short-form video (Reels, TikTok)",
      "An eye for brand-consistent aesthetics",
    ],
  },
  {
    id: "4",
    title: "Sustainability & Sourcing Analyst",
    department: "Operations",
    location: "Lagos, Nigeria",
    type: "Full-time",
    level: "Mid",
    description: "Help us live up to our sustainability commitments. You'll audit supplier practices, track our carbon footprint, and identify opportunities to reduce our environmental impact across the supply chain.",
    responsibilities: [
      "Audit and score supplier sustainability practices",
      "Track and report on Velora's annual carbon and waste metrics",
      "Research certifications, materials and green logistics options",
      "Liaise with the product team on sustainable fabric selection",
    ],
    requirements: [
      "Background in sustainability, supply chain or environmental science",
      "Experience with ESG reporting frameworks",
      "Detail-oriented with strong written reporting skills",
      "Passion for ethical fashion",
    ],
  },
  {
    id: "5",
    title: "Customer Experience Lead",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    level: "Senior",
    description: "Define and elevate the post-purchase experience for Velora's global customers. You'll own the CS function, manage a small team, and work cross-functionally to reduce friction at every touchpoint.",
    responsibilities: [
      "Lead and grow a team of 4 customer experience associates",
      "Define SLAs, playbooks and escalation processes",
      "Work with product and ops to resolve recurring customer issues",
      "Own NPS and CSAT tracking and improvement initiatives",
    ],
    requirements: [
      "4+ years in customer success or experience roles",
      "Experience managing small teams",
      "Data-driven with a customer-first mindset",
      "Excellent communication and problem-solving skills",
    ],
  },
];

const departments = ["All", "Merchandising", "Technology", "Marketing", "Operations", "Customer Success"];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeDept === "All"
    ? openings
    : openings.filter((o) => o.department === activeDept);

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative bg-[#faf8f5] overflow-hidden pt-32 pb-24">
        {/* Decorative large text watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif font-bold text-[18vw] text-[#0f0a05]/[0.03] leading-none whitespace-nowrap">
            JOIN US
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <nav className="flex items-center gap-2 text-sm text-[#8a7060] mb-10">
            <Link href="/" className="hover:text-[#0f0a05] transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-[#0f0a05]">Careers</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#8a7060] font-semibold mb-5">
                Work at Velora
              </p>
              <h1 className="font-serif font-bold text-[#0f0a05] leading-[0.92] mb-6">
                <span className="block text-6xl sm:text-7xl lg:text-8xl">Build the</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl italic text-[#7a5c44]">future of</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl">fashion.</span>
              </h1>
              <div className="w-16 h-1 bg-amber-400 rounded-full mb-6" />
              <p className="text-[#5a4a3a] text-lg max-w-md leading-relaxed">
                We're building something different — a fashion brand that lasts. Join a small, ambitious team and do the best work of your career.
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:pb-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "5",    label: "Open Roles" },
                  { value: "3",    label: "Continents" },
                  { value: "60+",  label: "Countries" },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-[#ede8e0] rounded-2xl p-5 text-center">
                    <p className="font-serif text-3xl font-bold text-[#0f0a05]">{s.value}</p>
                    <p className="text-xs text-[#8a7060] uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Team image */}
              <div className="relative aspect-[16/7] rounded-2xl overflow-hidden bg-[#e8ddd5]">
                <Image
                  src="/careers/team.jpg"
                  alt="Velora team"
                  fill
                  unoptimized
                  className="object-cover object-center"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a05]/40 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-white font-serif font-bold text-lg">The Velora Team</p>
                  <p className="text-white/50 text-xs">Lagos · London · Amsterdam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PERKS
      ══════════════════════════════ */}
      <section className="bg-[#0f0a05] py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-3">
                Why Velora
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white">
                What we offer
              </h2>
            </div>
            <p className="text-white/30 text-sm max-w-xs sm:text-right">
              Beyond competitive salaries — the culture, benefits, and environment that make the work great.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="group p-7 rounded-2xl border border-white/10 hover:border-amber-400/30 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center mb-5 group-hover:bg-amber-400/20 transition-colors">
                  <perk.icon size={17} className="text-amber-400" />
                </div>
                <h3 className="font-serif text-white font-bold text-lg mb-2">{perk.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{perk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          OPEN ROLES
      ══════════════════════════════ */}
      <main className="bg-[#faf8f5] py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
              Open Positions
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#0f0a05]">
              Current Openings
            </h2>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeDept === d
                    ? "bg-[#0f0a05] text-white border-[#0f0a05]"
                    : "bg-white text-[#5a4a3a] border-[#e0d4c8] hover:border-[#0f0a05] hover:text-[#0f0a05]"
                }`}
              >
                {d}
              </button>
            ))}
            <span className="text-sm text-[#8a7060] ml-2">{filtered.length} role{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Job Listings — accordion */}
          <div className="space-y-3">
            {filtered.map((job) => {
              const isOpen = expandedId === job.id;
              return (
                <div
                  key={job.id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-[#0f0a05] shadow-md" : "border-[#ede8e0] hover:border-[#c8b8a8]"
                  }`}
                >
                  {/* Header row */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : job.id)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#8a7060] bg-[#faf8f5] border border-[#ede8e0] px-2.5 py-1 rounded-full">
                          {job.department}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
                          {job.level}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-[#0f0a05] text-xl">{job.title}</h3>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="hidden sm:flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#8a7060]">
                          <MapPin size={11} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#8a7060]">
                          <Clock size={11} />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full border border-[#e0d4c8] flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-[#0f0a05] border-[#0f0a05]" : ""}`}>
                        <ChevronDown size={15} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-[#5a4a3a]"}`} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="px-6 pb-8 border-t border-[#ede8e0]">
                      <div className="flex flex-wrap gap-3 pt-5 mb-5 sm:hidden">
                        <div className="flex items-center gap-1.5 text-xs text-[#8a7060]">
                          <MapPin size={11} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#8a7060]">
                          <Clock size={11} />
                          <span>{job.type}</span>
                        </div>
                      </div>

                      <p className="text-[#5a4a3a] text-sm leading-relaxed mb-7 pt-5">
                        {job.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.25em] text-[#0f0a05] font-bold mb-4">
                            Responsibilities
                          </h4>
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((r) => (
                              <li key={r} className="flex items-start gap-2.5 text-sm text-[#5a4a3a]">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs uppercase tracking-[0.25em] text-[#0f0a05] font-bold mb-4">
                            Requirements
                          </h4>
                          <ul className="space-y-2.5">
                            {job.requirements.map((r) => (
                              <li key={r} className="flex items-start gap-2.5 text-sm text-[#5a4a3a]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0f0a05] shrink-0 mt-1.5" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link
                        href={`/careers/apply/${job.id}`}
                        className="inline-flex items-center gap-2 bg-[#0f0a05] text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-[#7a5c44] transition-colors duration-300 group"
                      >
                        Apply for this Role
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-serif text-[#8a7060] text-xl">No openings in this department right now.</p>
              <p className="text-[#8a7060] text-sm mt-2">Check back soon or browse all departments.</p>
            </div>
          )}

          {/* ── Speculative CTA ── */}
          <div className="mt-14 rounded-3xl bg-[#0f0a05] px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-[url('/careers/team.jpg')] bg-cover bg-center opacity-10" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-3">
                Don't See a Fit?
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Send a speculative application.
              </h3>
              <p className="text-white/40 text-sm mt-1.5 max-w-md">
                We're always on the lookout for exceptional talent. If you believe you belong at Velora, tell us why.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 shrink-0 group inline-flex items-center gap-2 bg-amber-400 text-[#0f0a05] font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
            >
              Get in Touch
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}