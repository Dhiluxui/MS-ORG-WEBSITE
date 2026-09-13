"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/utils/supabase/client';
import { getTournaments } from '@/actions/tournament.actions';

export function TournamentSpotlight() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchTournamentsData();

    const channel = supabase
      .channel('public:TournamentsSpotlight')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Tournaments' },
        (payload) => {
          fetchTournamentsData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTournamentsData = async () => {
    try {
      const data = await getTournaments();
      if (data) {
        setTournaments(data.slice(0, 3));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const renderProgressBar = (percentage: number) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((percentage / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <section className="py-20 bg-ms-true-black border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="mb-12 flex items-center overflow-hidden">
          <span className="font-ascii text-ms-white-60 tracking-widest text-[10px] md:text-sm whitespace-nowrap">
            ─── TOURNAMENTS ───── ◆ ──────────────
          </span>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="text-center mb-16">
            <div className="inline-block border border-ms-border-dark bg-black/50 p-8 font-mono text-ms-white-60 tracking-widest uppercase animate-pulse shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              &gt; FETCHING_TOURNAMENTS...
            </div>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center mb-16 flex justify-center">
            <div className="border border-ms-border-dark bg-black/50 p-12 hover:border-[#333] transition-colors relative overflow-hidden group max-w-2xl w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-ms-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="w-16 h-16 border border-ms-border-dark bg-black mx-auto mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-ms-blue/30 transition-colors">
                <span className="text-ms-white-30 text-2xl font-orbitron group-hover:text-ms-blue transition-colors">!</span>
              </div>
              <h3 className="font-orbitron font-bold text-ms-white tracking-widest uppercase mb-4">No Active Tournaments</h3>
              <p className="font-mono text-ms-white-60 text-sm tracking-wide">
                &gt; SYSTEM_MSG: There are currently no tournaments scheduled. Check back soon or join our Discord for updates.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {tournaments.map(t => {
              const status = t.status || 'UPCOMING';
              return (
                <TerminalCard key={t.id} header={`STATUS :: ${status}`} className="h-full">
                  <h3 className="font-orbitron font-bold text-xl text-ms-white mb-6">
                    {t.name}
                  </h3>

                  <pre className="font-ascii text-ms-white-60 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-6 whitespace-pre-wrap break-all md:break-normal">
                    GAME   &gt; {t.game || 'TBA'}{'\n'}
                    DATE   &gt; {t.startDate ? new Date(t.startDate).toLocaleDateString() : 'TBA'}{'\n'}
                    FORMAT &gt; {t.format || 'TBA'}{'\n'}
                    TYPE   &gt; {t.type || 'ONLINE'}{'\n'}
                  </pre>

                  <div className="mt-auto pt-4 flex flex-col gap-3">
                    <Link href={`/compete/browse`}>
                      <Button variant={status === 'REGISTERING' || status === 'LIVE' || status === 'PUBLISHED' ? 'primary' : 'outline'} fullWidth disabled={status === 'COMPLETED'}>
                        {status === 'REGISTERING' ? 'REGISTER NOW' : status === 'COMPLETED' ? 'COMPLETED' : 'VIEW DETAILS'}
                      </Button>
                    </Link>
                  </div>
                </TerminalCard>
              );
            })}
          </div>
        )}

        {/* Host Banner */}
        <div className="mb-12">
          <pre className="font-ascii text-ms-white-60 text-[8px] sm:text-[10px] md:text-base p-4 md:p-6 border border-ms-border-dark bg-ms-panel-black overflow-x-auto whitespace-pre">
            ┌────────────────────────────────────────────┐{'\n'}
            │  HOST YOUR TOURNAMENT ON OUR PLATFORM      │{'\n'}
            │  Other orgs can register &amp; host here →     │{'\n'}
            │  <Link href="/services" className="text-ms-white hover:text-ms-blue hover:underline">[CONTACT FOR HOSTING →]</Link>                   │{'\n'}
            └────────────────────────────────────────────┘
          </pre>
        </div>

        {/* View All */}
        <div className="text-center">
          <Link href="/compete/browse" className="inline-flex font-orbitron font-bold uppercase tracking-wider text-ms-white border-b border-ms-blue pb-1 hover:text-ms-blue transition-colors">
            [VIEW ALL TOURNAMENTS →]
          </Link>
        </div>

      </div>
    </section>
  );
}
