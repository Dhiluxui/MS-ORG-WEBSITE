import React from 'react';
import Link from 'next/link';

export function AboutTeaser() {
  return (
    <section className="py-20 bg-ms-true-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left Column */}
          <div>
            <p className="font-ascii text-ms-white-60 text-sm mb-6 tracking-widest">
              // ABOUT_MS_ESPORTS
            </p>
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-ms-white leading-[1.1]">
              &quot;MORE THAN A TEAM.<br />
              WE ARE A<br />
              <span className="text-ms-blue">[MOVEMENT]</span>.&quot;
            </h2>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <p className="font-inter text-ms-white-90 text-lg leading-relaxed">
              Born from the grassroots of Bihar, Magadh Striker is rapidly expanding across India. We don&apos;t just play games—we build competitive ecosystems. From raw talent to professional rosters, we are elevating Indian esports into a dominant global force.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="border border-dashed border-ms-white-30 px-6 py-3 font-orbitron font-bold uppercase tracking-wider text-ms-white text-center">
                🏆 EXCELLENCE
              </div>
              <div className="border border-dashed border-ms-white-30 px-6 py-3 font-orbitron font-bold uppercase tracking-wider text-ms-white text-center">
                🔥 PASSION
              </div>
            </div>

            <div className="pt-4">
              <Link href="/our-story" className="font-rajdhani text-st-gold text-lg font-bold tracking-[2px] uppercase hover:text-ms-white transition-colors flex items-center gap-2">
                READ OUR FULL STORY <span>→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
