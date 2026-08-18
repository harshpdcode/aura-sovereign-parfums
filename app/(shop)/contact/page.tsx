'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import MagneticButton from '@/components/animations/MagneticButton';
import { useApp } from '@/context/AppContext';

export default function ContactPage() {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to API or simulate success
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
      addToast('Your concierge inquiry has been registered. Our master parfumeur will reach out shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (e) {
      addToast('Failed to send inquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory pt-28 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono block">
            Client Concierge
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-ivory-light">
            Bespoke Inquiries
          </h1>
          <p className="text-smoke text-sm leading-relaxed">
            Whether inquiring about custom private commissions, bridal flacon curation, or corporate gifting, our concierge team is at your disposal.
          </p>
        </div>

        {/* Form & Flagship Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-charcoal/70 border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full border border-gold bg-gold/10 flex items-center justify-center text-gold mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-2xl text-ivory">Inquiry Received</h3>
                <p className="text-xs text-smoke max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to Aura Sovereign Haute Parfumerie. A dedicated fragrance consultant will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-gold/40 text-gold text-xs font-mono uppercase tracking-wider hover:bg-gold hover:text-obsidian transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lord Sterling"
                      className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@domain.com"
                      className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-obsidian border border-white/10 rounded-xl px-4 py-3 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-smoke block">
                    Message / Bespoke Request *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, event, or specific olfactory requirements..."
                    className="w-full bg-obsidian border border-white/10 rounded-xl p-4 text-xs text-ivory placeholder-smoke/40 focus:outline-none focus:border-gold resize-none font-sans"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gold text-obsidian font-mono text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  {loading ? 'Transmitting...' : 'Submit Inquiry'}
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Flagship Showrooms Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-gold block">
                Flagship Boutiques
              </span>
              <h3 className="font-serif text-2xl text-ivory">Experience in Person</h3>
              <p className="text-xs text-smoke leading-relaxed">
                Step into our darkened marble showrooms for an exclusive private flight of rare natural extraits.
              </p>
            </div>

            <div className="space-y-4 divide-y divide-white/5">
              <div className="pt-3 space-y-1">
                <h4 className="font-serif text-base text-ivory font-medium">Paris Atelier</h4>
                <p className="text-xs text-smoke">14 Place Vendôme, 75001 Paris, France</p>
                <p className="text-[11px] text-gold font-mono">paris@aurasovereign.com</p>
              </div>

              <div className="pt-3 space-y-1">
                <h4 className="font-serif text-base text-ivory font-medium">London Salon</h4>
                <p className="text-xs text-smoke">28 Old Bond Street, Mayfair, London W1S 4DR, UK</p>
                <p className="text-[11px] text-gold font-mono">london@aurasovereign.com</p>
              </div>

              <div className="pt-3 space-y-1">
                <h4 className="font-serif text-base text-ivory font-medium">Mumbai Flagship</h4>
                <p className="text-xs text-smoke">Altamount Road, Cumballa Hill, Mumbai 400026, India</p>
                <p className="text-[11px] text-gold font-mono">concierge@aurasovereign.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
