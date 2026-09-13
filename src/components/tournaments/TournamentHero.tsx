import React from 'react';
import Link from 'next/link';

export function TournamentHero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-ms-true-black overflow-hidden border-b border-ms-border-dark">
      {/* Background patterns */}
      <div className="absolute inset-0 halftone-bg opacity-50 z-0"></div>
      <div className="absolute inset-0 scanline-bg opacity-30 z-0"></div>

      <div className="z-10 w-full max-w-7xl mx-auto px-4 text-center">
        <pre className="font-ascii text-ms-white-60 text-sm md:text-base tracking-widest mb-8 inline-block text-left bg-ms-true-black/50 p-4 border border-ms-border-dark">
          &gt; MAGADH_STRIKER::TOURNAMENT_SYSTEM v1.0{'\n'}
          &gt; STATUS: ONLINE{'\n'}
          &gt; ACTIVE_TOURNAMENTS: 4
        </pre>
        
        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-[6rem] leading-none text-ms-white tracking-wider mb-6">
          TOURNAMENTS
        </h1>
        
        <p className="font-inter text-lg md:text-xl text-ms-white-90 max-w-2xl mx-auto mb-10">
          Compete · Host · Win — Open scrims to government events.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-ms-blue text-ms-white font-orbitron font-bold uppercase tracking-wider px-8 py-4 hover:bg-opacity-90 transition-all shadow-[0_0_16px_rgba(36,99,255,0.2)]">
            REGISTER TEAM
          </button>
          <Link href="/services" className="border border-ms-white text-ms-white font-orbitron font-bold uppercase tracking-wider px-8 py-4 hover:border-ms-blue hover:text-ms-blue transition-all">
            HOST A TOURNAMENT
          </Link>
        </div>
      </div>
    </section>
  );
}
