"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Fetch all players for the registry
export async function getPlayers() {
  const supabase = await createClient();
  try {
    const { data: players, error } = await supabase
      .from('Players')
      .select(`
        *,
        Users (*),
        Teams (*)
      `)
      .order('joinedAt', { ascending: false });
      
    if (error) throw error;
    return players || [];
  } catch (error) {
    console.error("Failed to fetch players:", error);
    return [];
  }
}

// Fetch all banned players
export async function getBannedPlayers() {
  const supabase = await createClient();
  try {
    const { data: banned, error } = await supabase
      .from('Players')
      .select(`
        *,
        Users (*)
      `)
      .eq('bannedIgn', true);
      
    if (error) throw error;
    return banned || [];
  } catch (error) {
    console.error("Failed to fetch banned players:", error);
    return [];
  }
}

// Fetch all teams
export async function getTeams() {
  const supabase = await createClient();
  try {
    const { data: teams, error } = await supabase
      .from('Teams')
      .select(`
        *,
        Players (*)
      `)
      .order('registeredAt', { ascending: false });

    if (error) throw error;
    return teams || [];
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return [];
  }
}
