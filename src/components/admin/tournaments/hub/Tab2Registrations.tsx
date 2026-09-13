"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export function Tab2Registrations({ tournament }: { tournament?: any }) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase.from('Teams').select('*');
      if (!error && data) {
        setTeams(data);
      }
      setLoading(false);
    };

    fetchTeams();

    const channel = supabase
      .channel('admin_teams_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Teams' }, () => fetchTeams())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const toggleRow = (id: string) => {
    if (expandedRow === id) setExpandedRow(null);
    else setExpandedRow(id);
  };

  return (
    <div className="space-y-6 text-xs font-jetbrains">
      
      {/* Cyber Filters & Bulk Actions */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-[#050505] border border-[#1C1C1C] p-4">
        
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-ms-white-40 mr-2 flex items-center font-bold tracking-widest uppercase text-[10px]">FILTER:</span>
          {['ALL', 'PENDING', 'APPROVED', 'WAITLISTED', 'PAID', 'UNPAID'].map(f => (
            <button key={f} className={`px-4 py-2 border transition-colors uppercase font-bold tracking-widest text-[10px] ${f === 'ALL' ? 'border-[#10b981] text-[#10b981] bg-[#10b981]/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 'border-[#1C1C1C] text-ms-white-60 hover:text-ms-white hover:border-[#333]'}`}>
              [{f}]
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 border border-[#10b981] bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981] hover:text-black transition-colors uppercase font-bold tracking-widest text-[10px] shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            [✓ APPROVE_ALL_PAID]
          </button>
          <button className="px-4 py-2 border border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black transition-colors uppercase font-bold tracking-widest text-[10px] shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            [✗ REJECT_UNPAID]
          </button>
          <button className="px-4 py-2 border border-[#333] text-ms-white hover:bg-[#111] transition-colors uppercase font-bold tracking-widest text-[10px]">
            [📤 EXPORT_CSV]
          </button>
          <button className="px-4 py-2 border border-[#333] text-ms-white hover:bg-[#111] transition-colors uppercase font-bold tracking-widest text-[10px]">
            [💬 BROADCAST]
          </button>
        </div>

      </div>

      {/* Main Table Container */}
      <div className="bg-[#050505] border border-[#1C1C1C] overflow-x-auto relative">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="border-b border-[#1C1C1C] bg-[#0A0A0A] text-ms-white-40 tracking-widest uppercase font-bold text-[10px]">
            <tr>
              <th className="p-4 border-r border-[#1C1C1C] font-normal w-12">#</th>
              <th className="p-4 border-r border-[#1C1C1C] font-normal">TEAM</th>
              <th className="p-4 border-r border-[#1C1C1C] font-normal">CAPTAIN</th>
              <th className="p-4 border-r border-[#1C1C1C] font-normal w-32 text-center">STATUS</th>
              <th className="p-4 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C1C1C]">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ms-white-60 font-orbitron animate-pulse tracking-widest uppercase">
                  LOADING_TEAMS...
                </td>
              </tr>
            ) : teams.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ms-white-40 font-mono tracking-widest uppercase">
                  No registrations found.
                </td>
              </tr>
            ) : teams.map((t, idx) => (
              <React.Fragment key={t.id}>
                <tr className="hover:bg-[#111] transition-colors group">
                  <td className="p-4 border-r border-[#1C1C1C] text-ms-white-40 font-orbitron">{idx + 1}</td>
                  <td className="p-4 border-r border-[#1C1C1C] text-ms-white font-bold font-orbitron">{t.name} <span className="text-ms-white-60 text-[10px]">[{t.tag}]</span></td>
                  <td className="p-4 border-r border-[#1C1C1C] text-ms-white-80 uppercase">{t.captainId?.substring(0, 8) || 'Unknown'}</td>
                  <td className="p-4 border-r border-[#1C1C1C] text-center">
                    <span className={`px-2 py-1 text-[10px] tracking-widest uppercase font-bold border ${
                      t.status === 'APPROVED' ? 'text-[#10b981] border-[#10b981]/50 bg-[#10b981]/10' :
                      (t.status === 'PENDING_APPROVAL' || t.status === 'PENDING') ? 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10' :
                      t.status === 'REJECTED' ? 'text-red-500 border-red-500/50 bg-red-500/10' :
                      'text-ms-white-60 border-[#333]'
                    }`}>
                      {t.status || 'UNKNOWN'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <button className="text-[#10b981] hover:text-[#10b981]/80 hover:shadow-[0_0_10px_rgba(16,185,129,0.5)] font-bold transition-all">[✓]</button>
                    <button className="text-red-500 hover:text-red-400 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] font-bold transition-all">[✗]</button>
                    <button className="text-yellow-500 hover:text-yellow-400 hover:shadow-[0_0_10px_rgba(234,179,8,0.5)] font-bold transition-all">[↓]</button>
                    <button onClick={() => toggleRow(t.id)} className="text-blue-500 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] font-bold tracking-widest text-[10px] uppercase transition-all">[👁 VIEW]</button>
                  </td>
                </tr>

                {/* EXPANDABLE TEAM DETAIL MODAL INLINE */}
                {expandedRow === t.id && (
                  <tr className="bg-[#0A0A0A]">
                    <td colSpan={5} className="p-0 border-b-2 border-blue-500">
                      <div className="p-8 border-l-4 border-blue-500 flex gap-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 blur-[50px] pointer-events-none"></div>
                        
                        {/* Column 1 */}
                        <div className="space-y-6 flex-1 z-10">
                          <div>
                            <span className="text-ms-white-40 uppercase block mb-2 tracking-widest text-[10px] font-bold"><span className="text-blue-500">{'>'}</span> TEAM_DETAILS</span>
                            <div className="text-ms-white font-bold font-orbitron text-xl">{t.name} <span className="text-ms-white-40 font-jetbrains text-sm">[{t.id}]</span></div>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6 flex-1 z-10">
                          <div>
                            <span className="text-ms-white-40 uppercase block mb-2 tracking-widest text-[10px] font-bold"><span className="text-blue-500">{'>'}</span> ADMIN_NOTES</span>
                            <textarea className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white outline-none focus:border-blue-500 custom-scrollbar uppercase tracking-widest text-[10px]" rows={2} defaultValue="No notes available."></textarea>
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
