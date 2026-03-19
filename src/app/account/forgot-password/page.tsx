"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { createClient } from "@/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/account/reset-password`,
    });

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
    } else {
      setSent(true);
    }
  };

  // ── Success state ──
  if (sent) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-6">
            <Mail size={26} className="text-amber-500" />
          </div>

          <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
            Check your inbox
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#0f0a05] mb-4">
            Email sent.
          </h2>
          <p className="text-[#5a4a3a] text-sm leading-relaxed mb-2">
            We sent a password reset link to{" "}
            <strong className="text-[#0f0a05]">{email}</strong>.
          </p>
          <p className="text-[#8a7060] text-sm mb-8">
            Click the link in the email to reset your password. It expires in 1 hour.
          </p>

          {/* Resend */}
          <button
            onClick={() => setSent(false)}
            className="text-sm text-[#7a5c44] underline underline-offset-2 hover:text-[#0f0a05] transition-colors mb-6 block mx-auto"
          >
            Didn't receive it? Send again
          </button>

          <Link
            href="/account/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f0a05] hover:text-[#7a5c44] transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  // ── Form state ──
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full border border-amber-400/10 translate-x-1/3 -translate-y-1/3" />

        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-serif text-2xl font-bold text-white tracking-wide">
            VELORA
          </span>
        </Link>

        {/* Middle content */}
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-6">
            No worries
          </p>
          <h2 className="font-serif text-5xl font-bold text-white leading-tight mb-6">
            Happens to<br />
            the best<br />
            <span className="italic text-amber-400">of us.</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Enter your email and we'll send you a secure link to reset your password instantly.
          </p>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-6">
          {["Secure Reset", "1-Hour Link", "No Login Needed"].map((badge) => (
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

          {/* Back link */}
          <Link
            href="/account/login"
            className="inline-flex items-center gap-2 text-xs text-[#8a7060] hover:text-[#0f0a05] transition-colors mb-8 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </Link>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
              Reset Password
            </p>
            <h1 className="font-serif text-4xl font-bold text-[#0f0a05] mb-2">
              Forgot your<br />password?
            </h1>
            <p className="text-[#8a7060] text-sm leading-relaxed">
              No problem. Enter the email linked to your account and we'll send you a reset link.
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
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                className="w-full border border-[#e0d4c8] bg-white rounded-xl px-4 py-3.5 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 ${
                loading
                  ? "bg-[#e0d4c8] text-[#8a7060] cursor-wait"
                  : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-[#8a7060] text-center mt-8">
            Remember your password?{" "}
            <Link
              href="/account/login"
              className="text-[#0f0a05] font-semibold underline underline-offset-2 hover:text-[#7a5c44] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}