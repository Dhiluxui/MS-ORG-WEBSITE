"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createTournament } from '@/actions/tournament.actions';

export default function CreateTournamentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    game: 'BATTLEGROUNDS MOBILE INDIA (BGMI)',
    format: 'SQUAD (4v4)',
    maxSlots: 100
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await createTournament({
      name: formData.name,
      game: formData.game,
      format: formData.format,
      startDate: new Date(), // using current date for now, would normally have a date picker
    });

    if (result.success) {
      router.push('/org/tournaments');
    } else {
      console.error(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1C1C1C] pb-6">
        <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
          {'>'} EXECUTE :: INIT_NEW_TOURNAMENT
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
            HOST <span className="text-[#10b981]">NEW EVENT</span>
          </h1>
        </div>
      </div>

      {/* Terminal Form */}
      <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md p-6 md:p-8 relative">
        <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-[#1C1C1C] bg-[#0A0A0A]" />
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          
          <div className="space-y-2">
            <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
              {'>'} EVENT_TITLE
            </label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. BIHAR INVITATIONAL 2026" 
              className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all placeholder:text-[#333]" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                {'>'} GAME_IDENTIFIER
              </label>
              <select 
                value={formData.game}
                onChange={(e) => setFormData({...formData, game: e.target.value})}
                className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
              >
                <option>BATTLEGROUNDS MOBILE INDIA (BGMI)</option>
                <option>FREE FIRE MAX</option>
                <option>CALL OF DUTY MOBILE</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                {'>'} SQUAD_FORMAT
              </label>
              <select 
                value={formData.format}
                onChange={(e) => setFormData({...formData, format: e.target.value})}
                className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all"
              >
                <option>SQUAD (4v4)</option>
                <option>DUO (2v2)</option>
                <option>SOLO (1v1)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
              {'>'} MAX_SLOTS
            </label>
            <input 
              type="number" 
              required
              min={2}
              value={formData.maxSlots}
              onChange={(e) => setFormData({...formData, maxSlots: parseInt(e.target.value)})}
              placeholder="e.g. 100" 
              className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all placeholder:text-[#333]" 
            />
          </div>

          <div className="pt-6 border-t border-[#1C1C1C] flex justify-end gap-4">
            <Link href="/org/tournaments" className="px-6 py-3 font-jetbrains text-xs font-bold text-ms-white-60 border border-[#333] hover:text-[#10b981] hover:border-[#10b981] transition-colors">
              [ ABORT ]
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-3 font-jetbrains text-xs font-bold text-[#000] bg-[#10b981] hover:bg-[#10b981]/80 transition-colors disabled:opacity-50"
            >
              {loading ? '[ PROCESSING... ]' : '[ INITIALIZE_EVENT ]'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
