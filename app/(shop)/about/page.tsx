'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Award, ShieldCheck, Droplets, Leaf, ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/animations/MagneticButton';

export default function AboutPage() {
  const processSteps = [
    {
      number: '01',
      title: 'Botanical Foraging & Rare Harvest',
      desc: 'We traverse the globe for elusive natural harvests — wild-foraged Cambodian oud, dawn-harvested Grasse damask rose petals, and organic Calabrian bergamot.',
    },
    {
      number: '02',
      title: 'Molecular Olfactory Architecture',
      desc: 'Master noses in Paris balance ethereal top notes with profound woody resins to construct a living sillage that shifts dynamically on skin.',
    },
    {
      number: '03',
      title: 'Cold Fractional Distillation',
      desc: 'Utilizing state-of-the-art fractional extraction to capture pure aromatic volatiles without thermal degradation or chemical adulterants.',
    },
    {
      number: '04',
      title: 'Dark Oak Maceration',
      desc: 'Every batch matures in controlled, darkened oak vats for up to six months, allowing the natural absolutes to harmonize into silk.',
    },
    {
      number: '05',
      title: 'Artisanal Hand-Bottling',
      desc: 'Each flacon is individually filled, inspected for crystal clarity, sealed with a magnetic brass collar, and packaged in velvet-lined boxes.',
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Haute Parfumerie Paris
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-ivory-light">
            The Philosophy of <br />
            <span className="italic font-serif text-gold">Eternal Sillage</span>
          </h1>
          <p className="text-smoke text-sm sm:text-base leading-relaxed">
            Founded with an uncompromising devotion to pure perfumery, Aura Sovereign crafts extraordinary extraits that transcend transient trends to become intimate legacies.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[450px] rounded-3xl overflow-hidden border border-white/10">
            <Image
              src="/Perfume/Perfume Image/production.jpg"
              alt="Haute perfumery laboratory"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-radial-glow opacity-25" />
          </div>

          <div className="space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-gold block">
              Pure Concentration
            </span>
            <h2 className="text-3xl font-serif font-light text-ivory-light">
              30% Extrait de Parfum
            </h2>
            <p className="text-xs sm:text-sm text-smoke leading-relaxed">
              While mass-market perfumes dilute their compositions to 8-15%, Aura Sovereign formulates exclusively at 30% pure perfume oil concentration.
            </p>
            <p className="text-xs sm:text-sm text-smoke leading-relaxed">
              This monumental concentration delivers an aura of quiet authority — projecting an intimate, warm sillage for over 16 continuous hours without synthetic harshness.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center font-mono">
              <div className="p-3 bg-charcoal rounded-xl border border-white/5">
                <span className="font-serif text-2xl text-gold font-bold block">30%</span>
                <span className="text-[10px] text-smoke uppercase">Pure Extrait</span>
              </div>
              <div className="p-3 bg-charcoal rounded-xl border border-white/5">
                <span className="font-serif text-2xl text-gold font-bold block">16h+</span>
                <span className="text-[10px] text-smoke uppercase">Longevity</span>
              </div>
              <div className="p-3 bg-charcoal rounded-xl border border-white/5">
                <span className="font-serif text-2xl text-gold font-bold block">100%</span>
                <span className="text-[10px] text-smoke uppercase">Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
              From Soil to Flacon
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-ivory-light">
              The 5 Acts of Creation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-charcoal/60 border border-white/10 space-y-3 relative group hover:border-gold/50 transition-colors"
              >
                <span className="font-serif text-3xl font-bold text-gold/40 group-hover:text-gold transition-colors block">
                  {step.number}
                </span>
                <h4 className="font-serif text-base font-medium text-ivory">{step.title}</h4>
                <p className="text-xs text-smoke leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-12 rounded-3xl bg-charcoal border border-gold/30 text-center space-y-6">
          <h3 className="font-serif text-3xl text-ivory">Ready to Find Your Signature?</h3>
          <p className="text-xs text-smoke max-w-md mx-auto">
            Experience our full sovereign collection delivered in bespoke insured packaging.
          </p>
          <Link href="/shop" className="inline-block">
            <MagneticButton className="px-8 py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all">
              Shop All Fragrances
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
