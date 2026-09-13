"use client";

import React, { useState } from 'react';

export default function LinkedAccountsPage() {
  const [ignInput, setIgnInput] = useState('');
  const [selectedGame, setSelectedGame] = useState('BGMI');
  
  const accounts = [
    {
      id: "acc_1",
      game: "BGMI",
      ign: "MSxSNIPER",
      uid: "5512349876",
      status: "VERIFIED",
      verifiedAt: "12 DEC 2025",
    },
    {
      id: "acc_2",
      game: "FREE FIRE MAX",
      ign: "PHEONIX_FIRE",
      uid: "9988776655",
      status: "VERIFIED",
      verifiedAt: "05 JAN 2026",
    },
    {
      id: "acc_3",
      game: "CODM",
      ign: "GHOST_MS",
      uid: "6677889900",
      status: "PENDING",
      verifiedAt: null,
    }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#111] pb-6">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          {'>'} SECURE_LINK :: GAME_INTEGRATION_MODULE
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          LINKED <span className="text-ms-blue">ACCOUNTS</span>
        </h1>
        <p className="text-ms-white-60 font-inter text-xs mt-2 max-w-lg">
          Your In-Game Names (IGNs) and UIDs must be verified before you can register for official tournaments.
        </p>
      </div>

      {/* Terminal Input Module for Adding New Account */}
      <div className="border border-[#111] bg-[#050505] p-6 relative overflow-hidden">
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #111 2px, #111 4px)' }} />
             
        <div className="relative z-10">
          <div className="font-courier text-ms-white-30 text-[10px] uppercase tracking-widest mb-4">
            ┌── [ REGISTER_NEW_IGN ] ────────────────────────
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            
            <div className="flex-1 space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest block">
                // SELECT_GAME
              </label>
              <div className="flex gap-2 flex-wrap">
                {['BGMI', 'FREE FIRE MAX', 'CODM'].map(g => (
                  <button 
                    key={g}
                    onClick={() => setSelectedGame(g)}
                    className={`font-courier text-xs px-3 py-2 border transition-colors ${
                      selectedGame === g ? 'border-ms-blue bg-ms-blue/10 text-ms-blue' : 'border-[#222] bg-[#111] text-ms-white-60 hover:border-[#444]'
                    }`}
                  >
                    [{g}]
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest block">
                {'>'} INPUT_IGN_OR_UID
              </label>
              <div className="flex items-center gap-2 border border-[#333] bg-[#0A0A0A] p-2 focus-within:border-ms-blue transition-colors">
                <span className="text-ms-white-30 font-courier ml-2">{'>'}</span>
                <input 
                  type="text" 
                  placeholder="e.g. MSxSNIPER or 5512349876"
                  value={ignInput}
                  onChange={(e) => setIgnInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-ms-white font-jetbrains text-sm w-full placeholder:text-[#333] placeholder:font-courier"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button className="w-full md:w-auto px-6 py-3 bg-ms-blue text-white font-rajdhani font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                [LINK_ACCOUNT]
              </button>
            </div>
            
          </div>
          <div className="font-courier text-ms-white-30 text-[10px] uppercase tracking-widest mt-4 text-right">
            └────────────────────────────────────────────────
          </div>
        </div>
      </div>

      {/* Linked Accounts Grid */}
      <div className="space-y-4">
        <div className="font-courier text-ms-white-30 text-xs uppercase tracking-widest border-b border-[#111] pb-2">
          {'>'} REGISTERED_IDENTITIES
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map(acc => (
            <div key={acc.id} className="border border-[#1C1C1C] bg-[#0A0A0A] p-5 relative group hover:border-[#333] transition-colors">
              
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[#111] border border-[#222] px-2 py-1 font-courier text-[10px] text-ms-white-60 uppercase">
                  {acc.game}
                </div>
                
                <div className="font-jetbrains text-[10px] font-bold tracking-widest">
                  {acc.status === 'VERIFIED' ? (
                    <span className="text-[#10b981]">[ VERIFIED ]</span>
                  ) : (
                    <span className="text-[#f59e0b] animate-pulse">[ PENDING_VERIFICATION ]</span>
                  )}
                </div>
              </div>

              <div className="space-y-2 font-jetbrains text-sm">
                <div className="flex justify-between">
                  <span className="text-ms-white-30">IGN:</span>
                  <span className="text-ms-white font-bold">{acc.ign}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ms-white-30">UID:</span>
                  <span className="text-ms-white font-bold">{acc.uid}</span>
                </div>
                {acc.verifiedAt && (
                  <div className="flex justify-between">
                    <span className="text-ms-white-30">SINCE:</span>
                    <span className="text-ms-white-60">{acc.verifiedAt}</span>
                  </div>
                )}
              </div>

              {/* Action Overlay on Hover */}
              <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity border border-[#333]">
                <button className="font-rajdhani font-bold text-xs tracking-widest text-ms-white hover:text-ms-blue transition-colors px-4 py-2 border border-[#333] bg-[#111]">
                  [UPDATE]
                </button>
                <button className="font-rajdhani font-bold text-xs tracking-widest text-ms-white hover:text-red-500 transition-colors px-4 py-2 border border-[#333] bg-[#111]">
                  [UNLINK]
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
