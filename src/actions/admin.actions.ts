"use server";

import { createClient } from '@/lib/supabase/server';
import { Tournament } from '@/lib/services/tournaments';

export async function getAdminDashboardStats() {
  const supabase = await createClient();
  
  // Get Tournaments
  const { data: rawTournaments, error: tourError } = await supabase
    .from('tournaments')
    .select('*');
    
  if (tourError) {
    console.error('Error fetching tournaments stats:', tourError);
    return {
      activeTours: 0,
      liveNow: 0,
      pendingRegs: 0,
      totalTeams: 0,
      recentActivity: [],
      systemAlert: null
    };
  }

  const tournaments = rawTournaments as unknown as Tournament[] | null;

  const activeTours = tournaments?.filter(t => {
    const s = (t.status || '').toLowerCase();
    return s === 'registering' || s === 'live' || s === 'published' || s === 'upcoming';
  }).length || 0;

  const liveNow = tournaments?.filter(t => (t.status || '').toLowerCase() === 'live').length || 0;

  // Let's get real teams if table exists, otherwise return 0 for now until Teams module is fully fleshed out
  let totalTeams = 0;
  try {
    const { count } = await supabase
      .from('teams')
      .select('id', { count: 'exact' });
    totalTeams = count || 0;
  } catch {
    totalTeams = 0;
  }

  // Get real users for total users if teams table is absent
  let pendingRegs = 0;
  try {
    const { count } = await supabase
      .from('tournament_registrations')
      .select('id', { count: 'exact' })
      .eq('status', 'PENDING');
    pendingRegs = count || 0;
  } catch {
    pendingRegs = 0;
  }

  const liveTournament = tournaments?.find(t => (t.status || '').toUpperCase() === 'LIVE');
  let systemAlert = null;
  if (liveTournament) {
    // Get full tournament details for the alert
    const { data: liveData } = await supabase.from('tournaments').select('*').eq('id', liveTournament.id).single();
    const typedLiveData = liveData as unknown as Tournament | null;
    if (typedLiveData) {
      systemAlert = {
        title: `${typedLiveData.name} — LIVE NOW`,
        subtitle: `Game: ${typedLiveData.game} | Status: ACTIVE`,
        link: `/admin/tournaments/${typedLiveData.id}/manage`
      };
    }
  }

  return {
    activeTours,
    liveNow,
    pendingRegs: pendingRegs || 0,
    totalTeams: totalTeams || 0,
    systemAlert,
    recentActivity: [
      { time: 'NEW', type: 'SYS', text: 'System booted successfully. All modules online.' }
    ]
  };
}
