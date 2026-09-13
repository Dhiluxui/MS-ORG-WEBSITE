import React from 'react';
import Link from 'next/link';

export function CommunityJoinCTA() {
  return (
    <section className="py-24 bg-ms-true-black halftone-bg relative border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-ms-white tracking-wider mb-16">
          JOIN THE STRIKER FAMILY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

          <div className="bg-ms-panel-black p-6 border border-ms-elevated hover:border-ms-blue transition-colors group">
            <pre className="font-ascii text-ms-white-60 text-[10px] md:text-xs mb-4 overflow-hidden">
              ┌──────────────────────┐{'\n'}
              │  🎮 PLAY WITH US     │{'\n'}
              └──────────────────────┘
            </pre>
            <p className="font-inter text-ms-white-90 text-sm mb-6 min-h-[40px]">
              Register as a player and try out for our competitive divisions.
            </p>
            <Link href="/services" className="font-rajdhani uppercase tracking-widest text-ms-blue group-hover:text-ms-white transition-colors text-sm">
              [AUDITION HERE →]
            </Link>
          </div>

          <div className="bg-ms-panel-black p-6 border border-ms-elevated hover:border-ms-blue transition-colors group">
            <pre className="font-ascii text-ms-white-60 text-[10px] md:text-xs mb-4 overflow-hidden">
              ┌──────────────────────┐{'\n'}
              │  💬 DISCORD COMMUNITY│{'\n'}
              └──────────────────────┘
            </pre>
            <p className="font-inter text-ms-white-90 text-sm mb-6 min-h-[40px]">
              Join our active server with 10k+ members for scrims and chat.
            </p>
            <Link href="#" className="font-rajdhani uppercase tracking-widest text-ms-blue group-hover:text-ms-white transition-colors text-sm">
              [JOIN SERVER →]
            </Link>
          </div>

          <div className="bg-ms-panel-black p-6 border border-ms-elevated hover:border-ms-blue transition-colors group">
            <pre className="font-ascii text-ms-white-60 text-[10px] md:text-xs mb-4 overflow-hidden">
              ┌──────────────────────┐{'\n'}
              │  🤝 PARTNER WITH US  │{'\n'}
              └──────────────────────┘
            </pre>
            <p className="font-inter text-ms-white-90 text-sm mb-6 min-h-[40px]">
              Sponsor the org or host your tournaments on our platform.
            </p>
            <Link href="/services" className="font-rajdhani uppercase tracking-widest text-ms-blue group-hover:text-ms-white transition-colors text-sm">
              [CONTACT US →]
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
