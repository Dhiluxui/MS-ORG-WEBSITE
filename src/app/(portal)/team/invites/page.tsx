"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { UserPlus, Check, X, Shield, Clock, ShieldAlert } from 'lucide-react';
import { getTeamInvites } from '@/actions/admin-data.actions';

export default function PendingInvitesPage() {
  const [invites, setInvites] = useState<any[]>([]);

  useEffect(() => {
    getTeamInvites().then(data => setInvites(data));
  }, []);

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    // Optimistic UI update
    setInvites(invites.filter(invite => invite.id !== id));
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-orbitron font-bold text-ms-white mb-2 uppercase tracking-wide flex items-center gap-3">
          <UserPlus className="text-ms-blue" size={28} />
          Pending Invites
        </h1>
        <p className="text-ms-white-60 text-sm max-w-2xl">
          Review requests from Team Captains wanting to recruit you to their roster.
        </p>
      </div>

      <PremiumCard className="p-0 border-white/5 overflow-hidden">
        
        {invites.length === 0 ? (
          // Empty State
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
              <ShieldAlert size={32} className="text-ms-white-30" />
            </div>
            <h3 className="text-xl font-rajdhani font-bold text-ms-white mb-2">No pending invites.</h3>
            <p className="text-ms-white-60 text-sm max-w-md mb-8">
              You currently don't have any recruitment offers. Head over to the Free Agent Board to list yourself and get noticed by top teams.
            </p>
            <Link 
              href="/team/free-agents"
              className="bg-ms-blue hover:bg-ms-blue-hover text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(36,99,255,0.3)]"
            >
              Browse Free Agents
            </Link>
          </div>
        ) : (
          // Invites List
          <div className="divide-y divide-white/5">
            {invites.map((invite) => (
              <div key={invite.id} className="p-6 hover:bg-white/[0.01] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ms-blue/20 to-transparent border border-ms-blue/30 flex items-center justify-center shrink-0">
                    <Shield size={28} className="text-ms-blue" />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-rajdhani font-bold text-ms-white">{invite.teamName || 'Unknown Team'}</h3>
                      <span className="text-[10px] font-bold text-ms-white-60 uppercase tracking-widest border border-white/10 bg-white/5 px-2 py-0.5 rounded">
                        [{invite.tag || 'TG'}]
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs">
                      <span className="text-ms-white-60">
                        Captain: <strong className="text-ms-white">{invite.captain || 'Unknown'}</strong>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-ms-blue font-bold uppercase tracking-widest bg-ms-blue/10 px-2 rounded">
                        {invite.game || 'Game'}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-ms-white-60">
                        Role Offered: <strong className="text-ms-white">{invite.roleOffered || 'Player'}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 md:border-l md:border-white/5 md:pl-6 shrink-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-ms-white-30 uppercase font-jetbrains w-full sm:w-auto sm:mr-4 justify-center sm:justify-start">
                    <Clock size={12} /> {new Date(invite.created_at || Date.now()).toLocaleDateString()}
                  </div>
                  
                  <div className="flex w-full sm:w-auto gap-2">
                    <button 
                      onClick={() => handleAction(invite.id, 'decline')}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <X size={16} /> Decline
                    </button>
                    <button 
                      onClick={() => handleAction(invite.id, 'accept')}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#10b981]/10 hover:bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/20 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Check size={16} /> Accept
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </PremiumCard>

    </div>
  );
}
