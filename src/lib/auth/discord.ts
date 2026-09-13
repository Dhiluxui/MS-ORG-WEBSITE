import { createClient } from '@/lib/supabase/client';

export async function loginWithDiscord(redirectTo?: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    alert("Supabase is not configured! Please add NEXT_PUBLIC_SUPABASE_URL and ANON_KEY to .env.local");
    return;
  }

  const supabase = createClient();
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth-callback`,
      queryParams: {
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error("Error logging in:", error.message);
    alert("Login failed: " + error.message);
  }
}
