"use client";

import React, { useState } from 'react';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { FileUpload } from '@/components/forms/FileUpload';
import { Shield, Users, ArrowRight, CheckCircle2, Loader2, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function SquadInvitePage({ params }: { params: { teamId: string } }) {
  const { user } = useAuth();
  
  // Local state
  const [ign, setIgn] = useState('');
  const [screenshot, setScreenshot] = useState('');
  const [role, setRole] = useState('Rusher');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If user is not logged in via Discord, force them to login first
  if (!user) {
    return (
      <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-20 text-center">
        <div className="w-20 h-20 bg-[#5865F2]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#5865F2]/30 shadow-[0_0_30px_rgba(88,101,242,0.3)]">
          <LinkIcon size={40} className="text-[#5865F2]" />
        </div>
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">Discord Required</h1>
        <p className="text-white/60 font-inter mb-8">
          You have been invited to join team <strong>{params.teamId}</strong>. You must link your Discord account to verify your identity and check your server membership before joining.
        </p>
        <Link href="/auth/callback" className="inline-block bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(88,101,242,0.4)]">
          Login with Discord
        </Link>
      </div>
    );
  }

  const handleJoinTeam = async () => {
    setIsSubmitting(true);
    // Simulate API call to add player to team roster
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-10">
        <PremiumCard glowColor="green" className="text-center py-12">
          <div className="w-20 h-20 bg-st-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-st-green" />
          </div>
          <h2 className="font-orbitron text-3xl font-bold text-white mb-4">Roster Updated!</h2>
          <p className="text-white/60 font-inter mb-8">
            You have successfully joined the squad. An admin will review your in-game screenshot shortly.
          </p>
          <Link href="/team" className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all">
            View Team Dashboard
          </Link>
        </PremiumCard>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-10">
      
      <div className="text-center mb-10">
        <h1 className="font-orbitron text-3xl font-bold text-white tracking-widest uppercase mb-2">Join Squad</h1>
        <p className="text-white/50 font-inter">
          You are joining <strong className="text-white">Phoenix Esports</strong> (Invite ID: {params.teamId})
        </p>
      </div>

      <PremiumCard glowColor="blue">
        <div className="space-y-8">
          
          <div className="flex items-center gap-4 bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-xl p-4">
            <div className="w-12 h-12 rounded-full bg-[#0d0d12] border border-[#5865F2]/50 flex items-center justify-center overflow-hidden">
              <img src={user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt="Discord Avatar" />
            </div>
            <div>
              <div className="text-white font-bold flex items-center gap-2">
                {user.user_metadata?.full_name || user.email}
                <CheckCircle2 size={14} className="text-st-green" />
              </div>
              <div className="text-[#5865F2] text-[10px] font-bold tracking-widest uppercase mt-1">Discord Verified</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">Your In-Game Name (IGN)</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ms-blue transition-colors font-inter"
                placeholder="e.g. PHX 亗 Player"
                value={ign}
                onChange={e => setIgn(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">Preferred Role</label>
              <select 
                className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ms-blue transition-colors font-inter appearance-none"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="IGL">In-Game Leader (IGL)</option>
                <option value="Rusher">Rusher</option>
                <option value="Sniper">Sniper</option>
                <option value="Support">Support</option>
                <option value="Substitute">Substitute</option>
              </select>
            </div>
          </div>

          <div>
            <div className="bg-st-yellow/5 border border-st-yellow/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-st-yellow/80 font-medium font-inter flex items-center gap-2">
                <AlertTriangle size={16} /> Identity Verification Required
              </p>
              <p className="text-xs text-st-yellow/60 mt-1">To prevent ringers/bots, you must upload a screenshot of your game profile showing your IGN and Level clearly.</p>
            </div>
            
            <FileUpload 
              bucket="screenshots"
              folder="game-ids"
              label="Your Game ID Screenshot"
              onUploadSuccess={(url) => setScreenshot(url)}
            />
          </div>

          <div className="flex justify-end pt-6 border-t border-white/10">
            <button 
              onClick={handleJoinTeam}
              disabled={!ign || !screenshot || isSubmitting}
              className="bg-ms-blue hover:bg-ms-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(36,99,255,0.4)] flex items-center gap-2"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={18} /> Verifying...</>
              ) : (
                <>Join Squad Roster <ArrowRight size={18} /></>
              )}
            </button>
          </div>

        </div>
      </PremiumCard>
    </div>
  );
}
