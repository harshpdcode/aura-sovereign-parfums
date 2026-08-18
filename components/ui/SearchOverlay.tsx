'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { INITIAL_PRODUCTS, FRAGRANCE_NOTES } from '@/lib/data/initialData';
import { formatCurrency } from '@/lib/utils';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useApp();
  const [query, setQuery] = useState('');

  const quickSearches = ['Santal', 'Oud Nocturne', 'Bergamot', 'Damask Rose', 'Extrait', 'Amber'];

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return INITIAL_PRODUCTS.filter((prod) => {
      const matchName = prod.name.toLowerCase().includes(q);
      const matchDesc = prod.description.toLowerCase().includes(q);
      const matchFamily = prod.fragranceFamily.toLowerCase().includes(q);
      const matchNotes = prod.notes?.some((n) => n.note.name.toLowerCase().includes(q));
      return matchName || matchDesc || matchFamily || matchNotes;
    });
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-2xl text-ivory flex flex-col p-6 md:p-12 overflow-y-auto"
        >
          {/* Header */}
          <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-8 border-b border-white/10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono flex items-center gap-2">
              <Sparkles size={13} />
              Search the Atelier
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-smoke hover:text-ivory hover:border-gold/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div className="max-w-4xl w-full mx-auto my-8">
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by fragrance, note, or olfactory family..."
                className="w-full bg-transparent border-b-2 border-gold/40 pb-4 pt-2 text-xl md:text-3xl font-serif text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold transition-colors pr-12"
              />
              <Search className="absolute right-2 top-4 text-gold/80" size={24} />
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
              <span className="text-smoke font-mono mr-2">Popular:</span>
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 rounded-full bg-charcoal border border-white/10 text-smoke hover:text-gold hover:border-gold/40 transition-colors font-mono"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="max-w-4xl w-full mx-auto flex-1">
            {query.trim() && (
              <div className="mb-4 text-xs font-mono text-smoke">
                Found {filteredResults.length} fragrance{filteredResults.length !== 1 ? 's' : ''} for "{query}"
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="group bg-charcoal/60 border border-white/5 hover:border-gold/40 p-4 rounded-xl flex gap-4 transition-all duration-300"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-obsidian flex-shrink-0">
                    <Image
                      src={product.images[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-gold tracking-widest block">
                        {product.fragranceFamily}
                      </span>
                      <h4 className="font-serif text-base font-medium text-ivory group-hover:text-gold transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-smoke line-clamp-1 mt-0.5">
                        {product.shortDescription || product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-xs">
                      <span className="font-mono text-ivory font-semibold">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-gold group-hover:translate-x-1 transition-transform flex items-center gap-1 font-mono text-[10px]">
                        Explore <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
