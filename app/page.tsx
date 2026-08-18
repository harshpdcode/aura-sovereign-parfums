'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Award,
  ShieldCheck,
  Sparkles,
  Droplets,
  Thermometer,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  ShoppingBag,
  Sliders,
  RotateCw,
  Zap,
  Flame,
  Wind
} from 'lucide-react';
import { PerfumeShowroomHero, AlembicShowroom3D } from '@/components/3d/SceneContainer';
import ProductCard from '@/components/ui/ProductCard';
import MagneticButton from '@/components/animations/MagneticButton';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const { user, addToCart, setIsScentFinderOpen } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Tracking for Smooth Scroll Effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.8]);

  // 1. Preloader State (Matching video intro 00:01)
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  // 2. Active Featured Flacon for Hero
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  // 3. Features Display Timecode Navigation (Matching video 00:09)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(2);

  // 4. Interactive Product Detail Angle Inspector (Matching video 00:13)
  const [activeDetailImage, setActiveDetailImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | '200ml'>('100ml');
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>('overview');

  // 5. 3D Alembic Extraction Node Selection
  const [selectedAlembicNode, setSelectedAlembicNode] = useState<'TOP' | 'HEART' | 'BASE'>('TOP');
  const [evolutionHour, setEvolutionHour] = useState(1);

  const heroBottles = [
    {
      name: 'Santal Impérial',
      color: '#C6A15B',
      liquidColor: '#DFC38A',
      subtitle: 'Vintage Mysore Sandalwood & Golden Amber',
      slug: 'santal-imperial',
      batch: 'BATCH N° 1888-A',
      origin: 'Grasse, France',
      concentration: '30% Extrait de Parfum',
      maceration: '180 Days in Oak',
    },
    {
      name: 'Oud Nocturne',
      color: '#181716',
      liquidColor: '#3A2E20',
      subtitle: '25-Year Aged Cambodian Agarwood & Smoked Tobacco',
      slug: 'oud-nocturne',
      batch: 'BATCH N° 1888-B',
      origin: 'Koh Kong, Cambodia',
      concentration: '32% Pure Parfum',
      maceration: '240 Days in Oak',
    },
    {
      name: 'Rose Éthérée',
      color: '#E29578',
      liquidColor: '#EBB4A0',
      subtitle: 'Dawn-Harvested Grasse Centifolia Rose & White Musk',
      slug: 'rose-etheree',
      batch: 'BATCH N° 1888-C',
      origin: 'Grasse, France',
      concentration: '28% Extrait de Parfum',
      maceration: '120 Days in Oak',
    },
    {
      name: 'Bleu Céleste',
      color: '#2B6CB0',
      liquidColor: '#4299E1',
      subtitle: 'Mediterranean Marine Accord & Cold Bergamot Zest',
      slug: 'bleu-celeste',
      batch: 'BATCH N° 1888-D',
      origin: 'Reggio Calabria, Italy',
      concentration: '26% Eau de Parfum Intense',
      maceration: '90 Days in Oak',
    },
  ];

  const currentHeroBottle = heroBottles[activeHeroIndex];

  // Timecoded Feature Steps (Matching video 00:09 - 00:12)
  const featureSteps = [
    {
      code: '( 00.01 )',
      name: 'Latest Harvest',
      title: 'Fractional Cold Distillation',
      description: 'Slow extraction of botanical volatiles without thermal degradation, preserving delicate top notes.',
      metric1: 'Harvest Date',
      value1: '14/10/2025',
      metric2: 'Freshness Index',
      value2: '99.8%',
    },
    {
      code: '( 00.02 )',
      name: 'Botanical Purity',
      title: 'Solvent-Free Extractions',
      description: 'Certified pure botanical resin without artificial stabilizers or synthetic dilution.',
      metric1: 'Botanical Grade',
      value1: 'A++ Organic',
      metric2: 'Clarity Rating',
      value2: '100% Pure',
    },
    {
      code: '( 00.03 )',
      name: 'Temperature Ageing',
      title: 'Smart Temperature Control Ageing',
      description: 'The flacon reflects the ambient body temperature directly on your pulse, releasing layered notes dynamically as skin warms.',
      metric1: 'Current Ambient',
      value1: '19°C',
      metric2: 'Macerated at',
      value2: '18°C Oak',
    },
    {
      code: '( 00.04 )',
      name: 'Extrait Purity',
      title: '30% Pure Perfume Concentration',
      description: 'Engineered at highest Extrait de Parfum density for an intimate projection that clings for 16+ hours.',
      metric1: 'Concentration',
      value1: '30% Pure Oil',
      metric2: 'Skin Sillage',
      value2: '16h+ Enduring',
    },
    {
      code: '( 00.05 )',
      name: 'Maceration Cycle',
      title: '180-Day Oak Barrel Maceration',
      description: 'Aged in Limousin French oak casks to harmonize volatile essential oils and deep resinous molecules.',
      metric1: 'Cask Aging',
      value1: '180 Days',
      metric2: 'Oak Barrel Type',
      value2: 'Limousin Oak',
    },
    {
      code: '( 00.06 )',
      name: 'Flacon Sealing',
      title: 'Magnetic Crystalline Cap Sealing',
      description: 'Heavy French crystal flacon capped with solid brass magnetic lock preventing air evaporation.',
      metric1: 'Aura Seal',
      value1: 'Airtight Vacuum',
      metric2: 'Glass Weight',
      value2: '380g Crystal',
    },
    {
      code: '( 00.07 )',
      name: 'Batch Origin',
      title: 'Certificate of Authenticity',
      description: 'Individual hand-numbered certificates matching serial engraving on the flacon base plate.',
      metric1: 'Verification',
      value1: 'Numbered Flacon',
      metric2: 'Origin Proof',
      value2: 'Grasse Certified',
    },
    {
      code: '( 00.08 )',
      name: 'Concierge Care',
      title: 'Insured Cold-Chain Delivery',
      description: 'Shipped in custom shock-absorbing insulated luxury gift boxes to preserve delicate fragrance molecules.',
      metric1: 'Logistics',
      value1: 'Insured White-Glove',
      metric2: 'Packaging',
      value2: 'Custom Silk Box',
    },
  ];

  // Preloader Simulation (0% -> 100%)
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsPreloaderDone(true), 350);
          return 100;
        }
        return prev + 5;
      });
    }, 35);
    return () => clearInterval(timer);
  }, []);

  const showcaseProduct = INITIAL_PRODUCTS[0];
  const detailImages = [
    '/Perfume/generated/hero_santal.jpg',
    '/Perfume/generated/atelier_craft.jpg',
    '/Perfume/generated/oud_nocturne.jpg',
  ];

  const pricesBySize: Record<string, number> = {
    '50ml': 5200,
    '100ml': 8500,
    '200ml': 14500,
  };

  // Evolution Data for 3D Alembic Extraction
  const getAlembicNodeData = () => {
    switch (selectedAlembicNode) {
      case 'TOP':
        return {
          title: 'Top Node • Volatile Prelude',
          sub: '0 – 30 Minutes Diffusion',
          desc: 'High kinetic volatility. Cold-pressed Calabrian bergamot, green cardamom, and pink pepper berries create an instantaneous, sparkling opening aura.',
          density: '15% Molecular Fraction',
          temp: '32°C Skin Diffusion',
        };
      case 'HEART':
        return {
          title: 'Heart Node • The Floral Soul',
          sub: '30 Minutes – 5 Hours Evolution',
          desc: 'Medium molecular weight. Rare Grasse Centifolia rose petals, night-blooming sambac jasmine, and noble Florentine orris root harmonize with natural body heat.',
          density: '35% Molecular Fraction',
          temp: '36.5°C Body Temperature',
        };
      case 'BASE':
        return {
          title: 'Base Node • Resinous Woods & Sillage',
          sub: '5 – 16+ Hours Enduring Aura',
          desc: 'Heavy diterpenic fixatives. Vintage Mysore sandalwood, aged Cambodian agarwood (Oud), and golden Siam benzoin anchor the scent permanently into memory.',
          density: '50% Molecular Fraction',
          temp: 'Drydown Longevity',
        };
    }
  };

  const alembicData = getAlembicNodeData();

  return (
    <div ref={containerRef} className="w-full bg-obsidian text-ivory overflow-x-hidden selection:bg-gold selection:text-obsidian">
      {/* =========================================================================
          00: PRELOADER / SYSTEM INITIALIZATION SPLASH (Matching Video 00:01)
      ========================================================================= */}
      <AnimatePresence>
        {!isPreloaderDone && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999999] bg-ivory text-obsidian flex flex-col items-center justify-between p-12 select-none"
          >
            <div className="text-center space-y-1">
              <h2 className="font-serif text-2xl tracking-[0.3em] font-medium text-obsidian">
                AURA SOVEREIGN
              </h2>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-smoke-dark">
                [ olfactory system initialization ]
              </p>
            </div>

            {/* Center Rotating Star with Live Progress (Matching Video) */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center text-obsidian"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-obsidian">
                    <path d="M50 0 L58 35 L93 25 L68 50 L93 75 L58 65 L50 100 L42 65 L7 75 L32 50 L7 25 L42 35 Z" />
                  </svg>
                </motion.div>
                <span className="relative z-10 font-mono text-sm font-bold text-ivory tracking-widest">
                  ( {loadingProgress}% )
                </span>
              </div>
            </div>

            <p className="text-xs text-smoke-dark font-mono text-center max-w-sm">
              Preparing your bespoke olfactory diagnostic and synchronizing master extraits...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SECTION 01: HERO SHOWROOM WITH 3D CRYSTAL FLACON (Matching Video 00:03)
      ========================================================================= */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 px-6 overflow-hidden bg-obsidian"
      >
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial-glow opacity-40 pointer-events-none" />

        {/* Center 3D Crystal Flacon Showcase with 360 Orbit & Lighting */}
        <div className="max-w-7xl w-full mx-auto flex-1 flex flex-col items-center justify-center relative min-h-[55vh]" data-cursor="rotate">
          <div className="w-full h-[450px] sm:h-[550px] relative">
            <PerfumeShowroomHero
              name="AURA SOVEREIGN"
              color={currentHeroBottle.color}
              liquidColor={currentHeroBottle.liquidColor}
              enableOrbit={true}
            />
          </div>

          {/* Interactive Flacon Color Switcher */}
          <div className="mt-2 flex items-center gap-2 bg-charcoal/90 border border-white/10 p-1.5 rounded-full z-20 backdrop-blur-md">
            {heroBottles.map((bottle, idx) => (
              <button
                key={bottle.slug}
                onClick={() => setActiveHeroIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeHeroIndex === idx
                    ? 'bg-gold text-obsidian font-bold shadow-md'
                    : 'text-smoke hover:text-ivory'
                }`}
              >
                {bottle.name}
              </button>
            ))}
          </div>
        </div>

        {/* Massive Serif Headline Across Screen (Matching Video 00:03) */}
        <div className="max-w-7xl w-full mx-auto space-y-6 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-ivory-light leading-none text-left"
          >
            Because you deserve <br />
            <span className="italic font-serif text-gold-gradient font-normal">
              an unforgettable signature.
            </span>
          </motion.h1>

          {/* Bottom Floating Metadata Bar (Matching Video 00:03) */}
          <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 font-mono text-xs text-smoke">
            <div className="max-w-md text-xs font-sans text-smoke leading-relaxed">
              The bespoke pure extrait formulated at {currentHeroBottle.concentration}, macerated {currentHeroBottle.maceration}.
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-widest text-gold">
              <span>{currentHeroBottle.batch}</span>
              <span className="text-white/20">•</span>
              <span>100% Handcrafted in Grasse</span>
              <span className="text-white/20">•</span>
              <span>{currentHeroBottle.origin}</span>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <MagneticButton
                  onClick={() => addToCart(showcaseProduct)}
                  ariaLabel="Acquire Flacon"
                  className="px-8 py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
                >
                  Acquire Flacon
                  <ArrowRight size={14} />
                </MagneticButton>
              ) : (
                <Link href="/login?redirect=/shop">
                  <MagneticButton
                    ariaLabel="Sign in to acquire"
                    className="px-8 py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
                  >
                    <Lock size={13} />
                    Sign In to Buy
                  </MagneticButton>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          SECTION 02: TECHNICAL EXTRACT DIAGNOSTICS (Matching Video 00:06)
      ========================================================================= */}
      <section className="py-24 px-6 bg-charcoal/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-3 text-[10px] font-mono text-gold uppercase tracking-widest">
              <span>TDS / Purity Score</span>
              <span className="text-white/20">•</span>
              <span>Smart Sillage</span>
              <span className="text-white/20">•</span>
              <span>pH Level & Temp</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light leading-tight">
              Maison Aura Sovereign analyzes <br />
              <span className="italic font-serif text-gold">botanical purity</span> with master noses, tracking your skin warmth.
            </h2>

            <p className="text-smoke text-sm leading-relaxed max-w-lg font-sans">
              Powered by fractional cold-distillation methods, the extrait consumes zero synthetic additives, delivering true natural longevity with an intimate projection.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-obsidian border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-gold text-xs font-mono">
                  <Droplets size={14} />
                  <span>Crystal Clear</span>
                </div>
                <p className="text-xs text-smoke font-sans">180 Days of French oak barrel resting.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-gold text-xs font-mono">
                  <Thermometer size={14} />
                  <span>Ultra Efficient</span>
                </div>
                <p className="text-xs text-smoke font-sans">Adaptive temperature sillage curve.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Live Diagnostic Card Mockup (Matching Video 00:07) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="w-full max-w-md bg-ivory text-obsidian rounded-3xl p-8 shadow-2xl border border-white/20 space-y-6">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-smoke-dark border-b border-black/10 pb-3">
                <span>Latest Extraction Update</span>
                <span>25/12/2025</span>
              </div>

              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="space-y-1 border-r border-black/10 pr-4">
                  <span className="text-[10px] uppercase font-mono text-smoke-dark">pH Balance</span>
                  <div className="text-4xl font-serif font-bold text-obsidian">7.2</div>
                  <span className="text-[11px] font-mono text-green-700 font-semibold">✓ Skin-Neutral</span>
                </div>

                <div className="space-y-1 pl-2">
                  <span className="text-[10px] uppercase font-mono text-smoke-dark">Maceration Temp</span>
                  <div className="text-4xl font-serif font-bold text-obsidian">19°C</div>
                  <span className="text-[11px] font-mono text-gold-dark font-semibold">Optimal Resting</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <button className="py-2.5 rounded-xl border border-black/20 text-xs font-mono hover:bg-black/5 transition-colors">
                  Info
                </button>
                <button className="py-2.5 rounded-xl bg-obsidian text-ivory text-xs font-mono font-bold hover:bg-black/90 transition-colors">
                  Update
                </button>
                <button className="py-2.5 rounded-xl border border-black/20 text-xs font-mono hover:bg-black/5 transition-colors">
                  Formula
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: FEATURES DISPLAY WITH TIMECODE NAVIGATION (Matching Video 00:09)
      ========================================================================= */}
      <section className="py-24 px-6 bg-obsidian border-y border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-ivory">
                Features <span className="text-smoke font-mono text-2xl">(olfactory)</span>{' '}
                <span className="text-gold font-mono text-2xl">{featureSteps[activeFeatureIndex].code}</span>
              </h2>
              <p className="text-smoke text-xs sm:text-sm mt-2 max-w-lg font-sans">
                Gives you real-time olfactory insights, keeping each vintage extraction clear, authentic, and up-to-date.
              </p>
            </div>

            <div className="text-xs font-mono text-smoke">
              ( 00.01 ) — ( 00.08 )
            </div>
          </div>

          {/* Interactive Feature Display Card (Matching Video 00:10) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal/80 border border-white/10 rounded-3xl p-8 sm:p-12">
            {/* Left Narrative Box */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono uppercase tracking-widest">
                {featureSteps[activeFeatureIndex].name}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-medium">
                {featureSteps[activeFeatureIndex].title}
              </h3>

              <p className="text-smoke text-xs sm:text-sm leading-relaxed font-sans">
                {featureSteps[activeFeatureIndex].description}
              </p>

              <div className="pt-2 flex gap-4">
                <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-smoke hover:text-gold hover:border-gold transition-colors">
                  <Droplets size={14} />
                </button>
                <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-smoke hover:text-gold hover:border-gold transition-colors">
                  <Thermometer size={14} />
                </button>
              </div>
            </div>

            {/* Right Interactive Graph / Monitor Card (Matching Video 00:10) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-md bg-ivory text-obsidian rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex justify-between text-[10px] font-mono text-smoke-dark uppercase border-b border-black/10 pb-2">
                  <span>Sensor Diagnostic</span>
                  <span>25/12/2025</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-smoke-dark uppercase">
                      {featureSteps[activeFeatureIndex].metric1}
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-obsidian">
                      {featureSteps[activeFeatureIndex].value1}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-smoke-dark uppercase">
                      {featureSteps[activeFeatureIndex].metric2}
                    </span>
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-dark">
                      {featureSteps[activeFeatureIndex].value2}
                    </div>
                  </div>
                </div>

                {/* Sillage Curve Graphic (Matching Video) */}
                <div className="h-16 w-full flex items-end justify-between gap-1 pt-4 border-t border-black/10">
                  <div className="w-full h-8 bg-black/10 rounded-t-sm" />
                  <div className="w-full h-10 bg-black/15 rounded-t-sm" />
                  <div className="w-full h-14 bg-black/25 rounded-t-sm" />
                  <div className="w-full h-12 bg-black/20 rounded-t-sm" />
                  <div className="w-full h-9 bg-black/10 rounded-t-sm" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 rounded-lg border border-black/20 text-xs font-mono hover:bg-black/5">
                    Back
                  </button>
                  <button className="py-2 rounded-lg bg-obsidian text-ivory text-xs font-mono font-bold hover:bg-black/90">
                    Up
                  </button>
                  <button className="py-2 rounded-lg border border-black/20 text-xs font-mono hover:bg-black/5">
                    Down
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Timecode Timeline Selector Strip (Matching Video 00:09 & 00:12) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-6">
            {featureSteps.map((step, idx) => (
              <button
                key={step.code}
                onClick={() => setActiveFeatureIndex(idx)}
                className={`p-3.5 rounded-xl border text-left font-mono transition-all ${
                  activeFeatureIndex === idx
                    ? 'bg-ivory text-obsidian border-ivory font-bold shadow-lg scale-105'
                    : 'bg-charcoal/60 border-white/10 text-smoke hover:border-gold/40 hover:text-ivory'
                }`}
              >
                <span className="text-[10px] block opacity-70 mb-1">{step.code}</span>
                <span className="text-xs font-serif block leading-tight">{step.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: MULTI-ANGLE FLACON DETAIL INSPECTOR (Matching Video 00:13)
      ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Thumbnail Angle Gallery (Matching Video 00:13) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-6 items-center sm:items-start">
            <div className="flex sm:flex-col gap-3">
              {detailImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDetailImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all ${
                    activeDetailImage === idx
                      ? 'border-gold ring-2 ring-gold/40 scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="Flacon angle" fill className="object-cover" />
                </button>
              ))}
            </div>

            <div className="relative w-full h-[450px] sm:h-[550px] rounded-3xl overflow-hidden bg-charcoal border border-white/10">
              <Image
                src={detailImages[activeDetailImage]}
                alt="Santal Impérial Extrait"
                fill
                priority
                className="object-cover object-center transition-all duration-700"
              />
              <div className="absolute inset-0 bg-radial-glow opacity-25 pointer-events-none" />
            </div>
          </div>

          {/* Right: Product Spec & Acquisition Column (Matching Video 00:13) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold block mb-2">
                / product info /
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-ivory-light">
                {showcaseProduct.name}
              </h2>
              <p className="text-xs text-smoke font-mono mt-1">
                Extrait de Parfum • 30% Oil Concentration
              </p>
            </div>

            {/* Size Selector Chips (Matching Video 00:13) */}
            <div className="flex gap-2">
              {(['50ml', '100ml', '200ml'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                    selectedSize === size
                      ? 'bg-ivory text-obsidian font-bold shadow-md'
                      : 'bg-charcoal border border-white/10 text-smoke hover:border-gold/40'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>

            <p className="text-xs text-smoke leading-relaxed font-sans">
              Handcrafted in Grasse with vintage Mysore sandalwood, golden amber resin, and cold-pressed Calabrian bergamot. Macerated 180 days in French oak casks.
            </p>

            {/* Price & Acquisition */}
            <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
              <div className="font-serif text-3xl text-ivory font-semibold">
                {formatCurrency(pricesBySize[selectedSize])}
              </div>

              {user ? (
                <MagneticButton
                  onClick={() => addToCart(showcaseProduct)}
                  ariaLabel="Acquire Flacon"
                  className="px-8 py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
                >
                  <ShoppingBag size={14} />
                  Acquire Flacon
                </MagneticButton>
              ) : (
                <Link href="/login?redirect=/shop">
                  <MagneticButton
                    ariaLabel="Sign in to acquire"
                    className="px-6 py-3.5 rounded-full border border-gold bg-gold/15 text-gold hover:bg-gold hover:text-obsidian font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <Lock size={13} />
                    Sign In to Buy
                  </MagneticButton>
                </Link>
              )}
            </div>

            {/* Accordion Expandables (Matching Video 00:13) */}
            <div className="pt-6 border-t border-white/10 divide-y divide-white/10 text-xs font-mono">
              <div>
                <button
                  onClick={() => setExpandedAccordion(expandedAccordion === 'overview' ? null : 'overview')}
                  className="w-full py-3.5 flex justify-between items-center text-ivory hover:text-gold transition-colors text-left"
                >
                  <span>Product overview</span>
                  <span>→</span>
                </button>
                {expandedAccordion === 'overview' && (
                  <p className="pb-3 text-smoke text-[11px] font-sans leading-relaxed">
                    Designed for connoisseurs seeking an enduring, complex signature that leaves an indelible memory in any room.
                  </p>
                )}
              </div>

              <div>
                <button
                  onClick={() => setExpandedAccordion(expandedAccordion === 'specs' ? null : 'specs')}
                  className="w-full py-3.5 flex justify-between items-center text-ivory hover:text-gold transition-colors text-left"
                >
                  <span>Specifications & Harvest</span>
                  <span>→</span>
                </button>
                {expandedAccordion === 'specs' && (
                  <p className="pb-3 text-smoke text-[11px] font-sans leading-relaxed">
                    100% natural extraction, cruelty-free, hand-sealed with serial certificate matching the flacon base plate.
                  </p>
                )}
              </div>

              <div>
                <button
                  onClick={() => setExpandedAccordion(expandedAccordion === 'delivery' ? null : 'delivery')}
                  className="w-full py-3.5 flex justify-between items-center text-ivory hover:text-gold transition-colors text-left"
                >
                  <span>Delivery & Returns</span>
                  <span>→</span>
                </button>
                {expandedAccordion === 'delivery' && (
                  <p className="pb-3 text-smoke text-[11px] font-sans leading-relaxed">
                    Complimentary insured white-glove shipping on all sovereign orders. Custom seals with tamper-proof packaging.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: 3D ALEMBIC EXTRACTION SHOWROOM (Creative 3D Replacement)
      ========================================================================= */}
      <section className="py-24 px-6 bg-charcoal/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
              Fractional Distillation Atelier
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light">
              3D Essence Extraction Alembic
            </h2>
            <p className="text-smoke text-sm font-sans leading-relaxed">
              Interact with the 3D copper alembic still and select the volatile essence spheres to explore how delicate extracts are captured in Grasse.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-obsidian border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl">
            {/* Left 3D Alembic Canvas */}
            <div className="lg:col-span-7 h-[420px] sm:h-[500px] w-full relative" data-cursor="rotate">
              <AlembicShowroom3D onSelectNode={(node) => setSelectedAlembicNode(node)} />
            </div>

            {/* Right Interactive Node Chemistry Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold block">
                  Olfactory Chemistry Analysis
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-medium">
                  {alembicData.title}
                </h3>
                <p className="text-xs text-gold font-mono">{alembicData.sub}</p>
              </div>

              <p className="text-smoke text-xs sm:text-sm font-sans leading-relaxed">
                {alembicData.desc}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-4 rounded-2xl bg-charcoal/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-smoke uppercase">Density</span>
                  <div className="text-sm font-serif font-bold text-ivory">{alembicData.density}</div>
                </div>

                <div className="p-4 rounded-2xl bg-charcoal/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-smoke uppercase">Diffusion State</span>
                  <div className="text-sm font-serif font-bold text-gold">{alembicData.temp}</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsScentFinderOpen(true)}
                  className="w-full py-3.5 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-obsidian font-mono text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Consult Master Parfumeur
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 06: CONNECTED FLOWCHART STORY CARDS (Matching Video 00:17)
      ========================================================================= */}
      <section className="py-24 px-6 bg-obsidian border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light leading-tight">
              Discover how Maison Aura Sovereign transforms daily presence through verified connoisseur experiences.
            </h2>
            <p className="text-xs text-smoke font-mono">
              Real-world reactions from patrons who have elevated their personal scent wardrobe.
            </p>
          </div>

          {/* Connected Flowchart Style Cards (Matching Video 00:17 - 00:19) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="p-8 rounded-3xl bg-charcoal/60 border border-white/10 space-y-6 relative hover:border-gold/40 transition-colors">
              <div className="flex justify-between text-[10px] font-mono text-smoke uppercase border-b border-white/10 pb-3">
                <span>Harvest & Origin Date</span>
                <span className="text-gold">Validated</span>
              </div>
              <p className="font-serif text-xl text-ivory font-light leading-snug">
                Shows the exact date of the botanical harvest so you always know the vintage maturity of your extrait.
              </p>
              <div className="text-xs text-smoke font-mono">
                Cold-Chain Certified
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-charcoal/60 border border-white/10 space-y-6 relative hover:border-gold/40 transition-colors">
              <div className="flex justify-between text-[10px] font-mono text-smoke uppercase border-b border-white/10 pb-3">
                <span>Skin pH & Diffusion</span>
                <span className="text-gold">Adaptive</span>
              </div>
              <p className="font-serif text-xl text-ivory font-light leading-snug">
                Skin-adaptive color temperature feedback helps you understand how notes harmonize with your natural body heat.
              </p>
              <div className="text-xs text-smoke font-mono">
                Neutral / Balanced Sillage
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-charcoal/60 border border-white/10 space-y-6 relative hover:border-gold/40 transition-colors">
              <div className="flex justify-between text-[10px] font-mono text-smoke uppercase border-b border-white/10 pb-3">
                <span>Optimal Aura Curve</span>
                <span className="text-gold">16h+ Longevity</span>
              </div>
              <p className="font-serif text-xl text-ivory font-light leading-snug">
                Ideal for those who care about long-lasting distinction for evening galas, boardrooms, and grand occasions.
              </p>
              <div className="text-xs text-smoke font-mono">
                High Concentration Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 07: MASTERPIECE EXTRAITS CATALOG
      ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block mb-2">
              The Sovereign Vault
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light">
              Masterpiece Extraits
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-widest text-gold hover:text-gold-light transition-colors flex items-center gap-2"
          >
            Explore Complete Vault ({INITIAL_PRODUCTS.length}) <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
