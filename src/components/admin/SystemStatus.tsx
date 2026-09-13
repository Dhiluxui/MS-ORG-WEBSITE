import React from 'react';
import { TerminalCard } from '@/components/ui/TerminalCard';

export function SystemStatus() {
  return (
    <TerminalCard className="p-6">
      <div className="font-ascii text-xs text-ms-white-60 mb-6 border-b border-ms-border-dark pb-4">
        &gt; SYSTEM_DIAGNOSTICS
      </div>
      
      <div className="space-y-6 font-ascii text-sm">
        
        <div className="flex justify-between items-center">
          <span className="text-ms-white-90">SUPABASE DATABASE</span>
          <span className="text-ms-blue">[ ONLINE ]</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-ms-white-90">DISCORD WEBHOOKS</span>
          <span className="text-ms-blue">[ ONLINE ]</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-ms-white-90">PAYMENT GATEWAY</span>
          <span className="text-ms-white">[ DEGRADED ]</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-ms-white-90">EDGE FUNCTIONS</span>
          <span className="text-ms-blue">[ ONLINE ]</span>
        </div>

        <div className="pt-4 border-t border-ms-border-dark mt-4">
          <div className="flex justify-between items-center text-xs text-ms-white-30">
            <span>UPTIME: 99.9%</span>
            <span>LAST_PING: 12ms</span>
          </div>
        </div>

      </div>
    </TerminalCard>
  );
}
