'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(card1Ref.current, { opacity: 0, scale: 0.9, y: -40, duration: 1 })
        .fromTo(card2Ref.current, { opacity: 0, scale: 0.95, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '-=0.3')
        .to(card2Ref.current, { opacity: 0, scale: 0.9, y: -40, duration: 1 })
        .fromTo(card3Ref.current, { opacity: 0, scale: 0.95, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-obsidian text-ivory flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background Cinematic Atelier Image with Dark Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Perfume/generated/atelier_craft.jpg"
          alt="Aura Sovereign Perfumery Atelier"
          fill
          className="object-cover opacity-20 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/80 to-obsidian pointer-events-none" />
      </div>

      {/* Radial Gold Ambient Glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-40 z-0" />

      <div className="relative max-w-4xl w-full mx-auto flex items-center justify-center text-center z-10">
        {/* Chapter 1: The Alchemy */}
        <div ref={card1Ref} className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-3 font-mono">
            Chapter I • The Artisanal Harvest
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ivory-light mb-6">
            Extracted from Nature.<br />
            <span className="italic font-serif text-gold">Refined by Master Noses.</span>
          </h2>
          <p className="max-w-xl text-smoke text-sm md:text-base leading-relaxed">
            Every flacon begins with rare, seasonal extractions — cold-pressed Calabrian bergamot, ethically harvested 25-year aged Cambodian agarwood, and Grasse Centifolia roses matured in French oak casks.
          </p>
        </div>

        {/* Chapter 2: The Sillage */}
        <div ref={card2Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-3 font-mono">
            Chapter II • Olfactory Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ivory-light mb-6">
            A Living Sillage that<br />
            <span className="italic font-serif text-gold">Transforms on Your Skin.</span>
          </h2>
          <p className="max-w-xl text-smoke text-sm md:text-base leading-relaxed">
            Formulated at a pure 30% Extrait de Parfum concentration, generating a multi-faceted aura that breathes and endures for 16+ hours with sovereign elegance.
          </p>
        </div>

        {/* Chapter 3: The Flacon */}
        <div ref={card3Ref} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <span className="text-xs uppercase tracking-[0.4em] text-gold mb-3 font-mono">
            Chapter III • The Crystalline Flacon
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ivory-light mb-6">
            Heavy French Crystal.<br />
            <span className="italic font-serif text-gold">A Jewel of Eternity.</span>
          </h2>
          <p className="max-w-xl text-smoke text-sm md:text-base leading-relaxed">
            Capped with solid brass and magnetic precision closures. Hand-polished to reflect ambient candlelight with gemstone clarity.
          </p>
        </div>
      </div>
    </section>
  );
}
