"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function AuthCallbackContent() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const handleAuth = async () => {
      try {
        const supabase = createClient();
        
        // When using createBrowserClient, it automatically exchanges the code 
        // or parses the hash fragment on load. We just need to get the session.
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        if (!session) {
          // It might take a second for the session to be populated from the URL hash/code.
          // Let's retry once after a short delay.
          await new Promise(resolve => setTimeout(resolve, 1000));
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (!retrySession) {
             throw new Error("No session found after OAuth redirect. Please try again.");
          }
        }
        
        const { data: { session: finalSession } } = await supabase.auth.getSession();
        const user = finalSession?.user;
        
        if (!user) throw new Error("No user found in session");

        // Fetch existing user to avoid overwriting their role
        const { data: existingUser } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        const finalRole = existingUser?.role || 'admin';

        // Upsert the user to our database
        const { error: upsertError } = await supabase.from('users').upsert({
          id: user.id,
          discord_id: user.user_metadata.provider_id ?? '',
          discord_username: user.user_metadata.full_name ?? user.user_metadata.name ?? 'Unknown',
          discord_avatar: user.user_metadata.avatar_url ?? null,
          email: user.email ?? null,
          role: finalRole,
        }, { onConflict: 'id', ignoreDuplicates: false }); 

        if (upsertError) throw upsertError;

        if (isMounted) {
          router.push('/home'); // Redirect to portal dashboard
        }
      } catch (err: any) {
        console.error("Auth callback error:", err);
        if (isMounted) {
          setError(err.message);
          setTimeout(() => {
            router.push(`/admin/login?error=auth_failed&details=${encodeURIComponent(err.message)}`);
          }, 3000);
        }
      }
    };

    handleAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="text-white font-mono text-center flex flex-col items-center gap-4">
      <p className="animate-pulse text-ms-blue">&gt; AUTHENTICATING_WITH_DISCORD...</p>
      {error && (
        <div className="border border-st-red bg-st-red/10 p-4 font-mono text-st-red max-w-lg mt-4">
          <p className="font-bold mb-2">&gt; ERROR :: {error}</p>
          <p className="text-xs">&gt; REDIRECTING_BACK_TO_LOGIN...</p>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
       {/* Background terminal scanlines */}
       <div className="absolute inset-0 scanline-bg opacity-30 pointer-events-none"></div>
       <div className="z-10 w-full max-w-md bg-ms-panel-black border border-ms-border-dark p-8 shadow-[0_0_30px_rgba(36,99,255,0.1)]">
         <Suspense fallback={<div className="text-white font-mono text-center animate-pulse">&gt; LOADING...</div>}>
           <AuthCallbackContent />
         </Suspense>
       </div>
    </div>
  );
}
