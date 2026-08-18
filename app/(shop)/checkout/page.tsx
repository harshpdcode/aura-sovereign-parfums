'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CreditCard, Banknote, Smartphone, CheckCircle2, Download, ArrowRight, Lock, User as UserIcon, LogIn } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/utils';
import { generateOrderInvoicePDF } from '@/lib/utils/invoice';
import { Order } from '@/lib/types';
import MagneticButton from '@/components/animations/MagneticButton';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, user, login, clearCart, addToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '',
  });

  // Login Gate State (for unauthenticated users on checkout)
  const [gateEmail, setGateEmail] = useState('');
  const [gatePassword, setGatePassword] = useState('');
  const [gateLoading, setGateLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleGateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateEmail || !gatePassword) {
      addToast('Please enter your email and password.', 'error');
      return;
    }
    setGateLoading(true);
    setTimeout(() => {
      const authenticatedUser = {
        id: `usr-${Date.now()}`,
        name: gateEmail.split('@')[0].replace('.', ' ').toUpperCase(),
        email: gateEmail,
        role: 'USER' as const,
        createdAt: new Date(),
      };
      login(`token_${Date.now()}`, authenticatedUser);
      addToast('Authenticated successfully. Proceeding with your acquisition.', 'success');
      setGateLoading(false);
    }, 400);
  };

  const freeShippingThreshold = 5000;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 250;
  const finalTotal = cartSubtotal + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      addToast('Please sign in to complete your acquisition.', 'error');
      return;
    }
    if (cart.length === 0) {
      addToast('Your bag is empty.', 'error');
      return;
    }

    setLoading(true);

    try {
      const orderNumber = `ALD-${Date.now().toString().slice(-6)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        userId: user?.id || null,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: `${formData.addressLine}, ${formData.city}, ${formData.state} - ${formData.postalCode}`,
        status: 'PENDING',
        subtotal: cartSubtotal,
        discount: 0,
        shipping: shippingFee,
        tax: 0,
        total: finalTotal,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
        paymentMethod: paymentMethod === 'UPI' ? 'UPI / Google Pay' : paymentMethod === 'CARD' ? 'Credit/Debit Card' : 'Cash on Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
        items: cart.map((item) => ({
          id: `item-${Date.now()}-${Math.random()}`,
          orderId: orderNumber,
          productId: item.productId,
          variantId: item.variantId || null,
          productNameSnapshot: `${item.product?.name || 'Perfume'} (${item.variant?.size || item.product?.volume || '100ml'})`,
          productImgSnapshot: item.product?.images?.[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg',
          priceSnapshot: item.price,
          quantity: item.quantity,
        })),
      };

      // Save locally to user orders history
      const savedOrders = JSON.parse(localStorage.getItem('aldenaire_orders') || '[]');
      localStorage.setItem('aldenaire_orders', JSON.stringify([newOrder, ...savedOrders]));

      setCompletedOrder(newOrder);
      clearCart();
      addToast('Your order has been placed successfully!', 'success');
    } catch (err) {
      addToast('Failed to process order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Bespoke Checkout
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-light text-ivory-light">
            Secure Order Finalization
          </h1>
        </div>

        {/* 1. Unauthenticated User Gate */}
        {!user && !completedOrder ? (
          <div className="max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-charcoal/90 border border-gold/40 space-y-6 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold mx-auto bg-obsidian">
              <Lock size={24} />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl text-ivory font-medium">Privileged Sign In Required</h2>
              <p className="text-xs text-smoke leading-relaxed">
                To guarantee insured delivery, custom flacon engraving, and generated authenticity certificates, client authentication is required.
              </p>
            </div>

            <form onSubmit={handleGateLogin} className="space-y-4 text-left">
              <div>
                <label className="text-[11px] font-mono uppercase text-smoke block mb-1">
                  Client Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  placeholder="client@domain.com"
                  className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-smoke block mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={gatePassword}
                  onChange={(e) => setGatePassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={gateLoading}
                ariaLabel="Sign In to Complete Acquisition"
                className="w-full py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-gold/20"
              >
                <LogIn size={14} />
                {gateLoading ? 'Authenticating...' : 'Sign In to Complete Acquisition'}
              </MagneticButton>
            </form>

            <div className="pt-3 border-t border-white/10 text-xs text-smoke">
              New to Maison Aura Sovereign?{' '}
              <Link href="/register?redirect=/checkout" className="text-gold hover:underline font-mono">
                Create Privileged Account
              </Link>
            </div>
          </div>
        ) : completedOrder ? (
          /* 2. Order Confirmation Screen */
          <div className="p-8 sm:p-16 rounded-3xl bg-charcoal/80 border border-gold/40 text-center space-y-6 max-w-2xl mx-auto backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full border border-gold bg-gold/10 flex items-center justify-center text-gold mx-auto">
              <CheckCircle2 size={36} />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold">
                Order #{completedOrder.orderNumber} Confirmed
              </span>
              <h2 className="font-serif text-3xl text-ivory font-medium">
                Thank you, {completedOrder.customerName}
              </h2>
              <p className="text-xs text-smoke leading-relaxed max-w-md mx-auto">
                Your order is being hand-packaged with personalized seals and prepared for insured shipment to {completedOrder.shippingAddress}.
              </p>
            </div>

            {/* Invoices & Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => generateOrderInvoicePDF(completedOrder)}
                className="px-6 py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
              >
                <Download size={15} />
                Download Official PDF Invoice
              </button>

              <Link href="/shop">
                <button className="px-6 py-3.5 rounded-full border border-white/20 text-ivory hover:border-gold font-mono text-xs uppercase tracking-wider transition-all w-full">
                  Continue Exploring
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* 3. Authenticated Checkout Form */
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Address & Payment Method */}
            <div className="lg:col-span-7 space-y-8 bg-charcoal/70 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl">
              {/* Shipping Address */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="font-serif text-lg text-ivory font-medium">
                    1. Delivery Destination
                  </h3>
                  <span className="text-[11px] font-mono text-gold flex items-center gap-1">
                    <UserIcon size={12} /> {user.name} ({user.email})
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Julian de Montfort"
                      className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="client@domain.com"
                        className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                      Street Address / Estate / Suite *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.addressLine}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                      placeholder="e.g. 42 Altamount Road, Penthouse B"
                      className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-smoke uppercase tracking-wider block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="400026"
                        className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="font-serif text-lg text-ivory font-medium pb-2 border-b border-white/10">
                  2. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-obsidian/60 text-smoke'
                    }`}
                  >
                    <Smartphone size={18} className="mb-2" />
                    <h4 className="font-serif text-xs font-medium text-ivory">UPI / Google Pay</h4>
                    <p className="text-[10px] text-smoke mt-1">Instant Encrypted Payment</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'CARD'
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-obsidian/60 text-smoke'
                    }`}
                  >
                    <CreditCard size={18} className="mb-2" />
                    <h4 className="font-serif text-xs font-medium text-ivory">Cards / Netbanking</h4>
                    <p className="text-[10px] text-smoke mt-1">Visa, Mastercard, Amex</p>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 bg-obsidian/60 text-smoke'
                    }`}
                  >
                    <Banknote size={18} className="mb-2" />
                    <h4 className="font-serif text-xs font-medium text-ivory">Cash on Delivery</h4>
                    <p className="text-[10px] text-smoke mt-1">Pay at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-charcoal/90 border border-white/10 space-y-6 backdrop-blur-xl">
              <h3 className="font-serif text-xl text-ivory font-medium pb-3 border-b border-white/10">
                Order Review ({cart.length} item{cart.length !== 1 ? 's' : ''})
              </h3>

              {/* Items Snapshot */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-white/5 pr-2">
                {cart.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="pt-3 flex gap-3 items-center">
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-obsidian flex-shrink-0">
                      <Image
                        src={item.product?.images?.[0]?.imageUrl || '/Perfume/Perfume Image/6983.jpg'}
                        alt={item.product?.name || 'Perfume'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-serif text-ivory font-medium">{item.product?.name}</h4>
                      <p className="text-smoke text-[10px] font-mono">
                        {item.variant ? item.variant.size : '100ml'} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-gold font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-smoke">
                  <span>Subtotal</span>
                  <span className="text-ivory">{formatCurrency(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-smoke">
                  <span>Insured Delivery</span>
                  <span className="text-gold">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-serif font-semibold text-ivory pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-gold font-mono">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <MagneticButton
                type="submit"
                disabled={loading || cart.length === 0}
                ariaLabel="Place Sovereign Order"
                className="w-full py-4 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold/20"
              >
                {loading ? 'Confirming with Atelier...' : 'Place Sovereign Order'}
                <ArrowRight size={14} />
              </MagneticButton>

              <div className="pt-2 flex items-center gap-2 text-[10px] text-smoke font-mono border-t border-white/5">
                <ShieldCheck size={14} className="text-gold" />
                <span>Certificate of authenticity generated automatically upon confirmation.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
