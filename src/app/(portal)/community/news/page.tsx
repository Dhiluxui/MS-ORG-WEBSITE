"use client";

import React from 'react';

export default function CommunityNewsPage() {
  const newsLogs = [
    {
      id: "LOG_094",
      date: "01 AUG 2026",
      category: "TOURNAMENT",
      title: "MS WINTER CLASH 2026 ANNOUNCED",
      summary: "Registration opens soon for the biggest Free Fire MAX tournament of the year. ₹50,000 prize pool and exclusive organizational contracts for the MVP squad.",
      priority: "HIGH"
    },
    {
      id: "LOG_093",
      date: "28 JUL 2026",
      category: "SYSTEM",
      title: "V1.4 PORTAL UPDATE DEPLOYED",
      summary: "New terminal domination UI is now live across all gamer profiles. Optimized for latency and rapid room ID decryption during live matches.",
      priority: "NORMAL"
    },
    {
      id: "LOG_092",
      date: "15 JUL 2026",
      category: "COMMUNITY",
      title: "MEET THE NEW ROSTER",
      summary: "Magadh Striker officially signs 'Team Sentinel' to our Tier-1 BGMI roster. Watch their debut in the upcoming Bihar Invitational Pro.",
      priority: "NORMAL"
    }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="border-b border-[#111] pb-6">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          // COMMS_BROADCAST
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          NEWS & <span className="text-ms-blue">UPDATES</span>
        </h1>
        <p className="text-ms-white-60 font-inter text-xs mt-2 max-w-lg">
          Official transmissions, system updates, and tournament announcements.
        </p>
      </div>

      {/* ASCII News Feed */}
      <div className="space-y-6">
        {newsLogs.map((log) => (
          <div key={log.id} className="border border-[#1C1C1C] bg-[#0A0A0A] hover:border-[#333] transition-colors relative group">
            
            <div className="absolute top-0 left-0 w-1 h-full bg-[#111] group-hover:bg-ms-blue transition-colors" />
            
            <div className="p-6 pl-8">
              <div className="flex items-center gap-4 mb-4 font-courier text-[10px] text-ms-white-60 uppercase tracking-widest">
                <span className="text-ms-white font-bold">[{log.date}]</span>
                <span className="bg-[#111] border border-[#222] px-2 py-0.5">{log.category}</span>
                {log.priority === 'HIGH' && (
                  <span className="text-ms-blue animate-pulse">:: PRIORITY_BROADCAST</span>
                )}
              </div>

              <h2 className="text-2xl font-orbitron font-bold text-ms-white mb-3 tracking-widest uppercase group-hover:text-ms-blue transition-colors">
                {log.title}
              </h2>
              
              <p className="font-courier text-xs text-ms-white-60 mb-6 leading-relaxed max-w-3xl border-l border-[#222] pl-4 py-1">
                {log.summary}
              </p>

              <div className="font-jetbrains text-xs">
                <button className="text-ms-white hover:text-ms-blue transition-colors font-bold tracking-widest">
                  [READ_TRANSMISSION →]
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Footer Pagination */}
      <div className="p-4 flex justify-between items-center bg-[#050505] font-courier text-[10px] text-ms-white-60 uppercase tracking-widest border border-[#111]">
        <div>DISPLAYING LOGS 1-3 OF 94</div>
        <button className="hover:text-ms-white transition-colors">
          [FETCH_OLDER_LOGS]
        </button>
      </div>

    </div>
  );
}
