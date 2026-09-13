import React from 'react';

const games = [
  { name: 'FREE FIRE MAX', status: 'ACTIVE' },
  { name: 'BGMI', status: 'ACTIVE' },
  { name: 'CODM', status: 'ACTIVE' },
  { name: 'MOBA', status: 'COMING SOON' },
  { name: 'LEGEND RC', status: 'COMING SOON' },
  { name: 'VALORANT', status: 'SCOUTING' }
];

export function GameTitles() {
  return (
    <section className="py-20 bg-ms-true-black border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: Game Titles */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-8">
              &gt; ACTIVE_DIVISIONS
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {games.map((game, i) => (
                <div key={i} className="border border-ms-border-dark bg-ms-panel-black p-4 text-center group hover:border-ms-blue transition-colors">
                  {/* Grayscale placeholder for game logo */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-ms-white-10 rounded-full flex items-center justify-center grayscale opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="font-ascii text-xs">IMG</span>
                  </div>
                  
                  <div className="font-orbitron text-sm text-ms-white mb-2">{game.name}</div>
                  
                  <span className={`text-xs font-mono tracking-widest ${
                    game.status === 'ACTIVE' ? 'text-ms-blue' : 
                    game.status === 'COMING SOON' ? 'text-ms-white' : 'text-ms-white-60'
                  }`}>
                    [{game.status}]
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Streaming Platforms */}
          <div>
            <div className="font-ascii text-ms-white-60 text-xs tracking-widest mb-8">
              &gt; STREAM_PLATFORMS
            </div>
            
            <div className="space-y-6">
              <div className="border border-ms-border-dark p-6 bg-ms-panel-black flex items-center justify-between opacity-70">
                <div className="flex items-center gap-4">
                  <div className="text-ms-white text-xl">▶</div>
                  <div>
                    <div className="font-orbitron font-bold text-ms-white">YOUTUBE</div>
                    <div className="font-rajdhani text-sm text-ms-white-60 tracking-widest">70% REVENUE SHARE</div>
                  </div>
                </div>
              </div>

              <div className="border border-ms-blue p-6 bg-ms-panel-black flex items-center justify-between relative overflow-hidden shadow-[0_0_20px_rgba(36,99,255,0.1)]">
                <div className="absolute inset-0 bg-ms-blue-dim"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="text-[#53FC18] text-xl font-bold font-ascii">[K]</div>
                  <div>
                    <div className="font-orbitron font-bold text-ms-white">KICK</div>
                    <div className="font-rajdhani text-sm text-ms-blue tracking-widest font-bold">95% REVENUE SHARE</div>
                  </div>
                </div>
                <div className="relative z-10 font-ascii text-xs text-ms-blue border border-ms-blue px-2 py-1">
                  PREFERRED
                </div>
              </div>

              <div className="border border-ms-border-dark p-4 bg-ms-true-black overflow-x-auto">
                <table className="w-full text-left font-ascii text-xs">
                  <thead>
                    <tr className="text-ms-white-60 border-b border-ms-white-10">
                      <th className="pb-2">PLATFORM</th>
                      <th className="pb-2">REVENUE</th>
                      <th className="pb-2">AUDIENCE</th>
                    </tr>
                  </thead>
                  <tbody className="text-ms-white">
                    <tr>
                      <td className="py-2">YouTube</td>
                      <td className="py-2 text-ms-white-60">70%</td>
                      <td className="py-2">Massive</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-ms-blue">Kick</td>
                      <td className="py-2 text-ms-blue font-bold">95%</td>
                      <td className="py-2 text-ms-white-90">Growing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
