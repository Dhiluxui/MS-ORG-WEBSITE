"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Fetch all tournaments (for the public Browse page and Admin dashboard)
export async function getTournaments() {
  const supabase = await createClient();
  try {
    const { data: tournaments, error } = await supabase
      .from('Tournaments')
      .select('*')
      .order('startDate', { ascending: true });

    if (error) throw error;
    return tournaments || [];
  } catch (error) {
    console.error("Failed to fetch tournaments:", error);
    return [];
  }
}

// Fetch a single tournament by ID (for details / manage page)
export async function getTournamentById(id: string) {
  const supabase = await createClient();
  try {
    const { data: tournament, error } = await supabase
      .from('Tournaments')
      .select(`
        *,
        Teams (
          *
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return tournament;
  } catch (error) {
    console.error(`Failed to fetch tournament ${id}:`, error);
    return null;
  }
}

// Create a new tournament
export async function createTournament(data: {
  name: string;
  game: string;
  format: string;
  startDate: Date;
}) {
  const supabase = await createClient();
  try {
    const { data: newTournament, error } = await supabase
      .from('Tournaments')
      .insert([
        {
          name: data.name,
          game: data.game,
          format: data.format,
          type: "Online", // Default to Online for now based on V1 schema
          startDate: data.startDate.toISOString(),
          status: 'PUBLISHED',
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    // Revalidate paths so the new tournament shows up immediately
    revalidatePath('/compete/browse');
    revalidatePath('/admin');
    
    return { success: true, id: newTournament.id };
  } catch (error) {
    console.error("Failed to create tournament:", error);
    return { success: false, error: "Failed to create tournament in database." };
  }
}

// Register a team for a tournament
export async function registerForTournament(data: {
  tournamentId: string;
  squadId: string;
  proofUrl: string;
  userId: string;
}) {
  const supabase = await createClient();
  try {
    // Fetch Squad Details
    const { data: squad, error: fetchError } = await supabase
      .from('Squads')
      .select('*')
      .eq('id', data.squadId)
      .single();

    if (fetchError || !squad) {
      throw new Error("Squad not found.");
    }

    const { data: newTeam, error } = await supabase
      .from('Teams')
      .insert([
        {
          tournamentId: data.tournamentId,
          teamName: squad.name,
          teamTag: squad.tag,
          captainId: data.userId,
          captainDiscord: squad.captainDiscord,
          captainPhone: squad.captainPhone,
          captainEmail: squad.captainEmail,
          paymentScreenshot: data.proofUrl,
          paymentUpiRef: null,
          status: 'PENDING',
          paymentStatus: 'VERIFIED',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Insert Error in Teams:", error);
      throw error;
    }
    
    // Revalidate paths so the new team shows up immediately on the details page
    revalidatePath(`/compete/tournaments/${data.tournamentId}`);
    
    return { success: true, id: newTeam.id };
  } catch (error: any) {
    console.error("Failed to register for tournament:", error);
    return { success: false, error: error.message || "Failed to register for tournament in database." };
  }
}

// Fetch user's registered teams (to show registration status on the Browse page)
export async function getUserRegistrations(userId: string) {
  const supabase = await createClient();
  try {
    const { data: teams, error } = await supabase
      .from('Teams')
      .select('tournamentId, status')
      .eq('captainId', userId);

    if (error) throw error;
    return teams || [];
  } catch (error) {
    console.error(`Failed to fetch user registrations for ${userId}:`, error);
    return [];
  }
}
