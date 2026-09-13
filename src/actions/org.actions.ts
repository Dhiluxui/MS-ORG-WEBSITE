"use server";

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function upgradeOrgTier(tier: string) {
  const supabase = await createClient();
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { success: false, error: 'User not authenticated' };
  }

  // Update profile tier
  const { error } = await supabase
    .from('profiles')
    .update({ tier })
    .eq('id', user.id);

  if (error) {
    console.warn("Could not update tier (maybe column is missing):", error.message);
  }

  revalidatePath('/org/upgrade');
  revalidatePath('/org');
  return { success: true };
}

export async function getOrgTier() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 'ROOKIE';

  try {
    const { data } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', user.id)
      .maybeSingle();
      
    return data?.tier || 'ROOKIE';
  } catch {
    return 'ROOKIE';
  }
}
