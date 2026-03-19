"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { createClient } from "@/supabase/client";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter",  test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number",            test: (p: string) => /[0-9]/.test(p) },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [checking, setChecking] = useState(true);

  // Supabase sends the user here with a session — verify it exists
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidSession(!!session);
      setChecking(false);
    });
  }, []);

  const passwordStrength = passwordRules.filter((r) => r.test(password)).length;
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-green-500"][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (passwordStrength < 2) {
      setError("Please choose a stronger password.");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/account/login"), 3000);
    }
  };

  // ── Checking session ──
  if (checking) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" />
      </div>
    );
  }

  // ── Invalid / expired link ──
  if (!validSession) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-6">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#0f0a05] mb-3">
            Link expired.
          </h2>
          <p className="text-[#5a4a3a] text-sm leading-relaxed mb-8">
            This password reset link has expired or is invalid. Reset links are only valid for 1 hour.
          </p>
          <Link
            href="/account/forgot-password"
            className="inline-flex items-center gap-2 bg-[#0f0a05] text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-[#7a5c44] transition-colors"
          >
            Request a new link
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Success state ──
  if (success) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-500" />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
            All done
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#0f0a05] mb-3">
            Password updated!
          </h2>
          <p className="text-[#5a4a3a] text-sm leading-relaxed mb-2">
            Your password has been successfully reset.
          </p>
          <p className="text-[#8a7060] text-sm mb-8">
            Redirecting you to sign in…
          </p>
          <Link
            href="/account/login"
            className="inline-flex items-center gap-2 bg-[#0f0a05] text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-[#7a5c44] transition-colors"
          >
            Sign In Now
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  // ── Reset form ──
  return (
    <div className="min-h-screen bg-[#faf8f5] flex">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f0a05] flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full border border-white/5 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full border border-white/5 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full border border-amber-400/10 -translate-x-1/3 translate-y-1/3" />

        <Link href="/" className="relative z-10">
          <span className="font-serif text-2xl font-bold text-white tracking-wide">
            VELORA
          </span>
        </Link>

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-6">
            Almost there
          </p>
          <h2 className="font-serif text-5xl font-bold text-white leading-tight mb-6">
            Choose a<br />
            password<br />
            <span className="italic text-amber-400">you'll love.</span>
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Pick something strong and memorable. You only need to do this once.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          {["Encrypted", "Secure", "Private"].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-white/40 text-xs font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">

        <Link href="/" className="lg:hidden mb-10 block">
          <span className="font-serif text-2xl font-bold text-[#0f0a05] tracking-wide">
            VELORA
          </span>
        </Link>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">
              New Password
            </p>
            <h1 className="font-serif text-4xl font-bold text-[#0f0a05] mb-2">
              Reset your<br />password.
            </h1>
            <p className="text-[#8a7060] text-sm">
              Enter a new password for your Velora account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Create a new password"
                  autoComplete="new-password"
                  autoFocus
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

              {/* Strength meter */}
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex gap-1.5 mb-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < passwordStrength ? strengthColor : "bg-[#e0d4c8]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    {passwordRules.map((rule) => (
                      <div key={rule.label} className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${rule.test(password) ? "bg-green-500" : "bg-[#e0d4c8]"}`}>
                          {rule.test(password) && <Check size={8} className="text-white" />}
                        </div>
                        <span className={`text-[10px] ${rule.test(password) ? "text-green-600" : "text-[#8a7060]"}`}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                  placeholder="Repeat your new password"
                  autoComplete="new-password"
                  className={`w-full border bg-white rounded-xl px-4 py-3.5 pr-12 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none transition-colors ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-300 focus:border-red-400"
                      : confirmPassword && password === confirmPassword
                      ? "border-green-300 focus:border-green-400"
                      : "border-[#e0d4c8] focus:border-[#0f0a05]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#0f0a05] transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {confirmPassword && password === confirmPassword && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <Check size={14} className="text-green-500" />
                  </div>
                )}
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
                  Updating…
                </>
              ) : (
                <>
                  Update Password
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}