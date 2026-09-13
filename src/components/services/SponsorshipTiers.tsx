import React from 'react';
import { Button } from '@/components/ui/Button';

export function SponsorshipTiers() {
  return (
    <section className="py-24 bg-ms-deep-black border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="font-ascii text-ms-white-30 text-sm tracking-widest">
            ─── SPONSOR_TIERS ─── ◆ ───────────
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* BRONZE */}
          <div className="border border-ms-border-dark bg-ms-panel-black flex flex-col font-ascii text-sm">
            <div className="p-6 border-b border-ms-border-dark text-center">
              <h3 className="font-orbitron font-bold text-2xl text-ms-white mb-2">BRONZE</h3>
              <div className="text-ms-white-60">PARTNER</div>
            </div>
            <div className="p-6 border-b border-ms-border-dark text-center bg-ms-true-black">
              <div className="font-jetbrains text-2xl text-ms-white">₹25,000<span className="text-sm text-ms-white-60">/mo</span></div>
            </div>
            <div className="p-6 flex-grow space-y-4 text-ms-white-90">
              <div>✓ Sleeve logo placement</div>
              <div>✓ 2 Social posts / month</div>
              <div>✓ Website footer logo</div>
              <div className="text-ms-white-30">✗ No naming rights</div>
            </div>
            <div className="p-6 border-t border-ms-border-dark mt-auto text-center">
              <Button variant="outline" className="w-full text-xs">[CONTACT US]</Button>
            </div>
          </div>

          {/* GOLD (Highlighted) */}
          <div className="border border-ms-blue bg-ms-panel-black flex flex-col font-ascii text-sm relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(36,99,255,0.15)]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ms-blue text-ms-white px-4 py-1 text-xs font-bold tracking-widest">
              POPULAR
            </div>
            <div className="p-6 border-b border-ms-border-dark text-center">
              <h3 className="font-orbitron font-bold text-2xl text-st-gold mb-2">[GOLD]</h3>
              <div className="text-ms-white-60">PARTNER</div>
            </div>
            <div className="p-6 border-b border-ms-border-dark text-center bg-ms-true-black">
              <div className="font-jetbrains text-2xl text-ms-white">₹75,000<span className="text-sm text-ms-white-60">/mo</span></div>
            </div>
            <div className="p-6 flex-grow space-y-4 text-ms-white-90">
              <div>✓ Chest logo placement</div>
              <div>✓ Co-naming on 1 roster</div>
              <div>✓ Stream overlay banners</div>
              <div>✓ 5 Social posts / month</div>
              <div className="text-ms-blue">✓ Includes all Bronze benefits</div>
            </div>
            <div className="p-6 border-t border-ms-border-dark mt-auto text-center">
              <Button variant="primary" className="w-full text-xs">[CONTACT US]</Button>
            </div>
          </div>

          {/* TITLE */}
          <div className="border border-ms-border-dark bg-ms-panel-black flex flex-col font-ascii text-sm">
            <div className="p-6 border-b border-ms-border-dark text-center">
              <h3 className="font-orbitron font-bold text-2xl text-ms-white mb-2">TITLE</h3>
              <div className="text-ms-white-60">SPONSOR</div>
            </div>
            <div className="p-6 border-b border-ms-border-dark text-center bg-ms-true-black">
              <div className="font-jetbrains text-2xl text-ms-white">CUSTOM</div>
            </div>
            <div className="p-6 flex-grow space-y-4 text-ms-white-90">
              <div>✓ FRONT center logo</div>
              <div>✓ Full organization co-naming</div>
              <div>✓ Category exclusivity</div>
              <div>✓ Custom content series</div>
              <div>✓ Includes Gold+Bronze</div>
            </div>
            <div className="p-6 border-t border-ms-border-dark mt-auto text-center">
              <Button variant="outline" className="w-full text-xs">[CONTACT US]</Button>
            </div>
          </div>

        </div>
        
        <div className="text-center mt-12">
          <p className="font-rajdhani text-ms-white-60 tracking-widest text-sm uppercase">
            * Government and CSR partnership packages available upon request.
          </p>
        </div>

      </div>
    </section>
  );
}
