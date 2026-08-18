'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Mail, Lock, Key, Eye, EyeOff, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';
import { isValidEmail } from '@/lib/auth/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  const { login, addToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter your email and password.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }

    setLoading(true);

    try {
      if (role === 'ADMIN') {
        if (adminKey !== 'perfume' && password !== 'perfume') {
          addToast('Invalid administrator atelier passkey.', 'error');
          setLoading(false);
          return;
        }

        const adminUser = {
          id: 'adm-1',
          name: 'Aura Sovereign Master Parfumeur',
          email: email.trim().toLowerCase(),
          role: 'ADMIN' as const,
          createdAt: new Date(),
        };
        login('token_admin_authorized_aurasovereign', adminUser);
        addToast('Staff Atelier access authorized.', 'success');
        router.push('/admin');
        return;
      }

      // Standard Client Login
      const clientUser = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace(/[._]/g, ' ').toUpperCase(),
        email: email.trim().toLowerCase(),
        role: 'USER' as const,
        createdAt: new Date(),
      };
      login(`token_user_${Date.now()}`, clientUser);
      addToast(`Welcome back, ${clientUser.name}.`, 'success');
      router.push(redirectUrl);
    } catch (e) {
      addToast('An error occurred during authentication.', 'error');
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
            src="/Perfume/generated/hero_santal.jpg"
            alt="Aldenaire Santal Impérial Flacon"
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
            <span>Privileged Sanctuary</span>
          </div>

          <blockquote className="font-serif italic text-xl xl:text-2xl text-ivory leading-relaxed">
            &ldquo;A fragrance is the most intense form of memory. Every flacon is an intimate signature waiting to unfold on your skin.&rdquo;
          </blockquote>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-[10px] font-mono text-smoke">
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-gold" />
              <span>Grasse Maceration Vaults</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={13} className="text-gold" />
              <span>Numbered Artisanal Flacons</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: PURE FOCUSED AUTHENTICATION INTERFACE (NO-SCROLL SCREEN-FIT)
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
            Secure Portal
          </span>
        </div>

        {/* Center Form Card */}
        <div className="max-w-md w-full mx-auto my-auto space-y-5">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold block">
              Privileged Access
            </span>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-serif font-light text-ivory-light">
              Client Sign In
            </h1>
            <p className="text-xs text-smoke leading-relaxed">
              Enter your credentials to manage acquisitions and access private vault reserves.
            </p>
          </div>

          {/* Role Mode Toggle */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-charcoal rounded-full border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => setRole('USER')}
              className={`py-1.5 rounded-full transition-all ${
                role === 'USER' ? 'bg-gold text-obsidian font-bold shadow-md' : 'text-smoke hover:text-ivory'
              }`}
            >
              Client Portal
            </button>
            <button
              type="button"
              onClick={() => setRole('ADMIN')}
              className={`py-1.5 rounded-full transition-all ${
                role === 'ADMIN' ? 'bg-gold text-obsidian font-bold shadow-md' : 'text-smoke hover:text-ivory'
              }`}
            >
              Staff Atelier
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'ADMIN' ? 'admin@aurasovereign.com' : 'client@domain.com'}
                  className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                />
                <Mail size={14} className="absolute right-3.5 top-3 text-smoke" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                  Password *
                </label>
                <Link href="/forgot-password" className="text-[10px] font-mono text-gold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-smoke hover:text-gold"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Admin Secret Passkey */}
            {role === 'ADMIN' && (
              <div className="space-y-1 pt-0.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-gold block">
                  Master Atelier Passkey *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="perfume"
                    className="w-full bg-charcoal border border-gold/50 rounded-xl px-4 py-2.5 text-xs text-gold placeholder-gold/30 focus:outline-none focus:border-gold font-mono pr-10"
                  />
                  <Key size={14} className="absolute right-3.5 top-3 text-gold/60" />
                </div>
              </div>
            )}

            <MagneticButton
              type="submit"
              disabled={loading}
              ariaLabel="Authenticate and Sign In"
              className="w-full py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 mt-3 shadow-lg shadow-gold/20"
            >
              {loading ? 'Verifying Credentials...' : 'Sign In to Maison'}
              <ArrowRight size={14} />
            </MagneticButton>
          </form>

          <div className="text-center pt-1 text-xs text-smoke font-sans">
            Don&apos;t have an account?{' '}
            <Link
              href={`/register${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
              className="text-gold hover:underline font-mono font-semibold"
            >
              Create Privileged Account
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-obsidian" />}>
      <LoginForm />
    </Suspense>
  );
}
