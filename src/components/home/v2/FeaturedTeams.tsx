"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const teams = [
  {
    id: 'bgmi',
    name: 'TEAM BGMI',
    description: 'The reigning champions of Battlegrounds Mobile India. A roster built on pure aggression and tactical brilliance.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', // Placeholder
    achievements: ['BGIS 2024 Winners', 'BMPS 2023 Runner Up'],
  },
  {
    id: 'freefire',
    name: 'TEAM FREE FIRE',
    description: 'India\'s most feared Free Fire MAX squad. Known for their clutch potential and high-kill rotations.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', // Placeholder
    achievements: ['FFIC 2024 Champions', 'FFPL 2023 Finalists'],
  },
  {
    id: 'codm',
    name: 'TEAM CODM',
    description: 'Dominating the mobile FPS scene. A squad combining raw mechanical skill with veteran game sense.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', // Placeholder
    achievements: ['CODM World Champs 2023 - APAC', 'Regional Masters'],
  }
];

export function FeaturedTeams() {
  return (
    <section id="teams" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white uppercase tracking-wider mb-2">
              Our <span className="text-ms-blue">Divisions</span>
            </h2>
            <p className="font-inter text-ms-white-60">The elite squads representing Magadh Striker on the global stage.</p>
          </div>
          <Link href="/roster" className="hidden md:flex items-center gap-2 font-rajdhani uppercase tracking-widest text-ms-white hover:text-ms-blue transition-colors text-sm font-semibold">
            View All Rosters <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {teams.map((team, idx) => (
            <div key={team.id} className="group relative overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-ms-blue/50 transition-all duration-500">
              {/* Image Container */}
              <div className="relative h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img 
                  src={team.image} 
                  alt={team.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100"
                />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-orbitron font-bold text-3xl text-white uppercase mb-2 drop-shadow-lg">
                    {team.name}
                  </h3>
                  <div className="w-12 h-1 bg-ms-blue mb-4 group-hover:w-full transition-all duration-500" />
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                    <p className="font-inter text-sm text-ms-white-90 mb-4 line-clamp-2">
                      {team.description}
                    </p>
                    <ul className="space-y-1 mb-6">
                      {team.achievements.map((ach, i) => (
                        <li key={i} className="font-rajdhani text-xs uppercase tracking-wider text-ms-white-60 flex items-center gap-2">
                          <span className="w-1 h-1 bg-ms-blue rounded-full" /> {ach}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/roster/${team.id}`} className="inline-flex items-center justify-center w-full py-3 border border-white/20 font-orbitron text-xs font-bold uppercase tracking-widest text-white hover:bg-ms-blue hover:border-ms-blue transition-colors">
                      View Roster
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/roster" className="inline-flex items-center gap-2 font-rajdhani uppercase tracking-widest text-ms-white hover:text-ms-blue transition-colors text-sm font-semibold">
            View All Rosters <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
