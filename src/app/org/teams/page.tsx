"use client";

import React from 'react';

export default function OrgTeamsPage() {
  const teams = [
    { id: "TM_0442", name: "PHOENIX SQUAD", captain: "MSxSNIPER", eventsPlayed: 5, winRate: "34.2%", status: "ACTIVE" },
    { id: "TM_0211", name: "TEAM SENTINEL", captain: "PHEONIX_FIRE", eventsPlayed: 3, winRate: "31.5%", status: "ACTIVE" },
    { id: "TM_0891", name: "DARK HUNTERS", captain: "VIPER_99", eventsPlayed: 1, winRate: "12.0%", status: "BANNED" },
    { id: "TM_0102", name: "LIT E-SPORTS", captain: "GHOST_MS", eventsPlayed: 8, winRate: "28.1%", status: "ACTIVE" },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1C1C1C] pb-6">
        <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
          // REGISTERED_ROSTERS
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
            TEAMS <span className="text-[#10b981]">DATABASE</span>
          </h1>
        </div>
        <p className="font-jetbrains text-[#10b981] text-xs mt-2 opacity-80 max-w-lg tracking-widest">
          GLOBAL ROSTER VIEW OF ALL TEAMS.
        </p>
      </div>

      {/* ASCII Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0A0A0A]/50 backdrop-blur-md border border-[#1C1C1C] p-4">
        <div className="flex items-center gap-4 font-courier text-xs text-ms-white-60 uppercase overflow-x-auto w-full custom-scrollbar pb-1 md:pb-0">
          <span className="shrink-0 text-ms-white">{'>'} STATUS_FILTER:</span>
          <button className="shrink-0 hover:text-ms-white transition-colors text-[#10b981] font-bold">[ALL]</button>
          <button className="shrink-0 hover:text-ms-white transition-colors">[ACTIVE]</button>
          <button className="shrink-0 hover:text-ms-white transition-colors">[BANNED/FLAGGED]</button>
        </div>
      </div>

      {/* ASCII Table */}
      <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md overflow-x-auto custom-scrollbar relative">
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #10b981 1px, #10b981 2px)' }} />

        <div className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] font-courier text-[10px] text-[#10b981] uppercase tracking-widest min-w-[800px] relative z-10">
          <div className="w-24">TEAM_ID</div>
          <div className="flex-1">SQUAD_NAME</div>
          <div className="w-48">CAPTAIN_IGN</div>
          <div className="w-24 text-center">EVENTS_PLAYED</div>
          <div className="w-24 text-center">WIN_RATE</div>
          <div className="w-24 text-right">STATUS</div>
        </div>

        <div className="flex flex-col min-w-[800px] relative z-10">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] hover:bg-white/5 transition-colors font-jetbrains text-xs text-ms-white cursor-pointer group">
              <div className="w-24 font-bold text-ms-white-60">[{team.id}]</div>
              <div className="flex-1 font-bold group-hover:text-[#10b981] transition-colors truncate pr-4">{team.name}</div>
              <div className="w-48 font-bold text-ms-white-60 group-hover:text-ms-white">{team.captain}</div>
              <div className="w-24 text-center font-courier text-ms-white-60">{team.eventsPlayed}</div>
              <div className="w-24 text-center font-courier text-ms-white-60">{team.winRate}</div>
              
              <div className="w-24 text-right">
                {team.status === 'ACTIVE' && <span className="text-[#10b981] opacity-70">[ ACTIVE ]</span>}
                {team.status === 'BANNED' && <span className="text-red-500 font-bold">[ FLAGGED ]</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
