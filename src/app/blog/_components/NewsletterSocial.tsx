'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function NewsletterSocial() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="bg-[#050505] py-20 border-t border-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Newsletter */}
          <div className="p-8 border border-[#1C1C1C] bg-[#0A0A0A]">
            <div className="font-mono text-xs text-[#2463FF] mb-4">
              ╔══ DATA_STREAM_SUBSCRIBE ══╗
            </div>
            <h3 className="font-orbitron text-2xl font-bold text-white mb-2">
              THE MS BRIEFING
            </h3>
            <p className="font-inter text-sm text-[#999] mb-6">
              Get tournament announcements, patch notes, and exclusive intel directly to your inbox. No spam.
            </p>
            
            {success ? (
              <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 p-4 font-mono text-sm text-[#22C55E]">
                &gt; SUBSCRIPTION_CONFIRMED
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="> ENTER_EMAIL"
                  required
                  className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 flex-1 transition-colors placeholder:text-[#4A4A4A]"
                />
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? '...' : 'SUBSCRIBE'}
                </Button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="p-8 border border-[#1C1C1C] bg-[#0A0A0A] flex flex-col justify-center">
            <div className="font-mono text-xs text-[#4A4A4A] mb-6">
              // EXTERNAL_COMMUNICATIONS
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://discord.gg/ms" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-[#1C1C1C] hover:border-[#2463FF] transition-colors">
                <span className="font-orbitron font-bold text-white group-hover:text-[#2463FF] transition-colors">DISCORD</span>
                <span className="font-mono text-xs text-[#4A4A4A]">&gt;</span>
              </a>
              <a href="https://instagram.com/magadhstriker" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-[#1C1C1C] hover:border-[#2463FF] transition-colors">
                <span className="font-orbitron font-bold text-white group-hover:text-[#2463FF] transition-colors">INSTAGRAM</span>
                <span className="font-mono text-xs text-[#4A4A4A]">&gt;</span>
              </a>
              <a href="https://youtube.com/@magadhstriker" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-[#1C1C1C] hover:border-[#2463FF] transition-colors">
                <span className="font-orbitron font-bold text-white group-hover:text-[#2463FF] transition-colors">YOUTUBE</span>
                <span className="font-mono text-xs text-[#4A4A4A]">&gt;</span>
              </a>
              <a href="https://twitter.com/magadhstriker" target="_blank" rel="noreferrer" className="group flex items-center justify-between p-4 border border-[#1C1C1C] hover:border-[#2463FF] transition-colors">
                <span className="font-orbitron font-bold text-white group-hover:text-[#2463FF] transition-colors">TWITTER</span>
                <span className="font-mono text-xs text-[#4A4A4A]">&gt;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
