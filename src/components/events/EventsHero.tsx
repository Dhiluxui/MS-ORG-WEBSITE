import React from "react";
import { Terminal } from "lucide-react";

export function EventsHero() {
  return (
    <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center bg-[#000000] overflow-hidden border-b border-[#1C1C1C]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(36,99,255,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')]" />
      
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-full h-px bg-gradient-to-r from-transparent via-[#2463FF] to-transparent" />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] border border-[#1C1C1C] rounded-sm mb-6">
          <Terminal className="w-4 h-4 text-[#2463FF]" />
          <span className="font-mono text-xs text-[#999999] tracking-wider uppercase">
            &gt; MS_EVENTS :: LAN_SCHEDULE
          </span>
        </div>

        <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white tracking-wider mb-6 leading-tight">
          LIVE EVENTS
        </h1>
        
        <p className="font-inter text-[#999999] max-w-2xl mx-auto text-lg leading-relaxed">
          Experience the thrill of Magadh Striker esports in person. Book your tickets for upcoming LAN tournaments and community meetups.
        </p>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#2463FF]/30" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#2463FF]/30" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#2463FF]/30" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#2463FF]/30" />
    </section>
  );
}
