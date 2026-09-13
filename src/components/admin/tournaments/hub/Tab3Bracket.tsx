import React from 'react';

export function Tab3Bracket({ tournament }: { tournament?: any }) {
  return (
    <div className="space-y-6 font-jetbrains text-xs">
      
      {/* Generator Controls */}
      <div className="bg-[#050505] border border-[#1C1C1C] p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="space-y-3">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">FORMAT</label>
          <select className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
            <option>SINGLE_ELIMINATION</option>
            <option>DOUBLE_ELIMINATION</option>
            <option>GROUP_STAGE</option>
            <option>ROUND_ROBIN</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">SEEDING_LOGIC</label>
          <select className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
            <option>RANDOMIZED</option>
            <option>MANUAL_DRAG_DROP</option>
            <option>PAST_PERFORMANCE</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-end gap-4">
          <button className="flex-1 bg-blue-500/10 border border-blue-500 text-blue-500 font-bold tracking-widest uppercase p-4 hover:bg-blue-500 hover:text-black transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] text-[10px]">
            [GENERATE_BRACKET]
          </button>
          <button className="px-8 py-4 border border-[#333] text-ms-white-40 hover:text-ms-white hover:bg-[#111] hover:border-[#1C1C1C] transition-all font-bold tracking-widest uppercase text-[10px]">
            [RESET]
          </button>
        </div>

      </div>

      {/* Visual Bracket Area */}
      <div className="border border-[#1C1C1C] p-8 overflow-x-auto min-h-[400px] relative bg-[#050505]">
        
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center">
            <div className="text-ms-white-40 font-mono tracking-widest uppercase mb-2">No bracket data generated yet.</div>
            <div className="text-ms-white-60 font-jetbrains text-[10px] tracking-widest uppercase">
              Configure format and seeding logic, then click [GENERATE_BRACKET].
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t border-[#1C1C1C]">
        <button className="px-6 py-3 border border-[#333] text-ms-white hover:bg-[#111] transition-colors font-bold uppercase tracking-widest text-[10px]">
          [EXPORT_PNG]
        </button>
        <button className="px-6 py-3 border border-[#10b981] bg-[#10b981]/10 text-[#10b981] hover:bg-[#10b981] hover:text-black transition-all font-bold uppercase tracking-widest text-[10px] shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          [PUBLISH_BRACKET_TO_WEBSITE]
        </button>
      </div>

    </div>
  );
}
