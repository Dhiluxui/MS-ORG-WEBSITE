import { createClient } from '../supabase/client';

const supabase = createClient();

export interface Tournament {
  id: string;
  name: string;
  game: string;
  type: string;
  format: string;
  start_date: string | null;
  total_slots: number;
  entry_fee: number;
  prize_pool: number;
  status: string;
  registered_teams?: number; // Fetched via join
}

export async function fetchTournaments(): Promise<Tournament[]> {
  const { data, error } = await supabase
    .from('tournaments')
    .select(`
      id, name, game, type, format, start_date, total_slots, entry_fee, prize_pool, status,
      teams (id)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching tournaments:", error);
    return [];
  }

  // Process data to count registered teams
  return data.map((t: any) => ({
    id: t.id,
    name: t.name,
    game: t.game,
    type: t.type,
    format: t.format,
    start_date: t.start_date,
    total_slots: t.total_slots,
    entry_fee: t.entry_fee,
    prize_pool: t.prize_pool,
    status: t.status,
    registered_teams: t.teams ? t.teams.length : 0
  }));
}
