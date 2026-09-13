import { Trophy, Server, ShoppingBag, Handshake, Video, Users } from 'lucide-react'

const SERVICES = [
  {
    id: "01",
    icon: Trophy,
    title: "COMPETITIVE ROSTER",
    desc: "End-to-end player scouting, coaching programs, contract management, and performance analytics for all game divisions."
  },
  {
    id: "02",
    icon: Server,
    title: "TOURNAMENT HOSTING",
    desc: "Other organizations can host their own tournaments on the MS platform. Full registration, bracket, scoring, and results management included."
  },
  {
    id: "03",
    icon: ShoppingBag,
    title: "MERCHANDISE & GEAR",
    desc: "Official MS jerseys, caps, mousepads, and custom gaming peripherals. Pan-India shipping. White-label options for partner orgs."
  },
  {
    id: "04",
    icon: Handshake,
    title: "SPONSORSHIPS",
    desc: "3-tier brand partnership packages — Bronze, Gold, and Title Sponsor. Government CSR and esports development packages available."
  },
  {
    id: "05",
    icon: Video,
    title: "CONTENT & MEDIA",
    desc: "Match highlights, team vlogs, YouTube + Kick stream production, social media management, and brand storytelling."
  },
  {
    id: "06",
    icon: Users,
    title: "PLAYER AUDITIONS",
    desc: "Open tryouts for all game divisions. Talent scouting, development pipeline, and pathway from grassroots to pro roster."
  }
]

export function ServicesGrid() {
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon
            return (
              <div 
                key={srv.id} 
                className="bg-[#0A0A0A] border border-[#1C1C1C] p-6 group hover:border-[#2463FF] hover:shadow-[0_0_16px_rgba(36,99,255,0.2)] transition-all duration-300"
              >
                <div className="font-mono text-xs text-[#4A4A4A] mb-4">
                  ╔═══ SERVICE_{srv.id} ═══╗
                </div>
                <Icon className="text-white w-7 h-7 mb-4" />
                <h3 className="font-rajdhani font-semibold text-lg text-white mb-2 tracking-wide uppercase">
                  {srv.title}
                </h3>
                <p className="font-inter text-sm text-[#999] leading-relaxed group-hover:text-[#E8E8E8] transition-colors">
                  {srv.desc}
                </p>
                <div className="mt-6 border-b-2 border-transparent group-hover:border-[#2463FF] transition-all w-12" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
