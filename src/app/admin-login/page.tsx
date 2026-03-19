import { adminLoginAction } from "./actions";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "invalid" ? "Invalid email or password." :
    error === "access"  ? "You do not have admin access." :
    error === "session" ? "Something went wrong. Try again." :
    null;

  return (
    <main className="min-h-screen bg-[#0f0a05] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-white tracking-wide">Velora</h1>
          <p className="text-white/30 text-xs uppercase tracking-[0.3em] mt-2">Admin Panel</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="font-serif text-xl font-bold text-white mb-1">Sign In</h2>
          <p className="text-white/40 text-sm mb-7">Enter your admin credentials to continue.</p>

          <form action={adminLoginAction} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="admin@velora.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {errorMessage && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-[#0f0a05] hover:bg-white/90 transition-all duration-200 mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Not an admin?{" "}
          <a href="/" className="text-white/40 hover:text-white/60 transition-colors">
            Go to store
          </a>
        </p>
      </div>
    </main>
  );
}