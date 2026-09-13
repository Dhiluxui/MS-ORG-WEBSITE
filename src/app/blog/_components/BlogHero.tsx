'use client'

export function BlogHero() {
  return (
    <section className="relative flex flex-col justify-center min-h-[40vh] bg-black overflow-hidden pt-32 pb-16 border-b border-[#111]">
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)'
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="font-mono text-xs text-[#4A4A4A] mb-4">
          // MS_INTEL //
        </div>
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4 uppercase">
          THE STRATEGY ROOM
        </h1>
        <p className="font-rajdhani text-xl text-[#999] max-w-2xl tracking-wide">
          Tournament recaps, patch analysis, roster announcements, and inside intel.
        </p>
      </div>
    </section>
  )
}
