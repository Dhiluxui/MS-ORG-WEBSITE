"use server";

import { createClient } from '@/utils/supabase/server';

export async function getLeaderboard(
  type: 'GLOBAL' | 'TOURNAMENT' = 'GLOBAL', 
  tournamentId?: string,
  limit = 50
) {
  const supabase = await createClient();
  try {
    let query = supabase
      .from('Leaderboard')
      .select(`
        *,
        Teams (*),
        Players (*),
        Users (*)
      `)
      .eq('type', type)
      .order('rank', { ascending: true })
      .limit(limit);

    if (type === 'TOURNAMENT' && tournamentId) {
      query = query.eq('tournamentId', tournamentId);
    }

    const { data: leaderboard, error } = await query;

    if (error) throw error;
    return leaderboard || [];
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return [];
  }
}
