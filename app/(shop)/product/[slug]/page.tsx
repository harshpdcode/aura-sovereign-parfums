'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShoppingBag, Plus, Minus, ShieldCheck, Award, RefreshCw, ArrowLeft } from 'lucide-react';
import { PerfumeShowroomHero, FragrancePyramid3D } from '@/components/3d/SceneContainer';
import ProductCard from '@/components/ui/ProductCard';
import MagneticButton from '@/components/animations/MagneticButton';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug) || INITIAL_PRODUCTS[0];

  const { user, addToCart, toggleWishlist, isWishlisted, addToast } = useApp();
  const wishlisted = isWishlisted(product.id);

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[1] || product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'3D' | 'IMAGE'>('3D');

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const relatedProducts = INITIAL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-smoke hover:text-gold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft size={14} /> Back to Sovereign Collection
        </Link>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: 3D / Image Viewport */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative w-full h-[450px] sm:h-[600px] rounded-3xl bg-charcoal/50 border border-white/10 overflow-hidden flex items-center justify-center">
              {activeTab === '3D' && product.is3DSupported ? (
                <div className="w-full h-full" data-cursor="rotate">
                  <PerfumeShowroomHero
                    name={product.name}
                    color={product.bottleColor}
                    liquidColor={product.bottleColor}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* View Toggle */}
              <div className="absolute top-4 right-4 bg-obsidian/80 backdrop-blur-md border border-white/10 p-1 rounded-full flex gap-1 z-10 text-[10px] font-mono">
                <button
                  onClick={() => setActiveTab('3D')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    activeTab === '3D' ? 'bg-gold text-obsidian font-bold' : 'text-smoke hover:text-ivory'
                  }`}
                >
                  3D View
                </button>
                <button
                  onClick={() => setActiveTab('IMAGE')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    activeTab === 'IMAGE' ? 'bg-gold text-obsidian font-bold' : 'text-smoke hover:text-ivory'
                  }`}
                >
                  Gallery
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-gold font-semibold block">
                {product.brand} • {product.fragranceFamily}
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-light text-ivory-light">
                {product.name}
              </h1>
              <p className="text-xs font-mono text-smoke">{product.intensity}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-white/10">
              <span className="font-serif text-3xl font-semibold text-gold">
                {formatCurrency(currentPrice)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm font-mono text-smoke line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
              <span className="text-[11px] font-mono text-smoke ml-auto">
                Inclusive of all bespoke taxes & insured shipping
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-smoke leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Size Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-ivory font-semibold block">
                  Select Flacon Volume:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-gold bg-gold/10 text-gold font-bold ring-1 ring-gold'
                          : 'border-white/10 bg-charcoal text-smoke hover:border-gold/40'
                      }`}
                    >
                      <span className="block font-semibold">{v.size}</span>
                      <span className="text-[10px] text-smoke mt-0.5 block">{formatCurrency(v.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Bag Actions */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                {/* Quantity modifier */}
                <div className="flex items-center border border-white/10 rounded-full bg-charcoal px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-smoke hover:text-gold transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-xs font-mono font-bold text-ivory">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-smoke hover:text-gold transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to Bag or Sign In to Acquire */}
                {user ? (
                  <MagneticButton
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    ariaLabel={`Add ${product.name} to Bag`}
                    className="flex-1 py-4 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag size={15} />
                    Add to Bag • {formatCurrency(currentPrice * quantity)}
                  </MagneticButton>
                ) : (
                  <Link
                    href={`/login?redirect=/product/${product.slug}`}
                    className="flex-1 block"
                  >
                    <MagneticButton
                      ariaLabel={`Sign in to acquire ${product.name}`}
                      className="w-full py-4 rounded-full border border-gold bg-gold/15 text-gold hover:bg-gold hover:text-obsidian font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold/20"
                    >
                      Sign In to Acquire Flacon
                    </MagneticButton>
                  </Link>
                )}

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={`Toggle wishlist for ${product.name}`}
                  className="w-12 h-12 rounded-full border border-white/10 bg-charcoal flex items-center justify-center text-ivory hover:text-gold hover:border-gold/40 transition-colors flex-shrink-0"
                >
                  <Heart
                    size={18}
                    className={wishlisted ? 'fill-gold text-gold scale-110' : 'text-smoke'}
                  />
                </button>
              </div>

              {/* Quality Guarantee Seals */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-[11px] text-smoke font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold" />
                  <span>Complimentary Insured Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-gold" />
                  <span>Handcrafted numbered flacon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fragrance Notes Breakdown */}
        {product.notes && product.notes.length > 0 && (
          <div className="py-16 border-t border-white/10 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
                Olfactory Composition
              </span>
              <h2 className="text-3xl font-serif font-light text-ivory-light">
                Harmonic Notes Structure
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Notes */}
              <div className="p-6 rounded-2xl bg-charcoal/50 border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFC38A] block">
                  Top Notes (0 – 30 mins)
                </span>
                <h4 className="font-serif text-lg font-medium text-ivory">The Radiant Opening</h4>
                <ul className="space-y-1.5 text-xs text-smoke">
                  {product.notes.filter((n) => n.note.type === 'TOP').map((n) => (
                    <li key={n.note.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFC38A]" />
                      <span className="text-ivory font-medium">{n.note.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Heart Notes */}
              <div className="p-6 rounded-2xl bg-charcoal/50 border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C6A15B] block">
                  Heart Notes (30 mins – 4 hrs)
                </span>
                <h4 className="font-serif text-lg font-medium text-ivory">The Soul & Character</h4>
                <ul className="space-y-1.5 text-xs text-smoke">
                  {product.notes.filter((n) => n.note.type === 'HEART').map((n) => (
                    <li key={n.note.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />
                      <span className="text-ivory font-medium">{n.note.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Base Notes */}
              <div className="p-6 rounded-2xl bg-charcoal/50 border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C6A3D] block">
                  Base Notes (4 – 16+ hrs)
                </span>
                <h4 className="font-serif text-lg font-medium text-ivory">The Lingering Sillage</h4>
                <ul className="space-y-1.5 text-xs text-smoke">
                  {product.notes.filter((n) => n.note.type === 'BASE').map((n) => (
                    <li key={n.note.id} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A3D]" />
                      <span className="text-ivory font-medium">{n.note.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Related Fragrances */}
        <div className="pt-16 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-ivory">
              Complementary Masterpieces
            </h3>
            <Link href="/shop" className="text-xs font-mono uppercase tracking-widest text-gold hover:text-gold-light">
              Explore Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
