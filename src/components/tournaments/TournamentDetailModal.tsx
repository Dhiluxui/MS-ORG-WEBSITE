'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { Tournament } from '@/types/database';
import { RegistrationWizard } from './RegistrationWizard';

interface TournamentDetailModalProps {
  tournament: Tournament;
  isOpen: boolean;
  onClose: () => void;
}

export function TournamentDetailModal({ tournament, isOpen, onClose }: TournamentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'RULES' | 'SCHEDULE' | 'TEAMS' | 'BRACKET' | 'LEADERBOARD'>('DETAILS');
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col"
      >
        <div className="flex-1 overflow-y-auto">
          {/* HEADER */}
          <div className="relative pt-12 pb-6 px-4 md:px-8 border-b border-[#1C1C1C]">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 font-mono text-xs text-white/60 hover:text-white transition-colors"
            >
              [ CLOSE ]
            </button>
            <div className="max-w-5xl mx-auto">
              <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white mb-2">{tournament.name}</h2>
              <p className="font-mono text-xs text-white/60">
                {`> STATUS :: ${tournament.status.toUpperCase()} | GAME :: ${tournament.game} | TYPE :: ${tournament.type.toUpperCase()}`}
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
            {/* 4 QUICK STAT BOXES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="border border-[#1C1C1C] p-4 text-center flex flex-col items-center justify-center bg-[#0A0A0A]">
                <span className="font-mono text-2xl text-white mb-1">{tournament.total_slots}</span>
                <span className="font-mono text-[10px] text-white/40">TOTAL SLOTS</span>
              </div>
              <div className="border border-[#1C1C1C] p-4 text-center flex flex-col items-center justify-center bg-[#0A0A0A]">
                <span className="font-mono text-2xl text-[#2463FF] mb-1">₹{tournament.prize_pool.toLocaleString()}</span>
                <span className="font-mono text-[10px] text-white/40">PRIZE POOL</span>
              </div>
              <div className="border border-[#1C1C1C] p-4 text-center flex flex-col items-center justify-center bg-[#0A0A0A]">
                <span className="font-mono text-2xl text-white mb-1">{tournament.entry_fee === 0 ? 'FREE' : `₹${tournament.entry_fee}`}</span>
                <span className="font-mono text-[10px] text-white/40">ENTRY FEE</span>
              </div>
              <div className="border border-[#1C1C1C] p-4 text-center flex flex-col items-center justify-center bg-[#0A0A0A]">
                <span className="font-mono text-2xl text-white mb-1">{tournament.format}</span>
                <span className="font-mono text-[10px] text-white/40">FORMAT</span>
              </div>
            </div>

            {/* TAB BAR */}
            <div className="flex border-b border-[#1C1C1C] overflow-x-auto scrollbar-hide mb-6">
              {(['DETAILS', 'RULES', 'SCHEDULE', 'TEAMS', 'BRACKET', 'LEADERBOARD'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-mono text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'border-b-2 border-[#2463FF] text-white' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  [{tab}]
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[300px]">
              {activeTab === 'DETAILS' && (
                <div className="space-y-6">
                  <p className="font-rajdhani text-white/80 text-lg leading-relaxed">
                    {tournament.description || 'No description provided.'}
                  </p>
                  <div className="font-mono text-sm text-white/60 space-y-2 bg-[#0A0A0A] border border-[#1C1C1C] p-4">
                    <p>{`> REGISTRATION_OPENS  :: ${tournament.registration_opens ? new Date(tournament.registration_opens).toLocaleString() : 'TBA'}`}</p>
                    <p>{`> REGISTRATION_CLOSES :: ${tournament.registration_closes ? new Date(tournament.registration_closes).toLocaleString() : 'TBA'}`}</p>
                    <p>{`> TOURNAMENT_START    :: ${tournament.start_date ? new Date(tournament.start_date).toLocaleString() : 'TBA'}`}</p>
                  </div>
                </div>
              )}
              {activeTab === 'RULES' && (
                <div className="space-y-4">
                  <details className="group border border-[#1C1C1C] bg-[#0A0A0A]">
                    <summary className="font-mono text-white p-4 cursor-pointer marker:content-none flex items-center">
                      <span className="mr-2 text-[#2463FF] group-open:rotate-90 transition-transform">▶</span> 
                      Room Settings & In-Game Rules
                    </summary>
                    <div className="p-4 pt-0 text-white/60 font-rajdhani border-t border-[#1C1C1C] mt-2">
                      {tournament.rules || 'Standard competitive rules apply.'}
                    </div>
                  </details>
                  {/* Additional hardcoded rules stubs for UI completeness */}
                  <details className="group border border-[#1C1C1C] bg-[#0A0A0A]">
                    <summary className="font-mono text-white p-4 cursor-pointer marker:content-none flex items-center">
                      <span className="mr-2 text-[#2463FF] group-open:rotate-90 transition-transform">▶</span> 
                      Code of Conduct & Fair Play
                    </summary>
                    <div className="p-4 pt-0 text-white/60 font-rajdhani border-t border-[#1C1C1C] mt-2">
                      Zero tolerance for hacking, toxicity, or ringing.
                    </div>
                  </details>
                </div>
              )}
              {activeTab === 'SCHEDULE' && (
                <div className="font-mono text-white/60 space-y-3 bg-[#0A0A0A] border border-[#1C1C1C] p-6">
                  <p>{`> DAY_1 :: QUALIFIER ROUNDS — TBA`}</p>
                  <p>{`> DAY_2 :: SEMI FINALS — TBA`}</p>
                  <p>{`> DAY_3 :: GRAND FINALS — TBA`}</p>
                </div>
              )}
              {activeTab === 'TEAMS' && (
                <div className="text-center py-12 border border-[#1C1C1C] border-dashed">
                  <p className="font-mono text-white/40 mb-2">{`> STATUS :: FETCHING_TEAMS`}</p>
                  <p className="font-mono text-xs text-white/30">0/{tournament.total_slots} TEAMS REGISTERED</p>
                </div>
              )}
              {activeTab === 'BRACKET' && (
                <div className="text-center py-12 border border-[#1C1C1C] border-dashed">
                  <p className="font-mono text-white/40">{`> BRACKET_STATUS :: NOT_YET_PUBLISHED`}</p>
                </div>
              )}
              {activeTab === 'LEADERBOARD' && (
                <div className="text-center py-12 border border-[#1C1C1C] border-dashed">
                  <p className="font-mono text-white/40">{`> LEADERBOARD_STATUS :: MATCH_NOT_STARTED`}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-[#1C1C1C] p-4 bg-[#0A0A0A] flex justify-end">
          <div className="max-w-5xl mx-auto w-full flex justify-end">
            <Button variant="primary" onClick={() => setIsWizardOpen(true)}>
              REGISTER YOUR TEAM →
            </Button>
          </div>
        </div>
      </motion.div>

      {/* REGISTRATION WIZARD OVERLAY */}
      {isWizardOpen && (
        <RegistrationWizard 
          tournament={tournament} 
          isOpen={isWizardOpen} 
          onClose={() => setIsWizardOpen(false)} 
        />
      )}
    </AnimatePresence>
  );
}
