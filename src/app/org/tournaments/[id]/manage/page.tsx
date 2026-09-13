"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function TournamentManagePage({ params }: { params: { id: string } }) {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchRegistrations = async () => {
      // Assuming Teams table links to tournament via tournamentId
      const { data, error } = await supabase
        .from('Teams')
        .select('*')
        .eq('tournamentId', params.id);
        
      if (!error && data) {
        setRegistrations(data);
      }
      setLoading(false);
    };

    fetchRegistrations();

    const channel = supabase
      .channel(`tournament_${params.id}_teams`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Teams', filter: `tournamentId=eq.${params.id}` }, () => {
        fetchRegistrations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.id, supabase]);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1C1C1C] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
            // TOURNAMENT_HUB :: {params.id}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
            <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
              MANAGE <span className="text-[#10b981]">EVENT</span>
            </h1>
          </div>
        </div>
        <Link href="/org/tournaments" className="font-jetbrains text-xs font-bold text-[#10b981] border border-[#1C1C1C] px-6 py-3 hover:text-ms-white hover:bg-white/5 transition-colors">
          [ ABORT / RETURN ]
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Registration Table */}
        <div className="lg:col-span-2 border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md overflow-x-auto custom-scrollbar relative">
          <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
               style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #10b981 1px, #10b981 2px)' }} />

          <div className="p-4 border-b border-[#1C1C1C] bg-white/5">
            <h2 className="font-jetbrains font-bold text-xs text-ms-white tracking-widest">
              [ PENDING_REGISTRATIONS ]
            </h2>
          </div>

          <div className="flex flex-col min-w-[600px] relative z-10">
            {loading ? (
              <div className="p-8 text-center font-jetbrains text-xs text-ms-white-60 animate-pulse">LOADING_DATA...</div>
            ) : registrations.length === 0 ? (
              <div className="p-8 text-center font-jetbrains text-xs text-ms-white-60">NO_REGISTRATIONS_FOUND</div>
            ) : registrations.map((reg) => (
              <div key={reg.id} className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] hover:bg-white/5 transition-colors font-jetbrains text-xs text-ms-white cursor-default">
                <div className="w-24 font-bold text-ms-white-60">[{reg.id.substring(0, 8)}]</div>
                <div className="flex-1 font-bold text-ms-white">{reg.name}</div>
                <div className="w-24 font-courier text-[10px] text-ms-white-60">{new Date(reg.createdAt).toLocaleDateString()}</div>
                
                <div className="w-24 text-right">
                  {reg.status === 'APPROVED' ? (
                    <span className="text-[#10b981]">[ APPROVED ]</span>
                  ) : (
                    <button className="text-[#10b981] hover:text-[#000] border border-[#10b981] px-2 py-1 transition-colors hover:bg-[#10b981]">
                      [ APPROVE ]
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Match Hub / Control Panel */}
        <div className="space-y-6">
          <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md">
            <div className="border-b border-[#1C1C1C] p-4 bg-white/5">
              <h2 className="font-jetbrains font-bold text-xs text-ms-white tracking-widest">
                [ LIVE_MATCH_HUB ]
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <p className="font-courier text-[10px] text-[#10b981] opacity-80 uppercase tracking-widest">
                DISTRIBUTE CUSTOM ROOM DETAILS SECURELY TO APPROVED TEAMS.
              </p>
              
              <div className="space-y-2">
                <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                  {'>'} ROOM_ID
                </label>
                <input type="text" placeholder="e.g. 5598212" className="w-full bg-[#050505] border border-[#333] p-2 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all" />
              </div>

              <div className="space-y-2">
                <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                  {'>'} PASSWORD
                </label>
                <input type="text" placeholder="e.g. MSCLASH26" className="w-full bg-[#050505] border border-[#333] p-2 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all" />
              </div>

              <button className="w-full font-jetbrains text-xs font-bold text-[#000] bg-[#10b981] hover:bg-[#10b981]/80 transition-colors p-3 mt-2">
                [ BROADCAST_TO_TEAMS ]
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
