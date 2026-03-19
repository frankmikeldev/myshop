"use server";

import { createClient } from "@/supabase/server";

export async function getCart() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      products (
        id,
        name,
        price,
        image_url
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (error) return { error: error.message };
  return data;
}

export async function getCartCount() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data, error } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("user_id", user.id);

  if (error) return 0;
  return data.reduce((sum, item) => sum + item.quantity, 0);
}

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Check if already in cart
  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    // Increase quantity
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id);

    if (error) return { error: error.message };
    return { success: true };
  }

  // Insert new
  const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    product_id: productId,
    quantity,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function updateCartQuantity(itemId: string, quantity: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function removeFromCart(itemId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}

export async function clearCart() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}