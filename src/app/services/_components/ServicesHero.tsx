'use client'

import { useEffect, useState } from 'react'

export function ServicesHero() {
  const [typedText, setTypedText] = useState('')
  const fullText = '> MS_ESPORTS::SERVICES_MODULE\n> STATUS :: ONLINE'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex flex-col justify-center min-h-[50vh] bg-black overflow-hidden pt-32 pb-16" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}>
      {/* Background Layers */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <pre className="font-mono text-xs text-[#4A4A4A] mb-6 min-h-[2.5rem]">
          {typedText}
          <span className="animate-pulse">_</span>
        </pre>
        <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
          WHAT WE OFFER
        </h1>
        <p className="font-rajdhani text-xl text-[#999] max-w-2xl">
          Full-stack esports — from competitive rosters to government tournament infrastructure.
        </p>
      </div>
    </section>
  )
}
