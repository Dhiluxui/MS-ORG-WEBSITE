'use client'

import { useState } from 'react'
import { Check, UploadCloud } from 'lucide-react'

export default function TicketWizardPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState(1)

  return (
    <div className="bg-[#050505] min-h-screen pt-24 pb-20 selection:bg-[#2463FF]/30">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-12 text-center">
          <div className="font-mono text-xs text-[#2463FF] mb-2 tracking-[0.2em] uppercase">
            &gt; CHECKOUT :: {params.id}
          </div>
          <h1 className="font-orbitron text-3xl font-bold text-white">SECURE YOUR SEAT</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#1C1C1C] -z-10" />
          <div className="flex justify-between">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border bg-[#050505] transition-colors ${
                step > s ? 'border-[#2463FF] text-[#2463FF]' :
                step === s ? 'border-white text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]' :
                'border-[#1C1C1C] text-[#4A4A4A]'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Login */}
        {step === 1 && (
          <div className="bg-[#0A0A0A] border border-[#111] p-8 md:p-12 text-center max-w-xl mx-auto">
            <h2 className="font-orbitron text-xl text-white mb-4 uppercase">AUTHENTICATION REQUIRED</h2>
            <p className="font-mono text-xs text-[#999] mb-8">
              You must be logged in with Discord to purchase a ticket. This ensures ticket validity and prevents scalping.
            </p>
            <button 
              onClick={() => setStep(2)}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-mono text-sm px-8 py-4 transition-colors uppercase tracking-widest inline-flex items-center gap-3"
            >
              <span>LOGIN WITH DISCORD</span>
            </button>
            <div className="mt-6 font-mono text-[10px] text-[#4A4A4A]">Mocking login for demo purposes.</div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="bg-[#0A0A0A] border border-[#111] p-8 max-w-xl mx-auto">
            <h2 className="font-orbitron text-xl text-white mb-6 uppercase border-b border-[#111] pb-4">ATTENDEE DETAILS</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2 uppercase">FULL NAME (AS PER ID)</label>
                <input 
                  type="text" 
                  className="w-full bg-[#050505] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2 uppercase">PHONE NUMBER</label>
                <input 
                  type="text" 
                  className="w-full bg-[#050505] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none transition-colors"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2 uppercase">TICKET QUANTITY (MAX 2)</label>
                <select className="w-full bg-[#050505] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none transition-colors">
                  <option value="1">1 TICKET</option>
                  <option value="2">2 TICKETS</option>
                </select>
              </div>

              <button 
                onClick={() => setStep(3)}
                className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs py-4 transition-colors uppercase tracking-widest mt-4"
              >
                [PROCEED TO PAYMENT]
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="bg-[#0A0A0A] border border-[#111] p-8 max-w-xl mx-auto">
            <h2 className="font-orbitron text-xl text-white mb-6 uppercase border-b border-[#111] pb-4">PAYMENT CONFIRMATION</h2>
            
            <div className="bg-[#050505] border border-[#1C1C1C] p-4 mb-6">
              <div className="flex justify-between font-mono text-sm mb-2">
                <span className="text-[#999]">MS DELHI TICKET × 1</span>
                <span className="text-white">₹499</span>
              </div>
              <div className="flex justify-between font-mono text-sm mb-4">
                <span className="text-[#999]">TAXES & FEES</span>
                <span className="text-white">₹0</span>
              </div>
              <div className="flex justify-between font-mono text-lg text-[#2463FF] border-t border-[#1C1C1C] pt-2">
                <span>TOTAL</span>
                <span>₹499</span>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2 uppercase">TRANSACTION ID (UTR)</label>
                <input 
                  type="text" 
                  className="w-full bg-[#050505] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none transition-colors"
                  placeholder="e.g. 123456789012"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] text-[#999] mb-2 uppercase">UPLOAD SCREENSHOT</label>
                <div className="w-full h-32 bg-[#050505] border border-dashed border-[#1C1C1C] hover:border-[#2463FF] flex flex-col items-center justify-center cursor-pointer transition-colors group">
                  <UploadCloud className="w-6 h-6 text-[#4A4A4A] group-hover:text-[#2463FF] mb-2 transition-colors" />
                  <span className="font-mono text-xs text-[#999] group-hover:text-white transition-colors">CLICK OR DRAG FILE HERE</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep(4)}
              className="w-full bg-white hover:bg-gray-200 text-black font-mono text-xs py-4 transition-colors uppercase tracking-widest font-bold"
            >
              [SUBMIT ORDER]
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-[#0A0A0A] border border-[#2463FF] p-8 md:p-12 text-center max-w-xl mx-auto shadow-[0_0_30px_rgba(36,99,255,0.1)]">
            <div className="w-16 h-16 bg-[#2463FF]/20 border border-[#2463FF] rounded-full flex items-center justify-center mx-auto mb-6 text-[#2463FF]">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="font-orbitron text-2xl text-white mb-2 uppercase">ORDER SUBMITTED</h2>
            <div className="font-mono text-xs text-[#4A4A4A] mb-8 uppercase tracking-widest">
              &gt; STATUS :: PENDING_VERIFICATION
            </div>
            
            <p className="font-mono text-sm text-[#999] mb-8 leading-relaxed">
              Your payment screenshot has been received. Once verified by our admin team, your unique TICKET CODE will be generated and sent to your Discord.
            </p>

            <button 
              onClick={() => window.location.href = '/events'}
              className="border border-[#111] hover:border-white text-[#999] hover:text-white font-mono text-xs px-8 py-3 transition-colors uppercase tracking-widest"
            >
              RETURN TO EVENTS
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
