'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import MagneticButton from '@/components/animations/MagneticButton';

export default function CartPage() {
  const {
    cart,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useApp();

  const freeShippingThreshold = 5000;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const finalTotal = cartSubtotal + shippingFee;

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Your Selection
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light">
            Shopping Bag
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="p-16 rounded-3xl bg-charcoal/40 border border-white/5 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold/60 mx-auto">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-serif text-2xl text-ivory">Your bag is empty</h2>
            <p className="text-xs text-smoke max-w-xs mx-auto">
              Discover our master perfumers' extraits and elevate your fragrance collection.
            </p>
            <Link href="/shop" className="inline-block pt-2">
              <MagneticButton className="px-8 py-3 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all">
                Discover Collection
              </MagneticButton>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="p-4 sm:p-6 rounded-2xl bg-charcoal/60 border border-white/10 flex gap-4 sm:gap-6 items-center"
                >
                  <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-obsidian flex-shrink-0">
                    <Image
                      src={item.product?.images?.[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                      alt={item.product?.name || 'Perfume'}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold block">
                      {item.product?.fragranceFamily}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-ivory">
                      {item.product?.name}
                    </h3>
                    <p className="text-xs text-smoke font-mono">
                      {item.variant ? item.variant.size : item.product?.volume || '100ml'}
                    </p>
                    <p className="font-mono text-sm text-gold font-semibold pt-1">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity & Delete */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-smoke hover:text-red-400 p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-center border border-white/10 rounded-full bg-obsidian px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                        className="p-0.5 text-smoke hover:text-gold"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-ivory">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        className="p-0.5 text-smoke hover:text-gold"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs font-mono text-smoke hover:text-red-400 transition-colors"
                >
                  Clear entire bag
                </button>
                <Link href="/shop" className="text-xs font-mono text-gold hover:underline">
                  Continue browsing collection
                </Link>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-charcoal/80 border border-white/10 space-y-6 backdrop-blur-xl">
              <h3 className="font-serif text-xl text-ivory font-medium pb-3 border-b border-white/10">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-smoke">
                  <span>Bag Subtotal</span>
                  <span className="text-ivory">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-smoke">
                  <span>Insured Delivery</span>
                  <span className="text-gold">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-semibold text-ivory pt-3 border-t border-white/10">
                  <span>Total Payable</span>
                  <span className="text-gold font-mono">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
                <MagneticButton className="w-full py-4 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold/20">
                  Proceed to Checkout <ArrowRight size={14} />
                </MagneticButton>
              </Link>

              <div className="pt-3 flex items-center gap-2 text-[10px] text-smoke font-mono border-t border-white/5">
                <ShieldCheck size={14} className="text-gold" />
                <span>Encrypted 256-Bit Luxury Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
