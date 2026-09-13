import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function MerchStream() {
  return (
    <>
      {/* SECTION 1 - MERCH */}
      <section className="py-20 bg-ms-true-black border-t border-ms-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <p className="font-ascii text-ms-white-60 text-sm mb-4 tracking-widest uppercase">
                // OFFICIAL_GEAR
              </p>
              <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-ms-white tracking-wider">
                PRO SHOP
              </h2>
            </div>
            <Link href="/services" className="font-rajdhani uppercase tracking-[2px] text-ms-white-60 hover:text-ms-white border-b border-ms-border-dark pb-1 mb-2 transition-colors">
              [SEE ALL MERCH →]
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product Card 1 */}
            <div className="flex flex-col bg-ms-panel-black border border-ms-elevated p-6 hover:border-ms-blue transition-colors group">
              <div className="w-full aspect-square bg-ms-elevated mb-6 grayscale group-hover:grayscale-0 overflow-hidden relative transition-all duration-500">
                <div className="absolute inset-0 w-full h-full halftone-bg opacity-30 pointer-events-none"></div>
              </div>
              <h4 className="font-mono text-ms-white font-medium text-lg">MS JERSEY 2026</h4>
              <p className="font-mono text-ms-white-60 text-sm mt-1 mb-6">₹1,299</p>
              <div className="mt-auto">
                <Button variant="primary" className="w-full justify-center">SHOP →</Button>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="flex flex-col bg-ms-panel-black border border-ms-elevated p-6 hover:border-ms-blue transition-colors group">
              <div className="w-full aspect-square bg-ms-elevated mb-6 grayscale group-hover:grayscale-0 overflow-hidden relative transition-all duration-500">
                <div className="absolute inset-0 w-full h-full halftone-bg opacity-30 pointer-events-none"></div>
              </div>
              <h4 className="font-mono text-ms-white font-medium text-lg">PRO MOUSEPAD</h4>
              <p className="font-mono text-ms-white-60 text-sm mt-1 mb-6">₹899</p>
              <div className="mt-auto">
                <Button variant="primary" className="w-full justify-center">SHOP →</Button>
              </div>
            </div>
            
            {/* Empty slots for visual balance in grid */}
            <div className="hidden lg:flex flex-col bg-ms-true-black border border-ms-border-dark/50 p-6 opacity-30">
              <div className="w-full aspect-square bg-ms-true-black border border-ms-border-dark mb-6 relative">
                 <div className="absolute inset-0 scanline-bg opacity-10"></div>
              </div>
              <div className="h-4 bg-ms-border-dark w-3/4 mb-3"></div>
              <div className="h-3 bg-ms-border-dark/50 w-1/3"></div>
            </div>

            <div className="hidden lg:flex flex-col bg-ms-true-black border border-ms-border-dark/50 p-6 opacity-30">
              <div className="w-full aspect-square bg-ms-true-black border border-ms-border-dark mb-6 relative">
                 <div className="absolute inset-0 scanline-bg opacity-10"></div>
              </div>
              <div className="h-4 bg-ms-border-dark w-3/4 mb-3"></div>
              <div className="h-3 bg-ms-border-dark/50 w-1/3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - STREAM */}
      <section className="py-24 bg-ms-panel-black border-t border-ms-border-dark relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ms-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="font-ascii text-ms-white-60 text-sm mb-12 tracking-widest uppercase text-center">
            // LIVE_STREAM
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-ms-true-black border border-ms-elevated p-4 md:p-8 mb-8 shadow-2xl">
              <div className="aspect-video bg-[#000000] border border-ms-border-dark relative flex items-center justify-center mb-8 overflow-hidden group">
                <div className="absolute inset-0 scanline-bg opacity-30 pointer-events-none z-10"></div>
                <div className="font-orbitron text-ms-white-30 tracking-widest text-xl md:text-3xl group-hover:text-ms-blue transition-colors duration-500 relative z-20">
                  [ STREAM OFFLINE ]
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex gap-4 items-center">
                  <span className="font-mono text-xs bg-ms-blue text-ms-true-black px-3 py-1.5 font-bold animate-pulse shadow-[0_0_10px_rgba(36,99,255,0.5)]">🔴 LIVE</span>
                  <span className="font-rajdhani text-lg md:text-2xl uppercase tracking-wider text-ms-white">MS Winter Clash - Finals</span>
                </div>
                <div className="flex gap-3">
                  <button className="text-sm font-orbitron border border-ms-white px-6 py-2 hover:bg-ms-white hover:text-ms-true-black transition-colors">YOUTUBE</button>
                  <button className="text-sm font-orbitron border border-ms-white-30 px-6 py-2 text-ms-white-60 hover:border-ms-white hover:text-ms-white transition-colors">KICK</button>
                </div>
              </div>
            </div>

            <div className="font-mono text-ms-white-40 text-xs text-center mt-6 uppercase tracking-widest">
              [ WAITING FOR SIGNAL... ]
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
