'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import { formatCurrency } from '@/lib/utils';
import MagneticButton from '@/components/animations/MagneticButton';

export default function ScentFinderModal() {
  const { isScentFinderOpen, setIsScentFinderOpen, addToCart } = useApp();
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const moods = [
    { id: 'mysterious', title: 'Mysterious & Nocturne', desc: 'Deep, magnetic, smoky aura' },
    { id: 'royal', title: 'Opulent & Royal', desc: 'Precious woods, golden amber, sovereign presence' },
    { id: 'fresh', title: 'Crystalline & Oceanic', desc: 'Mediterranean marine breeze, radiant citrus' },
    { id: 'sensual', title: 'Sensual & Cashmere', desc: 'Velvet rose petals, bourbon vanilla, intimate musk' },
  ];

  const vibes = [
    { id: 'woody', title: 'Aged Oud & Sandalwood' },
    { id: 'floral', title: 'Dew-Kissed Damask Rose' },
    { id: 'citrus', title: 'Calabrian Bergamot & Sea Salt' },
    { id: 'spicy', title: 'Cinnamon Bark & Benzoin Amber' },
  ];

  const occasions = [
    { id: 'evening', title: 'Intimate Evenings & Black-Tie Galas' },
    { id: 'signature', title: 'Daily Signature of Distinction' },
    { id: 'voyage', title: 'Sun-Drenched Coastal Escapes' },
  ];

  // Match algorithm based on selections
  const getMatchedProduct = () => {
    if (selectedMood === 'mysterious' || selectedVibe === 'woody') {
      return INITIAL_PRODUCTS.find((p) => p.slug === 'oud-nocturne') || INITIAL_PRODUCTS[0];
    }
    if (selectedMood === 'sensual' || selectedVibe === 'floral') {
      return INITIAL_PRODUCTS.find((p) => p.slug === 'rose-etheree') || INITIAL_PRODUCTS[2];
    }
    if (selectedMood === 'fresh' || selectedVibe === 'citrus') {
      return INITIAL_PRODUCTS.find((p) => p.slug === 'bleu-celeste') || INITIAL_PRODUCTS[3];
    }
    return INITIAL_PRODUCTS.find((p) => p.slug === 'santal-imperial') || INITIAL_PRODUCTS[0];
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood(null);
    setSelectedVibe(null);
    setSelectedOccasion(null);
  };

  const matchedProduct = getMatchedProduct();

  return (
    <AnimatePresence>
      {isScentFinderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsScentFinderOpen(false)}
            className="absolute inset-0 bg-obsidian/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-charcoal border border-gold/30 rounded-3xl p-6 md:p-10 shadow-2xl text-ivory overflow-hidden z-10"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial-glow opacity-30 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-mono font-semibold">
                  AI Olfactory Matchmaker
                </span>
              </div>
              <button
                onClick={() => setIsScentFinderOpen(false)}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-smoke hover:text-ivory hover:border-gold/50 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step 1: Mood */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-6 space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-smoke">
                    Question 1 of 3
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory-light mt-1">
                    What statement do you wish your presence to make?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedMood(m.id);
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        selectedMood === m.id
                          ? 'border-gold bg-gold/10'
                          : 'border-white/10 bg-obsidian/60 hover:border-gold/40'
                      }`}
                    >
                      <h4 className="font-serif text-base text-ivory font-medium">{m.title}</h4>
                      <p className="text-xs text-smoke mt-1">{m.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Preferred Notes / Vibe */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-6 space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-smoke">
                    Question 2 of 3
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory-light mt-1">
                    Which rare essences resonate with your senses?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vibes.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVibe(v.id);
                        setStep(3);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        selectedVibe === v.id
                          ? 'border-gold bg-gold/10'
                          : 'border-white/10 bg-obsidian/60 hover:border-gold/40'
                      }`}
                    >
                      <h4 className="font-serif text-base text-ivory font-medium">{v.title}</h4>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Occasion */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-6 space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-smoke">
                    Question 3 of 3
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory-light mt-1">
                    When is your signature perfume revealed?
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {occasions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => {
                        setSelectedOccasion(o.id);
                        setStep(4);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                        selectedOccasion === o.id
                          ? 'border-gold bg-gold/10'
                          : 'border-white/10 bg-obsidian/60 hover:border-gold/40'
                      }`}
                    >
                      <h4 className="font-serif text-base text-ivory font-medium">{o.title}</h4>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Result / Match */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 space-y-6"
              >
                <div className="text-center space-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-mono uppercase tracking-widest">
                    99.4% Match Affinity
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-ivory font-medium">
                    Your Bespoke Signature
                  </h3>
                </div>

                <div className="bg-obsidian/80 border border-gold/40 rounded-2xl p-5 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative w-28 h-36 rounded-xl overflow-hidden bg-charcoal flex-shrink-0">
                    <Image
                      src={matchedProduct.images[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                      alt={matchedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold">
                      {matchedProduct.fragranceFamily} • {matchedProduct.intensity}
                    </span>
                    <h4 className="font-serif text-2xl font-semibold text-ivory">
                      {matchedProduct.name}
                    </h4>
                    <p className="text-xs text-smoke leading-relaxed">
                      {matchedProduct.description}
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-serif text-xl text-gold font-bold">
                        {formatCurrency(matchedProduct.price)}
                      </span>
                      <div className="flex gap-2">
                        <MagneticButton
                          onClick={() => {
                            addToCart(matchedProduct);
                            setIsScentFinderOpen(false);
                          }}
                          className="px-4 py-2 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-gold-light"
                        >
                          <ShoppingBag size={13} /> Add to Bag
                        </MagneticButton>
                        <Link
                          href={`/product/${matchedProduct.slug}`}
                          onClick={() => setIsScentFinderOpen(false)}
                          className="px-4 py-2 rounded-full border border-white/20 text-ivory hover:border-gold font-mono text-xs uppercase"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleReset}
                    className="text-xs text-smoke hover:text-gold flex items-center gap-1 font-mono transition-colors"
                  >
                    <RotateCcw size={12} /> Retake Matchmaker Questionnaire
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
