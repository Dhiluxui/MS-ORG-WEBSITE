import React from 'react';

export function Origin() {
  return (
    <section className="py-24 bg-ms-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Pull Quote */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-8">
              &gt; THE_ORIGIN
            </div>
            
            <h2 className="font-orbitron font-black text-4xl sm:text-5xl text-ms-white leading-[1.2] tracking-wide text-balance">
              "WE DIDN'T JUST<br/>
              BUILD A TEAM.<br/>
              WE BUILT A<br/>
              <span className="text-ms-blue">[MOVEMENT]</span>."
            </h2>
            
            <div className="mt-8 font-ascii text-ms-white-30 text-xs">
              ── FOUNDERS, MAGADH STRIKER
            </div>
          </div>

          {/* RIGHT: Paragraph + Image */}
          <div className="space-y-8">
            
            <div className="relative border border-ms-border-dark p-2 bg-ms-panel-black group">
              {/* Image Placeholder (Grayscale) */}
              <div className="aspect-[16/9] bg-ms-true-black flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent,_transparent_10px,_#111_10px,_#111_20px)] opacity-30"></div>
                <div className="font-ascii text-ms-white-30 text-xl tracking-widest relative z-10">
                  [ TEAM_PHOTO_PLACEHOLDER ]
                </div>
                {/* CSS Scanline strictly for the image */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,_3px_100%] z-20 pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>

            <div className="font-inter text-ms-white-90 leading-relaxed space-y-4">
              <p>
                Founded in the heart of Bihar, Magadh Striker emerged from a singular vision: to bridge the gap between tier-3 cities and the national esports stage. When we started, the infrastructure was non-existent. We had raw talent, sheer willpower, and a deep understanding of what it takes to win.
              </p>
              <p>
                From dominating local Free Fire MAX scrims to qualifying for national stages, our journey hasn't been about just playing games. It has been about providing a legitimate career path, structural support, and a unified banner for players who were told this isn't a real career.
              </p>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
