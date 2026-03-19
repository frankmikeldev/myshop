"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ChevronRight, ChevronDown, Search, ArrowRight, Package, RefreshCw, CreditCard, Ruler, Shirt, Globe } from "lucide-react";

const categories = [
  { id: "orders",   label: "Orders & Shipping", icon: Package },
  { id: "returns",  label: "Returns & Refunds",  icon: RefreshCw },
  { id: "payment",  label: "Payment",            icon: CreditCard },
  { id: "sizing",   label: "Sizing & Fit",       icon: Ruler },
  { id: "products", label: "Products & Care",    icon: Shirt },
  { id: "account",  label: "Account",            icon: Globe },
];

const faqs = [
  // Orders & Shipping
  { id: "o1", category: "orders",   q: "How long does delivery take?",                        a: "Standard delivery takes 3–7 business days within Nigeria. International orders typically arrive within 7–14 business days depending on your location. Express shipping options are available at checkout." },
  { id: "o2", category: "orders",   q: "Do you ship internationally?",                        a: "Yes — we ship to 60+ countries worldwide. International shipping rates and estimated delivery times are calculated at checkout based on your location." },
  { id: "o3", category: "orders",   q: "Can I track my order?",                               a: "Absolutely. Once your order ships, you'll receive a confirmation email with a tracking link. You can also track your order from your account dashboard under 'My Orders'." },
  { id: "o4", category: "orders",   q: "Can I change or cancel my order after placing it?",   a: "Orders can be modified or cancelled within 1 hour of placing them. After that, our fulfilment team will have already started processing it. Contact us at hello@velora.com as quickly as possible and we'll do our best to help." },
  { id: "o5", category: "orders",   q: "What happens if my order is lost in transit?",        a: "In the rare case your order doesn't arrive within the expected window, please contact our customer experience team. We'll investigate with the courier and either reship your order or issue a full refund." },

  // Returns & Refunds
  { id: "r1", category: "returns",  q: "What is your return policy?",                         a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Sale items are final sale and cannot be returned." },
  { id: "r2", category: "returns",  q: "How do I start a return?",                            a: "Head to your account dashboard, select the order, and click 'Request Return'. You'll receive a prepaid return label by email within 24 hours. Drop it at any partner courier point and we'll handle the rest." },
  { id: "r3", category: "returns",  q: "How long do refunds take?",                           a: "Once we receive and inspect your return (usually within 2–3 business days), your refund will be processed within 5–7 business days back to your original payment method." },
  { id: "r4", category: "returns",  q: "Can I exchange an item instead of returning it?",     a: "Yes. During the return process, select 'Exchange' and choose your preferred size or colour. Exchanges are free and prioritised — your replacement is dispatched as soon as your return is scanned by the courier." },
  { id: "r5", category: "returns",  q: "Are return shipping costs covered?",                  a: "Returns within Nigeria are free. For international returns, a flat return shipping fee applies and will be deducted from your refund. This fee varies by country and is shown during the return process." },

  // Payment
  { id: "p1", category: "payment",  q: "What payment methods do you accept?",                 a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers for orders over ₦50,000. All transactions are encrypted and secure." },
  { id: "p2", category: "payment",  q: "Is my payment information secure?",                   a: "Yes. We use industry-standard SSL encryption and never store your full card details. All payments are processed through PCI-DSS compliant payment providers." },
  { id: "p3", category: "payment",  q: "Can I use multiple discount codes on one order?",     a: "Only one discount code can be applied per order. If you have a gift card and a promo code, the gift card is applied first and any remaining balance can then be paid with your chosen payment method." },
  { id: "p4", category: "payment",  q: "Will I be charged customs or import duties?",         a: "International orders may be subject to customs fees or import duties depending on your country's regulations. These fees are not included in our prices and are the responsibility of the customer." },

  // Sizing & Fit
  { id: "s1", category: "sizing",   q: "How do I find my size?",                              a: "Each product page has a detailed size guide with measurements in both cm and inches. We recommend measuring yourself and comparing against the guide rather than going by your usual size, as fits vary between styles." },
  { id: "s2", category: "sizing",   q: "Do your clothes run true to size?",                   a: "Most Velora pieces run true to size. Where a style runs small or large, we note this clearly on the product page. When in doubt, size up — especially for relaxed or oversized fits." },
  { id: "s3", category: "sizing",   q: "Do you offer plus sizes?",                            a: "Yes. Our womenswear and menswear collections are available in sizes XS–3XL. Kids sizes range from age 2–3 through 11–12. We're continuously expanding our size range — join our newsletter to be notified of new additions." },
  { id: "s4", category: "sizing",   q: "What if the size I want is out of stock?",            a: "You can click 'Notify Me' on sold-out sizes to receive an email when they're restocked. Popular sizes typically restock within 2–4 weeks. You can also contact us and we'll let you know the restock timeline." },

  // Products & Care
  { id: "c1", category: "products", q: "How should I care for my Velora pieces?",             a: "Care instructions are printed on each garment's inner label and listed on the product page. As a general rule: wash on a cool cycle, avoid tumble drying delicate fabrics, and store knitwear folded rather than hung to maintain shape." },
  { id: "c2", category: "products", q: "Are your fabrics sustainably sourced?",               a: "We're actively transitioning to certified sustainable materials across our collections. Our linen, organic cotton, and recycled polyester lines meet OEKO-TEX or GOTS standards. You can read more on our sustainability page." },
  { id: "c3", category: "products", q: "Do your suits come with free alterations?",           a: "Yes — all suits purchased for over $300 qualify for one round of free alterations at any of our partner tailors. Contact us after your purchase to arrange this service." },
  { id: "c4", category: "products", q: "Do you offer gift wrapping?",                        a: "Yes. You can add gift wrapping at checkout for a flat fee of ₦500 / $2. We'll include a handwritten note card if you leave a message in the gift note field." },

  // Account
  { id: "a1", category: "account",  q: "How do I create an account?",                        a: "Click 'Account' in the top navigation and select 'Create Account'. You'll need your name, email address, and a password. You can also sign in with Google or Apple for a faster setup." },
  { id: "a2", category: "account",  q: "Can I checkout as a guest?",                         a: "Yes. You don't need an account to place an order. However, creating one lets you track orders, save addresses, manage returns, and access your order history — so we recommend it." },
  { id: "a3", category: "account",  q: "How do I reset my password?",                        a: "On the login page, click 'Forgot Password' and enter your email. You'll receive a reset link within a few minutes. If you don't see it, check your spam folder or contact our support team." },
  { id: "a4", category: "account",  q: "How do I unsubscribe from marketing emails?",        a: "You can unsubscribe at any time using the 'Unsubscribe' link at the bottom of any Velora email. You can also manage your email preferences from your account settings under 'Notifications'." },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs.filter((f) => f.category === activeCategory);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="bg-[#0f0a05] pt-32 pb-20 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[360px] h-[360px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[220px] h-[220px] rounded-full border border-amber-400/10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/30 mb-10">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight size={13} />
            <span className="text-white/60">FAQ's</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-4">
              Help Centre
            </p>
            <h1 className="font-serif text-6xl sm:text-7xl font-bold text-white leading-none mb-5">
              Got a<br />
              <span className="italic text-amber-400">question?</span>
            </h1>
            <p className="text-white/40 text-lg mb-10 leading-relaxed">
              Find answers to the most common questions about orders, returns, sizing, and more.
            </p>

            {/* Search bar */}
            <div className="relative">
              <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full bg-white/8 border border-white/15 text-white placeholder-white/25 text-sm rounded-full py-4 pl-12 pr-6 focus:outline-none focus:border-amber-400/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-xs font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <main className="bg-[#faf8f5] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-14">

          {!isSearching ? (
            <div className="flex flex-col lg:flex-row gap-10">

              {/* ── Sidebar categories ── */}
              <aside className="lg:w-64 shrink-0">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8a7060] font-semibold mb-4">
                  Categories
                </p>
                <nav className="flex flex-row lg:flex-col gap-2 flex-wrap">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategory(cat.id); setExpandedId(null); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-200 w-full ${
                          isActive
                            ? "bg-[#0f0a05] text-white"
                            : "bg-white text-[#5a4a3a] border border-[#ede8e0] hover:border-[#c8b8a8] hover:text-[#0f0a05]"
                        }`}
                      >
                        <Icon size={15} className={isActive ? "text-amber-400" : "text-[#8a7060]"} />
                        {cat.label}
                      </button>
                    );
                  })}
                </nav>

                {/* Contact CTA in sidebar */}
                <div className="hidden lg:block mt-10 p-6 rounded-2xl bg-[#0f0a05] text-white">
                  <p className="font-serif font-bold text-lg mb-2">Still need help?</p>
                  <p className="text-white/40 text-sm mb-5 leading-relaxed">Our team typically responds within 2 hours.</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-amber-400 text-[#0f0a05] font-bold text-xs px-5 py-2.5 rounded-full hover:bg-white transition-colors group w-full justify-center"
                  >
                    Contact Us
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </aside>

              {/* ── FAQ accordion ── */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-[#0f0a05]">
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </h2>
                  <span className="text-sm text-[#8a7060]">
                    {filteredFaqs.length} question{filteredFaqs.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredFaqs.map((faq) => {
                    const isOpen = expandedId === faq.id;
                    return (
                      <div
                        key={faq.id}
                        className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                          isOpen ? "border-[#0f0a05] shadow-sm" : "border-[#ede8e0] hover:border-[#c8b8a8]"
                        }`}
                      >
                        <button
                          onClick={() => setExpandedId(isOpen ? null : faq.id)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                        >
                          <span className="font-semibold text-[#0f0a05] text-sm sm:text-base pr-2">
                            {faq.q}
                          </span>
                          <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isOpen ? "bg-[#0f0a05] border-[#0f0a05]" : "border-[#e0d4c8]"
                          }`}>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-[#5a4a3a]"}`} />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 border-t border-[#ede8e0]">
                            <p className="text-[#5a4a3a] text-sm leading-relaxed pt-4">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          ) : (

            /* ── Search Results ── */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-[#0f0a05]">
                  Search results for &ldquo;{searchQuery}&rdquo;
                </h2>
                <span className="text-sm text-[#8a7060]">{filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}</span>
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="space-y-3 max-w-3xl">
                  {filteredFaqs.map((faq) => {
                    const isOpen = expandedId === faq.id;
                    const catLabel = categories.find((c) => c.id === faq.category)?.label;
                    return (
                      <div
                        key={faq.id}
                        className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                          isOpen ? "border-[#0f0a05] shadow-sm" : "border-[#ede8e0] hover:border-[#c8b8a8]"
                        }`}
                      >
                        <button
                          onClick={() => setExpandedId(isOpen ? null : faq.id)}
                          className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
                        >
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8a7060] bg-[#faf8f5] border border-[#ede8e0] px-2 py-0.5 rounded-full mb-2 inline-block">
                              {catLabel}
                            </span>
                            <p className="font-semibold text-[#0f0a05] text-sm sm:text-base">
                              {faq.q}
                            </p>
                          </div>
                          <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all duration-300 ${
                            isOpen ? "bg-[#0f0a05] border-[#0f0a05]" : "border-[#e0d4c8]"
                          }`}>
                            <ChevronDown size={13} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-[#5a4a3a]"}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 border-t border-[#ede8e0]">
                            <p className="text-[#5a4a3a] text-sm leading-relaxed pt-4">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 max-w-md mx-auto">
                  <p className="font-serif text-[#0f0a05] text-2xl font-bold mb-3">No results found</p>
                  <p className="text-[#8a7060] text-sm mb-6">Try a different search term or browse by category.</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center gap-2 bg-[#0f0a05] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#7a5c44] transition-colors"
                  >
                    Browse All FAQs
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Bottom contact strip ── */}
          <div className="mt-16 rounded-3xl bg-[#0f0a05] px-8 sm:px-14 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-400 font-semibold mb-3">
                We're Here for You
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Couldn't find your answer?
              </h3>
              <p className="text-white/40 text-sm mt-1.5">
                Our customer experience team typically replies within 2 hours.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 group inline-flex items-center gap-2 bg-amber-400 text-[#0f0a05] font-bold text-sm px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
            >
              Contact Support
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}