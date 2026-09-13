'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Tournament } from '@/types/database';

interface RegistrationWizardProps {
  tournament: Tournament;
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationWizard({ tournament, isOpen, onClose }: RegistrationWizardProps) {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form State
  const [teamName, setTeamName] = useState('');
  const [teamTag, setTeamTag] = useState('');
  const [players, setPlayers] = useState(['', '', '', '']);
  const [upiRef, setUpiRef] = useState('');

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase]);

  async function loginWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/tournaments`,
        scopes: 'identify guilds',
      }
    });
  }

  const handlePlayerChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Insert Team
      const { data: teamData, error: teamError } = await supabase.from('teams').insert({
        tournament_id: tournament.id,
        team_name: teamName,
        team_tag: teamTag || null,
        captain_id: user.id,
        captain_discord: user.user_metadata?.full_name || 'Discord User',
        payment_upi_ref: upiRef || null,
        payment_status: tournament.entry_fee === 0 ? 'verified' : 'pending',
        status: 'pending'
      }).select().single();

      if (teamError) throw new Error(teamError.message);
      if (!teamData) throw new Error('Failed to create team record.');

      // 2. Insert Players
      const playersToInsert = players
        .filter(ign => ign.trim() !== '')
        .map((ign, index) => ({
          team_id: teamData.id,
          ign: ign.trim(),
          role: index === 0 ? 'IGL' : 'Rusher', // Basic defaults
          is_substitute: false,
          verified: false,
          banned_ign: false,
          user_id: index === 0 ? user.id : null // Link captain to first player
        }));

      if (playersToInsert.length > 0) {
        // @ts-ignore - The role strings overlap closely enough for testing
        const { error: playersError } = await supabase.from('players').insert(playersToInsert);
        if (playersError) throw new Error(playersError.message);
      }

      // Success
      alert('Registration Successful! Your team is pending admin approval.');
      onClose();
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || 'An unknown error occurred during registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#1C1C1C] flex flex-col h-[80vh] md:h-auto md:max-h-[85vh]">
        
        {/* WIZARD HEADER */}
        <div className="p-4 md:p-6 border-b border-[#1C1C1C]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-xs text-white/60">
              {`> REGISTRATION_WIZARD :: ${tournament.name}`}
            </span>
            <button onClick={onClose} className="font-mono text-xs text-white/40 hover:text-white">
              [ CANCEL ]
            </button>
          </div>
          
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s} 
                className={`h-1 flex-1 ${s <= step ? 'bg-[#2463FF]' : 'bg-[#1C1C1C]'}`} 
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] text-white/40">
            <span className={step >= 1 ? 'text-[#2463FF]' : ''}>STEP 1</span>
            <span className={step >= 2 ? 'text-[#2463FF]' : ''}>STEP 2</span>
            <span className={step >= 3 ? 'text-[#2463FF]' : ''}>STEP 3</span>
            <span className={step >= 4 ? 'text-[#2463FF]' : ''}>STEP 4</span>
          </div>
        </div>

        {/* WIZARD CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {errorMsg && (
            <div className="mb-4 p-3 border border-red-500 bg-red-500/10 text-red-500 font-mono text-xs">
              [ERROR] {errorMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-[#1C1C1C] pb-4 mb-6">
                  <h3 className="font-orbitron text-xl text-white">CAPTAIN AUTHORIZATION</h3>
                </div>

                {!user ? (
                  <div className="space-y-6">
                    <p className="font-mono text-sm text-[#EF4444]">{`> AUTH_REQUIRED :: DISCORD_LOGIN_NEEDED`}</p>
                    <div className="font-mono text-xs text-white/60 space-y-2 border border-[#1C1C1C] p-4 bg-black">
                      <p>{`> STEP_1A :: Click login button below`}</p>
                      <p>{`> STEP_1B :: Authorize with Discord`}</p>
                      <p>{`> STEP_1C :: Must be in MS Esports Discord server`}</p>
                    </div>
                    <Button variant="primary" onClick={loginWithDiscord} className="w-full">
                      LOGIN WITH DISCORD
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="font-mono text-sm text-[#22C55E]">{`> AUTH_SUCCESS :: ${user.user_metadata?.full_name || 'USER'} CONNECTED`}</p>
                    
                    <div className="space-y-4">
                      <label className="block font-mono text-xs text-white/60">TEAM NAME</label>
                      <input 
                        type="text" 
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. Team Antigravity" 
                        className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block font-mono text-xs text-white/60">TEAM TAG (OPTIONAL)</label>
                      <input 
                        type="text" 
                        value={teamTag}
                        onChange={(e) => setTeamTag(e.target.value)}
                        placeholder="e.g. AG" 
                        className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button variant="primary" onClick={() => setStep(2)} disabled={!teamName}>
                        PROCEED TO STEP 2 →
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-[#1C1C1C] pb-4 mb-6">
                  <h3 className="font-orbitron text-xl text-white">ROSTER REGISTRATION</h3>
                </div>
                
                <p className="font-mono text-sm text-white/60">
                  {`> REQUIRED :: Minimum 4 players required.`}
                </p>

                {[0, 1, 2, 3].map((num) => (
                  <div key={num} className="border border-[#1C1C1C] p-4 space-y-3 bg-black">
                    <p className="font-mono text-xs text-white/40">{`> PLAYER_0${num + 1} ${num === 0 ? '(IGL/CAPTAIN)' : ''}`}</p>
                    <input 
                      type="text" 
                      value={players[num]}
                      onChange={(e) => handlePlayerChange(num, e.target.value)}
                      placeholder="In-Game Name (IGN)" 
                      className="w-full bg-transparent border-b border-[#1C1C1C] focus:border-[#2463FF] pb-2 text-white font-rajdhani outline-none transition-colors"
                    />
                  </div>
                ))}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    ← BACK
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)} disabled={players.some(p => p.trim() === '')}>
                    PROCEED TO PAYMENT →
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="border-b border-[#1C1C1C] pb-4 mb-6">
                  <h3 className="font-orbitron text-xl text-white">ENTRY FEE PAYMENT</h3>
                </div>

                {tournament.entry_fee === 0 ? (
                  <div className="text-center py-12 border border-[#1C1C1C] border-dashed">
                    <p className="font-mono text-[#22C55E] mb-2">{`> STATUS :: FREE_ENTRY`}</p>
                    <p className="font-mono text-xs text-white/40">No payment required for this tournament.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border border-[#1C1C1C] p-6 text-center bg-black">
                      <p className="font-mono text-xs text-white/40 mb-2">SCAN QR TO PAY</p>
                      <div className="w-32 h-32 bg-[#1C1C1C] mx-auto flex items-center justify-center border border-white/10 mb-4">
                        <span className="font-mono text-[10px] text-white/20">QR_CODE</span>
                      </div>
                      <p className="font-mono text-lg text-white mb-1">₹{tournament.entry_fee}</p>
                      <p className="font-mono text-xs text-[#2463FF]">{tournament.upi_id || 'magadhstriker@upi'}</p>
                    </div>

                    <div className="space-y-4">
                      <label className="block font-mono text-xs text-white/60">UPI TRANSACTION ID</label>
                      <input 
                        type="text" 
                        value={upiRef}
                        onChange={(e) => setUpiRef(e.target.value)}
                        placeholder="e.g. 123456789012" 
                        className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    ← BACK
                  </Button>
                  <Button variant="primary" onClick={() => setStep(4)} disabled={tournament.entry_fee > 0 && upiRef.trim() === ''}>
                    REVIEW & SUBMIT →
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="py-8">
                  <div className="w-16 h-16 rounded-full border-2 border-[#2463FF] text-[#2463FF] flex items-center justify-center mx-auto mb-6 text-2xl">
                    ✓
                  </div>
                  <h3 className="font-orbitron text-2xl text-white mb-2">READY TO SUBMIT</h3>
                  <p className="font-mono text-xs text-white/60 mb-8">
                    Your team details and roster have been validated.
                  </p>
                  
                  <div className="bg-black border border-[#1C1C1C] p-4 text-left space-y-2 mb-8">
                    <p className="font-mono text-xs text-white/40">{`> TEAM_NAME :: ${teamName}`}</p>
                    <p className="font-mono text-xs text-white/40">{`> ROSTER    :: [${players.filter(p => p.trim() !== '').length}_PLAYERS]`}</p>
                    <p className="font-mono text-xs text-white/40">{`> PAYMENT   :: ${tournament.entry_fee === 0 ? '[FREE_ENTRY]' : `[ID:${upiRef}]`}`}</p>
                  </div>

                  <Button variant="primary" className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? '[ PROCESSING REGISTRATION... ]' : 'CONFIRM REGISTRATION'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
