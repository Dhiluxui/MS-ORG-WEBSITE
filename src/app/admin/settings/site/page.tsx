'use client'

import { useState } from 'react'
import { Save } from 'lucide-react'

export default function AdminSiteSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  
  const handleSave = async (group: string) => {
    setIsSaving(true)
    // Simulate save
    await new Promise(r => setTimeout(r, 600))
    setIsSaving(false)
    alert(`${group} settings saved successfully!`)
  }

  const renderSection = (title: string, fields: { label: string, type: string, placeholder: string }[]) => (
    <div className="bg-[#070C1A] border border-[#111] p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono text-xs text-[#4A4A4A]">&gt; {title}_SETTINGS</h3>
        <button 
          onClick={() => handleSave(title)}
          disabled={isSaving}
          className="bg-[#111] hover:bg-[#1C1C1C] text-white font-mono text-[10px] px-3 py-1.5 flex items-center gap-2 transition-colors border border-[#1C1C1C]"
        >
          <Save className="w-3 h-3" /> [SAVE_GROUP]
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(f => (
          <div key={f.label}>
            <label className="block font-mono text-[10px] text-[#999] mb-2 uppercase">{f.label.replace('_', ' ')}</label>
            <input 
              type={f.type} 
              placeholder={f.placeholder}
              className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-xs outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-white mb-2">SITE CONFIGURATION</h1>
        <p className="font-mono text-xs text-[#999]">Manage global platform settings and integrations.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {renderSection('ORGANIZATION', [
          { label: 'ORG_NAME', type: 'text', placeholder: 'Magadh Striker Esports' },
          { label: 'TAGLINE', type: 'text', placeholder: 'Compete at the Highest Level' },
          { label: 'CONTACT_EMAIL', type: 'email', placeholder: 'contact@magadhstriker.com' },
          { label: 'CONTACT_PHONE', type: 'text', placeholder: '+91 98765 43210' },
          { label: 'LOCATION', type: 'text', placeholder: 'Delhi, India' },
          { label: 'UPI_ID', type: 'text', placeholder: 'magadhstriker@upi' }
        ])}

        {renderSection('SOCIAL_LINKS', [
          { label: 'INSTAGRAM', type: 'url', placeholder: 'https://instagram.com/...' },
          { label: 'YOUTUBE', type: 'url', placeholder: 'https://youtube.com/...' },
          { label: 'TWITTER', type: 'url', placeholder: 'https://twitter.com/...' },
          { label: 'DISCORD_INVITE', type: 'url', placeholder: 'https://discord.gg/...' },
          { label: 'WHATSAPP_CHANNEL', type: 'url', placeholder: 'https://whatsapp.com/...' }
        ])}

        {renderSection('DISCORD_WEBHOOKS', [
          { label: 'WEBHOOK_ANNOUNCEMENTS', type: 'password', placeholder: 'https://discord.com/api/webhooks/...' },
          { label: 'WEBHOOK_ROOM_INFO', type: 'password', placeholder: 'https://discord.com/api/webhooks/...' },
          { label: 'WEBHOOK_REGISTRATIONS', type: 'password', placeholder: 'https://discord.com/api/webhooks/...' },
          { label: 'WEBHOOK_ADMIN_ALERTS', type: 'password', placeholder: 'https://discord.com/api/webhooks/...' }
        ])}

        {renderSection('HERO_SETTINGS', [
          { label: 'HERO_VIDEO_URL', type: 'url', placeholder: 'YouTube embed URL' },
          { label: 'STAT_PLAYERS', type: 'number', placeholder: '15000' },
          { label: 'STAT_TOURNAMENTS', type: 'number', placeholder: '120' },
          { label: 'STAT_PRIZE_POOL', type: 'text', placeholder: '50L+' }
        ])}
      </div>
    </div>
  )
}
