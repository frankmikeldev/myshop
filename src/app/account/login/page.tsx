"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/actions/auth";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const result = await signIn({ email: form.email, password: form.password });
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push(redirect);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">

      {/* ── Left panel — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f0a05] flex-col justify-between p-12 relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Decorative rings */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border border-white/5 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full border border-white/5 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full border border-amber-400/10 -translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-serif text-2xl font-bold text-white tracking-wide">
            VELORA
          </span>
        </Link>

        {/* Middle quote */}
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-6">
            Welcome back
          </p>
          <h2 className="font-serif text-5xl font-bold text-white leading-tight mb-6">
            Style is a way<br />
            to say who you<br />
            <span className="italic text-amber-400">are without</span><br />
            speaking.
          </h2>
          <p className="text-white/30 text-sm">— Rachel Zoe</p>
        </div>

        {/* Bottom trust badges */}
        <div className="relative z-10 flex items-center gap-6">
          {["60+ Countries", "50k+ Customers", "Free Returns"].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-white/40 text-xs font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden mb-10 block">
          <span className="font-serif text-2xl font-bold text-[#0f0a05] tracking-wide">
            VELORA
          </span>
        </Link>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
              Sign In
            </p>
            <h1 className="font-serif text-4xl font-bold text-[#0f0a05] mb-2">
              Welcome back.
            </h1>
            <p className="text-[#8a7060] text-sm">
              Don't have an account?{" "}
              <Link
                href={`/account/signup${redirect !== "/account" ? `?redirect=${redirect}` : ""}`}
                className="text-[#0f0a05] font-semibold underline underline-offset-2 hover:text-[#7a5c44] transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
                className="w-full border border-[#e0d4c8] bg-white rounded-xl px-4 py-3.5 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold">
                  Password
                </label>
                <Link
                  href="/account/forgot-password"
                  className="text-xs text-[#8a7060] hover:text-[#0f0a05] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full border border-[#e0d4c8] bg-white rounded-xl px-4 py-3.5 pr-12 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#0f0a05] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 mt-2 ${
                loading
                  ? "bg-[#e0d4c8] text-[#8a7060] cursor-wait"
                  : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-[#e0d4c8]" />
            <span className="text-xs text-[#8a7060] font-medium">or continue with</span>
            <div className="flex-1 h-px bg-[#e0d4c8]" />
          </div>

          {/* Google OAuth placeholder */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-[#e0d4c8] bg-white rounded-full py-3.5 text-sm font-semibold text-[#0f0a05] hover:border-[#0f0a05] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-[#8a7060] text-center mt-8 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-[#0f0a05]">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-[#0f0a05]">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5]" />}>
      <LoginForm />
    </Suspense>
  );
}