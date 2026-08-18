import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassPanel({
  children,
  className = '',
  glow = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        'relative bg-charcoal/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300',
        glow && 'shadow-2xl shadow-gold/5 border-gold/30',
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none rounded-2xl" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
