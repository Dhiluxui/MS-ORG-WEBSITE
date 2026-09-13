"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function OrgTournamentsPage() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data, error } = await supabase
        .from('Tournaments')
        .select('*')
        .order('startDate', { ascending: false });
        
      if (!error && data) {
        setTournaments(data);
      }
      setLoading(false);
    };

    fetchTournaments();

    const channel = supabase
      .channel('tournaments_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Tournaments' }, () => {
        fetchTournaments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1C1C1C] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
            // ACTIVE_EVENTS_HUB
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
            <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
              MY <span className="text-[#10b981]">TOURNAMENTS</span>
            </h1>
          </div>
          <p className="font-jetbrains text-[#10b981] text-xs mt-2 opacity-80 max-w-lg tracking-widest">
            MANAGE ALL ACTIVE, PENDING, AND COMPLETED TOURNAMENTS.
          </p>
        </div>
        <Link href="/org/tournaments/create" className="font-jetbrains text-xs font-bold text-[#000] bg-[#10b981] px-6 py-3 hover:bg-[#10b981]/80 transition-colors">
          {'>'} HOST_NEW_EVENT
        </Link>
      </div>

      {/* ASCII Table */}
      <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md overflow-x-auto custom-scrollbar relative mt-8">
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #10b981 1px, #10b981 2px)' }} />

        <div className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] font-courier text-[10px] text-[#10b981] uppercase tracking-widest min-w-[800px] relative z-10">
          <div className="w-24">TRN_ID</div>
          <div className="flex-1">EVENT_NAME</div>
          <div className="w-24">GAME</div>
          <div className="w-24 text-center">TEAMS</div>
          <div className="w-32 text-right">STATUS</div>
          <div className="w-24 text-right">ACTIONS</div>
        </div>

        <div className="flex flex-col min-w-[800px] relative z-10">
          {loading ? (
             <div className="p-8 text-center font-jetbrains text-xs text-ms-white-60 animate-pulse">LOADING_DATA...</div>
          ) : tournaments.length === 0 ? (
             <div className="p-8 text-center font-jetbrains text-xs text-ms-white-60">NO_TOURNAMENTS_FOUND</div>
          ) : tournaments.map((trn) => (
            <div key={trn.id} className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] hover:bg-white/5 transition-colors font-jetbrains text-xs text-ms-white cursor-pointer group">
              <div className="w-24 font-bold text-ms-white-60">[{trn.id.substring(0, 8)}]</div>
              <div className="flex-1 font-bold group-hover:text-[#10b981] transition-colors truncate pr-4">{trn.name}</div>
              <div className="w-24 font-courier text-[10px] text-ms-white-60">{trn.game}</div>
              <div className="w-24 text-center">--/--</div>
              
              <div className="w-32 text-right">
                {(trn.status === 'REGISTRATION' || trn.status === 'UPCOMING') && <span className="text-[#f59e0b]">[ PRE_LIVE ]</span>}
                {trn.status === 'LIVE' && <span className="text-red-500 animate-pulse">[ 🔴 LIVE ]</span>}
                {trn.status === 'COMPLETED' && <span className="text-ms-white-30">[ ARCHIVED ]</span>}
              </div>

              <div className="w-24 text-right">
                <Link href={`/org/tournaments/${trn.id}/manage`} className="text-ms-white-30 hover:text-ms-white font-bold transition-colors">
                  [MANAGE]
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
