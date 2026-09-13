"use client";
import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2022', title: 'ORGANIZATION FOUNDED', desc: 'Bihar, India' },
  { year: '2023', title: 'FIRST FREE FIRE MAX COMPETITIVE SQUAD', desc: 'Local Dominance' },
  { year: '2023', title: 'FIRST NATIONAL TOURNAMENT QUALIFIER', desc: 'National Recognition' },
  { year: '2024', title: 'BGMI DIVISION + OFFICIAL MERCH STORE', desc: 'Expansion Phase' },
  { year: '2025', title: 'GOVERNMENT SCRIM PARTNERSHIPS', desc: 'Institutional Backing' },
  { year: '2025', title: '500+ PLAYERS SCOUTED THROUGH PLATFORM', desc: 'Grassroots Talent' },
  { year: '2026', title: 'FULL PLATFORM LAUNCH | WEBSITE V1 LIVE', desc: 'Digital Era' },
  { year: '2026', title: 'MULTI-GAME EXPANSION | INTERNATIONAL GOALS', desc: 'The Future' },
];

export function MilestoneTimeline() {
  return (
    <section className="py-24 bg-ms-true-black border-t border-ms-border-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-16 text-center">
          &gt; SYSTEM_LOG :: MILESTONES
        </div>
        
        <div className="relative border-l border-ms-border-dark ml-4 md:ml-0 md:border-l-0">
          {/* Desktop Center Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-ms-border-dark transform -translate-x-1/2"></div>
          
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative mb-12 md:mb-24 flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] md:left-1/2 top-1 w-2 h-2 bg-ms-white rounded-full transform md:-translate-x-1/2 shadow-[0_0_10px_#fff]"></div>
              
              {/* Content */}
              <div className="ml-8 md:ml-0 md:w-1/2 px-4 md:px-12">
                <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                  <div className="font-jetbrains text-ms-blue text-xl font-bold mb-2">
                    {m.year}
                  </div>
                  <h3 className="font-rajdhani font-bold text-lg text-ms-white uppercase tracking-widest mb-1">
                    {m.title}
                  </h3>
                  <div className="font-inter text-sm text-ms-white-60">
                    {m.desc}
                  </div>
                </div>
              </div>
              
            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
}
