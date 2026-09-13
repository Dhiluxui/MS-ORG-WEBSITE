import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';

const stats = [
  { label: 'ACTIVE TOURNAMENTS', value: '03', trend: '+1', status: 'optimal' },
  { label: 'REGISTERED TEAMS', value: '142', trend: '+12', status: 'optimal' },
  { label: 'PENDING SUPPORT TICKETS', value: '08', trend: '-2', status: 'warning' },
  { label: 'LIVE MATCHES', value: '01', trend: '0', status: 'optimal' },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <TerminalCard key={i} className="p-6 border border-ms-border-dark bg-ms-panel-black flex flex-col">
          <div className="font-ascii text-[10px] text-ms-white-60 mb-4">
            &gt; {stat.label}
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="font-jetbrains text-4xl text-ms-white font-bold">
              {stat.value}
            </div>
            
            <div className={`font-ascii text-xs ${
              stat.status === 'warning' ? 'text-st-yellow' : 'text-st-green'
            }`}>
              [{stat.trend}]
            </div>
          </div>
        </TerminalCard>
      ))}
    </div>
  );
}
