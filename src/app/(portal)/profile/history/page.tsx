"use client";

import React, { useState } from 'react';

export default function ProfileHistoryPage() {
  const [activeFilter, setActiveFilter] = useState('ALL_GAMES');

  const history = [
    {
      id: "m01",
      date: "24 JAN 2026",
      game: "BGMI",
      matchId: "M-8891",
      opponent: "TEAM XSPARK",
      map: "ERANGEL",
      result: "WON",
      kills: 8,
      dmg: "1240",
      rating: "S"
    },
    {
      id: "m02",
      date: "22 JAN 2026",
      game: "BGMI",
      matchId: "M-8842",
      opponent: "SOUL ESPORTS",
      map: "MIRAMAR",
      result: "LOST",
      kills: 2,
      dmg: "450",
      rating: "C"
    },
    {
      id: "m03",
      date: "18 JAN 2026",
      game: "FREE FIRE MAX",
      matchId: "M-7719",
      opponent: "TOTAL GAMING",
      map: "BERMUDA",
      result: "WON",
      kills: 12,
      dmg: "1890",
      rating: "S+"
    },
    {
      id: "m04",
      date: "15 JAN 2026",
      game: "FREE FIRE MAX",
      matchId: "M-7690",
      opponent: "DESI GAMERS",
      map: "PURGATORY",
      result: "WON",
      kills: 5,
      dmg: "920",
      rating: "A"
    }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#111] pb-6">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          // PLAYER_MATCH_HISTORY
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          MATCH <span className="text-ms-blue">HISTORY</span>
        </h1>
      </div>

      {/* ASCII Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#050505] border border-[#111] p-4">
        <div className="flex items-center gap-4 font-courier text-xs text-ms-white-60 uppercase overflow-x-auto w-full custom-scrollbar pb-1 md:pb-0">
          <span className="shrink-0 text-ms-white">{'>'} FILTER_BY:</span>
          {['ALL_GAMES', 'BGMI', 'FREE FIRE MAX', 'CODM'].map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 hover:text-ms-white transition-colors ${activeFilter === f ? 'text-ms-blue font-bold' : ''}`}
            >
              [{f}]
            </button>
          ))}
        </div>
        
        <div className="font-jetbrains text-[10px] text-ms-white-30 tracking-widest shrink-0">
          RECORDS_FOUND: {history.length}
        </div>
      </div>

      {/* History Grid (Tabular Monospace Layout) */}
      <div className="border border-[#111] bg-[#0A0A0A] overflow-x-auto custom-scrollbar">
        
        {/* Table Header */}
        <div className="flex items-center gap-4 p-4 border-b border-[#111] font-courier text-[10px] text-ms-white-30 uppercase tracking-widest min-w-[800px]">
          <div className="w-24">DATE</div>
          <div className="w-32">GAME</div>
          <div className="w-24">MATCH_ID</div>
          <div className="w-40">OPPONENT</div>
          <div className="w-24">MAP</div>
          <div className="w-20 text-center">KILLS</div>
          <div className="w-20 text-center">DMG</div>
          <div className="w-20 text-center">RATING</div>
          <div className="flex-1 text-right">RESULT</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col min-w-[800px]">
          {history.map((row, i) => (
            <div key={row.id} className="flex items-center gap-4 p-4 border-b border-[#111] hover:bg-[#111] transition-colors font-jetbrains text-xs text-ms-white group">
              <div className="w-24 text-ms-white-60">{row.date}</div>
              <div className="w-32 text-ms-white-60 bg-[#111] border border-[#222] px-2 py-0.5 max-w-max text-[10px]">{row.game}</div>
              <div className="w-24 text-ms-blue">{row.matchId}</div>
              <div className="w-40 font-bold">{row.opponent}</div>
              <div className="w-24 text-ms-white-60">{row.map}</div>
              <div className="w-20 text-center">{row.kills}</div>
              <div className="w-20 text-center text-ms-white-60">{row.dmg}</div>
              <div className="w-20 text-center font-bold">{row.rating}</div>
              <div className="flex-1 text-right font-bold">
                {row.result === 'WON' ? (
                  <span className="text-[#10b981] group-hover:animate-pulse">[✓ WON]</span>
                ) : (
                  <span className="text-red-500 opacity-80 group-hover:opacity-100">[X LOST]</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Pagination/Load More */}
        <div className="p-4 flex justify-between items-center bg-[#050505] font-courier text-[10px] text-ms-white-60 uppercase tracking-widest min-w-[800px]">
          <div>DISPLAYING 1-{history.length} OF 142 RECORDS</div>
          <button className="hover:text-ms-white transition-colors">
            [LOAD_MORE_RECORDS ↓]
          </button>
        </div>

      </div>

    </div>
  );
}
