import React from 'react';
import { getScoringTemplates } from '@/actions/admin-data.actions';

export const dynamic = 'force-dynamic';

export default async function ScoringTemplatesPage() {
  const templates = await getScoringTemplates();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div className="border-b border-[#1C1C1C] pb-6 sticky top-0 bg-[#050505]/90 backdrop-blur-md z-30">
        <div>
          <div className="font-courier text-[#2463FF] text-xs mb-3 tracking-widest uppercase">
            // ADMIN_SYSTEM/SCORING
          </div>
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-ms-white uppercase tracking-wide">
            SCORING <span className="text-[#2463FF]">SYSTEMS</span>
          </h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {templates.length === 0 ? (
           <div className="p-8 text-center border border-[#1C1C1C] bg-[#0A0A0A] font-courier text-ms-white-40">
            No scoring templates found in database.
          </div>
        ) : (
          templates.map((tpl: any) => (
            <div key={tpl.id} className="p-6 border border-[#1C1C1C] bg-[#0A0A0A]">
              {tpl.id}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
