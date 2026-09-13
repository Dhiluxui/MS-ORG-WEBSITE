import React from 'react';
import Link from 'next/link';

const DIVISIONS = [
  { name: 'FREE FIRE MAX', players: 5, status: 'ACTIVE', image: '/ffm.avif' },
  { name: 'BGMI', players: 4, status: 'ACTIVE', image: '/bgmi.avif' },
  { name: 'CODM', players: 5, status: 'ACTIVE', image: '/callofduty.avif' },
  { name: 'MOBA & MORE', players: 0, status: 'EXPANDING', image: '' },
];

export function GameDivisions() {
  return (
    <section className="py-20 bg-ms-true-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="mb-12 overflow-hidden">
          <pre className="font-ascii text-ms-white-60 text-[10px] sm:text-xs md:text-sm leading-tight mb-4 whitespace-pre">
            ╔══════════════════════╗<br />
            ║   OUR DIVISIONS      ║<br />
            ╚══════════════════════╝
          </pre>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIVISIONS.map((div, i) => (
            <div key={i} className="group relative bg-ms-panel-black border border-ms-elevated hover:border-ms-blue transition-all duration-500 overflow-hidden ms-clip-path h-96 flex flex-col justify-end">

              {/* Background Image */}
              <div className="absolute inset-0 bg-ms-true-black overflow-hidden">
                {div.image ? (
                  <img
                    src={div.image}
                    alt={div.name}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-[20%] group-hover:scale-110 group-hover:opacity-70 transition-all duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-ms-elevated opacity-40 group-hover:opacity-60 transition-all duration-700" />
                )}
                {/* Texture Overlay */}
                <div className="absolute inset-0 w-full h-full halftone-bg opacity-30 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 bg-gradient-to-t from-ms-true-black via-ms-true-black/80 to-transparent pt-20">
                <p className="font-ascii text-ms-white-60 text-xs mb-2 tracking-widest">
                  &gt; DIVISION_{div.name.replace(/\s+/g, '_')}
                </p>
                <h3 className="font-orbitron font-bold text-xl text-ms-white mb-3 tracking-wider">
                  {div.name}
                </h3>

                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-ms-white-90 text-sm">
                    {div.players} ACTIVE
                  </span>
                  <span className={`text-xs font-rajdhani font-bold tracking-[2px] px-2 py-1 ${div.status === 'ACTIVE' ? 'border border-ms-white text-ms-white' : 'border border-ms-white-60 border-dashed text-ms-white-60'}`}>
                    {div.status}
                  </span>
                </div>

                <div className="flex flex-col space-y-2">
                  <Link href="/our-story" className="font-rajdhani uppercase text-sm tracking-[2px] text-ms-white-60 hover:text-ms-white transition-colors flex justify-between border-b border-ms-border-dark pb-1">
                    <span>VIEW ROSTER</span>
                    <span>→</span>
                  </Link>
                  <Link href={`/compete/browse?game=${encodeURIComponent(div.name.replace(' & MORE', ''))}`} className="font-rajdhani uppercase text-sm tracking-[2px] text-ms-blue hover:text-ms-white transition-colors flex justify-between pb-1">
                    <span>VIEW TOURNAMENTS</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
