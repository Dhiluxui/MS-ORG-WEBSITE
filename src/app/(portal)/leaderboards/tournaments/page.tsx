import React from 'react';
import Link from 'next/link';
import { getTournaments } from '@/actions/tournament.actions';
import { getLeaderboard } from '@/actions/leaderboard.actions';

export const dynamic = 'force-dynamic';

export default async function TournamentStandingsPage({
  searchParams,
}: {
  searchParams: { t?: string }
}) {
  // Fetch real tournaments for the selector
  const tournaments = await getTournaments();
  
  // Determine active tournament
  const activeTournamentId = searchParams.t || (tournaments.length > 0 ? tournaments[0].id : null);
  const activeTournamentName = tournaments.find(t => t.id === activeTournamentId)?.name || 'UNKNOWN TOURNAMENT';
  
  // Fetch real leaderboard data
  const standingsData = activeTournamentId 
    ? await getLeaderboard('TOURNAMENT', activeTournamentId)
    : [];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="border-b border-[#111] pb-6">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          // TOURNAMENT_STANDINGS
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          TOURNAMENT <span className="text-ms-blue">STANDINGS</span>
        </h1>
        <p className="text-ms-white-60 font-inter text-xs mt-2 max-w-lg">
          Live point tables and team rankings for ongoing and completed official tournaments.
        </p>
      </div>

      {/* ASCII Tournament Selector */}
      <div className="border border-[#111] bg-[#050505] p-6 relative overflow-hidden">
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #111 2px, #111 4px)' }} />
             
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          
          <div className="flex-1 space-y-2 w-full">
            <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest block">
              // SELECT_TOURNAMENT_DATABASE
            </label>
            <div className="flex gap-2 flex-wrap">
              {tournaments.length === 0 && (
                <span className="font-courier text-xs text-ms-white-30">[ NO TOURNAMENTS FOUND ]</span>
              )}
              {tournaments.map((t) => (
                <Link 
                  key={t.id}
                  href={`?t=${t.id}`}
                  className={`font-courier text-xs px-3 py-2 border transition-colors ${
                    activeTournamentId === t.id ? 'border-ms-blue bg-ms-blue/10 text-ms-blue' : 'border-[#222] bg-[#111] text-ms-white-60 hover:border-[#444]'
                  }`}
                >
                  [{t.name.toUpperCase().replace(/\s+/g, '_')}]
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-[#333] bg-[#0A0A0A] p-4 text-center shrink-0 w-full md:w-auto">
            <div className="font-courier text-[10px] text-ms-white-30 uppercase tracking-widest mb-1">
              STATUS
            </div>
            <div className="text-lg font-jetbrains font-bold text-[#10b981]">
              [ 🔴 LIVE_UPDATES ]
            </div>
          </div>

        </div>
      </div>

      {/* Standings Table (Tabular Monospace Layout) */}
      <div className="border border-[#111] bg-[#0A0A0A] overflow-x-auto custom-scrollbar relative">
        
        {/* Subtle scanline overlay for the table */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #111 1px, #111 2px)' }} />

        {/* Table Header */}
        <div className="flex items-center gap-4 p-4 border-b border-[#111] font-courier text-[10px] text-ms-white-30 uppercase tracking-widest min-w-[800px] relative z-10">
          <div className="w-16 text-center">RANK</div>
          <div className="w-48">TEAM_NAME</div>
          <div className="w-24 text-center">WWCD</div>
          <div className="w-32 text-center">PLACE_PTS</div>
          <div className="w-32 text-center">KILL_PTS</div>
          <div className="flex-1 text-right">TOTAL_POINTS</div>
        </div>

        {/* Empty State */}
        {standingsData.length === 0 && (
          <div className="py-24 text-center flex flex-col items-center justify-center bg-ms-true-black relative z-10">
            <div className="font-ascii text-ms-white-30 mb-4 text-xs">
              <pre>
{`[ NO TEAMS REGISTERED YET ]`}
              </pre>
            </div>
            <p className="font-orbitron text-ms-white-60 uppercase text-sm">Standings table is currently empty.</p>
          </div>
        )}

        {/* Table Rows */}
        <div className="flex flex-col min-w-[800px] relative z-10">
          {standingsData.map((team, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            // The team name could be populated from a joined query, but depending on schema:
            const teamName = team.Teams?.teamName || "UNKNOWN TEAM";
            return (
              <div key={team.id} className="flex items-center gap-4 p-4 border-b border-[#111] hover:bg-[#111] transition-colors font-jetbrains text-xs text-ms-white group cursor-default">
                
                <div className={`w-16 text-center font-bold text-sm ${isTop3 ? 'text-ms-blue' : 'text-ms-white-30'}`}>
                  [#{rank.toString().padStart(2, '0')}]
                </div>
                
                <div className={`w-48 font-bold ${isTop3 ? 'text-ms-white' : 'text-ms-white-60'}`}>
                  {teamName}
                </div>
                
                <div className="w-24 text-center font-bold text-[#f59e0b]">
                  {team.wwcd > 0 ? `+${team.wwcd}` : '-'}
                </div>
                
                <div className="w-32 text-center text-ms-white-60 group-hover:text-ms-white transition-colors">
                  {team.placementPoints}
                </div>
                
                <div className="w-32 text-center text-ms-white-60 group-hover:text-ms-white transition-colors">
                  {team.killPoints}
                </div>
                
                <div className={`flex-1 text-right font-bold text-lg tracking-widest ${isTop3 ? 'text-ms-blue' : 'text-ms-white'}`}>
                  {team.totalPoints}
                </div>
                
              </div>
            );
          })}
        </div>

        {/* Footer Pagination/Load More */}
        {standingsData.length > 0 && (
          <div className="p-4 flex justify-between items-center bg-[#050505] font-courier text-[10px] text-ms-white-60 uppercase tracking-widest min-w-[800px] relative z-10 border-t border-[#111]">
            <div>DISPLAYING TOP {standingsData.length} SQUADS FOR :: {activeTournamentName.toUpperCase()}</div>
            <button className="hover:text-ms-white transition-colors">
              [DOWNLOAD_CSV ↓]
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
