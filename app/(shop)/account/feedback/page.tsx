'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Star, Send, User as UserIcon, Package, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MagneticButton from '@/components/animations/MagneticButton';

export default function UserFeedbackPage() {
  const { user, addToast } = useApp();
  const [rating, setRating] = useState(5);
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      addToast('Please provide your thoughts or impressions.', 'error');
      return;
    }

    setSubmitted(true);
    addToast('Thank you for your valuable impressions. Your feedback has been noted.', 'success');
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="pb-6 border-b border-white/10">
          <span className="text-xs uppercase font-mono tracking-widest text-gold block">
            Client Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-ivory-light">
            Atelier Impressions & Feedback
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-white/10 text-xs font-mono">
          <Link href="/account" className="pb-3 text-smoke hover:text-ivory flex items-center gap-2">
            <UserIcon size={14} /> Profile & Addresses
          </Link>
          <Link href="/account/orders" className="pb-3 text-smoke hover:text-ivory flex items-center gap-2">
            <Package size={14} /> Orders & Invoices
          </Link>
          <Link href="/account/feedback" className="pb-3 border-b-2 border-gold text-gold font-semibold flex items-center gap-2">
            <MessageSquare size={14} /> Atelier Feedback
          </Link>
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl bg-charcoal/70 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full border border-gold bg-gold/10 flex items-center justify-center text-gold mx-auto">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-serif text-2xl text-ivory">Thank You</h3>
              <p className="text-xs text-smoke max-w-sm mx-auto leading-relaxed">
                Your appraisal of our olfactory compositions directly guides the creation of future limited harvests.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSuggestion('');
                }}
                className="px-6 py-2 rounded-full border border-gold/40 text-gold text-xs font-mono uppercase tracking-wider"
              >
                Submit Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                  Overall Fragrance Experience
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-gold hover:scale-110 transition-transform"
                    >
                      <Star
                        size={22}
                        className={star <= rating ? 'fill-gold text-gold' : 'text-smoke/40'}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-gold ml-2">{rating} of 5 Stars</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                  Your Impressions & Sillage Suggestions *
                </label>
                <textarea
                  rows={4}
                  required
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Share your experience regarding longevity, projection, or new notes you wish to see explored..."
                  className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold resize-none font-sans"
                />
              </div>

              <MagneticButton
                type="submit"
                className="px-8 py-3.5 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <Send size={13} /> Submit Impressions
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
