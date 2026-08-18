'use client';

import React from 'react';
import ScentFinderModal from '@/components/ui/ScentFinderModal';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';
import { Compass, Sparkles } from 'lucide-react';

export default function ScentFinderPage() {
  const { setIsScentFinderOpen } = useApp();

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-mono tracking-widest uppercase">
          <Sparkles size={14} />
          <span>Interactive Bespoke Matchmaker</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-light text-ivory-light leading-tight">
          Discover Your Bespoke <br />
          <span className="italic text-gold font-serif">Olfactory Signature</span>
        </h1>

        <p className="text-smoke text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Finding a fragrance is an intimate journey of self-expression. Our interactive AI questionnaire decodes your mood, personal aura, and desired sillage to recommend the perfect Aura Sovereign extrait.
        </p>

        <div className="pt-4">
          <MagneticButton
            onClick={() => setIsScentFinderOpen(true)}
            className="px-8 py-4 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30 flex items-center gap-2 mx-auto"
          >
            <Compass size={16} />
            Begin Scent Questionnaire
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
