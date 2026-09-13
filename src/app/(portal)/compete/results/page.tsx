"use client";

import React, { useState } from 'react';

export default function PastResultsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Toggle this to test the empty state
  const hasResults = true;

  const results = [
    {
      id: 1,
      tournament: "MS WINTER CLASH 2026",
      date: "20 JAN 2026",
      placement: "1st 🏆",
      prize: "₹12,500",
      kills: 142,
      game: "Free Fire MAX",
      details: [
        { round: "GRAND FINALS", opponent: "PHOENIX SQUAD", map: "BERMUDA", result: "WON", myKills: 24 },
        { round: "SEMI FINALS", opponent: "TEAM SENTINEL", map: "PURGATORY", result: "WON", myKills: 19 },
        { round: "QUARTER FINALS", opponent: "DARK HUNTERS", map: "KALAHARI", result: "WON", myKills: 28 }
      ]
    },
    {
      id: 2,
      tournament: "BGMI SUMMER INVITATIONAL",
      date: "05 FEB 2026",
      placement: "4th",
      prize: "₹5,000",
      kills: 88,
      game: "BGMI",
      details: [
        { round: "FINALS DAY 3", opponent: "LOBBY B", map: "ERANGEL", result: "2ND", myKills: 12 },
        { round: "FINALS DAY 2", opponent: "LOBBY B", map: "MIRAMAR", result: "5TH", myKills: 8 },
        { round: "FINALS DAY 1", opponent: "LOBBY B", map: "SANHOK", result: "1ST", myKills: 15 }
      ]
    }
  ];

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 max-w-5xl mx-auto">
        <div className="font-courier text-ms-white-30 mb-4">
          <pre>
{`   _____
  /     \\
 | () () |
  \\  ^  /
   |||||
   |||||
  `}
          </pre>
        </div>
        <h2 className="text-2xl font-orbitron font-bold text-ms-white mb-3 tracking-widest uppercase">NO DATA FOUND</h2>
        <p className="text-ms-white-60 font-courier text-xs max-w-md mb-8">
          {'>'} YOUR COMPETITIVE HISTORY WILL APPEAR HERE ONCE YOU COMPLETE YOUR FIRST TOURNAMENT.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="relative border border-[#111] bg-[#050505] p-6 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #111 2px, #111 4px)' }} />
             
        <div className="relative z-10 flex-1">
          <div className="font-courier text-ms-white-30 text-[10px] mb-2 uppercase tracking-widest">
            // RESULTS_ARCHIVE
          </div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white mb-1 uppercase tracking-wide">
            PAST <span className="text-ms-blue">RESULTS</span>
          </h1>
          <p className="text-ms-white-60 font-inter text-xs">
            Historical performance and competitive earnings.
          </p>
        </div>
      </div>

      {/* ASCII Summary Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "TOURS_PLAYED", value: "14" },
          { label: "TOURS_WON", value: "3" },
          { label: "TOTAL_EARNINGS", value: "₹24,500" },
          { label: "OVERALL_K/D", value: "2.45" },
        ].map((stat, i) => (
          <div key={i} className="border border-[#1C1C1C] bg-[#0A0A0A] p-4 text-center">
             <div className="font-courier text-[10px] text-ms-white-30 uppercase tracking-widest mb-1">
               {stat.label}
             </div>
             <div className="text-2xl font-jetbrains font-bold text-ms-white">
               {stat.value}
             </div>
          </div>
        ))}
      </div>

      {/* History Table / List */}
      <div className="space-y-6">
        <div className="font-courier text-ms-white-30 text-xs uppercase tracking-widest border-b border-[#111] pb-2">
          {'>'} MATCH_HISTORY
        </div>

        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="border border-[#1C1C1C] bg-[#0A0A0A]">
              
              {/* Main Row */}
              <div 
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer hover:bg-[#111] transition-colors"
                onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
              >
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 font-courier text-[10px] text-ms-white-60">
                    <span className="bg-[#111] border border-[#222] px-2 py-0.5">{result.game}</span>
                    <span>{result.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-ms-white font-rajdhani tracking-widest uppercase">{result.tournament}</h3>
                </div>

                <div className="flex items-center gap-6 lg:gap-10 font-jetbrains text-xs">
                  <div className="text-center">
                    <span className="text-ms-white-30 block mb-1">PLACEMENT</span>
                    <span className={`text-lg font-bold ${result.placement.includes('1st') ? 'text-ms-blue' : 'text-ms-white'}`}>
                      {result.placement}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-ms-white-30 block mb-1">PRIZE</span>
                    <span className="text-lg font-bold text-ms-white">{result.prize}</span>
                  </div>
                  <div className="text-center hidden sm:block">
                    <span className="text-ms-white-30 block mb-1">KILLS</span>
                    <span className="text-lg font-bold text-ms-white">{result.kills}</span>
                  </div>
                  
                  <div className="w-8 h-8 border border-[#222] bg-[#111] flex items-center justify-center text-ms-white font-courier">
                    {expandedId === result.id ? '[-]' : '[+]'}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === result.id && (
                <div className="p-5 bg-[#050505] border-t border-[#1C1C1C]">
                  <div className="font-courier text-xs text-ms-white-60 mb-4 uppercase tracking-widest">
                    {'>'} ROUND_BY_ROUND_BREAKDOWN
                  </div>
                  
                  <div className="space-y-2 font-jetbrains text-xs">
                    {result.details.map((detail, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-[#111] bg-[#0A0A0A] hover:border-ms-blue/30 transition-colors gap-3">
                        <div className="flex items-center gap-4 min-w-[150px]">
                          <span className="text-ms-white-30">[{idx + 1}]</span>
                          <span className="text-ms-white font-bold">{detail.round}</span>
                        </div>
                        <div className="text-ms-white-60 min-w-[150px]">
                          VS: {detail.opponent}
                        </div>
                        <div className="text-ms-white-60 min-w-[100px]">
                          MAP: {detail.map}
                        </div>
                        <div className="text-ms-white-60">
                          KILLS: <span className="text-ms-white font-bold">{detail.myKills}</span>
                        </div>
                        <div className="font-bold text-right min-w-[60px]">
                          <span className={detail.result === 'WON' || detail.result === '1ST' ? 'text-ms-blue' : 'text-ms-white'}>
                            [{detail.result}]
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
