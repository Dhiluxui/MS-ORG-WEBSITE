"use client";

import React, { useEffect, useState } from 'react';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { Trophy, Users, Shield, Zap, ChevronRight, Activity, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

export default function PremiumDashboard() {
  const { user, dbUser, isLoading: isAuthLoading } = useAuth();
  const [team, setTeam] = useState<any>(null);
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!dbUser || !dbUser.discord_username) {
        setIsLoading(false);
        return;
      }

      const supabase = createClient();
      const username = dbUser.discord_username;

      try {
        const { data: teamData } = await supabase
          .from('teams')
          .select('*')
          .eq('captain_discord', username)
          .single();

        if (teamData) {
          setTeam(teamData);
          const { data: tourneyData } = await supabase
            .from('tournaments')
            .select('*')
            .eq('id', teamData.tournament_id);

          if (tourneyData) {
            setTournaments(tourneyData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!isAuthLoading) {
      fetchDashboardData();
    }
  }, [dbUser, isAuthLoading]);

  if (isAuthLoading || isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#0099ff] border-t-transparent animate-spin" />
          <span className="text-ms-white-60 text-sm font-medium">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  const username = dbUser?.discord_username || user?.user_metadata?.custom_claims?.global_name || user?.email?.split('@')[0] || 'Striker';
  const liveTournaments = tournaments.filter(t => t.status === 'live');
  const upcomingTournaments = tournaments.filter(t => t.status !== 'live');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      
      {/* Page Header (Minimal) */}
      <div>
        <h1 className="text-3xl font-semibold text-ms-white mb-2">Welcome back, {username}</h1>
        <p className="text-ms-white-60 text-sm">Here is what's happening with your squads and tournaments today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Feed / Active Deployments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">Active Deployments</h2>
            <Link href="/compete/browse" className="text-sm text-[#0099ff] hover:text-[#33adff] transition-colors font-medium">
              See all
            </Link>
          </div>

          {tournaments.length === 0 ? (
            <PremiumCard noPadding className="border-dashed border-white/10 bg-transparent hover:bg-white/[0.02]">
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <Trophy size={40} className="text-ms-white-30 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Active Deployments</h3>
                <p className="text-ms-white-60 text-sm mb-6 max-w-sm">
                  You are not currently registered for any tournaments. Browse the available tournaments to begin.
                </p>
                <Link href="/compete/browse" className="btn-primary-glow">
                  Browse Tournaments
                </Link>
              </div>
            </PremiumCard>
          ) : (
            <div className="space-y-4">
              {liveTournaments.map(t => (
                <PremiumCard key={t.id} noPadding>
                  <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                    <div className="w-full sm:w-32 h-24 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-white/5 flex-shrink-0">
                      <Trophy size={32} className="text-ms-white-30" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-st-red/10 text-st-red text-[11px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-st-red animate-pulse" />
                          Live Match
                        </span>
                        <span className="text-ms-white-60 text-xs">Group Stage</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">{t.name}</h3>
                      <p className="text-ms-white-60 text-sm mb-4">{t.game} • {t.format}</p>
                      <div className="flex gap-3">
                        <button className="btn-primary-glow py-1.5 px-4 text-xs">Enter Lobby</button>
                        <button className="bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-1.5 rounded-full transition-colors text-xs border border-white/10">Bracket</button>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              ))}

              {upcomingTournaments.map(t => (
                <PremiumCard key={t.id} noPadding>
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <Calendar size={18} className="text-ms-white-60" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">{t.name}</h3>
                        <p className="text-ms-white-60 text-xs mt-0.5">Registration Confirmed • Awaiting Brackets</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-ms-white-30" />
                  </div>
                </PremiumCard>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Squad & Stats */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white">My Squad</h2>
          </div>

          {team ? (
            <PremiumCard>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-white text-lg">{team.team_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-st-green" />
                    <span className="text-ms-white-60 text-xs capitalize">{team.payment_status}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Shield size={16} className="text-ms-white-90" />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/10 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${team.captain_discord}`} alt="Captain" />
                    </div>
                    <span className="text-white text-sm font-medium">{team.captain_discord}</span>
                  </div>
                  <span className="text-ms-white-30 text-xs bg-white/5 px-2 py-0.5 rounded">IGL</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 border-dashed">
                  <span className="text-ms-white-60 text-sm ml-9 italic">Empty Slot</span>
                  <button className="text-[#0099ff] hover:text-[#33adff] text-xs font-medium px-2 py-0.5 transition-colors">
                    + Invite
                  </button>
                </div>
              </div>

              <Link href="/team" className="block w-full py-2 rounded-full border border-white/10 text-center text-sm font-medium text-white hover:bg-white/5 transition-colors">
                Manage Roster
              </Link>
            </PremiumCard>
          ) : (
            <PremiumCard>
              <div className="flex flex-col items-center justify-center text-center py-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Users size={20} className="text-ms-white-60" />
                </div>
                <h3 className="font-semibold text-white mb-2">No Active Squad</h3>
                <p className="text-ms-white-60 text-sm mb-6 px-4">You need a squad to register for most tournaments.</p>
                <Link href="/team" className="btn-primary-glow w-full text-center">
                  Create Squad
                </Link>
              </div>
            </PremiumCard>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <PremiumCard noPadding>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={14} className="text-ms-white-60" />
                  <span className="text-xs text-ms-white-60 font-medium">Win Rate</span>
                </div>
                <div className="text-2xl font-semibold text-white">--%</div>
              </div>
            </PremiumCard>
            <PremiumCard noPadding>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-[#0099ff]" />
                  <span className="text-xs text-ms-white-60 font-medium">Global Rank</span>
                </div>
                <div className="text-2xl font-semibold text-white">N/A</div>
              </div>
            </PremiumCard>
          </div>
        </div>

      </div>
    </div>
  );
}
