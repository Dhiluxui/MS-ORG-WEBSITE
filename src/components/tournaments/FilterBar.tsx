"use client";

import React, { useState } from 'react';

export function FilterBar() {
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [activeGame, setActiveGame] = useState('ALL');

  return (
    <>
      {/* Live Banner */}
      <div className="bg-ms-true-black border-b border-ms-border-dark border-l-4 border-l-ms-blue p-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-ascii text-ms-white-90 text-sm tracking-widest">
            &gt; <span className="text-ms-blue font-bold">●</span> LIVE NOW: MS Winter Clash 2026 — ROUND 3 UNDERWAY
          </div>
          <div className="flex gap-4 font-rajdhani uppercase tracking-widest text-ms-blue text-sm">
            <button className="hover:text-ms-white transition-colors">[VIEW BRACKET →]</button>
            <button className="hover:text-ms-white transition-colors">[LIVE LEADERBOARD →]</button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-ms-panel-black border-b border-ms-border-dark py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            
            <span className="font-ascii text-ms-white-60 text-xs w-20">STATUS:</span>
            <div className="flex flex-wrap gap-2">
              {['ALL', '🔴 LIVE', 'UPCOMING', 'COMPLETED'].map(s => (
                <button 
                  key={s} 
                  onClick={() => setActiveStatus(s)}
                  className={`px-3 py-1 text-xs font-orbitron uppercase border ${activeStatus === s ? 'border-ms-blue text-ms-blue' : 'border-ms-border-dark text-ms-white-60 hover:border-ms-white-30'} transition-colors`}
                >
                  {s}
                </button>
              ))}
            </div>
            
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            
            <span className="font-ascii text-ms-white-60 text-xs w-20">GAME:</span>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'FREE FIRE MAX', 'BGMI', 'CODM', 'MOBA', 'LEGEND RC'].map(g => (
                <button 
                  key={g} 
                  onClick={() => setActiveGame(g)}
                  className={`px-3 py-1 text-xs font-orbitron uppercase border ${activeGame === g ? 'border-ms-blue text-ms-blue' : 'border-ms-border-dark text-ms-white-60 hover:border-ms-white-30'} transition-colors`}
                >
                  {g}
                </button>
              ))}
            </div>
            
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-ascii text-ms-white-60 text-xs w-20">SEARCH:</span>
            <input 
              type="text" 
              placeholder="> type to search..." 
              className="bg-transparent border border-ms-border-dark px-3 py-1 font-ascii text-ms-white text-sm w-full md:w-64 focus:outline-none focus:border-ms-blue transition-colors"
            />
          </div>
        </div>
      </div>
    </>
  );
}
