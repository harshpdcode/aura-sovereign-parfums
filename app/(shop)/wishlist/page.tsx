'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import ProductCard from '@/components/ui/ProductCard';
import MagneticButton from '@/components/animations/MagneticButton';

export default function WishlistPage() {
  const { wishlist } = useApp();

  const wishlistedProducts = INITIAL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Saved Creations
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light">
            Your Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="p-16 rounded-3xl bg-charcoal/40 border border-white/5 text-center space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 mx-auto">
              <Heart size={28} />
            </div>
            <h2 className="font-serif text-2xl text-ivory">Your wishlist is empty</h2>
            <p className="text-xs text-smoke leading-relaxed">
              Explore our master perfume extraits and click the heart icon on your favorite creations to save them for later.
            </p>
            <Link href="/shop" className="inline-block pt-2">
              <MagneticButton className="px-8 py-3 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all">
                Discover Fragrances
              </MagneticButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
