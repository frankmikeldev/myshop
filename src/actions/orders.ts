"use server";

import { createClient } from "@/supabase/server";

export async function getUserOrders() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      status,
      total,
      order_items (
        quantity
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return { error: error.message };
  return data;
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      status,
      total,
      shipping_address,
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          image_url
        )
      )
    `)
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) return { error: error.message };
  return data;
}

export async function createOrder(shippingAddress: Record<string, string>) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  // Get cart items
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      products (
        id,
        price
      )
    `)
    .eq("user_id", user.id);

  if (cartError) return { error: cartError.message };
  if (!cartItems || cartItems.length === 0) return { error: "Cart is empty" };

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const product = (Array.isArray(item.products) ? item.products[0] : item.products) as { price: number } | null;
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      status: "pending",
      total,
      shipping_address: shippingAddress,
    })
    .select()
    .single();

  if (orderError) return { error: orderError.message };

  // Create order items
  const orderItems = cartItems.map((item) => {
    const product = (Array.isArray(item.products) ? item.products[0] : item.products) as { id: string; price: number } | null;
    return {
      order_id: order.id,
      product_id: product?.id,
      quantity: item.quantity,
      price: product?.price ?? 0,
    };
  });

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) return { error: itemsError.message };

  // Clear cart
  await supabase.from("cart_items").delete().eq("user_id", user.id);

  return { success: true, orderId: order.id };
}

export async function cancelOrder(orderId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", orderId)
    .eq("user_id", user.id)
    .eq("status", "pending");

  if (error) return { error: error.message };
  return { success: true };
}