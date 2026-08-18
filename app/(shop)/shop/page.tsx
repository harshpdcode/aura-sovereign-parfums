'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';

export default function ShopPage() {
  const [selectedFamily, setSelectedFamily] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceSort, setPriceSort] = useState<string>('DEFAULT');

  const families = ['ALL', 'Woody Oriental', 'Smoky Amber', 'Floral Amber', 'Aquatic Woody', 'Gourmand Amber', 'Leathery Woods'];

  const filteredProducts = useMemo(() => {
    let result = [...INITIAL_PRODUCTS];

    if (selectedFamily !== 'ALL') {
      result = result.filter((p) => p.fragranceFamily.toLowerCase().includes(selectedFamily.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.notes?.some((n) => n.note.name.toLowerCase().includes(q))
      );
    }

    if (priceSort === 'LOW_HIGH') {
      result.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'HIGH_LOW') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedFamily, searchQuery, priceSort]);

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Haute Parfumerie Catalog
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-ivory-light">
            The Sovereign Collection
          </h1>
          <p className="text-smoke text-sm leading-relaxed">
            Pure Extrait de Parfum compositions. Formulated with 30% concentration of rare natural essences, aged to harmonic perfection.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-charcoal/70 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
          {/* Family Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {families.map((family) => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 ${
                  selectedFamily === family
                    ? 'bg-gold text-obsidian font-bold shadow-md shadow-gold/20'
                    : 'bg-obsidian/60 text-smoke hover:text-ivory hover:border-gold/40 border border-white/5'
                }`}
              >
                {family === 'ALL' ? 'All Creations' : family}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full bg-obsidian border border-white/10 rounded-full px-4 py-1.5 text-xs text-ivory placeholder-smoke focus:outline-none focus:border-gold pr-8 font-sans"
              />
              <Search size={13} className="absolute right-3 top-2.5 text-smoke" />
            </div>

            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="bg-obsidian border border-white/10 rounded-full px-3 py-1.5 text-xs text-smoke font-mono focus:outline-none focus:border-gold"
            >
              <option value="DEFAULT">Featured</option>
              <option value="LOW_HIGH">Price: Low to High</option>
              <option value="HIGH_LOW">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-serif text-xl text-ivory">No olfactory creations match your criteria.</p>
            <button
              onClick={() => {
                setSelectedFamily('ALL');
                setSearchQuery('');
                setPriceSort('DEFAULT');
              }}
              className="px-6 py-2.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <RotateCcw size={13} /> Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
