'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import MagneticButton from '@/components/animations/MagneticButton';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user, addToCart, toggleWishlist, isWishlisted } = useApp();
  const wishlisted = isWishlisted(product.id);
  const primaryImg = product.images?.[0]?.imageUrl || '/Perfume/generated/hero_santal.jpg';

  return (
    <motion.div
      data-cursor="view"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-charcoal/70 border border-white/10 hover:border-gold/50 rounded-2xl p-5 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-gold/10"
    >
      <div>
        {/* Card Header Tags */}
        <div className="flex items-center justify-between z-10 relative mb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full bg-obsidian/90 border border-gold/30 text-gold font-semibold">
            {product.fragranceFamily}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-8 h-8 rounded-full bg-obsidian/80 border border-white/10 flex items-center justify-center text-ivory hover:text-gold hover:border-gold/50 transition-colors"
            aria-label={`Toggle wishlist for ${product.name}`}
          >
            <Heart
              size={14}
              className={wishlisted ? 'fill-gold text-gold scale-110 transition-transform' : 'text-smoke'}
            />
          </button>
        </div>

        {/* Product Visual Container */}
        <Link href={`/product/${product.slug}`} className="block relative w-full h-72 overflow-hidden rounded-xl bg-obsidian-300">
          <div className="absolute inset-0 bg-radial-glow opacity-25 group-hover:opacity-50 transition-opacity duration-500" />
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* 3D Indicator Badge */}
          {product.is3DSupported && (
            <div className="absolute bottom-3 left-3 bg-obsidian/90 backdrop-blur-md border border-gold/40 px-2.5 py-1 rounded-md text-[9px] font-mono text-gold flex items-center gap-1">
              <Sparkles size={10} />
              3D SHOWROOM
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gold/80 font-mono">
              {product.intensity}
            </span>
            <span className="text-xs font-mono text-smoke">{product.volume}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-lg font-medium text-ivory group-hover:text-gold transition-colors tracking-wide">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-smoke line-clamp-2 leading-relaxed font-sans">
            {product.shortDescription || product.description}
          </p>

          {/* Key Fragrance Notes Pill Badges */}
          {product.notes && product.notes.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {product.notes.slice(0, 3).map((item, idx) => (
                <span
                  key={idx}
                  className="text-[9px] bg-obsidian text-smoke px-2 py-0.5 rounded border border-white/5 font-mono"
                >
                  {item.note.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Acquisition Action */}
      <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase text-smoke font-mono block">Maison Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-ivory font-semibold">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-smoke line-through font-mono">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {user ? (
          /* Authenticated: Direct Add to Bag */
          <MagneticButton
            onClick={() => addToCart(product)}
            ariaLabel={`Add ${product.name} to Bag`}
            className="px-4 py-2.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 flex items-center gap-1.5 transition-all duration-300"
          >
            <ShoppingBag size={13} />
            Add to Bag
          </MagneticButton>
        ) : (
          /* Unauthenticated: Sign in to acquire */
          <Link href={`/login?redirect=/product/${product.slug}`}>
            <MagneticButton
              ariaLabel={`Sign in to acquire ${product.name}`}
              className="px-3.5 py-2 rounded-full border border-gold/50 bg-gold/10 text-gold hover:bg-gold hover:text-obsidian font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300"
            >
              <Lock size={11} />
              Sign In to Buy
            </MagneticButton>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
