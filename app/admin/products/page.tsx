'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Edit3, Save, X, Sparkles, Check } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export default function AdminProductsPage() {
  const { addToast } = useApp();
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: 7500,
    compareAtPrice: 9000,
    fragranceFamily: 'Woody Oriental',
    intensity: 'Extrait de Parfum',
    volume: '100ml',
    stock: 25,
    bottleColor: '#C6A15B',
    imageUrl: '/Perfume/Perfume Image/6983.jpg',
    description: '',
  });

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      addToast('Please enter a product name.', 'error');
      return;
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                price: Number(formData.price),
                compareAtPrice: Number(formData.compareAtPrice),
                fragranceFamily: formData.fragranceFamily,
                intensity: formData.intensity,
                volume: formData.volume,
                stock: Number(formData.stock),
                bottleColor: formData.bottleColor,
                description: formData.description,
              }
            : p
        )
      );
      addToast('Product updated successfully.', 'success');
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        price: Number(formData.price),
        compareAtPrice: Number(formData.compareAtPrice),
        brand: 'Aura Sovereign Haute Parfumerie',
        fragranceFamily: formData.fragranceFamily,
        intensity: formData.intensity,
        volume: formData.volume,
        stock: Number(formData.stock),
        bottleColor: formData.bottleColor,
        description: formData.description || 'Masterpiece formulation.',
        sku: `AS-${Date.now().toString().slice(-4)}`,
        status: 'ACTIVE',
        featured: false,
        is3DSupported: true,
        gender: 'Unisex',
        createdAt: new Date(),
        images: [
          {
            id: `img-${Date.now()}`,
            productId: `prod-${Date.now()}`,
            imageUrl: formData.imageUrl || '/Perfume/Perfume Image/6983.jpg',
            sortOrder: 0,
            isPrimary: true,
          },
        ],
      };
      setProducts([newProduct, ...products]);
      addToast('New product added to catalog.', 'success');
      setIsAdding(false);
    }

    // Reset form
    setFormData({
      name: '',
      slug: '',
      price: 7500,
      compareAtPrice: 9000,
      fragranceFamily: 'Woody Oriental',
      intensity: 'Extrait de Parfum',
      volume: '100ml',
      stock: 25,
      bottleColor: '#C6A15B',
      imageUrl: '/Perfume/Perfume Image/6983.jpg',
      description: '',
    });
  };

  const handleEditClick = (p: Product) => {
    setEditingId(p.id);
    setIsAdding(true);
    setFormData({
      name: p.name,
      slug: p.slug,
      price: p.price,
      compareAtPrice: p.compareAtPrice || 0,
      fragranceFamily: p.fragranceFamily,
      intensity: p.intensity,
      volume: p.volume,
      stock: p.stock,
      bottleColor: p.bottleColor,
      imageUrl: p.images[0]?.imageUrl || '',
      description: p.description,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this flacon from catalog?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast('Flacon removed from catalog.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Catalog Management
          </span>
          <h1 className="text-3xl font-serif font-light text-ivory-light">
            Flacons & Formulations ({products.length})
          </h1>
        </div>

        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
          }}
          className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-mono font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-1.5"
        >
          {isAdding ? <X size={14} /> : <Plus size={14} />}
          {isAdding ? 'Cancel' : 'Add Flacon'}
        </button>
      </div>

      {/* Add / Edit Form Modal/Drawer */}
      {isAdding && (
        <form
          onSubmit={handleSaveProduct}
          className="p-8 rounded-3xl bg-charcoal border border-gold/40 space-y-6 shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg text-ivory font-medium">
              {editingId ? 'Edit Flacon Details' : 'Formulate New Luxury Flacon'}
            </h3>
            <span className="text-xs font-mono text-gold flex items-center gap-1">
              <Sparkles size={13} /> 3D Viewport Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                Perfume Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Santal Impérial"
                className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                Fragrance Family *
              </label>
              <select
                value={formData.fragranceFamily}
                onChange={(e) => setFormData({ ...formData, fragranceFamily: e.target.value })}
                className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-mono"
              >
                <option value="Woody Oriental">Woody Oriental</option>
                <option value="Smoky Amber">Smoky Amber</option>
                <option value="Floral Amber">Floral Amber</option>
                <option value="Aquatic Woody">Aquatic Woody</option>
                <option value="Gourmand Amber">Gourmand Amber</option>
                <option value="Leathery Woods">Leathery Woods</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                3D Liquid & Bottle Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.bottleColor}
                  onChange={(e) => setFormData({ ...formData, bottleColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-obsidian border border-white/10"
                />
                <input
                  type="text"
                  value={formData.bottleColor}
                  onChange={(e) => setFormData({ ...formData, bottleColor: e.target.value })}
                  className="flex-1 bg-obsidian border border-white/10 rounded-xl px-4 py-2 text-xs text-gold font-mono uppercase"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                Compare At Price (₹)
              </label>
              <input
                type="number"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                Stock Reserve *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-smoke uppercase block">
                Volume / Size
              </label>
              <input
                type="text"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-smoke uppercase block">
              Image URL / Path
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-smoke uppercase block">
              Olfactory Narrative & Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-xs text-ivory focus:outline-none focus:border-gold resize-none font-sans"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-2"
          >
            <Save size={14} /> {editingId ? 'Save Modifications' : 'Publish to Catalog'}
          </button>
        </form>
      )}

      {/* Products Table */}
      <div className="rounded-3xl bg-charcoal/70 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-obsidian border-b border-white/10 text-smoke uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Visual</th>
                <th className="p-4">Fragrance Name</th>
                <th className="p-4">Family</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-obsidian border border-white/10">
                      <Image
                        src={product.images[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-serif text-sm font-medium text-ivory block">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-smoke font-mono">{product.sku}</span>
                  </td>
                  <td className="p-4 text-smoke">{product.fragranceFamily}</td>
                  <td className="p-4 font-semibold text-gold">{formatCurrency(product.price)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        product.stock > 10
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-1.5 text-smoke hover:text-gold transition-colors"
                      title="Edit Flacon"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-smoke hover:text-red-400 transition-colors"
                      title="Delete Flacon"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
