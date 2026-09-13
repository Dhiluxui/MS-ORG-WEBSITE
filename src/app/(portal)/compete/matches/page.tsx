"use client";

import React, { useState, useEffect } from 'react';

export default function MyMatchesPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [matches] = useState(() => {
    const now = new Date();
    const match1Time = new Date(now.getTime() + 20 * 60000); // 20 mins from now
    const match2Time = new Date(now.getTime() + 120 * 60000); // 2 hours from now

    return [
      {
        id: "m1",
        tournamentName: "MS WINTER CLASH 2026",
        stage: "Group Stage - Round 1",
        time: match1Time,
        map: "Ascent",
        mode: "5v5 Competitive",
        roomId: "MS-2026-0120-M3",
        roomPass: "STRIKER#42",
      },
      {
        id: "m2",
        tournamentName: "BIHAR INVITATIONAL PRO",
        stage: "Quarter Finals",
        time: match2Time,
        map: "Erangel",
        mode: "Squad TPP",
        roomId: "BGM-1092-AA",
        roomPass: "erangelpro",
      }
    ];
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCountdown = (targetTime: Date) => {
    const diff = targetTime.getTime() - currentTime.getTime();
    if (diff <= 0) return "MATCH STARTED";
    
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const nextMatch = matches[0];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="relative border border-[#111] bg-[#050505] p-6 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #111 2px, #111 4px)' }} />
             
        <div className="relative z-10 flex-1">
          <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
            {'>'} MATCH_SYSTEM :: ITINERARY_LOADED
          </div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white mb-1 uppercase tracking-wide">
            MY <span className="text-ms-blue">MATCHES</span>
          </h1>
          <p className="text-ms-white-60 font-inter text-xs">
            Room details are securely revealed 30 minutes before match start.
          </p>
        </div>

        <div className="relative z-10 border border-[#1C1C1C] bg-[#0A0A0A] p-4 text-center min-w-[220px]">
          <div className="font-courier text-[10px] text-ms-blue uppercase tracking-widest mb-1">
            {'>'} NEXT_MATCH_IN
          </div>
          <div className="text-3xl font-jetbrains font-bold text-ms-white">
            {getCountdown(nextMatch.time)}
          </div>
        </div>
      </div>

      {/* Match Timeline / List */}
      <div className="space-y-6">
        <div className="font-courier text-ms-white-30 text-xs uppercase tracking-widest border-b border-[#111] pb-2">
          {'>'} TODAY'S SCHEDULE
        </div>

        <div className="space-y-4">
          {matches.map((match) => {
            const diff = match.time.getTime() - currentTime.getTime();
            const minsAway = Math.floor(diff / 1000 / 60);
            const isRevealed = minsAway <= 30 && diff > 0;
            const hasStarted = diff <= 0;

            return (
              <div key={match.id} className={`border ${isRevealed ? 'border-ms-blue' : 'border-[#1C1C1C]'} bg-[#0A0A0A] flex flex-col md:flex-row relative`}>
                
                {/* Match Info Side */}
                <div className="p-6 flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#1C1C1C]">
                  <div className="flex items-center gap-3 mb-3 text-xs font-jetbrains uppercase tracking-widest">
                    <span className={isRevealed ? 'text-ms-blue font-bold' : 'text-ms-white-60'}>
                      [{match.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} IST]
                    </span>
                    <span className="text-ms-white-30">|</span>
                    <span className="text-ms-white font-bold">{match.tournamentName}</span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-ms-white mb-4 font-rajdhani tracking-widest">{match.stage}</h4>
                  
                  <div className="font-courier text-xs text-ms-white-60 space-y-1">
                    <div>{'>'} MAP  :: {match.map}</div>
                    <div>{'>'} MODE :: {match.mode}</div>
                  </div>
                </div>

                {/* Room ID Panel */}
                <div className={`p-6 w-full md:w-96 flex flex-col justify-center font-courier text-xs ${isRevealed ? 'bg-[#000] border-l-4 border-ms-blue' : 'bg-[#050505] opacity-50'}`}>
                  
                  {hasStarted ? (
                    <div className="text-center">
                      <div className="text-ms-white-30 mb-2">┌────────────────────┐</div>
                      <div className="text-ms-white-60">MATCH_IN_PROGRESS</div>
                      <div className="text-ms-white-30 mt-2">└────────────────────┘</div>
                    </div>
                  ) : isRevealed ? (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                      <div className="text-ms-blue font-bold tracking-widest mb-4">
                        [!] ROOM_UNLOCKED
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-ms-white-60 mb-1">{'>'} ROOM_ID</div>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 bg-[#111] border border-[#222] px-3 py-2 text-ms-white font-jetbrains text-sm">
                              {match.roomId}
                            </code>
                            <button 
                              onClick={() => handleCopy(match.roomId, `${match.id}-room`)}
                              className="px-3 py-2 bg-ms-blue text-white font-rajdhani font-bold hover:bg-white hover:text-black transition-colors"
                            >
                              {copiedId === `${match.id}-room` ? 'COPIED' : 'COPY'}
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-ms-white-60 mb-1">{'>'} PASSWORD</div>
                          <div className="flex items-center gap-2">
                            <code className="flex-1 bg-[#111] border border-[#222] px-3 py-2 text-ms-white font-jetbrains text-sm">
                              {match.roomPass}
                            </code>
                            <button 
                              onClick={() => handleCopy(match.roomPass, `${match.id}-pass`)}
                              className="px-3 py-2 bg-ms-blue text-white font-rajdhani font-bold hover:bg-white hover:text-black transition-colors"
                            >
                              {copiedId === `${match.id}-pass` ? 'COPIED' : 'COPY'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <div className="text-ms-white-30 mb-2">┌──────────────────────┐</div>
                      <div className="text-ms-white-60 mb-2">ROOM_DETAILS_LOCKED</div>
                      <div className="text-[10px] text-ms-white-30">REVEALS_30M_PRIOR</div>
                      <div className="text-ms-white-30 mt-2">└──────────────────────┘</div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
