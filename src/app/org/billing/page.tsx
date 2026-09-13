"use client";

import React from 'react';

export default function OrgBillingPage() {
  const ledger = [
    { id: "TXN_99120", date: "02 AUG 2026", desc: "BIHAR INVITATIONAL 2026 REVENUE", amount: "+₹4,200", status: "PENDING_PAYOUT" },
    { id: "TXN_99014", date: "28 JUL 2026", desc: "MS PLATFORM FEE (10%)", amount: "-₹420", status: "DEDUCTED" },
    { id: "TXN_98811", date: "15 JUL 2026", desc: "SUMMER SHOWDOWN PAYOUT", amount: "+₹18,500", status: "SETTLED" },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1C1C1C] pb-6">
        <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
          // WALLET_UPLINK
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
            FINANCE & <span className="text-[#10b981]">PAYOUTS</span>
          </h1>
        </div>
        <p className="font-jetbrains text-[#10b981] text-xs mt-2 opacity-80 max-w-lg tracking-widest">
          TRACK ENTRY FEES COLLECTED, MS PLATFORM SPLITS, AND REQUEST PAYOUTS.
        </p>
      </div>

      {/* KPI Stats Row (Rigid Monospace Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'TOTAL_REVENUE_ALL_TIME', value: '₹22,700', color: 'text-ms-white' },
          { label: 'AVAILABLE_FOR_PAYOUT', value: '₹3,780', color: 'text-[#10b981]' },
          { label: 'MS_PLATFORM_FEES', value: '₹420', color: 'text-red-500' },
        ].map((stat, idx) => (
          <div key={idx} className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md p-4 relative overflow-hidden group hover:border-[#10b981]/50 transition-colors">
            <div className="text-[10px] font-courier text-ms-white-60 uppercase mb-4 tracking-widest group-hover:text-[#10b981] transition-colors">
              {'>'} {stat.label}
            </div>
            <div className={`font-jetbrains text-3xl font-bold tracking-widest ${stat.color}`}>
              [{stat.value}]
            </div>
          </div>
        ))}
      </div>

      {/* Payout Action */}
      <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md p-4 flex justify-between items-center">
        <div className="font-courier text-[10px] text-ms-white-60 uppercase tracking-widest">
          PAYOUT_METHOD :: UPI_ID (****8992@PAYTM)
        </div>
        <button className="font-jetbrains text-xs font-bold text-[#000] bg-[#10b981] px-6 py-2 hover:bg-[#10b981]/80 transition-colors">
          [ INITIATE_PAYOUT ]
        </button>
      </div>

      {/* ASCII Table */}
      <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md overflow-x-auto custom-scrollbar relative mt-8">
        <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #10b981 1px, #10b981 2px)' }} />

        <div className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] font-courier text-[10px] text-[#10b981] uppercase tracking-widest min-w-[800px] relative z-10">
          <div className="w-24">TXN_ID</div>
          <div className="w-24">DATE</div>
          <div className="flex-1">DESCRIPTION</div>
          <div className="w-32 text-right">AMOUNT</div>
          <div className="w-32 text-right">STATUS</div>
        </div>

        <div className="flex flex-col min-w-[800px] relative z-10">
          {ledger.map((txn) => (
            <div key={txn.id} className="flex items-center gap-4 p-4 border-b border-[#1C1C1C] hover:bg-white/5 transition-colors font-jetbrains text-xs text-ms-white cursor-pointer group">
              <div className="w-24 font-bold text-ms-white-60">[{txn.id}]</div>
              <div className="w-24 font-courier text-[10px] text-ms-white-60">{txn.date}</div>
              <div className="flex-1 font-bold group-hover:text-ms-white text-ms-white-60 transition-colors truncate pr-4">{txn.desc}</div>
              <div className={`w-32 text-right font-bold tracking-widest ${txn.amount.startsWith('+') ? 'text-[#10b981]' : 'text-red-500'}`}>
                {txn.amount}
              </div>
              <div className="w-32 text-right text-ms-white-30 font-bold">
                [{txn.status}]
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
