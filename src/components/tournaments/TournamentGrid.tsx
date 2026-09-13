'use client';

import { TournamentCard } from './TournamentCard';
import type { Tournament } from '@/types/database';

interface TournamentGridProps {
  tournaments: Tournament[];
  loading: boolean;
  onRegister: (tournament: Tournament) => void;
  onViewDetails: (tournament: Tournament) => void;
}

export function TournamentGrid({ tournaments, loading, onRegister, onViewDetails }: TournamentGridProps) {
  const liveTournament = tournaments.find(t => t.status === 'live');

  return (
    <div className="w-full">
      {liveTournament && (
        <div className="border-l-4 border-[#2463FF] bg-black px-4 py-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
            <span className="font-mono text-sm text-white">
              LIVE NOW: {liveTournament.name} — ROUND 1/3
            </span>
          </div>
          <div className="flex gap-4 hidden sm:flex">
            <a href={`/tournaments/${liveTournament.id}?tab=bracket`} className="text-[#2463FF] text-xs font-mono hover:underline">VIEW BRACKET →</a>
            <a href={`/tournaments/${liveTournament.id}?tab=leaderboard`} className="text-[#2463FF] text-xs font-mono hover:underline">LEADERBOARD →</a>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0A0A0A] h-[350px] border border-[#1C1C1C] animate-pulse"></div>
            ))}
          </>
        ) : tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <TournamentCard 
              key={tournament.id} 
              tournament={tournament} 
              onRegister={() => onRegister(tournament)}
              onViewDetails={() => onViewDetails(tournament)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-white/40 border border-[#1C1C1C] border-dashed">
            <span className="font-mono mb-2">{'>'} NO_TOURNAMENTS_FOUND</span>
            <span className="font-mono text-xs">Try adjusting your filters</span>
          </div>
        )}
      </div>
    </div>
  );
}
