'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Eye, Check, X, MessageSquare, Download } from 'lucide-react'

export function RegistrationsTab({ tournament }: { tournament: any }) {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [filter, setFilter] = useState('ALL')
  const supabase = createClient()

  useEffect(() => {
    // Initial fetch
    const fetchRegs = async () => {
      const { data } = await supabase
        .from('teams')
        .select('*')
        .eq('tournament_id', tournament.id)
        .order('created_at', { ascending: false })
      if (data) setRegistrations(data)
    }
    fetchRegs()

    // Realtime
    const channel = supabase.channel(`regs-${tournament.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'teams', filter: `tournament_id=eq.${tournament.id}` }, (payload) => {
        setRegistrations(prev => {
          const exists = prev.find(r => r.id === payload.new.id)
          if (exists) return prev.map(r => r.id === payload.new.id ? payload.new : r)
          return [payload.new, ...prev]
        })
      }).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [tournament.id, supabase])

  const filtered = registrations.filter(r => {
    if (filter === 'ALL') return true
    if (filter === 'PAID') return r.payment_status === 'verified'
    if (filter === 'UNPAID') return r.payment_status === 'pending' || r.payment_status === 'failed'
    return r.status === filter.toLowerCase()
  })

  const getStatusColor = (status: string) => {
    if (status === 'approved') return 'text-[#2463FF]'
    if (status === 'rejected') return 'text-red-400'
    if (status === 'waitlisted') return 'text-orange-400'
    return 'text-yellow-400' // pending
  }

  const getPaymentBadge = (status: string) => {
    if (status === 'verified') return <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> PAID</span>
    if (status === 'failed') return <span className="text-red-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> FAILED</span>
    return <span className="text-yellow-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> PENDING</span>
  }

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    if (window.confirm(`Are you sure you want to mark this team as ${action.toUpperCase()}?`)) {
      await supabase.from('teams').update({ status: action }).eq('id', id)
      // Realtime will update the UI
    }
  }

  return (
    <div>
      {/* Action Bar */}
      <div className="p-4 border-b border-[#111] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'WAITLISTED', 'PAID', 'UNPAID'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[10px] px-3 py-1 border transition-colors ${
                filter === f 
                  ? 'border-[#2463FF] text-[#2463FF] bg-[#2463FF]/10' 
                  : 'border-[#1C1C1C] text-[#999] hover:border-[#4A4A4A]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <button className="font-mono text-xs text-[#999] hover:text-[#2463FF] border border-[#111] hover:border-[#2463FF] px-4 py-2 transition-colors flex items-center gap-2">
            <Download className="w-3 h-3" /> EXPORT CSV
          </button>
          <button className="font-mono text-xs text-[#999] hover:text-white border border-[#111] hover:border-white px-4 py-2 transition-colors flex items-center gap-2">
            <MessageSquare className="w-3 h-3" /> BROADCAST
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-white">
          <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
            <tr>
              <th className="px-4 py-3 font-normal w-12">#</th>
              <th className="px-4 py-3 font-normal">TEAM</th>
              <th className="px-4 py-3 font-normal">CAPTAIN</th>
              <th className="px-4 py-3 font-normal">DISCORD</th>
              <th className="px-4 py-3 font-normal">PAYMENT</th>
              <th className="px-4 py-3 font-normal">STATUS</th>
              <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                <td className="px-4 py-3 text-[#4A4A4A]">{i + 1}</td>
                <td className="px-4 py-3 text-white">{t.name}</td>
                <td className="px-4 py-3 text-[#999]">{t.captain_name || 'N/A'}</td>
                <td className="px-4 py-3 text-[#999]">{t.discord_id || 'N/A'}</td>
                <td className="px-4 py-3">{getPaymentBadge(t.payment_status)}</td>
                <td className={`px-4 py-3 ${getStatusColor(t.status)}`}>{t.status.toUpperCase()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => handleAction(t.id, 'approved')} className="text-[#4A4A4A] hover:text-green-400 transition-colors" title="Approve">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleAction(t.id, 'rejected')} className="text-[#4A4A4A] hover:text-red-400 transition-colors" title="Reject">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-[#111] mx-1" />
                    <button className="text-[#999] hover:text-[#2463FF] transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#4A4A4A]">
                  &gt; NO_REGISTRATIONS_FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
