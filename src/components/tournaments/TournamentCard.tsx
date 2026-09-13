'use client';

import { Button } from '@/components/ui/Button';
import type { Tournament } from '@/types/database';

interface TournamentCardProps {
  tournament: Tournament;
  onRegister?: () => void;
  onViewDetails?: () => void;
}

export function TournamentCard({ tournament, onRegister, onViewDetails }: TournamentCardProps) {
  const filled = tournament.total_slots - tournament.waitlist_slots; // Mocking filled logic for now
  const total = tournament.total_slots;
  const filledPct = (filled / total) * 100;
  
  const filledBlocks = Math.round(filledPct / 10);
  const emptyBlocks = 10 - filledBlocks;
  const asciiBar = `[${'█'.repeat(filledBlocks)}${'░'.repeat(emptyBlocks)}]`;
  
  const isLive = tournament.status === 'live';
  const isCompleted = tournament.status === 'completed';
  const isFull = tournament.status === 'full';
  const isUpcoming = tournament.status === 'published' || tournament.status === 'registering';

  return (
    <div className="group relative bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#2463FF] transition-all duration-200 hover:shadow-[0_0_16px_rgba(36,99,255,0.15)] flex flex-col h-full">
      
      {/* Corner decoration on hover */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-[#2463FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>

      {/* HEADER */}
      <div className="px-4 pt-4">
        <div className="flex justify-between items-center w-full border-b border-[#1C1C1C] pb-2">
          {isUpcoming && <span className="font-mono text-xs text-white/60">UPCOMING</span>}
          {isLive && (
            <span className="font-mono text-xs text-[#EF4444] animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> LIVE
            </span>
          )}
          {isCompleted && <span className="font-mono text-xs text-white/30">✅ COMPLETED</span>}
          {tournament.hosting_org_name && (
            <span className="font-mono text-[10px] text-white/40">{`> HOSTED_BY :: ${tournament.hosting_org_name}`}</span>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 py-3 space-y-1 flex-grow">
        <h3 className="font-orbitron text-lg text-white font-bold">{tournament.name}</h3>
        
        <div className="font-mono text-xs space-y-1 text-white/60 mt-3">
          <p>{`> GAME   :: ${tournament.game}`}</p>
          <p>{`> DATE   :: ${tournament.start_date ? new Date(tournament.start_date).toLocaleDateString() : 'TBA'} | ${tournament.start_date ? new Date(tournament.start_date).toLocaleTimeString() : 'TBA'} IST`}</p>
          <p>{`> FORMAT :: ${tournament.format}`}</p>
          <p>{`> SLOTS  :: ${filled}/${total}`}</p>
          <p className="text-[#2463FF]">{`> PRIZE  :: ₹${tournament.prize_pool.toLocaleString()}`}</p>
          <p>{`> ENTRY  :: ${tournament.entry_fee === 0 ? 'FREE' : `₹${tournament.entry_fee}/TEAM`}`}</p>
          <p>{`> TYPE   :: ${tournament.type.toUpperCase().replace('_', ' ')}`}</p>
        </div>

        {/* Slot Progress Bar */}
        <div className="mt-4">
          <div className="bg-[#111] h-1 w-full rounded-none">
            <div 
              className={`h-full ${filledPct >= 100 ? 'bg-[#EF4444]' : filledPct >= 80 ? 'bg-[#F97316]' : 'bg-white'}`}
              style={{ width: `${filledPct}%` }}
            ></div>
          </div>
          <p className="font-mono text-[10px] text-white/40 mt-1">
            {`${filled}/${total} ${asciiBar}`}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-4 pb-4 flex gap-2 mt-3">
        {isFull ? (
          <Button variant="outline" className="opacity-40 cursor-not-allowed flex-1" onClick={(e) => e.preventDefault()}>
            SLOTS FULL
          </Button>
        ) : isCompleted ? (
          <Button variant="outline" className="flex-1" href={`/tournaments/${tournament.id}/results`}>
            VIEW RESULTS →
          </Button>
        ) : (
          <Button variant="primary" className="flex-1" onClick={onRegister}>
            REGISTER NOW
          </Button>
        )}
        <Button variant="outline" onClick={onViewDetails} className="px-4">VIEW DETAILS →</Button>
      </div>
    </div>
  );
}
