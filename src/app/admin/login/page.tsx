"use client";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GlitchText } from '@/components/ui/GlitchText';
import { loginWithDiscord } from '@/lib/auth/discord';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const details = searchParams.get('details');

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-orbitron font-bold text-3xl mb-2 text-white">ACCESS_PORTAL</h2>
        <p className="text-ms-white-60 font-mono text-sm">SECURE ADMIN AUTHENTICATION</p>
      </div>

      {error === 'not_member' && (
        <div className="border border-st-red bg-st-red/10 p-4 font-mono text-st-red">
          <p className="font-bold mb-2">&gt; ERROR :: NOT_A_MEMBER_OF_MS_DISCORD_ADMIN_GROUP</p>
          <p className="text-xs">&gt; ACTION_REQUIRED :: JOIN_SERVER_FIRST_AND_REQUEST_ROLE</p>
        </div>
      )}

      {error === 'auth_failed' && (
        <div className="border border-st-red bg-st-red/10 p-4 font-mono text-st-red">
          <p className="font-bold mb-2">&gt; ERROR :: AUTH_PROCESS_FAILED_OR_CANCELLED</p>
          <p className="text-xs mb-2">&gt; ACTION_REQUIRED :: PLEASE_AUTHORIZE_DISCORD_AND_TRY_AGAIN</p>
          {details && <p className="text-[10px] break-all opacity-80">&gt; DETAILS :: {details}</p>}
        </div>
      )}

      {error === 'unauthorized' && (
        <div className="border border-st-red bg-st-red/10 p-4 font-mono text-st-red">
          <p className="font-bold mb-2">&gt; ERROR :: UNAUTHORIZED_ACCESS</p>
          <p className="text-xs">&gt; ACTION_REQUIRED :: YOU_DO_NOT_HAVE_ADMIN_PRIVILEGES</p>
        </div>
      )}

      <Button onClick={() => loginWithDiscord()} variant="primary" fullWidth className="py-4 font-mono font-bold tracking-widest">
        [ LOGIN WITH DISCORD ]
      </Button>

      <div className="text-center">
        <Link href="/" className="font-mono text-ms-white-30 text-xs hover:text-ms-white transition-colors">
          &lt; RETURN_TO_PUBLIC_SITE
        </Link>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ms-true-black p-4 relative overflow-hidden">
      
      {/* Background terminal scanlines */}
      <div className="absolute inset-0 scanline-bg opacity-30 pointer-events-none"></div>

      <div className="z-10 w-full max-w-md bg-ms-panel-black border border-ms-border-dark p-8">
        
        <div className="text-center mb-8 flex flex-col items-center">
          <img src="/logo.png" alt="Magadh Striker Logo" className="w-20 h-auto mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
          <h1 className="font-orbitron font-bold text-xl text-ms-white tracking-widest uppercase mb-2">
            <GlitchText text="MAGADH STRIKER" />
          </h1>
          <p className="font-mono text-ms-white-60 text-[10px] tracking-widest">
            &gt; ADMIN PORTAL :: AUTH REQUIRED
          </p>
        </div>

        <Suspense fallback={<div className="text-center font-mono text-ms-white-60 text-xs animate-pulse">&gt; LOADING_AUTH_MODULE...</div>}>
          <LoginForm />
        </Suspense>

      </div>
    </div>
  );
}
