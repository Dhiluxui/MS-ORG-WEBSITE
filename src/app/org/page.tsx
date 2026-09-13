"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function OrgDashboardPage() {
  const [activeTournaments, setActiveTournaments] = useState<any[]>([]);
  const [totalTeams, setTotalTeams] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch active tournaments
      const { data: trns } = await supabase
        .from('Tournaments')
        .select('*')
        .in('status', ['LIVE', 'REGISTRATION', 'UPCOMING'])
        .order('startDate', { ascending: false })
        .limit(5);
      
      setActiveTournaments(trns || []);

      // Fetch total teams
      const { count } = await supabase
        .from('Teams')
        .select('*', { count: 'exact', head: true });
        
      setTotalTeams(count || 0);
      setLoading(false);
    };

    fetchData();

    // Real-time subscriptions
    const channel = supabase
      .channel('org_dashboard_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Tournaments' }, () => {
        fetchData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Teams' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="border-b border-[#1C1C1C] pb-6">
        <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
          // HOST_OVERVIEW
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
            ORG <span className="text-[#10b981]">COMMAND_CENTER</span>
          </h1>
        </div>
        <p className="font-jetbrains text-[#10b981] text-xs mt-2 opacity-80 max-w-lg tracking-widest">
          GLOBAL OVERVIEW OF YOUR ACTIVE OPERATIONS, HOSTED TOURNAMENTS, AND REVENUE.
        </p>
      </div>

      {/* KPI Stats Row (Rigid Monospace Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'ACTIVE_EVENTS', value: loading ? '...' : activeTournaments.length.toString(), color: 'text-ms-white' },
          { label: 'TOTAL_TEAMS', value: loading ? '...' : totalTeams.toString(), color: 'text-[#10b981]' },
        ].map((stat, idx) => (
          <div key={idx} className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md p-4 relative overflow-hidden group hover:border-[#10b981]/50 transition-colors">
            <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-[#1C1C1C] bg-[#0A0A0A]" />
            <div className="text-[10px] font-courier text-ms-white-60 uppercase mb-4 tracking-widest group-hover:text-[#10b981] transition-colors">
              {'>'} {stat.label}
            </div>
            <div className={`font-jetbrains text-3xl font-bold tracking-widest ${stat.color}`}>
              [{stat.value}]
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md">
            <div className="border-b border-[#1C1C1C] p-4 bg-transparent">
              <h2 className="font-jetbrains font-bold text-xs text-[#10b981] tracking-widest">
                [ MY_ACTIVE_TOURNAMENTS ]
              </h2>
            </div>
            
            <div className="flex flex-col">
              {loading ? (
                <div className="p-4 text-center font-jetbrains text-xs text-ms-white-60 animate-pulse">LOADING_DATA...</div>
              ) : activeTournaments.length === 0 ? (
                <div className="p-4 text-center font-jetbrains text-xs text-ms-white-60">NO_ACTIVE_EVENTS</div>
              ) : activeTournaments.map((trn) => (
                <div key={trn.id} className="p-4 border-b border-[#1C1C1C] flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer">
                  <div>
                    <div className="font-jetbrains text-xs text-ms-white group-hover:text-[#10b981] transition-colors font-bold tracking-widest mb-1">
                      {trn.name}
                    </div>
                    <div className="font-courier text-[10px] text-ms-white-60 tracking-widest">
                      ID: {trn.id.substring(0, 8)} | {trn.game} • {trn.format}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-jetbrains text-xs font-bold tracking-widest mb-1 ${trn.status === 'LIVE' ? 'text-red-500 animate-pulse' : 'text-[#10b981]'}`}>
                      [{trn.status}]
                    </div>
                    <div className="font-courier text-[10px] text-ms-white-60 tracking-widest">
                      SLOTS: --/--
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/org/tournaments" className="p-4 font-jetbrains text-[10px] text-ms-white-30 hover:text-[#10b981] hover:bg-white/5 transition-colors text-center tracking-widest block">
                [ VIEW_ALL_EVENTS → ]
              </Link>
            </div>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md">
            <div className="border-b border-[#1C1C1C] p-4 bg-transparent">
              <h2 className="font-jetbrains font-bold text-xs text-[#10b981] tracking-widest">
                [ QUICK_ACTIONS ]
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <Link href="/org/tournaments/create" className="font-jetbrains text-xs font-bold text-[#000] bg-[#10b981] border border-[#10b981] hover:bg-[#10b981]/80 p-3 transition-colors tracking-widest text-center">
                {'>'} HOST_NEW_EVENT
              </Link>
              <Link href="/org/support" className="font-jetbrains text-xs font-bold text-ms-white bg-[#0A0A0A] border border-[#1C1C1C] hover:bg-white/5 hover:border-[#10b981]/50 p-3 transition-colors tracking-widest text-center">
                {'>'} CONTACT_ADMIN
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
