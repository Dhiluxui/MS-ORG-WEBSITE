import React from 'react';

export function BlogHero() {
  return (
    <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-ms-true-black border-b border-ms-border-dark">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(to_bottom,_transparent,_transparent_2px,_#111_2px,_#111_4px)]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
        <div className="font-ascii text-ms-white-60 text-xs sm:text-sm tracking-widest mb-6">
          &gt; MS_BLOG :: NEWS_FEED_ONLINE<br/>
          &gt; FILTER_BY: CATEGORY
        </div>
        
        <h1 className="font-orbitron font-black text-4xl sm:text-5xl text-ms-white uppercase tracking-wider mb-8">
          NEWS & UPDATES
        </h1>
      </div>
      
    </section>
  );
}
