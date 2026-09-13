'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

const STEPS = ['BASIC_INFO', 'SCHEDULE', 'TEAMS_&_SLOTS', 'PRIZE_&_ENTRY', 'SCORING_RULES', 'REVIEW_&_PUBLISH']

export default function NewTournamentWizard() {
  const router = useRouter()
  const supabase = createClient()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    game: 'FREE FIRE MAX',
    type: 'squad',
    description: '',
    rules: '',
    registration_opens: '',
    registration_closes: '',
    start_date: '',
    end_date: '',
    total_slots: '32',
    waitlist_slots: '16',
    entry_fee: '0',
    prize_pool: '0',
    scoring_system: 'battle_royale'
  })

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1)
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1)
  }

  const handlePublish = async (status: string) => {
    setIsSubmitting(true)
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2,6)
    
    const { data, error } = await supabase.from('tournaments').insert({
      name: formData.name,
      slug: slug,
      game: formData.game,
      type: formData.type,
      status: status,
      description: formData.description,
      rules: formData.rules,
      registration_opens: formData.registration_opens || null,
      registration_closes: formData.registration_closes || null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      total_slots: parseInt(formData.total_slots),
      entry_fee: parseFloat(formData.entry_fee),
      prize_pool: parseFloat(formData.prize_pool)
    }).select().single()

    setIsSubmitting(false)
    if (error) {
      alert('Error creating tournament: ' + error.message)
    } else {
      router.push(`/admin/tournaments/${data.id}/manage`)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-[800px] mx-auto bg-[#070C1A] border border-[#111] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-orbitron text-2xl text-white mb-2">INITIALIZE TOURNAMENT</h1>
        <div className="font-mono text-xs text-[#4A4A4A]">&gt; NEW_EVENT_WIZARD :: PHASE {currentStep + 1}/6</div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#111] -z-10" />
        {STEPS.map((step, idx) => (
          <div key={step} className="flex flex-col items-center gap-2 bg-[#070C1A] px-2">
            <div className={`w-4 h-4 rounded-full border ${idx <= currentStep ? 'bg-[#2463FF] border-[#2463FF]' : 'bg-[#0A0A0A] border-[#1C1C1C]'}`} />
            <div className={`font-mono text-[9px] hidden sm:block ${idx <= currentStep ? 'text-[#2463FF]' : 'text-[#4A4A4A]'}`}>
              {step}
            </div>
          </div>
        ))}
      </div>

      {/* Form Area */}
      <div className="min-h-[400px]">
        {currentStep === 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block font-mono text-xs text-[#999] mb-1">&gt; TOURNAMENT_NAME</label>
              <input type="text" value={formData.name} onChange={e => handleChange('name', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none" placeholder="e.g. MS Winter Clash 2026" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; GAME</label>
                <select value={formData.game} onChange={e => handleChange('game', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none">
                  <option>FREE FIRE MAX</option>
                  <option>BGMI</option>
                  <option>CODM</option>
                  <option>WILD RIFT</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; FORMAT_TYPE</label>
                <select value={formData.type} onChange={e => handleChange('type', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none">
                  <option value="squad">SQUAD (4v4)</option>
                  <option value="duo">DUO (2v2)</option>
                  <option value="solo">SOLO (1v1)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-[#999] mb-1">&gt; DESCRIPTION</label>
              <textarea value={formData.description} onChange={e => handleChange('description', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white p-3 font-mono text-sm outline-none h-24" placeholder="Brief overview of the tournament..."></textarea>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; REGISTRATION_OPENS</label>
                <input type="datetime-local" value={formData.registration_opens} onChange={e => handleChange('registration_opens', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; REGISTRATION_CLOSES</label>
                <input type="datetime-local" value={formData.registration_closes} onChange={e => handleChange('registration_closes', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; TOURNAMENT_START</label>
                <input type="datetime-local" value={formData.start_date} onChange={e => handleChange('start_date', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; TOURNAMENT_END</label>
                <input type="datetime-local" value={formData.end_date} onChange={e => handleChange('end_date', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; TOTAL_SLOTS</label>
                <select value={formData.total_slots} onChange={e => handleChange('total_slots', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none">
                  <option>8</option>
                  <option>16</option>
                  <option>24</option>
                  <option>32</option>
                  <option>48</option>
                  <option>64</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; WAITLIST_SLOTS</label>
                <input type="number" value={formData.waitlist_slots} onChange={e => handleChange('waitlist_slots', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-[#999] mb-1">&gt; REGISTRATION_ACCESS</label>
              <select className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none">
                <option>OPEN_TO_ALL</option>
                <option>INVITE_ONLY</option>
                <option>ADMIN_APPROVAL_REQUIRED</option>
              </select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; ENTRY_FEE (₹)</label>
                <input type="number" value={formData.entry_fee} onChange={e => handleChange('entry_fee', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" placeholder="0 = Free" />
              </div>
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; PRIZE_POOL (₹)</label>
                <input type="number" value={formData.prize_pool} onChange={e => handleChange('prize_pool', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
            </div>
            {parseInt(formData.entry_fee) > 0 && (
              <div>
                <label className="block font-mono text-xs text-[#999] mb-1">&gt; PAYMENT_DEADLINE_HOURS</label>
                <input type="number" defaultValue="24" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block font-mono text-xs text-[#999] mb-1">&gt; SCORING_SYSTEM</label>
              <select value={formData.scoring_system} onChange={e => handleChange('scoring_system', e.target.value)} className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none">
                <option value="battle_royale">BATTLE_ROYALE (Placement + Kills)</option>
                <option value="kill_only">KILL_ONLY</option>
                <option value="custom">CUSTOM</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-[#999] mb-1">&gt; TOTAL_ROUNDS</label>
              <input type="number" defaultValue="6" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
            </div>
            <div>
              <label className="block font-mono text-xs text-[#999] mb-1">&gt; ROOM_ID_PATTERN</label>
              <input type="text" defaultValue="MS-{YEAR}-{MMDD}-M{N}" className="w-full bg-[#0A0A0A] border border-[#1C1C1C] text-white p-3 font-mono text-sm outline-none" />
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-[#0A0A0A] border border-[#1C1C1C] p-4">
              <pre className="font-mono text-xs text-[#2463FF] whitespace-pre-wrap">
{`{
  "name": "${formData.name}",
  "game": "${formData.game}",
  "type": "${formData.type}",
  "slots": ${formData.total_slots},
  "entry_fee": ${formData.entry_fee},
  "prize_pool": ${formData.prize_pool}
}`}
              </pre>
            </div>
            
            <div className="flex flex-col gap-3 pt-4">
              <button disabled={isSubmitting || !formData.name} onClick={() => handlePublish('published')} className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono py-3 transition-colors disabled:opacity-50">
                {isSubmitting ? '[PROCESSING...]' : '[PUBLISH NOW]'}
              </button>
              <button disabled={isSubmitting || !formData.name} onClick={() => handlePublish('draft')} className="w-full border border-[#1C1C1C] hover:border-[#2463FF] text-[#999] hover:text-white font-mono py-3 transition-colors disabled:opacity-50">
                [SAVE AS DRAFT]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Nav */}
      <div className="flex justify-between mt-8 pt-4 border-t border-[#111]">
        <button 
          onClick={handleBack} 
          disabled={currentStep === 0 || isSubmitting}
          className="text-[#999] hover:text-white font-mono text-xs disabled:opacity-30 transition-colors"
        >
          &lt; BACK
        </button>
        {currentStep < 5 && (
          <button 
            onClick={handleNext}
            className="text-[#2463FF] hover:text-white font-mono text-xs transition-colors"
          >
            NEXT &gt;
          </button>
        )}
      </div>
    </div>
  )
}
