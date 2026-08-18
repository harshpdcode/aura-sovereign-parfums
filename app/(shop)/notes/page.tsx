'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Layers, Flame, Droplets, ArrowRight } from 'lucide-react';
import { FRAGRANCE_NOTES, INITIAL_PRODUCTS } from '@/lib/data/initialData';
import { FragranceNote } from '@/lib/types';
import ProductCard from '@/components/ui/ProductCard';

export default function NotesPyramidPage() {
  const [selectedTier, setSelectedTier] = useState<'ALL' | 'TOP' | 'HEART' | 'BASE'>('ALL');
  const [activeNote, setActiveNote] = useState<FragranceNote | null>(null);

  const filteredNotes = FRAGRANCE_NOTES.filter(
    (n) => selectedTier === 'ALL' || n.type === selectedTier
  );

  const matchedProducts = activeNote
    ? INITIAL_PRODUCTS.filter((p) => p.notes?.some((n) => n.note.name === activeNote.name))
    : [];

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Olfactory Architecture
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-ivory-light">
            The Notes Compendium
          </h1>
          <p className="text-smoke text-sm leading-relaxed">
            Every Aura Sovereign fragrance is an orchestration of rare botanicals, aged barks, and precious absolutes arranged across three harmonic tiers.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex justify-center gap-3">
          {(['ALL', 'TOP', 'HEART', 'BASE'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => {
                setSelectedTier(tier);
                setActiveNote(null);
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                selectedTier === tier
                  ? 'bg-gold text-obsidian font-bold shadow-lg shadow-gold/20'
                  : 'bg-charcoal border border-white/10 text-smoke hover:text-ivory hover:border-gold/40'
              }`}
            >
              {tier === 'ALL' ? 'All Notes' : `${tier} Notes`}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const isSelected = activeNote?.id === note.id;
            return (
              <div
                key={note.id}
                onClick={() => setActiveNote(isSelected ? null : note)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'border-gold bg-gold/10 shadow-2xl shadow-gold/10'
                    : 'border-white/10 bg-charcoal/60 hover:border-gold/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[9px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full border ${
                      note.type === 'TOP'
                        ? 'border-[#DFC38A]/40 text-[#DFC38A] bg-[#DFC38A]/10'
                        : note.type === 'HEART'
                        ? 'border-[#C6A15B]/40 text-[#C6A15B] bg-[#C6A15B]/10'
                        : 'border-[#8C6A3D]/40 text-[#8C6A3D] bg-[#8C6A3D]/10'
                    }`}
                  >
                    {note.type} NOTE
                  </span>
                  <span className="text-xs text-smoke font-mono">
                    {INITIAL_PRODUCTS.filter((p) => p.notes?.some((n) => n.note.name === note.name)).length} creations
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-ivory">{note.name}</h3>
                <p className="text-xs text-smoke mt-2 leading-relaxed">{note.description}</p>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gold">
                  <span>{isSelected ? 'Viewing Creations' : 'Explore Perfumes'}</span>
                  <ArrowRight size={12} className={isSelected ? 'rotate-90 transition-transform' : ''} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Note Perfumes Showcase */}
        {activeNote && (
          <div className="pt-12 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold">
                  Creations Featuring
                </span>
                <h2 className="font-serif text-3xl font-light text-ivory">
                  {activeNote.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveNote(null)}
                className="text-xs font-mono text-smoke hover:text-ivory"
              >
                Clear Selection
              </button>
            </div>

            {matchedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {matchedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-smoke font-mono">
                Currently formulating exclusive boutique reserves with this note.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
