'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { ContactQuery, InquiryStatus } from '@/lib/types';
import { useApp } from '@/context/AppContext';

export default function AdminInquiriesPage() {
  const { addToast } = useApp();

  const [inquiries, setInquiries] = useState<ContactQuery[]>([
    {
      id: 'inq-1',
      name: 'Princess Zahra Al-Sabah',
      email: 'zahra@royalty.kw',
      phone: '+965 9988 7766',
      message: 'Inquiring about 50 bespoke 200ml numbered flacons of Santal Impérial for a private royal bridal gala in Kuwait.',
      status: 'IN_PROGRESS',
      createdAt: new Date(Date.now() - 3600000 * 12),
    },
    {
      id: 'inq-2',
      name: 'Arthur Pendelton, Esq.',
      email: 'arthur@mayfairlegal.co.uk',
      phone: '+44 20 8912 3456',
      message: 'Requesting private consultation for our executive partners corporate annual gifting suite.',
      status: 'NEW',
      createdAt: new Date(Date.now() - 3600000 * 24),
    },
    {
      id: 'inq-3',
      name: 'Rohan Mehra',
      email: 'rohan.mehra@luxuryestate.in',
      phone: '+91 98200 11223',
      message: 'Complimenting the fast insured delivery to Mumbai. Inquiring when the Amber Doré limited reserve restocks.',
      status: 'RESOLVED',
      createdAt: new Date(Date.now() - 86400000 * 3),
    },
  ]);

  const handleStatusUpdate = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    addToast(`Inquiry status updated to ${newStatus}.`, 'success');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete inquiry record?')) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      addToast('Inquiry removed.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs uppercase font-mono tracking-widest text-gold block">
          Concierge Services
        </span>
        <h1 className="text-3xl font-serif font-light text-ivory-light">
          Client Inquiries & Requests ({inquiries.length})
        </h1>
      </div>

      {/* Inquiries Grid */}
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="p-6 rounded-3xl bg-charcoal/70 border border-white/10 space-y-4 text-xs font-mono"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <h3 className="font-serif text-base font-medium text-ivory">
                  {inquiry.name}
                </h3>
                <span className="text-smoke text-[11px]">
                  {inquiry.email} • {inquiry.phone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value as InquiryStatus)}
                  className="bg-obsidian border border-white/10 text-gold rounded-full px-3 py-1 text-xs focus:outline-none"
                >
                  <option value="NEW">Status: NEW</option>
                  <option value="IN_PROGRESS">Status: IN PROGRESS</option>
                  <option value="RESOLVED">Status: RESOLVED</option>
                </select>

                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="p-1.5 text-smoke hover:text-red-400 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <p className="text-sm font-sans text-smoke-light leading-relaxed">
              "{inquiry.message}"
            </p>

            <span className="text-[10px] text-smoke block pt-2 border-t border-white/5">
              Received on {new Date(inquiry.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
