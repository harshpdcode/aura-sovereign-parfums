'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [is3DZone, setIs3DZone] = useState(false);
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) {
        ringRef.current.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Detect interactive zones
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setIs3DZone(true);
        setIsHovered(false);
        setIsInput(false);
        setCursorText(cursorAttr.toUpperCase());
      } else if (target.closest('input, textarea, select')) {
        setIsInput(true);
        setIs3DZone(false);
        setIsHovered(false);
        setCursorText('');
      } else if (target.closest('button, a, [role="button"]')) {
        setIsHovered(true);
        setIs3DZone(false);
        setIsInput(false);
        setCursorText('');
      } else {
        setIsHovered(false);
        setIs3DZone(false);
        setIsInput(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Smooth trailing ring physics (60-120fps hardware accelerated)
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* 1. Precision Center Gold Dot */}
      <div
        ref={dotRef}
        style={{ opacity: 0, willChange: 'transform' }}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-gold pointer-events-none z-[99999] transition-opacity duration-150 ${
          isInput ? 'opacity-0' : ''
        }`}
      />

      {/* 2. Delicate Smooth Trailing Luxury Ring */}
      <div
        ref={ringRef}
        style={{ opacity: 0, willChange: 'transform' }}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] rounded-full flex items-center justify-center transition-[width,height,margin,border-color,background-color,opacity] duration-200 ease-out ${
          isInput
            ? 'opacity-0 scale-0'
            : is3DZone
            ? 'w-14 h-14 -ml-7 -mt-7 bg-obsidian/85 border border-gold shadow-lg shadow-gold/20'
            : isHovered
            ? 'w-8 h-8 -ml-4 -mt-4 bg-gold/15 border border-gold/60'
            : 'w-6 h-6 -ml-3 -mt-3 bg-transparent border border-gold/40'
        }`}
      >
        {is3DZone && cursorText && (
          <span className="text-[8px] font-bold tracking-widest text-gold select-none font-mono">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
