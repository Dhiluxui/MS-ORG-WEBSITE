import React from 'react';

export function ServicesHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-ms-true-black border-b border-ms-border-dark">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
        <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(to_bottom,_transparent,_transparent_2px,_#111_2px,_#111_4px)]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <div className="font-ascii text-ms-white-60 text-xs sm:text-sm tracking-widest mb-6 font-bold">
          &gt; MS_ESPORTS::SERVICES_MODULE<br/>
          &gt; WHAT_WE_OFFER
        </div>
        
        <h1 className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl text-ms-white uppercase tracking-wider mb-6">
          WHAT WE OFFER
        </h1>
        
        <p className="font-rajdhani text-lg sm:text-xl text-ms-white-60 max-w-2xl mx-auto uppercase tracking-widest">
          From competitive rosters to government tournaments.<br/>Full esports ecosystem.
        </p>
      </div>
      
    </section>
  );
}
