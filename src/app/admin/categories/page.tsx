"use client";

import { useState, useEffect } from "react";
import { getAdminCategories, createCategory, deleteCategory } from "@/actions/admin";
import { Plus, Trash2, X } from "lucide-react";

type Category = { id: string; name: string; products: { count: number }[] };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [newName, setNewName]       = useState("");
  const [saving, setSaving]         = useState(false);
  const [deleting, setDeleting]     = useState<string | null>(null);
  const [error, setError]           = useState("");

  const fetchCats = () => {
    getAdminCategories().then((data) => {
      if (Array.isArray(data)) setCategories(data as Category[]);
      setLoading(false);
    });
  };

  useEffect(() => { fetchCats(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) { setError("Category name is required."); return; }
    setSaving(true);
    const result = await createCategory(newName.trim());
    setSaving(false);
    if (result && "error" in result) { setError(result.error as string); return; }
    setNewName("");
    setShowForm(false);
    fetchCats();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? Products in it won't be deleted.")) return;
    setDeleting(id);
    await deleteCategory(id);
    setDeleting(null);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <div className="px-8 py-5 bg-white border-b border-[#ede8e0] flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#0f0a05]">Categories</h1>
          <p className="text-sm text-[#8a7060] mt-0.5">{categories.length} active categories</p>
        </div>
        <button onClick={() => { setShowForm(true); setError(""); setNewName(""); }}
          className="flex items-center gap-2 px-5 py-2 bg-[#0f0a05] text-white text-sm font-bold rounded-full hover:bg-[#7a5c44] transition-colors">
          <Plus size={14} /> Add Category
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {/* Add form modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold text-[#0f0a05]">Add Category</h2>
                <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-[#0f0a05] hover:text-white transition-colors">
                  <X size={15} />
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5a4a3a] uppercase tracking-wider mb-1.5">Category Name *</label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus
                    className="w-full px-4 py-3 rounded-xl border border-[#e0d4c8] bg-[#faf8f5] text-sm text-[#0f0a05] focus:outline-none focus:border-[#0f0a05]"
                    placeholder="e.g. Summer Collection" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={saving}
                  className={`w-full py-3 font-bold text-sm rounded-full transition-colors ${saving ? "bg-[#8a7060] text-white cursor-wait" : "bg-[#0f0a05] text-white hover:bg-[#7a5c44]"}`}>
                  {saving ? "Saving…" : "Create Category"}
                </button>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-[#0f0a05] border-t-transparent animate-spin" /></div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#ede8e0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ede8e0] bg-[#faf8f5]">
                  {["Category Name", "Products", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#8a7060]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => {
                  const count = c.products?.[0]?.count ?? 0;
                  return (
                    <tr key={c.id} className="border-b border-[#f5f0eb] hover:bg-[#faf8f5] transition-colors">
                      <td className="px-5 py-3 text-sm font-semibold text-[#0f0a05]">{c.name}</td>
                      <td className="px-5 py-3 text-sm text-[#8a7060]">{count} product{count !== 1 ? "s" : ""}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => handleDelete(c.id)} disabled={deleting === c.id}
                          className="w-8 h-8 rounded-full bg-[#f0ebe3] flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-[#5a4a3a] disabled:opacity-50">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {categories.length === 0 && <div className="text-center py-16 text-[#8a7060]">No categories found.</div>}
          </div>
        )}
      </div>
    </>
  );
}