'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function TournamentsTable({ initialTournaments }: { initialTournaments: any[] }) {
  const [tournaments, setTournaments] = useState(initialTournaments)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const supabase = createClient()

  const filtered = tournaments.filter(t => {
    if (filterStatus !== 'ALL' && t.status !== filterStatus.toLowerCase()) return false
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft': return <span className="border border-[#4A4A4A] text-[#4A4A4A] px-2 py-0.5 rounded-full text-[10px]">DRAFT</span>
      case 'published': return <span className="border border-[#2463FF] text-[#2463FF] px-2 py-0.5 rounded-full text-[10px]">PUBLISHED</span>
      case 'registering': return <span className="border border-green-400 text-green-400 px-2 py-0.5 rounded-full text-[10px]">REGISTERING</span>
      case 'full': return <span className="border border-orange-400 text-orange-400 px-2 py-0.5 rounded-full text-[10px]">FULL</span>
      case 'live': return <span className="border border-red-400 text-red-400 px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span>LIVE</span>
      case 'completed': return <span className="border border-[#4A4A4A] text-[#4A4A4A] px-2 py-0.5 rounded-full text-[10px]">COMPLETED</span>
      case 'cancelled': return <span className="border border-red-900 text-red-900 px-2 py-0.5 rounded-full text-[10px]">CANCELLED</span>
      default: return <span className="border border-[#4A4A4A] text-[#4A4A4A] px-2 py-0.5 rounded-full text-[10px]">{status.toUpperCase()}</span>
    }
  }

  const handleArchive = async (id: string) => {
    if (window.confirm('Are you sure you want to cancel this tournament? This cannot be easily undone.')) {
      await supabase.from('tournaments').update({ status: 'cancelled' }).eq('id', id)
      setTournaments(tournaments.map(t => t.id === id ? { ...t, status: 'cancelled' } : t))
    }
  }

  return (
    <div className="bg-[#070C1A] border border-[#111]">
      {/* Filters */}
      <div className="p-4 border-b border-[#111] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search tournaments..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white font-mono text-xs px-3 py-2 w-64 outline-none"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0A0A0A] border border-[#1C1C1C] focus:border-[#2463FF] text-white font-mono text-xs px-3 py-2 outline-none"
          >
            <option value="ALL">ALL STATUS</option>
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
            <option value="REGISTERING">REGISTERING</option>
            <option value="LIVE">LIVE</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs text-white">
          <thead className="bg-[#0A0A0A] text-[#4A4A4A] border-b border-[#111]">
            <tr>
              <th className="px-4 py-3 font-normal">ID / NAME</th>
              <th className="px-4 py-3 font-normal">GAME</th>
              <th className="px-4 py-3 font-normal">START DATE</th>
              <th className="px-4 py-3 font-normal">SLOTS</th>
              <th className="px-4 py-3 font-normal">PRIZE (₹)</th>
              <th className="px-4 py-3 font-normal">STATUS</th>
              <th className="px-4 py-3 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-b border-[#111] hover:bg-[#0A0A0A] transition-colors">
                <td className="px-4 py-3">
                  <div className="text-[10px] text-[#4A4A4A] mb-0.5">{t.id.split('-')[0]}</div>
                  <div className="text-white whitespace-nowrap">{t.name}</div>
                </td>
                <td className="px-4 py-3 text-[#999]">{t.game}</td>
                <td className="px-4 py-3 text-[#999]">
                  {t.start_date ? format(new Date(t.start_date), 'dd MMM yyyy') : 'TBD'}
                </td>
                <td className="px-4 py-3 text-[#999]">
                  {t.teams?.[0]?.count || 0} / {t.total_slots || '?'}
                </td>
                <td className="px-4 py-3 text-[#999]">
                  {t.prize_pool ? t.prize_pool.toLocaleString() : '0'}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(t.status)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/tournaments/${t.id}/manage`} className="text-[#999] hover:text-[#2463FF] transition-colors" title="Manage Hub">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleArchive(t.id)} className="text-[#999] hover:text-red-400 transition-colors" title="Archive / Cancel">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#4A4A4A]">
                  &gt; NO_TOURNAMENTS_FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
