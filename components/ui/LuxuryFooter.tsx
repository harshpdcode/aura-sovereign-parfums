'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ShieldCheck, Sparkles, Award, Globe, Mail } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LuxuryFooter() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useApp();

  const isAuthOrAdmin =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/forgot-password' ||
    pathname?.startsWith('/admin');

  if (isAuthOrAdmin) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('You have been enrolled in the Aldenaire Privileged Circle.', 'success');
  };

  return (
    <footer className="bg-obsidian border-t border-white/10 text-ivory pt-20 pb-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-glow opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Editorial Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
              <Award size={18} />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold tracking-wider text-ivory">HAUTE CONCENTRATION</h3>
              <p className="text-xs text-smoke">30% Extrait de Parfum with 16h+ longevity</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold tracking-wider text-ivory">COMPLIMENTARY SHIPPING</h3>
              <p className="text-xs text-smoke">Insured luxury delivery with custom packaging</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold tracking-wider text-ivory">100% AUTHENTIC</h3>
              <p className="text-xs text-smoke">Numbered flacons with Certificate of Origin</p>
            </div>
          </div>
        </div>

        {/* Main Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-gold/50 flex items-center justify-center text-gold font-serif font-bold text-xs">
                A
              </div>
              <span className="font-serif text-lg tracking-[0.25em] text-ivory">AURA SOVEREIGN</span>
            </div>
            <p className="text-xs text-smoke leading-relaxed">
              Crafting extraordinary olfactory architecture. Designed in Paris, hand-blended with the world's most elusive natural essences.
            </p>
            <p className="text-[10px] uppercase font-mono tracking-widest text-gold/80">
              PARIS • LONDON • DUBAI • MUMBAI
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.25em] font-mono text-gold font-semibold">
              The Maison
            </h3>
            <ul className="space-y-2 text-xs text-smoke">
              <li><Link href="/shop" className="hover:text-gold transition-colors">Extrait Collection</Link></li>
              <li><Link href="/scent-finder" className="hover:text-gold transition-colors">AI Scent Matchmaker</Link></li>
              <li><Link href="/notes" className="hover:text-gold transition-colors">Fragrance Notes Pyramid</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">The Master Perfumers</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">Sustainable Harvest</Link></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.25em] font-mono text-gold font-semibold">
              Client Concierge
            </h3>
            <ul className="space-y-2 text-xs text-smoke">
              <li><Link href="/contact" className="hover:text-gold transition-colors">Bespoke Consultations</Link></li>
              <li><Link href="/account/orders" className="hover:text-gold transition-colors">Track & Invoices</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Corporate Gifting</Link></li>
              <li><Link href="/account/feedback" className="hover:text-gold transition-colors">Customer Feedback</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Boutique Locations</Link></li>
            </ul>
          </div>

          {/* Newsletter / Privilege Club */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.25em] font-mono text-gold font-semibold flex items-center gap-1.5">
              <Sparkles size={12} />
              The Privileged Circle
            </h3>
            <p className="text-xs text-smoke leading-relaxed">
              Receive private invitations to confidential harvest reserves and limited flacon releases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-gold/10 border border-gold/30 rounded-lg text-xs text-gold font-mono">
                ✓ You are enrolled in the Aura Sovereign Privileged Circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-charcoal border border-white/10 rounded-full px-4 py-2.5 text-xs text-ivory placeholder-smoke focus:outline-none focus:border-gold pr-10 font-sans"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center hover:bg-gold-light transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-smoke gap-4 font-mono">
          <p>© {new Date().getFullYear()} AURA SOVEREIGN HAUTE PARFUMERIE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-gold transition-colors">Privacy Charter</Link>
            <Link href="/about" className="hover:text-gold transition-colors">Terms of Haute Service</Link>
            <Link href="/admin" className="hover:text-gold transition-colors">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
