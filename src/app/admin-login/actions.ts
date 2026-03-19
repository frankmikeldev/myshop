"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function adminLoginAction(formData: FormData) {
  const email    = formData.get("email") as string;
  const password = formData.get("password") as string;

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

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    redirect("/admin-login?error=invalid");
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin-login?error=session");
  }

  // Check role from app_metadata (set via SQL)
  const role = user.app_metadata?.role;
  if (role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin-login?error=access");
  }

  redirect("/admin");
}