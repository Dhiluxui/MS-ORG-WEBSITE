import React from 'react';
import Link from 'next/link';
import { getLeaderboard } from '@/actions/leaderboard.actions';

export const dynamic = 'force-dynamic';

export default async function GlobalLeaderboardsPage({
  searchParams,
}: {
  searchParams: { game?: string, sort?: string }
}) {
  const activeGame = searchParams.game || 'ALL_GAMES';
  const activeMetric = searchParams.sort || 'EARNINGS';

  // Fetch real leaderboard data
  const leaderboardData = await getLeaderboard('GLOBAL', undefined, 50);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="border-b border-[#111] pb-6">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          // GLOBAL_RANKINGS
        </div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
          GLOBAL <span className="text-ms-blue">LEADERBOARDS</span>
        </h1>
        <p className="text-ms-white-60 font-inter text-xs mt-2 max-w-lg">
          Real-time statistical tracking of the top-performing players across all registered regions and divisions.
        </p>
      </div>

      {/* ASCII Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#050505] border border-[#111] p-4">
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 font-courier text-xs text-ms-white-60 uppercase overflow-x-auto w-full custom-scrollbar pb-1 md:pb-0">
            <span className="shrink-0 text-ms-white">{'>'} GAME_DIV:</span>
            {['ALL_GAMES', 'BGMI', 'FREE FIRE MAX', 'CODM'].map(g => (
              <Link 
                key={g}
                href={`?game=${g}&sort=${activeMetric}`}
                className={`shrink-0 hover:text-ms-white transition-colors ${activeGame === g ? 'text-ms-blue font-bold' : ''}`}
              >
                [{g}]
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4 font-courier text-xs text-ms-white-60 uppercase overflow-x-auto w-full custom-scrollbar pb-1 md:pb-0">
            <span className="shrink-0 text-ms-white">{'>'} SORT_BY:</span>
            {['EARNINGS', 'K/D_RATIO', 'WIN_RATE'].map(m => (
              <Link 
                key={m}
                href={`?game=${activeGame}&sort=${m}`}
                className={`shrink-0 hover:text-ms-white transition-colors ${activeMetric === m ? 'text-ms-blue font-bold' : ''}`}
              >
                [{m}]
              </Link>
            ))}
          </div>
        </div>

        <div className="font-jetbrains text-[10px] text-ms-white-30 tracking-widest shrink-0 border border-[#333] p-2 bg-[#111]">
          LAST_SYNC: JUST_NOW
        </div>
      </div>

      {/* Leaderboard Table (Tabular Monospace Layout) */}
      <div className="border border-[#111] bg-[#0A0A0A] overflow-x-auto custom-scrollbar relative">
        
        {/* Subtle scanline overlay for the table */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #111 1px, #111 2px)' }} />

        {/* Table Header */}
        <div className="flex items-center gap-4 p-4 border-b border-[#111] font-courier text-[10px] text-ms-white-30 uppercase tracking-widest min-w-[800px] relative z-10">
          <div className="w-16 text-center">RANK</div>
          <div className="w-48">PLAYER_IGN</div>
          <div className="w-32">PRI_ROLE</div>
          <div className="w-24 text-center">WWCD</div>
          <div className="w-24 text-center">KILL_PTS</div>
          <div className="flex-1 text-right">TOTAL_POINTS</div>
        </div>

        {/* Empty State */}
        {leaderboardData.length === 0 && (
          <div className="py-24 text-center flex flex-col items-center justify-center bg-ms-true-black relative z-10">
            <div className="font-ascii text-ms-white-30 mb-4 text-xs">
              <pre>
{`[ DATABASE QUERY RETURNED 0 ROWS ]`}
              </pre>
            </div>
            <p className="font-orbitron text-ms-white-60 uppercase text-sm">No players qualify for global ranking yet.</p>
          </div>
        )}

        {/* Table Rows */}
        <div className="flex flex-col min-w-[800px] relative z-10">
          {leaderboardData.map((player, index) => {
            const rank = index + 1;
            const isTop3 = rank <= 3;
            const ign = player.Players?.ign || "UNKNOWN PLAYER";
            const role = player.Players?.role || "UNKNOWN";
            
            return (
              <div key={player.id} className="flex items-center gap-4 p-4 border-b border-[#111] hover:bg-[#111] transition-colors font-jetbrains text-xs text-ms-white group cursor-default">
                
                <div className={`w-16 text-center font-bold text-sm ${isTop3 ? 'text-ms-blue' : 'text-ms-white-30'}`}>
                  [#{rank.toString().padStart(2, '0')}]
                </div>
                
                <div className={`w-48 font-bold ${isTop3 ? 'text-ms-white' : 'text-ms-white-60'}`}>
                  {ign}
                </div>
                
                <div className="w-32 text-ms-white-60">
                  {role}
                </div>
                
                <div className="w-24 text-center text-ms-white-60 group-hover:text-ms-white transition-colors">
                  {player.wwcd}
                </div>
                
                <div className="w-24 text-center text-ms-white-60 group-hover:text-ms-white transition-colors">
                  {player.killPoints}
                </div>
                
                <div className={`flex-1 text-right font-bold tracking-widest ${isTop3 ? 'text-ms-blue' : 'text-ms-white-60'}`}>
                  {player.totalPoints}
                </div>
                
              </div>
            );
          })}
        </div>

        {/* Footer Pagination/Load More */}
        {leaderboardData.length > 0 && (
          <div className="p-4 flex justify-between items-center bg-[#050505] font-courier text-[10px] text-ms-white-60 uppercase tracking-widest min-w-[800px] relative z-10 border-t border-[#111]">
            <div>DISPLAYING TOP {leaderboardData.length} PLAYERS GLOBALLY</div>
            <button className="hover:text-ms-white transition-colors">
              [VIEW_FULL_ROSTER ↓]
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
