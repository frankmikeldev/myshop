import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // Sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  // Check admin role
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  // Debug — remove after testing
  console.log("USER ID:", user.id);
  console.log("USER EMAIL:", user.email);
  console.log("PROFILE:", profile);
  console.log("PROFILE ERROR:", profileError);

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return NextResponse.json({ 
      error: "You do not have admin access.",
      debug: { userId: user.id, email: user.email, profile, profileError: profileError?.message }
    }, { status: 403 });
  }

  return NextResponse.json({ success: true });
}