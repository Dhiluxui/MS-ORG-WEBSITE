import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';
import { Button } from '@/components/ui/Button';

export function PastResults() {
  return (
    <section className="py-20 bg-ms-true-black border-t border-ms-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="font-ascii text-ms-white-30 text-sm tracking-widest mb-4">
            ─── RESULTS_ARCHIVE ─── ◆ ───────────
          </div>
          <div className="inline-flex gap-4 border border-ms-border-dark p-1 rounded-sm">
            <button className="bg-ms-panel-black text-ms-white font-rajdhani px-6 py-2 text-sm tracking-widest border border-ms-white-10">
              [MS HOSTED]
            </button>
            <button className="text-ms-white-60 font-rajdhani px-6 py-2 text-sm tracking-widest hover:text-ms-white transition-colors">
              [TOURNAMENTS WE COMPETED IN]
            </button>
          </div>
        </div>

        {/* Hall of Fame */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((i) => (
            <TerminalCard key={i} className="text-center py-8">
              <pre className="font-ascii text-st-gold text-[10px] sm:text-xs mb-4 leading-tight">
                {`   ___________
  '._==_==_=_.'
  .-\\:      /-.
 | (|:.     |) |
  '-|:.     |-'
    \\::.    /
     '::. .'
       ) (
     _.' '._
    '-------'`}
              </pre>
              <h4 className="font-orbitron font-bold text-lg text-ms-white mt-4">PHOENIX SQUAD</h4>
              <p className="font-rajdhani text-sm text-ms-white-60 tracking-widest mt-2 uppercase">
                MS Winter Clash 2026 | ₹12,500
              </p>
            </TerminalCard>
          ))}
        </div>

        {/* Full Results Table */}
        <div className="overflow-x-auto border border-ms-border-dark bg-ms-panel-black mb-12">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-ms-border-dark bg-ms-true-black">
                <th className="py-4 px-6 font-rajdhani text-sm tracking-widest text-ms-white-60 uppercase">Tournament</th>
                <th className="py-4 px-6 font-rajdhani text-sm tracking-widest text-ms-white-60 uppercase">Date</th>
                <th className="py-4 px-6 font-rajdhani text-sm tracking-widest text-ms-white-60 uppercase">Game</th>
                <th className="py-4 px-6 font-rajdhani text-sm tracking-widest text-st-gold uppercase">Champion</th>
                <th className="py-4 px-6 font-rajdhani text-sm tracking-widest text-ms-white-60 uppercase">Runner-Up</th>
                <th className="py-4 px-6 font-rajdhani text-sm tracking-widest text-ms-blue uppercase">Prize</th>
              </tr>
            </thead>
            <tbody className="font-jetbrains text-sm">
              <tr className="border-b border-ms-border-dark/50 hover:bg-ms-white-10 transition-colors">
                <td className="py-4 px-6 text-ms-white">MS Winter Clash</td>
                <td className="py-4 px-6 text-ms-white-60">2026-01-10</td>
                <td className="py-4 px-6 text-ms-white-60">Free Fire MAX</td>
                <td className="py-4 px-6 text-ms-white font-bold">Phoenix Squad</td>
                <td className="py-4 px-6 text-ms-white-60">Dark Souls</td>
                <td className="py-4 px-6 text-ms-white">₹25,000</td>
              </tr>
              <tr className="border-b border-ms-border-dark/50 hover:bg-ms-white-10 transition-colors">
                <td className="py-4 px-6 text-ms-white">Govt Scrims 2</td>
                <td className="py-4 px-6 text-ms-white-60">2025-12-25</td>
                <td className="py-4 px-6 text-ms-white-60">BGMI</td>
                <td className="py-4 px-6 text-ms-white font-bold">Team Bihar</td>
                <td className="py-4 px-6 text-ms-white-60">Patna Pirates</td>
                <td className="py-4 px-6 text-ms-white">₹50,000</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 text-center border-t border-ms-border-dark">
            <button className="font-ascii text-xs text-ms-white-60 hover:text-ms-white transition-colors">
              [VIEW ALL RESULTS +]
            </button>
          </div>
        </div>

        <div className="text-center bg-ms-panel-black border border-ms-border-dark p-8">
          <p className="font-ascii text-ms-white-60 text-sm mb-6">
            &gt; WANT_YOUR_NAME_HERE?
          </p>
          <Button variant="primary">
            [REGISTER FOR NEXT TOURNAMENT]
          </Button>
        </div>

      </div>
    </section>
  );
}
