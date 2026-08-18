'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="pointer-events-auto bg-charcoal border border-gold/40 text-ivory p-4 rounded-xl shadow-2xl flex items-center justify-between gap-3 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'error' ? (
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
              ) : toast.type === 'info' ? (
                <Info size={18} className="text-gold flex-shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="text-gold flex-shrink-0" />
              )}
              <p className="text-xs font-sans font-medium leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-smoke hover:text-ivory p-1 flex-shrink-0"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
