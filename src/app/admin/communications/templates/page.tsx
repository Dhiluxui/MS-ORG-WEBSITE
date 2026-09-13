'use client'

import { useState } from 'react'
import { Save, Code } from 'lucide-react'

const DEFAULT_TEMPLATES = [
  { id: 'registration_received', name: 'REGISTRATION_RECEIVED', trigger: 'Auto on register',
    body: `🎮 Hey {captain_name}!\n\nYour team **{team_name}** has been registered for **{tournament_name}**.\n\nWe'll verify your payment and confirm your slot within 24h.\n\n— Magadh Striker Esports` },
  { id: 'registration_approved', name: 'YOU_ARE_IN', trigger: 'Auto on approve',
    body: `✅ **{team_name}** is OFFICIALLY IN for **{tournament_name}**!\n\n📅 {tournament_date} | 🏆 ₹{prize_pool} Prize Pool\n\nRoom details sent 30 min before your match. Join Discord: {discord_link}\n\n— MS Esports` },
  { id: 'registration_rejected', name: 'REGISTRATION_ISSUE', trigger: 'Auto on reject',
    body: `⚠️ Sorry, **{team_name}** was not approved for **{tournament_name}**.\nReason: {rejection_reason}\n\nContact us on Discord for help. — MS Esports` },
  { id: 'room_details', name: 'ROOM_DETAILS', trigger: 'Manual — sent before match',
    body: `🎮 ROOM DETAILS — {tournament_name}\nMATCH: {match_name} | {match_time} IST\nROOM_ID: {room_id}\nPASSWORD: {room_password}\nMAP: {map} | {perspective}\nBe ready 10 min early 🔴\n— MS Esports` }
]

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState(DEFAULT_TEMPLATES)
  const [activeTemplate, setActiveTemplate] = useState(DEFAULT_TEMPLATES[0])
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(r => setTimeout(r, 600))
    setTemplates(prev => prev.map(t => t.id === activeTemplate.id ? activeTemplate : t))
    setIsSaving(false)
    alert('Template saved successfully!')
  }

  const insertVariable = (variable: string) => {
    setActiveTemplate(prev => ({
      ...prev,
      body: prev.body + ` {${variable}} `
    }))
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">MESSAGE TEMPLATES</h1>
        <p className="font-mono text-xs text-[#999]">Manage automated and manual message formats.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Template List */}
        <div className="w-full lg:w-80 flex flex-col gap-2">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTemplate(t)}
              className={`text-left p-4 border transition-colors ${
                activeTemplate.id === t.id 
                  ? 'bg-[#0A0A0A] border-[#2463FF]' 
                  : 'bg-[#070C1A] border-[#111] hover:border-[#4A4A4A]'
              }`}
            >
              <div className="font-mono text-xs text-white mb-1">{t.name}</div>
              <div className="font-mono text-[9px] text-[#4A4A4A]">&gt; TRIGGER: {t.trigger.toUpperCase()}</div>
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 bg-[#070C1A] border border-[#111] flex flex-col">
          <div className="p-4 border-b border-[#111] flex justify-between items-center bg-[#0A0A0A]">
            <div>
              <div className="font-mono text-xs text-[#2463FF] mb-1">{activeTemplate.name}</div>
              <div className="font-mono text-[10px] text-[#4A4A4A]">TRIGGER: {activeTemplate.trigger}</div>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs px-4 py-2 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'SAVING...' : 'SAVE TEMPLATE'}</span>
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <div className="font-mono text-xs text-[#4A4A4A] mb-4">&gt; MESSAGE_BODY</div>
            <textarea
              value={activeTemplate.body}
              onChange={e => setActiveTemplate(p => ({ ...p, body: e.target.value }))}
              className="w-full flex-1 min-h-[300px] bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-4 font-mono text-sm outline-none resize-none custom-scrollbar mb-4"
            />
            
            <div className="border border-[#111] p-4 bg-[#0A0A0A]">
              <div className="font-mono text-[10px] text-[#4A4A4A] mb-3 flex items-center gap-2">
                <Code className="w-3 h-3" /> AVAILABLE_VARIABLES (CLICK TO INSERT)
              </div>
              <div className="flex flex-wrap gap-2">
                {['captain_name', 'team_name', 'tournament_name', 'tournament_date', 'prize_pool', 'discord_link', 'rejection_reason', 'room_id', 'room_password'].map(v => (
                  <button 
                    key={v}
                    onClick={() => insertVariable(v)}
                    className="font-mono text-[10px] text-[#999] hover:text-[#2463FF] bg-[#111] border border-[#1C1C1C] hover:border-[#2463FF] px-2 py-1 transition-colors"
                  >
                    {`{${v}}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
