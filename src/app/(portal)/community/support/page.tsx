"use client";

import React from 'react';

export default function SupportTicketsPage() {
  const tickets = [
    {
      id: "TKT-9942",
      subject: "MISSING PRIZE POOL DEPOSIT",
      date: "02 AUG 2026",
      status: "OPEN",
      priority: "HIGH",
      department: "FINANCE"
    },
    {
      id: "TKT-9811",
      subject: "DISCORD ROLE SYNC FAILURE",
      date: "29 JUL 2026",
      status: "PENDING",
      priority: "NORMAL",
      department: "TECH_SUPPORT"
    },
    {
      id: "TKT-9455",
      subject: "TOURNAMENT REGISTRATION ERROR",
      date: "15 JUL 2026",
      status: "RESOLVED",
      priority: "HIGH",
      department: "OPERATIONS"
    }
  ];

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-[#111] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
            {'>'} SYSTEM_QUERY :: SUPPORT_DESK
          </div>
          <h1 className="text-3xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
            SUPPORT <span className="text-ms-blue">TICKETS</span>
          </h1>
          <p className="text-ms-white-60 font-inter text-xs mt-2 max-w-lg">
            Manage your open disputes, payment inquiries, and technical support requests.
          </p>
        </div>
        <button className="font-jetbrains text-xs font-bold text-[#050505] bg-ms-white px-6 py-3 hover:bg-ms-blue hover:text-white transition-colors">
          {'>'} OPEN_NEW_TICKET
        </button>
      </div>

      {/* ASCII Ticket Table */}
      <div className="border border-[#111] bg-[#0A0A0A] overflow-x-auto custom-scrollbar relative mt-8">
        
        {/* Subtle scanline overlay for the table */}
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, #111 1px, #111 2px)' }} />

        {/* Table Header */}
        <div className="flex items-center gap-4 p-4 border-b border-[#111] font-courier text-[10px] text-ms-white-30 uppercase tracking-widest min-w-[800px] relative z-10">
          <div className="w-24">TICKET_ID</div>
          <div className="w-24">DATE_FILED</div>
          <div className="flex-1">SUBJECT_LINE</div>
          <div className="w-32">DEPARTMENT</div>
          <div className="w-24">PRIORITY</div>
          <div className="w-28 text-right">STATUS</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col min-w-[800px] relative z-10">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="flex items-center gap-4 p-4 border-b border-[#111] hover:bg-[#111] transition-colors font-jetbrains text-xs text-ms-white cursor-pointer group">
              
              <div className="w-24 font-bold text-ms-white-60 group-hover:text-ms-white transition-colors">
                [{ticket.id}]
              </div>
              
              <div className="w-24 font-courier text-[10px] text-ms-white-60">
                {ticket.date}
              </div>
              
              <div className="flex-1 font-bold group-hover:text-ms-blue transition-colors truncate pr-4">
                {ticket.subject}
              </div>
              
              <div className="w-32 font-courier text-[10px] text-ms-white-60">
                {ticket.department}
              </div>
              
              <div className={`w-24 font-bold text-[10px] ${ticket.priority === 'HIGH' ? 'text-red-500 animate-pulse' : 'text-ms-white-30'}`}>
                {ticket.priority === 'HIGH' ? '!!_URGENT' : 'NORMAL'}
              </div>
              
              <div className="w-28 text-right">
                {ticket.status === 'OPEN' && <span className="text-ms-blue font-bold">[ ACTION_REQD ]</span>}
                {ticket.status === 'PENDING' && <span className="text-[#f59e0b] font-bold">[ PENDING_REV ]</span>}
                {ticket.status === 'RESOLVED' && <span className="text-[#10b981] font-bold opacity-50">[ ✓_RESOLVED ]</span>}
              </div>
              
            </div>
          ))}
          
          {tickets.length === 0 && (
            <div className="p-10 text-center font-courier text-xs text-ms-white-30">
              NO_ACTIVE_TICKETS_FOUND :: SYSTEM_CLEAR
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
