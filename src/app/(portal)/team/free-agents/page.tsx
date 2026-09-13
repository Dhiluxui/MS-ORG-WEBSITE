"use client";

import React, { useState, useEffect } from 'react';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { SearchCheck, Filter, Search, ChevronDown, UserPlus, Target, Trophy } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function FreeAgentBoard() {
  const [isLft, setIsLft] = useState(false);
  const [filterGame, setFilterGame] = useState('All Games');
  const [filterRole, setFilterRole] = useState('All Roles');
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchAgents = async () => {
      const { data, error } = await supabase.from('free_agents').select('*');
      if (!error && data) {
        setAgents(data);
      }
      setLoading(false);
    };

    fetchAgents();

    const channel = supabase
      .channel('free_agents_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'free_agents' }, () => fetchAgents())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header & LFT Toggle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white mb-2 uppercase tracking-wide flex items-center gap-3">
            <SearchCheck className="text-ms-blue" size={28} />
            Free Agent Board
          </h1>
          <p className="text-ms-white-60 text-sm max-w-2xl">
            The official marketplace to scout unassigned players or list yourself to get recruited by top organizations.
          </p>
        </div>

        {/* Stylized LFT Toggle */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-6 shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div>
            <span className="text-sm font-bold text-ms-white block">Looking For Team (LFT)</span>
            <span className="text-[10px] text-ms-white-60 uppercase tracking-widest block mt-0.5">Toggle to list yourself</span>
          </div>
          
          <button 
            onClick={() => setIsLft(!isLft)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isLft ? 'bg-ms-blue' : 'bg-white/10'}`}
          >
            <div className={`absolute top-1 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
              isLft ? 'left-[34px] bg-white shadow-[0_0_10px_rgba(36,99,255,0.8)]' : 'left-1 bg-ms-white-60'
            }`}>
              {isLft && <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
            </div>
          </button>
        </div>
      </div>

      <PremiumCard className="p-0 border-white/5 overflow-hidden">
        
        {/* Filters Bar */}
        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-ms-white-30" size={14} />
              <select 
                value={filterGame}
                onChange={(e) => setFilterGame(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 text-ms-white text-xs rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none focus:border-ms-blue/50"
              >
                <option>All Games</option>
                <option>Free Fire MAX</option>
                <option>BGMI</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-ms-white-30 pointer-events-none" size={14} />
            </div>
            
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-ms-white-30" size={14} />
              <select 
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full bg-[#111111] border border-white/10 text-ms-white text-xs rounded-lg pl-9 pr-8 py-2.5 appearance-none focus:outline-none focus:border-ms-blue/50"
              >
                <option>All Roles</option>
                <option>IGL / Captain</option>
                <option>Assaulter</option>
                <option>Sniper</option>
                <option>Support</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-ms-white-30 pointer-events-none" size={14} />
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ms-white-30" size={14} />
            <input 
              type="text" 
              placeholder="Search player name..." 
              className="w-full bg-[#111111] border border-white/10 text-ms-white text-xs rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-ms-blue/50"
            />
          </div>
        </div>

        {/* Agent Grid */}
        <div className="p-6">
          {loading ? (
            <div className="p-8 text-center text-ms-white-60 font-orbitron animate-pulse tracking-widest uppercase">
              LOADING_AGENTS...
            </div>
          ) : agents.length === 0 ? (
             <div className="p-8 text-center text-ms-white-40 font-mono tracking-widest uppercase">
              No free agents listed at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center font-bold text-ms-white">
                        {(agent.name || 'PL').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-ms-white truncate max-w-[120px]">{agent.name || 'Player'}</h3>
                        <span className="text-[10px] font-bold text-ms-blue uppercase tracking-widest bg-ms-blue/10 px-2 py-0.5 rounded border border-ms-blue/20">
                          {agent.game || 'Unknown Game'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-[10px] text-ms-white-90 bg-white/10 px-2 py-1 rounded font-bold uppercase tracking-widest">
                      {agent.role || 'Player'}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="bg-[#09090b] rounded-lg p-2 text-center border border-white/5">
                      <Target size={12} className="text-ms-white-30 mx-auto mb-1" />
                      <span className="text-[10px] text-ms-white-60 uppercase block">K/D</span>
                      <span className="font-jetbrains text-ms-white font-bold text-sm">{(agent.kd || 0).toFixed(1)}</span>
                    </div>
                    <div className="bg-[#09090b] rounded-lg p-2 text-center border border-white/5">
                      <Trophy size={12} className="text-[#f59e0b]/50 mx-auto mb-1" />
                      <span className="text-[10px] text-ms-white-60 uppercase block">Win %</span>
                      <span className="font-jetbrains text-[#f59e0b] font-bold text-sm">{agent.winRate || '0%'}</span>
                    </div>
                    <div className="bg-[#09090b] rounded-lg p-2 text-center border border-white/5">
                      <SearchCheck size={12} className="text-ms-white-30 mx-auto mb-1" />
                      <span className="text-[10px] text-ms-white-60 uppercase block">Matches</span>
                      <span className="font-jetbrains text-ms-white font-bold text-sm">{agent.matches || 0}</span>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-ms-blue/10 hover:bg-ms-blue text-ms-blue hover:text-white border border-ms-blue/30 py-2.5 rounded-lg text-sm font-semibold transition-all group-hover:shadow-[0_0_15px_rgba(36,99,255,0.3)]">
                    <UserPlus size={16} /> Send Invite
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>
      </PremiumCard>

    </div>
  );
}
