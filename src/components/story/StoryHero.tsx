"use client";
import React, { useEffect, useState } from 'react';

export function StoryHero() {
  const [text, setText] = useState('');
  const fullText = "> INITIATING_SEQUENCE\n> LOADING_MAGADH_STRIKER_STORY\n> ...\n> ONLINE.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-ms-true-black border-b border-ms-border-dark">
      
      {/* Heavy Scanlines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
        <div className="absolute inset-0 opacity-60 bg-[repeating-linear-gradient(to_bottom,_transparent,_transparent_1px,_#111_1px,_#111_3px)] pointer-events-none"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        
        {/* Typewriter Effect */}
        <div className="h-24 flex items-center justify-center mb-8">
          <pre className="font-ascii text-ms-white-30 text-xs sm:text-sm text-left inline-block w-[300px]">
            {text}
            <span className="animate-pulse">_</span>
          </pre>
        </div>
        
        <h1 className="font-orbitron font-black text-4xl sm:text-5xl md:text-6xl text-ms-white uppercase tracking-wider mb-6 leading-tight text-balance">
          THE MAGADH STRIKER STORY
        </h1>
        
        <p className="font-rajdhani text-lg sm:text-xl text-ms-white-60 max-w-2xl mx-auto uppercase tracking-widest text-balance">
          Born from passion. Built for greatness.<br/>Fighting for Indian esports.
        </p>

      </div>
    </section>
  );
}
