"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getTournaments, getUserRegistrations } from '@/actions/tournament.actions';
import { useAuth } from '@/contexts/AuthContext';
import RegistrationModal from '@/components/RegistrationModal';
import { Trophy, Search } from 'lucide-react';

export interface Tournament {
  id: string;
  name: string;
  game: string;
  status: string;
  startDate: string;
  format: string;
}

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialGame = searchParams.get('game') || 'ALL';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [activeGame, setActiveGame] = useState(initialGame);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchRegistrations = async () => {
    if (user) {
      const regs = await getUserRegistrations(user.id);
      setUserRegistrations(regs);
    }
  };

  useEffect(() => {
    async function fetchTournaments() {
      const data = await getTournaments();
      setTournaments(data);
      setLoading(false);
    }
    fetchTournaments();
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [user]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchRegistrations(); // Refresh registrations in case they registered
  };

  // Filter tournaments
  const filteredTournaments = tournaments.filter(t => {
    if (activeStatus !== 'ALL' && t.status !== activeStatus) return false;
    if (activeGame !== 'ALL' && t.game !== activeGame) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Segmented Neon Progress Bar
  const ProgressBar = ({ filled, total }: { filled: number, total: number }) => {
    const percentage = total > 0 ? (filled / total) * 100 : 0;
    return (
      <div className="w-full mt-4">
        <div className="flex justify-between text-[10px] font-jetbrains text-ms-white-60 mb-2 uppercase tracking-widest">
          <span>SLOTS FILLED: {filled}/{total}</span>
          <span className="text-ms-blue font-bold">{Math.round(percentage)}%</span>
        </div>
        <div className="flex gap-[2px] h-1.5 w-full">
          {Array.from({ length: 25 }).map((_, i) => {
            const isFilled = i < (filled / total) * 25;
            return (
              <div 
                key={i} 
                className={`flex-1 transition-all duration-500 ${isFilled ? 'bg-ms-blue shadow-[0_0_8px_rgba(36,99,255,0.8)]' : 'bg-[#1C1C1C]'}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      


      {/* Cyberpunk Filter Bar */}
      <div className="border-b border-[#1C1C1C] pb-4 sticky top-0 bg-[#050505]/90 backdrop-blur-md z-30">
        <div className="flex flex-col gap-4 font-jetbrains text-xs uppercase text-ms-white-60">
          
          <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
            <span className="shrink-0 text-ms-white font-bold tracking-widest">STATUS:</span>
            {['ALL', 'LIVE', 'REGISTERING', 'COMPLETED'].map(s => (
              <button 
                key={s} 
                onClick={() => setActiveStatus(s)}
                className={`shrink-0 tracking-widest transition-all duration-300 px-3 py-1 border ${activeStatus === s ? 'border-ms-blue text-ms-blue bg-ms-blue/10 shadow-[0_0_10px_rgba(36,99,255,0.2)]' : 'border-transparent hover:border-[#333] hover:text-ms-white'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
            <span className="shrink-0 text-ms-white font-bold tracking-widest">GAME:</span>
            {['ALL', 'FREE FIRE MAX', 'BGMI', 'CODM', 'MOBA', 'LEGEND RC'].map(s => (
              <button 
                key={s}
                onClick={() => setActiveGame(s)}
                className={`shrink-0 tracking-widest transition-all duration-300 px-3 py-1 border ${activeGame === s ? 'border-ms-white text-ms-white bg-white/10' : 'border-transparent hover:border-[#333] hover:text-ms-white'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-[#0A0A0A] border border-[#1C1C1C] p-2 focus-within:border-ms-blue focus-within:shadow-[0_0_10px_rgba(36,99,255,0.1)] transition-all">
            <span className="shrink-0 text-ms-blue pl-2">{'>'}</span>
            <input 
              type="text" 
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-ms-white font-courier w-full placeholder:text-ms-white-30"
            />
          </div>
        </div>
      </div>

      {/* Cyber Tournament Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 border-2 border-ms-blue/30 border-t-ms-blue rounded-full animate-spin mb-4" />
            <div className="text-ms-white-60 font-orbitron tracking-widest text-sm uppercase">LOADING_DATA...</div>
          </div>
        ) : filteredTournaments.length === 0 ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center border border-dashed border-[#222] bg-[#050505] rounded-xl relative overflow-hidden group hover:border-[#333] transition-colors">
            <div className="absolute inset-0 bg-gradient-to-t from-ms-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="w-20 h-20 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(36,99,255,0.15)] transition-shadow duration-500">
              <Search size={32} className="text-ms-white-30 group-hover:text-ms-blue transition-colors duration-500" />
            </div>
            <h3 className="text-xl font-orbitron font-bold text-ms-white mb-3 uppercase tracking-widest">No Tournaments Found</h3>
            <p className="text-ms-white-60 font-jetbrains text-sm max-w-md">
              We couldn't find any tournaments matching your current filters. Try adjusting your search criteria or game selection.
            </p>
          </div>
        ) : filteredTournaments.map((t) => (
          <div key={t.id} className="relative border border-[#1C1C1C] bg-[#0A0A0A] hover:border-ms-blue/50 hover:shadow-[0_0_20px_rgba(36,99,255,0.1)] transition-all duration-300 flex flex-col group">
            
            {/* Banner Section */}
            <div className="relative h-32 w-full bg-[#111] overflow-hidden border-b border-[#1C1C1C]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 pointer-events-none" />
              <img 
                src={`https://placehold.co/600x200/0a0a0a/333333?text=${t.game.replace(' ', '+')}`}
                alt="Banner" 
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700" 
              />
            </div>

            {/* Overlapping Logo */}
            <div className="absolute top-24 left-6 z-20">
              <div className="w-16 h-16 bg-[#050505] border border-[#333] flex items-center justify-center p-1 shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                <div className="w-full h-full bg-[#111] border border-[#222] flex items-center justify-center group-hover:border-ms-blue/50 transition-colors">
                  <span className="font-orbitron font-bold text-ms-white-60 text-xl">{t.name.charAt(0)}</span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${t.status === 'LIVE' ? 'bg-red-500' : 'bg-[#10b981]'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${t.status === 'LIVE' ? 'bg-red-500' : 'bg-[#10b981]'}`}></span>
              </span>
              <span className="font-jetbrains text-[10px] uppercase font-bold tracking-widest text-ms-white drop-shadow-md">
                {t.status}
              </span>
            </div>

            <div className="p-6 flex-1 mt-6">
              <h3 className="text-xl font-orbitron font-bold text-ms-white mb-6 line-clamp-2 group-hover:text-ms-blue transition-colors pt-2">
                {t.name}
              </h3>

              <div className="font-jetbrains text-xs text-ms-white-60 space-y-3 mb-6">
                <div className="flex justify-between items-center border-b border-[#1C1C1C] pb-2">
                  <span>GAME</span>
                  <span className="text-ms-white font-bold">{t.game}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1C1C1C] pb-2">
                  <span>DATE</span>
                  <span className="text-ms-white font-bold">{new Date(t.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#1C1C1C] pb-2">
                  <span>FORMAT</span>
                  <span className="text-ms-white font-bold">{t.format}</span>
                </div>
              </div>

              <ProgressBar filled={0} total={32} />
              
              <div className="mt-6 pt-4 border-t border-[#1C1C1C] flex items-center gap-3">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent((t as any).hostingOrgName || 'Magadh Strikers')}&background=111&color=2463FF&bold=true`} 
                  alt="Org Logo" 
                  className="w-8 h-8 rounded-full border border-[#333] shadow-[0_0_10px_rgba(36,99,255,0.2)]"
                />
                <div className="flex flex-col">
                  <span className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">Hosted By</span>
                  <span className="font-orbitron text-xs text-ms-white font-bold">{(t as any).hostingOrgName || 'Magadh Strikers'}</span>
                </div>
              </div>
            </div>

            <div className="p-2 border-t border-[#1C1C1C] flex flex-col sm:flex-row gap-2 bg-[#050505]">
              {(() => {
                const registration = userRegistrations.find(r => r.tournamentId === t.id);
                
                if (registration) {
                  return (
                    <div className="relative flex-1 bg-[#111] border border-[#333] text-ms-white font-jetbrains font-bold tracking-widest py-3 text-center text-xs uppercase cursor-default flex items-center justify-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        registration.status === 'APPROVED' ? 'bg-[#10b981]' : 
                        registration.status === 'REJECTED' ? 'bg-red-500' : 
                        'bg-yellow-500'
                      }`}></span>
                      {registration.status === 'PENDING' ? 'PENDING APPROVAL' : 
                       registration.status === 'APPROVED' ? 'SLOT CONFIRMED' : 
                       registration.status}
                    </div>
                  );
                }

                return (
                  <button 
                    onClick={() => {
                      setSelectedTournament(t);
                      setIsModalOpen(true);
                    }}
                    className="relative flex-1 bg-ms-blue text-black font-jetbrains font-bold tracking-widest py-3 text-center overflow-hidden group/btn text-xs uppercase hover:shadow-[0_0_15px_rgba(36,99,255,0.4)] transition-all"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 font-orbitron text-sm">Register Now</span>
                  </button>
                );
              })()}
              <Link href={`/compete/tournaments/${t.id}`} className="flex-1 block w-full">
                <button className="w-full text-center text-ms-white-60 font-orbitron text-sm tracking-wide py-3 hover:text-ms-white hover:bg-[#111] transition-colors border border-transparent hover:border-[#333]">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {selectedTournament && (
        <RegistrationModal 
          isOpen={isModalOpen}
          onClose={handleModalClose}
          tournament={selectedTournament}
          user={user}
        />
      )}
    </div>
  );
}

export default function BrowseTournamentsPage() {
  return (
    <Suspense fallback={<div className="text-ms-white font-orbitron animate-pulse text-center py-20">LOADING_MODULE...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
