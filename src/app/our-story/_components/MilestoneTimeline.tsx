'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

const MILESTONES = [
  { year: "2022", title: "THE INCEPTION", desc: "Started as a 4-man Free Fire squad playing local scrims." },
  { year: "2023", title: "FIRST CHAMPIONSHIP", desc: "Won the Bihar State Open. expanded to BGMI roster." },
  { year: "2024", title: "PRO LEAGUE", desc: "Top 8 finish in the National Championship." },
  { year: "2025", title: "TOURNAMENT HUB", desc: "Launched proprietary platform for managing thousands of players." },
]

export function MilestoneTimeline() {
  const containerRef = useRef(null)

  return (
    <section className="bg-[#050505] py-24 border-t border-[#111]" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="font-mono text-xs text-[#4A4A4A] mb-12 text-center">
          &lt; MILESTONES &gt;
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#1C1C1C]" />

          {MILESTONES.map((stone, i) => (
            <motion.div 
              key={stone.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex items-center mb-16 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#2463FF] -translate-x-[15px] md:-translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(36,99,255,0.4)]">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                <div className={`flex flex-col ${i % 2 === 0 ? 'md:items-start' : 'md:items-end md:text-right'}`}>
                  <span className="font-mono text-xl text-[#2463FF] mb-2">{stone.year}</span>
                  <h3 className="font-orbitron text-2xl font-bold text-white mb-3 uppercase">
                    {stone.title}
                  </h3>
                  <p className="font-inter text-[#999]">
                    {stone.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
