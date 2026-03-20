"use client";

import { useState, useEffect } from "react";
import { getAdminUsers, updateUserRole } from "@/actions/admin";

type User = { id: string; email: string; full_name: string | null; role: string; created_at: string };

export default function AdminUsersPage() {
  const [users, setUsers]     = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch]   = useState("");

  const fetchUsers = () => {
    getAdminUsers().then((data) => {
      if (Array.isArray(data)) setUsers(data as unknown as User[]);
      setLoading(false);
    });
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "customer" : "admin";
    if (!confirm(`Change role to ${newRole}?`)) return;
    setUpdating(userId);
    await updateUserRole(userId, newRole);
    setUpdating(null);
    fetchUsers();
  };

  const filtered = users.filter((u) =>
    (u.email + (u.full_name ?? "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="px-8 py-5 bg-white border-b border-[#ede8e0] shrink-0">
        <h1 className="font-serif text-2xl font-bold text-[#0f0a05]">Users</h1>
        <p className="text-sm text-[#8a7060] mt-0.5">{users.length} registered users</p>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-5">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-4 py-2 text-sm border border-[#e0d4c8] rounded-full bg-white text-[#0f0a05] focus:outline-none focus:border-[#0f0a05]"
            placeholder="Search users…" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" /></div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ede8e0] bg-[#faf8f5]">
                  {["User", "Email", "Role", "Joined", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#8a7060]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-[#f5f0eb] hover:bg-[#faf8f5] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center text-xs font-bold text-[#5a4a3a] shrink-0">
                          {(u.full_name ?? u.email).slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-semibold text-[#0f0a05]">{u.full_name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#5a4a3a]">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        u.role === "admin"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-[#f0ebe3] text-[#5a4a3a] border-[#e0d4c8]"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#8a7060]">
                      {new Date(u.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleRoleToggle(u.id, u.role)}
                        disabled={updating === u.id}
                        className="text-xs font-semibold text-[#7a5c44] border border-[#e0d4c8] px-3 py-1 rounded-full hover:border-[#7a5c44] transition-colors disabled:opacity-50"
                      >
                        {updating === u.id ? "…" : u.role === "admin" ? "Remove Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="text-center py-16 text-[#8a7060]">No users found.</div>}
          </div>
        )}
      </div>
    </>
  );
}