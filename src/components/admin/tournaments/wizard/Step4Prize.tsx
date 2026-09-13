import React from 'react';

export function Step4Prize() {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      {/* Prize Pool */}
      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest mb-6 border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-[#10b981]">{'>'}</span> PRIZE_POOL_CONFIG
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-ms-white-30 uppercase block tracking-widest text-[10px] font-bold">TOTAL_PRIZE_POOL (₹)</label>
            <input type="number" placeholder="e.g. 50000" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-4 text-[#10b981] font-orbitron text-2xl font-bold focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-ms-white-30 uppercase block text-[10px] font-bold tracking-widest">1ST_PLACE (%)</label>
              <input type="number" placeholder="50" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white font-bold focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-ms-white-30 uppercase block text-[10px] font-bold tracking-widest">2ND_PLACE (%)</label>
              <input type="number" placeholder="30" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white font-bold focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-ms-white-30 uppercase block text-[10px] font-bold tracking-widest">3RD_PLACE (%)</label>
              <input type="number" placeholder="20" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white font-bold focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all" />
            </div>
          </div>
        </div>
      </div>

      {/* Entry Fee */}
      <div className="border border-[#1C1C1C] p-6 bg-[#050505] relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
        <h3 className="text-ms-white font-bold tracking-widest mb-6 border-b border-[#1C1C1C] pb-2 uppercase text-[10px]">
          <span className="text-red-500">{'>'}</span> ENTRY_FEE_&_PAYMENT
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="entryMode" className="accent-[#10b981] w-4 h-4" defaultChecked />
              <span className="text-ms-white font-bold tracking-widest group-hover:text-[#10b981] transition-colors">FREE_ENTRY</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="entryMode" className="accent-[#10b981] w-4 h-4" />
              <span className="text-ms-white font-bold tracking-widest group-hover:text-[#10b981] transition-colors">PAID_ENTRY</span>
            </label>
          </div>

          {/* Paid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#1C1C1C] border-dashed opacity-50 pointer-events-none">
            <div className="space-y-2">
              <label className="text-ms-white-30 uppercase block text-[10px] font-bold tracking-widest">ENTRY_FEE_PER_TEAM (₹)</label>
              <input type="number" placeholder="e.g. 500" disabled className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-ms-white-30 uppercase block text-[10px] font-bold tracking-widest">ORG_UPI_ID</label>
              <input type="text" placeholder="magadh@upi" disabled className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
