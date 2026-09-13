import React from 'react';

export function Step2Schedule() {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      {/* Registration Phase */}
      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest mb-6 border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-blue-500">{'>'}</span> PHASE_1 :: REGISTRATION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-ms-white-30 uppercase block text-[10px] tracking-widest font-bold">OPENS_AT (IST)</label>
            <input type="datetime-local" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all" />
          </div>
          <div className="space-y-3">
            <label className="text-ms-white-30 uppercase block text-[10px] tracking-widest font-bold">CLOSES_AT (IST)</label>
            <input type="datetime-local" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all" />
          </div>
        </div>
      </div>

      {/* Tournament Phase */}
      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest mb-6 border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-[#10b981]">{'>'}</span> PHASE_2 :: TOURNAMENT_DAYS
        </h3>
        
        {/* Day Builder */}
        <div className="space-y-4">
          
          <div className="border border-[#1C1C1C] bg-[#0A0A0A] p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-[#333] transition-colors group">
            <span className="text-ms-white-40 w-16 font-bold tracking-widest group-hover:text-[#10b981] transition-colors">DAY_01</span>
            <input type="date" className="bg-[#050505] border border-[#1C1C1C] p-3 text-ms-white flex-1 focus:outline-none focus:border-[#10b981] transition-colors" />
            <input type="text" placeholder="e.g. Qualifiers Group A & B" className="bg-[#050505] border border-[#1C1C1C] p-3 text-ms-white flex-[2] focus:outline-none focus:border-[#10b981] transition-colors" />
            <button className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 transition-all font-bold tracking-widest">
              [X]
            </button>
          </div>

          <div className="border border-[#1C1C1C] bg-[#0A0A0A] p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-[#333] transition-colors group">
            <span className="text-ms-white-40 w-16 font-bold tracking-widest group-hover:text-[#10b981] transition-colors">DAY_02</span>
            <input type="date" className="bg-[#050505] border border-[#1C1C1C] p-3 text-ms-white flex-1 focus:outline-none focus:border-[#10b981] transition-colors" />
            <input type="text" placeholder="e.g. Semi-Finals" className="bg-[#050505] border border-[#1C1C1C] p-3 text-ms-white flex-[2] focus:outline-none focus:border-[#10b981] transition-colors" />
            <button className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 transition-all font-bold tracking-widest">
              [X]
            </button>
          </div>

          <button className="w-full border border-dashed border-[#333] text-ms-white-40 hover:text-[#10b981] hover:border-[#10b981] hover:bg-[#10b981]/5 p-4 transition-all uppercase tracking-widest font-bold">
            [+ ADD_MATCH_DAY]
          </button>
        </div>
      </div>

    </div>
  );
}
