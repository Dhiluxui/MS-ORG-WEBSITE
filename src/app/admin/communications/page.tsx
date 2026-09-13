'use client'

import { useState } from 'react'
import { Send, Search } from 'lucide-react'

export default function AdminCommunicationsPage() {
  const [target, setTarget] = useState('all')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [useDiscord, setUseDiscord] = useState(true)
  const [useWhatsApp, setUseWhatsApp] = useState(false)

  const handleSend = async () => {
    setIsSending(true)
    // Simulate sending
    await new Promise(r => setTimeout(r, 1000))
    setIsSending(false)
    setMessage('')
    alert('Message broadcasted successfully!')
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">BROADCAST COMPOSER</h1>
        <p className="font-mono text-xs text-[#999]">Send announcements to teams via Discord and WhatsApp.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-[#070C1A] border border-[#111] p-6">
            <h3 className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; RECIPIENT_TARGET</h3>
            <select 
              value={target}
              onChange={e => setTarget(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none"
            >
              <option value="all">ALL REGISTERED TEAMS</option>
              <option value="approved">APPROVED TEAMS ONLY</option>
              <option value="waitlisted">WAITLISTED TEAMS ONLY</option>
              <option value="tournament:ms_delhi">TOURNAMENT: MS DELHI CHAMPIONSHIP</option>
            </select>
            <div className="mt-3 font-mono text-[10px] text-[#2463FF]">
              Estimated recipients: 145 Teams
            </div>
          </div>

          <div className="bg-[#070C1A] border border-[#111] p-6">
            <h3 className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; COMPOSE_MESSAGE</h3>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your announcement here... Uses standard markdown."
              className="w-full h-48 bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-4 font-mono text-sm outline-none resize-none custom-scrollbar"
            />
            <div className="mt-2 text-right font-mono text-[10px] text-[#4A4A4A]">
              {message.length} / 2000 CHARACTERS
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-[#070C1A] border border-[#111] p-6">
            <h3 className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; DELIVERY_CHANNELS</h3>
            
            <label className="flex items-center gap-3 mb-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={useDiscord}
                onChange={e => setUseDiscord(e.target.checked)}
                className="w-4 h-4 accent-[#2463FF] bg-[#0A0A0A] border-[#1C1C1C]"
              />
              <div>
                <div className="font-mono text-xs text-white group-hover:text-[#2463FF] transition-colors">DISCORD WEBHOOK</div>
                <div className="font-mono text-[10px] text-[#4A4A4A]">Sends to announcements channel</div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={useWhatsApp}
                onChange={e => setUseWhatsApp(e.target.checked)}
                className="w-4 h-4 accent-green-500 bg-[#0A0A0A] border-[#1C1C1C]"
              />
              <div>
                <div className="font-mono text-xs text-white group-hover:text-green-500 transition-colors">WHATSAPP LOG</div>
                <div className="font-mono text-[10px] text-[#4A4A4A]">Logs numbers for bulk sending</div>
              </div>
            </label>

            <div className="mt-8 pt-6 border-t border-[#111]">
              <button 
                onClick={handleSend}
                disabled={isSending || message.length === 0 || (!useDiscord && !useWhatsApp)}
                className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs py-4 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? '[SENDING...]' : '[BROADCAST NOW]'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
