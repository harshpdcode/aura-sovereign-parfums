'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import MagneticButton from '@/components/animations/MagneticButton';

export default function CartDrawer() {
  const {
    cart,
    user,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartCount,
  } = useApp();

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-charcoal border-l border-white/10 text-ivory flex flex-col justify-between shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-gold" />
                  <h2 className="font-serif text-lg font-medium tracking-wide">
                    Shopping Bag ({cartCount})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-smoke hover:text-ivory hover:border-gold/50 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-6 py-3 bg-obsidian border-b border-white/5">
                <div className="flex justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-smoke">
                    {cartSubtotal >= freeShippingThreshold ? (
                      <span className="text-gold flex items-center gap-1 font-semibold">
                        <ShieldCheck size={13} /> Complimentary Insured Delivery Unlocked
                      </span>
                    ) : (
                      `Add ${formatCurrency(remainingForFreeShipping)} for Free Luxury Delivery`
                    )}
                  </span>
                  <span className="text-gold">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold/60">
                      <ShoppingBag size={28} />
                    </div>
                    <div>
                      <h3 className="font-serif text-base text-ivory mb-1">Your bag is empty</h3>
                      <p className="text-xs text-smoke max-w-xs">
                        Explore our olfactory creations and select your personal signature.
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-colors"
                    >
                      Discover Collection
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="pt-4 flex gap-4">
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-obsidian-200 flex-shrink-0 border border-white/5">
                        <Image
                          src={item.product?.images?.[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                          alt={item.product?.name || 'Fragrance'}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Quantity Modifiers */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-medium text-ivory">
                              {item.product?.name}
                            </h4>
                            <span className="font-mono text-xs text-gold font-semibold">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                          <p className="text-[11px] text-smoke font-mono">
                            {item.variant ? item.variant.size : item.product?.volume || '100ml'}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-white/10 rounded-full bg-obsidian px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              className="p-1 text-smoke hover:text-gold transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="px-2 text-xs font-mono font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              className="p-1 text-smoke hover:text-gold transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId, item.variantId)}
                            className="text-smoke hover:text-red-400 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-obsidian/90 space-y-4">
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-smoke">
                      <span>Subtotal</span>
                      <span className="text-ivory">{formatCurrency(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-smoke">
                      <span>Insured Luxury Shipping</span>
                      <span className="text-gold">
                        {cartSubtotal >= freeShippingThreshold ? 'FREE' : 'Rs. 250'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-semibold text-ivory pt-2 border-t border-white/10">
                      <span>Estimated Total</span>
                      <span className="text-gold font-mono">
                        {formatCurrency(
                          cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : 250)
                        )}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={user ? "/checkout" : "/login?redirect=/checkout"}
                    onClick={() => setIsCartOpen(false)}
                    className="w-full block"
                  >
                    <MagneticButton
                      ariaLabel="Proceed to Checkout"
                      className="w-full py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                    >
                      {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                      <ArrowRight size={14} />
                    </MagneticButton>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
