'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User as UserIcon, Sparkles, Menu, X, ShieldAlert } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';

export default function LuxuryNavbar() {
  const pathname = usePathname();
  const {
    user,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsScentFinderOpen,
    logout,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAuthOrAdmin =
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/forgot-password' ||
    pathname?.startsWith('/admin');

  if (isAuthOrAdmin) {
    return null;
  }

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'Scent Finder', href: '#', onClick: () => setIsScentFinderOpen(true) },
    { name: 'Notes Pyramid', href: '/notes' },
    { name: 'Haute Story', href: '/about' },
    { name: 'Concierge', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-obsidian/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/60'
          : 'bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-ivory hover:text-gold transition-colors p-2"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo & Monogram */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center bg-obsidian-200 group-hover:border-gold transition-colors">
            <span className="font-serif text-gold text-sm font-bold tracking-tighter">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-medium tracking-[0.25em] text-ivory group-hover:text-gold transition-colors">
              AURA SOVEREIGN
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-smoke -mt-1 font-mono">
              PARIS • HAUTE PARFUMERIE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.onClick ? (
              <button
                key={link.name}
                onClick={link.onClick}
                className="text-xs uppercase tracking-[0.2em] text-ivory/80 hover:text-gold transition-colors flex items-center gap-1.5 font-medium relative group"
              >
                <Sparkles size={12} className="text-gold/80 group-hover:rotate-12 transition-transform" />
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative group ${
                  pathname === link.href ? 'text-gold' : 'text-ivory/80 hover:text-gold'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Search Trigger */}
          <MagneticButton
            onClick={() => setIsSearchOpen(true)}
            ariaLabel="Search fragrance collection"
            className="p-2 text-ivory hover:text-gold transition-colors"
          >
            <Search size={18} />
          </MagneticButton>

          {/* Wishlist Link */}
          <Link href="/wishlist" aria-label="View Saved Wishlist">
            <MagneticButton
              ariaLabel="View Saved Wishlist"
              className="p-2 text-ivory hover:text-gold transition-colors relative"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-gold text-obsidian text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </MagneticButton>
          </Link>

          {/* Cart Trigger */}
          <MagneticButton
            onClick={() => setIsCartOpen(true)}
            ariaLabel="Open Shopping Bag"
            className="p-2 text-ivory hover:text-gold transition-colors relative"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-gold text-obsidian text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </MagneticButton>

          {/* User Account / Profile */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-gold/40 hover:border-gold bg-obsidian-300 text-ivory text-xs"
                  aria-label="User Account Menu"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-mono tracking-wider text-[11px] pr-1">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-52 bg-charcoal border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-xs font-mono"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="font-serif text-sm font-semibold text-ivory">{user.name}</p>
                        <p className="text-[11px] text-smoke">{user.email}</p>
                      </div>

                      <div className="py-2 space-y-1">
                        <Link
                          href="/account"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-3 py-2 text-ivory hover:text-gold hover:bg-white/5 rounded-lg"
                        >
                          Profile & Addresses
                        </Link>
                        <Link
                          href="/account/orders"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-3 py-2 text-ivory hover:text-gold hover:bg-white/5 rounded-lg"
                        >
                          Order Invoices
                        </Link>
                        {user.role === 'ADMIN' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="px-3 py-2 text-gold font-semibold hover:bg-gold/10 rounded-lg flex items-center gap-1.5"
                          >
                            <ShieldAlert size={13} />
                            Admin Dashboard
                          </Link>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" aria-label="Sign In to Client Account">
                <button
                  className="px-4 py-2 rounded-full border border-white/20 hover:border-gold text-xs font-mono uppercase tracking-widest text-ivory hover:text-gold transition-all"
                >
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-charcoal border-b border-white/10 px-6 py-6 space-y-4"
          >
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.name}
                  onClick={() => {
                    link.onClick?.();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm uppercase tracking-widest text-ivory hover:text-gold font-mono"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm uppercase tracking-widest text-ivory hover:text-gold font-mono"
                >
                  {link.name}
                </Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
