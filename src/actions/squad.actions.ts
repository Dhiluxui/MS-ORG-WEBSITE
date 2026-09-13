"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Create a new Squad
export async function createSquad(data: {
  name: string;
  tag: string;
  game: string;
  captainDiscord: string;
  captainPhone: string;
  captainEmail: string;
  userId: string;
  ign: string;
}) {
  const supabase = await createClient();
  try {
    // 1. Insert Squad
    const { data: newSquad, error: squadError } = await supabase
      .from('Squads')
      .insert([
        {
          name: data.name,
          tag: data.tag,
          game: data.game,
          captainId: data.userId,
          captainDiscord: data.captainDiscord,
          captainPhone: data.captainPhone,
          captainEmail: data.captainEmail,
        }
      ])
      .select()
      .single();

    if (squadError) {
      console.error("Supabase Squad Insert Error:", squadError);
      throw squadError;
    }

    // 2. Insert the Captain into SquadMembers
    const { error: memberError } = await supabase
      .from('SquadMembers')
      .insert([
        {
          squadId: newSquad.id,
          userId: data.userId,
          ign: data.ign,
          role: 'Captain',
        }
      ]);

    if (memberError) {
      console.error("Supabase SquadMembers Insert Error:", memberError);
      throw memberError;
    }
    
    revalidatePath('/team');
    return { success: true, id: newSquad.id };
  } catch (error: any) {
    console.error("Failed to create squad:", error);
    return { success: false, error: error.message || "Failed to create squad in database." };
  }
}

// Fetch user's active squads
export async function getUserSquads(userId: string) {
  const supabase = await createClient();
  try {
    const { data: squads, error } = await supabase
      .from('Squads')
      .select('*, SquadMembers(*)')
      .eq('captainId', userId); // For V1, we fetch squads where they are captain

    if (error) throw error;
    return squads || [];
  } catch (error) {
    console.error(`Failed to fetch user squads for ${userId}:`, error);
    return [];
  }
}
