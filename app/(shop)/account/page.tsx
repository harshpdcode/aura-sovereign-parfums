'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User as UserIcon, Package, MessageSquare, ShieldAlert, LogOut, Save } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';

export default function AccountPage() {
  const { user, setUser, logout, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || 'Lord Henry Sterling',
    email: user?.email || 'client@aurasovereign.com',
    phone: user?.phone || '+91 98765 43210',
    address: '42 Altamount Road, Cumballa Hill, Mumbai 400026',
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const updated = { ...user, name: formData.name, phone: formData.phone };
      setUser(updated);
      localStorage.setItem('aldenaire_user', JSON.stringify(updated));
    }
    addToast('Profile details updated successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-gold block">
              Client Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-light text-ivory-light">
              Privileged Account
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'ADMIN' && (
              <Link href="/admin">
                <button className="px-4 py-2 rounded-full bg-gold/20 border border-gold/50 text-gold text-xs font-mono font-semibold flex items-center gap-1.5 hover:bg-gold hover:text-obsidian transition-colors">
                  <ShieldAlert size={14} /> Admin Command Center
                </button>
              </Link>
            )}
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border border-white/10 text-smoke hover:text-red-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-white/10 text-xs font-mono">
          <Link href="/account" className="pb-3 border-b-2 border-gold text-gold font-semibold flex items-center gap-2">
            <UserIcon size={14} /> Profile & Addresses
          </Link>
          <Link href="/account/orders" className="pb-3 text-smoke hover:text-ivory flex items-center gap-2">
            <Package size={14} /> Orders & Invoices
          </Link>
          <Link href="/account/feedback" className="pb-3 text-smoke hover:text-ivory flex items-center gap-2">
            <MessageSquare size={14} /> Atelier Feedback
          </Link>
        </div>

        {/* Profile Details Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-charcoal/70 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
            <h3 className="font-serif text-xl text-ivory font-medium mb-6">Personal Credentials</h3>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={formData.email}
                    className="w-full bg-obsidian/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-smoke cursor-not-allowed font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory focus:outline-none focus:border-gold font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                  Primary Delivery Residence
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-xs text-ivory focus:outline-none focus:border-gold resize-none font-sans"
                />
              </div>

              <MagneticButton
                type="submit"
                className="px-6 py-3 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <Save size={14} /> Update Credentials
              </MagneticButton>
            </form>
          </div>

          {/* Account Privilege Card */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-charcoal/50 border border-gold/30 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold block">
              Tier Status
            </span>
            <h4 className="font-serif text-xl text-ivory">Sovereign Connoisseur</h4>
            <p className="text-xs text-smoke leading-relaxed">
              Enjoys complimentary worldwide insured delivery, bespoke flacon monogramming, and confidential access to seasonal private reserve harvests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
