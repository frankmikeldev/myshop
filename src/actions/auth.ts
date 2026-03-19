"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

// ── Sign Up ──
export async function signUp(formData: {
  name: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { name: formData.name },
    },
  });

  if (error) return { error: error.message };

  // Insert into public users table
  if (data.user) {
    await supabase.from("users").insert({
      id: data.user.id,
      name: formData.name,
      email: formData.email,
    });
  }

  return { success: true };
}

// ── Sign In ──
export async function signIn(formData: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) return { error: error.message };

  return { success: true };
}

// ── Sign Out ──
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ── Get Current User ──
export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get full user profile from public table
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return data ?? null;
}

// ── Update Profile ──
export async function updateProfile(formData: {
  name: string;
  email: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("users")
    .update({ name: formData.name, email: formData.email })
    .eq("id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}