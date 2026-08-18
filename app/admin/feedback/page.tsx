'use client';

import React, { useState } from 'react';
import { MessageSquare, Star, Trash2 } from 'lucide-react';
import { Feedback } from '@/lib/types';
import { useApp } from '@/context/AppContext';

export default function AdminFeedbackPage() {
  const { addToast } = useApp();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 'fb-1',
      name: 'Julian V. de Montfort',
      email: 'julian@montfort.co.uk',
      rating: 5,
      suggestion: 'The sillage of Santal Impérial is extraordinary. Would love to see a matching bespoke body oil or flacon atomizer for travel.',
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: 'fb-2',
      name: 'Lady Eleanor Vance',
      email: 'eleanor@vance.fr',
      rating: 5,
      suggestion: 'Oud Nocturne is dark poetry. The 3D showroom viewer represents the physical glass flacon with pinpoint accuracy.',
      createdAt: new Date(Date.now() - 86400000 * 4),
    },
    {
      id: 'fb-3',
      name: 'Ananya Singhania',
      email: 'ananya@singhania.in',
      rating: 5,
      suggestion: 'Rose Éthérée is the finest Grasse rose accord on the market. Prompt insured delivery.',
      createdAt: new Date(Date.now() - 86400000 * 7),
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Delete feedback record?')) {
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      addToast('Feedback removed.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs uppercase font-mono tracking-widest text-gold block">
          Client Impressions
        </span>
        <h1 className="text-3xl font-serif font-light text-ivory-light">
          Atelier Feedback & Ratings ({feedbacks.length})
        </h1>
      </div>

      {/* Feedbacks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="p-6 rounded-3xl bg-charcoal/70 border border-white/10 space-y-4 text-xs font-mono"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-serif text-base font-medium text-ivory">{fb.name}</h3>
                <span className="text-smoke text-[11px]">{fb.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-gold">
                  {[...Array(fb.rating)].map((_, idx) => (
                    <Star key={idx} size={13} className="fill-gold" />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="p-1 text-smoke hover:text-red-400 transition-colors ml-2"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <p className="text-sm font-sans text-smoke-light leading-relaxed">
              "{fb.suggestion}"
            </p>

            <span className="text-[10px] text-smoke block pt-2 border-t border-white/5">
              Submitted on {new Date(fb.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
