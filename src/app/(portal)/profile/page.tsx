"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Target, Crosshair, Award, Clock, ChevronRight } from 'lucide-react';

export default function ProfileOverviewPage() {
  const { user, dbUser } = useAuth();
  const username = dbUser?.discord_username || user?.user_metadata?.custom_claims?.global_name || user?.email?.split('@')[0] || 'Striker_01';

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Hero Banner Section */}
      <div className="relative border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md rounded-xl overflow-hidden group">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FFF 10px, #FFF 20px)' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10b981] opacity-[0.05] blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-[#0A0A0A] border-2 border-[#10b981]/30 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] flex-shrink-0 group-hover:border-[#10b981] transition-colors">
            <span className="font-orbitron text-5xl font-bold text-ms-white">{username.substring(0, 2).toUpperCase()}</span>
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-[#10b981] border-2 border-[#050505] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
              <span className="bg-[#10b981]/10 text-[#10b981] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-[#10b981]/20">Pro Player</span>
              <span className="bg-white/5 text-ms-white-60 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">Level 42</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white tracking-wide">{username}</h1>
            <p className="text-ms-white-60 text-sm font-medium">Joined January 2026 • India Region</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto mt-6 md:mt-0">
            <Link href="/profile/edit" className="flex-1 md:flex-none text-center px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-all">
              Edit Profile
            </Link>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tournaments Won', value: '12', icon: <Trophy size={20} className="text-yellow-500" /> },
          { label: 'Matches Played', value: '348', icon: <Target size={20} className="text-[#10b981]" /> },
          { label: 'Win Rate', value: '64.5%', icon: <Award size={20} className="text-purple-500" /> },
          { label: 'K/D Ratio', value: '2.84', icon: <Crosshair size={20} className="text-red-500" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A0A0A]/50 backdrop-blur-md border border-[#1C1C1C] rounded-xl p-5 hover:border-[#10b981]/30 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-xs text-ms-white-60 font-medium uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-3xl font-orbitron font-bold text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Matches */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Matches</h2>
            <Link href="/profile/history" className="text-sm text-[#10b981] hover:text-white transition-colors flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {[
              { game: 'BGMI', tournament: 'Winter Clash 2026', result: 'VICTORY', score: '1st Place (14 Kills)', date: '2 hrs ago', color: 'text-ms-blue', bg: 'bg-ms-blue-dim', border: 'border-ms-blue/20' },
              { game: 'Free Fire MAX', tournament: 'Weekly Scrims', result: 'DEFEAT', score: '8th Place (2 Kills)', date: 'Yesterday', color: 'text-ms-white-60', bg: 'bg-ms-white-10', border: 'border-ms-white-30' },
              { game: 'BGMI', tournament: 'Pro League Qualifiers', result: 'VICTORY', score: '3rd Place (8 Kills)', date: '3 days ago', color: 'text-ms-blue', bg: 'bg-ms-blue-dim', border: 'border-ms-blue/20' },
            ].map((match, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#0A0A0A]/50 backdrop-blur-md border border-[#1C1C1C] rounded-xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-orbitron font-bold ${match.bg} ${match.color} ${match.border} border`}>
                    {match.game.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{match.tournament}</h4>
                    <p className="text-xs text-ms-white-60 mt-0.5">{match.game} • {match.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-sm ${match.color}`}>{match.result}</div>
                  <div className="text-xs text-ms-white-60 mt-0.5">{match.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Teams & Badges */}
        <div className="space-y-8">
          
          {/* Teams */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">My Squads</h2>
            <div className="p-5 bg-[#0A0A0A]/50 backdrop-blur-md border border-[#1C1C1C] rounded-xl hover:border-[#10b981]/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-xl font-orbitron font-bold text-white group-hover:text-[#10b981] transition-colors">
                  IG
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Ignite Gaming</h4>
                  <p className="text-xs text-[#10b981] mt-0.5 font-medium">Team Captain</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-ms-white-60 border-t border-white/5 pt-3">
                <span>4 Members</span>
                <span>BGMI Roster</span>
              </div>
            </div>
            
            <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-sm font-medium text-ms-white-60 hover:text-white hover:border-[#10b981] hover:bg-[#10b981]/5 transition-all">
              + Join or Create Squad
            </button>
          </div>

          {/* Badges */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Achievements</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Beta Tester', color: 'text-ms-white-60', bg: 'bg-ms-white-10', border: 'border-ms-white-30' },
                { name: 'Champion', color: 'text-ms-white', bg: 'bg-ms-white-10', border: 'border-ms-white-30' },
                { name: '100 Kills', color: 'text-ms-blue', bg: 'bg-ms-blue-dim', border: 'border-ms-blue/20' },
                { name: 'Verified', color: 'text-ms-blue', bg: 'bg-ms-blue-dim', border: 'border-ms-blue/20' },
                { name: 'Early Adopter', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
              ].map((badge, i) => (
                <div key={i} className={`aspect-square flex flex-col items-center justify-center p-2 rounded-xl border ${badge.bg} ${badge.border} text-center group cursor-help`} title={badge.name}>
                  <Award className={`${badge.color} mb-1 group-hover:scale-110 transition-transform`} size={24} />
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${badge.color} leading-tight`}>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
