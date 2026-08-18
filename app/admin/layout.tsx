'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  MessageSquare,
  Mail,
  ArrowLeft,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();

  useEffect(() => {
    // Role verification
    if (user && user.role !== 'ADMIN') {
      // alert('Administrator access required.');
      // router.push('/');
    }
  }, [user, router]);

  const navItems = [
    { name: 'Executive Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & Flacons', href: '/admin/products', icon: Package },
    { name: 'Order Fulfillment', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Client Directory', href: '/admin/users', icon: Users },
    { name: 'Sales Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Concierge Inquiries', href: '/admin/inquiries', icon: Mail },
    { name: 'Atelier Feedback', href: '/admin/feedback', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-ivory flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-obsidian border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-xs bg-charcoal">
              A
            </div>
            <div>
              <h2 className="font-serif text-sm font-bold tracking-widest text-ivory">AURA SOVEREIGN</h2>
              <span className="text-[9px] uppercase font-mono tracking-widest text-gold flex items-center gap-1">
                <ShieldCheck size={10} /> STAFF COMMAND
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-gold text-obsidian font-bold shadow-md shadow-gold/10'
                      : 'text-smoke hover:text-ivory hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2 text-xs font-mono">
          <Link
            href="/"
            className="flex items-center gap-2 text-smoke hover:text-gold transition-colors py-2 px-3"
          >
            <ArrowLeft size={13} />
            <span>Return to Boutique</span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="w-full flex items-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors py-2 px-3 rounded-lg text-left"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Workspace */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-charcoal/30">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
