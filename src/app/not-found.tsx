import React from 'react';
import Link from 'next/link';
import { GlitchText } from '@/components/ui/GlitchText';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] halftone-bg scanline-bg relative text-center">
      <div className="z-10 space-y-6">
        <p className="font-ascii text-ms-white-60 tracking-widest">
          &gt; ERROR_404 :: SYSTEM_NOT_FOUND
        </p>
        <h1 className="text-6xl md:text-9xl font-orbitron font-bold text-ms-white">
          <GlitchText text="404" />
        </h1>
        <p className="font-rajdhani uppercase tracking-[3px] text-ms-white-90 text-xl">
          The requested module has been <span className="text-st-red">terminated</span>.
        </p>
        
        <div className="pt-8">
          <Link href="/" className="inline-flex border border-ms-white px-8 py-3 font-orbitron font-bold uppercase tracking-wider hover:border-ms-blue hover:text-ms-blue transition-colors hover:shadow-[0_0_16px_rgba(36,99,255,0.2)]">
            [ RETURN TO BASE ]
          </Link>
        </div>
      </div>
    </div>
  );
}
