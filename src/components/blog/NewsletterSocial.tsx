import React from 'react';
import { Button } from '@/components/ui/Button';

export function NewsletterSocial() {
  return (
    <section className="py-24 bg-ms-true-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <div className="font-ascii text-ms-white-30 text-sm tracking-widest">
            ─────────────── ◆ ───────────────
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: Newsletter */}
          <div className="bg-ms-panel-black border border-ms-border-dark p-8 md:p-12">
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-8">
              &gt; SUBSCRIBE_TO_FEED
            </div>
            
            <h2 className="font-orbitron font-bold text-3xl text-ms-white mb-4">
              NEVER MISS A DROP
            </h2>
            <p className="font-inter text-ms-white-60 mb-8">
              Match results, roster drops, open scrim room IDs. No spam, just pure operations.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="ENTER_EMAIL_ADDRESS..."
                className="flex-grow bg-ms-true-black border border-ms-border-dark p-4 font-ascii text-sm text-ms-white focus:border-ms-blue outline-none transition-colors"
              />
              <Button type="button" variant="primary" className="whitespace-nowrap">
                [SUBSCRIBE →]
              </Button>
            </form>
          </div>

          {/* RIGHT: Social Channels */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-8">
              &gt; SOCIAL_CHANNELS
            </div>
            
            <div className="space-y-4 font-ascii text-sm">
              <a href="#" className="block p-4 border border-ms-border-dark bg-ms-panel-black hover:border-ms-blue hover:text-ms-white transition-colors group text-ms-white-90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-ms-white-60 group-hover:text-ms-white">[IG]</span>
                    <span>INSTAGRAM</span>
                  </div>
                  <span className="text-ms-white-60">─ @magadhstriker</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-ms-border-dark bg-ms-panel-black hover:border-[#FF0000] hover:text-ms-white transition-colors group text-ms-white-90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-ms-white-60 group-hover:text-ms-white">[YT]</span>
                    <span>YOUTUBE</span>
                  </div>
                  <span className="text-ms-white-60">─ /magadhstriker</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-ms-border-dark bg-ms-panel-black hover:border-[#5865F2] hover:text-ms-white transition-colors group text-ms-white-90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-ms-white-60 group-hover:text-ms-white">[DC]</span>
                    <span>DISCORD</span>
                  </div>
                  <span className="text-ms-white-60">─ discord.gg/ms</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-ms-border-dark bg-ms-panel-black hover:border-ms-white hover:text-ms-white transition-colors group text-ms-white-90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-ms-white-60 group-hover:text-ms-white">[TW]</span>
                    <span>TWITTER/X</span>
                  </div>
                  <span className="text-ms-white-60">─ @ms_esports</span>
                </div>
              </a>
              
              <a href="#" className="block p-4 border border-ms-border-dark bg-ms-panel-black hover:border-[#25D366] hover:text-ms-white transition-colors group text-ms-white-90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-ms-white-60 group-hover:text-ms-white">[WA]</span>
                    <span>WHATSAPP CH</span>
                  </div>
                  <span className="text-ms-white-60">─ link</span>
                </div>
              </a>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
