"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { createClient } from "@/supabase/client";
import { signOut } from "@/actions/auth";
import { getCartCount } from "@/actions/cart";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    dropdown: [
      { label: "Mens Wear",   href: "/shop/mens" },
      { label: "Womens Wear", href: "/shop/womens" },
      { label: "Kids Wear",   href: "/shop/kids" },
      { label: "Accessories", href: "/shop/accessories" },
    ],
  },
  { label: "Blog",    href: "/blog" },
  { label: "About",   href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ's",   href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [shopOpen, setShopOpen]       = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartCount, setCartCount]     = useState(0);
  const [user, setUser]               = useState<{ name?: string; email?: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // ── Scroll shadow ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Auth state ──
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          name:  session.user.user_metadata?.name ?? "",
          email: session.user.email ?? "",
        });
      }
      setAuthLoading(false);
    });

    // Listen for login / logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            name:  session.user.user_metadata?.name ?? "",
            email: session.user.email ?? "",
          });
        } else {
          setUser(null);
          setCartCount(0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Cart count (only when logged in) ──
  useEffect(() => {
    if (!user) { setCartCount(0); return; }
    getCartCount().then(setCartCount);
  }, [user]);

  // Listen for cart updates fired from any page
  useEffect(() => {
    const handler = () => getCartCount().then(setCartCount);
    window.addEventListener("cart:updated", handler);
    return () => window.removeEventListener("cart:updated", handler);
  }, []);

  // ── Close account dropdown on outside click ──
  useEffect(() => {
    const handler = () => setAccountOpen(false);
    if (accountOpen) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [accountOpen]);

  const handleSignOut = async () => {
    setAccountOpen(false);
    await signOut();
    setUser(null);
    setCartCount(0);
    router.push("/");
    router.refresh();
  };

  const initials = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="w-full bg-black text-white text-center text-xs py-2 tracking-widest uppercase font-medium">
        Get 15% off on your first order
      </div>

      {/* ── Main Navbar ── */}
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold tracking-tight text-black uppercase">
                Velora
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative group"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors">
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`absolute top-full left-0 mt-2 w-44 bg-white border border-gray-100 rounded-md shadow-lg py-2 transition-all duration-200 ${
                        shopOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-black after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* ── Right Icons ── */}
            <div className="flex items-center gap-4">

              {/* Search */}
              <button
                aria-label="Search"
                className="hidden sm:flex p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Search size={19} />
              </button>

              {/* ── Account ── */}
              {authLoading ? (
                // Small pulse skeleton while checking session
                <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />

              ) : user ? (
                // ── LOGGED IN: avatar + dropdown ──
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-1.5 group"
                    aria-label="Account menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0f0a05] text-white text-xs font-bold flex items-center justify-center group-hover:bg-[#7a5c44] transition-colors">
                      {initials}
                    </div>
                    <ChevronDown
                      size={13}
                      className={`text-gray-400 transition-transform duration-200 hidden sm:block ${accountOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {accountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-[#0f0a05] truncate">
                          {user.name || "My Account"}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>

                      {/* Nav links */}
                      <div className="py-1">
                        {[
                          { label: "My Account",   href: "/account" },
                          { label: "My Orders",    href: "/account/orders" },
                          { label: "Edit Profile", href: "/account/profile" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setAccountOpen(false)}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Sign out */}
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              ) : (
                // ── LOGGED OUT: plain icon → login page ──
                <Link
                  href="/account/login"
                  aria-label="Sign in"
                  className="p-2 text-gray-600 hover:text-black transition-colors"
                >
                  <User size={19} />
                </Link>
              )}

              {/* Cart */}
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative p-2 text-gray-600 hover:text-black transition-colors"
              >
                <ShoppingCart size={19} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
          }`}
        >
          <nav className="px-4 py-4 flex flex-col gap-1 bg-white">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setShopOpen(!shopOpen)}
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-gray-700 border-b border-gray-50"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {shopOpen && (
                    <div className="pl-4 flex flex-col gap-1 mt-1 mb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="py-2 text-sm text-gray-500 hover:text-black transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-gray-700 hover:text-black border-b border-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Mobile auth section */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              {user ? (
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 px-1 mb-2">
                    Signed in as <strong className="text-gray-600">{user.name || user.email}</strong>
                  </p>
                  <Link href="/account"          onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-medium text-gray-700 hover:text-black transition-colors">My Account</Link>
                  <Link href="/account/orders"   onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-medium text-gray-700 hover:text-black transition-colors">My Orders</Link>
                  <Link href="/account/profile"  onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-medium text-gray-700 hover:text-black transition-colors">Edit Profile</Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 py-2.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/account/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 text-sm font-semibold border border-gray-200 rounded-full text-gray-700 hover:border-black hover:text-black transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/account/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 text-sm font-semibold bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Search */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm pr-10 focus:outline-none focus:border-black transition-colors"
              />
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}