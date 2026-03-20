"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/actions/auth";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter",  test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number",            test: (p: string) => /[0-9]/.test(p) },
];

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const passwordStrength = passwordRules.filter((r) => r.test(form.password)).length;
  const strengthLabel = ["", "Weak", "Fair", "Strong"][passwordStrength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-green-500"][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields."); return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (passwordStrength < 2) {
      setError("Please choose a stronger password."); return;
    }
    setLoading(true);
    const result = await signUp({ name: form.name, email: form.email, password: form.password });
    setLoading(false);
    if (result?.error) { setError(result.error); } else { setSuccess(true); }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-500" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#0f0a05] mb-3">Account created!</h2>
          <p className="text-[#5a4a3a] text-sm leading-relaxed mb-2">
            We've sent a confirmation email to <strong>{form.email}</strong>.
          </p>
          <p className="text-[#8a7060] text-sm mb-8">Click the link in the email to verify your account, then sign in.</p>
          <Link href="/account/login" className="inline-flex items-center gap-2 bg-[#0f0a05] text-white font-bold text-sm px-8 py-4 rounded-full hover:bg-[#7a5c44] transition-colors group">
            Go to Sign In
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f0a05] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full border border-white/5 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full border border-amber-400/10 translate-x-1/3 -translate-y-1/3" />
        <Link href="/" className="relative z-10">
          <span className="font-serif text-2xl font-bold text-white tracking-wide">VELORA</span>
        </Link>
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-semibold mb-6">Join Velora</p>
          <h2 className="font-serif text-5xl font-bold text-white leading-tight mb-8">
            Fashion is the<br />armour to<br /><span className="italic text-amber-400">survive everyday</span><br />life.
          </h2>
          <p className="text-white/30 text-sm mb-10">— Bill Cunningham</p>
          <div className="space-y-4">
            {["Early access to new collections", "Free returns on every order", "Exclusive member-only discounts", "Order tracking & history"].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-amber-400" />
                </div>
                <span className="text-white/60 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/20 text-xs">Trusted by 50,000+ customers in 60+ countries.</p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 overflow-y-auto">
        <Link href="/" className="lg:hidden mb-10 block">
          <span className="font-serif text-2xl font-bold text-[#0f0a05] tracking-wide">VELORA</span>
        </Link>
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a7060] font-semibold mb-3">Create Account</p>
            <h1 className="font-serif text-4xl font-bold text-[#0f0a05] mb-2">Join Velora.</h1>
            <p className="text-[#8a7060] text-sm">
              Already have an account?{" "}
              <Link href={`/account/login${redirect !== "/" ? `?redirect=${redirect}` : ""}`}
                className="text-[#0f0a05] font-semibold underline underline-offset-2 hover:text-[#7a5c44] transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" autoComplete="name"
                className="w-full border border-[#e0d4c8] bg-white rounded-xl px-4 py-3.5 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors" />
            </div>
            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" autoComplete="email"
                className="w-full border border-[#e0d4c8] bg-white rounded-xl px-4 py-3.5 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors" />
            </div>
            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange}
                  placeholder="Create a password" autoComplete="new-password"
                  className="w-full border border-[#e0d4c8] bg-white rounded-xl px-4 py-3.5 pr-12 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none focus:border-[#0f0a05] transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#0f0a05] transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-3">
                  <div className="flex gap-1.5 mb-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? strengthColor : "bg-[#e0d4c8]"}`} />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      {passwordRules.map((rule) => (
                        <div key={rule.label} className="flex items-center gap-1.5">
                          <div className={`w-3 h-3 rounded-full flex items-center justify-center ${rule.test(form.password) ? "bg-green-500" : "bg-[#e0d4c8]"}`}>
                            {rule.test(form.password) && <Check size={8} className="text-white" />}
                          </div>
                          <span className={`text-[10px] ${rule.test(form.password) ? "text-green-600" : "text-[#8a7060]"}`}>{rule.label}</span>
                        </div>
                      ))}
                    </div>
                    {strengthLabel && (
                      <span className={`text-xs font-bold ${passwordStrength === 3 ? "text-green-600" : passwordStrength === 2 ? "text-amber-600" : "text-red-500"}`}>
                        {strengthLabel}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5a4a3a] font-bold mb-2">Confirm Password</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  placeholder="Repeat your password" autoComplete="new-password"
                  className={`w-full border bg-white rounded-xl px-4 py-3.5 pr-12 text-sm text-[#0f0a05] placeholder-[#c0b0a0] focus:outline-none transition-colors ${
                    form.confirmPassword && form.password !== form.confirmPassword ? "border-red-300 focus:border-red-400" :
                    form.confirmPassword && form.password === form.confirmPassword ? "border-green-300 focus:border-green-400" :
                    "border-[#e0d4c8] focus:border-[#0f0a05]"
                  }`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7060] hover:text-[#0f0a05] transition-colors">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {form.confirmPassword && form.password === form.confirmPassword && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2">
                    <Check size={14} className="text-green-500" />
                  </div>
                )}
              </div>
            </div>
            {/* Submit */}
            <button type="submit" disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 mt-2 ${
                loading ? "bg-[#e0d4c8] text-[#8a7060] cursor-wait" : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"
              }`}>
              {loading ? (
                <><div className="w-4 h-4 rounded-full border-2 border-[#8a7060] border-t-transparent animate-spin" />Creating account…</>
              ) : (
                <>Create Account<ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-[#e0d4c8]" />
            <span className="text-xs text-[#8a7060] font-medium">or sign up with</span>
            <div className="flex-1 h-px bg-[#e0d4c8]" />
          </div>

          <button type="button" className="w-full flex items-center justify-center gap-3 border border-[#e0d4c8] bg-white rounded-full py-3.5 text-sm font-semibold text-[#0f0a05] hover:border-[#0f0a05] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-[#8a7060] text-center mt-8 leading-relaxed">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-[#0f0a05]">Terms</Link>{" "}and{" "}
            <Link href="/privacy" className="underline hover:text-[#0f0a05]">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5]" />}>
      <SignUpForm />
    </Suspense>
  );
}