'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const products = INITIAL_PRODUCTS;
  const totalRevenue = 1245000;
  const activeOrdersCount = 14;
  const clientCount = 186;

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Executive Summary
          </span>
          <h1 className="text-3xl font-serif font-light text-ivory-light">
            Atelier Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <button className="px-4 py-2 rounded-full bg-gold text-obsidian text-xs font-mono font-bold uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-1.5 shadow-md shadow-gold/10">
              <Package size={14} /> Add New Flacon
            </button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-charcoal/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-smoke">
            <span>Total Gross Revenue</span>
            <TrendingUp size={16} className="text-gold" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-gold font-bold">
            {formatCurrency(totalRevenue)}
          </p>
          <span className="text-[10px] text-green-400 font-mono">+18.4% this quarter</span>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-smoke">
            <span>Active Orders Pipeline</span>
            <ShoppingCart size={16} className="text-gold" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-ivory font-bold">
            {activeOrdersCount}
          </p>
          <span className="text-[10px] text-gold font-mono">4 awaiting dispatch</span>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-smoke">
            <span>Formulated Flacons</span>
            <Package size={16} className="text-gold" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-ivory font-bold">
            {products.length}
          </p>
          <span className="text-[10px] text-smoke font-mono">All 3D models active</span>
        </div>

        <div className="p-6 rounded-2xl bg-charcoal/80 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-smoke">
            <span>Privileged Clients</span>
            <Users size={16} className="text-gold" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl text-ivory font-bold">
            {clientCount}
          </p>
          <span className="text-[10px] text-smoke font-mono">Across 14 countries</span>
        </div>
      </div>

      {/* Catalog Quick Management & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Formulations */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-charcoal/60 border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-serif text-lg text-ivory font-medium">
              Sovereign Flacons Catalog
            </h3>
            <Link
              href="/admin/products"
              className="text-xs font-mono text-gold hover:underline flex items-center gap-1"
            >
              Manage Catalog <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-obsidian/70 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-serif text-sm font-medium text-ivory">{p.name}</h4>
                  <span className="text-[10px] text-smoke font-mono">
                    {p.fragranceFamily} • Stock: {p.stock} units
                  </span>
                </div>
                <span className="font-mono text-gold font-bold">{formatCurrency(p.price)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-charcoal/60 border border-white/10 space-y-4">
            <h3 className="font-serif text-lg text-ivory font-medium pb-2 border-b border-white/10">
              Executive Shortcuts
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <Link
                href="/admin/analytics"
                className="block p-3 rounded-xl bg-obsidian hover:bg-gold hover:text-obsidian transition-all border border-white/5"
              >
                📊 Monthly Selling & Revenue Reports
              </Link>
              <Link
                href="/admin/orders"
                className="block p-3 rounded-xl bg-obsidian hover:bg-gold hover:text-obsidian transition-all border border-white/5"
              >
                📦 Order Fulfillment & Dispatch Pipeline
              </Link>
              <Link
                href="/admin/inquiries"
                className="block p-3 rounded-xl bg-obsidian hover:bg-gold hover:text-obsidian transition-all border border-white/5"
              >
                ✉️ Bespoke Concierge Customer Requests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
