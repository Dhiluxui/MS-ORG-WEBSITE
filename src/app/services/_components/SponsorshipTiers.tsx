"use client"

import { Button } from '@/components/ui/Button'

export function SponsorshipTiers() {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-black py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center mb-12">
          <pre className="font-mono text-xs text-[#4A4A4A]">
            ─── SPONSOR_TIERS ──── ◆ ────────────────
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Bronze Tier */}
          <div className="bg-[#0A0A0A] border border-[#1C1C1C] p-6 flex flex-col h-full hover:border-white/30 transition-colors">
            <div className="font-mono text-xs text-white/60 mb-6 text-center">
              ╔══ BRONZE_PARTNER ══╗
            </div>
            <div className="text-center mb-8">
              <span className="font-mono text-2xl text-white">₹15,000</span>
              <span className="font-mono text-sm text-[#999]">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow font-inter text-sm text-[#E8E8E8]">
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Jersey sleeve logo
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Social media mentions (3/month)
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Website logo placement
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Discord server credit
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-auto" onClick={scrollToContact}>
              CONTACT US
            </Button>
          </div>

          {/* Gold Tier (POPULAR) */}
          <div className="bg-[#050505] border border-[#2463FF] p-6 flex flex-col h-full relative shadow-[0_0_16px_rgba(36,99,255,0.15)] transform md:-translate-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2463FF] font-mono text-[10px] px-3 py-1 font-bold text-white uppercase tracking-wider">
              POPULAR
            </div>
            <div className="font-mono text-xs text-[#2463FF] mb-6 text-center mt-2">
              ╔══ [GOLD_PARTNER] ══╗
            </div>
            <div className="text-center mb-8">
              <span className="font-mono text-3xl text-white">₹35,000</span>
              <span className="font-mono text-sm text-[#999]">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow font-inter text-sm text-[#E8E8E8]">
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Jersey chest placement
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Tournament co-naming rights
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Match day banner (physical)
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Feature content placement
              </li>
              <li className="flex gap-2 opacity-60">
                <span className="font-mono text-[#4A4A4A]">&gt;</span> All Bronze perks included
              </li>
            </ul>
            <Button variant="primary" className="w-full mt-auto" onClick={scrollToContact}>
              CONTACT US
            </Button>
          </div>

          {/* Title Tier */}
          <div className="bg-[#0A0A0A] border border-dashed border-[#4A4A4A] p-6 flex flex-col h-full hover:border-[#999] transition-colors">
            <div className="font-mono text-xs text-[#999] mb-6 text-center">
              ╔══ TITLE_SPONSOR ══╗
            </div>
            <div className="text-center mb-8">
              <span className="font-mono text-2xl text-white">CUSTOM</span>
              <span className="font-mono text-sm text-[#999]"> PACKAGE</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow font-inter text-sm text-[#E8E8E8]">
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Jersey FRONT logo (primary)
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Full naming rights — all platforms
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Exclusive category rights
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Dedicated content campaigns
              </li>
              <li className="flex gap-2">
                <span className="font-mono text-[#2463FF]">&gt;</span> Priority tournament placement
              </li>
              <li className="flex gap-2 opacity-60">
                <span className="font-mono text-[#4A4A4A]">&gt;</span> All Gold + Bronze perks
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-auto" onClick={scrollToContact}>
              CONTACT US
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
