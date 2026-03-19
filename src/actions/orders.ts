"use server";

import { createClient } from "@/supabase/server";
import { clearCart, getCart } from "./cart";
import type { OrderWithItems } from "@/types/database";

// ── Create Order from Cart (Checkout) ──
export async function createOrder(shippingDetails: {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
}): Promise<{ orderId?: string; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Please sign in to place an order." };

  // 1. Get current cart
  const cartItems = await getCart();
  if (!cartItems || cartItems.length === 0) {
    return { error: "Your cart is empty." };
  }

  // 2. Calculate total
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.products?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  // 3. Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      total_price: totalPrice,
      status: "pending",
    })
    .select()
    .single();

  if (orderError || !order) {
    return { error: orderError?.message ?? "Failed to create order." };
  }

  // 4. Insert order items
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.products?.price ?? 0,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    // Rollback: delete the order if items failed
    await supabase.from("orders").delete().eq("id", order.id);
    return { error: itemsError.message };
  }

  // 5. Clear the cart
  await clearCart();

  return { orderId: order.id };
}

// ── Get All Orders for Current User ──
export async function getUserOrders(): Promise<OrderWithItems[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(id, name, image_url, price))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserOrders error:", error.message);
    return [];
  }

  return (data as OrderWithItems[]) ?? [];
}

// ── Get Single Order by ID ──
export async function getOrderById(
  orderId: string
): Promise<OrderWithItems | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(id, name, image_url, price))")
    .eq("id", orderId)
    .eq("user_id", user.id) // security: only own orders
    .single();

  if (error) {
    console.error("getOrderById error:", error.message);
    return null;
  }

  return (data as OrderWithItems) ?? null;
}

// ── Cancel Order ──
export async function cancelOrder(
  orderId: string
): Promise<{ success?: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Only allow cancelling pending orders
  const { data: order } = await supabase
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (!order) return { error: "Order not found." };
  if (order.status !== "pending") {
    return { error: "Only pending orders can be cancelled." };
  }

  const { error } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", orderId)
    .eq("user_id", user.id);

  if (error) return { error: error.message };
  return { success: true };
}