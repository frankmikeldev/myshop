// ── Database Types (matching your Supabase schema) ──

export type User = {
  id: string;
  name: string | null;
  email: string;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  created_at: string;
  // joined
  categories?: Category | null;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  // joined
  products?: Product | null;
};

export type Order = {
  id: string;
  user_id: string | null;
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  // joined
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  // joined
  products?: Product | null;
};

// ── UI / Form Types ──

export type CartItemWithProduct = CartItem & {
  products: Product & { categories: Category | null };
};

export type OrderWithItems = Order & {
  order_items: (OrderItem & { products: Product | null })[];
};