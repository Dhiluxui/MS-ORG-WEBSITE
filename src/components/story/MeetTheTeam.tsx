"use client";
import React, { useState } from 'react';

// Supabase Roster Data (Pending backend integration)
const roster: any[] = [];

export function MeetTheTeam() {
  const [activeTab, setActiveTab] = useState('COMPETITIVE');
  const tabs = ['COMPETITIVE', 'CONTENT', 'MANAGEMENT'];

  const filteredRoster = roster.filter(p => p.type === activeTab);

  return (
    <section className="py-24 bg-ms-deep-black border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-8 text-center">
          &gt; ROSTER_DATABASE :: ONLINE
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-ascii text-xs px-6 py-2 border transition-colors ${
                activeTab === tab 
                  ? 'border-ms-blue bg-ms-blue-dim text-ms-blue shadow-[0_0_15px_rgba(36,99,255,0.2)]' 
                  : 'border-ms-border-dark border-dashed text-ms-white-60 hover:text-ms-white hover:border-ms-white-30'
              }`}
            >
              [{tab === 'COMPETITIVE' ? 'COMPETITIVE PLAYERS' : tab === 'CONTENT' ? 'CONTENT CREATORS' : 'MANAGEMENT & STAFF'}]
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRoster.map((player) => (
            <div key={player.id} className="border border-ms-border-dark bg-ms-panel-black group hover:border-ms-blue transition-colors">
              {/* Photo placeholder */}
              <div className="aspect-[3/4] bg-ms-true-black relative overflow-hidden grayscale group-hover:grayscale-[50%] transition-all duration-500">
                <div className="absolute inset-0 bg-ms-white-10 flex items-center justify-center font-ascii text-ms-white-30 text-xs">
                  IMG_NOT_FOUND
                </div>
                {/* CSS Scanline */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,_transparent,_transparent_2px,_rgba(0,0,0,0.5)_2px,_rgba(0,0,0,0.5)_4px)] opacity-50 pointer-events-none"></div>
              </div>

              <div className="p-5">
                <div className="font-ascii text-ms-white-30 text-[10px] tracking-widest mb-2">
                  &gt; PLAYER_ID_{player.id}
                </div>
                
                <h3 className="font-orbitron font-bold text-lg text-ms-white mb-1 uppercase">
                  {player.ign}
                </h3>
                <div className="font-inter text-sm text-ms-white-60 mb-4">
                  {player.name}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="font-ascii text-[10px] border border-ms-border-dark border-dashed px-2 py-1 text-ms-white-90">
                    {player.role}
                  </div>
                  <div className="font-rajdhani text-[10px] text-ms-white-60 tracking-widest uppercase">
                    {player.game}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
