"use server";

import { createClient } from "@/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") return { error: "Unauthorized" };
  return { supabase, user };
}

// ── Dashboard Stats ──
export async function getAdminStats() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const [ordersRes, usersRes, revenueRes, pendingRes] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact" }),
    supabase.from("users").select("id", { count: "exact" }),
    supabase.from("orders").select("total").neq("status", "cancelled"),
    supabase.from("orders").select("id", { count: "exact" }).eq("status", "pending"),
  ]);

  const revenue = (revenueRes.data ?? []).reduce((s, o) => s + Number(o.total), 0);

  return {
    orders:   ordersRes.count ?? 0,
    users:    usersRes.count ?? 0,
    revenue,
    pending:  pendingRes.count ?? 0,
  };
}

// ── Recent Orders for Dashboard ──
export async function getRecentOrders() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("orders")
    .select(`id, created_at, status, total, users(email)`)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) return { error: error.message };
  return data;
}

// ── All Orders ──
export async function getAllOrders(status?: string) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  let query = supabase
    .from("orders")
    .select(`id, created_at, status, total, shipping_address, users(email), order_items(quantity)`)
    .order("created_at", { ascending: false });

  if (status && status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return { error: error.message };
  return data;
}

// ── Update Order Status ──
export async function updateOrderStatus(orderId: string, status: string) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) return { error: error.message };
  return { success: true };
}

// ── All Products ──
export async function getAdminProducts() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("products")
    .select(`id, name, price, image_url, categories(name)`)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };
  return data;
}

// ── Create Product ──
export async function createProduct(payload: {
  name: string; price: number; description?: string;
  image_url?: string; category_id: string;
}) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, product: data };
}

// ── Update Product ──
export async function updateProduct(id: string, payload: {
  name?: string; price?: number; description?: string;
  image_url?: string; category_id?: string;
}) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);

  if (error) return { error: error.message };
  return { success: true };
}

// ── Delete Product ──
export async function deleteProduct(id: string) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  return { success: true };
}

// ── All Users ──
export async function getAdminUsers() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("users")
    .select(`id, email, full_name, role, created_at`)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };
  return data;
}

// ── Update User Role ──
export async function updateUserRole(userId: string, role: string) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", userId);

  if (error) return { error: error.message };
  return { success: true };
}

// ── All Categories ──
export async function getAdminCategories() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("categories")
    .select(`id, name, products(count)`)
    .order("name");

  if (error) return { error: error.message };
  return data;
}

// ── Create Category ──
export async function createCategory(name: string) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { data, error } = await supabase
    .from("categories")
    .insert({ name })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, category: data };
}

// ── Delete Category ──
export async function deleteCategory(id: string) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth;
  const { supabase } = auth;

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { error: error.message };
  return { success: true };
}