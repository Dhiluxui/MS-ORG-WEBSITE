'use client'

import { useState } from 'react'

export function BracketTab({ tournament }: { tournament: any }) {
  const [format, setFormat] = useState('single')
  
  // Basic mock seeds
  const [seeds, setSeeds] = useState([
    { id: 1, name: 'Phoenix Squad' },
    { id: 2, name: 'Dark Hunters' },
    { id: 3, name: 'Ghost Protocol' },
    { id: 4, name: 'Striker Elite' },
    { id: 5, name: 'Apex Legends' },
    { id: 6, name: 'Void Walkers' },
    { id: 7, name: 'Neon Demons' },
    { id: 8, name: 'Cyber Ninjas' }
  ])

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
      {/* Left sidebar - Seeds */}
      <div className="w-full lg:w-80 border-r border-[#111] bg-[#070C1A] flex flex-col">
        <div className="p-4 border-b border-[#111]">
          <div className="font-mono text-xs text-[#4A4A4A] mb-3">&gt; TOURNAMENT_FORMAT</div>
          <select 
            value={format}
            onChange={e => setFormat(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-2 font-mono text-xs outline-none mb-4"
          >
            <option value="single">SINGLE ELIMINATION</option>
            <option value="double">DOUBLE ELIMINATION</option>
            <option value="group">GROUP STAGES</option>
          </select>
          
          <button className="w-full bg-[#111] hover:bg-[#1C1C1C] text-white font-mono text-xs py-2 transition-colors mb-2">
            [🎲 SHUFFLE SEEDS]
          </button>
          <button className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs py-2 transition-colors">
            [GENERATE BRACKET]
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="font-mono text-[10px] text-[#4A4A4A] mb-3">&gt; SEED_ORDER ({seeds.length})</div>
          <div className="space-y-2">
            {seeds.map((seed, idx) => (
              <div key={seed.id} className="flex items-center gap-3 bg-[#0A0A0A] border border-[#1C1C1C] p-2 hover:border-[#4A4A4A] cursor-grab">
                <div className="font-mono text-[10px] text-[#4A4A4A] w-4 text-right">
                  {idx + 1}
                </div>
                <div className="font-mono text-xs text-white truncate flex-1">
                  {seed.name}
                </div>
                <button className="text-[#4A4A4A] hover:text-red-400 font-mono text-[10px]">✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right area - Canvas */}
      <div className="flex-1 bg-[url('/grid-bg.png')] bg-repeat relative overflow-hidden flex flex-col">
        <div className="p-4 border-b border-[#111] flex justify-between items-center bg-[#070C1A]">
          <div className="font-mono text-xs text-[#4A4A4A]">&gt; BRACKET_CANVAS</div>
          <div className="flex gap-3">
            <button className="font-mono text-[10px] border border-[#1C1C1C] text-[#999] hover:text-white px-3 py-1.5 transition-colors">
              EXPORT PNG
            </button>
            <button className="font-mono text-[10px] border border-[#2463FF] text-[#2463FF] hover:bg-[#2463FF]/10 px-3 py-1.5 transition-colors">
              PUBLISH TO SITE
            </button>
          </div>
        </div>
        
        {/* Mock Bracket Visualizer */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="flex gap-16 min-w-max">
            {/* Round 1 */}
            <div className="flex flex-col justify-around gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-48 bg-[#0A0A0A] border border-[#1C1C1C] flex flex-col font-mono text-xs relative">
                  <div className="px-3 py-2 border-b border-[#111] flex justify-between">
                    <span className="text-white truncate">Team A</span>
                    <span className="text-[#4A4A4A]">0</span>
                  </div>
                  <div className="px-3 py-2 flex justify-between">
                    <span className="text-[#4A4A4A] truncate">Team B</span>
                    <span className="text-[#4A4A4A]">0</span>
                  </div>
                  {/* connector line */}
                  <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-[#1C1C1C]"></div>
                </div>
              ))}
            </div>

            {/* Round 2 */}
            <div className="flex flex-col justify-around gap-16">
              {[1,2].map(i => (
                <div key={i} className="w-48 bg-[#0A0A0A] border border-[#1C1C1C] flex flex-col font-mono text-xs relative">
                  {/* connector vertical line to previous round */}
                  <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-[#1C1C1C]"></div>
                  <div className="absolute -top-[calc(50%+16px)] -left-8 w-[1px] h-[calc(100%+32px)] bg-[#1C1C1C]"></div>
                  
                  <div className="px-3 py-2 border-b border-[#111] flex justify-between">
                    <span className="text-[#4A4A4A] truncate">TBD</span>
                    <span className="text-[#4A4A4A]">-</span>
                  </div>
                  <div className="px-3 py-2 flex justify-between">
                    <span className="text-[#4A4A4A] truncate">TBD</span>
                    <span className="text-[#4A4A4A]">-</span>
                  </div>
                  <div className="absolute top-1/2 -right-8 w-8 h-[1px] bg-[#1C1C1C]"></div>
                </div>
              ))}
            </div>

            {/* Finals */}
            <div className="flex flex-col justify-around">
              <div className="w-48 border border-[#2463FF] shadow-[0_0_16px_rgba(36,99,255,0.1)] bg-[#0A0A0A] flex flex-col font-mono text-xs relative">
                <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-[#1C1C1C]"></div>
                <div className="absolute -top-[calc(100%+32px)] -left-8 w-[1px] h-[calc(200%+64px)] bg-[#1C1C1C]"></div>

                <div className="px-3 py-2 border-b border-[#111] flex justify-between bg-[#2463FF]/10">
                  <span className="text-[#2463FF] truncate">GRAND FINAL</span>
                </div>
                <div className="px-3 py-2 border-b border-[#111] flex justify-between">
                  <span className="text-[#4A4A4A] truncate">TBD</span>
                  <span className="text-[#4A4A4A]">-</span>
                </div>
                <div className="px-3 py-2 flex justify-between">
                  <span className="text-[#4A4A4A] truncate">TBD</span>
                  <span className="text-[#4A4A4A]">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
