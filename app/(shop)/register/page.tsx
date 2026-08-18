'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Mail, Lock, User as UserIcon, Phone, MapPin, Eye, EyeOff, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';
import { isValidEmail } from '@/lib/auth/auth';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { login, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }

    if (formData.password.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);

    try {
      const newUser = {
        id: `usr-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        role: 'USER' as const,
        createdAt: new Date(),
      };

      login(`token_user_${Date.now()}`, newUser);
      addToast('Your Privileged Client Account has been created.', 'success');
      router.push(redirectUrl);
    } catch (e) {
      addToast('Failed to create account.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-obsidian text-ivory flex overflow-hidden">
      {/* =========================================================================
          LEFT PANEL: EDITORIAL HAUTE PARFUMERIE SHOWCASE (LG+)
      ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative flex-col justify-between p-10 xl:p-12 overflow-hidden border-r border-white/10">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Perfume/generated/rose_etheree.jpg"
            alt="Aldenaire Rose Éthérée Flacon"
            fill
            priority
            className="object-cover object-center filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/80 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />
        </div>

        {/* Brand Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian/80 backdrop-blur-md">
            <span className="font-serif text-gold text-sm font-bold">A</span>
          </div>
          <div>
            <span className="font-serif text-base tracking-[0.3em] text-ivory block font-medium">
              AURA SOVEREIGN
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-smoke font-mono block">
              PARIS • HAUTE PARFUMERIE
            </span>
          </div>
        </div>

        {/* Narrative Bottom Block */}
        <div className="relative z-10 space-y-4 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian/80 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-mono uppercase tracking-widest">
            <Sparkles size={11} />
            <span>The Privileged Circle</span>
          </div>

          <blockquote className="font-serif italic text-xl xl:text-2xl text-ivory leading-relaxed">
            &ldquo;Join our circle of patrons to receive confidential harvest reserves, bespoke flacon engravings, and personal consultations.&rdquo;
          </blockquote>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-[10px] font-mono text-smoke">
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-gold" />
              <span>Complimentary Insured Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={13} className="text-gold" />
              <span>Certificate of Origin Included</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: PURE FOCUSED REGISTRATION INTERFACE (NO-SCROLL SCREEN-FIT)
      ========================================================================= */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-between p-6 sm:p-10 xl:p-12 relative overflow-hidden bg-obsidian">
        {/* Top Return Action */}
        <div className="flex justify-between items-center w-full max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-smoke hover:text-gold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={13} /> Return to Boutique
          </Link>

          <span className="text-[10px] font-mono text-gold/70 uppercase tracking-widest">
            Enrollment
          </span>
        </div>

        {/* Center Form Card */}
        <div className="max-w-md w-full mx-auto my-auto space-y-4">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold block">
              Maison Aura Sovereign
            </span>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-serif font-light text-ivory-light">
              Create Client Account
            </h1>
            <p className="text-xs text-smoke leading-relaxed">
              Register your profile to preserve custom flacon preferences and enable instant checkout.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Julian de Montfort"
                  className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                />
                <UserIcon size={14} className="absolute right-3.5 top-2.5 text-smoke" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@domain.com"
                  className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                />
                <Mail size={14} className="absolute right-3.5 top-2.5 text-smoke" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-8"
                  />
                  <Phone size={13} className="absolute right-2.5 top-2.5 text-smoke" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                  Delivery City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-8"
                  />
                  <MapPin size={13} className="absolute right-2.5 top-2.5 text-smoke" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                Create Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2 text-smoke hover:text-gold"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <MagneticButton
              type="submit"
              disabled={loading}
              ariaLabel="Enroll in Privileged Circle"
              className="w-full py-3 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 mt-2 shadow-lg shadow-gold/20"
            >
              {loading ? 'Creating Account...' : 'Enroll in Privileged Circle'}
              <ArrowRight size={14} />
            </MagneticButton>
          </form>

          <div className="text-center pt-1 text-xs text-smoke font-sans">
            Already have an account?{' '}
            <Link
              href={`/login${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="text-gold hover:underline font-mono font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Bottom Legal / Security Info */}
        <div className="w-full max-w-md mx-auto flex items-center justify-between text-[9px] font-mono text-smoke/70 pt-2 border-t border-white/5">
          <span>256-Bit SSL Encrypted</span>
          <span>© {new Date().getFullYear()} Aura Sovereign Paris</span>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-obsidian" />}>
      <RegisterForm />
    </Suspense>
  );
}
