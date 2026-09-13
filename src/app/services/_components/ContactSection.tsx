'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export function ContactSection() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const supabase = createClient()
    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      organization: formData.get('organization') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as string,
    })

    if (!error) {
      setSuccess(true)
      e.currentTarget.reset()
    }
    setLoading(false)
  }

  return (
    <section id="contact-section" className="bg-black py-20 border-t border-[#111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Terminal Contact Info */}
          <div>
            <div className="font-mono text-xs text-[#E8E8E8] bg-[#0A0A0A] p-6 border border-[#1C1C1C] overflow-x-auto whitespace-pre">
{`┌────────────────────────────────────┐
│ > EMAIL  :: contact@ms.gg          │
│ > PHONE  :: +91-XXXXXXXXXX         │
│ > CITY   :: Bihar, India           │
│ > DISCORD :: discord.gg/ms         │
│ > INSTA  :: @magadhstriker         │
└────────────────────────────────────┘`}
            </div>
            <p className="font-inter text-sm text-[#999] mt-6">
              Our team usually responds within 24 hours. For urgent tournament disputes, please use the Discord ticketing system.
            </p>
          </div>

          {/* Form */}
          <div>
            {success ? (
              <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 p-6">
                <div className="font-mono text-sm text-[#22C55E] space-y-2">
                  <div>&gt; SUBMISSION_STATUS :: RECEIVED</div>
                  <div>&gt; RESPONSE_TIME :: WITHIN_24H</div>
                  <div>&gt; CHANNEL :: EMAIL + WHATSAPP</div>
                </div>
                <Button variant="outline" className="mt-6 border-[#22C55E] text-[#22C55E] hover:bg-[#22C55E]/10" onClick={() => setSuccess(false)}>
                  SEND ANOTHER
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" name="name" required placeholder="> NAME"
                    className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 w-full transition-colors placeholder:text-[#4A4A4A]"
                  />
                  <input 
                    type="email" name="email" required placeholder="> EMAIL"
                    className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 w-full transition-colors placeholder:text-[#4A4A4A]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="tel" name="phone" required placeholder="> PHONE"
                    className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 w-full transition-colors placeholder:text-[#4A4A4A]"
                  />
                  <input 
                    type="text" name="organization" placeholder="> ORGANIZATION (optional)"
                    className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 w-full transition-colors placeholder:text-[#4A4A4A]"
                  />
                </div>
                <div>
                  <select 
                    name="type" required defaultValue=""
                    className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 w-full transition-colors appearance-none"
                  >
                    <option value="" disabled>&gt; I AM A:</option>
                    <option value="Sponsor">Sponsor</option>
                    <option value="Player">Player</option>
                    <option value="Tournament Organizer">Tournament Organizer</option>
                    <option value="Media">Media</option>
                    <option value="Fan">Fan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    name="message" required rows={4} placeholder="> MESSAGE"
                    className="bg-[#161616] border border-[#1C1C1C] focus:border-[#2463FF] focus:outline-none focus:ring-1 focus:ring-[#2463FF] font-mono text-sm text-white p-3 w-full transition-colors placeholder:text-[#4A4A4A] resize-none"
                  />
                </div>
                <Button variant="primary" type="submit" disabled={loading} className="w-full">
                  {loading ? 'TRANSMITTING...' : 'SUBMIT CONTACT FORM'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
