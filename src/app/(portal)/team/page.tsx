"use client";

import React, { useState, useEffect } from 'react';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { Shield, Copy, Users, CheckCircle2, Crown, LogOut, Settings, UserMinus, Link2, Swords } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { getUserSquads } from '@/actions/squad.actions';
import { CreateSquadModal } from '@/components/CreateSquadModal';

export default function MyTeamRosterPage() {
  const { user } = useAuth();
  const [squads, setSquads] = useState<any[]>([]);
  const [team, setTeam] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCaptain, setIsCaptain] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedSlotIdx, setCopiedSlotIdx] = useState<number | null>(null);

  const supabase = createClient();
  const inviteLink = team ? `https://ms.gg/invite/${team.tag}` : "";

  useEffect(() => {
    // If no real auth context, we will try to fetch the first team for demonstration 
    // or just show empty state if none exists.
    const fetchTeam = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const fetchedSquads = await getUserSquads(user.id);
        
        if (fetchedSquads && fetchedSquads.length > 0) {
          setSquads(fetchedSquads);
          
          // Auto-select first squad if no active squad is selected
          let activeSquad = team;
          if (!activeSquad || !fetchedSquads.find((s: any) => s.id === activeSquad.id)) {
            activeSquad = fetchedSquads[0];
            setTeam(activeSquad);
          } else {
             // Refresh active squad data
             activeSquad = fetchedSquads.find((s: any) => s.id === activeSquad.id);
             setTeam(activeSquad);
          }
          
          // Map SquadMembers to the format the UI expects
          const mappedPlayers = activeSquad.SquadMembers?.map((m: any) => ({
            id: m.id,
            userId: m.userId,
            ign: m.ign,
            role: m.role,
            isCaptain: m.role === 'Captain'
          })) || [];
          
          setPlayers(mappedPlayers);
          setIsCaptain(true); // Since getUserSquads currently filters by captainId
        } else {
          setSquads([]);
          setTeam(null);
          setPlayers([]);
        }
      } catch (err) {
        console.error("Error fetching squad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();

    const channel = supabase
      .channel('team_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Squads' }, () => fetchTeam())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'SquadMembers' }, () => fetchTeam())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySlot = (idx: number) => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedSlotIdx(idx);
    setTimeout(() => setCopiedSlotIdx(null), 2000);
  };

  // Ensure we show 5 slots
  const displayRoster = [...players];
  while (displayRoster.length < 5) {
    displayRoster.push({ isEmpty: true });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
         <div className="text-ms-white-60 font-orbitron animate-pulse uppercase tracking-widest">LOADING_ROSTER...</div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="text-ms-blue" size={28} />
            Current Roster
          </h1>
          <p className="text-ms-white-60 text-sm max-w-2xl">
            You are not currently part of any squad. Create a team or wait for an invite.
          </p>
        </div>

        <PremiumCard className="p-16 border-white/5 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
              <Users size={32} className="text-ms-white-30" />
            </div>
            <h3 className="text-xl font-rajdhani font-bold text-ms-white mb-2">No Active Squad</h3>
            <p className="text-ms-white-60 text-sm max-w-md mb-8">
              Join forces with other players to compete in premium tournaments.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setIsCreateModalOpen(true)} className="bg-ms-blue text-black px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(36,99,255,0.4)] transition-all">
                Create Squad
              </button>
              <Link href="/team/invites" className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors">
                View Invites
              </Link>
            </div>
        </PremiumCard>

        <CreateSquadModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onSuccess={() => {
            setIsCreateModalOpen(false);
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* Squad Switcher Nav */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 overflow-x-auto custom-scrollbar">
        <div className="flex gap-2 min-w-max">
          {squads.map(sq => (
            <button 
              key={sq.id} 
              onClick={() => {
                setTeam(sq);
                const mappedPlayers = sq.SquadMembers?.map((m: any) => ({
                  id: m.id,
                  userId: m.userId,
                  ign: m.ign,
                  role: m.role,
                  isCaptain: m.role === 'Captain'
                })) || [];
                setPlayers(mappedPlayers);
              }}
              className={`px-5 py-2.5 rounded-lg font-orbitron text-[11px] font-bold tracking-widest uppercase transition-all ${
                team.id === sq.id 
                  ? 'bg-ms-blue text-black shadow-[0_0_15px_rgba(36,99,255,0.4)]' 
                  : 'bg-white/5 text-ms-white-60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {sq.name}
              <span className="ml-2 opacity-60 font-jetbrains">({sq.game || 'Global'})</span>
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-transparent border border-ms-blue/30 text-ms-blue hover:bg-ms-blue/10 px-4 py-2.5 rounded-lg font-orbitron text-[10px] font-bold tracking-widest uppercase transition-colors shrink-0 ml-4 flex items-center gap-2"
        >
          + New Squad
        </button>
      </div>

      {/* FULL WIDTH BANNER */}
      <PremiumCard noPadding className="border-white/5 overflow-hidden relative">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 bg-[#050505] opacity-50 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-ms-blue/10 to-transparent pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-ms-blue via-transparent to-transparent opacity-50" />
        
        <div className="p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10 bg-[#0A0A0A]/40 backdrop-blur-sm">
          
          {/* Logo Hexagon/Square */}
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-ms-blue/40 to-ms-blue/5 p-[2px] shadow-[0_0_40px_rgba(36,99,255,0.2)] relative group shrink-0">
            <div className="absolute inset-0 bg-ms-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="w-full h-full bg-[#050505] rounded-3xl flex items-center justify-center relative z-10 border border-white/10">
              <Shield size={56} className="text-ms-blue drop-shadow-[0_0_15px_rgba(36,99,255,0.5)]" />
            </div>
          </div>
          
          {/* Team Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-5xl font-orbitron font-black text-white mb-4 uppercase tracking-wider drop-shadow-lg">{team.name}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="bg-ms-blue/10 text-ms-blue border border-ms-blue/30 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(36,99,255,0.15)] flex items-center gap-2">
                GAME <span className="w-1 h-1 bg-ms-blue rounded-full" /> {team.game || 'Global'}
              </span>
              <span className="bg-white/5 text-white border border-white/10 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                TAG <span className="w-1 h-1 bg-white/40 rounded-full" /> {team.tag}
              </span>
              <span className="text-ms-white-60 text-sm font-jetbrains flex items-center gap-2">
                <Users size={16} /> {players.filter(p => !p.isEmpty).length} / 5 ACTIVE
              </span>
            </div>
          </div>

          {/* Analytics / Stats (Placeholder for Pro Feel) */}
          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10 text-center md:text-left">
            <div>
              <div className="text-[10px] text-ms-white-60 font-bold uppercase tracking-widest mb-1">Win Rate</div>
              <div className="text-3xl font-orbitron font-bold text-ms-blue drop-shadow-[0_0_10px_rgba(36,99,255,0.3)]">68<span className="text-xl">%</span></div>
            </div>
            <div>
              <div className="text-[10px] text-ms-white-60 font-bold uppercase tracking-widest mb-1">Matches</div>
              <div className="text-3xl font-orbitron font-bold text-white">14</div>
            </div>
          </div>

        </div>
      </PremiumCard>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Col: Vertical Roster Grid (Takes 3 columns) */}
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-3">
               <span className="w-2 h-6 bg-ms-blue rounded-sm shadow-[0_0_10px_rgba(36,99,255,0.5)]" /> ACTIVE ROSTER
            </h3>
          </div>

          {/* Roster Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayRoster.map((player, idx) => (
              <PremiumCard 
                key={player.id || `empty-${idx}`} 
                noPadding
                className={`transition-all duration-300 relative group overflow-hidden h-64 flex flex-col ${
                  player.userId === user?.id 
                    ? 'border-ms-blue/50 bg-ms-blue/[0.03] shadow-[0_0_30px_rgba(36,99,255,0.08)]' 
                    : player.isEmpty 
                      ? 'border-white/10 border-dashed bg-transparent hover:border-ms-blue/50 hover:bg-ms-blue/[0.02] cursor-pointer hover:shadow-[0_0_30px_rgba(36,99,255,0.1)]' 
                      : 'border-[#1C1C1C] bg-[#0A0A0A]/60 backdrop-blur-md'
                }`}
              >
                {/* Clickable Overlay for Empty Slots */}
                {player.isEmpty && (
                  <div 
                    className="absolute inset-0 z-20 cursor-pointer" 
                    onClick={() => handleCopySlot(idx)}
                  />
                )}
                
                {/* Glowing Top Edge for Active Players */}
                {!player.isEmpty && (
                  <div className={`absolute top-0 left-0 w-full h-1 ${player.userId === user?.id ? 'bg-ms-blue shadow-[0_0_15px_rgba(36,99,255,0.8)]' : 'bg-white/20'}`} />
                )}

                {/* Diagonal Hologram Background for Empty Slots */}
                {player.isEmpty && (
                  <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ffffff_10px,#ffffff_11px)] group-hover:opacity-20 group-hover:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#2463FF_10px,#2463FF_11px)] transition-all duration-700" />
                )}
                
                <div className="p-6 flex flex-col h-full items-center justify-center text-center relative z-10">
                  
                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 mb-4 relative ${
                    player.userId === user?.id 
                      ? 'bg-ms-blue/20 border-ms-blue/50 text-ms-blue shadow-[0_0_20px_rgba(36,99,255,0.3)]' 
                      : player.isEmpty 
                        ? 'bg-black/50 border-white/10 text-ms-white-30 group-hover:text-ms-blue group-hover:border-ms-blue/50 group-hover:bg-ms-blue/10 scale-95 group-hover:scale-100'
                        : 'bg-[#111111] border-white/20 text-ms-white'
                  }`}>
                    {player.isEmpty ? <UserMinus size={32} /> : <span className="font-bold text-2xl">{(player.ign || 'P').substring(0, 2).toUpperCase()}</span>}
                    
                    {player.isCaptain && (
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#f59e0b] rounded-full flex items-center justify-center border-[3px] border-[#111111] shadow-[0_0_15px_rgba(245,158,11,0.6)] z-10">
                        <Crown size={14} className="text-black" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="w-full flex-1 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 mb-1 w-full">
                      <span className={`text-lg font-bold truncate px-2 ${player.isEmpty ? 'text-ms-white-30 font-orbitron tracking-widest group-hover:text-ms-blue transition-colors' : 'text-white font-orbitron tracking-wide'}`}>
                        {player.isEmpty ? (copiedSlotIdx === idx ? 'COPIED!' : 'INVITE PLAYER') : player.ign}
                      </span>
                    </div>
                    
                    {player.userId === user?.id && (
                      <span className="text-[10px] bg-ms-blue text-black px-2 py-0.5 rounded font-bold uppercase tracking-widest mb-2">You</span>
                    )}

                    <div className="text-xs text-ms-white-60 mt-auto">
                      {player.isEmpty ? (
                         <span className="font-jetbrains text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-ms-blue/80 bg-ms-blue/10 px-3 py-1 rounded-full border border-ms-blue/20">Click to copy link</span>
                      ) : (
                         <span className="font-jetbrains bg-white/5 px-3 py-1 rounded-full border border-white/5">Role: {player.role || 'Player'}</span>
                      )}
                    </div>
                  </div>

                </div>

                <div className={`mt-auto p-3 border-t border-white/5 flex items-center justify-center relative z-10 transition-colors ${player.isEmpty ? 'group-hover:bg-ms-blue/5 group-hover:border-ms-blue/20' : 'bg-black/20'}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${player.isEmpty ? 'text-ms-white-30 group-hover:text-ms-blue/80' : 'text-ms-blue'}`}>
                    {!player.isEmpty && <span className="w-1.5 h-1.5 rounded-full bg-ms-blue shadow-[0_0_8px_rgba(36,99,255,0.8)]" />}
                    {player.isEmpty ? (idx < 4 ? 'PLAYER' : 'SUBSTITUTE (OPTIONAL)') : (player.role || 'MEMBER').toUpperCase()}
                  </span>
                </div>

              </PremiumCard>
            ))}
          </div>

        </div>

        {/* Right Col: Action Panel */}
        <div className="xl:col-span-1 space-y-6">
          <PremiumCard className="p-6 border-white/5 sticky top-24">
            <h3 className="text-sm font-orbitron font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-widest pb-4 border-b border-white/10">
              <Swords className="text-ms-blue" size={18} /> Management
            </h3>

            {isCaptain ? (
              // Captain Actions
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-ms-white-60 font-bold uppercase tracking-widest block mb-2">Recruitment Link</span>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-3 py-3 text-ms-white font-jetbrains text-[11px] overflow-hidden text-ellipsis focus-within:border-ms-blue/50 focus-within:shadow-[0_0_10px_rgba(36,99,255,0.1)] transition-all">
                      {inviteLink}
                    </code>
                    <button 
                      onClick={handleCopy}
                      className="p-3 bg-ms-blue hover:bg-white text-black rounded-lg transition-all shrink-0 shadow-[0_0_15px_rgba(36,99,255,0.3)] hover:shadow-[0_0_20px_rgba(36,99,255,0.5)]"
                    >
                      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-ms-white-30 mt-2">Send this link to players to have them join your roster instantly.</p>
                </div>

                <div className="w-full h-px bg-white/5" />

                <div className="space-y-3">
                  <button onClick={() => alert("Edit roles coming soon!")} className="w-full bg-[#111111] hover:bg-white/[0.04] border border-white/10 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <Settings size={16} className="text-ms-white-60" /> Edit Roles
                  </button>
                  <button onClick={() => alert("Disband feature coming soon!")} className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                    <UserMinus size={16} /> Disband Team
                  </button>
                </div>
              </div>
            ) : (
              // Member Actions
              <div className="space-y-6">
                <div className="bg-[#111111] border border-white/5 rounded-xl p-6 text-center">
                  <Crown size={32} className="text-[#f59e0b] mx-auto mb-3 drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
                  <p className="text-sm text-ms-white-60 font-jetbrains">You are currently playing under team leadership.</p>
                </div>

                <div className="w-full h-px bg-white/5" />

                <button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  <LogOut size={16} /> Leave Team
                </button>
                <p className="text-[10px] text-ms-white-30 text-center">Leaving during an active tournament will incur a penalty.</p>
              </div>
            )}
          </PremiumCard>
        </div>

      </div>

      <CreateSquadModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={() => {
          setIsCreateModalOpen(false);
          // Let the realtime subscription catch the new squad, or we can reload
          window.location.reload(); 
        }}
      />
    </div>
  );
}
