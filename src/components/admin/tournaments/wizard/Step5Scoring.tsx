import React from 'react';

export function Step5Scoring() {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Formula Selection */}
        <div className="space-y-3">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">SCORING_SYSTEM</label>
          <select className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] transition-all appearance-none cursor-pointer">
            <option>STANDARD_BATTLE_ROYALE</option>
            <option>KILL_RACE_ONLY</option>
            <option>ROUND_ROBIN_POINTS</option>
            <option>CUSTOM_FORMULA</option>
          </select>
        </div>

        {/* BR Specifics */}
        <div className="space-y-3">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">PTS_PER_KILL</label>
          <input 
            type="number" 
            defaultValue={1}
            className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all font-orbitron font-bold text-xl"
          />
        </div>

      </div>

      {/* Placement Points Table */}
      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative space-y-6">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-[#10b981]">{'>'}</span> PLACEMENT_POINTS_DISTRIBUTION
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[12, 9, 7, 5, 4, 3, 2, 1].map((pts, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-[#1C1C1C] p-3 hover:border-[#10b981]/50 transition-all group">
              <div className="text-ms-white-40 mb-2 font-bold tracking-widest uppercase text-[10px] group-hover:text-[#10b981] transition-colors">#{idx + 1}</div>
              <input type="number" defaultValue={pts} className="w-full bg-transparent text-center text-ms-white font-orbitron text-xl font-bold outline-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Room ID Pattern */}
      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative space-y-6">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-blue-500">{'>'}</span> AUTO_ROOM_ID_GENERATOR
        </h3>
        <div className="space-y-3">
          <label className="text-ms-white-30 uppercase block text-[10px] font-bold tracking-widest">PREFIX</label>
          <div className="flex">
            <input 
              type="text" 
              defaultValue="MS-WINTER-"
              className="w-full bg-[#0A0A0A] border border-[#1C1C1C] border-r-0 p-4 text-ms-white font-orbitron text-lg font-bold focus:outline-none transition-all"
            />
            <div className="bg-[#1C1C1C] text-[#10b981] font-bold tracking-widest px-6 py-4 flex items-center shrink-0 uppercase border border-[#1C1C1C]">
              [RANDOM_4_DIGITS]
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
