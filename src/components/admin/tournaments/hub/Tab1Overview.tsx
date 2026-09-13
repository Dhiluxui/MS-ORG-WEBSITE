import React from 'react';

export function Tab1Overview({ tournament }: { tournament?: any }) {
  return (
    <div className="space-y-6 font-jetbrains">
      
      {/* Cyber Action Banner */}
      <div className="bg-[#0A0A0A] border border-red-500/50 p-6 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-5 blur-[50px] group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute left-0 top-0 w-1 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
        <div className="z-10 mb-4 md:mb-0 pl-2">
          <h2 className="text-red-500 font-bold tracking-widest uppercase mb-1 flex items-center gap-2">
            <span className="animate-pulse">🔴</span> CURRENT_PHASE :: LIVE_MATCHES
          </h2>
          <p className="text-ms-white-40 text-xs font-orbitron">Matches are actively being played and scored.</p>
        </div>
        <button className="z-10 border border-[#10b981] bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981] hover:text-black transition-all px-6 py-4 text-[10px] tracking-widest font-bold uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          [ADVANCE TO NEXT PHASE →]
        </button>
      </div>

      {/* Cyber KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="border border-[#1C1C1C] bg-[#050505] p-6 flex flex-col justify-between h-32 hover:border-blue-500/50 transition-colors">
          <span className="text-ms-white-60 text-[10px] tracking-widest uppercase font-bold">REGISTERED_TEAMS</span>
          <span className="text-ms-white text-3xl font-orbitron font-bold">28</span>
        </div>

        <div className="border border-[#10b981]/30 bg-[#10b981]/5 p-6 flex flex-col justify-between h-32 hover:border-[#10b981] transition-colors relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981] opacity-5 blur-[20px]"></div>
          <span className="text-[#10b981] text-[10px] tracking-widest uppercase font-bold">APPROVED_TEAMS</span>
          <span className="text-[#10b981] text-3xl font-orbitron font-bold">24</span>
        </div>

        <div className="border border-red-500/30 bg-red-500/5 p-6 flex flex-col justify-between h-32 hover:border-red-500 transition-colors relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 opacity-5 blur-[20px]"></div>
          <span className="text-red-500 text-[10px] tracking-widest uppercase font-bold">REJECTED_TEAMS</span>
          <span className="text-red-500 text-3xl font-orbitron font-bold">1</span>
        </div>

        <div className="border border-yellow-500/30 bg-yellow-500/5 p-6 flex flex-col justify-between h-32 hover:border-yellow-500 transition-colors relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 opacity-5 blur-[20px]"></div>
          <span className="text-yellow-500 text-[10px] tracking-widest uppercase font-bold">WAITLISTED</span>
          <span className="text-yellow-500 text-3xl font-orbitron font-bold">3</span>
        </div>

      </div>

      {/* Cyber Basic Details Summary */}
      <div className="border border-[#1C1C1C] bg-[#050505] p-8 text-sm text-ms-white-80 space-y-6 font-bold text-[10px] tracking-widest">
        <h3 className="text-ms-white border-b border-[#1C1C1C] pb-2 uppercase"><span className="text-[#10b981]">{'>'}</span> CONFIGURATION_DATA</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div className="flex justify-between border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40">GAME:</span> <span className="text-ms-white">FREE FIRE MAX</span>
          </div>
          <div className="flex justify-between border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40">FORMAT:</span> <span className="text-ms-white">BATTLE ROYALE</span>
          </div>
          <div className="flex justify-between border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40">TEAM_SIZE:</span> <span className="text-ms-white">4 (+1 SUB)</span>
          </div>
          <div className="flex justify-between border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40">TOTAL_SLOTS:</span> <span className="text-ms-white">24</span>
          </div>
          <div className="flex justify-between border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40">ENTRY_FEE:</span> <span className="text-ms-white">₹500</span>
          </div>
          <div className="flex justify-between border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40">PRIZE_POOL:</span> <span className="text-[#10b981]">₹25,000</span>
          </div>
        </div>
      </div>

    </div>
  );
}
