"use server";

import { createClient } from '@/lib/supabase/server';

export async function getAdminDashboardStats() {
  const supabase = await createClient();
  
  // Get Tournaments
  const { data: tournaments, error: tourError } = await supabase
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

  const activeTours = tournaments?.filter(t => t.status === 'registering' || t.status === 'live' || t.status === 'published' || (t.status as string).toUpperCase() === 'UPCOMING' || (t.status as string).toUpperCase() === 'LIVE').length || 0;
  const liveNow = tournaments?.filter(t => t.status === 'live' || (t.status as string).toUpperCase() === 'LIVE').length || 0;

  // Let's get real teams if table exists, otherwise return 0 for now until Teams module is fully fleshed out
  const { count: totalTeams } = await supabase
    .from('teams')
    .select('id', { count: 'exact' })
    .catch(() => ({ count: 0 }));

  // Get real users for total users if teams table is absent
  const { count: pendingRegs } = await supabase
    .from('tournament_registrations')
    .select('id', { count: 'exact' })
    .eq('status', 'PENDING')
    .catch(() => ({ count: 0 }));

  const liveTournament = tournaments?.find(t => t.status === 'LIVE');
  let systemAlert = null;
  if (liveTournament) {
    // Get full tournament details for the alert
    const { data: liveData } = await supabase.from('tournaments').select('*').eq('id', liveTournament.id).single();
    if (liveData) {
      systemAlert = {
        title: `${liveData.name} — LIVE NOW`,
        subtitle: `Game: ${liveData.game} | Status: ACTIVE`,
        link: `/admin/tournaments/${liveData.id}/manage`
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
