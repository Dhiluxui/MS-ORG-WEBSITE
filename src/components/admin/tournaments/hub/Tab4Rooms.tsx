"use client";

import React, { useState } from 'react';

export function Tab4Rooms({ tournament }: { tournament?: any }) {
  const [rooms, setRooms] = useState<any[]>([]);

  return (
    <div className="space-y-6 font-jetbrains text-xs">
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Room ID Panel */}
        <div className="border border-[#1C1C1C] bg-[#050505] p-6 space-y-6 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div className="flex justify-between items-center border-b border-[#1C1C1C] pb-2">
            <h3 className="text-ms-white font-bold tracking-widest uppercase text-[10px]"><span className="text-blue-500">{'>'}</span> ROOM_DISPATCH_TERMINAL</h3>
            <span className="text-ms-white-40 font-bold uppercase tracking-widest text-[10px]">QF Match 3 | 19:00 IST</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-ms-white-30 uppercase block font-bold tracking-widest text-[10px]">ROOM_ID</label>
              <div className="flex group">
                <input type="text" defaultValue="MS-2026-0120-M3" className="w-full bg-[#0A0A0A] border border-r-0 border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-blue-500 font-orbitron font-bold text-lg transition-colors group-hover:border-blue-500" />
                <button className="bg-[#1C1C1C] px-6 hover:bg-blue-500 hover:text-black transition-colors text-ms-white font-bold tracking-widest uppercase border border-[#1C1C1C] group-hover:border-blue-500">COPY</button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-ms-white-30 uppercase block font-bold tracking-widest text-[10px]">PASSWORD</label>
              <div className="flex group">
                <input type="text" defaultValue="STRIKER#42" className="w-full bg-[#0A0A0A] border border-r-0 border-[#1C1C1C] p-4 text-ms-white focus:outline-none focus:border-blue-500 font-orbitron font-bold text-lg transition-colors group-hover:border-blue-500" />
                <button className="bg-[#1C1C1C] px-6 hover:bg-blue-500 hover:text-black transition-colors text-ms-white font-bold tracking-widest uppercase border border-[#1C1C1C] group-hover:border-blue-500">COPY</button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-ms-white-30 uppercase block font-bold tracking-widest text-[10px]">MESSAGE_PREVIEW</label>
            <div className="bg-[#0A0A0A] border border-[#1C1C1C] p-4 text-ms-white-80 font-mono text-[11px] whitespace-pre-wrap leading-relaxed custom-scrollbar">
{`> ROOM DETAILS — MS WINTER CLASH 2026
> MATCH: QF_3 | TIME: 19:00 IST | JAN 20
> ROOM_ID: MS-2026-0120-M3
> PASS: STRIKER#42
> MAP: Bermuda | TPP | Classic
> BE_READY: 18:50 IST (10 min early)
> GOODLUCK — MAGADH STRIKER`}
            </div>
          </div>

          <div className="flex gap-4 items-end pt-4 border-t border-[#1C1C1C]">
            <div className="flex-1 space-y-3">
              <label className="text-ms-white-30 uppercase block font-bold tracking-widest text-[10px]">SEND_TO_CHANNEL</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" defaultChecked className="accent-[#10b981] w-4 h-4"/> <span className="uppercase tracking-widest text-[10px] text-ms-white-60 font-bold hover:text-ms-white">In-App Notification</span></label>
              </div>
            </div>
            <button className="bg-blue-500/10 border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-black transition-all font-bold tracking-widest px-8 py-4 uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              [📤 SEND_DETAILS]
            </button>
          </div>
        </div>

        {/* Score Entry Table */}
        <div className="border border-[#1C1C1C] bg-[#050505] p-0 flex flex-col relative">
          <div className="absolute top-0 right-0 w-1 h-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <div className="p-6 border-b border-[#1C1C1C] flex justify-between items-center">
            <h3 className="text-ms-white font-bold tracking-widest uppercase text-[10px]"><span className="text-[#10b981]">{'>'}</span> MATCH_SCORING_INPUT</h3>
            <span className="text-ms-white-40 font-bold uppercase tracking-widest text-[10px]">ROUND_1</span>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left">
              <thead className="bg-[#0A0A0A] border-b border-[#1C1C1C] text-ms-white-40 uppercase tracking-widest text-[10px] font-bold">
                <tr>
                  <th className="p-4 font-normal">TEAM</th>
                  <th className="p-4 font-normal w-32 text-center">POSITION</th>
                  <th className="p-4 font-normal w-32 text-center">KILLS</th>
                  <th className="p-4 font-normal w-32 text-right text-[#10b981]">PTS (AUTO)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C1C]">
                {['Phoenix Squad', 'Dark Hunters', 'NoScope Kings', 'Toxic Gamers'].map((team, i) => (
                  <tr key={team} className="hover:bg-[#111] transition-colors group">
                    <td className="p-4 text-ms-white font-bold uppercase font-orbitron">{team}</td>
                    <td className="p-3">
                      <select className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white outline-none focus:border-[#10b981] font-orbitron font-bold text-center cursor-pointer appearance-none group-hover:border-[#333]">
                        <option>{i + 1}</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <input type="number" defaultValue={5 - i} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] p-3 text-ms-white outline-none focus:border-[#10b981] font-orbitron font-bold text-center group-hover:border-[#333]" />
                    </td>
                    <td className="p-4 text-right text-[#10b981] font-bold font-orbitron text-xl">
                      {12 + (5 - i)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-[#1C1C1C] flex justify-end gap-6 bg-[#0A0A0A]">
            <button className="text-ms-white-60 hover:text-ms-white transition-colors font-bold uppercase tracking-widest text-[10px]">[+ ADD_ROUND]</button>
            <button className="text-[#10b981] hover:text-[#10b981]/80 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all font-bold uppercase tracking-widest text-[10px]">[SAVE_ROUND]</button>
          </div>
        </div>

      </div>

    </div>
  );
}
