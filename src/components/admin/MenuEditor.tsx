"use client";

import { useState } from "react";
import { addMenuItem, editMenuItem, deleteMenuItem } from "@/actions/menu";
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  prices: any;
  image: string;
  description: string | null;
};

export default function MenuEditor({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Chicken Starters");
  const [prices, setPrices] = useState('{"Regular": 240}');
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const openModal = (item?: MenuItem) => {
    setError("");
    if (item) {
      setEditingItem(item);
      setName(item.name);
      setCategory(item.category);
      setPrices(JSON.stringify(item.prices, null, 2));
      setDescription(item.description || "");
      setFile(null);
    } else {
      setEditingItem(null);
      setName("");
      setCategory("Chicken Starters");
      setPrices('{"Regular": 240}');
      setDescription("");
      setFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("prices", prices);
    if (description) formData.append("description", description);

    try {
      if (editingItem) {
        formData.append("id", editingItem.id);
        formData.append("existingImageUrl", editingItem.image);
        if (file) formData.append("image", file);
        
        const res = await editMenuItem(formData);
        if (res.error) throw new Error(res.error);
        
        // Update local state optimistically
        setItems(items.map(i => i.id === editingItem.id ? {
          ...i,
          name, category, prices: JSON.parse(prices), description,
          image: file ? URL.createObjectURL(file) : i.image
        } : i));

      } else {
        if (!file) throw new Error("An image is required for new items");
        formData.append("image", file);
        
        const res = await addMenuItem(formData);
        if (res.error) throw new Error(res.error);
        
        // Update local state optimistically
        setItems([{
          id: res.id,
          name, category, prices: JSON.parse(prices), description,
          image: URL.createObjectURL(file)
        }, ...items]);
      }
      
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    setLoading(true);
    const res = await deleteMenuItem(id);
    if (res.error) {
      alert("Error: " + res.error);
    } else {
      setItems(items.filter(i => i.id !== id));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-serif text-[#DFB15B]">Menu Items</h2>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#DFB15B] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#c99a4c] transition-colors"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111113]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1a1a1d] text-neutral-400">
            <tr>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Prices</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                <td className="px-4 py-3 text-neutral-400">{item.category}</td>
                <td className="px-4 py-3 text-neutral-400">
                  <pre className="text-xs bg-black/50 p-2 rounded">{JSON.stringify(item.prices)}</pre>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal(item)} className="p-2 text-neutral-400 hover:text-white bg-white/5 rounded">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-neutral-400 hover:text-red-400 bg-white/5 rounded">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-neutral-500">
                  No menu items found. Please run the migration script.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-serif text-[#DFB15B] text-lg">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h3>
              <button onClick={closeModal} className="text-neutral-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Name</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#DFB15B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Category</label>
                <select 
                  value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#DFB15B]"
                >
                  <option>Chicken Starters</option>
                  <option>Chicken Mandi</option>
                  <option>Mutton Mandi</option>
                  <option>Seafood Mandi</option>
                  <option>Veg & Egg</option>
                  <option>Specials</option>
                  <option>Desserts</option>
                  <option>Beverages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Prices (JSON format)</label>
                <textarea 
                  required value={prices} onChange={e => setPrices(e.target.value)} rows={3}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-[#DFB15B]"
                  placeholder='{"Regular": 240}'
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">Image {editingItem && "(Leave blank to keep existing)"}</label>
                <input 
                  type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#DFB15B] file:text-black hover:file:bg-[#c99a4c]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" onClick={closeModal}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#DFB15B] hover:bg-[#c99a4c] text-black py-2 rounded-lg font-bold transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
