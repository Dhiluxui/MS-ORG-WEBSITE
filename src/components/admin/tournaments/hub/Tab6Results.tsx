import React from 'react';

export function Tab6Results({ tournament }: { tournament?: any }) {
  return (
    <div className="space-y-8 font-jetbrains text-xs">
      
      {/* Final Results Panel */}
      <div className="border border-[#1C1C1C] bg-[#050505] p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-5 blur-[100px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
        
        <h3 className="text-ms-white font-bold tracking-widest border-b border-[#1C1C1C] pb-4 uppercase text-[10px] flex items-center gap-2">
          <span className="text-yellow-500">{'>'}</span> FINAL_RESULTS_&_PAYOUTS
        </h3>

        <div className="space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border border-yellow-500/50 bg-yellow-500/5 p-6 shadow-[inset_0_0_20px_rgba(234,179,8,0.05)] gap-4">
            <div className="flex items-center gap-6">
              <div className="text-yellow-500 font-orbitron text-5xl font-bold drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">1</div>
              <div>
                <div className="text-yellow-500 tracking-widest uppercase font-bold text-[10px] mb-1">CHAMPION</div>
                <div className="text-ms-white text-2xl font-bold font-orbitron uppercase">Phoenix Squad</div>
              </div>
            </div>
            <div className="md:text-right flex flex-col md:items-end">
              <div className="text-[#10b981] font-bold text-3xl font-orbitron mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">₹12,500</div>
              <button className="bg-[#10b981]/10 text-[#10b981] font-bold tracking-widest border border-[#10b981] px-6 py-2 hover:bg-[#10b981] hover:text-black transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                [MARK_PAID_✓]
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between border border-[#1C1C1C] bg-[#0A0A0A] p-6 hover:border-[#C0C0C0]/50 transition-colors gap-4">
            <div className="flex items-center gap-6">
              <div className="text-[#C0C0C0] font-orbitron text-4xl font-bold drop-shadow-[0_0_5px_rgba(192,192,192,0.3)]">2</div>
              <div>
                <div className="text-ms-white-60 tracking-widest uppercase font-bold text-[10px] mb-1">RUNNER-UP</div>
                <div className="text-ms-white text-xl font-bold font-orbitron uppercase">NoScope Kings</div>
              </div>
            </div>
            <div className="md:text-right flex md:items-center justify-between md:justify-end gap-6">
              <div className="text-[#10b981] font-bold text-xl font-orbitron">₹7,500</div>
              <button className="bg-[#050505] text-ms-white-40 font-bold tracking-widest border border-[#1C1C1C] px-6 py-2 hover:bg-[#111] hover:text-ms-white transition-colors">
                [MARK_PAID]
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between border border-[#1C1C1C] bg-[#0A0A0A] p-6 hover:border-[#CD7F32]/50 transition-colors gap-4">
            <div className="flex items-center gap-6">
              <div className="text-[#CD7F32] font-orbitron text-4xl font-bold drop-shadow-[0_0_5px_rgba(205,127,50,0.3)]">3</div>
              <div>
                <div className="text-ms-white-60 tracking-widest uppercase font-bold text-[10px] mb-1">3RD PLACE</div>
                <div className="text-ms-white text-xl font-bold font-orbitron uppercase">Dark Hunters</div>
              </div>
            </div>
            <div className="md:text-right flex md:items-center justify-between md:justify-end gap-6">
              <div className="text-[#10b981] font-bold text-xl font-orbitron">₹5,000</div>
              <button className="bg-[#050505] text-ms-white-40 font-bold tracking-widest border border-[#1C1C1C] px-6 py-2 hover:bg-[#111] hover:text-ms-white transition-colors">
                [MARK_PAID]
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between border border-[#1C1C1C] bg-transparent p-6 border-dashed mt-6 gap-4 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-6">
              <div className="text-blue-500 font-orbitron text-4xl font-bold">MVP</div>
              <div>
                <div className="text-blue-500 tracking-widest uppercase font-bold text-[10px] mb-1">MOST KILLS</div>
                <div className="text-ms-white text-xl font-bold font-orbitron uppercase">PhoenixRaj_FF</div>
              </div>
            </div>
            <div className="md:text-right flex md:items-center justify-between md:justify-end gap-6">
              <div className="text-[#10b981] font-bold text-xl font-orbitron">₹500</div>
              <button className="bg-[#050505] text-ms-white-40 font-bold tracking-widest border border-[#1C1C1C] px-6 py-2 hover:bg-[#111] hover:text-ms-white transition-colors">
                [MARK_PAID]
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Post-Tournament Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="border border-blue-500 bg-blue-500/5 text-blue-500 hover:bg-blue-500 hover:text-black p-6 transition-all text-center group shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
          <div className="font-bold tracking-widest mb-2 text-[10px] uppercase group-hover:drop-shadow-none drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">[PUBLISH_FINAL_RESULTS]</div>
          <div className="text-blue-500/60 font-bold text-[9px] uppercase group-hover:text-black/60">Push to Public Website</div>
        </button>

        <button className="border border-[#10b981] bg-[#10b981]/5 text-[#10b981] hover:bg-[#10b981] hover:text-black p-6 transition-all text-center group shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          <div className="font-bold tracking-widest mb-2 text-[10px] uppercase group-hover:drop-shadow-none drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]">[SEND_WINNER_ANNOUNCEMENT]</div>
          <div className="text-[#10b981]/60 font-bold text-[9px] uppercase group-hover:text-black/60">In-App Push Notification</div>
        </button>

        <button className="border border-[#333] bg-[#050505] text-ms-white hover:text-black hover:bg-ms-white hover:border-ms-white p-6 transition-all text-center group">
          <div className="font-bold tracking-widest mb-2 text-[10px] uppercase">[GENERATE_CERTIFICATES]</div>
          <div className="text-ms-white-40 font-bold text-[9px] uppercase group-hover:text-black/60">Export PDFs</div>
        </button>
      </div>

      <div className="flex justify-center mt-12">
        <button className="text-red-500 border-b border-red-500/30 hover:border-red-500 hover:shadow-[0_5px_15px_-5px_rgba(239,68,68,0.5)] pb-1 transition-all uppercase tracking-widest font-bold text-[10px]">
          [⚠ ARCHIVE_TOURNAMENT_RECORD]
        </button>
      </div>

    </div>
  );
}
