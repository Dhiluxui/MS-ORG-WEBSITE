import React from 'react';

export function Step3Slots() {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="space-y-3">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">MAX_TEAM_SLOTS</label>
          <input 
            type="number" 
            className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all font-orbitron text-xl font-bold"
            placeholder="e.g. 32"
          />
        </div>

        <div className="space-y-3">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">WAITLIST_CAPACITY</label>
          <input 
            type="number" 
            className="w-full bg-[#050505] border border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all font-orbitron text-xl font-bold"
            placeholder="e.g. 10"
          />
        </div>

      </div>

      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative space-y-6">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-yellow-500">{'>'}</span> REGISTRATION_MODE
        </h3>
        
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="regMode" className="accent-[#10b981] w-4 h-4" defaultChecked />
            <span className="text-ms-white font-bold tracking-widest group-hover:text-[#10b981] transition-colors">OPEN_TO_ALL (PUBLIC)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="regMode" className="accent-[#10b981] w-4 h-4" />
            <span className="text-ms-white font-bold tracking-widest group-hover:text-[#10b981] transition-colors">INVITE_ONLY (PRIVATE CODE REQUIRED)</span>
          </label>
        </div>

        {/* Optional Invite Code Field */}
        <div className="mt-6 pt-6 border-t border-[#1C1C1C] border-dashed space-y-3 opacity-50 pointer-events-none">
          <label className="text-ms-white-30 tracking-widest uppercase block text-[10px] font-bold">GENERATE_INVITE_CODE</label>
          <div className="flex">
            <input 
              type="text" 
              className="w-full bg-[#0A0A0A] border border-[#1C1C1C] border-r-0 p-4 text-ms-white focus:outline-none font-orbitron font-bold text-lg"
              placeholder="e.g. MS-INV-2026"
              disabled
            />
            <button className="bg-[#1C1C1C] text-ms-white px-6 font-bold tracking-widest uppercase hover:text-[#10b981] hover:bg-[#333] transition-colors border border-[#1C1C1C]">
              [GENERATE]
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
