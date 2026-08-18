'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export const PerfumeShowroomHero = dynamic(() => import('./PerfumeShowroomHero'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-obsidian-400/20 rounded-2xl border border-white/5">
      <div className="w-10 h-10 rounded-full border-2 border-gold/40 border-t-gold animate-spin mb-3" />
      <p className="text-xs uppercase tracking-[0.25em] text-gold/70 font-mono">
        Initializing 3D Showroom...
      </p>
    </div>
  ),
});

export const FragrancePyramid3D = dynamic(() => import('./FragrancePyramid3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] flex items-center justify-center bg-obsidian-400/20 rounded-2xl border border-white/5">
      <div className="w-8 h-8 rounded-full border border-gold/40 border-t-gold animate-spin" />
    </div>
  ),
});

export const AlembicShowroom3D = dynamic(() => import('./AlembicShowroom3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[440px] flex flex-col items-center justify-center bg-obsidian-400/20 rounded-2xl border border-white/5">
      <div className="w-10 h-10 rounded-full border-2 border-gold/40 border-t-gold animate-spin mb-3" />
      <p className="text-xs uppercase tracking-[0.25em] text-gold/70 font-mono">
        Loading Alembic Extraction Atelier...
      </p>
    </div>
  ),
});
