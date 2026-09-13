import React from 'react';

export function Step6Review() {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      <div className="bg-[#10b981]/10 border border-[#10b981] p-6 text-[#10b981] mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
        <div className="font-bold tracking-widest uppercase mb-1">
          <span className="animate-pulse mr-2">_</span>
          SYSTEM_CHECK :: ALL_MODULES_CONFIGURED
        </div>
        <div className="font-bold tracking-widest uppercase opacity-80">
          <span className="invisible mr-2">_</span>
          READY_FOR_DEPLOYMENT
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Summary Block 1 */}
        <div className="border border-[#1C1C1C] p-6 bg-[#050505] space-y-4">
          <div className="text-ms-white-60 uppercase font-bold tracking-widest text-[10px] border-b border-[#1C1C1C] pb-2 mb-4 flex items-center gap-2">
            <span className="text-[#10b981]">{'>'}</span> CORE_DETAILS
          </div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40 font-bold tracking-widest text-[10px]">NAME:</span>
            <span className="text-ms-white font-bold uppercase">MS WINTER CLASH 2026</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40 font-bold tracking-widest text-[10px]">GAME:</span>
            <span className="text-ms-white font-bold uppercase">FREE FIRE MAX</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40 font-bold tracking-widest text-[10px]">TYPE:</span>
            <span className="text-ms-white font-bold uppercase">SQUAD (4v4)</span>
          </div>
        </div>

        {/* Summary Block 2 */}
        <div className="border border-[#1C1C1C] p-6 bg-[#050505] space-y-4">
          <div className="text-ms-white-60 uppercase font-bold tracking-widest text-[10px] border-b border-[#1C1C1C] pb-2 mb-4 flex items-center gap-2">
            <span className="text-yellow-500">{'>'}</span> SLOTS_&_PRIZE
          </div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40 font-bold tracking-widest text-[10px]">SLOTS:</span>
            <span className="text-ms-white font-bold uppercase">32 TEAMS</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40 font-bold tracking-widest text-[10px]">ENTRY:</span>
            <span className="text-ms-white font-bold uppercase">FREE</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C]/50 pb-2">
            <span className="text-ms-white-40 font-bold tracking-widest text-[10px]">PRIZE POOL:</span>
            <span className="text-[#10b981] font-bold uppercase">₹50,000</span>
          </div>
        </div>

      </div>

      <div className="border border-dashed border-[#333] p-8 bg-[#0A0A0A] text-ms-white-40 text-center uppercase tracking-widest font-bold">
        &gt; REVIEW_COMPLETE :: INITIATE_PUBLISH_PROTOCOL
      </div>

    </div>
  );
}
