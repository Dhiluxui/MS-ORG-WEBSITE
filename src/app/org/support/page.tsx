"use client";

import React from 'react';

export default function OrgSupportPage() {
  const tickets = [
    {
      id: "TKT-MS-911",
      subject: "PAYOUT DELAY ENQUIRY",
      date: "01 AUG 2026",
      status: "OPEN",
      priority: "HIGH",
      department: "FINANCE_DEPT"
    }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#1C1C1C] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="font-courier text-[#10b981] text-xs mb-2 uppercase tracking-widest opacity-80">
            {'>'} SYSTEM_QUERY :: ORG_SUPPORT
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
            <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
              SUPPORT <span className="text-[#10b981]">DESK</span>
            </h1>
          </div>
          <p className="font-jetbrains text-[#10b981] text-xs mt-2 opacity-80 max-w-lg tracking-widest">
            DIRECT SECURE COMMUNICATION LINE TO MS ESPORTS ADMINS.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket Form */}
        <div className="border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md p-6 relative">
          <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-[#1C1C1C] bg-[#0A0A0A]" />
          
          <form className="space-y-4 relative z-10">
            <h2 className="font-jetbrains font-bold text-xs text-ms-white tracking-widest mb-6 border-b border-[#1C1C1C] pb-2">
              [ TRANSMIT_NEW_TICKET ]
            </h2>

            <div className="space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                {'>'} DEPARTMENT
              </label>
              <select className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all">
                <option>OPERATIONS_DEPT</option>
                <option>FINANCE_DEPT</option>
                <option>TECH_SUPPORT</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                {'>'} SUBJECT_LINE
              </label>
              <input type="text" className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all" />
            </div>

            <div className="space-y-2">
              <label className="font-jetbrains text-[10px] text-ms-white-60 uppercase tracking-widest">
                {'>'} TRANSMISSION_BODY
              </label>
              <textarea rows={5} className="w-full bg-[#050505] border border-[#333] p-3 font-jetbrains text-xs text-ms-white focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all custom-scrollbar resize-none" />
            </div>

            <button type="button" className="w-full px-6 py-3 font-jetbrains text-xs font-bold text-[#000] bg-[#10b981] hover:bg-[#10b981]/80 transition-colors mt-2">
              [ SEND_TRANSMISSION ]
            </button>
          </form>
        </div>

        {/* Existing Tickets Table */}
        <div className="lg:col-span-2 border border-[#1C1C1C] bg-[#0A0A0A]/50 backdrop-blur-md overflow-x-auto custom-scrollbar relative">
          <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
               style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #10b981 1px, #10b981 2px)' }} />

          <div className="p-4 border-b border-[#1C1C1C] bg-white/5">
            <h2 className="font-jetbrains font-bold text-xs text-ms-white tracking-widest">
              [ ACTIVE_DISPUTES ]
            </h2>
          </div>

          <div className="flex flex-col min-w-[500px] relative z-10">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex flex-col p-4 border-b border-[#1C1C1C] hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold font-jetbrains text-xs group-hover:text-[#10b981] transition-colors truncate">
                    {ticket.subject}
                  </div>
                  <div className={`font-bold font-jetbrains text-[10px] shrink-0 ${ticket.priority === 'HIGH' ? 'text-red-500 animate-pulse' : 'text-ms-white-30'}`}>
                    {ticket.priority === 'HIGH' ? '!!_URGENT' : 'NORMAL'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center font-courier text-[10px] text-ms-white-60">
                  <div className="flex gap-4">
                    <span>ID: [{ticket.id}]</span>
                    <span>DEPT: {ticket.department}</span>
                  </div>
                  <span className="text-[#10b981] font-bold tracking-widest">[{ticket.status}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
