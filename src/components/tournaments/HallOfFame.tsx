'use client';

import { motion } from 'framer-motion';

// Mock data for scaffold
const HALL_OF_FAME_DATA = [
  {
    id: '1',
    team_name: 'TEAM ANTIGRAVITY',
    tournament_name: 'WINTER BRAWL 2025',
    prize_won: 50000,
    image_url: 'https://via.placeholder.com/600x400/111/444?text=TEAM+ANTIGRAVITY',
  },
  {
    id: '2',
    team_name: 'STRIKE FORCE',
    tournament_name: 'SUMMER SHOWDOWN',
    prize_won: 75000,
    image_url: 'https://via.placeholder.com/600x400/111/444?text=STRIKE+FORCE',
  },
  {
    id: '3',
    team_name: 'NEON DRAGONS',
    tournament_name: 'ELITE SCRIMS',
    prize_won: 25000,
    image_url: 'https://via.placeholder.com/600x400/111/444?text=NEON+DRAGONS',
  }
];

export function HallOfFame() {
  return (
    <section className="py-24 border-t border-[#1C1C1C] relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-mono text-xs text-[#2463FF] mb-4 tracking-widest">{'>'} LEGENDS_NEVER_DIE</span>
          <h2 className="font-orbitron font-black text-4xl md:text-6xl text-white mb-6 uppercase">
            HALL OF FAME
          </h2>
          <p className="font-rajdhani text-lg text-white/60 max-w-2xl">
            IMMORTALIZING THE CHAMPIONS WHO CONQUERED THE MAGADH STRIKER TOURNAMENTS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HALL_OF_FAME_DATA.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border border-[#1C1C1C] bg-[#0A0A0A] overflow-hidden cursor-pointer"
            >
              <div className="aspect-video overflow-hidden border-b border-[#1C1C1C] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={item.image_url} 
                  alt={item.team_name}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur px-2 py-1 border border-white/10 font-mono text-[10px] text-white">
                  👑 CHAMPIONS
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#2463FF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-2 group-hover:text-[#2463FF] transition-colors">
                  {item.team_name}
                </h3>
                <div className="font-mono text-xs text-white/60 space-y-1">
                  <p>{`> TOURNAMENT :: ${item.tournament_name}`}</p>
                  <p className="text-white">{`> PRIZE      :: ₹${item.prize_won.toLocaleString()}`}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
