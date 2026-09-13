"use client";

import React, { useState } from 'react';
import { PremiumCard } from '@/components/portal/PremiumCard';
import { FileUpload } from '@/components/forms/FileUpload';
import { Trophy, Users, Shield, ArrowRight, CheckCircle2, ChevronRight, AlertTriangle, Link as LinkIcon, Copy, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function RegisterTournamentForm({ tournament }: { tournament: any }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    teamName: '',
    teamTag: '',
    captainPhone: '',
    captainIgn: '',
    gameIdScreenshot: '',
    paymentUpiRef: '',
    paymentScreenshot: '',
    hCaptchaToken: ''
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Wire up actual submission logic with Supabase via Server Action
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(5); // Success step
    }, 2000);
  };

  const inviteLink = `http://localhost:3000/invite/T-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const copyInvite = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="font-courier text-ms-white-30 text-xs mb-2 uppercase tracking-widest">
          // {tournament?.name || 'UNKNOWN TOURNAMENT'}
        </div>
        <h1 className="font-orbitron text-3xl font-bold text-white tracking-widest uppercase mb-2">Squad Registration</h1>
        <p className="text-white/50 font-inter max-w-lg mx-auto">
          Complete the steps below to secure your team's slot in the tournament. All screenshots must be clear and readable.
        </p>
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="flex justify-between relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          <div className="absolute top-1/2 left-0 h-0.5 bg-ms-blue -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }} />
          
          {[
            { num: 1, label: "Team Details" },
            { num: 2, label: "Verification" },
            { num: 3, label: "Payment" },
            { num: 4, label: "Confirm" }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-orbitron font-bold transition-colors ${step >= s.num ? 'bg-ms-blue text-white shadow-[0_0_15px_rgba(36,99,255,0.5)]' : 'bg-[#0d0d12] border border-white/20 text-white/50'}`}>
                {step > s.num ? <CheckCircle2 size={20} /> : s.num}
              </div>
              <span className={`text-xs font-bold tracking-widest uppercase ${step >= s.num ? 'text-white' : 'text-white/30'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Team Details */}
      {step === 1 && (
        <PremiumCard glowColor="blue">
          <h2 className="font-rajdhani text-2xl font-bold tracking-widest uppercase text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
            <Users className="text-ms-blue" />
            Step 1: Team Information
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">Team Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ms-blue transition-colors font-inter"
                  placeholder="e.g. Phoenix Esports"
                  value={formData.teamName}
                  onChange={e => setFormData({...formData, teamName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">Team Tag (2-4 chars)</label>
                <input 
                  type="text" 
                  maxLength={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ms-blue transition-colors font-inter uppercase"
                  placeholder="PHX"
                  value={formData.teamTag}
                  onChange={e => setFormData({...formData, teamTag: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleNext}
                disabled={!formData.teamName || !formData.teamTag}
                className="bg-ms-blue hover:bg-ms-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(36,99,255,0.4)] flex items-center gap-2"
              >
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Step 2: Verification */}
      {step === 2 && (
        <PremiumCard glowColor="green">
          <h2 className="font-rajdhani text-2xl font-bold tracking-widest uppercase text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
            <Shield className="text-st-green" />
            Step 2: Captain Verification
          </h2>
          
          <div className="space-y-6">
            <div className="bg-st-green/5 border border-st-green/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-st-green/80 font-medium font-inter">As the team captain, you must upload a screenshot of your in-game profile showing your IGN, Level, and Stats clearly.</p>
            </div>

            <div>
              <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">Captain In-Game Name (IGN)</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-st-green transition-colors font-inter"
                placeholder="PHX 亗 Raj"
                value={formData.captainIgn}
                onChange={e => setFormData({...formData, captainIgn: e.target.value})}
              />
            </div>
            
            <FileUpload 
              bucket="screenshots"
              folder="game-ids"
              label="Game ID Screenshot"
              onUploadSuccess={(url) => setFormData({...formData, gameIdScreenshot: url})}
            />
            
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="text-white/50 hover:text-white font-rajdhani font-bold tracking-widest uppercase transition-colors">
                Back
              </button>
              <button 
                onClick={handleNext}
                disabled={!formData.captainIgn || !formData.gameIdScreenshot}
                className="bg-st-green hover:bg-st-green/90 disabled:opacity-50 disabled:cursor-not-allowed text-black px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,255,157,0.4)] flex items-center gap-2"
              >
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <PremiumCard glowColor="yellow">
          <h2 className="font-rajdhani text-2xl font-bold tracking-widest uppercase text-white mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
            <Trophy className="text-st-yellow" />
            Step 3: Entry Fee Payment
          </h2>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-white rounded-lg mb-4 p-2">
                  {/* Organizer QR Code placeholder */}
                  <div className="w-full h-full bg-black flex items-center justify-center">
                    <span className="text-white font-mono text-xs text-center">QR CODE<br/>HERE</span>
                  </div>
                </div>
                <p className="font-inter text-white font-medium mb-1">Scan to Pay via UPI</p>
                <p className="font-orbitron text-st-yellow text-xl font-bold mb-4">₹ {tournament?.entryFee || '500'}.00</p>
                <div className="bg-white/10 px-3 py-1.5 rounded text-white/50 text-xs font-mono select-all">
                  magadhstriker@upi
                </div>
              </div>

              <div className="flex-[2] space-y-6">
                <div>
                  <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-2 font-rajdhani">UPI Reference Number (12 Digits)</label>
                  <input 
                    type="text" 
                    maxLength={12}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-st-yellow transition-colors font-inter"
                    placeholder="e.g. 312345678901"
                    value={formData.paymentUpiRef}
                    onChange={e => setFormData({...formData, paymentUpiRef: e.target.value})}
                  />
                </div>
                
                <FileUpload 
                  bucket="screenshots"
                  folder="payments"
                  label="Payment Success Screenshot"
                  onUploadSuccess={(url) => setFormData({...formData, paymentScreenshot: url})}
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(2)} className="text-white/50 hover:text-white font-rajdhani font-bold tracking-widest uppercase transition-colors">
                Back
              </button>
              <button 
                onClick={handleNext}
                disabled={formData.paymentUpiRef.length < 10 || !formData.paymentScreenshot}
                className="bg-st-yellow hover:bg-st-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed text-black px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,184,0,0.4)] flex items-center gap-2"
              >
                Continue <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <PremiumCard glowColor="purple">
          <h2 className="font-rajdhani text-2xl font-bold tracking-widest uppercase text-white mb-6 border-b border-white/10 pb-4">
            Step 4: Final Confirmation
          </h2>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Team Name</div>
                <div className="text-white font-medium truncate">{formData.teamName}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Tag</div>
                <div className="text-white font-medium truncate">{formData.teamTag}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Captain IGN</div>
                <div className="text-white font-medium truncate">{formData.captainIgn}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">UPI Ref</div>
                <div className="text-white font-medium truncate">{formData.paymentUpiRef}</div>
              </div>
            </div>

            {/* Simple hCaptcha Stand-in */}
            <div className="border border-white/20 rounded-xl p-6 bg-[#0d0d12] max-w-sm mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  className="w-6 h-6 rounded border-white/20 bg-white/5 cursor-pointer accent-ms-blue"
                  onChange={(e) => setFormData({...formData, hCaptchaToken: e.target.checked ? 'verified' : ''})}
                />
                <span className="text-white font-medium font-inter">I am human</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="text-white/30" size={24} />
                <span className="text-white/30 text-[8px] uppercase tracking-wider mt-1">Privacy - Terms</span>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(3)} className="text-white/50 hover:text-white font-rajdhani font-bold tracking-widest uppercase transition-colors" disabled={isSubmitting}>
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!formData.hCaptchaToken || isSubmitting}
                className="bg-ms-blue hover:bg-ms-blue/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(36,99,255,0.4)] flex items-center gap-2"
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={18} /> Processing...</>
                ) : (
                  <>Submit Registration <ArrowRight size={18} /></>
                )}
              </button>
            </div>
          </div>
        </PremiumCard>
      )}

      {/* Step 5: Success & Invite Link */}
      {step === 5 && (
        <PremiumCard glowColor="green" className="text-center py-12">
          <div className="w-20 h-20 bg-st-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-st-green" />
          </div>
          
          <h2 className="font-orbitron text-3xl font-bold text-white mb-4">Registration Pending!</h2>
          <p className="text-white/60 font-inter max-w-md mx-auto mb-8">
            Your team <strong className="text-white">{formData.teamName}</strong> has been successfully registered. You now need to invite your squad members to complete the roster.
          </p>
          
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-8">
            <label className="block text-sm font-bold tracking-wider uppercase text-white/70 mb-3 font-rajdhani flex items-center gap-2">
              <LinkIcon size={16} /> Squad Invite Link
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={inviteLink}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-ms-blue font-mono text-sm focus:outline-none"
              />
              <button 
                onClick={copyInvite}
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 flex items-center justify-center text-white relative"
              >
                {copied ? <CheckCircle2 size={18} className="text-st-green"/> : <Copy size={18}/>}
              </button>
            </div>
            <p className="text-xs text-white/40 mt-3 font-inter">
              Send this link to your teammates. They will need to create an account and upload their own game ID screenshot to join the team.
            </p>
          </div>

          <Link href="/home" className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-rajdhani font-bold tracking-widest uppercase transition-all">
            Return to Dashboard
          </Link>
        </PremiumCard>
      )}
    </div>
  );
}
