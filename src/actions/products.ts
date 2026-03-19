"use server";

import { createClient } from "@/supabase/server";
import type { Product } from "@/types/database";

// ── Get All Products (with category joined) ──
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProducts error:", error.message);
    return [];
  }

  return data ?? [];
}

// ── Get Products by Category Name ──
export async function getProductsByCategory(
  categoryName: string
): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories!inner(id, name)")
    .ilike("categories.name", categoryName)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProductsByCategory error:", error.message);
    return [];
  }

  return data ?? [];
}

// ── Get Products by Category ID ──
export async function getProductsByCategoryId(
  categoryId: string
): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name)")
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProductsByCategoryId error:", error.message);
    return [];
  }

  return data ?? [];
}

// ── Get Single Product by ID ──
export async function getProductById(
  productId: string
): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name)")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("getProductById error:", error.message);
    return null;
  }

  return data ?? null;
}

// ── Search Products ──
export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id, name)")
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    console.error("searchProducts error:", error.message);
    return [];
  }

  return data ?? [];
}

// ── Get All Categories ──
export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("getCategories error:", error.message);
    return [];
  }

  return data ?? [];
}