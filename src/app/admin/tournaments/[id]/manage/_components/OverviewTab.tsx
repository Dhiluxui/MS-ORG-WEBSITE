'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Edit, Trash2, ArrowRight } from 'lucide-react'

export function OverviewTab({ tournament, stats }: { tournament: any, stats: any }) {
  const router = useRouter()
  const supabase = createClient()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAdvancePhase = async () => {
    const PHASES = ['draft', 'published', 'registering', 'full', 'live', 'completed']
    const currentIndex = PHASES.indexOf(tournament.status)
    if (currentIndex === -1 || currentIndex >= PHASES.length - 1) return

    const nextPhase = PHASES[currentIndex + 1]
    if (window.confirm(`Advance tournament phase to ${nextPhase.toUpperCase()}?`)) {
      setIsUpdating(true)
      await supabase.from('tournaments').update({ status: nextPhase }).eq('id', tournament.id)
      setIsUpdating(false)
      router.refresh()
    }
  }

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this tournament?')) {
      setIsUpdating(true)
      await supabase.from('tournaments').update({ status: 'cancelled' }).eq('id', tournament.id)
      setIsUpdating(false)
      router.refresh()
    }
  }

  return (
    <div className="p-6">
      
      {/* 4 Stat Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0A0A0A] border border-[#111] p-4">
          <div className="font-mono text-[10px] text-[#4A4A4A] mb-1">REGISTERED</div>
          <div className="font-mono text-2xl text-white">{stats.registered}</div>
        </div>
        <div className="bg-[#0A0A0A] border border-[#111] p-4">
          <div className="font-mono text-[10px] text-[#4A4A4A] mb-1">APPROVED</div>
          <div className="font-mono text-2xl text-[#2463FF]">{stats.approved}</div>
        </div>
        <div className="bg-[#0A0A0A] border border-[#111] p-4">
          <div className="font-mono text-[10px] text-[#4A4A4A] mb-1">PENDING</div>
          <div className="font-mono text-2xl text-yellow-400">{stats.pending}</div>
        </div>
        <div className="bg-[#0A0A0A] border border-[#111] p-4">
          <div className="font-mono text-[10px] text-[#4A4A4A] mb-1">SLOTS_FILLED</div>
          <div className="font-mono text-2xl text-white">{stats.approved} <span className="text-[#4A4A4A] text-sm">/ {tournament.total_slots}</span></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 max-w-sm">
        {tournament.status !== 'completed' && tournament.status !== 'cancelled' && (
          <button 
            onClick={handleAdvancePhase}
            disabled={isUpdating}
            className="w-full bg-[#2463FF] hover:bg-[#1C4FD6] text-white font-mono text-xs py-3 px-4 flex items-center justify-between transition-colors disabled:opacity-50"
          >
            <span>[ADVANCE TO NEXT PHASE]</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
        
        <button className="w-full border border-[#111] hover:border-[#2463FF] text-[#999] hover:text-white font-mono text-xs py-3 px-4 flex items-center gap-2 transition-colors">
          <Edit className="w-4 h-4" />
          <span>[✏️ EDIT DETAILS]</span>
        </button>

        <button 
          onClick={handleCancel}
          disabled={isUpdating}
          className="w-full border border-[#111] hover:border-red-900 text-[#4A4A4A] hover:text-red-400 font-mono text-xs py-3 px-4 flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          <span>[❌ CANCEL TOURNAMENT]</span>
        </button>
      </div>

    </div>
  )
}
