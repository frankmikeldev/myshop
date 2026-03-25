import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get current user from Supabase session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // ── Define routes ─────────────────────────────────────────
  const unprotectedAuthPaths = ["/account/login", "/account/signup"];
  const protectedPaths = ["/account", "/checkout", "/orders"];
  
  // Admin pages
  const adminPaths = ["/admin"];
  const adminLoginPath = "/admin-login";

  // ── Admin route protection ───────────────────────────────
  if (adminPaths.some((path) => pathname.startsWith(path)) && pathname !== adminLoginPath) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = adminLoginPath;
      return NextResponse.redirect(url);
    }

    // Check admin role
    const role = user.app_metadata?.role;
    if (role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return response;
  }

  // ── Protected user routes ────────────────────────────────
  const isProtected = protectedPaths.some(
    (path) => pathname.startsWith(path) && !unprotectedAuthPaths.includes(pathname)
  );

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/account/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Redirect logged-in users away from login/signup ──────
  const isAuthPage = unprotectedAuthPaths.includes(pathname);
  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  return response;
}

// ── Matcher ───────────────────────────────────────────────
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};