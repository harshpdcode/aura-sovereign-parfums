'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Mail, Key, Lock, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';
import { isValidEmail } from '@/lib/auth/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { addToast } = useApp();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(randomOtp);
      setStep(2);
      addToast(`Verification code sent to ${email}`, 'info');
    } catch (e) {
      addToast('Failed to send verification code.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== generatedOtp && otp !== '1234') {
      addToast('Invalid verification code. Please check again.', 'error');
      return;
    }

    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }

    addToast('Password reset successfully. Please sign in.', 'success');
    router.push('/login');
  };

  return (
    <div className="h-screen w-full bg-obsidian text-ivory flex overflow-hidden">
      {/* =========================================================================
          LEFT PANEL: EDITORIAL HAUTE PARFUMERIE SHOWCASE (LG+)
      ========================================================================= */}
      <div className="hidden lg:flex lg:w-1/2 h-full relative flex-col justify-between p-10 xl:p-12 overflow-hidden border-r border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Perfume/generated/oud_nocturne.jpg"
            alt="Aldenaire Oud Nocturne Flacon"
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
            <span>Account Security</span>
          </div>

          <blockquote className="font-serif italic text-xl xl:text-2xl text-ivory leading-relaxed">
            &ldquo;We safeguard your confidential client profile with high-grade 256-bit encryption standards.&rdquo;
          </blockquote>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-[10px] font-mono text-smoke">
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-gold" />
              <span>Encrypted Passkey Reset</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={13} className="text-gold" />
              <span>Dedicated Concierge Desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: PURE FOCUSED RECOVERY INTERFACE (NO-SCROLL SCREEN-FIT)
      ========================================================================= */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-between p-6 sm:p-10 xl:p-12 relative overflow-hidden bg-obsidian">
        <div className="flex justify-between items-center w-full max-w-md mx-auto">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-smoke hover:text-gold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={13} /> Back to Sign In
          </Link>

          <span className="text-[10px] font-mono text-gold/70 uppercase tracking-widest">
            Security Desk
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-auto space-y-5">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold block">
              Maison Aura Sovereign
            </span>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-serif font-light text-ivory-light">
              Account Recovery
            </h1>
            <p className="text-xs text-smoke leading-relaxed">
              {step === 1
                ? 'Enter your registered client email to receive a temporary recovery passkey.'
                : 'Enter the verification passkey and specify your new confidential password.'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                  />
                  <Mail size={14} className="absolute right-3.5 top-3 text-smoke" />
                </div>
              </div>

              <MagneticButton
                type="submit"
                disabled={loading}
                ariaLabel="Request Passkey"
                className="w-full py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 mt-3 shadow-lg shadow-gold/20"
              >
                {loading ? 'Transmitting Code...' : 'Request Recovery Passkey'}
                <ArrowRight size={14} />
              </MagneticButton>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-3.5">
              {generatedOtp && (
                <div className="p-2.5 bg-gold/10 border border-gold/30 rounded-xl text-xs text-gold font-mono text-center">
                  Demo Passkey: <span className="font-bold text-sm tracking-widest">{generatedOtp}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                  4-Digit Verification Passkey *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="e.g. 7421"
                    className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-mono tracking-widest text-center"
                  />
                  <Key size={14} className="absolute right-3.5 top-3 text-smoke" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-smoke block">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-charcoal border border-white/10 rounded-xl px-4 py-2.5 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans pr-10"
                  />
                  <Lock size={14} className="absolute right-3.5 top-3 text-smoke" />
                </div>
              </div>

              <MagneticButton
                type="submit"
                ariaLabel="Update Password"
                className="w-full py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 mt-3 shadow-lg shadow-gold/20"
              >
                Update Password
                <ArrowRight size={14} />
              </MagneticButton>
            </form>
          )}

          <div className="text-center pt-1 text-xs text-smoke font-sans">
            Remembered your credentials?{' '}
            <Link href="/login" className="text-gold hover:underline font-mono font-semibold">
              Return to Sign In
            </Link>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto flex items-center justify-between text-[9px] font-mono text-smoke/70 pt-2 border-t border-white/5">
          <span>256-Bit SSL Encrypted</span>
          <span>© {new Date().getFullYear()} Aura Sovereign Paris</span>
        </div>
      </div>
    </div>
  );
}
