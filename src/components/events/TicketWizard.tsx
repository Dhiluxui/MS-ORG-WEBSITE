'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import type { Ticket } from '@/types/database';
import { useRouter } from 'next/navigation';

export function TicketWizard({ event }: { event: Ticket }) {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [transactionId, setTransactionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, [supabase]);

  async function loginWithDiscord() {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/events/${event.id}/ticket`,
        scopes: 'identify guilds',
      }
    });
  }

  const handleNext = () => {
    if (step === 2) {
      if (!buyerName || !buyerPhone) {
        setError('> REQUIRED :: Name and Phone');
        return;
      }
      setError('');
    }
    if (step === 3) {
      if (event.price > 0 && !transactionId) {
        setError('> REQUIRED :: Transaction ID');
        return;
      }
      setError('');
      handleSubmit();
      return;
    }
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // Create new ticket purchase records
      const purchases = Array.from({ length: quantity }).map(() => ({
        type: 'purchase',
        event_id: event.id,
        event_name: event.event_name,
        event_date: event.event_date,
        venue: event.venue,
        price: event.price,
        buyer_id: user.id,
        buyer_name: buyerName,
        buyer_phone: buyerPhone,
        payment_screenshot: transactionId, // Storing trans ID in screenshot field for now or similar
        status: 'pending' as const,
        sold_seats: 1
      }));

      const { error: insertError } = await supabase
        .from('tickets')
        .insert(purchases);

      if (insertError) throw insertError;

      // Update sold_seats on the event
      await supabase
        .from('tickets')
        .update({ sold_seats: (event.sold_seats || 0) + quantity })
        .eq('id', event.id);

      setStep(4);
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = event.price * quantity;

  return (
    <div className="w-full bg-[#0A0A0A] border border-[#1C1C1C] flex flex-col min-h-[500px]">
      {/* WIZARD HEADER */}
      <div className="p-4 md:p-6 border-b border-[#1C1C1C]">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s} 
              className={`h-1 flex-1 ${s <= step ? 'bg-[#2463FF]' : 'bg-[#1C1C1C]'}`} 
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 font-mono text-[10px] text-white/40">
          <span className={step >= 1 ? 'text-[#2463FF]' : ''}>AUTH</span>
          <span className={step >= 2 ? 'text-[#2463FF]' : ''}>DETAILS</span>
          <span className={step >= 3 ? 'text-[#2463FF]' : ''}>PAYMENT</span>
          <span className={step >= 4 ? 'text-[#2463FF]' : ''}>CONFIRM</span>
        </div>
      </div>

      {/* WIZARD CONTENT */}
      <div className="flex-1 p-6 md:p-8 relative">
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
                <h3 className="font-orbitron text-xl text-white">LOGIN REQUIRED</h3>
              </div>

              {!user ? (
                <div className="space-y-6">
                  <p className="font-mono text-sm text-[#EF4444]">{`> AUTH_REQUIRED :: DISCORD_LOGIN_NEEDED`}</p>
                  <button 
                    onClick={loginWithDiscord} 
                    className="w-full text-center font-mono text-sm py-4 bg-[#2463FF] text-white hover:bg-white hover:text-black transition-colors"
                  >
                    LOGIN WITH DISCORD
                  </button>
                </div>
              ) : (
                <div className="space-y-6 text-center py-8">
                  <p className="font-mono text-sm text-[#22C55E] mb-6">{`> AUTH_SUCCESS :: ${user.user_metadata?.full_name || 'USER'} CONNECTED`}</p>
                  <button 
                    onClick={handleNext}
                    className="w-full text-center font-mono text-sm py-4 bg-white text-black hover:bg-[#2463FF] hover:text-white transition-colors"
                  >
                    PROCEED TO STEP 2 →
                  </button>
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
                <h3 className="font-orbitron text-xl text-white">BUYER DETAILS</h3>
              </div>

              {error && <p className="font-mono text-xs text-red-500">{error}</p>}
              
              <div className="space-y-4">
                <label className="block font-mono text-xs text-white/60">BUYER NAME</label>
                <input 
                  type="text" 
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma" 
                  className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label className="block font-mono text-xs text-white/60">PHONE</label>
                <input 
                  type="tel" 
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="+91-XXXXXXXXXX" 
                  className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label className="block font-mono text-xs text-white/60">QUANTITY</label>
                <select 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between pt-6">
                <button onClick={() => setStep(1)} className="font-mono text-sm px-6 py-3 border border-[#1C1C1C] text-white hover:border-white">
                  ← BACK
                </button>
                <button onClick={handleNext} className="font-mono text-sm px-6 py-3 bg-white text-black hover:bg-[#2463FF] hover:text-white transition-colors">
                  PROCEED TO PAYMENT →
                </button>
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
                <h3 className="font-orbitron text-xl text-white">PAYMENT</h3>
              </div>

              {error && <p className="font-mono text-xs text-red-500">{error}</p>}

              {event.price === 0 ? (
                <div className="text-center py-12 border border-[#1C1C1C] border-dashed">
                  <p className="font-mono text-[#22C55E] mb-2">{`> STATUS :: FREE_ENTRY`}</p>
                  <p className="font-mono text-xs text-white/40">No payment required for this event.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border border-[#1C1C1C] p-6 text-center bg-black">
                    <p className="font-mono text-xs text-[#999] mb-4">
                      {event.price} × {quantity} = <span className="text-white">₹{total}</span>
                    </p>
                    <p className="font-mono text-xs text-white/40 mb-2">SCAN QR TO PAY</p>
                    <div className="w-32 h-32 bg-[#1C1C1C] mx-auto flex items-center justify-center border border-white/10 mb-4">
                      <span className="font-mono text-[10px] text-white/20">QR_CODE</span>
                    </div>
                    <p className="font-mono text-xs text-[#2463FF]">magadhstriker@upi</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block font-mono text-xs text-white/60">UPI TRANSACTION ID</label>
                    <input 
                      type="text" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 123456789012" 
                      className="w-full bg-black border border-[#1C1C1C] focus:border-[#2463FF] p-3 text-white font-rajdhani outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button disabled={isSubmitting} onClick={() => setStep(2)} className="font-mono text-sm px-6 py-3 border border-[#1C1C1C] text-white hover:border-white">
                  ← BACK
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={handleNext} 
                  className={`font-mono text-sm px-6 py-3 ${isSubmitting ? 'bg-[#1C1C1C] text-[#999]' : 'bg-white text-black hover:bg-[#2463FF] hover:text-white'} transition-colors`}
                >
                  {isSubmitting ? '[ SUBMITTING... ]' : 'SUBMIT →'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 rounded-full border-2 border-[#2463FF] text-[#2463FF] flex items-center justify-center mx-auto mb-6 text-2xl">
                ✓
              </div>
              <h3 className="font-orbitron text-2xl text-white mb-2">TICKET SECURED</h3>
              
              <div className="bg-black border border-[#1C1C1C] p-4 text-left space-y-2 mb-8 max-w-sm mx-auto mt-8">
                <p className="font-mono text-xs text-[#22C55E]">{`> TICKET_STATUS :: SUBMITTED`}</p>
                <p className="font-mono text-xs text-white/40">{`> CONFIRMATION :: PENDING_ADMIN_REVIEW`}</p>
                <p className="font-mono text-xs text-white/40 pt-2 border-t border-[#1C1C1C] mt-2">
                  Admin will confirm shortly. Your unique ticket code will be visible in your profile.
                </p>
              </div>

              <button 
                onClick={() => router.push('/events')} 
                className="w-full max-w-sm font-mono text-sm py-4 border border-[#1C1C1C] text-white hover:border-white transition-colors"
              >
                RETURN TO EVENTS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
