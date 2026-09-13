'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SPONSORS = [
  'ALIENWARE',
  'RED BULL',
  'JIO',
  'ASUS ROG',
  'INTEL',
  'MONSTER',
];

export function Sponsors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsPaused(!entry.isIntersecting);
      });
    }, { rootMargin: '50px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-16 bg-ms-true-black border-t border-ms-border-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="font-ascii text-ms-white-60 text-sm tracking-widest uppercase">
          // OUR_PARTNERS
        </p>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden w-full group border-y border-ms-elevated bg-ms-panel-black py-8 mb-12">
        <div className={`animate-marquee whitespace-nowrap flex items-center ${isPaused ? 'paused' : ''}`}>
          {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, i) => (
            <div key={i} className="mx-8 px-8 py-4 border border-ms-border-dark grayscale mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-300">
              <span className="font-orbitron font-bold text-2xl tracking-widest text-ms-white-30">
                {sponsor}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="font-inter text-ms-white-90 text-lg mb-8 leading-relaxed">
          Sponsorship opportunities available for brands investing in Indian esports. Government CSR packages welcomed.
        </p>
        <Link href="/services" className="inline-block border border-ms-white px-8 py-4 font-orbitron font-bold uppercase tracking-wider text-ms-white hover:border-ms-blue hover:text-ms-blue hover:shadow-[0_0_16px_rgba(36,99,255,0.2)] transition-all">
          [ BECOME A SPONSOR → ]
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee.paused {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </section>
  );
}
