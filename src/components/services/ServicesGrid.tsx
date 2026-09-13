import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { Target, Trophy, ShoppingCart, Shield, Video, Users } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "COMPETITIVE ROSTER",
    desc: "Scouting, coaching, and pro player contracts for elite talent.",
    icon: Target
  },
  {
    id: "02",
    title: "TOURNAMENT HOSTING",
    desc: "Other organizations can host their tournaments on our infrastructure.",
    icon: Trophy
  },
  {
    id: "03",
    title: "MERCHANDISE & GEAR",
    desc: "Official jerseys, caps, mousepads, and custom gaming peripherals.",
    icon: ShoppingCart
  },
  {
    id: "04",
    title: "SPONSORSHIPS",
    desc: "Title, Gold, and Bronze brand partnerships with full integration.",
    icon: Shield
  },
  {
    id: "05",
    title: "CONTENT & MEDIA",
    desc: "YouTube streams, social media presence, and professional highlights.",
    icon: Video
  },
  {
    id: "06",
    title: "PLAYER AUDITIONS",
    desc: "Open tryouts and scouting grounds for all major game divisions.",
    icon: Users
  }
];

export function ServicesGrid() {
  return (
    <section className="py-20 bg-ms-deep-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <TerminalCard key={service.id} className="relative group transition-all duration-300">
              
              {/* Blue corner triangle on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-t-ms-blue border-l-[16px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="font-ascii text-ms-white-30 text-[10px] sm:text-xs tracking-widest mb-6">
                ╔═══════════════════════╗<br/>
                ║ SERVICE_{service.id}{" ".repeat(14 - service.id.length)}║<br/>
                ╚═══════════════════════╝
              </div>
              
              <div className="mb-4 text-ms-white group-hover:text-ms-blue transition-colors">
                <service.icon size={28} />
              </div>
              
              <h3 className="font-rajdhani font-bold text-xl text-ms-white uppercase tracking-widest mb-3">
                {service.id}. {service.title}
              </h3>
              
              <p className="font-inter text-sm text-ms-white-60 leading-relaxed">
                {service.desc}
              </p>
              
            </TerminalCard>
          ))}
        </div>
        
      </div>
    </section>
  );
}
