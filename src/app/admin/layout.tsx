import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin-login");

  // Check role from JWT app_metadata — no DB query needed
  const role = user.app_metadata?.role;
  if (role !== "admin") redirect("/");

  const profile = {
    email:     user.email ?? "",
    full_name: user.user_metadata?.full_name ?? "",
    role:      "admin",
  };

  return <AdminShell user={profile}>{children}</AdminShell>;
}