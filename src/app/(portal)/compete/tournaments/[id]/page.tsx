"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getTournamentById } from '@/actions/tournament.actions';
import { ArrowLeft, Users, Trophy, DollarSign, Calendar, Clock, Shield, Gamepad2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RegistrationModal from '@/components/RegistrationModal';

function TournamentDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id as string;
  const { user } = useAuth();
  
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'RULES' | 'TEAMS'>('OVERVIEW');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    async function fetchDetails() {
      if (!tournamentId) return;
      const data = await getTournamentById(tournamentId);
      setTournament(data);
      setLoading(false);
    }
    fetchDetails();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-ms-blue font-orbitron animate-pulse text-xl tracking-widest">LOADING_TOURNAMENT_DATA...</div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
        <div className="text-red-500 font-orbitron text-2xl tracking-widest">TOURNAMENT_NOT_FOUND</div>
        <Link href="/compete/browse" className="text-ms-white-60 hover:text-ms-blue font-jetbrains underline flex items-center gap-2">
          <ArrowLeft size={16} /> RETURN_TO_BROWSE
        </Link>
      </div>
    );
  }

  const filledSlots = tournament.Teams ? tournament.Teams.length : 0;
  const isRegistrationOpen = tournament.status === 'PUBLISHED' || tournament.status === 'REGISTERING';

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Back Button */}
      <button onClick={() => router.push('/compete/browse')} className="flex items-center gap-2 text-ms-white-60 hover:text-ms-blue transition-colors font-jetbrains text-sm uppercase tracking-widest">
        <ArrowLeft size={16} />
        BACK TO BROWSE
      </button>

      {/* Hero Banner */}
      <div className="relative border border-[#1C1C1C] bg-[#0A0A0A] overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {/* Background Image / Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
          <img 
            src={`https://placehold.co/1200x400/0a0a0a/222222?text=${tournament.game.replace(' ', '+')}`}
            alt="Tournament Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6 min-h-[300px]">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${tournament.status === 'LIVE' ? 'bg-red-500' : 'bg-ms-blue'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${tournament.status === 'LIVE' ? 'bg-red-500' : 'bg-ms-blue'}`}></span>
              </span>
              <span className="font-jetbrains text-xs uppercase font-bold tracking-widest text-ms-white drop-shadow-md">
                {tournament.status}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-ms-white drop-shadow-lg uppercase leading-tight">
              {tournament.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-ms-white-60 font-jetbrains text-sm uppercase tracking-wide">
              <div className="flex items-center gap-2"><Gamepad2 size={16} className="text-ms-blue" /> {tournament.game}</div>
              <div className="flex items-center gap-2"><Users size={16} className="text-ms-blue" /> {tournament.format}</div>
              <div className="flex items-center gap-2"><Calendar size={16} className="text-ms-blue" /> {new Date(tournament.startDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 min-w-[200px]">
            {isRegistrationOpen ? (
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="w-full bg-ms-blue text-black font-orbitron font-bold tracking-widest px-8 py-4 uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(36,99,255,0.6)] transition-all transform hover:scale-105 active:scale-95"
              >
                REGISTER TEAM
              </button>
            ) : (
              <button disabled className="w-full bg-[#1C1C1C] text-ms-white-30 border border-[#333] font-orbitron font-bold tracking-widest px-8 py-4 uppercase cursor-not-allowed">
                REGISTRATION CLOSED
              </button>
            )}
            <div className="text-ms-white-60 font-jetbrains text-xs uppercase tracking-widest text-center md:text-right w-full">
              {filledSlots} / {tournament.totalSlots} SLOTS FILLED
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1C1C1C] pb-px">
        {['OVERVIEW', 'RULES', 'TEAMS'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`font-jetbrains text-sm tracking-widest uppercase px-6 py-4 transition-all border-b-2 ${
              activeTab === tab 
                ? 'border-ms-blue text-ms-blue bg-ms-blue/5' 
                : 'border-transparent text-ms-white-60 hover:text-ms-white hover:border-[#333]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'OVERVIEW' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#050505] border border-[#1C1C1C] p-6 lg:p-8 space-y-4">
                <h2 className="text-xl font-orbitron text-ms-white flex items-center gap-3">
                  <Shield className="text-ms-blue" /> TOURNAMENT_DETAILS
                </h2>
                <div className="text-ms-white-60 font-inter leading-relaxed whitespace-pre-wrap">
                  {tournament.description || "No description provided for this tournament. Prepare your squad and gear up for battle in this official Magadh Striker event."}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0A0A0A] border border-[#1C1C1C] p-6">
                <h3 className="font-orbitron text-ms-white-60 text-sm tracking-widest mb-6">PRIZE_POOL</h3>
                <div className="text-4xl font-orbitron font-bold text-ms-blue flex items-center gap-2">
                  <Trophy size={32} />
                  ₹{tournament.prizePool.toLocaleString()}
                </div>
              </div>

              <div className="bg-[#050505] border border-[#1C1C1C] p-6 space-y-4 font-jetbrains text-sm">
                <div className="flex justify-between items-center border-b border-[#1C1C1C] pb-3">
                  <span className="text-ms-white-60 uppercase tracking-wider">Entry Fee</span>
                  <span className="text-ms-white font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1C1C1C] pb-3">
                  <span className="text-ms-white-60 uppercase tracking-wider">Total Rounds</span>
                  <span className="text-ms-white font-bold">{tournament.totalRounds}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-ms-white-60 uppercase tracking-wider">Platform</span>
                  <span className="text-ms-white font-bold">{tournament.type}</span>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'RULES' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-[#050505] border border-[#1C1C1C] p-6 lg:p-8">
               <h2 className="text-xl font-orbitron text-ms-white mb-6 flex items-center gap-3">
                  <Shield className="text-ms-blue" /> OFFICIAL_RULES
                </h2>
                <div className="text-ms-white-60 font-inter leading-relaxed whitespace-pre-wrap">
                  {tournament.rules || "Standard Magadh Striker Esports rules apply.\n\n1. All players must check-in 15 minutes before match start.\n2. Emulators are strictly prohibited unless specified.\n3. Toxic behavior in all chat will result in immediate squad disqualification.\n4. Roster changes are locked once the tournament begins."}
                </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'TEAMS' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-orbitron text-ms-white">REGISTERED_SQUADS</h2>
              <span className="font-jetbrains text-ms-white-60 text-sm bg-[#111] px-4 py-2 border border-[#333]">
                {filledSlots} / {tournament.totalSlots}
              </span>
            </div>

            {filledSlots === 0 ? (
              <div className="border border-[#1C1C1C] border-dashed p-12 text-center text-ms-white-60 font-orbitron tracking-widest">
                NO_SQUADS_REGISTERED_YET
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tournament.Teams.map((team: any) => (
                  <div key={team.id} className="bg-[#050505] border border-[#1C1C1C] p-4 flex items-center gap-4 hover:border-ms-blue/30 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-[#111] flex items-center justify-center font-orbitron font-bold text-ms-white-60 group-hover:text-ms-blue transition-colors">
                      {team.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-orbitron font-bold text-ms-white text-sm truncate max-w-[150px]">{team.name}</div>
                      <div className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest mt-1">SQUAD</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
      
      {tournament && (
        <RegistrationModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)} 
          tournament={tournament}
          user={user}
        />
      )}
    </div>
  );
}

export default function TournamentDetailsPage() {
  return (
    <Suspense fallback={<div className="text-ms-white font-orbitron animate-pulse text-center py-20">LOADING_MODULE...</div>}>
      <TournamentDetailsContent />
    </Suspense>
  );
}
