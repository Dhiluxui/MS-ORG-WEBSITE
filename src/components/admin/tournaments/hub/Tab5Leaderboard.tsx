"use client";

import React, { useState } from 'react';

export function Tab5Leaderboard({ tournament }: { tournament?: any }) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  return (
    <div className="space-y-6 font-jetbrains text-xs">
      
      {/* Cyber Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#050505] border border-[#1C1C1C] p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 blur-[50px] pointer-events-none group-hover:opacity-10 transition-opacity"></div>
        <div className="flex items-center gap-4 z-10">
          <span className="text-red-500 border border-red-500 bg-red-500/10 px-3 py-2 tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)] font-bold text-[10px]">
            🔴 LIVE_UPDATING
          </span>
          <span className="text-ms-white-60 font-bold uppercase tracking-widest text-[10px]">MS WINTER CLASH 2026 — STANDINGS (AFTER R4/6)</span>
        </div>
        
        <div className="flex items-center gap-6 z-10">
          <label className="flex items-center gap-3 cursor-pointer group/toggle">
            <span className="text-ms-white-40 font-bold uppercase tracking-widest text-[10px] group-hover/toggle:text-ms-white transition-colors">AUTO-PUBLISH:</span>
            <div className="w-12 h-6 bg-[#10b981] rounded-none border border-[#10b981] relative shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <div className="absolute right-1 top-1 w-4 h-4 bg-black border border-[#10b981]"></div>
            </div>
          </label>
          <div className="h-8 w-px bg-[#1C1C1C] mx-2"></div>
          <button className="text-ms-white hover:text-blue-500 transition-colors uppercase font-bold tracking-widest text-[10px] hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">[PUBLISH_MANUAL]</button>
          <button className="text-ms-white hover:text-blue-500 transition-colors uppercase font-bold tracking-widest text-[10px] hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">[EXPORT_PDF]</button>
        </div>
      </div>

      {/* Cyber Leaderboard Table */}
      <div className="bg-[#050505] border border-[#1C1C1C] overflow-x-auto relative">
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] z-20"></div>
        <table className="w-full text-left whitespace-nowrap">
          <thead className="border-b border-[#1C1C1C] bg-[#0A0A0A] text-ms-white-40 tracking-widest uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4 border-r border-[#1C1C1C] font-normal w-20 text-center">RANK</th>
              <th className="p-4 border-r border-[#1C1C1C] font-normal">TEAM</th>
              <th className="p-4 border-r border-[#1C1C1C] font-normal w-24 text-center text-[#10b981]">TOTAL_PTS</th>
              <th className="p-4 border-r border-[#1C1C1C] font-normal w-24 text-center">TOTAL_KILLS</th>
              <th className="p-4 font-normal w-16 text-center text-ms-white-40 hover:text-ms-white transition-colors cursor-pointer">R1</th>
              <th className="p-4 font-normal w-16 text-center text-ms-white-40 hover:text-ms-white transition-colors cursor-pointer">R2</th>
              <th className="p-4 font-normal w-16 text-center text-ms-white-40 hover:text-ms-white transition-colors cursor-pointer">R3</th>
              <th className="p-4 font-normal w-16 text-center text-blue-500 bg-blue-500/5 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">R4</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1C] text-sm">
            <tr className="hover:bg-[#111] transition-colors group relative">
              <td className="p-4 border-r border-[#1C1C1C] text-center text-yellow-500 font-bold font-orbitron text-xl drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">1</td>
              <td className="p-4 border-r border-[#1C1C1C] text-ms-white font-bold uppercase tracking-widest font-orbitron">Phoenix Squad</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-[#10b981] font-bold font-orbitron text-2xl drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">98</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-ms-white font-orbitron">42</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">20</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">22</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">28</td>
              <td className="p-4 text-center text-ms-white bg-blue-500/5 font-orbitron font-bold">28</td>
            </tr>
            <tr className="hover:bg-[#111] transition-colors group relative">
              <td className="p-4 border-r border-[#1C1C1C] text-center text-[#C0C0C0] font-bold font-orbitron text-xl drop-shadow-[0_0_5px_rgba(192,192,192,0.5)]">2</td>
              <td className="p-4 border-r border-[#1C1C1C] text-ms-white font-bold uppercase tracking-widest font-orbitron">NoScope Kings</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-[#10b981] font-bold font-orbitron text-2xl drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">87</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-ms-white font-orbitron">31</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">12</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">20</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">27</td>
              <td className="p-4 text-center text-ms-white bg-blue-500/5 font-orbitron font-bold">28</td>
            </tr>
            <tr className="hover:bg-[#111] transition-colors group relative">
              <td className="p-4 border-r border-[#1C1C1C] text-center text-[#CD7F32] font-bold font-orbitron text-xl drop-shadow-[0_0_5px_rgba(205,127,50,0.5)]">3</td>
              <td className="p-4 border-r border-[#1C1C1C] text-ms-white font-bold uppercase tracking-widest font-orbitron">Dark Hunters</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-[#10b981] font-bold font-orbitron text-2xl drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">82</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-ms-white font-orbitron">28</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">12</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">22</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">22</td>
              <td className="p-4 text-center text-ms-white bg-blue-500/5 font-orbitron font-bold">26</td>
            </tr>
            <tr className="hover:bg-[#111] transition-colors group relative">
              <td className="p-4 border-r border-[#1C1C1C] text-center text-ms-white-40 font-orbitron">4</td>
              <td className="p-4 border-r border-[#1C1C1C] text-ms-white tracking-widest uppercase font-orbitron">Toxic Gamers</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-ms-white font-bold font-orbitron text-lg">65</td>
              <td className="p-4 border-r border-[#1C1C1C] text-center text-ms-white-60 font-orbitron">15</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">10</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">15</td>
              <td className="p-4 text-center text-ms-white-60 font-orbitron">20</td>
              <td className="p-4 text-center text-ms-white-80 bg-blue-500/5 font-orbitron">20</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
